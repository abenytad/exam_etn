import { Document, Schema, model, Model } from "mongoose";
export interface ProgramType extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  totalCourses: number;
  totalMocks: number;
  totalModels: number;
  nationalExams: number[];
  price: number;
  courses: Schema.Types.ObjectId[];
}

const programSchema: Schema = new Schema<ProgramType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    totalCourses: {
      type: Number,
      required: true,
    },
    totalMocks: {
        type: Number,
        required: true,
      },
      totalModels: {
        type: Number,
        required: true,
      },
      nationalExams: [{
        type: Number,
        required: true,
      }],
      price:{
        type:Number,
        required:true
      },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const Program: Model<ProgramType> = model<ProgramType>(
  "Program",
  programSchema
);
export default Program;
