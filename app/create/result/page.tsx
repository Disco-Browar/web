// app/create/result/page.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Paper,
  Badge,
  Box,
  Center,
  Divider,
} from "@mantine/core";
import { Hammer, MapPin, Copy, Share2, Lightbulb, Send } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

export default function AiResultPage() {
  const router = useRouter();

  const handlePublish = () => {
    alert("✅ Petycja opublikowana! (demo)");
    router.push("/ideas"); // lub /dashboard
  };

  return (
    <MobileLayout>
      <Container size="md" py="md" pb={100}>
        <Stack gap="xl">
          {/* Badge AI */}
          <Center>
            <Badge
              size="lg"
              radius="xl"
              color="blue"
              variant="light"
              leftSection={<span style={{ fontSize: 18 }}>✦</span>}
            >
              ANALIZA AI UKOŃCZONA
            </Badge>
          </Center>

          {/* Główny tytuł */}
          <Stack gap={6} ta="center">
            <Title order={1} size={32} fw={900} style={{ lineHeight: 1.1 }}>
              AI przeanalizowało
              <br />
              Twoje zgłoszenie.
            </Title>
            <Text size="lg" c="dimmed">
              Twoja wypowiedź została przetworzona na formalny wniosek
              obywatelski. Zidentyfikowaliśmy odpowiednie organy oraz podobne
              inicjatywy w Twojej okolicy.
            </Text>
          </Stack>

          {/* Organ właściwy */}
          <Paper withBorder shadow="sm" radius="lg" p="md">
            <Group gap="md">
              <Box
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#dc143c",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Hammer size={28} />
              </Box>
              <div>
                <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                  ORGAN WŁAŚCIWY
                </Text>
                <Text fw={700} size="lg">
                  Urząd Miasta / Ministerstwo Infrastruktury
                </Text>
              </div>
            </Group>
          </Paper>

          {/* Projekt Petycji */}
          <Paper
            withBorder
            shadow="md"
            radius="lg"
            p={0}
            style={{ overflow: "hidden" }}
          >
            <Group
              p="md"
              justify="space-between"
              style={{ borderBottom: "1px solid #eee" }}
            >
              <Text fw={700} size="lg">
                Projekt Petycji
              </Text>
              <Group gap="xs">
                <Button
                  variant="subtle"
                  size="sm"
                  leftSection={<Copy size={18} />}
                >
                  Kopiuj
                </Button>
                <Button
                  variant="subtle"
                  size="sm"
                  leftSection={<Share2 size={18} />}
                >
                  Udostępnij
                </Button>
              </Group>
            </Group>

            <Box p="xl" style={{ background: "#fff", lineHeight: 1.7 }}>
              <Text ta="right" c="dimmed" mb="xl">
                Warszawa, dnia 28 marca 2026 r.
              </Text>

              <Text fw={700} mb="md">
                Do: Urząd Miasta Stołecznego Warszawy
                <br />
                Biuro Infrastruktury i Budownictwa
              </Text>

              <Title order={3} ta="center" mb="xl" style={{ fontSize: 24 }}>
                WNIOSEK O REMONT DROGI LOKALNEJ ORAZ MODERNIZACJĘ OŚWIETLENIA
              </Title>

              <Text size="md">
                Działając w imieniu mieszkańców osiedla oraz w trosce o wspólne
                bezpieczeństwo, niniejszym składam formalny wniosek o
                przeprowadzenie pilnego remontu nawierzchni jezdni na odcinku
                ulicy Kwiatowej oraz modernizację oświetlenia ulicznego.
              </Text>

              <Text mt="lg" size="md">
                <strong>Uzasadnienie:</strong>
                <br />
                Obecny stan techniczny drogi zagraża bezpieczeństwu ruchu
                kołowego oraz pieszych. Liczne ubytki w asfalcie prowadzą do
                uszkodzeń pojazdów, a brak nowoczesnego oświetlenia znacząco
                ogranicza widoczność po zmroku.
              </Text>

              <Divider my="xl" />

              <Text size="sm" c="dimmed" ta="center">
                [Miejsce na podpisy cyfrowe mieszkańców]
              </Text>
            </Box>
          </Paper>

          {/* Podobne zgłoszenia + mapa */}
          <Paper withBorder shadow="sm" radius="lg" p="md">
            <Group justify="space-between" mb="md">
              <Text fw={700} size="lg">
                Podobne zgłoszenia
              </Text>
              <Badge color="red" variant="filled" size="lg">
                4 Aktywne
              </Badge>
            </Group>

            {/* Prosta mapa placeholder */}
            <Box
              style={{
                height: 220,
                background: "linear-gradient(145deg, #e0e0e0, #f0f0f0)",
                borderRadius: "12px",
                position: "relative",
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <Center style={{ height: "100%", color: "#999", fontSize: 14 }}>
                🗺️ Mapa Twojej okolicy
              </Center>
              {/* Symulowane pinezki */}
              <Box
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "35%",
                  color: "#dc143c",
                }}
              >
                📍
              </Box>
              <Box
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "65%",
                  color: "#666",
                }}
              >
                📍
              </Box>
              <Box
                style={{
                  position: "absolute",
                  top: "70%",
                  left: "25%",
                  color: "#dc143c",
                }}
              >
                📍
              </Box>
            </Box>

            <Stack gap="sm">
              <Group gap="sm" align="flex-start">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: "#dc143c",
                    borderRadius: "50%",
                    marginTop: 6,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Text fw={600}>Remont chodnika - ul. Polna</Text>
                  <Text size="sm" c="dimmed">
                    Zakończono zbieranie: 154 podpisy
                  </Text>
                </div>
              </Group>

              <Group gap="sm" align="flex-start">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: "#666",
                    borderRadius: "50%",
                    marginTop: 6,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Text fw={600}>Oświetlenie Parku Wschodniego</Text>
                  <Text size="sm" c="dimmed">
                    W trakcie: 89 podpisów
                  </Text>
                </div>
              </Group>
            </Stack>
          </Paper>

          {/* Rekomendacja AI */}
          <Paper withBorder shadow="sm" radius="lg" p="xl" bg="#f0f4ff">
            <Group align="flex-start" gap="md">
              <Lightbulb size={32} color="#0066cc" />
              <div>
                <Text fw={700} size="sm" c="#0066cc">
                  Rekomendacja AI
                </Text>
                <Text size="md">
                  Połączenie tego wniosku z petycją{" "}
                  <strong>„Bezpieczna Gmina”</strong> zwiększy szansę na
                  realizację o 45%.
                </Text>
              </div>
            </Group>
          </Paper>

          {/* Główny przycisk */}
          <Button
            fullWidth
            size="xl"
            color="red"
            radius="xl"
            onClick={handlePublish}
            leftSection={<Send size={22} />}
            style={{ height: 68, fontSize: 19, fontWeight: 700 }}
          >
            Opublikuj Petycję
          </Button>

          <Center>
            <Button variant="subtle" color="gray" onClick={() => router.back()}>
              Edytuj treść
            </Button>
          </Center>
        </Stack>
      </Container>
    </MobileLayout>
  );
}
