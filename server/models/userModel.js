import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  role: {
    type: String,
    enum: ['learner', 'admin'],
    default: 'learner'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  
},{timestamps:true});

userSchema.pre('save',async function(next){
    try {
       let user=this;
    if(user.isModified('password')){
       let hashPassword=await bcrypt.hash(user.password,10);
       user.password=hashPassword;
    }
    next()
    } catch (error) {
       next(error)
    }
 
 });
 userSchema.methods.comparePassword=async function(password,next){
    let user=this
    try {
       let isMatch=await bcrypt.compare(password,user.password);
       return isMatch
    } catch (error) {
       next(error)
    }
 };
 
 userSchema.methods.genrateToken=async function(next){
    let user=this
    try {
       let token=await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY);
       return token;
    } catch (error) {
       next(error)
    }
 }
 
const userModel = mongoose.model('User', userSchema);

export {userModel};
