// app/dashboard/page.tsx
"use client";

import { Container, Grid, Text, Stack } from "@mantine/core";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileLayout from "@/components/MobileLayout";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatusCards from "@/components/dashboard/StatusCards";
import RecommendedPetition from "@/components/dashboard/RecommendedPetition";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <MobileLayout>
        <Container size="xl" py="xl">
          <DashboardHeader name="Jan Kowalski" />

          <StatusCards />

          <Text fw={700} size="xl" mb="lg">
            Rekomendowane dla Ciebie
          </Text>

          <Stack gap="xl">
            <RecommendedPetition
              title="Rewitalizacja Parku Skaryszewskiego - Etap II"
              description="Dodanie ścieżek edukacyjnych i nowoczesnego oświetlenia LED."
              signatures={8.4}
              progress={84}
              target="Rada Miasta"
              isHighMatch={true}
            />

            <RecommendedPetition
              title="Zwiększenie liczby kursów linii 523 w godzinach szczytu"
              description="Mieszkańcy Bemowa postulują o częstsze kursy między 7:00 a 9:00."
              signatures={1.2}
              progress={24}
              target="ZTM Warszawa"
            />
          </Stack>
        </Container>
      </MobileLayout>
    </ProtectedRoute>
  );
}
