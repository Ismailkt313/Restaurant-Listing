"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 6000;
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        console.log("Database connected successfully.");
        app_1.default.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error(`Error occurred while starting server: ${error}`);
    }
};
startServer();
//# sourceMappingURL=server.js.map