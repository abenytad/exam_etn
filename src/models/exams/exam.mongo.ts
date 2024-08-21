import { Document, Schema, model, Model } from "mongoose";
export interface ExamType extends Document {
  userId: string;
  programId: string;
  questions: Array<{
    questionId: any;
    answer: number;
    correctAnswer: number;
  }>;
}

const examSchema: Schema = new Schema<ExamType>({
  userId: { type: String},
  programId: { type: String},
  questions: [
    {
      questionId: { type: Schema.Types.ObjectId,ref: "Question" },
      answer:{
        type:Number,
      },
      correctAnswer:{
        type:Number,
      }
    },
  ],
},{ timestamps: true });

const Exam:Model<ExamType>=model<ExamType>('Exam',examSchema);
export default Exam;
