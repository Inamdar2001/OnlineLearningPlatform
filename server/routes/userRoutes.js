import express from 'express';
import {body} from 'express-validator';
import { userRegister,loginUser } from '../controller/userController.js';
let userRoutes=express.Router();


userRoutes.post('/singUp', body('name').isLength({min:3}).withMessage("Name character length greater then 3 or less then 10"),
body('email').isEmail().withMessage("please enter valid email address"),
body('password').isLength({min:3,max:15}).withMessage('password length greater then 3 or less then 8'),userRegister);

userRoutes.post('/login',body('email').isEmail().withMessage("please enter valid email address"),
body('password').isLength({min:3,max:15}).withMessage('password length greater then 3 or less then 8'),loginUser);

export default userRoutes