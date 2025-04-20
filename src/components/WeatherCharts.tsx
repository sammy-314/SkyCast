
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/services/weatherApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, PieChart } from "@/components/ui/chart";
import { Droplet, Thermometer, Wind } from "lucide-react";

interface WeatherChartsProps {
  data: WeatherData;
}

const WeatherCharts = ({ data }: WeatherChartsProps) => {
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
  const hasAirQuality = data.current && data.current.air_quality && data.current.air_quality['us-epa-index'];
  const airQualityData = hasAirQuality ? [
    { name: 'Good', value: data.current.air_quality['us-epa-index'] === 1 ? 100 : 0 },
    { name: 'Moderate', value: data.current.air_quality['us-epa-index'] === 2 ? 100 : 0 },
    { name: 'Unhealthy', value: data.current.air_quality['us-epa-index'] === 3 ? 100 : 0 },
    { name: 'Severe', value: data.current.air_quality['us-epa-index'] >= 4 ? 100 : 0 },
  ] : [];

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
            <TabsTrigger value="temperature" className="flex items-center gap-1">
              <Thermometer className="h-4 w-4" /> Temperature
            </TabsTrigger>
            <TabsTrigger value="wind" className="flex items-center gap-1">
              <Wind className="h-4 w-4" /> Wind
            </TabsTrigger>
            <TabsTrigger value="precipitation" className="flex items-center gap-1">
              <Droplet className="h-4 w-4" /> Precipitation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="mt-0">
            <div className="h-[250px] mt-2">
              <AreaChart
                data={temperatureData}
                categories={["temperature"]}
                index="name"
                colors={["#F97316"]}
                valueFormatter={(value) => `${value}°C`}
                showAnimation={true}
                animationDuration={1000}
                className="h-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="wind" className="mt-0">
            <div className="h-[250px] mt-2">
              <BarChart
                data={windData}
                categories={["wind"]}
                index="name"
                colors={["#8B5CF6"]}
                valueFormatter={(value) => `${value} km/h`}
                showAnimation={true}
                animationDuration={1000}
                className="h-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="precipitation" className="mt-0">
            <div className="h-[250px] mt-2">
              <AreaChart
                data={precipData}
                categories={["precipitation"]}
                index="name"
                colors={["#0EA5E9"]}
                valueFormatter={(value) => `${value} mm`}
                showAnimation={true}
                animationDuration={1000}
                className="h-full"
              />
            </div>
          </TabsContent>
        </Tabs>

        {hasAirQuality && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Air Quality Index</h3>
            <div className="h-[200px]">
              <PieChart
                data={airQualityData}
                category="value"
                index="name"
                colors={["#22c55e", "#f59e0b", "#ef4444", "#7c3aed"]}
                valueFormatter={(value) => `${value}%`}
                showAnimation={true}
                animationDuration={1000}
                className="h-full"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCharts;
