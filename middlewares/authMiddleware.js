const jwt =require("jsonwebtoken")
require("dotenv").config()
const {Model}=require("../models/authmodel")

exports.checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWtpasskey);

    const user = await Model.findById(decoded.id).select(
      "-password -__v -createdAt -updatedAt"
    );

    if (!user) {
      return next({ statusCode: 400, message: "Invalid token" });
    }

    // ✅ Save only the ID, not the whole user object
    req.userId = user._id.toString();
    req.role = user.role; // optional, if you want to check role later
    next();
  } catch (error) {
    const err = { statusCode: 400, message: error.message };
    next(err);
  }
};



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