import { useState } from 'react';
import { Button } from '../ui/button';

interface VehicleBookingModalProps {
  asset: {
    name: string;
    pricePerDay: number;
    driverPrice?: number;
  };
  onClose: () => void;
}

export function VehicleBookingModal({ asset, onClose }: VehicleBookingModalProps) {
  const [withDriver, setWithDriver] = useState(false);
  const basePrice = asset.pricePerDay;
  const driverPrice = asset.driverPrice || 50; // Default driver price if not specified
  const totalPrice = withDriver ? basePrice + driverPrice : basePrice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Book {asset.name}</h3>
        
        <div className="mb-6">
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={withDriver}
              onChange={(e) => setWithDriver(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Include a driver (+${driverPrice}/day)</span>
          </label>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Vehicle rental</span>
              <span>${basePrice}/day</span>
            </div>
            {withDriver && (
              <div className="flex justify-between mb-2">
                <span>Driver service</span>
                <span>${driverPrice}/day</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice}/day</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            alert('Booking request sent! We will contact you shortly.');
            onClose();
          }}>
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}