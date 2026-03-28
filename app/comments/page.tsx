"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Paper,
  Group,
  Avatar,
  Badge,
  Button,
  Textarea,
  Divider,
  ActionIcon,
  Progress,
  ThemeIcon,
} from "@mantine/core";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MapPin,
  Lightbulb,
  CheckCircle,
  Clock,
  ChevronUp,
  Flag,
} from "lucide-react";
import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";

const COMMENTS = [
  {
    id: 1,
    author: "Katarzyna W.",
    avatar: "KW",
    color: "red",
    time: "2 godziny temu",
    text: "Całkowicie się zgadzam! Sama codziennie przechodzę przez to przejście po pracy i wieczorami jest tam naprawdę niebezpiecznie. Kierowcy często nie widzą pieszych, szczególnie jesienią i zimą.",
    likes: 24,
    liked: false,
    verified: true,
  },
  {
    id: 2,
    author: "Marek T.",
    avatar: "MT",
    color: "blue",
    time: "4 godziny temu",
    text: "Dobry pomysł, ale proponuję też rozważyć azyl dla pieszych na środku jezdni — szerokość ulicy Focha to ok. 4 pasy i samo oświetlenie może nie wystarczyć. Może warto połączyć oba wnioski?",
    likes: 18,
    liked: false,
    verified: true,
    isPropozycja: true,
  },
  {
    id: 3,
    author: "Anna K.",
    avatar: "AK",
    color: "grape",
    time: "5 godzin temu",
    text: "Podpisuję się obiema rękami. Moje dzieci chodzą tamtędy do szkoły muzycznej przy Operze. Zgłaszałam to już do urzędu miasta dwa lata temu — zero reakcji. Może tym razem się uda!",
    likes: 41,
    liked: true,
    verified: true,
  },
  {
    id: 4,
    author: "Piotr N.",
    avatar: "PN",
    color: "teal",
    time: "6 godzin temu",
    text: "Sprawdziłem w BIP — w budżecie obywatelskim 2023 był podobny projekt ale przepadł w głosowaniu. Teraz mamy szansę żeby zebrać podpisy oficjalnie. Udostępniam wszystkim znajomym!",
    likes: 12,
    liked: false,
    verified: false,
  },
  {
    id: 5,
    author: "Zofia M.",
    avatar: "ZM",
    color: "orange",
    time: "8 godzin temu",
    text: "Jako osoba starsza bardzo potrzebuję lepszego oświetlenia tam. Noszę laskę i boję się tam przechodzić po zmroku. Dziękuję że ktoś w końcu to zgłosił.",
    likes: 67,
    liked: false,
    verified: true,
  },
  {
    id: 6,
    author: "Tomasz B.",
    avatar: "TB",
    color: "cyan",
    time: "wczoraj",
    text: "Trochę sceptyczny — miasto ma teraz cięcia budżetowe. Ale jeśli połączymy to z modernizacją całego odcinka Focha to może przejść jako jeden projekt infrastrukturalny. Koszt samej lampy to jakieś 8-15k zł.",
    likes: 9,
    liked: false,
    verified: false,
    isPropozycja: true,
  },
  {
    id: 7,
    author: "Magdalena R.",
    avatar: "MR",
    color: "pink",
    time: "wczoraj",
    text: "W zeszłym miesiącu prawie potrącili tam moją koleżankę. Na szczęście nic się nie stało ale to był naprawdę bliski kontakt. To przejście jest naprawdę niebezpieczne i czas coś z tym zrobić.",
    likes: 88,
    liked: false,
    verified: true,
  },
];

export default function PetitionDetailPage() {
  const [comments, setComments] = useState(COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [voted, setVoted] = useState<null | "up" | "down">(null);
  const [signatures, setSignatures] = useState(847);
  const [signed, setSigned] = useState(false);

  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c,
      ),
    );
  };

  const handleSign = () => {
    if (!signed) {
      setSignatures((s) => s + 1);
      setSigned(true);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        author: "Ty",
        avatar: "TY",
        color: "red",
        time: "teraz",
        text: newComment,
        likes: 0,
        liked: false,
        verified: true,
      },
      ...prev,
    ]);
    setNewComment("");
  };

  const progress = Math.round((signatures / 1000) * 100);

  return (
    <MobileLayout>
      <Container size="sm" py="md" pb={100}>
        <Stack gap="md">
          {/* Header petycji */}
          <Paper p="lg" radius="xl" withBorder>
            <Stack gap="sm">
              <Group gap="xs">
                <Badge
                  color="yellow"
                  variant="light"
                  leftSection={<Lightbulb size={12} />}
                >
                  INFRASTRUKTURA
                </Badge>
                <Badge
                  color="green"
                  variant="light"
                  leftSection={<MapPin size={12} />}
                >
                  Bydgoszcz
                </Badge>
              </Group>

              <Title order={2} fw={800} lh={1.3}>
                Instalacja lampy LED przy przejściu dla pieszych — Opera Nova
              </Title>

              <Text size="sm" c="dimmed" lh={1.6}>
                Przejście dla pieszych przy ul. Focha naprzeciwko Opery Nova w
                Bydgoszczy jest niedostatecznie oświetlone, co stwarza realne
                zagrożenie dla pieszych — szczególnie wieczorami i w miesiącach
                jesienno-zimowych.
              </Text>

              <Group gap="xs">
                <Avatar color="red" radius="xl" size="sm">
                  JK
                </Avatar>
                <Text size="xs" c="dimmed">
                  <b>Jan Kowalski</b> · zweryfikowany ✓ · 12 godz. temu
                </Text>
              </Group>

              <Divider />

              {/* Postęp */}
              <Stack gap={6}>
                <Group justify="space-between">
                  <Text size="sm" fw={700} c="red">
                    {signatures} podpisów
                  </Text>
                  <Text size="xs" c="dimmed">
                    cel: 1000 → Rada Miasta
                  </Text>
                </Group>
                <Progress
                  value={progress}
                  color="red"
                  size="md"
                  radius="xl"
                  animated
                />
                <Text size="xs" c="dimmed">
                  {progress}% celu — jeszcze {1000 - signatures} podpisów
                </Text>
              </Stack>

              {/* Status */}
              <Paper p="sm" radius="md" bg="#f8f9fa">
                <Group gap="xs">
                  <ThemeIcon
                    color="yellow"
                    variant="light"
                    size="sm"
                    radius="xl"
                  >
                    <Clock size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed">
                    Status: <b>Zbieranie podpisów</b> · Przekazanie do urzędu po
                    osiągnięciu 1000 głosów
                  </Text>
                </Group>
              </Paper>

              {/* Przyciski akcji */}
              <Group align="center">
                <Button
                  color={signed ? "gray" : "red"}
                  radius="xl"
                  leftSection={<CheckCircle size={16} />}
                  onClick={handleSign}
                  variant={signed ? "light" : "filled"}
                  style={{ flex: 1 }}
                >
                  {signed ? "Podpisano ✓" : "Podpisz petycję"}
                </Button>
                <ActionIcon variant="light" color="gray" size={42} radius="xl">
                  <Share2 size={18} />
                </ActionIcon>
              </Group>

              {/* Głosy za/przeciw */}
              <Group justify="center" gap="lg">
                <ActionIcon
                  variant={voted === "up" ? "filled" : "light"}
                  color="green"
                  size={42}
                  radius="xl"
                  onClick={() => setVoted(voted === "up" ? null : "up")}
                >
                  <ThumbsUp size={18} />
                </ActionIcon>
                <ActionIcon
                  variant={voted === "down" ? "filled" : "light"}
                  color="red"
                  size={42}
                  radius="xl"
                  onClick={() => setVoted(voted === "down" ? null : "down")}
                >
                  <ThumbsDown size={18} />
                </ActionIcon>
              </Group>
            </Stack>
          </Paper>

          {/* Dodaj komentarz */}
          <Paper p="md" radius="xl" withBorder>
            <Stack gap="sm">
              <Text fw={600} size="sm">
                Dodaj komentarz lub poprawkę
              </Text>
              <Textarea
                placeholder="Co myślisz o tym pomyśle? Możesz zaproponować zmiany..."
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
                minRows={3}
                radius="md"
                autosize
              />
              <Button
                color="red"
                radius="xl"
                disabled={!newComment.trim()}
                onClick={handleAddComment}
                leftSection={<MessageCircle size={16} />}
              >
                Opublikuj komentarz
              </Button>
            </Stack>
          </Paper>

          {/* Lista komentarzy */}
          <Group justify="space-between">
            <Text fw={700} size="md">
              Komentarze ({comments.length})
            </Text>
            <Text size="xs" c="dimmed">
              Sortuj: Najnowsze
            </Text>
          </Group>

          <Stack gap="sm">
            {comments.map((comment) => (
              <Paper key={comment.id} p="md" radius="xl" withBorder>
                <Stack gap="sm">
                  <Group justify="space-between" align="flex-start">
                    <Group gap="xs">
                      <Avatar
                        color={comment.color as any}
                        radius="xl"
                        size="md"
                      >
                        {comment.avatar}
                      </Avatar>
                      <div>
                        <Group gap={4}>
                          <Text size="sm" fw={700}>
                            {comment.author}
                          </Text>
                          {comment.verified && (
                            <CheckCircle size={12} color="#2f9e44" />
                          )}
                        </Group>
                        <Text size="xs" c="dimmed">
                          {comment.time}
                        </Text>
                      </div>
                    </Group>
                    <Group gap={4}>
                      {comment.isPropozycja && (
                        <Badge color="blue" variant="light" size="xs">
                          Poprawka
                        </Badge>
                      )}
                      <ActionIcon variant="subtle" color="gray" size="sm">
                        <Flag size={12} />
                      </ActionIcon>
                    </Group>
                  </Group>

                  <Text size="sm" lh={1.6} c="#2d3436">
                    {comment.text}
                  </Text>

                  <Group gap="xs">
                    <Button
                      variant={comment.liked ? "light" : "subtle"}
                      color={comment.liked ? "red" : "gray"}
                      size="xs"
                      radius="xl"
                      leftSection={<ChevronUp size={14} />}
                      onClick={() => handleLike(comment.id)}
                    >
                      {comment.likes}
                    </Button>
                    <Button
                      variant="subtle"
                      color="gray"
                      size="xs"
                      radius="xl"
                      leftSection={<MessageCircle size={14} />}
                    >
                      Odpowiedz
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Container>
    </MobileLayout>
  );
}
