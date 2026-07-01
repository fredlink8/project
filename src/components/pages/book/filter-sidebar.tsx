import { useState } from 'react';
import { Sliders, Home, Wifi, Car } from 'lucide-react';
import { Button } from '../../ui/button';
import { propertyTypes, amenities } from '../../../lib/utils/filter-types';
import type { PropertyType, Amenity } from '../../../lib/utils/filter-types';
import { sampleMobilityAssets } from '../../../lib/data/sample-mobility-assets';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    propertyType: 'all' as 'all' | PropertyType,
    amenities: [] as Amenity[],
    mobilityTypes: [] as ('vehicle' | 'bicycle' | 'quad_bike' | 'custom')[]
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white p-4 rounded-lg shadow-sm border sticky top-4">
        <div className="flex items-center gap-2 mb-6">
          <Sliders className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Property Type
              </div>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="propertyType"
                  value="all"
                  checked={filters.propertyType === 'all'}
                  onChange={(e) => handleFilterChange({
                    ...filters,
                    propertyType: e.target.value as 'all'
                  })}
                  className="mr-2"
                />
                All Properties
              </label>
              {propertyTypes.map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="radio"
                    name="propertyType"
                    value={value}
                    checked={filters.propertyType === value}
                    onChange={(e) => handleFilterChange({
                      ...filters,
                      propertyType: e.target.value as PropertyType
                    })}
                    className="mr-2"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Amenities
              </div>
            </label>
            <div className="space-y-2">
              {amenities.map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(value)}
                    onChange={(e) => {
                      const newAmenities = e.target.checked
                        ? [...filters.amenities, value]
                        : filters.amenities.filter(a => a !== value);
                      handleFilterChange({ ...filters, amenities: newAmenities });
                    }}
                    className="mr-2 rounded border-gray-300"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Mobility Options
              </div>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.mobilityTypes.includes('vehicle')}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.mobilityTypes, 'vehicle']
                      : filters.mobilityTypes.filter(t => t !== 'vehicle');
                    handleFilterChange({ ...filters, mobilityTypes: newTypes });
                  }}
                  className="mr-2 rounded border-gray-300"
                />
                Vehicle Available
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.mobilityTypes.includes('bicycle')}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.mobilityTypes, 'bicycle']
                      : filters.mobilityTypes.filter(t => t !== 'bicycle');
                    handleFilterChange({ ...filters, mobilityTypes: newTypes });
                  }}
                  className="mr-2 rounded border-gray-300"
                />
                Bicycle Available
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.mobilityTypes.includes('quad_bike')}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.mobilityTypes, 'quad_bike']
                      : filters.mobilityTypes.filter(t => t !== 'quad_bike');
                    handleFilterChange({ ...filters, mobilityTypes: newTypes });
                  }}
                  className="mr-2 rounded border-gray-300"
                />
                Quad Bike Available
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.mobilityTypes.includes('custom')}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.mobilityTypes, 'custom']
                      : filters.mobilityTypes.filter(t => t !== 'custom');
                    handleFilterChange({ ...filters, mobilityTypes: newTypes });
                  }}
                  className="mr-2 rounded border-gray-300"
                />
                Other Mobility Options
              </label>
            </div>
          </div>

          <Button
            onClick={() => handleFilterChange({
              propertyType: 'all',
              amenities: [],
              mobilityTypes: [],
            })}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}