import { CourseModel } from "../models/cousrseModel.js";

const createcourse = async (req, fileUrl, next) => {
  try {
    const { title, description, instructor, tittle, price } = req.body;

    if (!title || !instructor || !price) {
      return next(new Error("All fields (title, instructor, content, and price) are required."));
    };

     let Content={
      tittle:tittle,
      url:fileUrl
     };

    const course = await CourseModel.create({ title, description, instructor,content:Content, price });
      
    return course;
  } catch (error) {
    console.error("Error creating course:", error.message);
    next(error);
  }
};

export default createcourse;
