"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Paper,
  Group,
  Badge,
  Button,
  ThemeIcon,
  Progress,
} from "@mantine/core";
import {
  CheckCircle,
  Building2,
  Send,
  Sparkles,
  MapPin,
  Users,
  ChevronRight,
  PartyPopper,
} from "lucide-react";
import { useEffect, useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import confetti from "canvas-confetti";

const STEPS = [
  { label: "Weryfikacja liczby podpisów...", delay: 0 },
  { label: "Potwierdzenie tożsamości sygnatariuszy...", delay: 1000 },
  { label: "Generowanie oficjalnego dokumentu...", delay: 2000 },
  { label: "Wysyłka do Urzędu Miasta Bydgoszczy...", delay: 3000 },
];

export default function WniosekWyslanyPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [signatureCount, setSignatureCount] = useState(0);

  useEffect(() => {
    // Animacja licznika podpisów
    let count = 0;
    const counter = setInterval(() => {
      count += 23;
      if (count >= 1000) {
        setSignatureCount(1000);
        clearInterval(counter);
      } else {
        setSignatureCount(count);
      }
    }, 30);

    // Kroki
    STEPS.forEach((s, i) => {
      setTimeout(() => setCurrentStep(i), s.delay + 800);
    });

    // Koniec
    setTimeout(
      () => {
        setDone(true);
        // Confetti 🎉
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#dc143c", "#2f9e44", "#1971c2", "#f59f00"],
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
          });
        }, 400);
      },
      3000 + 800 + 600,
    );

    return () => clearInterval(counter);
  }, []);

  return (
    <MobileLayout>
      <Container size="sm" py="md" pb={100}>
        <Stack gap="md">
          {/* Licznik podpisów – animowany */}
          {!done && (
            <Paper p="lg" radius="xl" withBorder>
              <Stack align="center" gap="sm">
                <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                  Weryfikacja wniosku
                </Text>
                <Title
                  order={1}
                  fw={900}
                  style={{
                    fontSize: 64,
                    color: signatureCount >= 1000 ? "#2f9e44" : "#dc143c",
                    transition: "color 0.5s",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {signatureCount.toLocaleString("pl-PL")}
                </Title>
                <Text size="sm" c="dimmed">
                  podpisów zebranych
                </Text>
                <Progress
                  value={(signatureCount / 1000) * 100}
                  color={signatureCount >= 1000 ? "green" : "red"}
                  size="lg"
                  radius="xl"
                  w="100%"
                  animated
                />

                {/* Kroki */}
                <Stack gap="xs" w="100%" mt="xs">
                  {STEPS.map((s, i) => (
                    <Group key={i} gap="xs">
                      <ThemeIcon
                        size={22}
                        radius="xl"
                        color={
                          currentStep > i
                            ? "green"
                            : currentStep === i
                              ? "blue"
                              : "gray"
                        }
                        variant={currentStep >= i ? "filled" : "light"}
                        style={{ flexShrink: 0 }}
                      >
                        {currentStep > i ? (
                          <CheckCircle size={12} />
                        ) : currentStep === i ? (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "white",
                              animation: "pulse 1s infinite",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#aaa",
                            }}
                          />
                        )}
                      </ThemeIcon>
                      <Text
                        size="xs"
                        c={
                          currentStep > i
                            ? "green"
                            : currentStep === i
                              ? "blue"
                              : "dimmed"
                        }
                        fw={currentStep === i ? 700 : 400}
                      >
                        {s.label}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          )}

          {/* SUKCES */}
          {done && (
            <Stack gap="sm">
              {/* Hero */}
              <Paper
                p="md"
                radius="xl"
                style={{
                  background:
                    "linear-gradient(135deg, #e6f7ee 0%, #f0fdf4 100%)",
                  border: "1.5px solid #b2f2bb",
                }}
              >
                <Stack align="center" gap="sm" ta="center">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg, #2f9e44, #40c057)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 32px rgba(47,158,68,0.4)",
                      animation:
                        "pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    <Send size={36} color="white" strokeWidth={2} />
                  </div>
                  <div>
                    <Text size="sm" fw={700} tt="uppercase" c="green">
                      🎉 Cel osiągnięty!
                    </Text>
                    <Title order={2} fw={900} lh={1}>
                      Wniosek trafił
                      <br />
                      do urzędu!
                    </Title>
                    <Text size="sm" c="dimmed" mt={4}>
                      1 000 podpisów · Urząd Miasta Bydgoszczy · #BYD-2024-1847
                    </Text>
                  </div>
                </Stack>
              </Paper>

              {/* Do kogo trafił */}
              <Paper p="sm" radius="xl" withBorder>
                <Group gap="md">
                  <ThemeIcon color="red" variant="light" size={48} radius="xl">
                    <Building2 size={24} />
                  </ThemeIcon>
                  <div style={{ flex: 1 }}>
                    <Text size="xs" c="dimmed">
                      Odbiorca wniosku
                    </Text>
                    <Text fw={700} size="sm">
                      Urząd Miasta Bydgoszczy
                    </Text>
                    <Text size="xs" c="dimmed">
                      Wydział Infrastruktury Miejskiej
                    </Text>
                    <Badge color="yellow" variant="light" size="xs" mt={4}>
                      Oczekuje na rozpatrzenie
                    </Badge>
                  </div>
                </Group>
              </Paper>

              {/* Statystyki */}
              <Group grow>
                <Paper p="md" radius="xl" withBorder ta="center">
                  <Text fw={900} size="xl" c="red">
                    1 000
                  </Text>
                  <Text size="xs" c="dimmed">
                    podpisów
                  </Text>
                </Paper>
                <Paper p="md" radius="xl" withBorder ta="center">
                  <Text fw={900} size="xl" c="blue">
                    30
                  </Text>
                  <Text size="xs" c="dimmed">
                    dni na odpowiedź
                  </Text>
                </Paper>
                <Paper p="md" radius="xl" withBorder ta="center">
                  <Text fw={900} size="xl" c="green">
                    3
                  </Text>
                  <Text size="xs" c="dimmed">
                    podobne sprawy
                  </Text>
                </Paper>
              </Group>

              {/* Info o kolejnych krokach */}
              <Paper p="md" radius="xl" withBorder>
                <Stack gap="xs">
                  <Group gap="xs">
                    <Sparkles size={16} color="#f59f00" />
                    <Text fw={700} size="sm">
                      Co dalej?
                    </Text>
                  </Group>
                  {[
                    "Urząd ma 30 dni na oficjalną odpowiedź",
                    "Otrzymasz powiadomienie o zmianie statusu",
                    "Możesz śledzić postęp w zakładce Dashboard",
                    "Przy decyzji pozytywnej — realizacja w ciągu 6 mies.",
                  ].map((info, i) => (
                    <Group key={i} gap="xs" align="flex-start">
                      <CheckCircle
                        size={14}
                        color="#2f9e44"
                        style={{ marginTop: 2, flexShrink: 0 }}
                      />
                      <Text size="xs" c="dimmed" lh={1.5}>
                        {info}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Paper>

              {/* Akcje */}
              <Stack gap="xs">
                <Button
                  fullWidth
                  color="red"
                  radius="xl"
                  size="lg"
                  leftSection={<Users size={18} />}
                  rightSection={<ChevronRight size={16} />}
                >
                  Udostępnij sukces znajomym
                </Button>
                <Button
                  fullWidth
                  variant="light"
                  color="gray"
                  radius="xl"
                  leftSection={<MapPin size={16} />}
                >
                  Zobacz na mapie
                </Button>
                <Button fullWidth variant="subtle" color="gray" radius="xl">
                  Wróć do dashboardu
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Container>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </MobileLayout>
  );
}
