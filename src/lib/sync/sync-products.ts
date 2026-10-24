import { prisma } from "../prisma";
import { fetchProducts } from "./sources/dummyjson";

const BATCH_SIZE = 20;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function syncProducts() {
  const items = await fetchProducts();

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);

    await prisma.$transaction(
      batch.map((item) => {
        const data = {
          name: item.name,
          slug: `${slugify(item.name)}-${item.externalId}`,
          category: item.category,
          brand: item.brand,
          description: item.description,
          price: item.price,
          images: item.images,
          stock: item.stock,
          rating: item.rating,
          numReviews: item.numReviews,
          syncedAt: new Date(),
        };

        return prisma.product.upsert({
          where: {
            source_externalId: { source: item.source, externalId: item.externalId },
          },
          create: { source: item.source, externalId: item.externalId, ...data },
          update: data,
        });
      }),
    );
  }

  return items.length;
}
