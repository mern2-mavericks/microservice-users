import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { connectDB } from "./utils/connectionDB";
import { middlewareCheckOrigin } from "./middlewares/middleware.check.origin";
import { rateLimit } from "express-rate-limit"
import helmet from "helmet";

dotenv.config();

const app = express();
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 100,  // each IP can make up to 10 requests per `windowsMs` (5 minutes)
	standardHeaders: true, // add the `RateLimit-*` headers to the response
	legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
	message: "too many request from this IP"
})

const port = process.env.PORT;
app.use(cors({ origin: "http://localhost:8010" }), limiter, helmet());
app.use(middlewareCheckOrigin);

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.listen(port, () => console.info(`Server is running on port ${port}`));
