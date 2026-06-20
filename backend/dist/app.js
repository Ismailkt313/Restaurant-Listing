"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const restaurant_routes_1 = __importDefault(require("./modules/restaurant/restaurant.routes"));
const error_middleware_1 = require("./shared/errors/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-side calls)
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            "https://restaurant-listing-nine.vercel.app"
        ];
        // Allow any local origin (e.g. http://localhost:5173 or http://127.0.0.1:5174)
        const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        if (allowedOrigins.includes(origin) || isLocal) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));
app.use(express_1.default.json());
// Mount modules
app.use("/api/restaurants", restaurant_routes_1.default);
// Mount global error handler
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map