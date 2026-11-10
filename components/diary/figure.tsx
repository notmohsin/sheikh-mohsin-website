import Image from "next/image";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  className?: string;
} & Pick<ComponentProps<typeof Image>, "sizes">;

/**
 * Photo or illustration inside a diary entry. Width and height are the
 * intrinsic pixel size of the file in `public/`, so the browser reserves
 * the right space before the image loads.
 */
export default function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  sizes = "(min-width: 48rem) 42rem, 100vw",
  className,
}: FigureProps) {
  return (
    <figure className={cn("my-8 space-y-3", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full border border-border bg-card"
      />
      {caption && (
        <figcaption className="text-center text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
