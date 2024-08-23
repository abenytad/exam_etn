import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import programRouter from './routes/programs/program.route';
import userRouter from './routes/users/user.route';
import examRouter from './routes/exams/exam.route';
import authRouter from './routes/auths/auth.route';
import { OpenAI } from 'openai';
require('dotenv').config();
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.use('/programs',programRouter);
app.use('/users',userRouter);
app.use('/exams',examRouter);
app.use('/auth',authRouter);

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
});

export const getChatCompletion=async (prompt: string) =>{
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



module.exports=app;