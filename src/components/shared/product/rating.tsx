import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, className }: { value: number; className?: string }) {
  const filled = Math.round(value);

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i <= filled ? "fill-accent text-accent" : "text-muted-foreground/40",
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{value.toFixed(1)}</span>
    </div>
  );
}
