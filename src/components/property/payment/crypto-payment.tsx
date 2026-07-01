import { Input } from '../../ui/input';

interface CryptoPaymentProps {
  onChange: (data: any) => void;
}

export function CryptoPayment({ onChange }: CryptoPaymentProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Network
        </label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => onChange({ method: 'crypto', network: e.target.value })}
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
          onChange={(e) => onChange({ method: 'crypto', cryptoAddress: e.target.value })}
        />
      </div>
    </div>
  );
}