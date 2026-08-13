import { getAccessToken } from "@/lib/accesstoken";

export const getProfile = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to get profile:", res.status);
    return null;
  }

  const result = await res.json();

  console.log("PROFILE API RESPONSE:", result);

  return result?.data ?? null;
};
