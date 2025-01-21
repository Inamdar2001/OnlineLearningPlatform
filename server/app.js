import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConfig.js';
import expressfileupload  from 'express-fileupload';
import ErrorMiddleware from './middleware/ErrorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { isAuth } from './middleware/authMiddleware.js';
import courseEnRoutes from './routes/courseEnRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

dbConnect(process.env.DB_URL);
let app=express();


let port =process.env.PORT||8000

app.use(express.json());
app.use(cookieParser())
app.use(expressfileupload({
    useTempFiles:true,
    tempFileDir:'/temp'
}));

app.use('/user',userRoutes);
// app.use(isAuth);
app.use('/course',courseRoutes);
app.use('/courseEnro',courseEnRoutes);
app.use('/forum',forumRoutes)

app.use(ErrorMiddleware);
app.listen(port,()=>{
    console.log(`server started at this port ${port}`);
})