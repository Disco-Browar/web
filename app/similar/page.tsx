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
  Loader,
  Progress,
  ThemeIcon,
  Divider,
  Avatar,
} from "@mantine/core";
import {
  Sparkles,
  SearchCheck,
  AlertTriangle,
  CheckCircle,
  Users,
  ChevronRight,
  MapPin,
  Lightbulb,
  XCircle,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import MobileLayout from "@/components/MobileLayout";

const SIMILAR = [
  {
    id: 1,
    title: "Oświetlenie przejścia przy Operze Nova – ul. Focha",
    category: "infrastruktura",
    region: "Bydgoszcz",
    signatures: 342,
    goal: 1000,
    similarity: 96,
    author: "Anna K.",
    avatar: "AK",
    color: "red",
    status: "active",
  },
  {
    id: 2,
    title: "Nowe lampy LED przy przejściach – Śródmieście Bydgoszcz",
    category: "infrastruktura",
    region: "Bydgoszcz",
    signatures: 891,
    goal: 1000,
    similarity: 81,
    author: "Marek T.",
    avatar: "MT",
    color: "blue",
    status: "almost",
  },
  {
    id: 3,
    title: "Poprawa bezpieczeństwa pieszych – ul. Gdańska",
    category: "transport",
    region: "Bydgoszcz",
    signatures: 124,
    goal: 1000,
    similarity: 67,
    author: "Piotr N.",
    avatar: "PN",
    color: "teal",
    status: "active",
  },
];

const STEPS = [
  { label: "Analizuję treść wniosku...", icon: Sparkles, delay: 0 },
  { label: "Sprawdzam bazę petycji...", icon: SearchCheck, delay: 900 },
  { label: "Porównuję lokalizacje...", icon: MapPin, delay: 1800 },
  { label: "Oceniam podobieństwo...", icon: Lightbulb, delay: 2700 },
];

function SimilarityBadge({ value }: { value: number }) {
  const color = value >= 90 ? "red" : value >= 70 ? "orange" : "blue";
  return (
    <Badge color={color} variant="filled" size="sm">
      {value}% zgodności
    </Badge>
  );
}

export default function SprawdzPodobneePage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    STEPS.forEach((s, i) => {
      setTimeout(() => {
        setStep(i + 1);
        if (i === STEPS.length - 1) {
          setTimeout(() => setDone(true), 600);
        }
      }, s.delay + 400);
    });
  }, []);

  return (
    <MobileLayout>
      <Container size="sm" py="md" pb={100}>
        <Stack gap="md">
          {/* Header */}
          <div>
            <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={2}>
              Weryfikacja AI
            </Text>
            <Title order={2} fw={900} lh={1.2}>
              Sprawdzam podobne wnioski
            </Title>
            <Text size="sm" c="dimmed" mt={4}>
              Instalacja lampy LED — Opera Nova, ul. Focha
            </Text>
          </div>

          {/* Loading steps */}
          <Paper p="md" radius="xl" withBorder>
            <Stack gap="sm">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = step === i + 1 && !done;
                const completed = step > i + 1 || done;
                return (
                  <Group key={i} gap="sm">
                    <ThemeIcon
                      size={32}
                      radius="xl"
                      color={completed ? "green" : active ? "blue" : "gray"}
                      variant={completed || active ? "filled" : "light"}
                    >
                      {completed ? (
                        <CheckCircle size={16} />
                      ) : active ? (
                        <Loader size={14} color="white" />
                      ) : (
                        <Icon size={16} />
                      )}
                    </ThemeIcon>
                    <Text
                      size="sm"
                      fw={active ? 700 : 400}
                      c={completed ? "green" : active ? "blue" : "dimmed"}
                    >
                      {s.label}
                    </Text>
                    {completed && (
                      <Text size="xs" c="green" ml="auto">
                        ✓
                      </Text>
                    )}
                  </Group>
                );
              })}
            </Stack>
          </Paper>

          {/* Wyniki */}
          {done && (
            <Stack gap="sm">
              {/* Alert podobieństwo */}
              <Paper
                p="md"
                radius="xl"
                style={{
                  background: "linear-gradient(135deg, #fff9db, #fffbe6)",
                  border: "1.5px solid #ffe066",
                }}
              >
                <Group gap="sm">
                  <ThemeIcon
                    color="yellow"
                    variant="filled"
                    size={40}
                    radius="xl"
                  >
                    <AlertTriangle size={20} />
                  </ThemeIcon>
                  <div style={{ flex: 1 }}>
                    <Text fw={700} size="sm">
                      Znaleziono podobne wnioski!
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.5}>
                      Istnieją 3 petycje o podobnej tematyce. Rozważ dołączenie
                      do istniejącej zamiast tworzenia nowej.
                    </Text>
                  </div>
                </Group>
              </Paper>

              {/* Lista podobnych */}
              <Text fw={700} size="sm" c="dimmed" tt="uppercase">
                Podobne petycje ({SIMILAR.length})
              </Text>

              {SIMILAR.map((p) => (
                <Paper key={p.id} p="md" radius="xl" withBorder>
                  <Stack gap="xs">
                    <Group justify="space-between" align="flex-start">
                      <Group gap="xs" style={{ flex: 1 }}>
                        <Avatar color={p.color as any} radius="xl" size="sm">
                          {p.avatar}
                        </Avatar>
                        <Text size="xs" c="dimmed">
                          {p.author}
                        </Text>
                      </Group>
                      <SimilarityBadge value={p.similarity} />
                    </Group>

                    <Text fw={700} size="sm" lh={1.3}>
                      {p.title}
                    </Text>

                    <Group gap="xs">
                      <Badge
                        color="blue"
                        variant="light"
                        size="xs"
                        leftSection={<MapPin size={9} />}
                      >
                        {p.region}
                      </Badge>
                      <Badge color="yellow" variant="light" size="xs">
                        {p.category}
                      </Badge>
                      {p.status === "almost" && (
                        <Badge color="green" variant="light" size="xs">
                          🔥 Prawie cel!
                        </Badge>
                      )}
                    </Group>

                    <div>
                      <Group justify="space-between" mb={4}>
                        <Text size="xs" c="dimmed">
                          <b>{p.signatures}</b> / {p.goal} podpisów
                        </Text>
                        <Text size="xs" c="dimmed">
                          {Math.round((p.signatures / p.goal) * 100)}%
                        </Text>
                      </Group>
                      <Progress
                        value={(p.signatures / p.goal) * 100}
                        color={p.status === "almost" ? "green" : "blue"}
                        size="sm"
                        radius="xl"
                      />
                    </div>

                    <Button
                      fullWidth
                      variant="light"
                      color="blue"
                      radius="xl"
                      size="xs"
                      rightSection={<ChevronRight size={14} />}
                    >
                      Dołącz i podpisz tę petycję
                    </Button>
                  </Stack>
                </Paper>
              ))}

              <Divider label="lub" labelPosition="center" />

              {/* Decyzja */}
              <Paper p="md" radius="xl" withBorder>
                <Stack gap="xs">
                  <Text fw={700} size="sm">
                    Co chcesz zrobić?
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.5}>
                    Możesz dołączyć do istniejącej petycji lub mimo wszystko
                    opublikować swój wniosek jako nowy — np. jeśli masz inne
                    podejście do problemu.
                  </Text>

                  <Button
                    fullWidth
                    color="red"
                    radius="xl"
                    size="md"
                    leftSection={<Plus size={16} />}
                    mt={4}
                  >
                    Mimo to dodaj nowy wniosek
                  </Button>

                  <Button
                    fullWidth
                    variant="subtle"
                    color="gray"
                    radius="xl"
                    size="sm"
                    leftSection={<XCircle size={14} />}
                  >
                    Anuluj i wróć
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          )}
        </Stack>
      </Container>
    </MobileLayout>
  );
}
