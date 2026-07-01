import { useState } from 'react';
import { PropertyCard } from '../../ui/property-card';
import { FilterSidebar } from './filter-sidebar';
import { Layout, MapPin, Grid } from 'lucide-react';
import { Button } from '../../ui/button';
import { PropertyMap } from '../../map/property-map';
import { filterProperties } from '../../../lib/utils/property-filters';
import type { FilterParams } from '../../../lib/utils/property-filters';

interface SearchResultsProps {
  searchParams: {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  };
  properties: any[];
  onBack: () => void;
  onSelectProperty: (id: string) => void;
}

export function SearchResults({ searchParams, properties, onBack, onSelectProperty }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleFilterChange = (filters: FilterParams) => {
    const filtered = filterProperties(properties, {
      ...searchParams,
      ...filters
    });
    setFilteredProperties(filtered);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              {searchParams.location && ` in ${searchParams.location}`}
            </h2>
            {searchParams.checkIn && searchParams.checkOut && (
              <p className="text-gray-600">
                {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                {searchParams.guests && ` · ${searchParams.guests} guests`}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              onClick={() => setViewMode('grid')}
              size="sm"
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'map' ? 'primary' : 'outline'}
              onClick={() => setViewMode('map')}
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <FilterSidebar onFilterChange={handleFilterChange} />
        
        <div className="flex-1">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No properties match your current filters.</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters to see more options.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onSelectProperty}
                />
              ))}
            </div>
          ) : (
            <div className="h-[600px] rounded-lg overflow-hidden">
              <PropertyMap
                properties={filteredProperties}
                onPropertySelect={(property) => onSelectProperty(property.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}