const jwt=require("jsonwebtoken")
require("dotenv").config()

async function TokenCreation(user,req,res,next) {
    try {
    const token=await jwt.sign({id:user._id,user:user.username,role:user.role},process.env.JWtpasskey,{algorithm:"HS256",expiresIn:"24h"})
   
     return token
    } catch (error) {
        console.log(error)
        next({statusCode:400,message:"invalid token"})
    }
}


module.exports={TokenCreation}