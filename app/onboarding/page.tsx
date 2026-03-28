"use client";

import { useEffect, useState } from "react";
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
  Briefcase,
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

const industriesList = [
  { id: "it", label: "Technologie & IT", icon: Cpu },
  { id: "finanse", label: "Finanse & Prawo", icon: Briefcase },
  { id: "przemysl", label: "Przemysł & Energia", icon: Hammer },
  { id: "administracja", label: "Administracja Publiczna", icon: Briefcase },
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
  const {
    user,
    token,
    updateRegion,
    updateInterests,
    updateIndustries,
    setAuth,
  } = useAppStore();

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || [],
  );
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    user?.industries || [],
  );
  const [selectedRegion, setSelectedRegion] = useState<string>(
    user?.region || "malopolskie",
  );

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.region && user?.interests?.length > 0) {
      router.replace("/dashboard");
    }
  }, []);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleIndustry = (id: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleNext = async () => {
    setSaving(true);

    updateRegion(selectedRegion);
    updateInterests(selectedInterests);
    updateIndustries(selectedIndustries);

    try {
      console.log({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          region: selectedRegion,
          interests: selectedInterests,
          industries: selectedIndustries, // ← industries
        }),
      });
      const res = await fetch(`${API_BASE}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          region: selectedRegion,
          interests: selectedInterests,
          industries: selectedIndustries, // ← industries
        }),
      });

      if (res.ok) {
        const freshUser = await res.json();
        setAuth(token!, freshUser);
      }
    } catch (err) {
      console.error("Błąd zapisu", err);
    }

    setSaving(false);
    router.replace("/dashboard");
  };

  const handleSkip = () => router.replace("/dashboard");

  return (
    <MobileLayout>
      <Container size="md" py="xl" style={{ minHeight: "100dvh" }}>
        <Stack gap="xl">
          <Progress value={66} color="red" size="md" radius="xl" />

          <Stack align="center" ta="center" gap="xs">
            <Title order={1} size="h1" fw={900} style={{ fontSize: 32 }}>
              Dostosuj swój profil
            </Title>
            <Text size="lg" c="dimmed">
              Wybierz zainteresowania oraz branże, w których się poruszasz
            </Text>
          </Stack>

          {/* Zainteresowania */}
          <Stack gap="xs">
            <Text fw={700} size="sm" tt="uppercase" c="dimmed">
              ZAINTERESOWANIA
            </Text>
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
                        <Icon
                          size={32}
                          color={isSelected ? "#dc143c" : "#666"}
                        />
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
          </Stack>

          {/* Branże Zawodowe (teraz mnoga) */}
          <Stack gap="xs">
            <Text fw={700} size="sm" tt="uppercase" c="dimmed">
              BRANŻE ZAWODOWE
            </Text>
            <SimpleGrid cols={2} spacing="md">
              {industriesList.map((item) => {
                const isSelected = selectedIndustries.includes(item.id);
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
                    onClick={() => toggleIndustry(item.id)}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Stack gap="xs">
                        <Icon
                          size={32}
                          color={isSelected ? "#dc143c" : "#666"}
                        />
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
          </Stack>

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
              {saving ? "Zapisywanie..." : "Dalej →"}
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
        </Stack>
      </Container>
    </MobileLayout>
  );
}
