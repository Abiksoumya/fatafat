import { Request, Response } from "express";
import PattiBet from "../../model/pattibet.model";

export async function getPattiWisePointValue(req: Request, res: Response) {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Set hours to 00:00:00

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999); // Set hours to 23:59:59.999

    const data = await PattiBet.aggregate([
      {
        $match: {
          timestamp: {
            $gte: startOfToday,
            $lte: endOfToday,
          },
        },
      },
      {
        $group: {
          _id: { patti: "$patti", slot: "$slot" },
          total: { $sum: "$betPoint" },
          timestamps: { $addToSet: "$timestamp" },
        },
      },
    ]);

    res.status(200).json({
      message: "Fetched",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error - ${(err as Error).message}`,
    });
  }
}
