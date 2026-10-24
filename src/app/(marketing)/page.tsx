import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatDemo } from "@/components/shared/chat-demo";
import { ProductCard } from "@/components/shared/product-card";
import { mockCategories, mockProducts } from "@/lib/mock-products";

const assistantPoints = [
  {
    title: "It reads the real catalog",
    text: "Prices, stock and ratings come from the same data you see in the shop, so it never suggests something that's sold out.",
  },
  {
    title: "It sees your cart",
    text: "Ask for something that goes with what you already picked and it suggests items that fit.",
  },
  {
    title: "You stay in control",
    text: "It adds to your cart only when you tell it to. Checkout is always yours.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Tell us what you need. We&apos;ll find it.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Describe who it&apos;s for and what you can spend. The assistant searches the
            catalog and puts the right products in front of you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/search" className={buttonVariants({ size: "lg" })}>
              Browse products
            </Link>
            <Link
              href="/#assistant"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              See how the assistant works
            </Link>
          </div>
        </div>

        <div className="flex lg:justify-end">
          <ChatDemo />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight">
          Shop by category
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {mockCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/search?category=${c.slug}`}
              className="group block"
            >
              <Card className="transition-colors group-hover:bg-muted">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="font-heading text-2xl">{c.name}</CardTitle>
                  <ArrowRight className="size-5 text-muted-foreground" aria-hidden />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest products */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight">Just added</h2>
          <Link
            href="/search"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            See all products
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {mockProducts.slice(3, 7).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Assistant */}
      <section
        id="assistant"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6"
      >
        <h2 className="max-w-xl font-heading text-3xl font-bold leading-tight tracking-tight">
          An assistant that knows what&apos;s on the shelf
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {assistantPoints.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
