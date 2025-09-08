const jwt =require("jsonwebtoken")
require("dotenv").config()
const {Model}=require("../models/authmodel")

exports.checkAuth=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(" ")[1]
  try {
    const decodes=await jwt.verify(token,process.env.JWtpasskey)
    const check=await Model.findById(decodes.id).select(["-password","-__v","-createdAt","-updatedAt"])
    if(check){
        req.userId=check._id
        next()
    }else{
        next({statusCode:400,message:"invalid token"})
    }

  } catch (error) {
      const err={statusCode:400,message:error.message}
      next(err)
  }
}


exports.checkrole=(...roles)=>{
  return async(req,res,next)=>{
    const user=req.userId
    const data=await Model.findById(user.id).select("role")
    if(roles.includes(data.role)){
      next()
    }else{
      next({statusCode:400,message:"invalid user"})
    }
  }
}