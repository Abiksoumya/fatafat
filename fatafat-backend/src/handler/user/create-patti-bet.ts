import { Request, Response } from "express";
import {User} from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PattiBet from "../../model/pattibet.model"; // Assuming PattiBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import cuid from "cuid";
import ReportHistory from "../../model/report.model";

export function createPattiBet() {
  return async (req: Request, res: Response) => {
    // const patti = req.body.patti;
    // const betPoint = req.body.betPoint;
    // const slot = req.body.slot;
    const { cardData, timeSlot,ticketNo } = req.body;

    console.log("req uest data", req.body)

    

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

        const report = await ReportHistory.find({user:res.locals.id});

        console.log("Report History", report);
        let dbTime :any = null
        let time :any = null
        if(report.length > 0){
          report.forEach(item => {
            dbTime = item.timestamp.toISOString().split('T')[0];
           const times =  new Date();
           time = times.toISOString().split('T')[0];
         
         });
        }
        console.log("Report History111111111111",dbTime,time)

        try {
          // Create bet
          await PattiBet.create({
            ticketNo: ticketNo,
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
                ntp: - betPoint * (user.margin ?? 0) * 0.01,
                balance: -betPoint,
              },
            },
            { new: true }
          );
            console.log("user final ntp",userUpdate)
          // Credit commission to stokez
          const stokezUpdate = await User.findOneAndUpdate(
            { userId: user.createdBy },
            {
              $inc: {
                balance: -betPoint,
                ntp:- betPoint * (stokez.margin ?? 0) * 0.01,
              },
            },
            { new: true }
          );

          console.log("user final ntp",stokezUpdate)

  
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

          if(report === null || dbTime === null || dbTime !== time){
            console.log("working if block")
            await ReportHistory.create({
              userId: res.locals.userId,
              userName:user.name,
              user:res.locals.id,
              winPoint:0,
              ntp: user.ntp,

            });
            
          } else {
            console.log("working else block",user.ntp,user.margin)
            await ReportHistory.findOneAndUpdate(
              {user: res.locals.id },
              {
                $set: {
                  ntp: user.ntp,
                  patti:patti,
                  betPoint: betPoint,
                },
              },
            )
          }
  
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
