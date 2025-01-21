import { forumModel } from "../models/ForumModel.js"


let createforum=async(req,next)=>{
 try {
    let {title}=req.body 
    let {_id}=req.user;
    let forum= await forumModel.create({title,userId:_id});
    
    return forum
        
  
 } catch (error) {
    next(error)
 }
};

export default createforum