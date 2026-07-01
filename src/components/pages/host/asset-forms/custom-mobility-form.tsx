import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Tag, Gauge, Calendar } from 'lucide-react';

interface CustomMobilityFormProps {
  onBack: () => void;
  onNext: (data: any) => void;
}

export function CustomMobilityForm({ onBack, onNext }: CustomMobilityFormProps) {
  const [formData, setFormData] = useState({
    customType: '',
    name: '',
    description: '',
    specifications: '',
    features: [] as string[],
    requiresOperator: false,
    operatorPrice: 50,
  });

  const features = [
    'Safety Equipment Included',
    'Training Required',
    'Insurance Included',
    'Maintenance Included',
    'GPS Tracking',
    'Delivery Available',
    'Setup Assistance',
    'Technical Support'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Type of Mobility Asset
          </div>
        </label>
        <Input
          type="text"
          value={formData.customType}
          onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
          placeholder="e.g., Electric Scooter, Jet Ski, Horse"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name/Model
        </label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Xiaomi M365 Pro, Sea-Doo Spark"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your mobility asset..."
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Specifications
          </div>
        </label>
        <Input
          type="text"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          placeholder="e.g., Range, Speed, Weight Capacity"
        />
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
            checked={formData.requiresOperator}
            onChange={(e) => setFormData({ ...formData, requiresOperator: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Requires trained operator/instructor</span>
        </label>

        {formData.requiresOperator && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operator Price per Day ($)
            </label>
            <Input
              type="number"
              min="0"
              value={formData.operatorPrice}
              onChange={(e) => setFormData({ ...formData, operatorPrice: parseInt(e.target.value) })}
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