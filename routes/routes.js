const express = require("express");
const multer = require("multer");

const {handleHomePage,
    handleSignup,
    handleLogin,
    handlePostSignup,
    handlePostLogin} = require("../controllers/userController")

const {handleAddBlog,
        handlePostAddBlog,
        handleBlogPage} = require("../controllers/blogController")

const {allowLoggedInUsersOnly} = require("../Middlewares/auth")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./images/")
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({storage})

const router = express.Router();

router.route("/signup").get(handleSignup).post(handlePostSignup);
router.route("/login").get(handleLogin).post(handlePostLogin);
router.get("/home",allowLoggedInUsersOnly,handleHomePage);
router.route("/addblog").get(allowLoggedInUsersOnly,handleAddBlog).post(allowLoggedInUsersOnly,upload.single("coverImage"),handlePostAddBlog);
router.get("/blog/:id",allowLoggedInUsersOnly,handleBlogPage);

module.exports = router;