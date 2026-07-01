import { Input } from '../../ui/input';

interface CardPaymentProps {
  onChange: (data: any) => void;
}

export function CardPayment({ onChange }: CardPaymentProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <Input
          type="text"
          required
          placeholder="1234 5678 9012 3456"
          onChange={(e) => onChange({ method: 'card', cardNumber: e.target.value })}
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
            onChange={(e) => onChange({ method: 'card', expiryDate: e.target.value })}
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
            onChange={(e) => onChange({ method: 'card', cvv: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}