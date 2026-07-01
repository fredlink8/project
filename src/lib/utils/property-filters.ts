import type { Property } from '../../types';
import { sampleMobilityAssets } from '../data/sample-mobility-assets';
import type { PropertyType, Amenity } from './filter-types';

export interface FilterParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  propertyType?: PropertyType | 'all';
  amenities?: Amenity[];
  mobilityTypes?: ('vehicle' | 'bicycle' | 'quad_bike' | 'custom')[];
}

export function filterProperties(properties: Property[], params: FilterParams) {
  return properties.filter(property => {
    // Filter by location
    if (params.location && 
        !property.address.toLowerCase().includes(params.location.toLowerCase())) {
      return false;
    }
    
    // Filter by capacity
    if (params.guests && property.capacity < params.guests) {
      return false;
    }

    // Filter by property type
    if (params.propertyType && params.propertyType !== 'all') {
      if (property.type !== params.propertyType) return false;
    }

    // Filter by amenities
    if (params.amenities && params.amenities.length > 0) {
      const propertyAmenities = property.amenities.map(a => a.toLowerCase());
      const hasAllAmenities = params.amenities.every(amenity => 
        propertyAmenities.some(a => a.includes(amenity.toLowerCase().replace('_', ' ')))
      );
      if (!hasAllAmenities) return false;
    }

    // Filter by mobility assets
    if (params.mobilityTypes && params.mobilityTypes.length > 0) {
      const propertyAssets = sampleMobilityAssets[property.id] || [];
      const hasRequestedAssets = params.mobilityTypes.some(requestedType => 
        propertyAssets.some(asset => asset.type === requestedType)
      );
      if (!hasRequestedAssets) return false;
    }
    
    return true;
  });
}