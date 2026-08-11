"use server";

import { ActionState } from "@/app/(Auth)/_actions/authAction";
import { cookies } from "next/headers";

export const allUser = async (): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Can't get users data",
    };
  }

  return {
    success: true,
    message: result.message,
    data: result.data.data,
  };
};

export const updateUserStatus = async (
  id: string,
  status: string,
): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  console.log(status);

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update/status/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: status }),
    },
  );

  if (!res.ok) {
    return {
      success: false,
      message: "User Status can't be Updated",
    };
  }

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result,
  };
};

export const updateUserRole = async (
  id: string,
  role: string,
): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  console.log(role);

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update/role/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role }),
    },
  );

  if (!res.ok) {
    return {
      success: false,
      message: "User role can't be Updated",
    };
  }

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result,
  };
};

export const getAllRentRequest = async (): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/rental-requests`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Can't get all rent requests",
    };
  }

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result.data.data,
  };
};

export const allCompletePayments = async (): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payment/all`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Can't get payment data",
    };
  }

  return {
    success: true,
    message: result.message,
    data: result.data,
  };
};
