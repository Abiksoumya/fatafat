import { Request, Response } from "express";
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model

export function getAllTransactionHandler() {
  return async (req: Request, res: Response) => {
    try {
      const data = await Transaction.find({})
        .sort({ timestamp: -1 })
        .limit(10000);

      res.status(200).json({
        message: "Transaction Fetched Successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
