// components/MapComponent.tsx
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix domyślnych ikon Leaflet (Next.js je gubi)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapComponentProps {
  center: [number, number];
  zoom: number;
}

export default function MapComponent({ center, zoom }: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Przykładowe markery – później zamienisz na dane z Twojego API / store */}
      <Marker position={[52.23, 21.01]}>
        <Popup>
          <strong>Dziura w drodze na Puławskiej</strong>
          <br />
          124 głosy • Problem lokalny
        </Popup>
      </Marker>

      <Marker position={[52.25, 21.05]}>
        <Popup>
          <strong>Pomysł: więcej zieleni w parku</strong>
          <br />
          87 głosów • Pomysł
        </Popup>
      </Marker>

      {/* Click handler – przydatny do dodawania nowego zgłoszenia z mapy */}
      <LocationMarker />
    </MapContainer>
  );
}

// Opcjonalny komponent: kliknięcie na mapie
function LocationMarker() {
  useMapEvents({
    click(e) {
      console.log("Kliknięto na mapie:", e.latlng);
      // Tutaj możesz otworzyć modal "Nowy głos" z pre-filled lokalizacją
    },
  });
  return null;
}
