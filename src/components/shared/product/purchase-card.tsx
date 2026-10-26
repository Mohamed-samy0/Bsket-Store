import { Card, CardContent } from "@/components/ui/card";
import { AddToCart } from "@/components/shared/product/add-to-cart";
import { ProductPrice } from "@/components/shared/product/product-price";
import { StockStatus } from "@/components/shared/product/stock-status";
import type { StoreProduct } from "@/lib/queries/products";

export function PurchaseCard({ product }: { product: StoreProduct }) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Price</span>
          <ProductPrice value={product.price} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <StockStatus stock={product.stock} />
        </div>

        {product.stock > 0 && (
          <AddToCart
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              qty: 1,
              image: product.images[0],
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
