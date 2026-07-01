import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { PaymentMethods } from './payment/payment-methods';  // Updated import path

interface BookingModalProps {
  propertyId: string;
  pricePerDay: number;
  onClose: () => void;
}

export function BookingModal({ propertyId, pricePerDay, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'payment' | 'confirmation'>('payment');
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          {step === 'payment' ? 'Payment Information' : 'Booking Confirmed!'}
        </h2>

        {step === 'payment' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentMethods onPaymentDataChange={setPaymentData} />

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!paymentData}>
                Confirm Payment
              </Button>
            </div>
          </form>
        )}

        {step === 'confirmation' && (
          <div className="text-center">
            <div className="mb-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your booking has been confirmed. You can now message the host for any additional details.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}