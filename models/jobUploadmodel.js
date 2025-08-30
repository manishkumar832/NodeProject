const mongoose=require("mongoose")

const JobSchema=new mongoose.Schema({
    Title:{type:String,required:true},
    description:{type:String,required:true},
    company:{type:String,required:true},
    location:{type:String,required:true},
    salary:{type:String,required:true},
    role:{type:String,required:true},
    postedOn:{type:Date,default:Date.now},
    Status:{type:String,enum:["open","closed"],default:"open"},
    postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
},
{timestamps:true})
const Jobs=mongoose.model("jobs",JobSchema)



const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "jobs", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true},
    skills: { type: String, required: true },
    education: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String, required: true },

    status: { 
        type: String, 
        enum: ["applied", "shortlisted", "rejected", "accepted"], 
        default: "applied" 
    },
    appliedOn: { type: Date, default: Date.now }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);


module.exports={Jobs,Application}