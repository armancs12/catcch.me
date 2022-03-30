import { PrismaClient } from "@prisma/client";

let database: PrismaClient | undefined;

declare global {
  var database: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  database = new PrismaClient({ log: ["info", "query", "error", "warn"] });
} else {
  if (!global.database) {
    global.database = new PrismaClient({
      log: ["info", "query", "error", "warn"],
    });
  }

  database = global.database;
}

export default database as PrismaClient;
