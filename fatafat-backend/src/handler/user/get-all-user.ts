import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model



export function getAllUSer() {
  return async (req: Request, res: Response) => {
    try {
      const data = await User.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
      res.status(200).json({
        message: "Users Fetched Successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
