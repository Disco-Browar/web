// components/Header.tsx
"use client"; // only if you need interactivity (useState, usePathname, etc.)

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          MyLogo
        </Link>

        <div className="flex gap-8">
          <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
            Home
          </Link>
          <Link
            href="/demo"
            className={pathname === "/demo" ? "font-bold" : ""}
          >
            Demo
          </Link>
        </div>
      </nav>
    </header>
  );
}
