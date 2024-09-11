const { verifyUserToken } = require("../Services/authentication");

async function allowLoggedInUsersOnly(req,res,next) {
    const token = await req.cookies?.sessionId;
    if(!token){
        return res.redirect("/login")
    }
    const current_user = verifyUserToken(token)
    if(!current_user){
        return res.redirect("/login")
    }
    req.current_user = current_user;
    next();
}

module.exports = {allowLoggedInUsersOnly}