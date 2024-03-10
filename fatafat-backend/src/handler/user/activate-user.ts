import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model

export function activateUserHandler() {
  return async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
      const user = await User.findOneAndUpdate(
        { userId: userId },
        { isActive: true },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User is activated",
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
