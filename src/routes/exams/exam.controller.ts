import { Request, Response } from "express";
import { ExamType } from "../../models/exams/exam.mongo";
import { QuestionType } from "../../models/exams/question.mongo";
import {
  createQuestion,
  getQuestion,
  getQuestionIds,
  createExam,
  addAnswer,
  result,
  getExam,
  getTheQuestion
} from "../../models/exams/exam.model";

const newQuestion = async (req: Request, res: Response) => {
  try {
    const data: QuestionType = req.body;
    const question = await createQuestion(data);
    return res.status(201).json(question);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const fetchQuestionIds = async (req: Request, res: Response) => {
  try {
    const { programId,userId }: { programId?: string,userId?:string } = req.params;
    const questionIds: any = await getQuestionIds(programId, 5);
    const examData = {
      userId,
      programId,
      questions: questionIds.map((data: any) => ({
        questionId: data.questionId,
        answer: 10,      
        correctAnswer: data.answer
      }))
    };
  
    const exam=await createExam(examData);
    const questionIdList = exam.questions.map((q: any) => q.questionId);
    const data={
      _id:exam._id,
      userId:exam.userId,
      programId:exam.programId,
      questionIds:questionIdList
    }
    console.log('hii there')
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};
// to be checked
const fetchQuestion = async (req: Request, res: Response) => {
  try {
    const { examId, questionId }: { examId?: string; questionId?: string } =
      req.params;
    const question = await getQuestion(examId, questionId);
   
    return res.status(200).json(question);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const newExam = async (req: Request, res: Response) => {
  try {
    const data: ExamType = req.body;
    const exam = await createExam(data);
    return res.status(201).json(exam);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const giveAnswer = async (req: Request, res: Response) => {
  try {
    const {
      examId,
      questionId,
      answer,
    }: { examId?: string; questionId?: string; answer?: number } = req.body;

    if (!examId || !questionId || answer === undefined) {
      throw new Error("Missing required parameters");
    }

    const result = await addAnswer(examId, questionId, answer);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const getScore = async (req: Request, res: Response) => {
  try {
    const {examId}:{examId?:string}=req.params;
    const score = await result(examId);
    return res.status(200).json(score);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const getAllExamQuestions = async (req: Request, res: Response) => {
  try {
    const { examId } = req.params;
    
    if (!examId) {
      return res.status(400).json({ error: 'Exam ID is required' });
    }

    const exam = await getExam(examId);
    
    if (!exam || !exam.questions) {
      return res.status(404).json({ error: 'Exam or questions not found' });
    }

    // Fetch questions in parallel
    const questions = await Promise.all(
      exam.questions.map(async (value) => {
        const questionData = await getTheQuestion(value.questionId);
        return {
          ...questionData,
          givenAnswer: value.answer,
        };
      })
    );

    return res.status(200).json(questions);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};
export {
    newQuestion,fetchQuestion,fetchQuestionIds,newExam,giveAnswer,getScore,getAllExamQuestions
}