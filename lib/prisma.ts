import { PrismaClient } from "@prisma/client";

// db/prisma.server.ts (or wherever you initialize the client)

const databaseUrl = process.env.DATABASE_URL || "NOT FOUND";
console.log("Database URL VALUE:", databaseUrl);
console.log("Database URL LENGTH:", databaseUrl.length);

// If the length is 0 and the value is "", that's the issue.
if (databaseUrl.length < 10) {
  console.error(
    "CRITICAL: DATABASE_URL appears to be empty or too short. Check your .env file!"
  );
}
let prisma =
  global.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
