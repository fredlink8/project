import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Bitcoin, DollarSign } from 'lucide-react';

interface PaymentStepProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
}

export function PaymentStep({ onBack, onNext, initialData = {} }: PaymentStepProps) {
  const [formData, setFormData] = useState({
    paymentMethod: initialData.paymentMethod || 'bank_card',
    crypto: {
      usdt: {
        address: initialData.crypto?.usdt?.address || '',
        network: initialData.crypto?.usdt?.network || 'erc20'
      },
      chippercash: {
        tag: initialData.crypto?.chippercash?.tag || ''
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <p className="text-gray-600 mb-6">
          Choose how you want to receive payments from guests.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setFormData({ ...formData, paymentMethod: 'crypto' })}
        className={`p-4 border rounded-lg text-left w-full ${
          formData.paymentMethod === 'crypto' 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200'
        }`}
      >
        <Bitcoin className="h-5 w-5 mb-2 text-blue-600" />
        <div className="font-medium">Crypto</div>
        <div className="text-sm text-gray-600">USDT, ChipperCash</div>
      </button>

      {formData.paymentMethod === 'crypto' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">USDT Wallet</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                <select
                  value={formData.crypto.usdt.network}
                  onChange={(e) => setFormData({
                    ...formData,
                    crypto: {
                      ...formData.crypto,
                      usdt: { ...formData.crypto.usdt, network: e.target.value }
                    }
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="erc20">Ethereum (ERC20)</option>
                  <option value="trc20">Tron (TRC20)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
                <Input
                  type="text"
                  value={formData.crypto.usdt.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    crypto: {
                      ...formData.crypto,
                      usdt: { ...formData.crypto.usdt, address: e.target.value }
                    }
                  })}
                  placeholder={formData.crypto.usdt.network === 'erc20' 
                    ? '0x...' 
                    : 'T...'
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">ChipperCash</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ChipperCash Tag</label>
              <Input
                type="text"
                value={formData.crypto.chippercash.tag}
                onChange={(e) => setFormData({
                  ...formData,
                  crypto: {
                    ...formData.crypto,
                    chippercash: { tag: e.target.value }
                  }
                })}
                placeholder="@yourtag"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter your ChipperCash tag without the @ symbol
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}