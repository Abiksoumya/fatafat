import { Request, Response } from "express";
import PattiBet from "../../model/pattibet.model";

export async function getPattiWisePointValue(req: Request, res: Response) {
  try {
    const data = await PattiBet.aggregate([
      {
        $group: {
          _id: { patti: "$patti", slot: "$slot" },
          total: { $sum: "$betPoint" }
          
        },
        
      }
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
