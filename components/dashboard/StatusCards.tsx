// components/dashboard/StatusCards.tsx
import { Card, Group, Text, Badge } from "@mantine/core";
import { SendIcon, ClockIcon, MailOpenIcon } from "lucide-react";

export default function StatusCards() {
  return (
    <Card withBorder shadow="sm" radius="lg" p="lg" mb="xl">
      <Group justify="space-between" mb="md">
        <Text fw={700} size="lg">
          Status Twoich Wniosków
        </Text>
        <Text c="blue" size="sm" fw={600} style={{ cursor: "pointer" }}>
          Zobacz wszystkie
        </Text>
      </Group>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card withBorder p="md" radius="md">
          <Group justify="space-between" mb="xs">
            <SendIcon size={28} color="#228be6" />
            <Badge color="blue" variant="light">
              3 WYSŁANE
            </Badge>
          </Group>
          <Text size="xs" c="dimmed">
            Ostatnia aktualizacja
          </Text>
          <Text fw={600}>Wczoraj, 14:20</Text>
        </Card>

        <Card withBorder p="md" radius="md">
          <Group justify="space-between" mb="xs">
            <ClockIcon size={28} color="#e03131" />
            <Badge color="red" variant="light">
              1 OCZEKUJE
            </Badge>
          </Group>
          <Text size="xs" c="dimmed">
            Pozostały czas
          </Text>
          <Text fw={600}>~4 dni robocze</Text>
        </Card>

        <Card withBorder p="md" radius="md" bg="#003087" c="white">
          <Group justify="space-between" mb="xs">
            <MailOpenIcon size={28} color="#a5d8ff" />
            <Badge color="white" variant="light">
              NOWA ODPOWIEDŹ
            </Badge>
          </Group>
          <Text size="xs" opacity={0.9}>
            Wniosek nr 4402/24
          </Text>
          <Text fw={600}>Decyzja pozytywna</Text>
        </Card>
      </div>
    </Card>
  );
}
