import { Router } from "express";
import {
  newProgram,
  fetchProgramIds,
  fetchProgramTitle,
  fetchSpecificProgram,
  fetchEnrolledPrograms,
} from "./program.controller";

const programRouter: Router = Router();
programRouter.post('/',newProgram);
programRouter.get('/ids',fetchProgramIds);
programRouter.get('/title/:programId',fetchProgramTitle);
programRouter.get('/details/:programId',fetchSpecificProgram);
programRouter.get('/enrolled/:userId',fetchEnrolledPrograms);
export default programRouter;
