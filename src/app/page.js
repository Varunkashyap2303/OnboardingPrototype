"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Car, MapPin, Clock, Calendar, LogOut } from "lucide-react";
import CarOwnerChart from "@/components/carOwnerChart";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const hourlyData = [
  { hour: "6AM", occupied: 45, revenue: 180 },
  { hour: "8AM", occupied: 120, revenue: 480 },
  { hour: "10AM", occupied: 95, revenue: 380 },
  { hour: "12PM", occupied: 140, revenue: 560 },
  { hour: "2PM", occupied: 110, revenue: 440 },
  { hour: "4PM", occupied: 135, revenue: 540 },
  { hour: "6PM", occupied: 85, revenue: 340 },
  { hour: "8PM", occupied: 50, revenue: 200 },
];

const locationData = [
  { name: "Downtown Plaza", value: 35, color: "#3B82F6" },
  { name: "Business District", value: 28, color: "#10B981" },
  { name: "Shopping Center", value: 22, color: "#F59E0B" },
  { name: "University Area", value: 15, color: "#EF4444" },
];

const weeklyTrends = [
  { day: "Mon", occupancy: 78, revenue: 3120 },
  { day: "Tue", occupancy: 82, revenue: 3280 },
  { day: "Wed", occupancy: 85, revenue: 3400 },
  { day: "Thu", occupancy: 88, revenue: 3520 },
  { day: "Fri", occupancy: 92, revenue: 3680 },
  { day: "Sat", occupancy: 75, revenue: 3000 },
  { day: "Sun", occupancy: 65, revenue: 2600 },
];

const ParkingMap = dynamic(() => import("@/components/parkingMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalSpots] = useState(450);
  const [occupiedSpots] = useState(342);
  const [todayRevenue] = useState(4250);
  const [avgSessionTime] = useState(2.4);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const occupancyRate = Math.round((occupiedSpots / totalSpots) * 100);
  const availableSpots = totalSpots - occupiedSpots;

  //for login page
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row sm:flex-row items-center justify-between w-full py-4 gap-2">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="hidden sm:inline-flex items-center space-x-2">
                <h1 className="text-lg sm:text-sm font-bold text-slate-900 truncate">
                  ParkSmart
                </h1>
              </span>
            </div>
            {/* Tabs */}
            <div className="flex space-x-3">
              <a
                href="#data-insight"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Data Insight
              </a>
              {/* Divider */}
              <div className="h-4 w-px bg-slate-300" />
              <a
                href="#find-a-spot"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Find a Spot
              </a>
            </div>

            <div className="flex  ">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  window.location.href = "/login";
                }}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div
          className="w-full text-xs sm:text-sm md:text-base"
          id="data-insight"
        >
          <CarOwnerChart className="w-full" />
        </div>

        {/* Parking map */}
        <Card
          id="find-a-spot"
          className="my-8 hover:shadow-lg transition-shadow duration-200"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black text-sm sm:text-lg md:text-base">
              <MapPin className="h-5 w-5 text-blue-600" />
              Map View of Parking Spots
            </CardTitle>
            <CardDescription className="text-black text-xs sm:text-sm md:text-base">
              Real-time and predicted availability of parking bays
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ParkingMap />
          </CardContent>
        </Card>

        {/* Current Status */}

        {/* Analytics Tabs */}
        <Tabs defaultValue="hourly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="hourly"
              className="text-black data-[state=active]:text-white data-[state=active]:bg-black"
            >
              Hourly Trends
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="text-black data-[state=active]:text-white data-[state=active]:bg-black"
            >
              Weekly Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Today's Hourly Usage
                </CardTitle>
                <CardDescription className="text-black">
                  Parking occupancy and revenue by hour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="occupied"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Weekly Performance
                </CardTitle>
                <CardDescription className="text-black">
                  7-day occupancy and revenue trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="occupancy"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
