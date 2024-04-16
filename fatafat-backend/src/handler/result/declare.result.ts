import { Request, Response } from "express";
import { User } from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PattiBet from "../../model/pattibet.model"; // Assuming PattiBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import cuid from "cuid";
import Result from "../../model/result.model";
import ReportHistory from "../../model/report.model";

export function declareResult() {
  return async (req: Request, res: Response) => {
    const winSinglePatti = req.body.winSinglePatti;
    const winThreePatti = req.body.winThreePatti;
    const slot = req.body.slot;
    console.log(winSinglePatti, winThreePatti);

    const totalPoint = winSinglePatti
      ? winSinglePatti
      : 0 * 9 + winThreePatti
      ? winThreePatti
      : 0 * 100;

    const getCurrentDate = (): string => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // console.log(totalPoint)

    try {
      const user = await User.findOne({ userId: res.locals.userId });

      if (!user) {
        throw new Error("Insufficient Balance");
      }

      const stokez = await User.findOne({ userId: user.createdBy });

      if (!stokez) {
        throw new Error("Stokez user not found");
      }

      if (winSinglePatti) {
        const singlepatti = await PattiBet.find({
          patti: winSinglePatti,
          // $or: [
          //   { winBetPoint: { $exists: false } },
          //   { winBetPoint: { $eq: null } },
          // ],
        });
        console.log("patti data get by single patti", singlepatti);
        const updatePromises = singlepatti.map(async (doc) => {
          const updatedBetPoint = doc.betPoint * 9;
          await PattiBet.updateOne(
            { _id: doc._id },
            { winBetPoint: updatedBetPoint }
          );
          const userId = doc.user;
          await User.findByIdAndUpdate(userId, {
            $inc: {
              balance: updatedBetPoint,
            },
          });
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);

        if (!singlepatti) {
          throw new Error("No bets on this Patti Number");
        }
      }

      if (winThreePatti) {
        const threepatti = await PattiBet.find({
          patti: winThreePatti,
          // $or: [
          //   { winBetPoint: { $exists: false } },
          //   { winBetPoint: { $eq: null } },
          // ],
        });
        const updatePromises = threepatti.map(async (doc) => {
          const updatedBetPoint = doc.betPoint * 100;
          await PattiBet.updateOne(
            { _id: doc._id },
            { winBetPoint: updatedBetPoint }
          );
          const userId = doc.user;
          await User.findByIdAndUpdate(userId, {
            $inc: {
              balance: updatedBetPoint,
            },
          });
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);

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
          winSinglePatti: winSinglePatti,
          winThreePatti: winThreePatti,
          slot: slot,
          user: user._id,
        });

        // Update user ntp and decrease balance
        const userUpdate = await User.findOneAndUpdate(
          { userId: res.locals.userId },
          {
            $inc: {
              ntp: -totalPoint * (user.margin ?? 0) * 0.01,
              balance: totalPoint,
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

        const report = await ReportHistory.findOneAndUpdate(
          { date: getCurrentDate() },
          {
            $set: {
              ntp: user.ntp,
            },
            $inc: {
              winPoint: totalPoint,
            },
          }
        );
        console.log("report", report);

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
