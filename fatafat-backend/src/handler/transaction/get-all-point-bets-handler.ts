import { Request, Response } from "express";
import PointBet from "../../model/pointsbet.model"; // Assuming PointBetModel is your Mongoose model

export function getAllPointBetsHandler() {
  return async (req: Request, res: Response) => {
    try {
      const data = await PointBet.find({});

      res.status(200).json({
        message: "Point Bets Details Fetched",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
