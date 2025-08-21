
const {Jobs, Application}=require("../models/jobUploadmodel.js")
const {Model}=require("../models/authmodel.js")

const jobs=async(req,res,next)=>{
   try {
    const {Title,description,company,location,salary,role}=req.body
    const userId=req.userId._id
    const UploadJob=new Jobs({
        Title:Title,
        description:description,
        company:company,
        Location:location,
        salary:salary,
        Role:role,
        postedBy:userId
    })
    const saved=await UploadJob.save()
    res.send({message:"job uploaded",data:saved})

   } catch (error) {
    console.log(error)
    const err={StatusCode:400,err:error.message}
    next(err)
   }
}
const UpdateJobById=async(req,res,next)=>{
    try {
        const {Title,description,company,location,salary,role}=req.body
        const {jobId}=req.params
        console.log(jobId)
        const Job=await Jobs.findByIdAndUpdate(jobId,{Title,description,company,location,salary:salary,role},{new:true})
        
        res.json({message:"updated successfully",data:Job})
        
    } catch (error) {
        const err={statusCode:400,err:"invalid one"}
        next(err)
    }
}

const DeleteJobById=async(req,res,next)=>{
    try {
        const{jobId}=req.params
        const job=await Jobs.findByIdAndDelete(jobId)
        if(!job){
            res.send("not deletd")
        }else{
            res.send("deleted")
        }

    } catch (error) {
        console.log(error.message)
        next({statusCode:400,message:error.message})
    }
}

const AlljobsPosted = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.mine === "true") {
      filter.postedBy = req.userId; 
    }

    const jobs = await Jobs.find(filter)
      .populate("postedBy", "name -_id");

    res.json({
      message: req.query.mine === "true" ? "Jobs you posted" : "All jobs",
      data: jobs
    });

  } catch (error) {
    next({ statusCode: 400, message: "Something went wrong" });
  }
};




// application Apis

const ViewApplications=async(req,res,next)=>{
 try {
     const userInfo=req.userId._id
   const jobPosted=await Jobs.find({postedBy:req.userId})
   const JobId=jobPosted.map(job=>job._id)
   const applicants=await Application.find({job:{$in:JobId}}).select(["-createdAt","-updatedAt","-__v"]).populate("applicant",["name","-_id"])
   res.status(200).send(applicants)
 } catch (error) {
    next({ statusCode: 400, message: "Something went wrong" });
 }
}

const UpdateApplicationStatus=async(req,res,next)=>{
  
   try {
    const JobId=req.params.applicationId
   const {status}=req.body
   const emplyId=req.userId._id
   const application = await Application.findById(JobId).populate("job");
   if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }
  if (application.job.postedBy.toString() !== emplyId.toString()) {
    return res.status(403).json({ message: "You can only update applications for your jobs" });
  }
 application.status = status;
  const updatedApplication = await application.save();

  console.log(updatedApplication);
  res.status(200).json({
    message: "Application status updated successfully",
    data: updatedApplication
  });

} catch (error) {
  next({ statusCode: 500, err: error.message });
}
}
module.exports={jobs,UpdateJobById,DeleteJobById,AlljobsPosted,UpdateApplicationStatus,ViewApplications}