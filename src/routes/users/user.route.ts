import { Router } from "express";
import { newUser,enrollProgram } from "./user.controller";
const userRouter:Router=Router();
userRouter.post('/',newUser);
userRouter.post('/enroll/:userId',enrollProgram);
export default userRouter;