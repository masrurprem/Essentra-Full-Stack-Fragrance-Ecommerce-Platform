import { config } from "dotenv";
//handling any uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.log("uncaught exception error", err);

  await disConnectDb();
  process.exit(1);
});
import { disConnectDb, connectDb } from "./config/db.js";
import app from "./app.js";

config();
// connect db
connectDb();
// get the server to listen
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`app is on the listen on http://localhost:4000`);
});

// handle unhandled promise rejections(e.g. database connection error)
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection error", err);
  server.close(async () => {
    await disConnectDb();
    process.exit(1);
  });
});

//graceful shutdown in sig term error
process.on("SIGTERM", async (err) => {
  console.log("sigterm recieved. Shutting down gracefully");
  server.close(async () => {
    await disConnectDb();
    process.exit(0);
  });
});
