// app/profil/ustawienia/page.tsx
"use client";

import {
  Title,
  Text,
  Button,
  Grid,
  Card,
  Group,
  Badge,
  Stack,
  Container,
  Progress,
  SimpleGrid,
} from "@mantine/core";
import {
  MapPinIcon,
  BriefcaseIcon,
  CheckIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileLayout from "@/components/MobileLayout";

export default function SettingsPage() {
  const user = useAppStore((state) => state.user);

  const regions = [
    "Mazowieckie",
    "Małopolskie",
    "Wielkopolskie",
    "Śląskie",
    "Dolnośląskie",
    "Pomorskie",
    "Łódzkie",
    "Lubelskie",
  ];

  const interests = [
    { name: "Ekologia", icon: "🌱", color: "green" },
    { name: "Infrastruktura", icon: "🏗️", color: "red" },
    { name: "Edukacja", icon: "📚", color: "blue" },
    { name: "Zdrowie", icon: "🛡️", color: "red" },
    { name: "Bezpieczeństwo", icon: "🔒", color: "orange" },
    { name: "Kultura", icon: "🎭", color: "violet" },
    { name: "Cyfryzacja", icon: "💻", color: "cyan" },
  ];

  const industries = [
    "Technologie & IT",
    "Finanse & Prawo",
    "Przemysł & Energia",
    "Administracja Publiczna",
  ];

  return (
    <ProtectedRoute>
      <MobileLayout>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            {/* Nagłówek */}
            <div>
              <Text c="red.9" fw={700} size="sm" tt="uppercase" mb={4}>
                Konfiguracja Systemu • Krok 2 z 3
              </Text>
              <Title order={1} size="h2" fw={900}>
                Witaj w GłosPolski.ai
              </Title>
              <Text size="xl" c="dimmed" mt="xs">
                Skonfiguruj swój profil, aby widzieć petycje z Twojej okolicy
              </Text>
            </div>

            <Progress value={66} color="red" size="md" radius="xl" />

            <Grid gutter="xl">
              {/* Lewa kolumna - Województwo + Obszary zainteresowań */}
              <Grid.Col span={{ base: 12, lg: 8 }}>
                {/* Wybór województwa */}
                <Card withBorder shadow="sm" radius="lg" p="xl" mb="xl">
                  <Group mb="lg">
                    <MapPinIcon size={28} color="#dc143c" />
                    <Title order={3}>Wybierz swoje Województwo</Title>
                  </Group>

                  <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
                    {regions.map((region) => (
                      <Button
                        key={region}
                        variant={
                          region === (user?.region || "Małopolskie")
                            ? "filled"
                            : "light"
                        }
                        color={
                          region === (user?.region || "Małopolskie")
                            ? "red"
                            : "gray"
                        }
                        radius="md"
                        fullWidth
                        size="lg"
                      >
                        {region}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Card>

                {/* Obszary zainteresowań */}
                <Card withBorder shadow="sm" radius="lg" p="xl">
                  <Group mb="lg">
                    <span className="text-2xl">🎯</span>
                    <Title order={3}>Obszary Zainteresowań</Title>
                  </Group>

                  <Group gap="md">
                    {interests.map((item) => (
                      <Badge
                        key={item.name}
                        size="xl"
                        radius="xl"
                        variant={
                          item.name === "Infrastruktura" ||
                          item.name === "Zdrowie"
                            ? "filled"
                            : "light"
                        }
                        color={
                          item.name === "Infrastruktura" ||
                          item.name === "Zdrowie"
                            ? "red"
                            : "gray"
                        }
                        leftSection={<span>{item.icon}</span>}
                        py="md"
                        px="xl"
                        style={{ fontSize: "15px" }}
                      >
                        {item.name}
                      </Badge>
                    ))}
                  </Group>
                </Card>
              </Grid.Col>

              {/* Prawa kolumna - Branża + Informacja */}
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Card withBorder shadow="sm" radius="lg" p="xl" h="100%">
                  <Group mb="lg">
                    <BriefcaseIcon size={28} color="#003087" />
                    <Title order={3}>Branża Zawodowa</Title>
                  </Group>

                  <Stack gap="sm">
                    {industries.map((industry) => (
                      <Card
                        key={industry}
                        withBorder
                        p="md"
                        radius="md"
                        style={{
                          borderColor:
                            industry === "Technologie & IT"
                              ? "#dc143c"
                              : undefined,
                          backgroundColor:
                            industry === "Technologie & IT"
                              ? "#fff5f5"
                              : undefined,
                        }}
                      >
                        <Group justify="space-between">
                          <Text fw={500}>{industry}</Text>
                          {industry === "Technologie & IT" && (
                            <CheckIcon size={20} color="#dc143c" />
                          )}
                        </Group>
                      </Card>
                    ))}
                  </Stack>

                  <Card mt="xl" bg="#f8f9fa" p="md" radius="md">
                    <Text size="sm" c="dimmed">
                      Te dane pomogą naszemu systemowi AI dopasować petycje,
                      które mają realny wpływ na Twój region i profesję.
                    </Text>
                  </Card>

                  <Button
                    fullWidth
                    size="lg"
                    radius="xl"
                    mt="xl"
                    color="blue"
                    rightSection={<ArrowRightIcon />}
                  >
                    Zatwierdź i Kontynuuj
                  </Button>
                </Card>
              </Grid.Col>
            </Grid>

            {/* Sekcja "Dlaczego personalizacja jest ważna?" */}
            <Card withBorder shadow="sm" radius="lg" p="xl" mt="xl">
              <Title order={3} mb="lg">
                Dlaczego personalizacja jest ważna?
              </Title>

              <Stack gap="md">
                {[
                  "Filtrowanie szumu: Nie musisz przeglądać setek petycji, które Cię nie dotyczą.",
                  "Wpływ lokalny: Skupienie na sprawach, które zmieniają Twoje bezpośrednie otoczenie.",
                  "Profesjonalny rozwój: Monitoring regulacji prawnych wpływających na Twoją branżę.",
                ].map((text, i) => (
                  <Group key={i} align="flex-start" gap="md">
                    <div className="mt-1">
                      <CheckIcon size={22} color="#dc143c" />
                    </div>
                    <Text size="md">{text}</Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Container>
      </MobileLayout>
    </ProtectedRoute>
  );
}
