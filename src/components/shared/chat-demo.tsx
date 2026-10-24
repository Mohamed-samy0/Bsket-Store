import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { mockProducts } from "@/lib/mock-products";

export function ChatDemo() {
  const picks = mockProducts.slice(0, 3);

  return (
    <Card
      className="w-full max-w-md"
      role="img"
      aria-label="Example conversation: a shopper asks for a gaming gift under 1,500 EGP and the assistant suggests three products."
    >
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-success" aria-hidden />
          Shopping assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p
          className="chat-in ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
          style={{ ["--d" as string]: "0.3s" }}
        >
          I need a gift for my brother. He loves gaming. Under 1,500 EGP.
        </p>

        <p
          className="chat-in w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5"
          style={{ ["--d" as string]: "1.2s" }}
        >
          Here are three in stock that fit your budget:
        </p>

        <ul className="space-y-2">
          {picks.map((p, i) => (
            <li
              key={p.id}
              className="chat-in"
              style={{ ["--d" as string]: `${2 + i * 0.5}s` }}
            >
              <Card className="flex-row items-center gap-3 p-2.5">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary font-heading text-xl font-bold text-muted-foreground"
                >
                  {p.name.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{formatPrice(p.price)}</span>
                </span>
                <Badge className="bg-accent text-accent-foreground">Add to cart</Badge>
              </Card>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
