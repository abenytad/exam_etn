import { Router } from "express";
import {
  newProgram,
  fetchProgramIds,
  fetchProgramTitle,
  fetchSpecificProgram,
  fetchEnrolledPrograms,
  newCourse,
  fetchCourses,
  newMaterial,
  fetchMaterials,
  getAIResponse,
} from "./program.controller";

const programRouter: Router = Router();
programRouter.post('/',newProgram);
programRouter.get('/ids',fetchProgramIds);
programRouter.get('/title/:programId/:userId',fetchProgramTitle);
programRouter.get('/details/:programId',fetchSpecificProgram);
programRouter.get('/enrolled/:userId',fetchEnrolledPrograms);
programRouter.post('/course',newCourse);
programRouter.get('/courses/:programId',fetchCourses);
programRouter.post('/material',newMaterial);
programRouter.get('/materials/:courseId',fetchMaterials);
programRouter.post('/request',getAIResponse);
export default programRouter;
