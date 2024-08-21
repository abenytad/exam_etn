import { Router } from "express";
import { login,logout } from "./auth.controller";

const authRouter:Router=Router();
authRouter.post('/login',login);
authRouter.get('/logout',logout);
export default authRouter;