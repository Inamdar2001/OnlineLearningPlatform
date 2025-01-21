import mongoose from "mongoose";

const {Schema,model} = mongoose;

const commentSchema = new Schema({
  comuserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, },
},{timestamps:true});

const mainSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  comments: [commentSchema],
},{timestamps:true});

const forumModel = model('Main', mainSchema);

export  {forumModel};
