import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = 3010;
const app = express();


app.get("/", (_, res) => res.json({ message: "API Gateway" }));

app.use("/users", createProxyMiddleware({ target: "http://users:8001" }))

app.listen(PORT, () => console.info(`listening on port ${PORT}`));
