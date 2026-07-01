import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '../ui/search-filters';
import { PropertyCard } from '../ui/property-card';
import { PropertyMap } from '../map/property-map';
import { BackButton } from '../ui/back-button';
import { sampleProperties } from '../../lib/data/sample-properties';
import { MapPin, Grid } from 'lucide-react';
import { Button } from '../ui/button';

export function ExploreProperties() {
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [loading] = useState(false);

  const handleFilter = (filters: any) => {
    const filtered = sampleProperties.filter(property => {
      if (filters.location && !property.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.guests && property.capacity < filters.guests) {
        return false;
      }
      if (filters.priceRange && property.price_per_day > filters.priceRange.max) {
        return false;
      }
      return true;
    });
    setFilteredProperties(filtered);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return <div className="text-center">Loading properties...</div>;
  }

  return (
    <div className="relative">
      <BackButton onClick={() => navigate('/')} />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Properties</h1>
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

      <SearchFilters onFilter={handleFilter} />
      
      {filteredProperties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No properties found matching your criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="h-[600px] rounded-lg overflow-hidden">
          <PropertyMap
            properties={filteredProperties}
            onPropertySelect={(property) => handleViewDetails(property.id)}
          />
        </div>
      )}
    </div>
  );
}