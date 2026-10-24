import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import ModeToggle from "@/components/shared/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          {APP_NAME}
        </Link>

        <nav aria-label="Main" className="ml-6 hidden items-center gap-6 text-sm md:flex">
          <Link href="/search" className="text-muted-foreground hover:text-foreground">
            Shop
          </Link>
          <Link
            href="/#assistant"
            className="text-muted-foreground hover:text-foreground"
          >
            Shopping assistant
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search products"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <Search className="size-5" />
          </Link>

          <ModeToggle />

          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/sign-in" className={cn(buttonVariants({ size: "sm" }), "ml-2")}>
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
