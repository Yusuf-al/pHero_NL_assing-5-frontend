"use server";
import { cookies } from "next/headers";
export const getAllProperties = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all`,
    {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["properties"],
      },
    },
  );

  const result = await res.json();
  return result;
};

export const getSingleProperty = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
    {},
  );

  const result = await res.json();

  return result.data;
};

export const makeRentalRequest = async (
  id: string,
  bookingData: {
    moveInDate: string;
    moveOutDate: string;
    message: string;
  },
) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent/requests/${id}`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return {
      success: error.success,
      message: error.message,
    };
  }
  const result = await res.json();
  return {
    success: true,
    message: result.message,
    data: result.data,
  };
};

export const getRentalRequest = async (id: string) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent/requests/${id}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return {
      success: error.success,
      message: error.message,
    };
  }
  const result = await res.json();
  return {
    success: true,
    message: result.message,
    data: result.data,
  };
};

export const cancelRentalRequest = async (id: string) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent/requests/cancel/${id}`,
    {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "CANCELLED" }),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return {
      success: error.success,
      message: error.message,
    };
  }
  const result = await res.json();
  return {
    success: true,
    message: result.message,
    data: result.data,
  };
};

export const makePayment = async (id: string) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${id}/create-payment-session`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return {
      success: error.success,
      message: error.message,
    };
  }
  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result.data,
  };
};
