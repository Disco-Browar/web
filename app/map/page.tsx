// app/map/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Container, Title, Group, Button, Text, Loader } from "@mantine/core";
import { MapPinIcon, FilterIcon } from "lucide-react"; // lub twoje ikony
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileLayout from "@/components/MobileLayout";

// Dynamic import – bardzo ważne! Leaflet nie lubi SSR
const MapComponent = dynamic(
  () => import("../../components/MapComponent"), // stworzymy poniżej
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "calc(100dvh - 180px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="xl" />
      </div>
    ),
  },
);

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  useEffect(() => {
    // Geolocation użytkownika (opcjonalnie)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          // fallback na Warszawę
          setUserLocation([52.23, 21.01]);
        },
      );
    }
  }, []);

  return (
    <ProtectedRoute>
      <MobileLayout>
        <Container size="xl" py="md" style={{ paddingBottom: "100px" }}>
          <Group justify="space-between" mb="xl">
            <div>
              <Title order={2}>Mapa problemów i pomysłów</Title>
              <Text c="dimmed">Zobacz co dzieje się w Twojej okolicy</Text>
            </div>
            <Button leftSection={<FilterIcon size={18} />} variant="light">
              Filtry
            </Button>
          </Group>

          <div
            style={{
              height: "calc(100dvh - 180px)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <MapComponent center={userLocation || [52.23, 21.01]} zoom={10} />
          </div>

          {/* Legenda lub szybkie filtry na dole mapy */}
          <Group mt="md" justify="center">
            <Text size="sm" c="dimmed">
              ● Problemy lokalne &nbsp;&nbsp; ▲ Pomysły systemowe
            </Text>
          </Group>
        </Container>
      </MobileLayout>
    </ProtectedRoute>
  );
}
