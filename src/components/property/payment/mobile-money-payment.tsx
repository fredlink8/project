import { useState } from 'react';
import { Input } from '../../ui/input';

interface MobileMoneyPaymentProps {
  onChange: (data: any) => void;
}

export function MobileMoneyPayment({ onChange }: MobileMoneyPaymentProps) {
  const [provider, setProvider] = useState('mpesa');

  const providers = {
    mpesa: { name: 'M-Pesa', countries: ['Kenya', 'Tanzania'] },
    mtn: { name: 'MTN Mobile Money', countries: ['Ghana', 'Uganda', 'Rwanda'] },
    airtel: { name: 'Airtel Money', countries: ['Kenya', 'Uganda', 'Tanzania'] },
    orange: { name: 'Orange Money', countries: ['Senegal', 'Mali', 'Burkina Faso'] }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Money Provider
        </label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={provider}
          onChange={(e) => {
            setProvider(e.target.value);
            onChange({ method: 'mobile', provider: e.target.value });
          }}
        >
          {Object.entries(providers).map(([id, { name, countries }]) => (
            <option key={id} value={id}>
              {name} ({countries.join(', ')})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number
        </label>
        <Input
          type="tel"
          required
          placeholder="Enter your mobile number"
          onChange={(e) => onChange({ 
            method: 'mobile', 
            provider,
            phoneNumber: e.target.value 
          })}
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter the number registered with your mobile money account
        </p>
      </div>
    </div>
  );
}