import { useState } from 'react';
import { CreditCard, Wallet, Bitcoin, Phone } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';

interface PaymentSettingsProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
}

type PaymentMethod = 'card' | 'mobile' | 'crypto' | 'chippercash';

export function PaymentSettings({ onBack, onNext, initialData = {} }: PaymentSettingsProps) {
  const [selectedMethods, setSelectedMethods] = useState<PaymentMethod[]>(
    initialData.paymentMethods || []
  );
  const [methodDetails, setMethodDetails] = useState<Record<string, any>>(
    initialData.methodDetails || {}
  );

  const paymentMethods = [
    { id: 'card' as const, label: 'Card', icon: CreditCard },
    { id: 'mobile' as const, label: 'Mobile Money', icon: Phone },
    { id: 'crypto' as const, label: 'Crypto', icon: Bitcoin },
    { id: 'chippercash' as const, label: 'ChipperCash', icon: Wallet },
  ];

  const mobileMoneyProviders = [
    { id: 'mpesa', name: 'M-Pesa', countries: ['Kenya', 'Tanzania'] },
    { id: 'mtn', name: 'MTN Mobile Money', countries: ['Ghana', 'Uganda', 'Rwanda'] },
    { id: 'airtel', name: 'Airtel Money', countries: ['Kenya', 'Uganda', 'Tanzania'] },
    { id: 'orange', name: 'Orange Money', countries: ['Senegal', 'Mali', 'Burkina Faso'] }
  ];

  const toggleMethod = (method: PaymentMethod) => {
    setSelectedMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const updateMethodDetails = (method: PaymentMethod, details: any) => {
    setMethodDetails(prev => ({
      ...prev,
      [method]: { ...prev[method], ...details }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that each selected method has required details
    const isValid = selectedMethods.every(method => {
      const details = methodDetails[method];
      switch (method) {
        case 'card':
          return details?.accountNumber && details?.bankName;
        case 'mobile':
          return details?.provider && details?.phoneNumber;
        case 'crypto':
          return details?.network && details?.address;
        case 'chippercash':
          return details?.tag;
        default:
          return false;
      }
    });

    if (!isValid) {
      alert('Please fill in all required fields for selected payment methods');
      return;
    }

    onNext({
      paymentMethods: selectedMethods,
      methodDetails
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
        <p className="text-gray-600 mb-6">
          Choose how you want to receive payments from guests. You can select multiple payment methods.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paymentMethods.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggleMethod(id)}
            className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
              selectedMethods.includes(id) 
                ? 'bg-blue-50 border-blue-500 border-2' 
                : 'border'
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {selectedMethods.map(method => (
        <div key={method} className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">
            {paymentMethods.find(m => m.id === method)?.label} Details
          </h3>

          {method === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <Input
                  type="text"
                  required
                  value={methodDetails[method]?.bankName || ''}
                  onChange={e => updateMethodDetails(method, { bankName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <Input
                  type="text"
                  required
                  value={methodDetails[method]?.accountNumber || ''}
                  onChange={e => updateMethodDetails(method, { accountNumber: e.target.value })}
                />
              </div>
            </div>
          )}

          {method === 'mobile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Money Provider
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={methodDetails[method]?.provider || ''}
                  onChange={e => updateMethodDetails(method, { provider: e.target.value })}
                  required
                >
                  <option value="">Select a provider</option>
                  {mobileMoneyProviders.map(({ id, name, countries }) => (
                    <option key={id} value={id}>
                      {name} ({countries.join(', ')})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="Enter your mobile money number"
                  value={methodDetails[method]?.phoneNumber || ''}
                  onChange={e => updateMethodDetails(method, { phoneNumber: e.target.value })}
                />
              </div>
            </div>
          )}

          {method === 'crypto' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Network
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={methodDetails[method]?.network || ''}
                  onChange={e => updateMethodDetails(method, { network: e.target.value })}
                  required
                >
                  <option value="">Select network</option>
                  <option value="erc20">Ethereum (ERC20)</option>
                  <option value="trc20">Tron (TRC20)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Address
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Enter your wallet address"
                  value={methodDetails[method]?.address || ''}
                  onChange={e => updateMethodDetails(method, { address: e.target.value })}
                />
              </div>
            </div>
          )}

          {method === 'chippercash' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ChipperCash Tag
              </label>
              <Input
                type="text"
                required
                placeholder="@yourtag"
                value={methodDetails[method]?.tag || ''}
                onChange={e => updateMethodDetails(method, { tag: e.target.value })}
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter your ChipperCash tag without the @ symbol
              </p>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={selectedMethods.length === 0}
        >
          Continue
        </Button>
      </div>
    </form>
  );
}