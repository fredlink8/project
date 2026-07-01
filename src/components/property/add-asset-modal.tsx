import { useState } from 'react';
import { Button } from '../ui/button';
import { Car, Bike, Truck, Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AddAssetModalProps {
  propertyId: string;
  onClose: () => void;
  onAssetAdded: () => void;
}

export function AddAssetModal({ propertyId, onClose, onAssetAdded }: AddAssetModalProps) {
  const [assetType, setAssetType] = useState<'vehicle' | 'bicycle' | 'quad_bike'>('vehicle');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerDay: '',
    driverPrice: '',
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('mobility_assets')
        .insert({
          property_id: propertyId,
          type: assetType,
          name: formData.name,
          description: formData.description,
          price_per_day: parseFloat(formData.pricePerDay),
          driver_price: assetType === 'vehicle' ? parseFloat(formData.driverPrice) : null,
          image: formData.image,
        });

      if (error) throw error;
      
      onAssetAdded();
      onClose();
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('Failed to add asset. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Mobility Asset</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setAssetType('vehicle')}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
                assetType === 'vehicle' ? 'bg-blue-50 border-blue-500 border-2' : 'border'
              }`}
            >
              <Car className="h-6 w-6" />
              <span className="text-sm">Vehicle</span>
            </button>
            <button
              type="button"
              onClick={() => setAssetType('bicycle')}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
                assetType === 'bicycle' ? 'bg-blue-50 border-blue-500 border-2' : 'border'
              }`}
            >
              <Bike className="h-6 w-6" />
              <span className="text-sm">Bicycle</span>
            </button>
            <button
              type="button"
              onClick={() => setAssetType('quad_bike')}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
                assetType === 'quad_bike' ? 'bg-blue-50 border-blue-500 border-2' : 'border'
              }`}
            >
              <Truck className="h-6 w-6" />
              <span className="text-sm">Quad Bike</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`e.g., ${
                assetType === 'vehicle' ? 'Toyota RAV4' :
                assetType === 'bicycle' ? 'Mountain Bike' : 'Yamaha Raptor'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your asset..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Day ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {assetType === 'vehicle' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.driverPrice}
                  onChange={(e) => setFormData({ ...formData, driverPrice: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Upload className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}