"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findTrail, nav } from "@/lib/nav";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const trail = findTrail(nav, pathname);

  const crumbs: { label: string; href?: string }[] =
    pathname === "/"
      ? [{ label: "Panel" }]
      : [{ label: "Panel", href: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 ? <span>/</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-zinc-800 dark:text-zinc-200">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
