async function ErrorMiddle(err,req,res,next) {
    console.log(err)
     return res.status(err.statusCode).json({message:err.message,error:err.errors})
}
module.exports ={ErrorMiddle}