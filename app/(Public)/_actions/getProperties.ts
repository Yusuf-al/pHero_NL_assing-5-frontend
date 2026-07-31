export const getAllProperties = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all`,
    {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["properties"],
      },
    },
  );

  const result = await res.json();
  return result;
};
