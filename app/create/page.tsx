// app/nowy-pomysl/page.tsx
"use client";

import {
  Title,
  Text,
  Card,
  Button,
  Group,
  Stack,
  Container,
  Textarea,
  Badge,
  Grid,
  Divider,
  Avatar,
  ActionIcon,
} from "@mantine/core";
import {
  MicIcon,
  MicOffIcon,
  SendIcon,
  MapIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileLayout from "@/components/MobileLayout";

export default function NowyWniosekPage() {
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState(false);
  const [draftText, setDraftText] = useState("");

  // Funkcja rozpoznawania mowy
  const startVoiceInput = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "pl-PL";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setUserInput(text); // Wypełniamy pole tekstowe
      generateDraft(text); // Generujemy wniosek
    };

    recognition.start();
  };

  // Generowanie szkicu wniosku (symulacja)
  const generateDraft = (text: string) => {
    if (!text.trim()) return;

    setTimeout(() => {
      setDraftText(
        `Niniejszym składam formalny wniosek o pilną interwencję w sprawie ${text.toLowerCase()}. ` +
          `Problem dotyczy istotnego zagrożenia dla bezpieczeństwa uczestników ruchu drogowego. ` +
          `Proszę o niezwłoczną diagnostykę i podjęcie działań naprawczych.`,
      );
      setGeneratedDraft(true);
    }, 900);
  };

  // Ręczne wysłanie tekstu (przycisk "Przetwórz przez AI")
  const handleManualSubmit = () => {
    if (userInput.trim()) {
      generateDraft(userInput);
    }
  };

  return (
    <ProtectedRoute>
      <MobileLayout>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            {/* Nagłówek */}
            <div>
              <Title order={1} fw={900} size="h2">
                Twój głos ma znaczenie
              </Title>
              <Text size="lg" c="dimmed" mt="xs">
                Opisz swój problem własnymi słowami. Możesz mówić lub pisać.
              </Text>
            </div>

            <Grid gutter="xl">
              {/* Lewa kolumna - Input (głos + tekst) */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Card withBorder shadow="sm" radius="lg" p="xl">
                  <Stack gap="lg">
                    {/* Mikrofon */}
                    <div className="flex justify-center">
                      <ActionIcon
                        onClick={startVoiceInput}
                        variant="filled"
                        color="blue"
                        size={130}
                        radius="xl"
                        style={{
                          boxShadow: isListening
                            ? "0 0 0 20px rgba(0, 51, 153, 0.25)"
                            : "none",
                        }}
                      >
                        {isListening ? (
                          <MicOffIcon size={52} />
                        ) : (
                          <MicIcon size={52} />
                        )}
                      </ActionIcon>
                    </div>

                    <Text ta="center" fw={700} size="lg">
                      {isListening
                        ? "Słucham..."
                        : "Powiedz nam o swoim problemie"}
                    </Text>

                    {/* Pole do ręcznego pisania */}
                    <Textarea
                      placeholder="Opisz tutaj swój problem... (np. Dziury w drodze krajowej nr 7 w okolicach Mławy...)"
                      minRows={5}
                      value={userInput}
                      onChange={(e) => setUserInput(e.currentTarget.value)}
                      autosize
                    />

                    <Button
                      fullWidth
                      onClick={handleManualSubmit}
                      disabled={!userInput.trim()}
                      leftSection={<SendIcon size={18} />}
                    >
                      Przetwórz przez AI
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>

              {/* Prawa kolumna - Wynik AI */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Stack gap="md">
                  {/* Sugerowany urząd */}
                  <Card withBorder shadow="sm" radius="lg" p="md">
                    <Group>
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">
                        🏛️
                      </div>
                      <div>
                        <Badge color="red" variant="light" mb={4}>
                          Sugerowany odbiorca
                        </Badge>
                        <Title order={4}>Ministerstwo Infrastruktury</Title>
                        <Text size="sm" c="dimmed">
                          Generalna Dyrekcja Dróg Krajowych i Autostrad (Oddział
                          Warszawa)
                        </Text>
                      </div>
                    </Group>
                  </Card>

                  {/* Zredagowany wniosek */}
                  {generatedDraft && draftText && (
                    <Card withBorder shadow="sm" radius="lg" p="xl">
                      <Group justify="space-between" mb="md">
                        <Title order={4}>Zredagowany Wniosek</Title>
                        <Badge color="blue" variant="filled">
                          AI DRAFTED
                        </Badge>
                      </Group>

                      <Text size="sm" mb="md" ta="right" c="dimmed">
                        Warszawa, dnia {new Date().toLocaleDateString("pl-PL")}
                      </Text>

                      <Text fw={600} mb="sm">
                        Dotyczy: Zgłoszenie problemu drogowego
                      </Text>

                      <Text size="sm" lh="1.8">
                        {draftText}
                      </Text>

                      <Divider my="lg" />
                    </Card>
                  )}

                  {/* Dodatkowe informacje */}
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Card withBorder shadow="sm" radius="lg" p="md" h="100%">
                        <Group mb="xs">
                          <MapIcon size={20} />
                          <Text fw={600} size="sm">
                            Podobne sprawy
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                          12 zgłoszeń w okolicy
                        </Text>
                        <div className="h-24 bg-gray-100 rounded mt-4 flex items-center justify-center text-xs text-gray-500">
                          Mapa (w budowie)
                        </div>
                      </Card>
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <Card withBorder shadow="sm" radius="lg" p="md" h="100%">
                        <Group mb="xs">
                          <UsersIcon size={20} />
                          <Text fw={600} size="sm">
                            Zgłaszali też inni
                          </Text>
                        </Group>
                        <Group mt="md">
                          <Avatar.Group>
                            <Avatar
                              src="https://i.pravatar.cc/32"
                              radius="xl"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/32?u=2"
                              radius="xl"
                            />
                          </Avatar.Group>
                          <Text size="xs" c="dimmed">
                            +15 osób w tym tygodniu
                          </Text>
                        </Group>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Akcje na dole */}
            {generatedDraft && (
              <Group grow mt="xl">
                <Button
                  variant="light"
                  color="red"
                  size="lg"
                  radius="xl"
                  leftSection={<span>📢</span>}
                >
                  Opublikuj jako petycję
                </Button>

                <Button
                  size="lg"
                  radius="xl"
                  color="blue"
                  leftSection={<SendIcon size={20} />}
                >
                  Wyślij bezpośrednio do urzędu
                </Button>
              </Group>
            )}
          </Stack>
        </Container>
      </MobileLayout>
    </ProtectedRoute>
  );
}
