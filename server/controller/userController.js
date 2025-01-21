import {validationResult} from 'express-validator';
import createUser from '../services/userCreateSer.js';
import { userModel } from '../models/userModel.js';
import { s3 } from '../services/s3Services.js';
import fs from 'fs';


let userRegister = async (req, res, next) => {
    try {
      let validateError = validationResult(req);
      const tempFilePath = req.files.profilePicture.tempFilePath;
      let { name,email,password,role,contact, } = req.body;
      
      let existuser = await userModel.findOne({email});
      
      if (!validateError.isEmpty()) {
        let ValidateErro = new Error(`validateError.array()[0].msg`);
        return next(ValidateErro);
      };

      if (existuser) {
        let existuserErr = new Error("user alredy exist");
        return next(existuserErr);
      };
  

      const params={
          Bucket: "bookmangment",
          Key: req.files.profilePicture.name,
          Body:req.files.profilePicture.data,
          ACL:'public-read'
        };
      
    
      let fileUrl = await s3.upload(params).promise();
  
      fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error('Error deleting the local file:', err.message);
      } else {
        console.log('Local file deleted successfully');
      }
    });
 
      let user = await createUser(name,email,password,role,contact, fileUrl, next);
         user.password=undefined;
       console.log(user)
      res.status(200).json({
        success:true,
        message:"user register successfully.....",
        user
      });
    } catch (error) {
      next(error)
    }
};

let loginUser = async (req, res, next) => {
  try {

    let validateError = validationResult(req);


    if (!validateError.isEmpty()) {
      let ValidateErro = new Error(validateError.array()[0].msg);
      console.log("in validation")
      return next(ValidateErro)
    };
    
    let { email, password } = req.body

    if (!email || !password) {
      let fieldError = new Error("all field are required");
      next(fieldError)
    };

    let existingUser = await userModel.findOne({ email }).select('+password')

    if (!existingUser) {
      let existingUserErr = new Error("user is not existing");
      next(existingUserErr);
    };

    let isMatch = await existingUser.comparePassword(password, next);

    if (!isMatch) {
      let passwordNotMatErr = new Error("invalid user credential");
      return next(passwordNotMatErr);
    };

    let token = await existingUser.genrateToken(next);
     

    res.status(200).cookie("token",token).json({
      success: true,
      message: "user login is successfully",
      existingUser

    });

  } catch (error) {
    console.log(error)
    next(error)
  }
};





  export {userRegister,loginUser}