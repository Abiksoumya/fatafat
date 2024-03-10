import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model

export function adjustCreditPointHandler() {
  return async (req: Request, res: Response) => {
    try {
      const type = req.body.type;
      const point = req.body.point;
      const userId = req.body.userId;
      const otherId = res.locals.userId || "GOD";

      // Start transaction
      const session = await User.startSession();
      session.startTransaction();

      try {
        let updateOperation;

        if (type === "credit") {
          // Add the point to balance
          updateOperation = User.updateOne(
            { userId: userId },
            { $inc: { balance: point } }
          );
        } else {
          // Decrease the point
          updateOperation = User.updateOne(
            { userId: userId },
            { $inc: { balance: -point } }
          );
        }

        await updateOperation;

        const currUser = await User.findOne({ userId: userId });

        // Make a transaction
        await Transaction.create({
          userId: userId,
          point: point,
          balance: currUser?.balance || 0,
          type: type,
          otherId: otherId,
        });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
          message: `Point Adjusted for user - ${userId}`,
        });
      } catch (error) {
        // Rollback transaction on error
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
