import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Car, Calendar, Users, Settings } from 'lucide-react';

export function VehicleForm({ onBack, onNext }: { onBack: () => void; onNext: (data: any) => void }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    seats: 4,
    transmission: 'automatic',
    features: [] as string[],
    offerDriver: false,
    driverPrice: 50,
  });

  const features = [
    'Air Conditioning', 'GPS', 'Bluetooth', 'Backup Camera',
    'Child Seat', 'USB Charger', 'Sunroof', '4x4'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Make
            </div>
          </label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            placeholder="e.g., Toyota"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            placeholder="e.g., RAV4"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Year
            </div>
          </label>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Seats
            </div>
          </label>
          <input
            type="number"
            min="1"
            value={formData.seats}
            onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Transmission
            </div>
          </label>
          <select
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {features.map((feature) => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.features.includes(feature)}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...formData.features, feature]
                    : formData.features.filter(f => f !== feature);
                  setFormData({ ...formData, features: newFeatures });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={formData.offerDriver}
            onChange={(e) => setFormData({ ...formData, offerDriver: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Offer driver service</span>
        </label>

        {formData.offerDriver && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Driver Price per Day ($)</label>
            <input
              type="number"
              min="0"
              value={formData.driverPrice}
              onChange={(e) => setFormData({ ...formData, driverPrice: parseInt(e.target.value) })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(formData)}>Continue</Button>
      </div>
    </div>
  );
}