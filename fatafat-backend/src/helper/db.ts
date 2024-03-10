import { PrismaClient } from "@prisma/client";

let client: PrismaClient | undefined;

export function getPrismaClient() {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
}
