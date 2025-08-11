"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@maptiler/geocoding-control/style.css";
import { GeocodingControl } from "@maptiler/geocoding-control/leaflet";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

const pinkIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

function Geocoder({ onPick }) {
  const map = useMap();

  React.useEffect(() => {
    const control = new GeocodingControl({
      apiKey: MAPTILER_KEY,
      position: "topleft",
      placeholder: "Search address…",
      marker: false,
      showResultsWhileTyping: true,
      scrollWheelZoom: false,
    });

    map.addControl(control);

    const extractLatLon = (e) => {
      const feature = e?.detail?.feature || e?.feature || e?.detail || null;

      // 1) MapTiler 回傳常見：feature.center = [lon, lat]
      if (Array.isArray(feature?.center) && feature.center.length >= 2) {
        const [lon, lat] = feature.center;
        return { lat: Number(lat), lon: Number(lon) };
      }

      // 2) bbox = [minLon, minLat, maxLon, maxLat] → 取中心
      if (Array.isArray(feature?.bbox) && feature.bbox.length >= 4) {
        const [minLon, minLat, maxLon, maxLat] = feature.bbox.map(Number);
        return {
          lat: (minLat + maxLat) / 2,
          lon: (minLon + maxLon) / 2,
        };
      }

      // 3) GeoJSON Point
      const coords =
        feature?.geometry?.type === "Point"
          ? feature.geometry.coordinates
          : null;
      if (Array.isArray(coords) && coords.length >= 2) {
        const [lon, lat] = coords;
        return { lat: Number(lat), lon: Number(lon) };
      }

      // 4) MultiLineString / LineString：拿第一條的第一個點當代表
      const g = feature?.geometry;
      if (g?.type === "LineString" && Array.isArray(g.coordinates?.[0])) {
        const [lon, lat] = g.coordinates[0];
        return { lat: Number(lat), lon: Number(lon) };
      }
      if (
        g?.type === "MultiLineString" &&
        Array.isArray(g.coordinates?.[0]?.[0])
      ) {
        const [lon, lat] = g.coordinates[0][0];
        return { lat: Number(lat), lon: Number(lon) };
      }

      // 5) 有些版本會提供 latlng
      const ll = e?.detail?.latlng || e?.latlng;
      if (ll && typeof ll.lat === "number" && typeof ll.lng === "number") {
        return { lat: ll.lat, lon: ll.lng };
      }

      return null;
    };

    const handle = (label) => (e) => {
      console.log(`[Geocoder Event] ${label}`, e);
      const p = extractLatLon(e);
      if (p) {
        console.log("[Geocoder → onPick] coords:", p);
        onPick(p);
        map.setView([p.lat, p.lon], Math.max(map.getZoom(), 15));
      } else {
        console.warn("[Geocoder] still no lat/lon in payload", e);
      }
    };

    // 綁多種可能事件
    const evts = ["pick", "retrieve", "select", "submit"];
    evts.forEach((ev) => control.on?.(ev, handle(`control.on:${ev}`)));

    // DOM 後備（少數版本會用 DOM 事件）
    const container = control.getContainer?.() || control._container;
    if (container?.addEventListener) {
      evts.forEach((ev) => container.addEventListener(ev, handle(`DOM:${ev}`)));
    }

    return () => {
      evts.forEach((ev) => control.off?.(ev));
      if (container?.removeEventListener) {
        evts.forEach((ev) => container.removeEventListener(ev, handle));
      }
      map.removeControl(control);
    };
  }, [map, onPick]);

  return null;
}

function ZoomBottomLeft() {
  const map = useMap();
  React.useEffect(() => {
    const z = L.control.zoom({ position: "bottomleft" });
    z.addTo(map);
    return () => z.remove();
  }, [map]);
  return null;
}

export default function ParkingMap() {
  const [recs, setRecs] = React.useState([]);
  const [searchPoint, setSearchPoint] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onPick = React.useCallback(async ({ lat, lon }) => {
    console.log("📍 [onPick] Starting parking recommendation search for:", {
      lat,
      lon,
    });

    setSearchPoint({ lat, lon });
    setIsLoading(true);
    // /Users/SD21TRUN/Monash/OnboardingPrototype/src/app/api/parking/route.js
    const url = `/api/parking?lat=${lat}&lon=${lon}`;
    console.log("🌐 [API Request] Sending request to:", url);
    console.log(
      "🌐 [API Request] Request timestamp:",
      new Date().toISOString()
    );

    try {
      const startTime = performance.now();

      const res = await fetch(url, { cache: "no-store" });

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      console.log("📨 [API Response] Response received in:", `${duration}ms`);
      console.log("📨 [API Response] Status:", res.status, res.statusText);
      console.log(
        "📨 [API Response] Headers:",
        Object.fromEntries(res.headers.entries())
      );

      if (!res.ok) {
        console.error("❌ [API Response] Error status:", res.status);
        console.error("❌ [API Response] Status text:", res.statusText);
        setRecs([]);
        return;
      }

      const data = await res.json();
      console.log("📊 [API Response] Raw JSON data:");
      console.log(JSON.stringify(data, null, 2));
      console.log(
        "📊 [API Response] Data type:",
        Array.isArray(data) ? "Array" : typeof data
      );
      console.log(
        "📊 [API Response] Data length/keys:",
        Array.isArray(data) ? data.length : Object.keys(data)
      );

      const normalized = (Array.isArray(data) ? data : [data])
        .map((d, index) => {
          console.log(`🔄 [Data Processing] Processing item ${index + 1}:`, d);

          const normalized = {
            id: String(
              d.KerbsideID ?? d.kerbsideid ?? `${d.Latitude},${d.Longitude}`
            ),
            lat: Number(d.Latitude),
            lng: Number(d.Longitude),
            status: d.Status_Norm || d.Status_Description,
            zone: d.Zone_Number,
            distance_m: d.distance_m,
            score: d.score,
          };

          console.log(
            `🔄 [Data Processing] Normalized item ${index + 1}:`,
            normalized
          );
          return normalized;
        })
        .filter((p) => {
          const isValid = Number.isFinite(p.lat) && Number.isFinite(p.lng);
          if (!isValid) {
            console.warn(
              "⚠️ [Data Processing] Filtered out invalid coordinates:",
              p
            );
          }
          return isValid;
        });

      console.log(
        "✅ [Data Processing] Final normalized markers count:",
        normalized.length
      );
      console.log("✅ [Data Processing] Final normalized markers:", normalized);

      setRecs(normalized);
    } catch (e) {
      console.error("💥 [API Call] Fetch failed with error:", e);
      console.error("💥 [API Call] Error name:", e.name);
      console.error("💥 [API Call] Error message:", e.message);
      console.error("💥 [API Call] Error stack:", e.stack);
      setRecs([]);
    } finally {
      setIsLoading(false);
      console.log("🏁 [API Call] Request completed");
    }
  }, []);

  // Log state changes
  React.useEffect(() => {
    console.log("🔄 [State] searchPoint updated:", searchPoint);
  }, [searchPoint]);

  React.useEffect(() => {
    console.log("🔄 [State] recs updated, count:", recs.length);
    if (recs.length > 0) {
      console.log("🔄 [State] recs data:", recs);
    }
  }, [recs]);

  React.useEffect(() => {
    console.log("🔄 [State] isLoading updated:", isLoading);
  }, [isLoading]);

  return (
    <div className="h-full w-full">
      {isLoading && (
        <div className="absolute top-4 right-4 z-[1000] bg-blue-500 text-white px-3 py-2 rounded shadow">
          Loading parking recommendations...
        </div>
      )}

      <MapContainer
        center={[-37.814, 144.96332]}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomBottomLeft />

        <Geocoder onPick={onPick} />

        {searchPoint && (
          <Marker position={[searchPoint.lat, searchPoint.lon]} icon={blueIcon}>
            <Popup>
              <div>
                <strong>Search Location</strong>
                <br />
                Lat: {searchPoint.lat.toFixed(5)}
                <br />
                Lng: {searchPoint.lon.toFixed(5)}
              </div>
            </Popup>
          </Marker>
        )}

        {recs.map((r) => (
          <Marker key={`rec-${r.id}`} position={[r.lat, r.lng]} icon={pinkIcon}>
            <Popup>
              <div>
                <strong>Parking Spot</strong>
                <br />
                <strong>ID:</strong> {r.id}
                <br />
                <strong>Status:</strong> {r.status}
                <br />
                <strong>Zone:</strong> {r.zone}
                <br />
                <strong>Distance:</strong> {Math.round(r.distance_m)} m
                <br />
                <strong>Score:</strong> {r.score?.toFixed(2)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
