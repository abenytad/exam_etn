import {Schema,model, Document,Model} from 'mongoose';
export interface MaterialType extends Document {
    name: string;
    description?: string;
    materialUrl:string;
    type:string;
    courseId:Schema.Types.ObjectId;
    occurence:number;
}


const materialSchema:Schema=new Schema<MaterialType>({
    name: {type:String,required:true},
    description: {type:String},
    materialUrl: {type:String,required:true},
    type: {type:String,required:true},
    courseId: {type: Schema.Types.ObjectId, ref: 'Course'},
    occurence: {type:Number,required:true},
},{timestamps:true});

const Material:Model<MaterialType>=model<MaterialType>('Material',materialSchema);
export default Material;