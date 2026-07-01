import { useEffect, useRef } from 'react';

interface MapProps {
  properties: Array<{
    id: string;
    title: string;
    price_per_day: number;
    location?: {
      latitude: number;
      longitude: number;
    };
  }>;
}

export function Map({ properties }: MapProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="text-center py-8">
        <p className="text-gray-600">
          Map view is currently unavailable. Please use the grid view to browse properties.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Showing {properties.length} properties in the selected area
        </p>
      </div>
    </div>
  );
}