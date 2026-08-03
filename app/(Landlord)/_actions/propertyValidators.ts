import { z } from "zod";

export const PropertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  rent: z.coerce.number().positive("Rent must be greater than 0"),

  city: z.string().trim().min(2, "City is required"),

  area: z.string().trim().min(2, "Area is required"),

  address: z.string().trim().min(5, "Address is required"),

  category: z.string().trim().min(5, "Category is required"),

  bedrooms: z.coerce.number().int().min(1, "At least 1 bedroom is required"),

  bathrooms: z.coerce.number().int().min(1, "At least 1 bathroom is required"),
});
