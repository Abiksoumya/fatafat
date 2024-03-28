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


async function declareResultCron9_45() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "9.45" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 9.45 published successfully"
}

async function declareResultCron11() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "11.00" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 11 published successfully"
}

async function declareResultCron12_30() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "12.30" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 12.30 published successfully"
}

async function declareResultCron2() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "2.00" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 2.00 published successfully"
}

async function declareResultCron3_30() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "3.30" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 3.30 published successfully"
}

async function declareResultCron5() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "5.00" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 5.00 published successfully"
}

async function declareResultCron6_30() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "6.30" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 6.30 published successfully"
}

async function declareResultCron8() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "8.00" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 8.00 published successfully"
}
async function declareResultCron9_30() {
  await Result.findOneAndUpdate(
    { isPublished: false, slot: "9.30" },
    { $set: { isPublished: true } },
    { new: true } // Return the updated document
);
  return "result at 9.30 published successfully"
}
export function schedule() {
  return cron.schedule("01 00 * * *", () => {
    declareResult();
    console.log("Cron running");
  });
}


export function schedule9_45() {
  return cron.schedule("45 09 * * *", () => {
    declareResultCron9_45();
    console.log("Cron running for 9.45");
  });
}

export function schedule11() {
  return cron.schedule("00 11 * * *", () => {
    declareResultCron11();
    console.log("Cron running for 11");
  });
}


export function schedule12_30() {
  return cron.schedule("30 12 * * *", () => {
    declareResultCron12_30();
    console.log("Cron running for 12.30");
  });
}


export function schedule2() {
  return cron.schedule("00 14 * * *", () => {
    declareResultCron2();
    console.log("Cron running for 2.00");
  });
}


export function schedule3_30() {
  return cron.schedule("30 15 * * *", () => {
    declareResultCron3_30();
    console.log("Cron running for 3.30");
  });
}

export function schedule5() {
  return cron.schedule("00 17 * * *", () => {
    declareResultCron5();
    console.log("Cron running for 5.00");
  });
}


export function schedule6_30() {
  return cron.schedule("30 18 * * *", () => {
    declareResultCron6_30();
    console.log("Cron running for 6.30");
  });
}


export function schedule8() {
  return cron.schedule("00 20 * * *", () => {
    declareResultCron8();
    console.log("Cron running for 8.00");
  });
}


export function schedule9_30() {
  return cron.schedule("30 21 * * *", () => {
    declareResultCron9_30();
    console.log("Cron running for 9.30");
  });
}


