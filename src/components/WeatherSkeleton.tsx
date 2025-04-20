
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const WeatherSkeleton = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <Card className="w-full overflow-hidden glass-card">
        <CardContent className="p-6 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-10 w-24 bg-white/10" />
              <Skeleton className="h-5 w-32 mt-2 bg-white/10" />
              <Skeleton className="h-6 w-40 mt-4 bg-white/10" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center bg-white/5 p-3 rounded-lg">
                <Skeleton className="h-5 w-5 mb-2 bg-white/10 rounded-full" />
                <Skeleton className="h-4 w-16 bg-white/10" />
                <Skeleton className="h-4 w-10 mt-1 bg-white/10" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {[...Array(7)].map((_, i) => (
          <Card key={i} className="weather-card">
            <CardContent className="p-3 flex flex-col items-center">
              <Skeleton className="h-4 w-20 bg-white/10" />
              <Skeleton className="h-8 w-8 my-2 rounded-full bg-white/10" />
              <Skeleton className="h-3 w-16 mb-2 bg-white/10" />
              <div className="flex items-center justify-between w-full">
                <Skeleton className="h-4 w-8 bg-white/10" />
                <Skeleton className="h-1 w-full mx-2 bg-white/10 rounded-full" />
                <Skeleton className="h-4 w-8 bg-white/10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Skeleton */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-48 mb-2 bg-white/10" />
          <Skeleton className="h-4 w-64 mb-4 bg-white/10" />
          <Skeleton className="h-8 w-full mb-4 bg-white/10 rounded-md" />
          <Skeleton className="h-[250px] w-full bg-white/10 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherSkeleton;
