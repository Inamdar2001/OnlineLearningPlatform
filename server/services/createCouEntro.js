import EnrollmentModel from "../models/courseEnrollmModel.js"

let createCourseEnro=async(userId,courseId,next)=>{
    try {
        let courseEnroll=await EnrollmentModel.create({userId,courseId});
        return courseEnroll
    } catch (error) {
        next(error)
    }
};

export {createCourseEnro}