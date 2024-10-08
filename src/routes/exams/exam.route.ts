import { Router } from "express";
import { newQuestion,fetchQuestion,fetchQuestionIds,newExam,giveAnswer,getScore,getAllExamQuestions } from "./exam.controller";

const examRouter:Router=Router();
// examRouter.post("/create",newExam);
examRouter.post('/question',newQuestion);
examRouter.get('/questions/:programId/:userId',fetchQuestionIds);
examRouter.get('/question/:examId/:questionId',fetchQuestion);
examRouter.post('/answer',giveAnswer);
examRouter.get('/result/:examId',getScore);
examRouter.get('/all/:examId',getAllExamQuestions);

export default examRouter;