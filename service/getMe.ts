import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  return result.data;
};
