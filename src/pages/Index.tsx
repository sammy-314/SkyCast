
import { useState, useEffect } from "react";
import { getWeather, WeatherData } from "@/services/weatherApi";
import CitySearch from "@/components/CitySearch";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastCard from "@/components/ForecastCard";
import WeatherCharts from "@/components/WeatherCharts";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const popularIndianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
  "Kolkata", "Pune", "Jaipur", "Lucknow", "Ahmedabad"
];

const Index = () => {
  const [city, setCity] = useState<string>("Delhi");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;
      
      setLoading(true);
      // For Delhi, use "New Delhi" to ensure accurate data
      const searchCity = city.toLowerCase() === "delhi" ? "New Delhi" : city;
      const data = await getWeather(searchCity);
      
      if (data) {
        setWeatherData(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    toast(`Loading weather data for ${selectedCity}`);
  };

  const handleQuickCitySelect = (cityName: string) => {
    setCity(cityName);
    toast(`Loading weather data for ${cityName}`);
  };

  const getLocalTime = () => {
    if (!weatherData) return "";
    
    const localTime = weatherData.location.localtime;
    return new Date(localTime).toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto pb-10 sm:pb-20 min-h-screen px-3 sm:px-6">
      <header className="py-4 sm:py-6 mb-4 sm:mb-6">
        <h1 className="text-3xl sm:text-5xl font-bold text-gradient mb-1 sm:mb-2">
          Sky<span className="text-weather-sun">Cast</span> India
        </h1>
        <p className="text-sm sm:text-base text-white/70">
          Detailed weather forecasts for cities across India
        </p>
      </header>

      <div className="w-full max-w-xl mx-auto mb-6 sm:mb-8">
        <CitySearch onSelectCity={handleCitySelect} selectedCity={city} />
        
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
          {popularIndianCities.map((cityName) => (
            <button
              key={cityName}
              onClick={() => handleQuickCitySelect(cityName)}
              className={`text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all ${
                city === cityName
                  ? "bg-weather-sun/80 text-white"
                  : "bg-white/5 hover:bg-white/10 text-white/80"
              }`}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <WeatherSkeleton />
      ) : weatherData ? (
        <div className="animate-fade-in space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm text-center sm:text-left">
              <div className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{weatherData.location.name}, {weatherData.location.region}, India</span>
              </div>
              <span className="hidden sm:inline mx-2">•</span>
              <span>{getLocalTime()}</span>
            </div>
          </div>

          <CurrentWeather data={weatherData} />

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{isMobile ? "7-Day" : "7-Day Forecast"}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-4">
              {weatherData.forecast.forecastday.map((day) => (
                <ForecastCard
                  key={day.date}
                  date={day.date}
                  minTemp={day.day.mintemp_c}
                  maxTemp={day.day.maxtemp_c}
                  condition={day.day.condition}
                  chanceOfRain={day.day.daily_chance_of_rain}
                />
              ))}
            </div>
          </div>

          <WeatherCharts data={weatherData} />
          
          <Card className="glass-card p-3 sm:p-4">
            <CardTitle className="mb-1 sm:mb-2 text-base sm:text-lg">About SkyCast India</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              SkyCast India provides accurate weather forecasts for all cities across India.
              Our data is powered by WeatherAPI.com and includes detailed metrics like temperature,
              precipitation, wind speed, and air quality. Stay prepared with our comprehensive
              weather forecasts and analytics.
            </CardDescription>
          </Card>
        </div>
      ) : (
        <div className="text-center py-10 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">No Weather Data Available</h2>
          <p className="text-white/70 text-sm sm:text-base">
            Try searching for another Indian city
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
