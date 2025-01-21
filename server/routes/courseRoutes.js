import express from 'express';
import { createCourse, getCourse, updateCourse ,deleteCourse} from '../controller/courseController.js';
import {body} from 'express-validator';
import { isAuth } from '../middleware/authMiddleware.js';
const courseRoutes=express.Router();


courseRoutes.post('/createCourse',body('title').isLength({min:3,max:30}).withMessage("title character length greater then 3 or less then 30"),isAuth,
createCourse);

courseRoutes.put('/updateCourse/:id',body('title').isLength({min:3,max:30}).withMessage("title character length greater then 3 or less then 30"),
isAuth,updateCourse);

courseRoutes.get('/getcourses',isAuth,getCourse);
courseRoutes.delete('/deletecourse/:id',isAuth,deleteCourse)
export default courseRoutes   