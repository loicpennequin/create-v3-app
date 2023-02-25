import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();
export type Db = PrismaClient;
