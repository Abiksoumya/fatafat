import { Request, Response } from "express";
import Result from "../../model/result.model";

export async function getResultsHandler(req: Request, res: Response) {
  try {
    const data = await Result.find({});

    res.status(200).json({
      message: "Transaction Fetched Successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
}
