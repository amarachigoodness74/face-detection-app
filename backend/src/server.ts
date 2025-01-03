import express, {
  Express,
  Request,
  Response,
  NextFunction,
  urlencoded,
} from "express";
import cors from "cors";
import createError from "http-errors";
import config from "config";

import authRoute from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/database";
import logger from "./utils/logger";
import corsOptions from "./utils/corsOptions";

const app: Express = express();
app.use(express.json());
app.use(urlencoded());
app.use(cors(corsOptions));

const port = config.get("environment.port") as number;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Face Detection API!");
});

// Routes
app.use("/auth", authRoute);
app.use("/users", userRoutes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: "error",
    errors: err.message || "There was an error",
  });
});

app.listen(port, async () => {
  await connectDB();
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
