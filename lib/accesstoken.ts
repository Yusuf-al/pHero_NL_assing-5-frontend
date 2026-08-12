import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAccessToken(): Promise<string | undefined> {
  const cookiesStore = await cookies();
  return cookiesStore.get("accessToken")?.value;
}

export function decodeUserId(accessToken: string | undefined) {
  if (!accessToken) return null;
  try {
    const decoded = jwt.decode(accessToken);

    return decoded;
  } catch {
    return null;
  }
}
