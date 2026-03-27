// components/MobileLayout.tsx
"use client";

import { AppShell, Group, Text, ActionIcon, Menu } from "@mantine/core";
import { Home, Plus, List, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";

const navItems = [
  { label: "Start", icon: Home, href: "/dashboard" },
  { label: "Nowy głos", icon: Plus, href: "/create" },
  { label: "Pomysły", icon: List, href: "/pomysly" },
  { label: "Profil", icon: User, href: "/settings" },
];

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const isLoggedIn = !!user?.isLoggedIn;

  // Tylko dla zalogowanych pokazujemy pełny layout
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  const handleSettings = () => {
    window.location.href = "/settings";
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // twarde przekierowanie
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      style={{ background: "#f8f9fa", minHeight: "100dvh" }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" align="center">
          <Group gap="xs">
            <Text fw={700} size="lg" c="red.9">
              Twój Głos
            </Text>
            <Text size="xs" c="dimmed">
              .gov.pl
            </Text>
          </Group>

          <Menu shadow="md" width={220} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <User size={24} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Zalogowany jako</Menu.Label>
              <Menu.Item>
                <Text fw={500}>{user?.name}</Text>
                <Text size="xs" c="dimmed">
                  {user?.region}
                </Text>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<Settings size={16} />}
                onClick={handleSettings}
              >
                Ustawienia profilu
              </Menu.Item>
              <Menu.Item
                leftSection={<LogOut size={16} />}
                color="red"
                onClick={handleLogout}
              >
                Wyloguj się
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Main style={{ paddingBottom: "85px" }}>
        {children}
      </AppShell.Main>

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid #e9ecef",
          padding: "8px 12px 12px",
          zIndex: 1000,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Group justify="space-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.href}
                style={{ textDecoration: "none" }}
              >
                <ActionIcon
                  variant={isActive ? "filled" : "subtle"}
                  color={isActive ? "red" : "gray"}
                  size={58}
                  radius="xl"
                >
                  <item.icon
                    size={28}
                    strokeWidth={isActive ? 2.75 : 2.25}
                    color={isActive ? "white" : undefined}
                  />
                </ActionIcon>
                <Text
                  size="xs"
                  ta="center"
                  fw={isActive ? 600 : 400}
                  c={isActive ? "red.9" : "dimmed"}
                  mt={4}
                >
                  {item.label}
                </Text>
              </Link>
            );
          })}
        </Group>
      </div>
    </AppShell>
  );
}
