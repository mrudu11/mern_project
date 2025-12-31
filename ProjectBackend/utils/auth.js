const jwt = require("jsonwebtoken")
const config = require("./config")
const result = require("./result")

function authUser(req,res,next){
    const allowedURL = ["/admin/login","/students/register"]
    if(allowedURL.includes(req.url))
        next();
    else{
        const token = req.headers.token
        if(!token){
            res.send(result.createResult("token is missing"))
        }
       else{
         try{
            const payload = jwt.verify(token,config.secret)
            req.headers.email = payload.email
            req.headers.role = payload.role
            return next();
        } catch(ex){
            console.log("ex",ex);
            return result.createResult("token is invalid")
        }
        }
}
}

function checkAuthorization(req,res,next){
    const role = req.headers.role
    if(role == "ADMIN"){
        return next();
    }
    res.send(result.createResult("unauthorized access"));
}

module.exports = {authUser,checkAuthorization}