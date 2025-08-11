import { NextResponse } from "next/server";

const BASE = "https://parking-reco-api.azurewebsites.net/recommend";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log("🚀 [API Route] Request received");
  console.log("🚀 [API Route] Request URL:", req.url);
  console.log("🚀 [API Route] Search params:", { lat, lon });
  console.log("🚀 [API Route] Request timestamp:", new Date().toISOString());

  if (!lat || !lon) {
    console.error("❌ [API Route] Missing required parameters");
    return NextResponse.json(
      { error: "lat and lon are required" },
      { status: 400 }
    );
  }

  const upstreamUrl = `${BASE}?lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lon)}`;
  console.log("🌐 [API Route] Calling upstream API:", upstreamUrl);
  console.log("🌐 [API Route] Base URL:", BASE);
  console.log("🌐 [API Route] Encoded params:", {
    lat: encodeURIComponent(lat),
    lon: encodeURIComponent(lon),
  });

  try {
    const startTime = performance.now();

    const upstream = await fetch(upstreamUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "ParkingApp/1.0",
        "Accept": "application/json",
      },
    });

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    console.log(
      "📨 [API Route] Upstream response received in:",
      `${duration}ms`
    );
    console.log(
      "📨 [API Route] Upstream status:",
      upstream.status,
      upstream.statusText
    );
    console.log(
      "📨 [API Route] Upstream headers:",
      Object.fromEntries(upstream.headers.entries())
    );

    if (!upstream.ok) {
      console.error(
        "❌ [API Route] Upstream error:",
        upstream.status,
        upstream.statusText
      );

      // Try to get error details
      try {
        const errorText = await upstream.text();
        console.error("❌ [API Route] Upstream error body:", errorText);
      } catch (e) {
        console.error("❌ [API Route] Could not read upstream error body:", e);
      }

      return NextResponse.json(
        { error: "Upstream error" },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    console.log("📊 [API Route] Upstream raw JSON response:");
    console.log(JSON.stringify(data, null, 2));
    console.log(
      "📊 [API Route] Response data type:",
      Array.isArray(data) ? "Array" : typeof data
    );

    if (Array.isArray(data)) {
      console.log("📊 [API Route] Array length:", data.length);
    } else if (typeof data === "object" && data !== null) {
      console.log("📊 [API Route] Object keys:", Object.keys(data));
      if (data.results) {
        console.log(
          "📊 [API Route] Results array length:",
          Array.isArray(data.results) ? data.results.length : "Not an array"
        );
      }
    }

    const arr = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [data];

    console.log("🔄 [API Route] Processing array with length:", arr.length);
    console.log("🔄 [API Route] Processing data:");
    arr.forEach((item, index) => {
      console.log(`🔄 [API Route] Item ${index + 1}:`, item);
    });

    console.log("✅ [API Route] Returning processed data");
    console.log("✅ [API Route] Final response array length:", arr.length);

    return NextResponse.json(arr);
  } catch (error) {
    console.error("💥 [API Route] Fetch error:", error);
    console.error("💥 [API Route] Error name:", error.name);
    console.error("💥 [API Route] Error message:", error.message);
    console.error("💥 [API Route] Error stack:", error.stack);

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
