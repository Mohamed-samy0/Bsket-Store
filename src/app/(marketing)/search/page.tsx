import type { Metadata } from "next";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/shared/pagination";
import { ProductCard } from "@/components/shared/product-card";
import { formatCategory } from "@/lib/format";
import { getAllCategories, getProducts } from "@/lib/queries/products";
import { buildSearchUrl } from "@/lib/search-url";
import { cn } from "@/lib/utils";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  SORT_OPTIONS,
  SearchParamsSchema,
  type SearchParams,
} from "@/lib/validators";

export const metadata: Metadata = { title: "Shop" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-muted",
        active && "bg-secondary font-medium",
      )}
    >
      {children}
    </Link>
  );
}

function Filters({
  current,
  categories,
}: {
  current: SearchParams;
  categories: { slug: string; count: number }[];
}) {
  return (
    <div className="space-y-6">
      <nav aria-label="Category">
        <h2 className="mb-2 text-sm font-semibold">Category</h2>
        <ul className="max-h-72 space-y-1 overflow-y-auto">
          <li>
            <FilterLink
              href={buildSearchUrl(current, { category: undefined, page: 1 })}
              active={!current.category}
            >
              Any
            </FilterLink>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <FilterLink
                href={buildSearchUrl(current, { category: c.slug, page: 1 })}
                active={current.category === c.slug}
              >
                {formatCategory(c.slug)}
                <span className="text-muted-foreground">{c.count}</span>
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Price">
        <h2 className="mb-2 text-sm font-semibold">Price (EGP)</h2>
        <ul className="space-y-1">
          <li>
            <FilterLink
              href={buildSearchUrl(current, { price: undefined, page: 1 })}
              active={!current.price}
            >
              Any
            </FilterLink>
          </li>
          {PRICE_RANGES.map((p) => (
            <li key={p.value}>
              <FilterLink
                href={buildSearchUrl(current, { price: p.value, page: 1 })}
                active={current.price === p.value}
              >
                {p.label}
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Customer review">
        <h2 className="mb-2 text-sm font-semibold">Customer review</h2>
        <ul className="space-y-1">
          <li>
            <FilterLink
              href={buildSearchUrl(current, { rating: undefined, page: 1 })}
              active={!current.rating}
            >
              Any
            </FilterLink>
          </li>
          {RATING_OPTIONS.map((r) => (
            <li key={r}>
              <FilterLink
                href={buildSearchUrl(current, { rating: r, page: 1 })}
                active={current.rating === r}
              >
                {r} stars &amp; up
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const raw = await searchParams;
  const params = SearchParamsSchema.parse({
    q: first(raw.q),
    category: first(raw.category),
    price: first(raw.price),
    rating: first(raw.rating),
    sort: first(raw.sort),
    page: first(raw.page),
  });

  const [categories, result] = await Promise.all([
    getAllCategories(),
    getProducts(params),
  ]);

  const current: SearchParams = { ...params, page: result.page };
  const hasFilters = Boolean(
    params.q || params.category || params.price || params.rating,
  );

  const title = params.q
    ? `Results for “${params.q}”`
    : params.category
      ? formatCategory(params.category)
      : "All products";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-4xl font-bold tracking-tight">{title}</h1>

      <form
        action="/search"
        method="get"
        role="search"
        className="mt-6 flex max-w-xl gap-2"
      >
        <Input
          name="q"
          defaultValue={params.q}
          placeholder="Search products"
          aria-label="Search products"
        />
        {params.category && (
          <input type="hidden" name="category" value={params.category} />
        )}
        {params.price && <input type="hidden" name="price" value={params.price} />}
        {params.rating && <input type="hidden" name="rating" value={params.rating} />}
        {params.sort !== "rating" && (
          <input type="hidden" name="sort" value={params.sort} />
        )}
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Filters: collapsible on mobile, sidebar on desktop */}
        <details className="rounded-lg border p-3 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">Filters</summary>
          <div className="mt-4">
            <Filters current={current} categories={categories} />
          </div>
        </details>
        <aside className="hidden lg:block">
          <Filters current={current} categories={categories} />
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {result.total} {result.total === 1 ? "product" : "products"}
              </p>
              {hasFilters && (
                <Link
                  href="/search"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  Clear filters
                </Link>
              )}
            </div>
            <div
              className="flex flex-wrap items-center gap-1"
              role="group"
              aria-label="Sort by"
            >
              {SORT_OPTIONS.map((o) => (
                <Link
                  key={o.value}
                  href={buildSearchUrl(current, { sort: o.value, page: 1 })}
                  aria-current={params.sort === o.value ? "true" : undefined}
                  className={buttonVariants({
                    variant: params.sort === o.value ? "secondary" : "ghost",
                    size: "sm",
                  })}
                >
                  {o.label}
                </Link>
              ))}
            </div>
          </div>

          {result.products.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {result.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <Card className="mt-6">
              <CardContent className="space-y-3 py-10 text-center">
                <p className="font-medium">No products match your search.</p>
                <p className="text-sm text-muted-foreground">
                  Try a different word or remove a filter.
                </p>
                {hasFilters && (
                  <Link href="/search" className={buttonVariants({ variant: "outline" })}>
                    Clear filters
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <Pagination page={result.page} totalPages={result.totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
