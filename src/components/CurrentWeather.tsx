
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
  
  // Parse the hour correctly from the localtime string
  const localTime = new Date(location.localtime);
  const hourOfDay = localTime.getHours();
  const isDay = hourOfDay >= 6 && hourOfDay < 18;

  return (
    <Card className="w-full overflow-hidden glass-card">
      <CardContent className="p-4 sm:p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl sm:text-4xl font-bold text-gradient">
              {Math.round(current.temp_c)}°C
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-white/80">
              Feels like {Math.round(current.feelslike_c)}°C
            </CardDescription>
            <p className="mt-2 text-base sm:text-lg">{current.condition.text}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-gradient-to-br from-white/10 to-white/5">
              <WeatherIcon 
                conditionCode={current.condition.code} 
                size={isMobileSize() ? 48 : 64} 
                className="text-white animate-float" 
                isDay={isDay}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <div className="flex flex-col items-center bg-white/5 p-2 sm:p-3 rounded-lg">
            <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-weather-cloud mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm text-white/70">Wind</span>
            <span className="text-sm sm:text-base font-semibold">{current.wind_kph} km/h</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 p-2 sm:p-3 rounded-lg">
            <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-weather-rain mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm text-white/70">Humidity</span>
            <span className="text-sm sm:text-base font-semibold">{current.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 p-2 sm:p-3 rounded-lg">
            <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-weather-thunder mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm text-white/70">Pressure</span>
            <span className="text-sm sm:text-base font-semibold">{current.pressure_mb} mb</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 p-2 sm:p-3 rounded-lg">
            <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-weather-sun mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm text-white/70">UV Index</span>
            <span className="text-sm sm:text-base font-semibold">{current.uv}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to detect mobile view based on screen width
function isMobileSize() {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
}

export default CurrentWeather;
