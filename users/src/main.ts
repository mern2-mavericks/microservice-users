import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter } from './routes/user.route';
import { connectDB } from './utils/connectionDB';
// import { middlewareCheckOrigin } from './middlewares/middleware.check.origin';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors({ origin: "http://localhost:3010" }));
// app.use(middlewareCheckOrigin)
app.use((req, res, next) => {
  if (req.headers.host === "localhost:3010") {
    next()
  }

  return res.status(403).send("you not allowed access");
})
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter)
// app.get("/", (_, res) => res.json({ message: "Hello World from Users Services" }));


app.listen(port, () => console.info(`Server is running on port ${port}`));
