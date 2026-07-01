import { useState } from 'react';
import { Calendar, Users, MapPin, Tag } from 'lucide-react';
import { Button } from './button';

interface SearchFiltersProps {
  onFilter: (filters: any) => void;
}

export function SearchFilters({ onFilter }: SearchFiltersProps) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handleFilter = () => {
    onFilter({ location, dates, guests, priceRange });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </div>
          </label>
          <input
            type="text"
            placeholder="Where to?"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Dates
            </div>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dates.checkIn}
                onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
              />
            </div>
            <div>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dates.checkOut}
                onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guests
            </div>
          </label>
          <input
            type="number"
            min="1"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Price Range
            </div>
          </label>
          <select 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setPriceRange({ min: 0, max: parseInt(e.target.value) })}
          >
            <option value="1000">Up to $1000/day</option>
            <option value="500">Up to $500/day</option>
            <option value="200">Up to $200/day</option>
            <option value="100">Up to $100/day</option>
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={handleFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}