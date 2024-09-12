const BLOG = require("../models/blog")
const COMMENT = require("../models/comment")

function handleAddBlog(req,res){
    return res.render("addBlog",{current_user:req.current_user}); 
}

async function handlePostAddBlog(req,res) {
    try {
        const blog = await BLOG.create({
            title: req.body.title,
            body: req.body.body,
            coverImageURL: `/${req.file.filename}`,
            createdBy: req.current_user._id
        })
        return res.redirect(`/blog/${blog._id}`)
    }
    catch (err) {
        console.log(err)
        res.json({ err: "some error occured" })
    }
}

async function handleBlogPage(req,res){
    const blog = await BLOG.findById(req.params.id).populate("createdBy");
    const comments = await COMMENT.find({blogId: req.params.id}).populate("createdBy")
    return res.render("blog",{blog,comments,current_user:req.current_user})
}

async function handleComments(req,res) {
    await COMMENT.create({
        text:req.body.commentText,
        createdBy: req.current_user._id,
        blogId: req.params.id
    })
    return res.redirect(`/blog/${req.params.id}`);

}

module.exports ={handleAddBlog,handlePostAddBlog,handleBlogPage,handleComments}