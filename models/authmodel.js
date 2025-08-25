const mongoose=require("mongoose")

const Schema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["jobseeker","employee"]},
    profile:{type:String},
},
{timestamps:true}
)

const Model=mongoose.model("users",Schema)
module.exports ={Model}