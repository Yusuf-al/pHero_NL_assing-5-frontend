import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    // cache: "force-cache",
    // next: {
    //   revalidate: 60 * 60 * 24,
    //   tags: ["profile"],
    // },
  });

  const user = await res.json();
  return user.data;
};
