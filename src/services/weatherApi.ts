
import { toast } from "@/components/ui/sonner";

const API_KEY = '77e0a58dc3bc4097bf5105516252004';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    air_quality: {
      'us-epa-index': number;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        daily_chance_of_rain: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_kph: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        chance_of_rain: number;
      }>;
    }>;
  };
}

export const getWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.error('An unknown error occurred');
    }
    console.error('Weather API Error:', error);
    return null;
  }
};

export const searchCities = async (query: string): Promise<Array<{id: number, name: string, region: string}>> => {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search cities');
    }
    
    const data = await response.json();
    
    // Filter for just Indian cities
    return data.filter((city: any) => city.country === 'India');
  } catch (error) {
    console.error('City Search Error:', error);
    return [];
  }
};
