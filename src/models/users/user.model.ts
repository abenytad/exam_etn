import User,{UserType} from "./user.mongo";

const createUser=async (data:UserType):Promise<UserType>=>{
    return await User.create(data);
}

const addProgram=async(userId:string,programId:string):Promise<UserType | null>=>{
    const user=await User.findById(userId);
    if(!user) return null;
    if (!user.enrolledPrograms) {
        user.enrolledPrograms = [];
    }
    user.enrolledPrograms.push({
        programId: programId,
        status:0
    });
    await user.save();
    return user;
}

const getEnrolledProgramIds = async (userId: string): Promise<{
    programId: string,
    status: number
}[]> => {
    const user = await User.findById(userId);
    return user?.enrolledPrograms ?? [];
};


export {createUser,addProgram,getEnrolledProgramIds}