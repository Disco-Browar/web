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
  Divider,
  ThemeIcon,
  Stepper,
} from "@mantine/core";
import {
  CheckCircle,
  FileText,
  Building2,
  Send,
  Clock,
  ShieldCheck,
  Sparkles,
  MapPin,
  Users,
  ChevronRight,
  Download,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

export default function WniosekZweryfikowanyPage() {
  return (
    <MobileLayout>
      <Container size="sm" py="md" pb={100}>
        <Stack gap="sm">
          {/* Hero */}
          <Paper
            p="md"
            radius="xl"
            style={{
              background: "linear-gradient(135deg, #e6f7ee 0%, #f0fdf4 100%)",
              border: "1.5px solid #b2f2bb",
            }}
          >
            <Group gap="md">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #2f9e44, #40c057)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(47,158,68,0.3)",
                }}
              >
                <CheckCircle size={30} color="white" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>
                <Group gap="xs" mb={4}>
                  <Badge
                    color="green"
                    variant="filled"
                    size="xs"
                    leftSection={<ShieldCheck size={9} />}
                  >
                    Zweryfikowano
                  </Badge>
                  <Badge
                    color="violet"
                    variant="light"
                    size="xs"
                    leftSection={<Sparkles size={9} />}
                  >
                    AI Approved
                  </Badge>
                </Group>
                <Title order={3} fw={900} lh={1.2}>
                  Wniosek dodany do platformy!
                </Title>
                <Text size="xs" c="dimmed" mt={2}>
                  #BYD-2024-1847 · 28.03.2026, 14:32
                </Text>
              </div>
            </Group>
          </Paper>

          {/* Szczegóły + AI w jednym */}
          <Paper p="md" radius="xl" withBorder>
            <Stack gap="xs">
              <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                Wniosek
              </Text>
              <Text fw={700} size="sm" lh={1.3}>
                Instalacja lampy LED przy przejściu dla pieszych — Opera Nova,
                ul. Focha
              </Text>

              <Group gap="xs">
                <Badge color="yellow" variant="light" size="sm">
                  Infrastruktura
                </Badge>
                <Badge
                  color="blue"
                  variant="light"
                  size="sm"
                  leftSection={<MapPin size={9} />}
                >
                  Bydgoszcz
                </Badge>
              </Group>

              <Divider />

              <Group gap="xs">
                <Building2 size={14} color="#dc143c" />
                <Text size="xs" c="dimmed">
                  Odbiorca:
                </Text>
                <Text size="xs" fw={600}>
                  Urząd Miasta Bydgoszczy · Wydział Infrastruktury
                </Text>
              </Group>

              <Paper p="xs" radius="md" bg="#f8f0ff">
                <Text size="xs" c="dimmed" lh={1.5}>
                  <b style={{ color: "#7950f2" }}>💬 AI:</b> Wniosek zasadny.
                  Przejście figuruje w rejestrze miejsc wymagających poprawy
                  oświetlenia. Priorytet: <b>wysoki</b>.
                </Text>
              </Paper>
            </Stack>
          </Paper>

          {/* Stepper */}
          <Paper p="md" radius="xl" withBorder>
            <Text fw={700} size="sm" mb="sm">
              Droga wniosku
            </Text>
            <Stepper active={1} size="xs" color="red">
              <Stepper.Step
                label="Złożony"
                icon={<CheckCircle size={12} />}
                color="green"
              />
              <Stepper.Step
                label="Podpisy"
                description="0/1000"
                icon={<Users size={12} />}
              />
              <Stepper.Step label="Do urzędu" icon={<Send size={12} />} />
              <Stepper.Step label="Decyzja" icon={<Building2 size={12} />} />
            </Stepper>
          </Paper>

          {/* Akcje */}
          <Stack gap="xs">
            <Button
              fullWidth
              color="red"
              radius="xl"
              size="md"
              leftSection={<Users size={16} />}
              rightSection={<ChevronRight size={14} />}
            >
              Zobacz petycję i zbieraj podpisy
            </Button>
            <Group grow>
              <Button
                variant="light"
                color="gray"
                radius="xl"
                size="sm"
                leftSection={<Download size={14} />}
              >
                Pobierz PDF
              </Button>
              <Button variant="subtle" color="gray" radius="xl" size="sm">
                Dashboard
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Container>
    </MobileLayout>
  );
}
