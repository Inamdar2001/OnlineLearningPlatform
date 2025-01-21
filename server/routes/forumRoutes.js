import express from 'express';
import { createForum, getForums ,addComment} from '../controller/ForumControl.js';


let forumRoutes=express.Router();

forumRoutes.post('/createforum',createForum);
forumRoutes.get('/forumlist',getForums);
forumRoutes.post('/addcommenAtForum/:id',addComment);

export default forumRoutes

