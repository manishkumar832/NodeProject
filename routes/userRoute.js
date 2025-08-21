const express =require("express")
const Route=express.Router()
const {profile,editProfile}=require("../controllers/userController.js")
const {tokenValidator,validations,editvalidator}=require("../validators/AuthValid.js")
const {checkAuth}=require("../middlewares/authMiddleware.js")
const {upload}=require("../utils/multerFile.js")


Route.get("/profile",tokenValidator,validations,checkAuth,profile)


Route.get("/editProfile",tokenValidator,editvalidator,validations,checkAuth,upload.single("profilePic"),editProfile)


module.exports=Route