import { useState } from 'react';
import { CreditCard, Wallet, Bitcoin, Phone } from 'lucide-react';
import { CardPayment } from './card-payment';
import { CryptoPayment } from './crypto-payment';
import { ChipperCashPayment } from './chippercash-payment';
import { MobileMoneyPayment } from './mobile-money-payment';

interface PaymentMethodsProps {
  onPaymentDataChange: (data: any) => void;
}

type PaymentMethod = 'card' | 'crypto' | 'chippercash' | 'mobile';

export function PaymentMethods({ onPaymentDataChange }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

  const paymentMethods = [
    { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin },
    { id: 'chippercash', label: 'ChipperCash', icon: Wallet },
    { id: 'mobile', label: 'Mobile Money', icon: Phone },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {paymentMethods.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedMethod(id as PaymentMethod)}
            className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
              selectedMethod === id ? 'bg-blue-50 border-blue-500 border-2' : 'border'
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {selectedMethod === 'card' && <CardPayment onChange={onPaymentDataChange} />}
      {selectedMethod === 'crypto' && <CryptoPayment onChange={onPaymentDataChange} />}
      {selectedMethod === 'chippercash' && <ChipperCashPayment onChange={onPaymentDataChange} />}
      {selectedMethod === 'mobile' && <MobileMoneyPayment onChange={onPaymentDataChange} />}
    </div>
  );
}