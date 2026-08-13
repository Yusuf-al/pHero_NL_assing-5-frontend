import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAccessToken(): Promise<string | undefined> {
  const cookiesStore = await cookies();
  return cookiesStore.get("accessToken")?.value;
}

export function decodeUser(accessToken: string | undefined) {
  if (!accessToken) return null;

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not set");

  try {
    const verifiedToken = jwt.verify(accessToken, secret);

    // const decoded = jwt.decode(accessToken);
    return verifiedToken;
  } catch {
    return null;
  }
}
