import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enrollmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user', 
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course', 
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100, 
    default: 0,
  },
  enrolledAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, { timestamps: true });

const EnrollmentModel = model('Enrollment', enrollmentSchema);

export default EnrollmentModel;
