const asyncHandler= (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    }
}



/***********asyncHandler using try and catch block*************/
/*
const asyncHandler= (func)=>async(req, res, next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
       res.status(err.code || 500).json({
            sucess:false,
            message:error.message
       }) 
    }
}*/

export {asyncHandler}