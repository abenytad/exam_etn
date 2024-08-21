import User, { UserType } from "./user.mongo";

const createUser = async (data: UserType): Promise<UserType> => {
  const user = new User(data);
  return await user.save(); // Ensure that `data.password` is provided here
};

const addProgram = async (
  userId: string,
  programId: string
): Promise<UserType | null> => {
  const user = await User.findById(userId);
  if (!user) return null;
  if (!user.enrolledPrograms) {
    user.enrolledPrograms = [];
  }
  user.enrolledPrograms.push(programId);
  await user.save();
  return user;
};

const getUser = async (userId: string): Promise<UserType | null> => {
  return await User.findById(userId).populate("enrolledPrograms");
};


const getUserByPhoneNumber = async (
  phoneNumber: number,
  userId: string
): Promise<boolean> => {
  // Find a user by phone number
  const existingUser: UserType | null = await User.findOne({ phoneNumber }).exec();
  
  // Check if the user exists and if their _id is different from the provided userId
  if (existingUser && existingUser._id.toString() !== userId) {
    return false;
  }
  return true;
};

const getEnrolledProgramIds = async (userId: string): Promise<string[]> => {
  const user = await User.findById(userId);
  return user?.enrolledPrograms ?? [];
};

const getAuthUser = async (
  phoneNumber: number,
  password: string
): Promise<UserType | null> => {
  return await User.login(phoneNumber, password);
};
async function saveModified(require: any) {
  await require.save();
}
export {
  createUser,
  addProgram,
  getEnrolledProgramIds,
  getAuthUser,
  getUser,
  saveModified,
  getUserByPhoneNumber,
};
