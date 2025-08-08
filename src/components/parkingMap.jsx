// 'use client';
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock parking spot data
const mockSpots = [
  { id: 1, lat: -37.8136, lng: 144.9631, status: "available" },
  { id: 2, lat: -37.814, lng: 144.964, status: "unavailable" },
  { id: 3, lat: -37.815, lng: 144.965, status: "available" },
];

// Helper to choose icon color
const getMarkerColor = (status) => {
  return status === "available" ? "green" : "red";
};

// Create a custom icon using Leaflet marker images
const customIcon = (color) =>
  new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const ParkingMap = () => {
  return (
    <div className="h-full w-full z-0">
      <MapContainer
        center={[-37.814, 144.96332]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="z-0"
        />

        {mockSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={customIcon(getMarkerColor(spot.status))}
          >
            <Popup>
              <strong>Spot ID:</strong> {spot.id}
              <br />
              <strong>Status:</strong> {spot.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ParkingMap;
