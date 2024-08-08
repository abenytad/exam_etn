import Program, { ProgramType } from "./program.mongo";
import Course, { CourseType } from "./course.mongo";
import Material, { MaterialType } from "./material.mongo";
import User,{UserType} from "../users/user.mongo";
const getProgramIds = async (): Promise<string[]> => {
  const programs = await Program.find({}, { _id: 1 }).lean();
  return programs.map((program) => program._id.toString()); // _id is now a string
};

const createProgram = async (data: ProgramType): Promise<ProgramType> => {
  return await Program.create(data);
};

const getProgramTitle = async (
  programId: string
): Promise<Partial<ProgramType> | null> => {
  return await Program.findById(programId, {
    _id: 1,
    name: 1,
    description:1,
    imageUrl: 1,
    price: 1,
  }).lean(); // you ensure that the result is a plain JavaScript object and not a Mongoose document, which resolves the type conflict
};

const getSpecificProgram = async (
  programId: string
): Promise<ProgramType | null> => {
  return await Program.findById(programId, {
   __v: 0,
    createdAt: 0,
    updatedAt: 0,
  }).lean();
};



export { createProgram, getProgramIds, getProgramTitle, getSpecificProgram };
