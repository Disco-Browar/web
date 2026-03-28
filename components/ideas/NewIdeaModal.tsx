"use client";

import {
  Modal,
  Stepper,
  Textarea,
  Badge,
  Group,
  Stack,
  Paper,
  Select,
  TextInput,
  Divider,
  ActionIcon,
  Button,
  Text,
  Title,
  Alert,
  Loader,
  Center,
} from "@mantine/core";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  CheckCircle,
  Building2,
  FileText,
  Users,
  MapPin,
} from "lucide-react";
import { useState, useRef } from "react";
import { useAppStore } from "@/lib/store";

const AI_BASE = "http://127.0.0.1:8080";
const API_BASE = "http://localhost:4000";

const CATEGORIES = [
  "transport",
  "edukacja",
  "ekologia",
  "zdrowie",
  "infrastruktura",
  "bezpieczenstwo",
];

const REGIONS = [
  "mazowieckie",
  "malopolskie",
  "slaskie",
  "wielkopolskie",
  "dolnoslaskie",
  "pomorskie",
  "lodzkie",
  "kujawsko-pomorskie",
];

type Message = { role: "user" | "assistant"; text: string };

interface Props {
  opened: boolean;
  onClose: () => void;
  onPublished: () => void;
}

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useState(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      i++;
    }, 12);
    return () => clearInterval(iv);
  });

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse">▍</span>}
    </span>
  );
}

export default function NewIdeaModal({ opened, onClose, onPublished }: Props) {
  const { user, token } = useAppStore();

  const [active, setActive] = useState(0);

  // Step 0 – chat z AI
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const threadId = useRef(String(Math.floor(Math.random() * 1_000_000)));
  const scrollRef = useRef<HTMLDivElement>(null);

  // Step 1 – redakcja
  const [title, setTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [category, setCategory] = useState("transport");
  const [region, setRegion] = useState(user?.region || "mazowieckie");
  const [suggestedOffice, setSuggestedOffice] = useState(
    "Urząd Miejski / Ministerstwo Infrastruktury",
  );

  // Step 2 – publikacja
  const [publishing, setPublishing] = useState(false);
  const [publishedId, setPublishedId] = useState<number | null>(null);
  const [publishError, setPublishError] = useState("");

  const sendMessage = async (text: string) => {
    if (!text.trim() || isSending) return;
    const userMsg: Message = { role: "user", text };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const body: any = {
        message: text,
        thread_id: threadId.current,
        user_name: user?.name ?? "Obywatel",
        user_contact: user?.pesel ?? "",
        latitude: 53.1235,
        longitude: 18.0084,
      };

      const res = await fetch(`${AI_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const reply = data.response ?? data.message ?? JSON.stringify(data);
      setMessages((p) => [...p, { role: "assistant", text: reply }]);

      // Auto-wypełnij draft na podstawie odpowiedzi AI
      if (!draftContent && reply.length > 80) {
        setDraftContent(reply);
        if (!title)
          setTitle(
            `Wniosek: ${text.substring(0, 60)}${text.length > 60 ? "..." : ""}`,
          );
      }
    } catch {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          text: "Przepraszam, wystąpił błąd połączenia z AI.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const startVoice = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Przeglądarka nie obsługuje mikrofonu.");
      return;
    }
    const r = new SR();
    r.lang = "pl-PL";
    r.onstart = () => setIsListening(true);
    r.onend = () => setIsListening(false);
    r.onresult = (e: any) => setInput(e.results[0][0].transcript);
    r.start();
  };

  const publishPost = async () => {
    setPublishing(true);
    setPublishError("");
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content: draftContent,
          aiSummary: draftContent.substring(0, 150),
          category,
          region,
        }),
      });
      if (!res.ok) throw new Error("Błąd publikacji");
      const post = await res.json();
      setPublishedId(post.id);
      setActive(2);
      onPublished();
    } catch (e: any) {
      setPublishError(e.message);
    } finally {
      setPublishing(false);
    }
  };

  const handleClose = () => {
    setActive(0);
    setMessages([]);
    setInput("");
    setTitle("");
    setDraftContent("");
    setPublishedId(null);
    setPublishError("");
    threadId.current = String(Math.floor(Math.random() * 1_000_000));
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="xs">
          <Bot size={22} color="#dc143c" />
          <Text fw={700} size="lg">
            Nowy Pomysł
          </Text>
        </Group>
      }
      size="lg"
      radius="xl"
      padding="md"
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
      }}
      centered
      styles={{
        root: { zIndex: 9999 },
        overlay: { zIndex: 9998 },
        inner: { zIndex: 9999 }, // ← to jest kluczowe, inner wrapper modala
        content: {
          zIndex: 9999,
          height: "90dvh",
          display: "flex",
          flexDirection: "column",
          margin: "5dvh 12px 0",
        },
        body: {
          padding: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        },
        header: {
          borderRadius: "16px 16px 0 0",
          padding: "16px 20px",
        },
      }}
    >
      <Stack gap={0} style={{ height: "calc(100dvh - 60px)" }}>
        {/* Stepper */}
        <div
          style={{ padding: "12px 20px", borderBottom: "1px solid #e9ecef" }}
        >
          <Stepper active={active} size="xs" color="red">
            <Stepper.Step label="Opisz problem" icon={<Bot size={14} />} />
            <Stepper.Step
              label="Redaguj wniosek"
              icon={<FileText size={14} />}
            />
            <Stepper.Step
              label="Opublikowano"
              icon={<CheckCircle size={14} />}
            />
          </Stepper>
        </div>

        {/* ===== STEP 0: Chat z AI ===== */}
        {active === 0 && (
          <Stack gap={0} style={{ flex: 1, minHeight: 0 }}>
            {/* Sugerowany urząd */}
            <Paper mx="md" mt="md" p="sm" radius="md" withBorder>
              <Group gap="xs">
                <Building2 size={18} color="#dc143c" />
                <div>
                  <Text size="xs" c="dimmed">
                    Sugerowany odbiorca
                  </Text>
                  <Text size="sm" fw={600}>
                    {suggestedOffice}
                  </Text>
                </div>
              </Group>
            </Paper>

            {/* Wiadomości */}
            <div
              ref={scrollRef}
              style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}
            >
              {messages.length === 0 && (
                <Center style={{ height: "100%" }}>
                  <Stack align="center" gap="xs">
                    <Bot size={40} color="#dc143c" opacity={0.3} />
                    <Text c="dimmed" size="sm" ta="center">
                      Opisz swój problem własnymi słowami.
                      <br />
                      AI pomoże Ci złożyć profesjonalny wniosek.
                    </Text>
                    {/* Sugestie */}
                    <Stack gap="xs" mt="sm" style={{ width: "100%" }}>
                      {[
                        "Dziury w drodze na mojej ulicy",
                        "Brak chodnika przy szkole",
                        "Zanieczyszczenie powietrza w mojej gminie",
                      ].map((s) => (
                        <Paper
                          key={s}
                          p="xs"
                          radius="xl"
                          withBorder
                          style={{ cursor: "pointer", textAlign: "center" }}
                          onClick={() => {
                            setInput(s);
                          }}
                        >
                          <Text size="xs">{s}</Text>
                        </Paper>
                      ))}
                    </Stack>
                  </Stack>
                </Center>
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
                        maxWidth: "82%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        backgroundColor:
                          msg.role === "user" ? "#dc143c" : "#f1f3f5",
                        color: msg.role === "user" ? "white" : "#1a1a2e",
                        fontSize: 13,
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.role === "assistant" && i === messages.length - 1 ? (
                        <TypingText key={msg.text} text={msg.text} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        padding: "10px 16px",
                        borderRadius: "18px 18px 18px 4px",
                        backgroundColor: "#f1f3f5",
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
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
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid #e9ecef",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <ActionIcon
                onClick={startVoice}
                variant={isListening ? "filled" : "light"}
                color={isListening ? "red" : "gray"}
                size={42}
                radius="xl"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </ActionIcon>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Opisz swój problem..."
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
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
                <Send size={18} />
              </ActionIcon>
            </div>

            {/* Dalej button */}
            {messages.length >= 2 && (
              <div style={{ padding: "0 16px 16px" }}>
                <Button
                  fullWidth
                  radius="xl"
                  color="red"
                  size="md"
                  onClick={() => setActive(1)}
                  rightSection={<FileText size={16} />}
                >
                  Redaguj wniosek →
                </Button>
              </div>
            )}
          </Stack>
        )}

        {/* ===== STEP 1: Redakcja ===== */}
        {active === 1 && (
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            <Stack gap="md">
              <Alert color="blue" radius="md" icon={<Bot size={16} />}>
                AI przygotowało draft na podstawie Twojej rozmowy. Możesz go
                edytować.
              </Alert>

              <TextInput
                label="Tytuł wniosku"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                radius="md"
                size="md"
                placeholder="Krótki, opisowy tytuł"
              />

              <Select
                label="Kategoria"
                data={CATEGORIES}
                value={category}
                onChange={(v) => v && setCategory(v)}
                radius="md"
                size="md"
              />

              <Select
                label="Województwo"
                data={REGIONS}
                value={region}
                onChange={(v) => v && setRegion(v)}
                radius="md"
                size="md"
              />

              <Paper p="md" radius="md" withBorder>
                <Group gap="xs" mb="xs">
                  <Building2 size={16} color="#dc143c" />
                  <Text size="sm" fw={600}>
                    Sugerowany odbiorca
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {suggestedOffice}
                </Text>
              </Paper>

              <Textarea
                label="Treść wniosku"
                value={draftContent}
                onChange={(e) => setDraftContent(e.currentTarget.value)}
                minRows={8}
                autosize
                radius="md"
                placeholder="Treść Twojego wniosku..."
              />

              {/* Podobne wnioski */}
              <Paper p="md" radius="md" withBorder>
                <Group gap="xs" mb="sm">
                  <Users size={16} color="#dc143c" />
                  <Text size="sm" fw={600}>
                    Podobne zgłoszenia
                  </Text>
                </Group>
                <Stack gap="xs">
                  {["Naprawa drogi – Małopolskie", "Dziury ul. Krakowska"].map(
                    (t) => (
                      <Badge key={t} variant="light" color="gray" size="sm">
                        {t}
                      </Badge>
                    ),
                  )}
                </Stack>
              </Paper>

              {publishError && (
                <Alert color="red" radius="md">
                  {publishError}
                </Alert>
              )}

              <Group grow>
                <Button
                  variant="light"
                  radius="xl"
                  onClick={() => setActive(0)}
                >
                  ← Wróć
                </Button>
                <Button
                  color="red"
                  radius="xl"
                  loading={publishing}
                  disabled={!title.trim() || !draftContent.trim()}
                  onClick={publishPost}
                >
                  Opublikuj 🚀
                </Button>
              </Group>
            </Stack>
          </div>
        )}

        {/* ===== STEP 2: Sukces ===== */}
        {active === 2 && (
          <Center style={{ flex: 1 }}>
            <Stack align="center" gap="lg" p="xl">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#e6f7ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={42} color="#2ecc71" />
              </div>
              <Title order={2} ta="center">
                Petycja opublikowana!
              </Title>
              <Text c="dimmed" ta="center" size="sm">
                Twój wniosek jest już widoczny dla innych obywateli. Gdy zbierze
                wystarczającą liczbę głosów, trafi do odpowiednich urzędów.
              </Text>
              <Paper p="md" radius="md" withBorder style={{ width: "100%" }}>
                <Group gap="xs">
                  <Users size={18} color="#dc143c" />
                  <Text size="sm">
                    Potrzeba <b>10 głosów</b> aby wniosek trafił do urzędu
                  </Text>
                </Group>
              </Paper>
              <Button fullWidth color="red" radius="xl" onClick={handleClose}>
                Gotowe ✓
              </Button>
            </Stack>
          </Center>
        )}
      </Stack>
    </Modal>
  );
}
