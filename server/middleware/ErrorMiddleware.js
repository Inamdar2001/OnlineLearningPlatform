 
 
 let ErrorMiddleware=(err,req,res,next)=>{
    res.status(500||err.status).json({
        success:false,
        message:err.message
    })
 }

 export default ErrorMiddleware