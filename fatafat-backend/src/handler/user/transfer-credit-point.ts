import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import TransactionModel from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model

export function transferCreditPointHandler() {
  return async (req: Request, res: Response) => {
    const point = req.body.point;
    const userId = req.body.userId;
    const stokezId = req.body.userId;
    

    try {
      const sender = await User.findOneAndUpdate(
        { userId: stokezId },
        { $inc: { balance: -point } },
        { new: true }
      );

      if (!sender || sender.balance < 0) {
        throw new Error("Insufficient Balance");
      }

      const receiver = await User.findOneAndUpdate(
        { userId },
        { $inc: { balance: point } },
        { new: true }
      );

      if (!receiver) {
        throw new Error("Receiver not found");
      }

      await TransactionModel.create([
        {
          userId: stokezId,
          point: point,
          balance: sender.balance,
          type: "debit",
          otherId: userId,
        },
        {
          userId: userId,
          point: point,
          balance: receiver.balance,
          type: "credit",
          otherId: stokezId,
        },
      ]);

      res.status(200).json({
        message: `Point Transferred from ${stokezId} user to ${userId}`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
        error: err.message,
      });
    }
  };
}
