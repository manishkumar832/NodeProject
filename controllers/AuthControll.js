const bcrypt=require("bcryptjs")
const {Model}=require("../models/authmodel.js");
const {TokenCreation}=require("../utils/AuthToken.js")

const signupController=async(req,res,next)=>{
    try {
        const {name,email,password,username}=req.body;
    const hashpass=await bcrypt.hash(password,12)
    const user=new Model({
        name:name,
        email:email,
        username:username,
        password:hashpass
    })
    const SaveData=await user.save()
    res.send(SaveData)
    } catch (error) {
        const err={statusCode:400,message:error.message}
        next(err)
    }
}


const LoginController=async(req,res,next)=>{
   try {

    const {email,password}=req.body;
    const finduser=await Model.findOne({email:email})
    const decodeUser=await bcrypt.compare(password,finduser.password)
    if(decodeUser){
        if (role && finduser.role !== role) {
        finduser.role = role;
        await finduser.save();
      }
        const tokens=await TokenCreation(finduser)
        const user=await Model.findById(finduser._id).select(["-password","-__v","-createdAt","-updatedAt"])
        res.json({message:"user details",user,token:tokens})
    }else{
        res.status(400).send("invalid email/password")
    }
   
    
   } catch (error) {
      const err={statusCode:400,message:error.message}
      next(err)
   }
}
module.exports={signupController,LoginController}