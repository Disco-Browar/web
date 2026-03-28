"use client";

import MobileLayout from "@/components/MobileLayout";
import {
  Container,
  Title,
  Text,
  Select,
  SimpleGrid,
  Button,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { Filter, Search, Plus } from "lucide-react";
import PetitionCard from "@/components/ideas/PetitionCard";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

const API_BASE = "http://localhost:4000";

const CATEGORY_MAP: Record<string, string> = {
  transport: "TRANSPORT",
  edukacja: "EDUKACJA",
  ekologia: "EKOLOGIA",
  zdrowie: "ZDROWIE",
  infrastruktura: "INFRASTRUKTURA",
  technologia: "CYFRYZACJA",
  bezpieczenstwo: "INFRASTRUKTURA",
};

type Post = {
  id: number;
  title: string;
  content: string;
  aiSummary: string | null;
  category: string;
  region: string;
  createdAt: string;
  userId: number;
  user: { id: number; name: string };
  _count: { votes: number };
};

export default function IdeasPage() {
  const { token } = useAppStore();
  const [region, setRegion] = useState("Cała Polska");
  const [categoryFilter, setCategoryFilter] = useState("Wszystkie kategorie");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/posts`);
      if (!res.ok) throw new Error("Błąd pobierania postów");
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Błąd połączenia z serwerem");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = async (postId: number, value: 1 | -1) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/posts/${postId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });
      fetchPosts(); // odśwież po głosowaniu
    } catch (err) {
      console.error("Błąd głosowania", err);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchRegion =
      region === "Cała Polska" ||
      post.region.toLowerCase() === region.toLowerCase();
    const mappedCategory =
      CATEGORY_MAP[post.category] ?? post.category.toUpperCase();
    const matchCategory =
      categoryFilter === "Wszystkie kategorie" ||
      mappedCategory === categoryFilter;
    return matchRegion && matchCategory;
  });


  const newIdea(){
    return 1
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Container size="md" className="px-4 pt-2">
          <Title order={1} className="text-2xl font-bold text-gray-900 mb-1">
            Petycje Społeczne
          </Title>
          <Text c="dimmed" size="sm" className="mb-8 leading-relaxed">
            Przeglądaj, wspieraj i współtwórz inicjatywy obywatelskie.
            <br />
            Twój głos kształtuje przyszłość Rzeczypospolitej.
          </Text>

          

          {/* Filtry */}
          <div className="flex flex-col gap-3 mb-8 mt-4">

            <Button
              radius="md"
              onClick={newIdea}
              leftSection={<Plus size={22} />}
            >
              Nowy Pomysł
            </Button>

            <Select
              value={region}
              onChange={(val) => setRegion(val || "Cała Polska")}
              data={[
                "Cała Polska",
                "mazowieckie",
                "malopolskie",
                "slaskie",
                "wielkopolskie",
              ]}
              leftSection={<Filter size={18} />}
              size="md"
            />
            <Select
              value={categoryFilter}
              onChange={(val) =>
                setCategoryFilter(val || "Wszystkie kategorie")
              }
              data={[
                "Wszystkie kategorie",
                "EKOLOGIA",
                "TRANSPORT",
                "EDUKACJA",
                "ZDROWIE",
                "INFRASTRUKTURA",
                "CYFRYZACJA",
              ]}
              size="md"
            />
            <Button
              radius="md"
              onClick={fetchPosts}
              leftSection={<Search size={22} />}
            >
              Szukaj
            </Button>

          </div>

          {/* Stany */}
          {loading && (
            <Center py="xl">
              <Loader color="red" />
            </Center>
          )}

          {error && (
            <Alert color="red" mb="md" radius="md">
              {error}
            </Alert>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <Center py="xl">
              <Text c="dimmed">Brak petycji spełniających kryteria.</Text>
            </Center>
          )}

          {/* Lista postów */}
          {!loading && (
            <SimpleGrid cols={1} spacing="lg">
              {filteredPosts.map((post) => (
                <PetitionCard
                  key={post.id}
                  category={
                    (CATEGORY_MAP[post.category] ??
                      post.category.toUpperCase()) as any
                  }
                  title={post.title}
                  description={post.aiSummary || post.content}
                  author={post.user?.name ?? "Anonimowy"}
                  authorVerified={true}
                  progress={Math.min(100, (post._count.votes / 10) * 100)}
                  signaturesNeeded={10}
                  onSupport={() => handleVote(post.id, 1)}
                  onDislike={() => handleVote(post.id, -1)}
                  onComment={() => console.log("Poprawka:", post.title)}
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </div>
    </MobileLayout>
  );
}
