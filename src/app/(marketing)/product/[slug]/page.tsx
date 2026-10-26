import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/shared/product/product-details";
import { ProductImages } from "@/components/shared/product/product-images";
import { PurchaseCard } from "@/components/shared/product/purchase-card";
import { formatCategory } from "@/lib/format";
import { getProductBySlug } from "@/lib/queries/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.description.slice(0, 160) };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/search" className="hover:text-foreground">
          Shop
        </Link>
        {" / "}
        <Link
          href={`/search?category=${product.category}`}
          className="hover:text-foreground"
        >
          {formatCategory(product.category)}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ProductImages images={product.images} name={product.name} />
        </div>

        <div className="lg:col-span-2">
          <ProductDetails product={product} />
        </div>

        <div>
          <PurchaseCard product={product} />
        </div>
      </div>
    </div>
  );
}
