"use client";

import { useState, useEffect } from "react";
import {
  Title,
  Text,
  Button,
  Grid,
  Card,
  Group,
  Stack,
  Container,
  Progress,
  SimpleGrid,
  Select,
  Paper,
  Alert,
} from "@mantine/core";
import {
  MapPinIcon,
  BriefcaseIcon,
  CheckIcon,
  SaveIcon,
  CheckCircle,
} from "lucide-react";
import {
  Bus,
  GraduationCap,
  Leaf,
  Hammer,
  HeartPulse,
  Cpu,
  Briefcase,
} from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useAppStore } from "@/lib/store";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileLayout from "@/components/MobileLayout";

const API_BASE = "http://localhost:4000";

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

const interestsList = [
  { id: "transport", label: "Transport", icon: "🚌" },
  { id: "edukacja", label: "Edukacja", icon: "📚" },
  { id: "ekologia", label: "Ekologia", icon: "🌱" },
  { id: "infrastruktura", label: "Infrastruktura", icon: "🏗️" },
  { id: "bezpieczenstwo", label: "Bezpieczeństwo", icon: "🔒" },
  { id: "zdrowie", label: "Zdrowie", icon: "🛡️" },
  { id: "kultura", label: "Kultura", icon: "🎭" },
  { id: "cyfryzacja", label: "Cyfryzacja", icon: "💻" },
];

const industriesList = [
  { id: "it", label: "Technologie & IT", icon: Cpu },
  { id: "finanse", label: "Finanse & Prawo", icon: Briefcase },
  { id: "przemysl", label: "Przemysł & Energia", icon: Hammer },
  { id: "administracja", label: "Administracja Publiczna", icon: Briefcase },
];

export default function SettingsPage() {
  const {
    user,
    token,
    updateRegion,
    updateInterests,
    updateIndustries,
    setAuth,
  } = useAppStore();

  const [selectedRegion, setSelectedRegion] = useState(
    user?.region || "malopolskie",
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests ? user.interests.map((i: string) => i.trim()) : [],
  );
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    user?.industries || [],
  );

  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedRegion(user.region || "malopolskie");
      setSelectedInterests(
        user.interests ? user.interests.map((i: string) => i.trim()) : [],
      );
      setSelectedIndustries(user.industries || ["it"]);
    }
  }, [user]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
    setHasChanges(true);
  };

  const toggleIndustry = (id: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!token) return;

    setSaving(true);

    try {
      updateRegion(selectedRegion);
      updateInterests(selectedInterests);
      updateIndustries(selectedIndustries);

      const res = await fetch(`${API_BASE}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          region: selectedRegion,
          interests: selectedInterests,
          industries: selectedIndustries,
        }),
      });

      if (!res.ok) throw new Error();

      const freshUser = await res.json();
      setAuth(token, freshUser);

      notifications.show({
        title: "Sukces",
        message: "Profil został zaktualizowany",
        color: "green",
      });
      setHasChanges(false);
    } catch (err) {
      notifications.show({
        title: "Błąd",
        message: "Nie udało się zapisać zmian",
        color: "red",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <MobileLayout>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            <div>
              <Text c="red.9" fw={700} size="sm" tt="uppercase" mb={4}>
                Profil • Ustawienia
              </Text>
              <Title order={1} size="h2" fw={900}>
                Dostosuj swój profil
              </Title>
            </div>

            <Progress value={80} color="red" size="md" radius="xl" />

            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, lg: 8 }}>
                {/* Województwo */}
                <Card withBorder shadow="sm" radius="lg" p="xl" mb="xl">
                  <Group mb="lg">
                    <MapPinIcon size={28} color="#dc143c" />
                    <Title order={3}>Twoje Województwo</Title>
                  </Group>
                  <Select
                    data={regions}
                    value={selectedRegion}
                    onChange={(val) => val && setSelectedRegion(val)}
                    size="lg"
                    radius="md"
                  />
                </Card>

                {/* Zainteresowania */}
                <Card withBorder shadow="sm" radius="lg" p="xl" mb="xl">
                  <Group mb="lg">
                    <span className="text-2xl">🎯</span>
                    <Title order={3}>Obszary Zainteresowań</Title>
                  </Group>
                  <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
                    {interestsList.map((item) => {
                      const isSelected = selectedInterests.includes(item.id);
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
                          <Group justify="space-between">
                            <Stack gap="xs">
                              <Text size="xl">{item.icon}</Text>
                              <Text fw={700}>{item.label}</Text>
                            </Stack>
                            {isSelected && (
                              <CheckIcon size={28} color="#dc143c" />
                            )}
                          </Group>
                        </Paper>
                      );
                    })}
                  </SimpleGrid>
                </Card>

                {/* Branża Zawodowa */}
                <Card withBorder shadow="sm" radius="lg" p="xl">
                  <Group mb="lg">
                    <BriefcaseIcon size={28} color="#dc143c" />
                    <Title order={3}>Branża Zawodowa</Title>
                  </Group>
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
                            {isSelected && (
                              <CheckCircle size={28} color="#dc143c" />
                            )}
                          </Group>
                        </Paper>
                      );
                    })}
                  </SimpleGrid>
                </Card>
              </Grid.Col>

              {/* Prawa kolumna */}
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Card withBorder shadow="sm" radius="lg" p="xl" h="100%">
                  <Stack gap="md" justify="space-between" h="100%">
                    <div>
                      <Text size="sm" c="dimmed">
                        Te informacje pomogą systemowi lepiej dopasowywać
                        petycje do Twojej sytuacji życiowej i zawodowej.
                      </Text>
                    </div>

                    <Button
                      fullWidth
                      size="lg"
                      radius="xl"
                      color="red"
                      onClick={handleSave}
                      loading={saving}
                      disabled={!hasChanges}
                      leftSection={<SaveIcon size={20} />}
                    >
                      Zapisz zmiany
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </MobileLayout>
    </ProtectedRoute>
  );
}
