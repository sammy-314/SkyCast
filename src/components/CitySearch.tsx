
import { useState, useEffect, useRef } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchCities } from '@/services/weatherApi';

interface CitySearchProps {
  onSelectCity: (city: string) => void;
  selectedCity: string;
}

interface City {
  id: number;
  name: string;
  region: string;
}

const CitySearch = ({ onSelectCity, selectedCity }: CitySearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length >= 3) {
      setLoading(true);
      searchTimeout.current = setTimeout(async () => {
        const results = await searchCities(query);
        setCities(results);
        setLoading(false);
      }, 300);
    } else {
      setCities([]);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/5 hover:bg-white/10 text-left"
        >
          {selectedCity || "Search for a city..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-[#1A1F2C] border border-white/10">
        <Command>
          <CommandInput
            placeholder="Search Indian cities..."
            className="h-9"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm">
              {loading ? "Searching..." : "No city found. Try a different search."}
            </CommandEmpty>
            <CommandGroup heading="Cities">
              {cities.map((city) => (
                <CommandItem
                  key={city.id}
                  value={`${city.name}, ${city.region}`}
                  onSelect={() => {
                    onSelectCity(`${city.name}`);
                    setOpen(false);
                  }}
                  className="flex items-center"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity === city.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{city.name}</span>
                    {city.region && (
                      <span className="text-xs text-muted-foreground">{city.region}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySearch;
