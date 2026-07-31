/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { schemaLogin, schemaRegister } from "./validation";

export type ActionState = {
  success: boolean;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
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

    console.log(cookiesStore);
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
