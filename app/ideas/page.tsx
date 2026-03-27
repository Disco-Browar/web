"use client";

import MobileLayout from "@/components/MobileLayout";
import { Container, Title, Text, Select, SimpleGrid, Button } from "@mantine/core";
import { Filter, Search } from 'lucide-react';
import PetitionCard from "@/components/ideas/PetitionCard";
import { useState } from "react";

const mockPetitions = [
  {
    id: "1",
    category: "EKOLOGIA" as const,
    title: "Zalesienie nieużytków w gminach podmiejskich",
    description: "Proponujemy automatyczne przekwalifikowanie gruntów IV-VI klasy nieużytkowanych od 10 lat na...",
    author: "Aneta Kowalska",
    authorVerified: true,
    progress: 82,
    signaturesNeeded: 1800,
  },
  {
    id: "2",
    category: "TRANSPORT" as const,
    title: "Budowa ścieżki rowerowej wzdłuż drogi wojewódzkiej 721",
    description: "AI wyliczyło, że ta inwestycja skróci czas dojazdu do pracy dla 12,000 mieszkańców o średnio 15 minut...",
    author: "Marek Wiśniewski",
    authorVerified: true,
    progress: 45,
    signaturesNeeded: 5500,
  },
  {
    id: "3",
    category: "EDUKACJA" as const,
    title: "Wprowadzenie lekcji z zakresu kompetencji cyfrowych AI",
    description: "Inicjatywa ma na celu przygotowanie uczniów szkół średnich do efektywnej i bezpiecznej współpracy z systemami...",
    author: "Piotr Zieliński",
    authorVerified: true,
    progress: 95,
    signaturesNeeded: 500,
  },
  {
    id: "4",
    category: "ZDROWIE" as const,
    title: "Program profilaktyki zdrowia psychicznego dla młodzieży",
    description: "Wprowadzenie ogólnopolskiego systemu wsparcia psychologicznego dostępnego bez skierowania dla os...",
    author: "dr Maria Nowak",
    authorVerified: true,
    progress: 22,
    signaturesNeeded: 7800,
  },
  {
    id: "5",
    category: "INFRASTRUKTURA" as const,
    title: 'Rewitalizacja parku miejskiego "Ostoja" w Tarnowie',
    description: "Projekt zakłada budowę nowoczesnego placu zabaw, tężni solankowej oraz strefy co-working...",
    author: "Janusz Piekarski",
    authorVerified: true,
    progress: 58,
    signaturesNeeded: 4200,
  },
  {
    id: "6",
    category: "CYFRYZACJA" as const,
    title: "Wprowadzenie ogólnopolskiego portfela cyfrowych tożsamości",
    description: "Umożliwienie obywatelom pełnej kontroli nad swoimi danymi osobowymi przy użyciu technologii...",
    author: "Katarzyna Nowak",
    authorVerified: true,
    progress: 38,
    signaturesNeeded: 1200,
  },
];

export default function IdeasPage() {
  const [region, setRegion] = useState("Cała Polska");
  const [categoryFilter, setCategoryFilter] = useState("Wszystkie kategorie");

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Container size="md" className="px-4 pt-2">
          {/* Nagłówek */}
          <Title order={1} className="text-2xl font-bold text-gray-900 mb-1">
            Petycje Społeczne
          </Title>
          <Text c="dimmed" size="sm" className="mb-8 leading-relaxed">
            Przeglądaj, wspieraj i współtwórz inicjatywy obywatelskie.<br />
            Twój głos kształtuje przyszłość Rzeczypospolitej.
          </Text>

          {/* Filtry */}
          <div className="flex flex-col gap-3 mb-8 mt-4">
            <Select
              value={region}
              onChange={(val) => setRegion(val || "Cała Polska")}
              data={[
                "Cała Polska",
                "Mazowieckie",
                "Małopolskie",
                "Śląskie",
                "Wielkopolskie",
              ]}
              leftSection={<Filter size={18} />}
              className="flex-1"
              size="md"
            />

            <Select
              value={categoryFilter}
              onChange={(val) => setCategoryFilter(val || "Wszystkie kategorie")}
              data={[
                "Wszystkie kategorie",
                "EKOLOGIA",
                "TRANSPORT",
                "EDUKACJA",
                "ZDROWIE",
                "INFRASTRUKTURA",
                "CYFRYZACJA",
              ]}
              className="flex-1"
              size="md"
            />

            <Button radius="md" className="bg-blue-500">
              <Search size={22} />
              Szukaj
            </Button>
          </div>

          {/* Lista petycji */}
          <SimpleGrid cols={1} spacing="lg">
            {mockPetitions.map((petition) => (
              <PetitionCard
                key={petition.id}
                category={petition.category}
                title={petition.title}
                description={petition.description}
                author={petition.author}
                authorVerified={petition.authorVerified}
                progress={petition.progress}
                signaturesNeeded={petition.signaturesNeeded}
                onSupport={() => console.log("Popieram:", petition.title)}
                onDislike={() => console.log("Odrzucam:", petition.title)}
                onComment={() => console.log("Poprawka:", petition.title)}
              />
            ))}
          </SimpleGrid>
        </Container>
      </div>
    </MobileLayout>
  );
}