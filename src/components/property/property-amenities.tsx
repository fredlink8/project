import { AmenityIcon } from './amenity-icon';

interface PropertyAmenitiesProps {
  amenities: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-center">
          <AmenityIcon name={amenity} />
          <span>{amenity}</span>
        </div>
      ))}
    </div>
  );
}