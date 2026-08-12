"use server";
import { ActionState } from "@/app/(Auth)/_actions/authAction";
import { cookies } from "next/headers";

export const getAllProperties = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}): Promise<ActionState> => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query && query.city) {
    params.set("city", query.city as string);
  }

  if (query?.minRent !== undefined) {
    params.set("minRent", String(query.minRent));
  }

  if (query?.maxRent !== undefined) {
    params.set("maxRent", String(query.maxRent));
  }

  if (query && query.category) {
    params.set("category", query.category as string);
  }
  if (query && query.bedrooms) {
    params.set("bedrooms", query.bedrooms as string);
  }
  if (query && query.page) {
    params.set("page", query.page as string);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all?${params.toString()}`,
    {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["properties"],
      },
    },
  );
  console.log(res.url);

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Can't get Properties",
    };
  }
  return {
    success: true,
    message: result.message,
    data: result.data.data,
    meta: result.data.meta,
  };
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

  if (!accessToken) {
    throw new Error("Access token not found");
  }
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
    data: result,
  };
};
