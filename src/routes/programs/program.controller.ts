import { Request, Response } from "express";
import { ProgramType } from "../../models/programs/program.mongo";
import { CourseType } from "../../models/programs/course.mongo";
import { MaterialType } from "../../models/programs/material.mongo";
import {
  createProgram,
  getProgramIds,
  getProgramTitle,
  getSpecificProgram,
} from "../../models/programs/program.model";
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
    const { programId }: { programId?: string } = req.params;
    const data: Partial<ProgramType> | null = await getProgramTitle(programId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
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
      const program=await getProgramTitle(value.programId);
      enrolledProgramsDetail.push({
        status:value.status,
        ...program
      });
    }
    return res.status(200).json(enrolledProgramsDetail);
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
};
