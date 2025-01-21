import mongoose from 'mongoose';

let dbConnect=async(dburl)=>{
  try {
   await mongoose.connect(dburl);
   console.log("data base connected successfully")
  } catch (error) {
    console.log(error)
  }
};

export default dbConnect