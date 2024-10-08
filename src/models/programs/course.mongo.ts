import { Document, Schema, model, Model } from "mongoose";
export interface CourseType extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  programId: Schema.Types.ObjectId;
}

const courseSchema: Schema = new Schema<CourseType>(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    programId: { type: Schema.Types.ObjectId, ref: "Program" },
  },
  { timestamps: true }
);

const Course:Model<CourseType>=model<CourseType>('Course',courseSchema);
export default Course;