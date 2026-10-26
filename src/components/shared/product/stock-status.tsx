import { Badge } from "@/components/ui/badge";

export function StockStatus({ stock }: { stock: number }) {
  if (stock <= 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (stock <= 5) return <Badge variant="outline">Only {stock} left</Badge>;
  return <Badge variant="outline">In stock</Badge>;
}
