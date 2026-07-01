import { useState } from 'react';
import { Car, Bike, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { VehicleBookingModal } from './vehicle-booking-modal';
import { sampleMobilityAssets } from '../../lib/data/sample-mobility-assets';

interface MobilityAssetsProps {
  propertyId: string;
}

export function MobilityAssets({ propertyId }: MobilityAssetsProps) {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const assets = sampleMobilityAssets[propertyId as keyof typeof sampleMobilityAssets] || [];

  if (assets.length === 0) return null;

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-2xl font-semibold mb-4">Available Mobility Assets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <div key={asset.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <img
              src={asset.image}
              alt={asset.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center mb-2">
              {asset.type === 'vehicle' && <Car className="h-5 w-5 mr-2 text-blue-500" />}
              {asset.type === 'bicycle' && <Bike className="h-5 w-5 mr-2 text-green-500" />}
              {asset.type === 'quad_bike' && <Truck className="h-5 w-5 mr-2 text-orange-500" />}
              <h3 className="text-lg font-semibold">{asset.name}</h3>
            </div>
            <p className="text-gray-600 mb-3">{asset.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">${asset.pricePerDay}/day</span>
              <Button
                variant="outline"
                onClick={() => setSelectedAsset(asset)}
              >
                Book {asset.type === 'quad_bike' ? 'Quad Bike' : asset.type}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedAsset && (
        selectedAsset.type === 'vehicle' ? (
          <VehicleBookingModal
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
          />
        ) : (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Book {selectedAsset.name}</h3>
              <p className="mb-4">
                Great choice! This {selectedAsset.type} is available for booking.
                Please select your dates and we'll confirm availability.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAsset(null)}
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  alert('Booking request sent! We will contact you shortly.');
                  setSelectedAsset(null);
                }}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}