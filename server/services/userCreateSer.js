import { userModel } from "../models/userModel.js";

let createUser=async(name,email,password,role,contact,fileUrl,next)=>{
     try {
        if(!name||!email||!password||!role||!contact){
         let allFieldReqErr=new Error('all field are required');
         return next(allFieldReqErr)
        };
        
        let user=await userModel.create({name,email,password,role,contact,profilePicture:fileUrl.Location});
        
        return user
    
     } catch (error) {
         next(error)
     }
};


export default createUser