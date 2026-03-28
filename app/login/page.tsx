// app/login/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import LoginContent from "./LoginContent"; // wyciągnij treść do osobnego pliku (zalecane)

export default function LoginPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);

  // Przekierowanie jeśli już zalogowany — TYLKO w useEffect!
  useEffect(() => {
    if (user?.isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [user?.isLoggedIn, router]);

  // Jeśli już zalogowany — nie renderujemy nic (czekamy na przekierowanie)
  if (user?.isLoggedIn) {
    return null;
  }

  return <LoginContent />;
}
