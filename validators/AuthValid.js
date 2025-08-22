const {body,validationResult, header}=require("express-validator")

exports.SignupValidator=[
    body("name").isLength({min:3,max:15}).trim().isString().withMessage("inavlid name"),
    body("email").isString().trim().isEmail().withMessage("inavlid name"),
    body("password").isLength({min:3,max:15}).trim().isAlphanumeric().withMessage("inavlid name"),
    body("username").isLength({min:3,max:15}).trim().isString().withMessage("inavlid name"),
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


exports.LoginValidator=[
   body("email").isString().trim().isEmail().withMessage("inavlid name"),
    body("password").isLength({min:3,max:15}).trim().withMessage("inavlid name"),
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

exports.tokenValidator=[
  header("authorization").isString().withMessage("invalid token")
]

exports.editvalidator=[
   body("name").optional().isLength({min:3,max:15}).trim().isString().withMessage("inavlid name"),
    body("email").optional().isAlphanumeric().trim().isEmail().withMessage("inavlid name"),
    body("password").optional().isLength({min:3,max:15}).trim().isAlphanumeric().withMessage("inavlid name"),
    body("username").optional().isLength({min:3,max:15}).trim().isString().withMessage("inavlid name"),
]

exports.validations=[
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