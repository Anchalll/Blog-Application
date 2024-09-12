const USER = require("../models/user")
const { verifyUserToken } = require("../Services/authentication");
const BLOG = require("../models/blog");

async function handleHomePage(req, res) {
    const allBlogs = await BLOG.find({});
    return res.render("home",{current_user : req.current_user, blogs : allBlogs});
}

async function handleLogin(req, res) {
    const token = await req.cookies?.sessionId;
    if(token){
        const current_user = verifyUserToken(token)
        if(!current_user){
            return res.render("login");
        }
        req.current_user = current_user;
        return res.redirect("/home");
    }
    else{
        return res.render("login");
    }
}

async function handlePostLogin(req, res, next) {

    if (req.body.email && req.body.password) {
        try {
            //validate password and generate token
            token = await USER.matchPasswordAndGenerateToken(req.body.email, req.body.password)
            //set token in cookie and render home page
            res.cookie("sessionId", token)
            return res.redirect("/home")
        }
        catch(error){
            return res.render("login",{message:"Incorrect email or password"})
        }
    }
    return res.render("login",{message :"Enter email / password" })

}

function handleSignup(req, res) {
    return res.render("signup");
}

async function handlePostSignup(req, res, next) {
    try {
        await USER.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "USER"
        })
        return res.redirect("/login")
    }
    catch (err) {
        console.log(err)
        return res.json({ err: "some error occured" })
    }

}

function handleLogout(req,res){
    res.clearCookie('sessionId')
    return res.redirect("/login")
}


module.exports = {
    handleHomePage,
    handleLogin,
    handleSignup,
    handlePostSignup,
    handlePostLogin,
    handleLogout
};

