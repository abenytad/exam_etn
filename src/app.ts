import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import programRouter from './routes/programs/program.route';
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/programs',programRouter);

module.exports=app;