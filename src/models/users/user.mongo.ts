import {Document,Schema,model,Model} from 'mongoose';

export interface UserType extends Document {
    name: string;
    phoneNumber:number;
    enrolledPrograms:{
        programId:string,
        status:number,
    }[];
}


const userSchema:Schema= new Schema<UserType>(
    {
        name:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        enrolledPrograms:[
            {
                programId: {
                    type: String,
                    required: true,
                },
                status: {
                    type: Number,
                    required: true,
                },
            }
        ]
            
    },{timestamps:true}
);

const User:Model<UserType>=model<UserType>("User",userSchema);
export default User;