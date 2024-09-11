const {generateUserToken,verifyUserToken} = require("../Services/authentication");
const mongoose = require("mongoose")
const { createHmac, randomBytes } = require("crypto");

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    salt:{
        type : String
    },
    profileImageUrl:{
        type : String,
        default : `/images/DefaultProfilePhoto.jpg`
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    }
})

UserSchema.pre('save', function(next){
    const current_user = this;

    current_user.salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', current_user.salt).update(current_user.password).digest("hex");
    current_user.password = hashedPassword;
    next();
} )

UserSchema.static("matchPasswordAndGenerateToken",
    async function (email,password) {
        const current_user = await this.findOne({email});
        if(!current_user){
            throw new Error("user not found");
        }
        const userProvidedPassword = createHmac('sha256', current_user.salt)
        .update(password)
        .digest("hex");

        if(current_user.password !== userProvidedPassword)
        {
            throw new Error("Incorrect password");
        }

        const token = generateUserToken(current_user);
        return token;
    }
)
const USER = mongoose.model("user", UserSchema);
module.exports = USER;