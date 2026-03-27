// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import MobileLayout from "@/components/MobileLayout";
import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Paper,
  Divider,
} from "@mantine/core";
import { FingerprintIcon, ShieldCheckIcon, BadgeIcon } from "lucide-react";

export default function LoginContent() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const handleMObywatelLogin = () => {
    // Symulacja logowania przez mObywatel
    setUser({
      id: "u123",
      name: "Jan Kowalski",
      pesel: "85010112345",
      region: "mazowieckie",
      interests: ["drogi", "środowisko", "edukacja"],
    });

    // Lekkie opóźnienie dla lepszego feelu
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <MobileLayout>
      <div
        style={{
          minHeight: "calc(100dvh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px",
        }}
      >
        <Stack
          align="center"
          gap="xl"
          style={{ width: "100%", maxWidth: "420px" }}
        >
          {/* Ikona u góry */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <div
              style={{
                width: 80,
                height: 80,
                background: "#dc143c",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <FingerprintIcon size={42} color="white" />
            </div>

            <Title order={2} ta="center" mb={6}>
              Uwierzytelnienie
            </Title>
            <Text c="dimmed" ta="center" size="lg">
              Wybierz metodę logowania, aby kontynuować
            </Text>
          </div>

          {/* Główny przycisk mObywatel */}
          <Button
            fullWidth
            size="xl"
            radius="md"
            leftSection={
              <img
                src="/mobywatel.png"
                alt="mObywatel"
                style={{ height: 48 }}
              />
            }
            onClick={handleMObywatelLogin}
            style={{
              backgroundColor: "#003087",
              height: 68,
              fontSize: "17px",
              fontWeight: 600,
            }}
          >
            Zaloguj przez mObywatel
          </Button>

          <Divider
            label="LUB SKORZYSTAJ Z"
            labelPosition="center"
            my="lg"
            w="100%"
          />

          {/* Pozostałe opcje */}
          <Stack gap="sm" w="100%">
            <Paper shadow="sm" p="md" radius="md" withBorder>
              <Group wrap="nowrap">
                <ShieldCheckIcon size={28} color="#003087" />
                <div>
                  <Text fw={600}>Węzeł Krajowy (Profil Zaufany)</Text>
                  <Text size="sm" c="dimmed">
                    Zaloguj się przez bank lub e-dowód
                  </Text>
                </div>
              </Group>
            </Paper>

            <Paper shadow="sm" p="md" radius="md" withBorder>
              <Group wrap="nowrap">
                <BadgeIcon size={28} color="#dc143c" />
                <div>
                  <Text fw={600}>E-dowód osobisty</Text>
                  <Text size="sm" c="dimmed">
                    Użyj chipa w dowodzie
                  </Text>
                </div>
              </Group>
            </Paper>
          </Stack>

          {/* Stopka z regulaminem */}
          <Text size="xs" c="dimmed" ta="center" style={{ marginTop: "30px" }}>
            Logując się, akceptujesz regulamin serwisu.
            <br />
            Twoje dane są chronione zgodnie z ustawą o ochronie danych osobowych
            oraz RODO.
          </Text>
        </Stack>
      </div>
    </MobileLayout>
  );
}
