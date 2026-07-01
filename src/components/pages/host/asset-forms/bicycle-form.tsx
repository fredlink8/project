import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Bike, Weight, Ruler } from 'lucide-react';

export function BicycleForm({ onBack, onNext }: { onBack: () => void; onNext: (data: any) => void }) {
  const [formData, setFormData] = useState({
    type: 'mountain',
    brand: '',
    model: '',
    frameSize: '',
    weight: '',
    features: [] as string[],
  });

  const features = [
    'Helmet Included', 'Lock Included', 'Lights', 'Basket',
    'Water Bottle Holder', 'Repair Kit', 'Phone Mount', 'Mudguards'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Bike className="h-4 w-4" />
            Bicycle Type
          </div>
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="mountain">Mountain Bike</option>
          <option value="road">Road Bike</option>
          <option value="hybrid">Hybrid Bike</option>
          <option value="electric">Electric Bike</option>
          <option value="city">City Bike</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="e.g., Trek"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Frame Size
            </div>
          </label>
          <input
            type="text"
            value={formData.frameSize}
            onChange={(e) => setFormData({ ...formData, frameSize: e.target.value })}
            placeholder="e.g., 54cm"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4" />
              Weight
            </div>
          </label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 12kg"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Features & Accessories</label>
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

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(formData)}>Continue</Button>
      </div>
    </div>
  );
}