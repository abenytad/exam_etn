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

const createCourse=async (data:CourseType):Promise<CourseType>=>{
  return await Course.create(data);
}

const getCourses=async(programId:String):Promise<CourseType[] | []>=>{
  return Course.find({programId:programId},{ _id: 1 , name:1,description:1,imageUrl:1,programId:1}).lean();
}

const addMaterial=async(data:MaterialType):Promise<MaterialType>=>{
  return await Material.create(data);
}
 
const getMaterials = async (courseId: String): Promise<MaterialType[] | []> => {
  return Material.find({ courseId },{ _id: 1 , name:1,description:1,materialUrl:1,courseId:1,occurence:1,type:1})
    .lean()
    .sort({ occurence: 1 });  // Sorting by 'occurence' in ascending order
}

export { createProgram, getProgramIds, getProgramTitle, getSpecificProgram, createCourse,getCourses,addMaterial,getMaterials };
