import Link from "next/link";
import { cn } from "@/lib/utils";
import FooterPlant from "@/components/footer-plant";

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative pt-10 pb-8 border-t border-muted/30 text-center text-xs text-muted-foreground font-mono",
        className,
      )}
    >
      <FooterPlant />
      <p>
        © {currentYear} Sheikh Mohsin.{" "}
        <Link
          href="https://github.com/notmohsin/sheikh-mohsin-website"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Source
        </Link>
        . Forked from{" "}
        <Link
          href="https://github.com/jeetsh4h/jeetsh4h-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Jeet Shah
        </Link>
        &apos;s{" "}
        <Link
          href="https://jeetsh4h.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary decoration-primary/40 hover:decoration-primary transition-colors"
        >
          jeetsh4h.dev
        </Link>
        .{" "}
        <Link
          href="/credits"
          className="underline text-primary decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Credits
        </Link>
        .
      </p>
    </footer>
  );
}
