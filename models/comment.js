const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    text:{
        type : String,
        required : true
    },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    blogId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"blog"
    }
});

const COMMENT = mongoose.model("comment", CommentSchema);

module.exports = COMMENT;
