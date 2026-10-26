import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Product not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        It may have been removed, or the link is wrong.
      </p>
      <Link href="/search" className={buttonVariants({ className: "mt-6" })}>
        Back to shop
      </Link>
    </div>
  );
}
