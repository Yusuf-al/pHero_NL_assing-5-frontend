import { z } from "zod";

export const schemaLogin = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const schemaRegister = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(50, {
      message: "Name cannot exceed 50 characters",
    }),

  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),

  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(50, {
      message: "Password cannot exceed 50 characters",
    }),

  role: z
    .enum(["TENANT", "LANDLORD"], {
      message: "Please select a valid role",
    })
    .default("TENANT"),

  phone: z.string().optional(),

  profileImage: z
    .string()
    .url({
      message: "Please provide a valid image URL",
    })
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .max(200, {
      message: "Address cannot exceed 200 characters",
    })
    .optional(),
});

export const schemaUpdateProfile = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(50, {
      message: "Name cannot exceed 50 characters",
    }),
  phone: z.string().optional(),

  address: z
    .string()
    .max(200, {
      message: "Address cannot exceed 200 characters",
    })
    .optional(),
});
