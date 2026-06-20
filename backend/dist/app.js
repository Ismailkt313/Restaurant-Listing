"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_routes_1 = __importDefault(require("./modules/restaurant/restaurant.routes"));
const error_middleware_1 = require("./shared/errors/error.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mount modules
app.use("/api/restaurants", restaurant_routes_1.default);
// Mount global error handler
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map