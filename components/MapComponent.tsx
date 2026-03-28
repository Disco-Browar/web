"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix domyślnych ikon Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Kolorowe ikony
const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="
    width: 14px; height: 14px;
    background: ${color};
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const redIcon = createIcon("#dc143c");
const blueIcon = createIcon("#1971c2");
const greenIcon = createIcon("#2f9e44");

const BYDGOSZCZ_PINS = [
  {
    lat: 53.1235,
    lng: 18.0084,
    title: "Dziury w drodze – ul. Gdańska",
    category: "transport",
    type: "problem",
  },
  {
    lat: 53.119,
    lng: 18.015,
    title: "Brak chodnika przy SP nr 12",
    category: "infrastruktura",
    type: "problem",
  },
  {
    lat: 53.131,
    lng: 17.998,
    title: "Zanieczyszczenie Brdy – odpady",
    category: "ekologia",
    type: "problem",
  },
  {
    lat: 53.1155,
    lng: 18.022,
    title: "Nowe oświetlenie – os. Fordon",
    category: "infrastruktura",
    type: "pomysl",
  },
  {
    lat: 53.127,
    lng: 18.031,
    title: "Ścieżka rowerowa – ul. Toruńska",
    category: "transport",
    type: "pomysl",
  },
  {
    lat: 53.134,
    lng: 18.005,
    title: "Plac zabaw – Park Kazimierza",
    category: "zdrowie",
    type: "pomysl",
  },
  {
    lat: 53.1095,
    lng: 17.99,
    title: "Śmieci przy lesie komunalnym",
    category: "ekologia",
    type: "problem",
  },
  {
    lat: 53.141,
    lng: 18.018,
    title: "Brak przystanku – Białe Błota",
    category: "transport",
    type: "problem",
  },
  {
    lat: 53.122,
    lng: 17.985,
    title: "Rewitalizacja Starego Miasta",
    category: "infrastruktura",
    type: "pomysl",
  },
  {
    lat: 53.1175,
    lng: 18.04,
    title: "Dzikie wysypisko – Kapuściska",
    category: "ekologia",
    type: "problem",
  },
  {
    lat: 53.136,
    lng: 18.026,
    title: "Boisko przy LO nr 1",
    category: "edukacja",
    type: "pomysl",
  },
  {
    lat: 53.128,
    lng: 17.976,
    title: "Awaria wodociągów – Szwederowo",
    category: "infrastruktura",
    type: "problem",
  },
  {
    lat: 53.105,
    lng: 18.01,
    title: "Park kieszonkowy – Osowa Góra",
    category: "zdrowie",
    type: "pomysl",
  },
  {
    lat: 53.143,
    lng: 17.995,
    title: "Hałas przy ul. Nakielskiej",
    category: "zdrowie",
    type: "problem",
  },
  {
    lat: 53.12,
    lng: 18.055,
    title: "Monitoring skrzyżowania Fordońska",
    category: "infrastruktura",
    type: "problem",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  transport: "#1971c2",
  ekologia: "#2f9e44",
  infrastruktura: "#dc143c",
  zdrowie: "#e67700",
  edukacja: "#9c36b5",
};

interface Props {
  center: [number, number];
  zoom: number;
}

export default function MapComponent({ center, zoom }: Props) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {BYDGOSZCZ_PINS.map((pin, i) => (
        <Marker
          key={i}
          position={[pin.lat, pin.lng]}
          icon={L.divIcon({
            className: "",
            html: `<div style="
              width: ${pin.type === "pomysl" ? 16 : 14}px;
              height: ${pin.type === "pomysl" ? 16 : 14}px;
              background: ${CATEGORY_COLORS[pin.category] ?? "#888"};
              border: 2px solid white;
              border-radius: ${pin.type === "pomysl" ? "3px" : "50%"};
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          })}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: CATEGORY_COLORS[pin.category] ?? "#888",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {pin.category} ·{" "}
                {pin.type === "pomysl" ? "💡 Pomysł" : "⚠️ Problem"}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{pin.title}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
