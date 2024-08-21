import { Request, Response } from "express";
import { ProgramType } from "../../models/programs/program.mongo";
import { CourseType } from "../../models/programs/course.mongo";
import { MaterialType } from "../../models/programs/material.mongo";
import {
  createProgram,
  getProgramIds,
  getProgramTitle,
  getSpecificProgram,
  createCourse,
  getCourses,
  addMaterial,
  getMaterials,
} from "../../models/programs/program.model";
import { getUser } from "../../models/users/user.model";
import { getEnrolledProgramIds } from "../../models/users/user.model";

const newProgram = async (req: Request, res: Response) => {
  try {
    const data: ProgramType = req.body;
    const program = await createProgram(data);
    console.log('hi there');
    return res.status(201).json(program);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
}
  }
const fetchProgramIds = async (req: Request, res: Response) => {
  try {
    const data: string[] | [] = await getProgramIds();
    console.log('mobile');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const fetchProgramTitle = async (req: Request, res: Response) => {
  try {
    const { programId, userId }: { programId?: string; userId?: string } = req.params;
    
    if (!programId || !userId) {
      return res.status(400).json({ error: 'Missing programId or userId' });
    }

    // Retrieve user data and program data
    const userData = await getUser(userId);
    const data: Partial<ProgramType> | null = await getProgramTitle(programId);
    
    if (!userData || !data) {
      return res.status(404).json({ error: 'User or Program not found' });
    }

    // Check if programId is in the enrolledPrograms array
    const enrolled = userData.enrolledPrograms.includes(programId);

    const response = {
      ...data,
      enrolled:enrolled,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: `${err}` });
  }
};


const fetchSpecificProgram = async (req: Request, res: Response) => {
  try {
    const { programId }: { programId?: string } = req.params;
    const data: ProgramType | null = await getSpecificProgram(programId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const fetchEnrolledPrograms=async (req:Request,res:Response)=>{
  try {
    const { userId }: { userId?: string } = req.params;
    let enrolledProgramsDetail=[];
    const programIds=await getEnrolledProgramIds(userId);
    for(const value of programIds){
      const program=await getProgramTitle(value);
      enrolledProgramsDetail.push(program);
    }
    return res.status(200).json(enrolledProgramsDetail);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
}
const newCourse = async (req: Request, res: Response) => {
  try {
    const data: CourseType = req.body;
    const course = await createCourse(data);
    console.log('hi there');
    return res.status(201).json(course);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
}
  }

  const fetchCourses=async (req:Request,res:Response)=>{
    try {
      const { programId }: { programId?: string } = req.params;
      // const program=await getProgramTitle(programId);
     const courses=await getCourses(programId);
      return res.status(200).json(courses);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  }
  const newMaterial = async (req: Request, res: Response) => {
    try {
      const data: MaterialType = req.body;
      const material = await addMaterial(data);
      console.log('hi there');
      return res.status(201).json(material);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
  }
    }

    
  const fetchMaterials=async (req:Request,res:Response)=>{
    try {
      const { courseId }: { courseId?: string } = req.params;
      // const program=await getProgramTitle(programId);
     const materials=await getMaterials(courseId);
      return res.status(200).json(materials);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  }
  

export {
  newProgram,
  fetchProgramIds,
  fetchProgramTitle,
  fetchSpecificProgram,
  fetchEnrolledPrograms,
  newCourse,
  fetchCourses,
  newMaterial,
  fetchMaterials,
};
