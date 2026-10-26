"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductImages({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div
        aria-hidden
        className="grid aspect-square place-items-center rounded-xl bg-secondary font-heading text-8xl font-bold text-muted-foreground/40"
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
        <Image
          src={images[current]}
          alt={`${name}, image ${current + 1} of ${images.length}`}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === current}
                className={cn(
                  "relative block size-16 overflow-hidden rounded-lg border-2 bg-secondary",
                  i === current
                    ? "border-primary"
                    : "border-transparent hover:border-border",
                )}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
