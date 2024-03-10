import { Request, RequestHandler, Response } from "express";
import { User } from "../../model/user.modelr";

function generateUserId(role: "admin" | "stokez" | "agent") {
  return `${role.substring(0, 2)}-${Math.floor(Math.random() * 100000000)}`;
}

export function createSuperAdmin(): RequestHandler {
  return async (req: Request, res: Response) => {
    try {
      const newUser = new User({
        name: req.body.name,
        userId: generateUserId(req.body.role),
        role: req.body.role,
        margin: req.body.margin,
        isActive: req.body.isActive,
        createdBy: "root",
        password: req.body.password,
        balance: req.body.balance ?? 0,
        ntp: req.body.ntp ?? 0,
      });

      await newUser.save();
      
      res.status(200).json({
        message: "User Created Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
