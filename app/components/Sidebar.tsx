"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, type NavNode } from "@/lib/nav";

function isActive(href: string | undefined, pathname: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavList({
  nodes,
  pathname,
}: {
  nodes: NavNode[];
  pathname: string;
}) {
  return (
    <ul className="space-y-0.5">
      {nodes.map((node) => (
        <li key={node.label}>
          {node.href ? (
            <Link
              href={node.href}
              className={`block rounded px-3 py-1.5 text-sm ${
                isActive(node.href, pathname)
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {node.label}
            </Link>
          ) : (
            <span className="block px-3 pt-4 pb-1 text-xs font-medium tracking-wide text-zinc-400 uppercase">
              {node.label}
            </span>
          )}

          {node.children ? (
            <div className="ml-3 border-l border-zinc-200 dark:border-zinc-800">
              <NavList nodes={node.children} pathname={pathname} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-zinc-200 p-3 md:block dark:border-zinc-800">
      <nav>
        <NavList nodes={nav} pathname={pathname} />
      </nav>
    </aside>
  );
}
