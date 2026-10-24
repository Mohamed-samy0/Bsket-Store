import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCategory, formatPrice } from "@/lib/format";
import type { StoreProduct } from "@/lib/queries/products";

export function ProductCard({ product }: { product: StoreProduct }) {
  const image = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <Card className="h-full gap-0 overflow-hidden py-0">
        <div className="relative aspect-square bg-secondary">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center font-heading text-7xl font-bold text-muted-foreground/40"
            >
              {product.name.charAt(0)}
            </span>
          )}
        </div>

        <CardContent className="space-y-2 p-4">
          <Badge variant="secondary">{formatCategory(product.category)}</Badge>
          <h3 className="line-clamp-2 font-medium leading-snug group-hover:underline">
            {product.name}
          </h3>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Star className="size-3.5 fill-accent text-accent" aria-hidden />
              {product.rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
