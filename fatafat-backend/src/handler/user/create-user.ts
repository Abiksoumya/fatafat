import { Request, RequestHandler, Response } from "express";
import { User } from "../../model/user.modelr";

function generateUserId(role: "admin" | "stokez" | "agent") {
  return `${role.substring(0, 2)}-${Math.floor(Math.random() * 100000000)}`;
}

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, role, margin, createdBy, password, balance, isActive } = req.body;
    console.log(`User created`,req.body);


    const newUser = new User({
      name,
      userId: generateUserId(role),
      role,
      margin,
      createdBy: createdBy ?? res.locals.userId,
      password,
      balance,
      isActive: role === 'agent' ? false : true,
      ntp: 0
    });

    console.log(`User created`,newUser);


    await newUser.save();

    console.log(`User created`,newUser);

    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
