const express=require("express")
const Route=express.Router()
const {jobs,UpdateJobById,DeleteJobById,UpdateApplicationStatus,AlljobsPosted, ViewApplications}=require("../controllers/Employyermiddle.js")
const {tokenValidator,validations}=require("../validators/AuthValid.js")
const { checkAuth, checkrole } = require("../middlewares/authMiddleware.js")
const {JobsValidator,employeevalidations,deleteValidator,UpdateStatusVlidator,UpdateJobValidator}=require("../validators/employyeValidators.js")


Route.post("/jobPosting",tokenValidator,validations,checkAuth,checkrole("employee"),JobsValidator,employeevalidations,jobs)
Route.put("/updatejob/:jobId",tokenValidator,validations,checkAuth,checkrole("employee"),UpdateJobValidator,employeevalidations,UpdateJobById)
Route.delete("/Deletejob/:jobId",tokenValidator,validations,checkAuth,checkrole("employee"),deleteValidator,employeevalidations,DeleteJobById)
Route.get("/AlljobsPosted",tokenValidator,validations,checkAuth,checkrole("employee"),AlljobsPosted)


Route.get("/application/:jobId",tokenValidator,validations,checkAuth,checkrole("employee"),ViewApplications)
Route.put("/application/:applicationId",tokenValidator,validations,checkAuth,checkrole("employee"),UpdateStatusVlidator,employeevalidations,UpdateApplicationStatus)

module.exports=Route