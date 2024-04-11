import { Request, Response } from "express";
import PattiBet from "../../model/pattibet.model";

interface SlotData {
  userId: string;
  slot: string;
  totalBet: number;
  numbers: {
    number: string;
    totalBetAmount: number;
  }[];
}

export function getPointByDate() {
  return async (req: Request, res: Response) => {
    console.log(req.params);
    try {
      const id = req.params.id;
      console.log(id);
      const data = await PattiBet.find({ userId: id });
      console.log("all bet data", data);

      if (data.length > 0) {
        res.status(200).json({
          message: "Data Fetched Successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "No data found",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
