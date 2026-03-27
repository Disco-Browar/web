// components/dashboard/DashboardHeader.tsx
import { Title, Text, Button, Group } from "@mantine/core";
import { EditIcon } from "lucide-react";

export default function DashboardHeader({ name = "Jan Kowalski" }) {
  return (
    <div className="mb-10">
      <Group justify="space-between" align="flex-end" wrap="wrap" gap="xl">
        <div>
          <Title order={1} size="h2" fw={900}>
            Dzień dobry,{" "}
            <span className="text-red-9">Panie {name.split(" ")[1]}</span>
          </Title>
          <Text size="lg" c="dimmed" mt="xs">
            Twoja suwerenna inteligencja przeanalizowała 14 nowych spraw w Twoim
            regionie.
          </Text>
        </div>

        <Button
          size="lg"
          radius="xl"
          leftSection={<EditIcon size={20} />}
          color="blue"
        >
          Nowa Sprawa AI
        </Button>
      </Group>
    </div>
  );
}
