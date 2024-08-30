import Exam, { ExamType } from "./exam.mongo";
import Question, { QuestionType } from "./question.mongo";

const createQuestion = async (data: QuestionType): Promise<QuestionType> => {
  return await Question.create(data);
};

const getQuestionIds = async (
  programId: String,
  limit: number
): Promise<{
  questionId:String,
  answer:number
}[] | []> => {
  if (limit <= 0) {
    throw new Error("Limit must be a positive number");
  }
  const questions = await Question.find({ programId: programId }).lean();
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  const selectedQuestions = questions.slice(0, limit);
  return selectedQuestions.map((question) => {
    const data={
      questionId:question._id.toString(),
      answer:question.answer,
    }
    return data;
  });
};

const createExam = async (data: any): Promise<ExamType> => {
  return await Exam.create(data);
};

const getQuestion = async (
  examId: String,
  questionId: String
): Promise<QuestionType | null> => {
  //   const exam = await Exam.findById(examId).lean();
  const question = await Question.findById(questionId, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
    answer: 0,
  }).lean();
  const exam = await Exam.findOne(
    {
      _id: examId,
      "questions.questionId": questionId,
    },
    {
      "questions.$": 1,
    }
  );
  if(question){
    if(exam && exam.questions.length>0 ){
      if (exam.questions[0].answer===10){
        return {
          programId:question.programId,
          courseId:question.courseId,
          type:question.type,
          _id: question._id,
          question: question.question,
          options: question.options,
          answer: 10
        } as QuestionType; 
      } else {
        return {
          programId:question.programId,
          courseId:question.courseId,
          type:question.type,
          _id: question._id,
          question: question.question,
          options: question.options,
          answer: exam.questions[0].answer
        } as QuestionType;
      }
    }
  }
 
  return null;
};

const addAnswer = async (examId: string, questionId: string, answer: number): Promise<ExamType |null> => {
  const result = await Exam.findOneAndUpdate(
      { _id: examId, 'questions.questionId': questionId },
      { $set: { 'questions.$.answer': answer } },
      { new: true }
  ).lean();
  return result;
}

const result =async(examId:String):Promise<number | 0>=>{
    const exam=await Exam.findById(examId).lean();
    if(exam){
        let score=0;
        for(const value of exam?.questions){
            if(value.answer===value.correctAnswer){
                score++;
            }
        }
        return score;
    }
    else {
        return 0;
    }
}

const getExam =async(examId:String):Promise<ExamType | null>=>{
  return await Exam.findById(examId).lean();
}
const getTheQuestion =async(questionId:String):Promise<QuestionType | null>=>{
  return await Question.findById(questionId,{
    __v:0,
    updatedAt:0,
    createdAt:0
  }).lean();
}


export {
   createQuestion,
   getQuestionIds,
   getQuestion,
   addAnswer,
   result,
   createExam,
   getExam,
   getTheQuestion,
}