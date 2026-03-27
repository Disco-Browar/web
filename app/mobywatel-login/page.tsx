// app/mobywatel-login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Center,
  Loader,
  Alert,
} from "@mantine/core";
import { ArrowLeftIcon } from "lucide-react";
import { useAppStore } from "@/lib/store";

const API_BASE = "http://localhost:4000";

export default function MobywatelLoginPage() {
  const router = useRouter();
  const { setAuth } = useAppStore();

  const [pesel, setPesel] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (pesel.length !== 11) {
      setError("PESEL musi mieć dokładnie 11 cyfr");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Najpierw próbujemy normalnego logowania
      let res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pesel, password }),
      });

      // Jeśli login się udał → super
      if (res.ok) {
        const data = await res.json();
        setAuth(data.token, data.user);
        setTimeout(() => router.replace("/onboarding"), 800);
        return;
      }

      // 2. Jeśli nie udało się (401 lub user nie istnieje) → rejestrujemy automatycznie
      const demoName = `Użytkownik ${pesel.slice(-4)}`;

      const registerPayload = {
        pesel,
        name: demoName,
        password: password || "123456", // fallback na demo
        region: "mazowieckie",
        interests: "transport,edukacja,środowisko", // backend przyjmuje string
      };

      res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Nie udało się zarejestrować");
      }

      const data = await res.json();
      setAuth(data.token, data.user);

      // Lekki delay dla lepszego efektu
      setTimeout(() => {
        router.replace("/onboarding");
      }, 900);
    } catch (err: any) {
      setError(err.message || "Błąd połączenia z serwerem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        background: "linear-gradient(180deg, #f0f4f8 0%, #e6edf5 100%)",
        minHeight: "100dvh",
      }}
    >
      {/* Czerwony pasek mObywatel */}
      <Box
        style={{
          backgroundColor: "#E30613",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "white",
        }}
      >
        <Button
          variant="subtle"
          color="white"
          onClick={() => router.back()}
          leftSection={<ArrowLeftIcon size={20} />}
          style={{ color: "white" }}
        >
          Cofnij
        </Button>

        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/mobywatel.png" alt="mObywatel" style={{ height: 36 }} />
          <Text fw={700} size="lg">
            mObywatel
          </Text>
        </Box>
      </Box>

      <Container size="xs" pt={40}>
        <Title order={1} ta="center" mb={6}>
          Dzień dobry!
        </Title>
        <Text ta="center" size="lg" c="dimmed" mb={40}>
          Zaloguj się do aplikacji.
        </Text>

        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          style={{ backgroundColor: "white" }}
        >
          <TextInput
            label="PESEL"
            placeholder="12345678901"
            value={pesel}
            onChange={(e) =>
              setPesel(e.currentTarget.value.replace(/\D/g, "").slice(0, 11))
            }
            size="lg"
            mb="md"
          />

          <PasswordInput
            label="Hasło"
            placeholder="Wpisz hasło"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            size="lg"
            mb="xl"
          />

          {error && (
            <Alert color="red" mb="md" radius="md">
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            size="lg"
            color="red"
            onClick={handleLogin}
            loading={loading}
            loaderProps={{ type: "dots" }}
            style={{ height: 56, fontSize: "17px", fontWeight: 600 }}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </Button>

          <Center mt="lg">
            <Text size="sm" c="#0066cc" style={{ cursor: "pointer" }}>
              Nie pamiętasz hasła?
            </Text>
          </Center>
        </Paper>

        <Text ta="center" size="xs" c="dimmed" mt={30}>
          Tryb demo • automatyczna rejestracja jeśli użytkownika nie ma
        </Text>
      </Container>
    </Box>
  );
}
