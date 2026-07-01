import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Truck, Gauge, Calendar } from 'lucide-react';

export function QuadBikeForm({ onBack, onNext }: { onBack: () => void; onNext: (data: any) => void }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    engineSize: '',
    features: [] as string[],
    offerGuide: false,
    guidePrice: 75,
  });

  const features = [
    'Helmet Included', 'Safety Gear', 'GPS Tracking', 'Off-road Tires',
    'Storage Box', 'LED Lights', 'Electric Start', 'Winch'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Brand
            </div>
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="e.g., Yamaha"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            placeholder="e.g., Raptor"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Gauge className="h-4 w-4" />
              Engine Size (cc)
            </div>
          </label>
          <input
            type="text"
            value={formData.engineSize}
            onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
            placeholder="e.g., 700"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
            checked={formData.offerGuide}
            onChange={(e) => setFormData({ ...formData, offerGuide: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Offer guide service</span>
        </label>

        {formData.offerGuide && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guide Price per Day ($)</label>
            <input
              type="number"
              min="0"
              value={formData.guidePrice}
              onChange={(e) => setFormData({ ...formData, guidePrice: parseInt(e.target.value) })}
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