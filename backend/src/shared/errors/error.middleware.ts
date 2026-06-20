import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = err instanceof AppError ? err.statusCode : 500;
    let message = err.message || "Internal Server Error";
    let errors: any = undefined;

    if (err instanceof ZodError) {
        statusCode = 400;
        message = "Validation error";
        errors = err.issues.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
        }));
    }

    console.error(`[Error] ${req.method} ${req.path}:`, err);

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
