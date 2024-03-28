import { getPrismaClient } from "../helper/db";
import * as cron from "node-cron";
import Result from "../model/result.model";


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

async function declareResult() {
  const winSinglePatti = 0
  const winThreePatti = 111
  const slot = "9.10"

  await Result.create({
    winSinglePatti:winSinglePatti ,
    winThreePatti: winThreePatti,
      slot: slot,
      user:"65ebf4711ede104a9d77d1b9"
  });



}

export function schedule() {
  return cron.schedule("59 23 * * *", () => {
    declareResult();
    console.log("Cron running");
  });
}
