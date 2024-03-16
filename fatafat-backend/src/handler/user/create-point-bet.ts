import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PointBet from "../../model/pointsbet.model"; // Assuming PointBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import cuid from "cuid";

export function createPointBet() {
  return async (req: Request, res: Response) => {
    const point = req.body.point;
    const betPoint = req.body.betPoint;


    try {
      const user = await User.findOne({ userId: res.locals.userId });

      console.log("user-----------------",user.createdBy)

      if (!user || user.balance < betPoint) {
        throw new Error("Insufficient Balance");
      }

      const stokez = await User.findOne({ userId: res.locals.userId });

      // console.log(stokez)


      if (!stokez) {
        throw new Error("Stokez user not found");
      }

      // Start transaction
      const session = await User.startSession();
      session.startTransaction();

      try {
        // Create bet
        const bet = await PointBet.create({
          ticketNo: `TKT-${cuid()}`,
          userId: res.locals.userId,
          point: point,
          betPoint: betPoint,
          isActive: true,
          status: "pending",
          user:user._id
        });

        // Update user ntp and decrease balance
        const userUpdate = await User.findOneAndUpdate(
          { userId: res.locals.userId },
          {
            $inc: {
              balance: +betPoint,
            },
          },
          { new: true }
        );

        // Credit commission to stokez
        // const stokezUpdate = await User.findOneAndUpdate(
        //   { userId: user.createdBy },
        //   {
        //     $inc: {
        //       balance: betPoint * (stokez.margin ?? 0) * 0.01,
        //       ntp: betPoint * (stokez.margin ?? 0) * 0.01,
        //     },
        //   },
        //   { new: true }
        // );

        // Add transaction details
        // console.log("Transaction details",stokezUpdate)
        // await Transaction.create([
        //   {
        //     userId: res.locals.userId,
        //     otherId: stokez.userId ?? "God",
        //     point: betPoint,
        //     balance: userUpdate.balance,
        //     type: "debit",
        //   },
        //   {
        //     userId: stokez.userId ?? "",
        //     otherId: res.locals.userId,
        //     point: betPoint * (stokez.margin ?? 0) * 0.01,
        //     balance: stokezUpdate.balance,
        //     type: "credit",
        //   },
        // ]);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
          message: "Bet Placed",
        });
      } catch (error) {
        // Rollback transaction on error
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (err) {
      res.status(500).json({
        message: `Error - ${err.message}`,
      });
    }
  };
}
