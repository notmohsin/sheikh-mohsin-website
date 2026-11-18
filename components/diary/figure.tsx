import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  /** Bleeds wider than the text column; use once, near the top of an entry. */
  hero?: boolean;
  priority?: boolean;
  className?: string;
} & Pick<ComponentProps<typeof Image>, "sizes">;

function Caption({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <figcaption className="text-center text-xs leading-relaxed text-muted-foreground [&_em]:italic [&_strong]:font-bold [&_strong]:text-foreground">
      {children}
    </figcaption>
  );
}

/**
 * Photo or illustration inside a diary entry. Width and height are the
 * intrinsic pixel size of the file in `public/`, so the browser reserves
 * the right space before the image loads. Captions accept MDX, so
 * `**bold**` and `_italic_` work inside them.
 */
export default function Figure({
  src,
  alt,
  width,
  height,
  caption,
  hero = false,
  priority = hero,
  sizes,
  className,
}: FigureProps) {
  return (
    <figure
      className={cn(
        "my-8 space-y-3",
        hero && "md:my-10 lg:-mx-16 xl:-mx-28",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={
          sizes ??
          (hero ?
            "(min-width: 80rem) 62rem, (min-width: 64rem) 56rem, 100vw"
          : "(min-width: 48rem) 42rem, 100vw")
        }
        priority={priority}
        className="h-auto w-full border border-border bg-card"
      />
      <Caption>{caption}</Caption>
    </figure>
  );
}

type RowImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Two or three images side by side with one shared caption. Each image takes
 * width in proportion to its aspect ratio, so mixed shapes line up at the
 * same height. Stacks into a column on phones.
 */
export function FigureRow({
  images,
  caption,
  className,
}: {
  images: readonly RowImage[];
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("my-8 space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {images.map((image) => (
          <div
            key={image.src}
            className="min-w-0"
            style={{ flex: `${image.width / image.height} 1 0` }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={`(min-width: 48rem) ${Math.round(42 / images.length)}rem, 100vw`}
              className="h-auto w-full border border-border bg-card"
            />
          </div>
        ))}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}
