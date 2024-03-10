import { getPrismaClient } from "../helper/db";
import * as cron from "node-cron";

async function publishResult(slot: number) {
  const winPoint = Math.floor(Math.random() * 10);
  const winPatti = Math.floor(Math.floor(Math.random() * 999));

  const prisma = getPrismaClient();

  // prisma.result.create({
  //   data: {
  //     win_number: winPoint,
  //     win_patti: winPatti,

  //     slot: slot,
  //   },
  // });
}

export function schedule() {
  return cron.schedule("1,2,4,5 * * * * *", () => {
    //publishResult(5);
    console.log("Cron running");
  });
}
