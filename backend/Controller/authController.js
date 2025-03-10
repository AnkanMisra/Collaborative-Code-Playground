
import userModel from '../models/userModel.js'

//User signUp middleware
const signUp=async (req,res,next)=>{
   
    const {email,name,contactNumber,password,confirmPassword}=req.body

   if(!email || !name|| !contactNumber ||!password ||!confirmPassword){
    return res.status(404).json({
        status:"fail"
    })
   }

    try{
        //Creating the user
      const user= await userModel.create(req.body)

    return res.status(201).json({
        status:"success",
        user
    })
}
catch(err){
    return res.status(404).json({
        status:err
    })
}
}

export default {
    signUp
}