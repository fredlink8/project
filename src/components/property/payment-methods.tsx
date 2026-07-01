import { useState } from 'react';
import { CreditCard, Wallet, Bitcoin } from 'lucide-react';
import { Input } from '../ui/input';

interface PaymentMethodsProps {
  onPaymentDataChange: (data: any) => void;
}

export function PaymentMethods({ onPaymentDataChange }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'crypto' | 'chippercash'>('card');

  const handleDataChange = (data: any) => {
    onPaymentDataChange({ method: selectedMethod, ...data });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setSelectedMethod('card')}
          className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
            selectedMethod === 'card' ? 'bg-blue-50 border-blue-500 border-2' : 'border'
          }`}
        >
          <CreditCard className="h-6 w-6" />
          <span className="text-sm">Card</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedMethod('crypto')}
          className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
            selectedMethod === 'crypto' ? 'bg-blue-50 border-blue-500 border-2' : 'border'
          }`}
        >
          <Bitcoin className="h-6 w-6" />
          <span className="text-sm">Crypto</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedMethod('chippercash')}
          className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
            selectedMethod === 'chippercash' ? 'bg-blue-50 border-blue-500 border-2' : 'border'
          }`}
        >
          <Wallet className="h-6 w-6" />
          <span className="text-sm">ChipperCash</span>
        </button>
      </div>

      {selectedMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <Input
              type="text"
              required
              placeholder="1234 5678 9012 3456"
              onChange={(e) => handleDataChange({ cardNumber: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <Input
                type="text"
                required
                placeholder="MM/YY"
                onChange={(e) => handleDataChange({ expiryDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <Input
                type="text"
                required
                placeholder="123"
                onChange={(e) => handleDataChange({ cvv: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'crypto' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Network
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => handleDataChange({ network: e.target.value })}
            >
              <option value="erc20">Ethereum (ERC20)</option>
              <option value="trc20">Tron (TRC20)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              USDT Address
            </label>
            <Input
              type="text"
              required
              placeholder="Enter your USDT address"
              onChange={(e) => handleDataChange({ cryptoAddress: e.target.value })}
            />
          </div>
        </div>
      )}

      {selectedMethod === 'chippercash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ChipperCash Tag
          </label>
          <Input
            type="text"
            required
            placeholder="@yourtag"
            onChange={(e) => handleDataChange({ chipperTag: e.target.value })}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter your ChipperCash tag without the @ symbol
          </p>
        </div>
      )}
    </div>
  );
}