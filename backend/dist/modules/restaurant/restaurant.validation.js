"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRestaurantSchema = exports.createRestaurantSchema = void 0;
const zod_1 = require("zod");
exports.createRestaurantSchema = zod_1.z.object({
    name: zod_1.z.string({ message: "Name is required" }).trim().min(2, "Name must be at least 2 characters long").max(100, "Name must be under 100 characters"),
    address: zod_1.z.string({ message: "Address is required" }).trim().min(5, "Address must be at least 5 characters long").max(255, "Address must be under 255 characters"),
    contact_number: zod_1.z.string({ message: "Contact number is required" }).trim().min(5, "Contact number must be at least 5 characters long").max(20, "Contact number must be under 20 characters"),
});
exports.updateRestaurantSchema = exports.createRestaurantSchema.partial();
//# sourceMappingURL=restaurant.validation.js.map