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
    try {
      const data = await PattiBet.find();

      if (data.length > 0) {
        const slotDataMap = new Map<any, any>(); // Map to store total bet for each slot and numbers bet on

        data.forEach((bet) => {
          const { userId, slot, betPoint, winBetPoint, status } = bet;
          if (status === "pending") {
            // considering only pending bets
            const slotData = slotDataMap.get(slot) || {
              userId: userId,
              slot: slot,
              totalBet: 0,
              numbers: [],
            };

            // Increase total bet for the slot
            slotData.totalBet += betPoint;

            // Check if number is already present in the numbers array
            const numberIndex = slotData.numbers.findIndex(
              (numData) => numData.number === bet.patti
            );
            if (numberIndex !== -1) {
              // Increase the total bet amount for the number
              slotData.numbers[numberIndex].totalBetAmount += betPoint;
            } else {
              // Add the number to the numbers array with its bet amount
              slotData.numbers.push({
                number: bet.patti,
                totalBetAmount: betPoint,
              });
            }

            slotDataMap.set(slot, slotData);
          }
        });

        // Convert the map to an array
        const slotDataArray: SlotData[] = Array.from(slotDataMap.values());

        res.status(200).json({
          message: "Data Fetched Successfully",
          data: slotDataArray,
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
