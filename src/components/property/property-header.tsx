import { MapPin, Users, Star } from 'lucide-react';

interface PropertyHeaderProps {
  title: string;
  rating?: number;
  address: string;
  capacity: number;
}

export function PropertyHeader({ title, rating, address, capacity }: PropertyHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      
      {rating && (
        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-semibold mr-2">{rating}</span>
          <span className="text-gray-600">(24 reviews)</span>
        </div>
      )}
      <div className="flex items-center text-gray-600 mb-4">
        <MapPin className="h-5 w-5 mr-2" />
        {address}
      </div>
      <div className="flex items-center text-gray-600 mb-6">
        <Users className="h-5 w-5 mr-2" />
        Up to {capacity} guests
      </div>
    </div>
  );
}