import { z } from "zod";

export const createRestaurantSchema = z.object({
    name: z.string({ message: "Name is required" }).trim().min(2, "Name must be at least 2 characters long").max(100, "Name must be under 100 characters"),
    address: z.string({ message: "Address is required" }).trim().min(5, "Address must be at least 5 characters long").max(255, "Address must be under 255 characters"),
    contact_number: z.string({ message: "Contact number is required" }).trim().min(5, "Contact number must be at least 5 characters long").max(20, "Contact number must be under 20 characters"),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();

