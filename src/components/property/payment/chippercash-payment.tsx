import { Input } from '../../ui/input';

interface ChipperCashPaymentProps {
  onChange: (data: any) => void;
}

export function ChipperCashPayment({ onChange }: ChipperCashPaymentProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        ChipperCash Tag
      </label>
      <Input
        type="text"
        required
        placeholder="@yourtag"
        onChange={(e) => onChange({ method: 'chippercash', chipperTag: e.target.value })}
      />
      <p className="mt-1 text-sm text-gray-500">
        Enter your ChipperCash tag without the @ symbol
      </p>
    </div>
  );
}