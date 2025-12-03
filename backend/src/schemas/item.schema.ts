import { z } from "zod";

// Schema for validating the body of requests
export const ItemBodySchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    city: z.string().min(1, "City is required").max(50, "City must be less than 50 characters"),
    price: z.number().positive("Price must be a positive number"),
    surface: z.number().positive("Surface must be a positive number"),
    image: z.string().url("Image must be a valid URL"),
});

// Schema for validating route parameters
export const ItemParamsSchema = z.object({
    id: z.string().min(1, "ID is required"),
});

// TypeScript types automatically inferred from schemas
export type ItemBodyDTO = z.infer<typeof ItemBodySchema>;
export type ItemParamsDTO = z.infer<typeof ItemParamsSchema>;