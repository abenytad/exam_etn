import { Request, Response } from "express";
import { UserType } from "../../models/users/user.mongo";
import { createUser, addProgram } from "../../models/users/user.model";

const newUser = async (req: Request, res: Response) => {
  try {
    const data: UserType = req.body;
    const user = await createUser(data);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};

const enrollProgram = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId?: string } = req.params;
    const { programId }: { programId?: string } = req.body;
    if (!userId || !programId) {
      return res.status(400).json({ error: "Missing userId or programId" });
    }
    const user = await addProgram(userId, programId);
    return res.status(200);
  } catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
};



export {newUser,enrollProgram};