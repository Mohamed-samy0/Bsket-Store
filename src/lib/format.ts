import { CURRENCY } from "@/lib/constants";

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)} ${CURRENCY}`;
}
