import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import PattiBet from "../../model/pattibet.model"; 

export function getBetPattiByUser() {
    return async (req: Request, res: Response) => {
      const userId = res.locals.id;
      try {
        const data = await PattiBet.find({user: userId });
  
        if (!data) {
          return res.status(404).json({
            message: "Bet Patti not found",
          });
        }
  
        res.status(200).json({
          message: "Pati bet data fetched Successfully",
          data: data,
        });
      } catch (err) {
        res.status(500).json({
          message: "Server Error",
        });
      }
    };
  }