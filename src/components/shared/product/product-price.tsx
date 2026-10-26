import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductPrice({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return <span className={cn("font-semibold", className)}>{formatPrice(value)}</span>;
}
