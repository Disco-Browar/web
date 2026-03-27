// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps, // ← dodajemy to
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";

const govTheme = createTheme({
  primaryColor: "red",
  colors: {
    red: [
      "#fff5f5",
      "#ffe3e3",
      "#ffc9c9",
      "#ffa8a8",
      "#ff8787",
      "#ff6b6b",
      "#fa5252",
      "#f03e3e",
      "#e03131",
      "#dc143c",
    ],
  },
  fontFamily: "Inter, system-ui, sans-serif",
  headings: { fontFamily: "Inter, system-ui, sans-serif" },
  defaultRadius: "md",
  shadows: { md: "0 4px 12px rgba(0, 0, 0, 0.1)" },
});

export const metadata: Metadata = {
  title: "Twój Głos",
  description: "Twój głos do polskiego rządu",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#dc143c" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <MantineProvider theme={govTheme} defaultColorScheme="light">
          <Notifications position="top-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
