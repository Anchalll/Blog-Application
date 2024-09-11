const jwt = require("jsonwebtoken")

const secretKey = "blogger@123";

function generateUserToken(user){
    var token = jwt.sign({email:user.email, _id:user._id, username:user.username}, secretKey)
    return token
}

function verifyUserToken(token){
    return jwt.verify(token, secretKey);
}

module.exports = {generateUserToken,verifyUserToken}