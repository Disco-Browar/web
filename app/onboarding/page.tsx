// app/onboarding/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Progress,
  SimpleGrid,
  Select,
  Paper,
  Center,
  Loader,
  Group,
} from "@mantine/core";
import {
  Bus,
  GraduationCap,
  Leaf,
  Hammer,
  HeartPulse,
  Cpu,
  CheckCircle,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import MobileLayout from "@/components/MobileLayout";

const API_BASE = "http://localhost:4000";

const interestsList = [
  { id: "transport", label: "Transport", icon: Bus },
  { id: "edukacja", label: "Edukacja", icon: GraduationCap },
  { id: "ekologia", label: "Ekologia", icon: Leaf },
  { id: "infrastruktura", label: "Infrastruktura", icon: Hammer },
  { id: "zdrowie", label: "Zdrowie", icon: HeartPulse },
  { id: "technologia", label: "Technologia", icon: Cpu },
];

const regions = [
  "mazowieckie",
  "malopolskie",
  "slaskie",
  "wielkopolskie",
  "dolnoslaskie",
  "pomorskie",
  "lodzkie",
  "lubelskie",
  "podkarpackie",
  "kujawsko-pomorskie",
  "zachodniopomorskie",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, token, updateInterests, updateRegion, setAuth } = useAppStore();

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || [],
  );
  const [selectedRegion, setSelectedRegion] = useState<string>(
    user?.region || "malopolskie",
  );
  const [saving, setSaving] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Funkcja zapisująca do backendu (przez /users/me + store)
  const saveToBackend = async () => {
    if (!token) return;

    try {
      // Na razie tylko odświeżamy dane z backendu (update nie istnieje jeszcze)
      const res = await fetch(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const freshUser = await res.json();
        // Aktualizujemy store nowymi danymi (na wypadek zmian)
        setAuth(token, freshUser);
      }
    } catch (err) {
      console.log("Nie udało się odświeżyć profilu z backendu");
    }
  };

  const handleNext = async () => {
    setSaving(true);

    // 1. Aktualizacja lokalnego store
    updateInterests(selectedInterests);
    updateRegion(selectedRegion);

    // 2. Próba synchronizacji z backendem
    await saveToBackend();

    setSaving(false);

    // Przekierowanie na dashboard
    router.replace("/dashboard");
  };

  const handleSkip = () => {
    router.replace("/dashboard");
  };

  return (
    <MobileLayout>
      <Container size="md" py="xl" style={{ minHeight: "100dvh" }}>
        <Stack gap="xl">
          <Progress value={66} color="red" size="md" radius="xl" />

          <Stack align="center" ta="center" gap="xs">
            <Title order={1} size="h1" fw={900} style={{ fontSize: 32 }}>
              Co Cię interesuje?
            </Title>
            <Text size="lg" c="dimmed">
              Wybierz tematy, które są dla Ciebie najważniejsze.
              <br />
              Dostosujemy treści do Twoich priorytetów.
            </Text>
          </Stack>

          {/* Kafelki zainteresowań */}
          <SimpleGrid cols={2} spacing="md">
            {interestsList.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              const Icon = item.icon;

              return (
                <Paper
                  key={item.id}
                  withBorder
                  shadow="sm"
                  radius="lg"
                  p="xl"
                  style={{
                    cursor: "pointer",
                    borderColor: isSelected ? "#dc143c" : undefined,
                    backgroundColor: isSelected ? "#fff5f5" : undefined,
                  }}
                  onClick={() => toggleInterest(item.id)}
                >
                  <Group justify="space-between" align="flex-start">
                    <Stack gap="xs">
                      <Icon size={32} color={isSelected ? "#dc143c" : "#666"} />
                      <Text fw={700} size="lg">
                        {item.label}
                      </Text>
                    </Stack>
                    {isSelected && <CheckCircle size={28} color="#dc143c" />}
                  </Group>
                </Paper>
              );
            })}
          </SimpleGrid>

          {/* Województwo */}
          <Stack gap="xs">
            <Text fw={700} size="sm" tt="uppercase" c="dimmed">
              WOJEWÓDZTWO
            </Text>
            <Select
              data={regions}
              value={selectedRegion}
              onChange={(val) => val && setSelectedRegion(val)}
              size="lg"
              radius="xl"
            />
          </Stack>

          <Stack gap="md" mt="xl">
            <Button
              fullWidth
              size="xl"
              color="red"
              radius="xl"
              onClick={handleNext}
              loading={saving}
              style={{ height: 64, fontSize: 19, fontWeight: 700 }}
            >
              {saving ? "Zapisywanie..." : "Dalej"}
            </Button>

            <Center>
              <Text
                size="md"
                c="dimmed"
                style={{ cursor: "pointer" }}
                onClick={handleSkip}
              >
                Pomiń ten krok
              </Text>
            </Center>
          </Stack>

          <Center style={{ marginTop: "auto", paddingBottom: 30 }}>
            <Text size="xs" c="dimmed">
              © 2026 Twój Głos • Ministerstwo Cyfryzacji
            </Text>
          </Center>
        </Stack>
      </Container>
    </MobileLayout>
  );
}
