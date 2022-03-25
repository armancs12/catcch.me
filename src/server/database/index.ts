import { PrismaClient } from "@prisma/client"

let database: PrismaClient | undefined;

if (!database) {
    database = new PrismaClient();
}

export default database as PrismaClient;