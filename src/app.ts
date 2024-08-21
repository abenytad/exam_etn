import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import programRouter from './routes/programs/program.route';
import userRouter from './routes/users/user.route';
import examRouter from './routes/exams/exam.route';
import authRouter from './routes/auths/auth.route';
require('dotenv').config();
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/programs',programRouter);
app.use('/users',userRouter);
app.use('/exams',examRouter);
app.use('/auth',authRouter);

module.exports=app;