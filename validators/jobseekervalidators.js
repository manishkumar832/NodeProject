const {body,validationResult,param}=require("express-validator")


exports.ShowJobsIdValidator=[
   param("id").isMongoId().withMessage("Invalid Job Id passed")
]


exports.ApplyValidator=[
    body("jobId").isMongoId().withMessage("Invalid Job Id"),
    body("name").isString().trim().matches(/^[A-Za-z ]+$/).isLength({min:3,max:15}).withMessage("invalid name"),
    body("email").isEmail().trim().withMessage("invalid Email"),
    body("phone").isString().trim().isLength({min:10}).withMessage("please check Number"),
    body("skills").isString().trim().matches(/^[A-Za-z ]+$/).isLength({min:5}).withMessage("Mention Your Skills"),
    body("education").isString().trim().matches(/^[A-Za-z ]+$/).withMessage("Education details")
]

exports.DeleteVlidator=[
     param("id").isMongoId().withMessage("Invalid Application Id")
]

exports.Jobseekervalidations=[
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