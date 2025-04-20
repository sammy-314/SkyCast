
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/services/weatherApi";
import WeatherIcon from "./WeatherIcon";
import { Droplet, Thermometer, Wind, Gauge } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  if (!data) return null;

  const { current, location } = data;
  const isDay = location.localtime.split(' ')[1].split(':')[0] > 6 && 
                location.localtime.split(' ')[1].split(':')[0] < 18;

  return (
    <Card className="w-full overflow-hidden glass-card">
      <CardContent className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-gradient">
              {Math.round(current.temp_c)}°C
            </CardTitle>
            <CardDescription className="text-lg text-white/80">
              Feels like {Math.round(current.feelslike_c)}°C
            </CardDescription>
            <p className="mt-2 text-lg">{current.condition.text}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-gradient-to-br from-white/10 to-white/5">
              <WeatherIcon 
                conditionCode={current.condition.code} 
                size={64} 
                className="text-white animate-float" 
                isDay={isDay}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="flex flex-col items-center bg-white/5 p-3 rounded-lg">
            <Wind className="h-5 w-5 text-weather-cloud mb-2" />
            <span className="text-sm text-white/70">Wind</span>
            <span className="font-semibold">{current.wind_kph} km/h</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 p-3 rounded-lg">
            <Droplet className="h-5 w-5 text-weather-rain mb-2" />
            <span className="text-sm text-white/70">Humidity</span>
            <span className="font-semibold">{current.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 p-3 rounded-lg">
            <Gauge className="h-5 w-5 text-weather-thunder mb-2" />
            <span className="text-sm text-white/70">Pressure</span>
            <span className="font-semibold">{current.pressure_mb} mb</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 p-3 rounded-lg">
            <Thermometer className="h-5 w-5 text-weather-sun mb-2" />
            <span className="text-sm text-white/70">UV Index</span>
            <span className="font-semibold">{current.uv}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
