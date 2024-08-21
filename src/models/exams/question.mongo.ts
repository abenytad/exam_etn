import { Document, Schema, model, Model } from "mongoose";

export interface QuestionType extends Document {
  programId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  question: string;
  type: string;
  options: string[];
  answer: number;
}

const questionSchema: Schema = new Schema<QuestionType>(
  {
    programId: { type: Schema.Types.ObjectId, ref: "Program" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    question: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    answer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Question: Model<QuestionType> = model<QuestionType>(
  "Question",
  questionSchema
);
export default Question;
