import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ReportHistory from "../../model/report.model"; // Assuming UserModel is your Mongoose model

export function getAllReport() {
  return async (req: Request, res: Response) => {
    try {
      const data = await ReportHistory.find(); // Sort by createdAt field in descending order
      console.log(data);
      res.status(200).json({
        message: "Report history Fetched Successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}

export function getReport() {
  return async (req: Request, res: Response) => {
    try {
      const data = await ReportHistory.find({ user: res.locals.id });
      const ntpAndTimestamp = data.map(({ ntp, timestamp }) => ({
        ntp,
        timestamp,
      }));

      console.log(data);
      res.status(200).json({
        message: "Report history Fetched Successfully",
        data: ntpAndTimestamp,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
