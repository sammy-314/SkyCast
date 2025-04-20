
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/services/weatherApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Thermometer, Wind } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeatherChartsProps {
  data: WeatherData;
}

const WeatherCharts = ({ data }: WeatherChartsProps) => {
  const isMobile = useIsMobile();
  
  if (!data || !data.forecast || !data.forecast.forecastday[0]) return null;

  const hourlyData = data.forecast.forecastday[0].hour;
  
  // Format hours for the chart
  const formatHour = (timeString: string) => {
    const hour = new Date(timeString).getHours();
    return `${hour}:00`;
  };

  // Temperature data
  const temperatureData = hourlyData.map(hour => ({
    name: formatHour(hour.time),
    temperature: hour.temp_c,
  }));

  // Wind data
  const windData = hourlyData.map(hour => ({
    name: formatHour(hour.time),
    wind: hour.wind_kph,
  }));

  // Precipitation data
  const precipData = hourlyData.map(hour => ({
    name: formatHour(hour.time),
    precipitation: hour.precip_mm,
    chance: hour.chance_of_rain,
  }));

  // Daily forecast data for comparison
  const dailyData = data.forecast.forecastday.map(day => ({
    name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    min: day.day.mintemp_c,
    max: day.day.maxtemp_c,
    precip: day.day.totalprecip_mm,
    humidity: day.day.avghumidity,
    uv: day.day.uv,
  }));

  // Air quality data if available
  const hasAirQuality = data.current && data.current.air_quality && 'us-epa-index' in data.current.air_quality;
  const airQualityData = hasAirQuality ? [
    { name: 'Good', value: data.current.air_quality['us-epa-index'] === 1 ? 100 : 0 },
    { name: 'Moderate', value: data.current.air_quality['us-epa-index'] === 2 ? 100 : 0 },
    { name: 'Unhealthy', value: data.current.air_quality['us-epa-index'] === 3 ? 100 : 0 },
    { name: 'Severe', value: data.current.air_quality['us-epa-index'] >= 4 ? 100 : 0 },
  ] : [];

  // Chart height based on device
  const chartHeight = isMobile ? 200 : 250;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span>Weather Analytics</span>
        </CardTitle>
        <CardDescription>
          Detailed weather metrics for {data.location.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="temperature" className="flex items-center gap-1 text-xs sm:text-sm">
              <Thermometer className="h-3 w-3 sm:h-4 sm:w-4" /> Temperature
            </TabsTrigger>
            <TabsTrigger value="wind" className="flex items-center gap-1 text-xs sm:text-sm">
              <Wind className="h-3 w-3 sm:h-4 sm:w-4" /> Wind
            </TabsTrigger>
            <TabsTrigger value="precipitation" className="flex items-center gap-1 text-xs sm:text-sm">
              <Droplet className="h-3 w-3 sm:h-4 sm:w-4" /> Precipitation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="mt-0">
            <div className={`h-[${chartHeight}px] mt-2`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded">
                            <p className="text-sm">{`${payload[0].payload.name}`}</p>
                            <p className="text-sm font-bold text-orange-500">{`${payload[0].value}°C`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="temperature" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="wind" className="mt-0">
            <div className={`h-[${chartHeight}px] mt-2`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={windData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded">
                            <p className="text-sm">{`${payload[0].payload.name}`}</p>
                            <p className="text-sm font-bold text-purple-500">{`${payload[0].value} km/h`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="wind" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="precipitation" className="mt-0">
            <div className={`h-[${chartHeight}px] mt-2`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={precipData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded">
                            <p className="text-sm">{`${payload[0].payload.name}`}</p>
                            <p className="text-sm font-bold text-blue-500">{`${payload[0].value} mm`}</p>
                            <p className="text-xs text-blue-300">{`${payload[0].payload.chance}% chance of rain`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="precipitation" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {hasAirQuality && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Air Quality Index</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={airQualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {airQualityData.map((entry, index) => {
                      const colors = ["#22c55e", "#f59e0b", "#ef4444", "#7c3aed"];
                      return (
                        <Sector 
                          key={`cell-${index}`} 
                          fill={colors[index % colors.length]}
                        />
                      )
                    })}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length && payload[0].value > 0) {
                        return (
                          <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded">
                            <p className="text-sm font-bold">{payload[0].name}</p>
                            <p className="text-xs">Air Quality Index</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCharts;
