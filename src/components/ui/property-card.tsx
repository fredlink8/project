import { MapPin, Users, Star } from 'lucide-react';
import { Button } from './button';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    description: string;
    address: string;
    price_per_day: number;
    capacity: number;
    images: string[];
    rating?: number;
  };
  onViewDetails: (id: string) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
          ${property.price_per_day}/day
        </div>
        {property.rating && (
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {property.rating}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{property.description}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.address}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-3">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-sm">Up to {property.capacity} guests</span>
        </div>
        <Button 
          variant="primary"
          className="w-full"
          onClick={() => onViewDetails(property.id)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}