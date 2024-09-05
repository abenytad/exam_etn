import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import programRouter from "./routes/programs/program.route";
import userRouter from "./routes/users/user.route";
import examRouter from "./routes/exams/exam.route";
import authRouter from "./routes/auths/auth.route";
import bankRouter from "./routes/banks/banks.route";
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const chatbotFunc = async (prompt: string) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  let responseText = await result.response.text();
  responseText = responseText
    .replace(/\n+/g, ' ') 
    .replace(/\s{2,}/g, ' ')
    .trim(); 
  return responseText;
};

// Add a GET route that returns "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/programs", programRouter);
app.use("/users", userRouter);
app.use("/exams", examRouter);
app.use("/auth", authRouter);
app.use("/banks", bankRouter);

module.exports = app;
