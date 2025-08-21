const {Model}=require("../models/authmodel.js")
const bcrypt=require("bcryptjs")
const {uploadCloudinary}=require("../utils/cloudinary.js")
const fs=require("fs")

const profile=async(req,res,next)=>{
   try {
    const user=await Model.findById(req.userId.id)
    res.json(user)
   } catch (error) {
 const err={StatusCode:400,err:error.message}
 next(err)
   }
}


const editProfile=async(req,res,next)=>{
  try {
   const{name,password,email,username}=req.body
   const ProfileImage=req.file
   const imageurl=await uploadCloudinary(ProfileImage.path)
   fs.unlinkSync(ProfileImage.path)
   if(name||password||email||password){
      const hashpassword=await bcrypt.hash(password,12)
      const user=await Model.findByIdAndUpdate(req.userId.id,{name,password:hashpassword,email,username,profile:imageurl},{new:true})
      console.log(user)
      res.send({message:"updated",data:user})
   }else{
      const err={StatusCode:404,err:"invalid user"}
      next(err)
   }
  } catch (error) {
     console.log(error.message)
     const err={StatusCode:400,message:error.message}
     next(err)
  }
}


module.exports={profile,editProfile}