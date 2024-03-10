import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model


export function getUserDetailsHandler() {
  return async (req: Request, res: Response) => {
    const userId = res.locals.userId;

    try {
      const data = await User.findOne({ userId });

      if (!data) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User data fetched Successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
