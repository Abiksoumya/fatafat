import { Request, Response } from "express";
import { User } from "../../model/user.modelr"; // Assuming UserModel is your Mongoose model
import PattiBet from "../../model/pattibet.model"; // Assuming PattiBetModel is your Mongoose model
import Transaction from "../../model/transaction.model"; // Assuming TransactionModel is your Mongoose model
import Result from "../../model/result.model";
import ReportHistory from "../../model/report.model";

export function declareResult() {
  return async (req: Request, res: Response) => {
    const winSinglePatti = req.body.winSinglePatti;
    const winThreePatti = req.body.winThreePatti;
    const slot = req.body.slot;

    const getCurrentDate = (): string => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    console.log(getCurrentDate());

    try {
      const pattiBet = await PattiBet.find({
        patti: winSinglePatti ? winSinglePatti : winThreePatti,
        slot,
        date: getCurrentDate(),
      });

      console.log("patti data", pattiBet);

      const userIds = [...new Set(pattiBet.map((item) => item.createdBy))];
      console.log("all user who bet on this patti", userIds);

      const users = await User.find({ userId: { $in: userIds } });

      // console.log("all user who bet on this patti", users);

      // const stokez = await User.findOne({ userId: user.createdBy });

      // if (!stokez) {
      //   throw new Error("Stokez user not found");
      // }
      let updatedBetPoint = 0;

      if (winSinglePatti) {
        const singlepatti = await PattiBet.find({
          patti: winSinglePatti,
          slot,
          date: getCurrentDate(),
          // $or: [
          //   { winBetPoint: { $exists: false } },
          //   { winBetPoint: { $eq: null } },
          // ],
        });
        // console.log("patti data get by single patti", singlepatti);
        const updatePromises = singlepatti.map(async (doc) => {
          console.log("doc bet point", doc);
          const updatedBetPoint = doc.betPoint * 9;
          console.log("doc bet point", updatedBetPoint);

          await PattiBet.updateOne(
            { _id: doc._id },
            { winBetPoint: updatedBetPoint }
          );
          const userId = doc.user;
          const user = await User.findOne({ _id: userId });

          // console.log("user id", userId);
          await User.findByIdAndUpdate(userId, {
            $inc: {
              balance: updatedBetPoint,
              ntp:
                updatedBetPoint - updatedBetPoint * (user.margin ?? 0) * 0.01,
            },
          });
          await User.findOneAndUpdate(
            { userId: user.createdBy },
            {
              $inc: {
                balance: updatedBetPoint * (user.margin ?? 0) * 0.01,
                ntp: updatedBetPoint * (user.margin ?? 0) * 0.01,
              },
            },
            { new: true }
          );
          const report = await ReportHistory.findOneAndUpdate(
            { date: getCurrentDate() },
            {
              $set: {
                ntp: user.ntp,
              },
              $inc: {
                winPoint: updatedBetPoint,
              },
            }
          );
          console.log("report: " + report);
          return updatedBetPoint;
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
          slot,
          date: getCurrentDate(),
        });
        const updatePromises = threepatti.map(async (doc) => {
          const updatedBetPoint = doc.betPoint * 100;
          await PattiBet.updateOne(
            { _id: doc._id },
            { winBetPoint: updatedBetPoint }
          );
          const userId = doc.user;
          const user = await User.findOne({ _id: userId });

          console.log("UpdatedBetPoint for three patti: " + user);

          await User.findByIdAndUpdate(userId, {
            $inc: {
              balance: updatedBetPoint,
              ntp:
                updatedBetPoint - updatedBetPoint * (user.margin ?? 0) * 0.01,
            },
          });
          await User.findOneAndUpdate(
            { userId: user.createdBy },
            {
              $inc: {
                balance: updatedBetPoint * (user.margin ?? 0) * 0.01,
                ntp: updatedBetPoint * (user.margin ?? 0) * 0.01,
              },
            },
            { new: true }
          );
          const report = await ReportHistory.findOneAndUpdate(
            { date: getCurrentDate() },
            {
              $set: {
                ntp: user.ntp,
              },
              $inc: {
                winPoint: updatedBetPoint,
              },
            }
          );
          console.log("report: " + report);

          return updatedBetPoint;
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
        });

        // Credit commission to stokez
        users.forEach(async (user) => {
          const stokezUpdate = await User.findOneAndUpdate(
            { userId: user.createdBy },
            {
              $inc: {
                balance: updatedBetPoint * (user.margin ?? 0) * 0.01,
                ntp: updatedBetPoint * (user.margin ?? 0) * 0.01,
              },
            },
            { new: true }
          );
          console.log(`Processing user:updatedBetPoint`, updatedBetPoint);
          await Transaction.create([
            {
              userId: res.locals.userId,
              otherId: user.userId ?? "God",
              point: updatedBetPoint,
              balance: user.balance,
              type: "debit",
            },
            {
              userId: user.userId ?? "",
              otherId: res.locals.userId,
              point: updatedBetPoint * (user.margin ?? 0) * 0.01,
              balance: stokezUpdate?.balance,
              type: "credit",
            },
          ]);

          console.log("Process", updatedBetPoint);

          // await ReportHistory.findOneAndUpdate(
          //   { date: getCurrentDate() },
          //   {
          //     $set: {
          //       ntp: user.ntp,
          //     },
          //     $inc: {
          //       winPoint: updatedBetPoint,
          //     },
          //   }
          // );
        });

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
