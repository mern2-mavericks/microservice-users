import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter } from './routes/user.route';
import { connectDB } from './utils/connectionDB';
import { middlewareCheckOrigin } from './middlewares/middleware.check.origin';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(middlewareCheckOrigin)
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter)

app.listen(port, () => console.info(`Server is running on port ${port}`));
