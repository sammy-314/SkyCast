
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Moon,
  CloudSun,
  Wind
} from "lucide-react";

interface WeatherIconProps {
  conditionCode: number;
  size?: number;
  className?: string;
  isDay?: boolean;
}

const WeatherIcon = ({ conditionCode, size = 24, className = "", isDay = true }: WeatherIconProps) => {
  const getWeatherIcon = () => {
    // Sunny / Clear
    if ([1000].includes(conditionCode)) {
      return isDay ? Sun : Moon;
    }
    
    // Partly cloudy
    if ([1003].includes(conditionCode)) {
      return CloudSun;
    }
    
    // Cloudy, Overcast
    if ([1006, 1009].includes(conditionCode)) {
      return Cloud;
    }
    
    // Mist, Fog, Freezing fog
    if ([1030, 1135, 1147].includes(conditionCode)) {
      return CloudFog;
    }
    
    // Patchy rain, Light rain, Moderate rain
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1240].includes(conditionCode)) {
      return CloudDrizzle;
    }
    
    // Heavy rain, Torrential rain
    if ([1192, 1195, 1243, 1246].includes(conditionCode)) {
      return CloudRain;
    }
    
    // Snow, Sleet, Blizzard
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
      return CloudSnow;
    }
    
    // Thundery outbreaks
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return CloudLightning;
    }
    
    // Windy
    if ([1030, 1135].includes(conditionCode)) {
      return Wind;
    }
    
    // Default
    return Cloud;
  };
  
  const IconComponent = getWeatherIcon();
  
  return <IconComponent size={size} className={className} />;
};

export default WeatherIcon;
