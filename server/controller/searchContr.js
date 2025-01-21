import { CourseModel } from "../models/cousrseModel.js";

let searchCourse=async(req,res,next)=>{
    try {
        let {course ,instructor,price,page=1,limit=10}=req.query

        let filter={};

        if(course)filter.course=course;
        if(instructor)filter.instructor=instructor;
        if(price)filter.price=price
       let Course=await CourseModel.find({$text:{$search:filter}}).limit(parseInt(limit)).skip((page-1)*limit);
     res.status(200).json({
        success:true,
        message:"course get successfully",
        Course
     })

    } catch (error) {
        next(error)
    }
};

export {searchCourse}