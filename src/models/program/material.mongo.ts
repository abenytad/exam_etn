import {Schema,model, Document,Model} from 'mongoose';
export interface MaterialType extends Document {
    name: string;
    description?: string;
    materialUrl:string;
    type:string;
    course:Schema.Types.ObjectId;
}


const materialSchema:Schema=new Schema<MaterialType>({
    name: {type:String,required:true},
    description: {type:String},
    materialUrl: {type:String,required:true},
    type: {type:String,required:true},
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
},{timestamps:true});

const Material:Model<MaterialType>=model<MaterialType>('Material',materialSchema);
export default Material;