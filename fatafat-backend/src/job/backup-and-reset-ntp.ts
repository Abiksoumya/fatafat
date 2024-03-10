import { getPrismaClient } from "../helper/db";

export async function resetAndBackupNTP() {
  const prisma = getPrismaClient();
  try {
    //Get all ntp and update
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        ntp: true,
        name: true,
      },
    });

    await prisma.ntpHistory.createMany({
      data: [...users],
    });
    console.log("Data Inserted");
  } catch (err) {}
}

resetAndBackupNTP().then(() => {
  console.log("Job Done");
});
