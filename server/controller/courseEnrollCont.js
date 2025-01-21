import { createCourseEnro } from "../services/createCouEntro.js";
import EnrollmentModel from "../models/courseEnrollmModel.js";
import { userModel } from "../models/userModel.js";
import mongoose from 'mongoose';
let createEnrollment = async (req, res, next) => {
    try {
        let courseId = req.params.id;
        let userId = req.user._id;
        let courseEnrollment = await createCourseEnro(userId, courseId, next);

        res.status(200).json({
            success: true,
            message: "courseEnrollment successfully",
            courseEnrollment
        });

    } catch (error) {
        next(error)
    }
};

let courseEnrollmentByuser = async (req, res, next) => {
    try {
        let { _id } = req.user;
        let userEnrollCourse = await EnrollmentModel.find({ userId: _id });

        if (userEnrollCourse.length === 0) {
            return next(new Error("user not Enrollment any course.."))
        };
        res.status(200).json({
            success: true,
            message: "user Enrollment course get successfully...",
            userEnrollCourse
        });

    } catch (error) {
        next(error)
    }
};

let coureseEnrollAlluser = async (req, res, next) => {
    try {
        let { id } = req.params
        let enrollCourse = await EnrollmentModel.find({ courseId: id });

        const users = [...new Set(enrollCourse.map((course) => course.userId.toString()))];
       console.log(users)
        let User = await userModel.find({ _id: { $in: users } })
        res.status(200).json({
            success: true,
            message: "course enrollment all user get successfully",
            User
        });

    } catch (error) {
        next(error)
    }
}

export { createEnrollment, courseEnrollmentByuser, coureseEnrollAlluser }