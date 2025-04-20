
import { Card, CardContent } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";

interface ForecastCardProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: {
    text: string;
    code: number;
  };
  chanceOfRain: number;
}

const ForecastCard = ({ date, minTemp, maxTemp, condition, chanceOfRain }: ForecastCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="weather-card">
      <CardContent className="p-3 flex flex-col items-center">
        <p className="text-sm font-medium">{formattedDate}</p>
        <div className="my-2">
          <WeatherIcon conditionCode={condition.code} size={32} className="text-white" />
        </div>
        <p className="text-xs text-white/70 text-center mb-2">{condition.text}</p>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-white/70">{Math.round(minTemp)}°</span>
          <div className="w-full mx-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"
              style={{ width: `${(Math.round(maxTemp) / 50) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm">{Math.round(maxTemp)}°</span>
        </div>
        {chanceOfRain > 0 && (
          <div className="mt-2 text-xs text-weather-rain">
            {chanceOfRain}% chance of rain
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
