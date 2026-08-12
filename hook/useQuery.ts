"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const getQuery = (key: string) => {
    return searchParams.get(key) || "";
  };

  return {
    updateQuery,
    getQuery,
  };
}
