import { forwardRef } from 'react';
import { MapPin, Users, ArrowUpRight } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyPopupProps {
  property: Property | null;
  onViewDetails: (property: Property) => void;
}

export const PropertyPopup = forwardRef<HTMLDivElement, PropertyPopupProps>(
  ({ property, onViewDetails }, ref) => {
    if (!property) return null;

    return (
      <div ref={ref} className="absolute z-10">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-[280px]">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
            <div className="flex items-center text-gray-600 text-xs mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              {property.address}
            </div>
            <div className="flex items-center text-gray-600 text-xs mb-2">
              <Users className="h-3 w-3 mr-1" />
              Up to {property.capacity} guests
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-600">
                ${property.price_per_day}/day
              </span>
              <button
                onClick={() => onViewDetails(property)}
                className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PropertyPopup.displayName = 'PropertyPopup';