// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Loader, Center } from "@mantine/core";

export default function HomePage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const isLoggedIn = !!user?.isLoggedIn;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Czekamy aż store się "ustabilizuje" (szczególnie ważne jeśli persist)
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
      setIsLoading(false);
    }, 100); // mały delay pomaga uniknąć race condition

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  // Pokazujemy loader dopóki nie zdecydujemy dokąd iść
  if (isLoading) {
    return (
      <Center style={{ minHeight: "100dvh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return null; // nigdy nie powinno dojść tutaj
}
