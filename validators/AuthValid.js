const {body,validationResult, header}=require("express-validator")

exports.SignupValidator=[
    body("name").isLength({min:3,max:15}).trim().isString().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("invalid name"),
    body("email").trim().isEmail().withMessage("invalid name"),
    body("password").isLength({min:3,max:15}).trim().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("invalid password"),
    body("username").isLength({min:3,max:15}).trim().isString().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("invalid username"),
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
   body("email").trim().isEmail().withMessage("invalid email"),
    body("password").isLength({min:3,max:15}).trim().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("invalid password"),
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
   body("name").optional().isLength({min:3,max:15}).trim().isString().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("inavlid name"),
    body("email").optional().trim().isEmail().withMessage("invalid email"),
    body("password").optional().isLength({min:3,max:15}).trim().isAlphanumeric().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("invalid password"),
    body("username").optional().isLength({min:3,max:15}).trim().isString().matches(/^[A-Za-z0-9 ~!@#$%^&*\-_"':<>/;,.]+$/).withMessage("invalid username"),
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