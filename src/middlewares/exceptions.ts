import type { NextFunction, Request, Response } from "express";
import type { BaseException } from "../helpers/http.exceptions";

export const MiddleException = (
  error: Error & Partial<BaseException>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};
