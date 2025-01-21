import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enrollmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
 }, 
 courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course', 
  },
  progress: {
    type: Number,
    min: 0,
    max: 100, 
    default: 0,
  },
 
},{ timestamps: true });

const EnrollmentModel = model('Enrollment', enrollmentSchema);

export default EnrollmentModel;
