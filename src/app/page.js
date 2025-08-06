"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Car, MapPin, DollarSign, Clock, TrendingUp, Users, Calendar, Settings, LogOut } from 'lucide-react';
import CarOwnerChart from '@/components/carOwnerChart';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const hourlyData = [
  { hour: '6AM', occupied: 45, revenue: 180 },
  { hour: '8AM', occupied: 120, revenue: 480 },
  { hour: '10AM', occupied: 95, revenue: 380 },
  { hour: '12PM', occupied: 140, revenue: 560 },
  { hour: '2PM', occupied: 110, revenue: 440 },
  { hour: '4PM', occupied: 135, revenue: 540 },
  { hour: '6PM', occupied: 85, revenue: 340 },
  { hour: '8PM', occupied: 50, revenue: 200 },
];

const locationData = [
  { name: 'Downtown Plaza', value: 35, color: '#3B82F6' },
  { name: 'Business District', value: 28, color: '#10B981' },
  { name: 'Shopping Center', value: 22, color: '#F59E0B' },
  { name: 'University Area', value: 15, color: '#EF4444' },
];

const weeklyTrends = [
  { day: 'Mon', occupancy: 78, revenue: 3120 },
  { day: 'Tue', occupancy: 82, revenue: 3280 },
  { day: 'Wed', occupancy: 85, revenue: 3400 },
  { day: 'Thu', occupancy: 88, revenue: 3520 },
  { day: 'Fri', occupancy: 92, revenue: 3680 },
  { day: 'Sat', occupancy: 75, revenue: 3000 },
  { day: 'Sun', occupancy: 65, revenue: 2600 },
];

const ParkingMap = dynamic(() => import('@/components/parkingMap'), { 
  ssr: false,
  loading: () => <div className='h-[400px] w-full flex items-center justify-center'>Loading map...</div>,
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
    if (localStorage.getItem('loggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">ParkSmart</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Badge variant="secondary" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {currentTime.toLocaleTimeString()}
              </Badge> */}
              <Button
  variant="outline"
  size="sm"
  onClick={() => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  }}
>
  <LogOut className="h-4 w-4 mr-2" />
  Logout
</Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Spots</CardTitle>
              <MapPin className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSpots.toLocaleString()}</div>
              <p className="text-xs text-blue-100">Across all locations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Occupied</CardTitle>
              <Car className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupiedSpots.toLocaleString()}</div>
              <p className="text-xs text-green-100">{occupancyRate}% occupancy rate</p>
            </CardContent>
          </Card>
{/* 
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${todayRevenue.toLocaleString()}</div>
              <p className="text-xs text-orange-100">+12% from yesterday</p>
            </CardContent>
          </Card> */}

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgSessionTime}h</div>
              <p className="text-xs text-purple-100">Average parking duration</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <CarOwnerChart />
          </div>

        {/* Parking map */}
        <Card className="my-8 hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <MapPin className="h-5 w-5 text-blue-600" />
              Map View of Parking Spots
            </CardTitle>
            <CardDescription className="text-black">
              Real-time mock availability of parking bays
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ParkingMap />
          </CardContent>
        </Card>

        {/* Current Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Live Occupancy Status
              </CardTitle>
              <CardDescription className="text-black">Real-time parking availability across locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-900">Available Spots</h3>
                    <p className="text-sm text-slate-600">Ready for parking</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{availableSpots}</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {Math.round((availableSpots / totalSpots) * 100)}% free
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium">Premium Spots</div>
                    <div className="text-lg font-semibold text-blue-900">24 available</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-sm text-orange-600 font-medium">Standard Spots</div>
                    <div className="text-lg font-semibold text-orange-900">84 available</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Popular Locations
              </CardTitle>
              <CardDescription>Most used parking areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locationData.map((location, index) => (
                  <div key={location.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: location.color }}
                      />
                      <span className="font-medium text-slate-900">{location.name}</span>
                    </div>
                    <Badge variant="secondary">{location.value}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="hourly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hourly" className="text-black data-[state=active]:text-white data-[state=active]:bg-black">Hourly Trends</TabsTrigger>
            <TabsTrigger value="weekly" className="text-black data-[state=active]:text-white data-[state=active]:bg-black">Weekly Overview</TabsTrigger>
            <TabsTrigger value="locations" className="text-black data-[state=active]:text-white data-[state=active]:bg-black">Location Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Today's Hourly Usage
                </CardTitle>
                <CardDescription className="text-black">Parking occupancy and revenue by hour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="hour" 
                        stroke="#64748b"
                        fontSize={12}
                      />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Bar dataKey="occupied" fill="#3B82F6" radius={[4, 4, 0, 0]} />
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
                <CardDescription className="text-black">7-day occupancy and revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="day" 
                        stroke="#64748b"
                        fontSize={12}
                      />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="occupancy" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black">
                    <Users className="h-5 w-5 text-orange-600" />
                    Location Distribution
                  </CardTitle>
                  <CardDescription className="text-black">Usage percentage by parking area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-black">Location Details</CardTitle>
                  <CardDescription className="text-black">Detailed breakdown by area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locationData.map((location) => (
                      <div key={location.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: location.color }}
                          />
                          <div>
                            <div className="font-medium text-slate-900">{location.name}</div>
                            <div className="text-sm text-slate-500">{Math.round(totalSpots * location.value / 100)} spots</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">{location.value}%</div>
                          <div className="text-sm text-slate-500">utilization</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        {/* <Card className="mt-8 hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest parking transactions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', event: 'Vehicle entered', location: 'Downtown Plaza - Spot A23', type: 'entry' },
                { time: '5 minutes ago', event: 'Payment completed', location: 'Business District - Spot B15', type: 'payment' },
                { time: '8 minutes ago', event: 'Vehicle exited', location: 'Shopping Center - Spot C07', type: 'exit' },
                { time: '12 minutes ago', event: 'Spot reserved', location: 'University Area - Spot D12', type: 'reservation' },
                { time: '15 minutes ago', event: 'Vehicle entered', location: 'Downtown Plaza - Spot A45', type: 'entry' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'entry' ? 'bg-green-500' :
                      activity.type === 'exit' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`} />
                    <div>
                      <div className="font-medium text-slate-900">{activity.event}</div>
                      <div className="text-sm text-slate-500">{activity.location}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </main>
    </div>
  );
}