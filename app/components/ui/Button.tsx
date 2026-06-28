import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand to-brand-2 text-white shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-white/5 text-foreground border border-white/15 backdrop-blur hover:bg-white/10 active:scale-[0.98]",
  ghost: "text-muted hover:text-foreground",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const external = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
