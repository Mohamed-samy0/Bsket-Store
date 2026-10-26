"use client";

import { Button } from "@/components/ui/button";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  qty: number;
  image?: string;
};

// TODO: Add to cart functionality
export function AddToCart({ item }: { item: CartItem }) {
  return (
    <Button
      className="w-full"
      disabled
      title={`Cart for “${item.name}” comes in the next step`}
    >
      Add to cart
    </Button>
  );
}
