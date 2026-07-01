import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { DollarSign, Percent } from 'lucide-react';

interface PricingStepProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
  assetType: string;
}

export function PricingStep({ onBack, onNext, initialData = {}, assetType }: PricingStepProps) {
  const [formData, setFormData] = useState({
    basePrice: initialData.basePrice || '',
    cleaningFee: initialData.cleaningFee || '',
    securityDeposit: initialData.securityDeposit || '',
    discounts: {
      weekly: initialData.discounts?.weekly || '',
      monthly: initialData.discounts?.monthly || '',
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Set your pricing</h2>
        <p className="text-gray-600 mb-6">
          Set competitive prices to attract guests. You can always change them later.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Base price per day
            </div>
          </label>
          <Input
            type="number"
            min="0"
            required
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
            placeholder="0"
          />
        </div>

        {assetType === 'accommodation' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cleaning fee
            </label>
            <Input
              type="number"
              min="0"
              value={formData.cleaningFee}
              onChange={(e) => setFormData({ ...formData, cleaningFee: e.target.value })}
              placeholder="0"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security deposit
          </label>
          <Input
            type="number"
            min="0"
            value={formData.securityDeposit}
            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
            placeholder="0"
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Discounts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Weekly discount
                </div>
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.discounts.weekly}
                onChange={(e) => setFormData({
                  ...formData,
                  discounts: { ...formData.discounts, weekly: e.target.value }
                })}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Monthly discount
                </div>
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.discounts.monthly}
                onChange={(e) => setFormData({
                  ...formData,
                  discounts: { ...formData.discounts, monthly: e.target.value }
                })}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Finish
        </Button>
      </div>
    </form>
  );
}