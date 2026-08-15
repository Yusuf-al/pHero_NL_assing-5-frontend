/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { schemaLogin, schemaRegister, schemaUpdateProfile } from "./validation";
import { redirect } from "next/navigation";
import { decodeUser, getAccessToken } from "@/lib/accesstoken";
import { JwtPayload } from "jsonwebtoken";

export type ActionState = {
  success: boolean;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
  meta?: any;
};

export const loginAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = schemaLogin.safeParse(loginData);

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the error below",
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    },
  );

  if (!response.ok) {
    const errorRsponse: {
      success: boolean;
      message: string;
      stack?: string;
    } = await response.json();

    return {
      success: false,
      message: errorRsponse.message,
    };
  }

  const loginResponse: ActionState = await response.json();

  if (loginResponse.success) {
    const cookiesStore = await cookies();

    const tokens = loginResponse.data;

    cookiesStore.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookiesStore.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }
  return {
    success: loginResponse.success,
    message: loginResponse.message,
    data: loginResponse.data,
  };
};

export const registrationAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    phone: formData.get("phone"),
    profileImage: formData.get("profileImage"),
    address: formData.get("address"),
  };

  const validatedRegistrationData = schemaRegister.safeParse(registerData);

  if (!validatedRegistrationData.success) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors: validatedRegistrationData.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedRegistrationData.data), // <-- use result.data, not result
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    return errorResponse;
  }

  const registerResponse = await response.json();
  return registerResponse;
};

export const logoutAction = async () => {
  const cookiesStore = await cookies();

  cookiesStore.delete("accessToken");
  cookiesStore.delete("refreshToken");

  redirect("/home");
};

export const updateProfile = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const verifiedUser = decodeUser(accessToken) as JwtPayload;

    const id = formData.get("id")?.toString();

    if (!id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    if (verifiedUser.id !== id) {
      return {
        success: false,
        message: "You are not authorized to update this profile",
      };
    }

    const userData = {
      name: formData.get("name")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      address: formData.get("address")?.toString() || "",
    };

    const validatedData = schemaUpdateProfile.safeParse(userData);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0]?.message || "Invalid data",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/my-profile`,
      {
        method: "PUT",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData.data),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      message: result.message || "Profile updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update profile error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
