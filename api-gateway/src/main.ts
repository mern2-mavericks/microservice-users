import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = 8010;
const app = express();

app.use("/users/", createProxyMiddleware({ target: "http://localhost:8000", logger: console }));

app.listen(PORT, () => console.info(`listening on port ${PORT}`));
