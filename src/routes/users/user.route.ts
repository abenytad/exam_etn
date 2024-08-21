import { Router } from "express";
import { newUser,enrollProgram,changePassword,editProfile } from "./user.controller";
const userRouter:Router=Router();
userRouter.post('/',newUser);
userRouter.post('/enroll/:userId',enrollProgram);
userRouter.put('/password/:userId',changePassword);
userRouter.put('/profile/:userId',editProfile);
export default userRouter;