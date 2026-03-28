"use client";

import {
  Title,
  Text,
  Card,
  Button,
  Stack,
  Container,
  TextInput,
  ActionIcon,
  Alert,
  ScrollArea,
  Loader,
  Badge,
} from "@mantine/core";
import {
  MicIcon,
  MicOffIcon,
  SendIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileLayout from "@/components/MobileLayout";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import TypingMessage from "@/components/TypingMessage";

const AI_BASE = "http://127.0.0.1:8080";

type Message = {
  role: "user" | "assistant";
  text: string;
};

function generateThreadId() {
  return String(Math.floor(Math.random() * 1_000_000));
}

export default function NowyWniosekPage() {
  const { user } = useAppStore();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState("");
  const [publishedPostId, setPublishedPostId] = useState<number | null>(null);

  const threadId = useRef(generateThreadId());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pobierz lokalizację przy wejściu na stronę
  useEffect(() => {
    console.log("useEffect odpala się");
    console.log("navigator.geolocation:", navigator.geolocation);

    if (!navigator.geolocation) {
      setLocation({ lat: 53.1235, lng: 18.0084 }); // Bydgoszcz
      // setLocation({ lat: 73.45894735069872, lng: 127.04658508300783 });
      return;
    }

    console.log("Wywołuję getCurrentPosition...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Sukces:", pos.coords);
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.log("Błąd geolocation:", err.code, err.message);
        setLocationError("Brak dostępu do lokalizacji.");
      },
      { timeout: 10000, enableHighAccuracy: false },
    );
  }, []);

  // Auto-scroll do dołu
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isSending]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isSending) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);
    setError("");

    try {
      const body: Record<string, any> = {
        message: text,
        thread_id: threadId.current,
        user_name: user?.name ?? "Obywatel",
        user_contact: user?.pesel ?? "",
      };

      if (location) {
        body.latitude = location.lat;
        body.longitude = location.lng;
      }

      const res = await fetch(`${AI_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);

      const data = await res.json();
      const replyText = data.response ?? data.message ?? JSON.stringify(data);

      setMessages((prev) => [...prev, { role: "assistant", text: replyText }]);
    } catch (err: any) {
      setError(err.message || "Błąd połączenia z AI");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const startVoiceInput = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
      return;
    }
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "pl-PL";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setInput(text);
    };
    recognition.start();
  };

  const startNewConversation = () => {
    threadId.current = generateThreadId();
    setMessages([]);
    setPublishedPostId(null);
    setError("");
  };

  return (
    <ProtectedRoute>
      <MobileLayout>
        <Container
          size="sm"
          py="md"
          style={{ height: "100dvh", display: "flex", flexDirection: "column" }}
        >
          {/* Nagłówek */}
          <Stack gap={4} mb="md">
            <Title order={2} fw={900}>
              Asystent obywatelski
            </Title>
            <Text size="sm" c="dimmed">
              Opisz swój problem — AI pomoże złożyć wniosek.
            </Text>

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {location ? (
                <Badge
                  color="green"
                  variant="light"
                  leftSection={<MapPinIcon size={12} />}
                >
                  Lokalizacja aktywna
                </Badge>
              ) : (
                <Badge
                  color="gray"
                  variant="light"
                  leftSection={<MapPinIcon size={12} />}
                >
                  {locationError || "Pobieranie lokalizacji..."}
                </Badge>
              )}
              <Badge color="blue" variant="light">
                Wątek #{threadId.current}
              </Badge>
              <Text
                size="xs"
                c="dimmed"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={startNewConversation}
              >
                Nowa rozmowa
              </Text>
            </div>
          </Stack>

          {/* Okno czatu */}
          <Card
            withBorder
            radius="lg"
            p={0}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <ScrollArea flex={1} p="md" viewportRef={scrollRef}>
              {messages.length === 0 && (
                <Text c="dimmed" ta="center" size="sm" mt="xl">
                  Przywitaj się i opisz swój problem 👋
                </Text>
              )}

              <Stack gap="sm">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        backgroundColor:
                          msg.role === "user" ? "#dc143c" : "#f1f3f5",
                        color: msg.role === "user" ? "white" : "#1a1a2e",
                        fontSize: 14,
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.role === "assistant" && i === messages.length - 1 ? (
                        <TypingMessage text={msg.text} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "10px 16px",
                        borderRadius: "18px 18px 18px 4px",
                        backgroundColor: "#f1f3f5",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Loader size="xs" color="gray" />
                      <Text size="xs" c="dimmed">
                        AI pisze...
                      </Text>
                    </div>
                  </div>
                )}
              </Stack>
            </ScrollArea>

            {/* Błąd */}
            {error && (
              <Alert
                color="red"
                mx="md"
                mb="sm"
                radius="md"
                onClose={() => setError("")}
                withCloseButton
              >
                {error}
              </Alert>
            )}

            {/* Sukces publikacji */}
            {publishedPostId && (
              <Alert
                icon={<CheckCircleIcon size={18} />}
                color="green"
                mx="md"
                mb="sm"
                radius="md"
                title="Petycja opublikowana!"
              >
                <Button
                  variant="subtle"
                  color="green"
                  size="xs"
                  onClick={() => router.push(`/posts/${publishedPostId}`)}
                >
                  Zobacz petycję →
                </Button>
              </Alert>
            )}

            {/* Input */}
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid #e9ecef",
                display: "flex",
                gap: 8,
                alignItems: "flex-end",
              }}
            >
              <ActionIcon
                onClick={startVoiceInput}
                variant={isListening ? "filled" : "light"}
                color={isListening ? "red" : "gray"}
                size={42}
                radius="xl"
              >
                {isListening ? <MicOffIcon size={20} /> : <MicIcon size={20} />}
              </ActionIcon>

              <TextInput
                style={{ flex: 1 }}
                placeholder="Napisz wiadomość..."
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                radius="xl"
                size="md"
                disabled={isSending}
              />

              <ActionIcon
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isSending}
                variant="filled"
                color="red"
                size={42}
                radius="xl"
              >
                <SendIcon size={20} />
              </ActionIcon>
            </div>
          </Card>
        </Container>
      </MobileLayout>
    </ProtectedRoute>
  );
}
