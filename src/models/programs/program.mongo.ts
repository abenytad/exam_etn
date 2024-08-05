import { Document, Schema, model, Model } from "mongoose";
export interface ProgramType extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  courses: Schema.Types.ObjectId[];
}

const programSchema: Schema = new Schema<ProgramType>({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    courses:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        }
    ]
},{timestamps:true});


const Program:Model<ProgramType>=model<ProgramType>('Program',programSchema);
export default Program;