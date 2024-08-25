import { NextFunction, Request, Response } from "express";
export async function middlewareCheckOrigin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.host === "localhost:3000") {
    console.log("Origin request:", req.headers.host);
    next();
  }

  return res.status(403).send("you are not allowed access");
}
