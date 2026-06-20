"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = require("./AppError");
const zod_1 = require("zod");
const errorMiddleware = (err, req, res, next) => {
    let statusCode = err instanceof AppError_1.AppError ? err.statusCode : 500;
    let message = err.message || "Internal Server Error";
    let errors = undefined;
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Validation error";
        errors = err.issues.map((e) => ({
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
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map