import { Prisma } from "@/generated/prisma/client";
import { prisma } from "../prisma";
import { SearchParams } from "../validators";
import { cache } from "react";

export const PAGE_SIZE = 12;

type DbProduct = NonNullable<Awaited<ReturnType<typeof prisma.product.findFirst>>>;

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string | null;
  description: string;
  price: number;
  rating: number;
  numReviews: number;
  stock: number;
  images: string[];
};

function toStoreProduct(p: DbProduct): StoreProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    brand: p.brand,
    description: p.description,
    price: Number(p.price),
    rating: Number(p.rating),
    numReviews: p.numReviews,
    stock: p.stock,
    images: p.images,
  };
}
export async function getTopRatedProducts(limit = 4) {
  const products = await prisma.product.findMany({
    orderBy: [{ rating: "desc" }, { numReviews: "desc" }],
    take: limit,
  });
  return products.map(toStoreProduct);
}

export async function getGiftPicks(limit = 3) {
  const products = await prisma.product.findMany({
    where: { category: "beauty", price: { lte: 1500 }, stock: { gt: 0 } },
    orderBy: { rating: "desc" },
    take: limit,
  });
  return products.map(toStoreProduct);
}

export async function getTopCategories(limit = 6) {
  const groups = await prisma.product.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  return groups
    .map((g) => ({ slug: g.category, count: g._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

const orderByMap: Record<SearchParams["sort"], Prisma.ProductOrderByWithRelationInput[]> =
  {
    rating: [{ rating: "desc" }, { numReviews: "desc" }, { id: "asc" }],
    newest: [{ createdAt: "desc" }, { id: "asc" }],
    "price-asc": [{ price: "asc" }, { id: "asc" }],
    "price-desc": [{ price: "desc" }, { id: "asc" }],
  };

export async function getProducts({
  q,
  category,
  price,
  rating,
  sort,
  page,
}: SearchParams) {
  const [minPrice, maxPrice] = price ? price.split("-").map(Number) : [];
  const where: Prisma.ProductWhereInput = {
    ...(category && { category }),
    ...(price && { price: { gte: minPrice, lte: maxPrice } }),
    ...(rating && { rating: { gte: rating } }),
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { brand: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    }),
  };

  const total = await prisma.product.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const products = await prisma.product.findMany({
    where,
    orderBy: orderByMap[sort],
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return {
    products: products.map(toStoreProduct),
    total,
    totalPages,
    page: currentPage,
  };
}

export async function getAllCategories() {
  const groups = await prisma.product.groupBy({
    by: ["category"],
    _count: { _all: true },
    orderBy: { category: "asc" },
  });
  return groups.map((g) => ({ slug: g.category, count: g._count._all }));
}

export const getProductBySlug = cache(async (slug: string) => {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toStoreProduct(product) : null;
});
