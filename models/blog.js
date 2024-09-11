const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    body:{
        type : String,
        required : true
    },
    coverImageURL:{
        type : String,
        required : false
    },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
});

const BLOG = mongoose.model("blog", BlogSchema);

module.exports = BLOG;
