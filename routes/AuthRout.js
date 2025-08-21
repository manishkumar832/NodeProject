const express=require("express")
const Route=express.Router()
const {SignupValidator, LoginValidator}=require("../validators/AuthValid.js")
const {signupController,LoginController}=require("../controllers/AuthControll.js")


Route.post("/signup", SignupValidator,signupController
)

Route.post("/login",LoginValidator,LoginController)


module.exports=Route