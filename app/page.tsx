// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const isLoggedIn = !!user?.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  // Podczas przekierowania pokazujemy pustą stronę (lub loader)
  return null;
}
