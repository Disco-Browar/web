"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Center, Loader } from "@mantine/core";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user?.isLoggedIn) {
      router.replace("/login");
    }
  }, [hydrated, user]);

  if (!hydrated) {
    return (
      <Center style={{ minHeight: "100dvh" }}>
        <Loader color="red" />
      </Center>
    );
  }

  if (!user?.isLoggedIn) return null;

  return <>{children}</>;
}
