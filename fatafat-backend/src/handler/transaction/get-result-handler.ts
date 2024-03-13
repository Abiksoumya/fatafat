import { Request, Response } from "express";
import Result from "../../model/result.model";

// export async function getResultsHandler(req: Request, res: Response) {
//   try {
//     const data = await Result.find({});

//     res.status(200).json({
//       message: "Transaction Fetched Successfully",
//       data: data,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// }

export function getResultsHandler() {
  return async (req: Request, res: Response) => {
    try {
      const data = await Result.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
      res.status(200).json({
        message: "Result Fetched Successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
