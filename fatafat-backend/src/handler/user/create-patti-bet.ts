import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PattiBet from "../../model/pattibet.model"; // Assuming PattiBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import cuid from "cuid";

export function createPattiBet() {
  return async (req: Request, res: Response) => {
    // const patti = req.body.patti;
    // const betPoint = req.body.betPoint;
    // const slot = req.body.slot;
    const { cardData, timeSlot } = req.body;

    

      try {
        // Start transaction
        const session = await User.startSession();
        session.startTransaction();

        for (const pattiIndex in cardData) {
          const patti = parseInt(pattiIndex);
          const betPoint = cardData[pattiIndex];
          console.log("patti point: " + patti, betPoint)

        const user = await User.findOne({ userId: res.locals.userId });
  
        if (!user || user.balance < betPoint) {
          throw new Error("Insufficient Balance");
        }
  
        const stokez = await User.findOne({ userId: user.createdBy });
  
        if (!stokez) {
          throw new Error("Stokez user not found");
        }
  
        

        try {
          // Create bet
          await PattiBet.create({
            ticketNo: `TKT-${cuid()}`,
            userId: res.locals.userId,
            patti: patti,
            betPoint: betPoint,
            slot: timeSlot,
            isActive: true,
            status: "pending",
            user:user._id
          });
  
          // Update user ntp and decrease balance
          const userUpdate = await User.findOneAndUpdate(
            { userId: res.locals.userId },
            {
              $inc: {
                ntp: betPoint - betPoint * (user.margin ?? 0) * 0.01,
                balance: -betPoint,
              },
            },
            { new: true }
          );
  
          // Credit commission to stokez
          const stokezUpdate = await User.findOneAndUpdate(
            { userId: user.createdBy },
            {
              $inc: {
                balance: betPoint * (stokez.margin ?? 0) * 0.01,
                ntp: betPoint * (stokez.margin ?? 0) * 0.01,
              },
            },
            { new: true }
          );
  
          // Add transaction details
          await Transaction.create([
            {
              userId: res.locals.userId,
              otherId: stokez.userId ?? "God",
              point: betPoint,
              balance: userUpdate.balance,
              type: "debit",
            },
            {
              userId: stokez.userId ?? "",
              otherId: res.locals.userId,
              point: betPoint * (stokez.margin ?? 0) * 0.01,
              balance: stokezUpdate.balance,
              type: "credit",
            },
          ]);
  
          // Commit transaction
         
        } catch (error) {
          // Rollback transaction on error
          await session.abortTransaction();
          session.endSession();
          throw error;
        }
        
      }
      await session.commitTransaction();
        session.endSession();

        res.status(200).json({
          message: "Bet Placed",
        });
    }

    catch (err) {
      res.status(500).json({
        message: `Error - ${err.message}`,
      });
    }


   

      
    
  };
}
