"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemParamsSchema = exports.ItemBodySchema = void 0;
const zod_1 = require("zod");
// Schema for validating the body of requests
exports.ItemBodySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    city: zod_1.z.string().min(1, "City is required").max(50, "City must be less than 50 characters"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    surface: zod_1.z.number().positive("Surface must be a positive number"),
    image: zod_1.z.string().url("Image must be a valid URL"),
});
// Schema for validating route parameters
exports.ItemParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID is required"),
});
