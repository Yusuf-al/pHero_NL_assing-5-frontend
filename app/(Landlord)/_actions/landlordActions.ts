/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ActionState } from "@/app/(Auth)/_actions/authAction";
import { PropertySchema } from "./propertyValidators";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import jwt from "jsonwebtoken";
import { getAccessToken } from "@/lib/accesstoken";

export const createNewProperty = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const property = {
    title: formData.get("title"),
    description: formData.get("description"),
    rent: Number(formData.get("rent")),
    city: formData.get("city"),
    area: formData.get("area"),
    address: formData.get("address"),
    category: formData.get("category"),
    bedrooms: Number(formData.get("bedrooms")),
    bathrooms: Number(formData.get("bathrooms")),
  };

  const validatePropertyData = PropertySchema.safeParse(property);

  if (!validatePropertyData.success) {
    return {
      success: false,
      message: "Please fix the error below",
    };
  }
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/landlord/create`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatePropertyData.data),
    },
  );

  if (!res.ok) {
    const errorRsponse: {
      success: boolean;
      message: string;
      stack?: string;
    } = await res.json();

    return {
      success: false,
      message: errorRsponse.message,
    };
  }

  if (res.ok) {
    revalidateTag("properties", {
      expire: 0,
    });
    revalidatePath("/home");
  }

  const result = await res.json();

  return {
    success: result.success,
    message: result.message,
    data: result.data,
  };
};

export const getLandlordProperties = async (): Promise<ActionState> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();

  const decoded = jwt.decode(accessToken as string) as {
    id: string;
  };

  const properties = result.data.data.filter(
    (property: any) => property.landlord.id === decoded.id,
  );

  return {
    success: true,
    message: result.message,
    data: properties,
  };
};

export const updatetLandlordProperties = async (
  id: string,
  updateData: any,
): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/landlord/update/${id}`,
    {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    },
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Can't Update the Property",
    };
  }

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result,
  };
};
export const deleteProperty = async (id: string): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/landlord/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Can't Delete the Property",
    };
  }

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result,
  };
};

export const getLandlordRentRequest = async (): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/landlord/requests`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result.data,
  };
};
export const updateRentalStatus = async (
  id: string,
  status: string,
): Promise<ActionState> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent/requests/update/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    },
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Can't Update the Property status",
    };
  }

  const result = await res.json();

  return {
    success: true,
    message: result.message,
    data: result,
  };
};

export const allPayments = async (): Promise<ActionState> => {
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

  const decoded = jwt.decode(accessToken as string) as { id: string };
  const payments = result.data.filter(
    (payment: any) => payment.landlord.id === decoded.id,
  );

  return {
    success: true,
    message: result.message,
    data: payments,
  };
};
