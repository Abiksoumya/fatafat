import { Request, RequestHandler, Response } from "express";
import { User } from "../../model/user.modelr";



export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Assuming userId is passed as a route parameter
    const { name, role, margin, password, balance, isActive } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userId }, // Query for finding the user to update by userId
      {
        name,
        role,
        margin,
        password, // Note: It's generally not recommended to update passwords directly like this. Consider using password hashing and encryption.
        balance,
        isActive,
      },
      { new: true } // Return the updated user after the update operation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated", updatedUser);

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
