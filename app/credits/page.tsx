import type { Metadata } from "next";
import Link from "next/link";

import Credits from "@/components/credits";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Attribution for the site template, Jeet Shah, cat art, sprites, and Catppuccin.",
  alternates: {
    canonical: "/credits",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CreditsPage() {
  return (
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../home</span>
        </Button>
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <div className="mb-10 space-y-3 border-l-2 border-accent pl-4">
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-4xl">
            credits
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            People and work this site is built on. The terminal command is{" "}
            <code>credits</code>.
          </p>
        </div>

        <Credits />
      </div>
    </main>
  );
}
