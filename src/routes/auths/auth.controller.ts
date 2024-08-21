import User, { UserType } from "../../models/users/user.mongo";
import jwt from "jsonwebtoken";
import { getAuthUser } from "../../models/users/user.model";
import { Request, Response } from "express";



const login = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password }: { phoneNumber?: number; password?: string } = req.body;

    if (phoneNumber === undefined || password === undefined) {
      return res.status(400).json({ error: 'Phone number and password are required' });
    }

    const user = await getAuthUser(phoneNumber, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    const token = jwt.sign(
      {
        userInfo: {
          id: user._id,
        },
      },
      "EXAMETN",
      {
        expiresIn: 60 * 60 * 6,
      }
    );

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 6,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    // Type guard to check if `err` is an instance of Error
    if (err instanceof Error) {
      return res.status(403).json({ error: err.message });
    } else {
      return res.status(403).json({ error: 'An unknown error occurred' });
    }
  }
};




const logout = async (req: Request, res: Response) => {
  try {
    const data = {};
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).json(data);
  } catch (err: unknown) {
   
    if (err instanceof Error) {
      return res.status(403).json({ error: err.message });
    } else {
      return res.status(403).json({ error: 'An unknown error occurred' });
    }
  }
};

export {login,logout};
