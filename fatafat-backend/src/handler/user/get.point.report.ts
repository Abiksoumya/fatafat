import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import PattiBet from "../../model/pattibet.model"; // Assuming UserModel is your Mongoose model

interface UserData {
    userId: string;
    user: any;
    totalBetPoint: number;
    totalWinBetPoint:number;
    timestamp: any;
}

export function getPointByUser() {
  return async (req: Request, res: Response) => {
    try {
      const data = await PattiBet.find()
    //   console.log("all bet data ",data)
      if(data){
        const userDataMap = new Map<string, { totalBetPoint: number, totalWinBetPoint: number,timestamp: any }>(); // Map to store total bet points and win bet points for each user
        data.forEach((bet) => {
            const { userId, betPoint, winBetPoint,timestamp } = bet;
            const { totalBetPoint, totalWinBetPoint } = userDataMap.get(userId) || { totalBetPoint: 0, totalWinBetPoint: 0,timestamp: 0 };
            userDataMap.set(userId, { totalBetPoint: (totalBetPoint || 0) + betPoint, totalWinBetPoint: totalWinBetPoint + (winBetPoint || 0),timestamp });
        });
        
        // Create a new array containing user data with total bet points and total win bet points
        const userData: UserData[] = [];
        userDataMap.forEach(({ totalBetPoint, totalWinBetPoint,timestamp }, userId) => {
            userData.push({
                userId,
                user: data.find((bet) => bet.userId === userId)?.user || '',
                totalBetPoint: totalBetPoint || 0, // Provide a default value of 0 if totalBetPoint is null or undefined
                totalWinBetPoint,
                timestamp
            });
        });
        res.status(200).json({
            message: "Point Fetched Successfully",
            data: userData,
          });
      }
      
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
}
