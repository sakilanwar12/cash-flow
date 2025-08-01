import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { envVars } from "./app/config/env";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to cash flow System Backend",
  });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
