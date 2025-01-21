import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  content:[
    {
      tittle: {
        type: String,
        required: true,
      },
      ContentData: {
        type: String,
        enum: ['video', 'text', 'PDF'],
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  
},{timestamps:true});


CourseSchema.index({title:'text',price:'text',instructor:'text'})
let CourseModel = mongoose.model('Course', CourseSchema);

export {CourseModel}