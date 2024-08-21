import { Request, Response } from "express";
import { UserType } from "../../models/users/user.mongo";
import {
  createUser,
  addProgram,
  getUser,
  saveModified,
  getUserByPhoneNumber,
} from "../../models/users/user.model";
import bcrypt from "bcrypt";

const newUser = async (req: Request, res: Response) => {
  try {
    const data: UserType = req.body;
    const user = await createUser(data);
    console.log(data);
    console.log("sign up");
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

const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId?: string } = req.params;
    const {
      newPassword,
      oldPassword,
    }: { newPassword?: string; oldPassword?: string } = req.body;
    if (!userId || !newPassword || !oldPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const auth = await bcrypt.compare(oldPassword, user.password);

    if (auth) {
      user.password = newPassword;
      await saveModified(user);
      return res.status(200).json("The password is changed");
    } else {
      return res.status(400).json({ error: "Old password is incorrect" });
    }
  } catch (err) {
    return res.status(500).json({ error: `${err}` });
  }
};

const editProfile = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId?: string } = req.params;
    const { name, phoneNumber }: { name?: string; phoneNumber?: number } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (!name && phoneNumber === undefined) {
      return res.status(400).json({
        error: "At least one field (name or phoneNumber) is required to update",
      });
    }

    const user = await getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) {
      user.name = name;
    }
    if (phoneNumber !== undefined) {
      const isPhoneNumberAvailable = await getUserByPhoneNumber(phoneNumber, userId);
      if (!isPhoneNumberAvailable) {
        return res.status(400).json({ error: "Phone number already in use" });
      }
      user.phoneNumber = phoneNumber;
    }
  console.log(name);
  console.log(phoneNumber);
    await user.save();
    const data={
      _id:user._id,
      name:user.name,
      phoneNumber:user.phoneNumber,
      enrollProgram:user.enrolledPrograms,
    }
    return res.status(200).json(user);
  }  catch (err) {
    return res.status(500).json({ error: `${err}` });
  }
};


export { newUser, enrollProgram, changePassword,editProfile };
