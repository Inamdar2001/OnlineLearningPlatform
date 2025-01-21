import express from 'express';
import { searchCourse } from '../controller/searchContr.js';

let searchRpoutes=express.Router();

searchRpoutes.get('/searchCourse',searchCourse);