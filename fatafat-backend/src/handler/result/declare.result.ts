import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PattiBet from "../../model/pattibet.model"; // Assuming PattiBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import cuid from "cuid";
import Result from "../../model/result.model";

export function declareResult() {
  return async (req: Request, res: Response) => {

    const winNumber = req.body.winNumber;
    const winPatti = req.body.patti;
    const slot = req.body.slot;
    console.log(req.body.patti)

    try {
      const user = await User.findOne({ userId: res.locals.userId });

      if (!user) {
        throw new Error("Insufficient Balance");
      }

      const stokez = await User.findOne({ userId: user.createdBy });

      if (!stokez) {
        throw new Error("Stokez user not found");
      }

      const patti = await PattiBet.findOne({ patti:winPatti});

      if (!patti) {
        throw new Error("No bets on this Patti Number");
      }

      // Start transaction
      const session = await User.startSession();
      session.startTransaction();

      try {
        // Create bet
        if(winPatti.length == 3){
            const totalAmount = winNumber * 100
            await Result.create({
                winNumber:totalAmount ,
                winPatti: winPatti,
                slot: slot,
                user:user._id
            });
        }
        const totalAmount = winNumber * 9

        await Result.create({

            winNumber: totalAmount,
            winPatti: winPatti,
            slot: slot,
            user:user._id
        });
       
        

        // Update user ntp and decrease balance
        const userUpdate = await User.findOneAndUpdate(
          { userId: res.locals.userId },
          {
            $inc: {
              ntp: winNumber - winNumber * (user.margin ?? 0) * 0.01,
              balance: -winNumber,
            },
          },
          { new: true }
        );

        // Credit commission to stokez
        const stokezUpdate = await User.findOneAndUpdate(
          { userId: user.createdBy },
          {
            $inc: {
              balance: winNumber * (stokez.margin ?? 0) * 0.01,
              ntp: winNumber * (stokez.margin ?? 0) * 0.01,
            },
          },
          { new: true }
        );

        // Add transaction details
        await Transaction.create([
          {
            userId: res.locals.userId,
            otherId: stokez.userId ?? "God",
            point: winNumber,
            balance: userUpdate.balance,
            type: "debit",
          },
          {
            userId: stokez.userId ?? "",
            otherId: res.locals.userId,
            point: winNumber * (stokez.margin ?? 0) * 0.01,
            balance: stokezUpdate.balance,
            type: "credit",
          },
        ]);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
          message: "Result declared",
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
