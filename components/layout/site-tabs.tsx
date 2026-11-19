"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "About", exact: true },
  { href: "/experience", label: "Experience", exact: false },
  { href: "/projects", label: "Projects", exact: false },
  { href: "/diary", label: "Diary", exact: false },
] as const;

function isActive(pathname: string, href: string, exact: boolean) {
  return exact ?
      pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

/** Pill tabs across the top of the content panel, with the theme toggle. */
export default function SiteTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-background pt-2 sm:pt-0">
      <nav
        aria-label="Sections"
        className="flex items-center gap-2 border border-b-0 border-input/70 bg-card px-2 py-2 sm:rounded-t-3xl sm:px-4"
      >
        <ul className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]">
          {TABS.map((tab) => {
            const active = isActive(pathname, tab.href, tab.exact);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-xl px-2.5 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-[0.8125rem]",
                    active ?
                      "bg-primary text-primary-foreground"
                    : "text-subtext hover:bg-input/30 hover:text-foreground",
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
