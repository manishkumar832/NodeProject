const express=require("express")
const Route=express.Router()
const {ApplyJob,showAllJobs,ShowJobsById,myApplications,DeleteApplication}=require("../controllers/JobseekerControll.js")
const { tokenValidator, validations } = require("../validators/AuthValid.js")
const { checkAuth, checkrole } = require("../middlewares/authMiddleware.js")
const {upload}=require("../utils/multerFile.js")
const {ShowJobsIdValidator,ApplyValidator,DeleteVlidator,Jobseekervalidations}=require("../validators/jobseekervalidators.js")


Route.post("/apply",tokenValidator,validations,checkAuth,checkrole("jobseeker"), upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 }
  ]),ApplyValidator,Jobseekervalidations,ApplyJob)
Route.get("/ShowJobs",tokenValidator,validations,checkAuth,checkrole("jobseeker"),showAllJobs)
Route.get("/ShowJobs/:id",tokenValidator,validations,checkAuth,checkrole("jobseeker"),ShowJobsIdValidator,Jobseekervalidations,ShowJobsById)

Route.get("/myApplications",tokenValidator,validations,checkAuth,checkrole("jobseeker"),myApplications)
Route.delete("/myApplications/:id",tokenValidator,validations,checkAuth,checkrole("jobseeker"),DeleteVlidator,Jobseekervalidations,DeleteApplication)

module.exports=Route