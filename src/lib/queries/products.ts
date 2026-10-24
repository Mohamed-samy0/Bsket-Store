import { prisma } from "../prisma";

type DbProduct = NonNullable<Awaited<ReturnType<typeof prisma.product.findFirst>>>;

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string | null;
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
