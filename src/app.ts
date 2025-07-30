import express, { Request, Response } from "express"
import cors from "cors"
import { envVars } from "./config/env";
import notFound from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { router } from "./routes";
const app = express();

app.use(express.json())
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))
app.use("/api/v1", router)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to cash flow System Backend"
    })
})
app.use(globalErrorHandler)
app.use(notFound)
export default app;