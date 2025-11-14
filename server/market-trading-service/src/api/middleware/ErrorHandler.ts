import { logError, ServiceError } from "@/types";
import { createErrorResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";

export class ErrorHandler {
  handle = (
    err: ServiceError,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    logError(err, {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
    });

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json(createErrorResponse(message));
  };
}
