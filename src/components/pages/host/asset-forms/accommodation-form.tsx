import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Bed, Bath, Users, Wifi } from 'lucide-react';

export function AccommodationForm({ onBack, onNext }: { onBack: () => void; onNext: (data: any) => void }) {
  const [formData, setFormData] = useState({
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [] as string[],
  });

  const amenitiesList = [
    'WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'Washer',
    'Dryer', 'TV', 'Pool', 'Parking', 'Elevator'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="hotel">Hotel Room</option>
          <option value="guesthouse">Guesthouse</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              Bedrooms
            </div>
          </label>
          <input
            type="number"
            min="1"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4" />
              Bathrooms
            </div>
          </label>
          <input
            type="number"
            min="1"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Max Guests
            </div>
          </label>
          <input
            type="number"
            min="1"
            value={formData.maxGuests}
            onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Amenities
          </div>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={(e) => {
                  const newAmenities = e.target.checked
                    ? [...formData.amenities, amenity]
                    : formData.amenities.filter(a => a !== amenity);
                  setFormData({ ...formData, amenities: newAmenities });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(formData)}>Continue</Button>
      </div>
    </div>
  );
}