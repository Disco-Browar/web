// components/dashboard/RecommendedPetition.tsx
import { Card, Text, Progress, Button, Group, Badge } from "@mantine/core";
import { CheckIcon, ShareIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  signatures: number;
  progress: number;
  target: string;
  isHighMatch?: boolean;
}

export default function RecommendedPetition({
  title,
  description,
  signatures,
  progress,
  target,
  isHighMatch = false,
}: Props) {
  return (
    <Card withBorder shadow="sm" radius="lg" p="xl">
      {isHighMatch && (
        <Badge color="red" variant="filled" mb="md">
          98% DOPASOWANIA AI
        </Badge>
      )}

      <Text fw={700} size="lg" mb="xs">
        {title}
      </Text>
      <Text c="dimmed" mb="xl">
        {description}
      </Text>

      <Group justify="space-between" mb="md">
        <div>
          <Text fw={700} size="xl" c="blue">
            {signatures.toLocaleString()}k
          </Text>
          <Text size="xs" c="dimmed">
            PODPISÓW
          </Text>
        </div>
        <div className="text-right">
          <Text size="sm">
            Postęp do: <span className="font-semibold">{target}</span>
          </Text>
          <Progress value={progress} color="blue" size="sm" mt={6} />
        </div>
      </Group>

      <Group>
        <Button fullWidth leftSection={<CheckIcon size={18} />}>
          Podpisz Petycję
        </Button>
        <Button variant="light" px="md">
          <ShareIcon size={18} />
        </Button>
      </Group>
    </Card>
  );
}
