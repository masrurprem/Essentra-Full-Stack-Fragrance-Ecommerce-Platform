import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected");
  } catch (error) {
    console.log(`DB not connected due to: ${error.message}`);
    process.exit(1);
  }
};

const disConnectDb = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDb, disConnectDb };
