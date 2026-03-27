// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);
  const isLoggedIn = !!user?.isLoggedIn;

  // Stan ładowania — zapobiega flashowi strony przed sprawdzeniem
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Najpierw ustawiamy że sprawdzanie się skończyło
    setIsChecking(false);

    // Jeśli nie jest zalogowany i nie jest na stronie logowania → przekieruj
    if (!isLoggedIn && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isLoggedIn, pathname, router]);

  // Podczas sprawdzania stanu pokazujemy nic (lub loader później)
  if (isChecking) {
    return null; // lub możesz dodać spinner
  }

  // Jeśli nie jest zalogowany i próbuje wejść gdzie indziej → nic nie renderujemy
  if (!isLoggedIn && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}
