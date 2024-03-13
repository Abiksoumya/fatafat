import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PattiBet from "../../model/pattibet.model"; // Assuming PattiBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import cuid from "cuid";
import Result from "../../model/result.model";

export function declareResult() {
  return async (req: Request, res: Response) => {

    const winSinglePatti = req.body.winSinglePatti;
    const winThreePatti = req.body.winThreePatti;
    const slot = req.body.slot;
    console.log(winSinglePatti,winThreePatti)

    const totalPoint = winSinglePatti ? winSinglePatti : 0 * 9 + winThreePatti ? winThreePatti : 0 * 100

    console.log(totalPoint)

    try {
      const user = await User.findOne({ userId: res.locals.userId });

      if (!user) {
        throw new Error("Insufficient Balance");
      }

      const stokez = await User.findOne({ userId: user.createdBy });

      if (!stokez) {
        throw new Error("Stokez user not found");
      }

      if(winSinglePatti ==  !null){
        const singlepatti = await PattiBet.findOne({ patti:winSinglePatti});

      if (!singlepatti) {
        throw new Error("No bets on this Patti Number");
      }
      }

      if(winThreePatti == !null){
        const threepatti = await PattiBet.findOne({ patti:winThreePatti});

      if (!threepatti) {
        throw new Error("No bets on this Patti Number");
      }
      }

      

      // Start transaction
      const session = await User.startSession();
      session.startTransaction();

      try {
        // Create bet
            await Result.create({
              winSinglePatti:winSinglePatti ,
              winThreePatti: winThreePatti,
                slot: slot,
                user:user._id
            });
        
        
       
        

        // Update user ntp and decrease balance
        const userUpdate = await User.findOneAndUpdate(
          { userId: res.locals.userId },
          {
            $inc: {
              ntp: totalPoint - totalPoint * (user.margin ?? 0) * 0.01,
              balance: -totalPoint,
            },
          },
          { new: true }
        );

        // Credit commission to stokez
        const stokezUpdate = await User.findOneAndUpdate(
          { userId: user.createdBy },
          {
            $inc: {
              balance: totalPoint * (stokez.margin ?? 0) * 0.01,
              ntp: totalPoint * (stokez.margin ?? 0) * 0.01,
            },
          },
          { new: true }
        );

        // Add transaction details
        await Transaction.create([
          {
            userId: res.locals.userId,
            otherId: stokez.userId ?? "God",
            point: totalPoint,
            balance: userUpdate.balance,
            type: "debit",
          },
          {
            userId: stokez.userId ?? "",
            otherId: res.locals.userId,
            point: totalPoint * (stokez.margin ?? 0) * 0.01,
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
