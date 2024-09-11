const BLOG = require("../models/blog")

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
    const blog = await BLOG.findById(req.params.id)
    return res.render("blog",{blog,current_user:req.current_user})
}

module.exports ={handleAddBlog,handlePostAddBlog,handleBlogPage}