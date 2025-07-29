import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./config/env";

let server: Server;

const bootStrap = async () => {
  await mongoose.connect(envVars.DB_URL);
  console.log("Connected to DB!!");

  server = app.listen(envVars.PORT, () => {
    console.log(`Server is listening to port ${envVars.PORT}`);
  });
};

bootStrap();


process.on("SIGTERM", () => {
    console.log("SIGTERM signal received... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal received... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})



