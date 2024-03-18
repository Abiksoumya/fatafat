import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import * as jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../../helper/const";

export function loginUserHandler() {
  return async (req: Request, res: Response) => {
    const userId = req.body.username;
    try {
      const user = await User.findOne({ name:userId });

      console.log("user named",user)

      if (!user || user.isActive === false) {
        return res.status(403).json({
          message: "User is Disabled",
        });
      }

      if (user.password === req.body.password) {
        // Password is correct
        // Sign the token
        const userPayload = {
          id:user.id,
          userId: user.userId,
          role: user.role,
          verified: true,
        };

        jwt.sign(userPayload, PRIVATEKEY, (error, token) => {
          if (error) {
            console.log(error);
            res.status(400).json({
              message: "Token Error",
            });
          } else {
            res.status(200).json({
              message: "Logged In Successfully",
              token: token,
            });
          }
        });
      } else {
        res.status(400).json({
          message: "Incorrect Username Or Password",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
