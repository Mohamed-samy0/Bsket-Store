import { z } from "zod";

export const SORT_OPTIONS = [
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export const PRICE_RANGES = [
  { value: "1-500", label: "1 – 500" },
  { value: "501-1000", label: "501 – 1,000" },
  { value: "1001-2500", label: "1,001 – 2,500" },
  { value: "2501-5000", label: "2,501 – 5,000" },
  { value: "5001-1000000", label: "5,001 and up" },
] as const;

export const RATING_OPTIONS = [4, 3, 2, 1] as const;

export const SearchParamsSchema = z.object({
  q: z.string().trim().max(100).optional().catch(undefined),
  category: z.string().max(60).optional().catch(undefined),
  price: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional()
    .catch(undefined),
  rating: z.coerce.number().int().min(1).max(4).optional().catch(undefined),
  sort: z.enum(["rating", "newest", "price-asc", "price-desc"]).catch("rating"),
  page: z.coerce.number().int().min(1).catch(1),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;
