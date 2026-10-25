import qs from "query-string";
import type { SearchParams } from "@/lib/validators";

export function buildSearchUrl(current: SearchParams, patch: Partial<SearchParams> = {}) {
  const next = { ...current, ...patch };

  return qs.stringifyUrl(
    {
      url: "/search",
      query: {
        q: next.q || null,
        category: next.category || null,
        price: next.price || null,
        rating: next.rating ?? null,
        sort: next.sort !== "rating" ? next.sort : null,
        page: next.page > 1 ? next.page : null,
      },
    },
    { skipNull: true, skipEmptyString: true },
  );
}
