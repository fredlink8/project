// Property types matching the sample data
export const propertyTypes = [
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'lodge', label: 'Safari Lodge' },
  { value: 'bungalow', label: 'Beachfront Bungalow' },
  { value: 'cottage', label: 'Cottage' }
] as const;

// Amenities matching the sample data
export const amenities = [
  { value: 'wifi', label: 'WiFi' },
  { value: 'pool', label: 'Pool' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'air_conditioning', label: 'Air Conditioning' },
  { value: 'ocean_view', label: 'Ocean View' },
  { value: 'mountain_view', label: 'Mountain View' },
  { value: 'city_view', label: 'City View' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'safari_tours', label: 'Safari Tours' },
  { value: 'beach_access', label: 'Beach Access' },
  { value: 'water_sports', label: 'Water Sports' },
  { value: 'hiking_trails', label: 'Hiking Trails' },
  { value: 'fireplace', label: 'Fireplace' },
  { value: 'historic_building', label: 'Historic Building' }
] as const;

export type PropertyType = typeof propertyTypes[number]['value'];
export type Amenity = typeof amenities[number]['value'];