import { z } from "zod";
import type { NormalizedProduct } from "../types";

export const SOURCE = "dummyjson";
const USD_TO_EGP = 50;

const DummyProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  reviews: z.array(z.unknown()).optional(),
});

const ResponseSchema = z.object({ products: z.array(DummyProductSchema) });

export async function fetchProducts(): Promise<NormalizedProduct[]> {
  const res = await fetch("https://dummyjson.com/products?limit=200");
  if (!res.ok) throw new Error(`DummyJSON responded with ${res.status}`);

  const data = ResponseSchema.parse(await res.json());

  return data.products.map((p) => ({
    source: SOURCE,
    externalId: String(p.id),
    name: p.title,
    category: p.category,
    brand: p.brand ?? null,
    description: p.description,
    price: Math.round(p.price * USD_TO_EGP),
    images: [
      ...new Set([p.thumbnail, ...(p.images ?? [])].filter((u): u is string => !!u)),
    ],
    stock: p.stock,
    rating: p.rating,
    numReviews: p.reviews?.length ?? 0,
  }));
}
