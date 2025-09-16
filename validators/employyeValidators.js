const {body,validationResult,param}=require("express-validator")

exports.JobsValidator=[
    body("Title").isString().isLength({min:3}).trim().matches(/^[A-Za-z ]+$/).withMessage("invalid Title"),
    body("description").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("please fill description"),
    body("company").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill Company details"),
    body("location").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill Location details"),
    body("salary").isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill salary details"),
    body("role").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill role details"),
]

exports.UpdateJobValidator=[
    body("Title").isString().isLength({min:3}).trim().matches(/^[A-Za-z ]+$/).withMessage("invalid Title"),
    body("description").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("please fill descripion"),
    body("company").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill Company details"),
    body("location").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill Location details"),
    body("salary").isString().withMessage("fill salary details"),
    body("role").isString().isLength({min:3}).matches(/^[A-Za-z ]+$/).withMessage("fill role details"),
    param("jobId").isMongoId().matches(/^[A-Za-z ]+$/).withMessage("invalid Id")
]

exports.deleteValidator=[
      param("jobId").isMongoId().withMessage("invalid Id")
]

exports.UpdateStatusVlidator=[
    param("applicationId").isMongoId().withMessage("invalid Id passed")
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