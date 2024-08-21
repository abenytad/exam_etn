import { Document, Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
export interface UserType extends Document {
    _id: Types.ObjectId;
    name: string;
    phoneNumber: number;
    password: string;
    enrolledPrograms:string[];
}

// Define a custom type for the static methods
interface UserModel extends Model<UserType> {
    login(phoneNumber: number, password: string): Promise<UserType | null>;
}

const userSchema: Schema<UserType> = new Schema<UserType>(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        enrolledPrograms: [
            {
                type:String
            }
        ]
    },
    { timestamps: true }
);

userSchema.pre<UserType>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define static method correctly
userSchema.statics.login = async function (phoneNumber: number, password: string): Promise<UserType | null> {
    const user = await this.findOne({ phoneNumber }).select('_id name phoneNumber enrolledPrograms password');
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            // Remove the password field before returning the user object
            user.password = undefined;
            return user;
        }
        throw new Error('Invalid password');
    }
    throw new Error('Invalid phone number');
};


// Cast the model to UserModel type
const User: UserModel = model<UserType, UserModel>('User', userSchema);

export default User;
