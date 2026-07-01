import { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDistance } from 'date-fns';
import { ChatButton } from './chat-button';
import { BookingModal } from './booking-modal';

interface PropertyPricingProps {
  propertyId: string;
  pricePerDay: number;
  rating?: number;
}

export function PropertyPricing({ propertyId, pricePerDay, rating }: PropertyPricingProps) {
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const calculateTotal = () => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const days = formatDistance(
      new Date(dates.checkOut),
      new Date(dates.checkIn)
    ).split(' ')[0];
    return pricePerDay * parseInt(days);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border sticky top-4 space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${pricePerDay}</span>
        <span className="text-gray-600">per night</span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline-block h-4 w-4 mr-1" />
              Check-in
            </label>
            <input
              type="date"
              value={dates.checkIn}
              onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline-block h-4 w-4 mr-1" />
              Check-out
            </label>
            <input
              type="date"
              value={dates.checkOut}
              onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Users className="inline-block h-4 w-4 mr-1" />
            Guests
          </label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {dates.checkIn && dates.checkOut && (
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span className="font-semibold">${calculateTotal()}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button 
            className="w-full" 
            onClick={() => setShowBookingModal(true)}
            disabled={!dates.checkIn || !dates.checkOut}
          >
            Reserve Now
          </Button>

          <ChatButton propertyId={propertyId} />
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          propertyId={propertyId}
          pricePerDay={pricePerDay}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}