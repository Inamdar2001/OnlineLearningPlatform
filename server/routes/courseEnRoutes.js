import express from 'express';
import { createEnrollment,courseEnrollmentByuser,coureseEnrollAlluser } from '../controller/courseEnrollCont.js';
import { isAuth } from '../middleware/authMiddleware.js';

const courseEnRoutes=express.Router();


courseEnRoutes.post('/courseEnroll/:id',isAuth,createEnrollment);
courseEnRoutes.get('/courseEnrouser',isAuth,courseEnrollmentByuser);
courseEnRoutes.get('/courseEnroAlluser/:id',isAuth,coureseEnrollAlluser);
export default courseEnRoutes