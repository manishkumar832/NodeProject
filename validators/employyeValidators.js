const {body,validationResult,param}=require("express-validator")

exports.JobsValidator=[
    body("Title").isString().isLength({min:3}).trim().withMessage("invalid Title"),
    body("description").isString().isLength({min:3}).withMessage("please fill descripion"),
    body("company").isString().isLength({min:3}).withMessage("fill Company details"),
    body("location").isString().isLength({min:3}).withMessage("fill Location details"),
    body("salary").isLength({min:3}).withMessage("fill salary details"),
    body("role").isString().isLength({min:3}).withMessage("fill role details"),
]

exports.UpdateJobValidator=[
    body("Title").isString().isLength({min:3}).trim().withMessage("invalid Title"),
    body("description").isString().isLength({min:3}).withMessage("please fill descripion"),
    body("company").isString().isLength({min:3}).withMessage("fill Company details"),
    body("location").isString().isLength({min:3}).withMessage("fill Location details"),
    body("salary").isLength({min:3}).withMessage("fill salary details"),
    body("role").isString().isLength({min:3}).withMessage("fill role details"),
    param("jobId").withMessage("invalid Id")
]

exports.deleteValidator=[
      param("jobId").isUUID().withMessage("invalid Id")
]

exports.UpdateStatusVlidator=[
    param("applicationId").isUUID().withMessage("invalid Id passed")
]

exports.employeevalidations=[
   (req,res,next)=>{
        const result=validationResult(req)
        if(!result.isEmpty()){
          const err={
            statusCode:400,
            message:"validations error",
            errors:result.errors

          }
          next(err)
        }
        next()
    }
]