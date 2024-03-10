import { Request, Response } from "express";
import PointBet from "../../model/pointsbet.model";

export async function getNumberWisePointValue(req: Request, res: Response) {
  try {
    const data = await PointBet.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$point",
          sum: { $sum: "$betPoint" }
        }
      }
    ]);

    const formattedData = data.map(item => ({
      point: item._id,
      sum: item.sum
    }));

    res.status(200).json({
      message: "Data Fetched",
      data: formattedData
    });
  } catch (err) {
    res.status(500).json({
      message: "Error"
    });
  }
}
