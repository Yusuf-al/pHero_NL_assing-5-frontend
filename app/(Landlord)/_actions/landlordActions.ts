/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ActionState } from "@/app/(Auth)/_actions/authAction";
import { PropertySchema } from "./propertyValidators";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

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
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();
  console.log(result);

  const decoded = jwt.decode(accessToken as string) as {
    id: string;
  };

  const properties = result.data.data.filter(
    (property: any) => property.landlordId === decoded.id,
  );

  return {
    success: true,
    message: result.message,
    data: properties,
  };
};
