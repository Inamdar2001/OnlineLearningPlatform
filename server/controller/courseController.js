import { s3 } from '../services/s3Services.js';
import { validationResult } from 'express-validator';
import fs from 'fs';
import createcourse from '../services/courseCreateServ.js';
import { CourseModel } from '../models/cousrseModel.js';

const createCourse = async (req, res, next) => {
  try {
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return next(new Error(validateError.array()[0].msg));
    }

    if (!req.files || !req.files.ContentData) {
      return next(new Error("No file uploaded"));
    }

    const fileContent = req.files.ContentData;
    const tempfile = fileContent.tempFilePath;

    if (!tempfile) {
      return next(new Error("Temporary file path not found"));
    }


    const filestream = fs.createReadStream(tempfile);

    filestream.on('error', (err) => {
      console.error('File Stream Error:', err);
      return next(err);
    });
    const params = {
      Bucket: "bookmangment",
      Key: fileContent.name,
      Body: filestream,
      ACL: 'public-read',
    };

    const fileUrl = await s3.upload(params).promise();

    const course = await createcourse(req, fileUrl.Location, next);

    fs.unlink(tempfile, (err) => {
      if (err) {
        console.error('Error deleting the local file:', err.message);
      } else {
        console.log('Local file deleted successfully');
      }
    });

    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course
    });

  } catch (error) {
    console.error('Error:', error.message);
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    let { id } = req.params
    const validateError = validationResult(req);
    const { title, description, instructor, tittle, price } = req.body;

    if (!validateError.isEmpty()) {
      return next(new Error(validateError.array()[0].msg));
    }

    let course = await CourseModel.findById(id);
    if (!course) {
      return next(new Error("course is not avilable..."))
    }
    let imageUrl = course.content[0].url;


    if (req.files) {
      const fileContent = req.files.ContentData;
      const tempfile = fileContent.tempFilePath;
      let imageKey = imageUrl.split('/').pop();

      await s3.deleteObject({
        Bucket: "bookmangment",
        Key: imageKey,
      }).promise();

      const filestream = fs.createReadStream(tempfile);

      filestream.on('error', (err) => {
        console.error('File Stream Error:', err);
        return next(err);
      });

      const params = {
        Bucket: "bookmangment",
        Key: fileContent.name,
        Body: filestream,
        ACL: 'public-read'
      };

      let resultURL = await s3.upload(params).promise();

      imageUrl = resultURL.Location

      fs.unlink(tempfile, (err) => {
        if (err) {
          console.error('Error deleting the local file:', err.message);
        } else {
          console.log('Local file deleted successfully');
        };
      });

    }
    let Content = {
      url: imageUrl
    };

    let Course = await CourseModel.findByIdAndUpdate(id, { title, description, instructor, tittle, price, content: Content },
      { new: true });
    res.status(200).json({
      success: true,
      message: "course updated successfully",
      Course
    });

  } catch (error) {
    console.log(error)
    next(error)
  }
};

const getCourse = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.body;

    let course = await CourseModel.find({}).limit(parseInt(limit)).skip((page - 1) * limit);

    if (course.length === 0) {
      let productNotErr = new Error("sorry course is Not found...");
      next(productNotErr)
    };
    res.status(200).json({
      success: true,
      message: "course get successfully",
      course
    })
  } catch (error) {
    next(error)
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    let { id } = req.params
    let course = await CourseModel.findByIdAndDelete({ id });
    
    if (!course) {
      next( new Error("sorry course is Not found..."))
    };

    res.status(200).json({
      success: true,
      message: "course delete successfully",
    });

  } catch (error) {
    next(error)
  }
};


export { createCourse, updateCourse, getCourse, deleteCourse }