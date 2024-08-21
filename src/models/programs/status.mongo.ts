import {Document,Schema, model,Model} from 'mongoose';
export interface StatusType extends Document {
    userId:Schema.Types.ObjectId;
    courseId:Schema.Types.ObjectId;
    status:boolean;
}

const statusSchema:Schema=new Schema<StatusType>(
    {
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        courseId: {type: Schema.Types.ObjectId, ref: 'Course'},
        status: {type:Boolean,default:false},
    },
    { timestamps: true }
);

const Status:Model<StatusType>=model<StatusType>('Status',statusSchema);
export default Status;