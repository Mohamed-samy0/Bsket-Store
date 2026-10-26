import Link from "next/link";
import { ProductPrice } from "@/components/shared/product/product-price";
import { Rating } from "@/components/shared/product/rating";
import { formatCategory } from "@/lib/format";
import type { StoreProduct } from "@/lib/queries/products";

export function ProductDetails({ product }: { product: StoreProduct }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {product.brand && <span>{product.brand} · </span>}
        <Link
          href={`/search?category=${product.category}`}
          className="underline-offset-4 hover:underline"
        >
          {formatCategory(product.category)}
        </Link>
      </p>

      <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {product.name}
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <Rating value={product.rating} />
        <span className="text-sm text-muted-foreground">
          {product.numReviews} {product.numReviews === 1 ? "review" : "reviews"}
        </span>
      </div>

      <ProductPrice value={product.price} className="text-2xl" />

      <div>
        <h2 className="font-semibold">Description</h2>
        <p className="mt-2 text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
}
