import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Car, Bike, Truck, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { BackButton } from '../ui/back-button';
import { AccommodationForm } from './host/asset-forms/accommodation-form';
import { VehicleForm } from './host/asset-forms/vehicle-form';
import { BicycleForm } from './host/asset-forms/bicycle-form';
import { QuadBikeForm } from './host/asset-forms/quad-bike-form';
import { CustomMobilityForm } from './host/asset-forms/custom-mobility-form';
import { LocationStep } from './host/steps/location-step';
import { PhotosStep } from './host/steps/photos-step';
import { PricingStep } from './host/steps/pricing-step';
import { IdentityStep } from './host/steps/identity-step';
import { PaymentStep } from './host/steps/payment-step';

type AssetType = 'accommodation' | 'vehicle' | 'bicycle' | 'quad_bike' | 'custom' | null;
type Step = 'select' | 'identity' | 'payment' | 'details' | 'location' | 'photos' | 'pricing';

export function BecomeHost() {
  const navigate = useNavigate();
  const [assetType, setAssetType] = useState<AssetType>(null);
  const [step, setStep] = useState<Step>('select');
  const [formData, setFormData] = useState({});

  const handleBack = () => {
    switch (step) {
      case 'pricing':
        setStep('photos');
        break;
      case 'photos':
        setStep('location');
        break;
      case 'location':
        setStep('details');
        break;
      case 'details':
        setStep('payment');
        break;
      case 'payment':
        setStep('identity');
        break;
      case 'identity':
        setStep('select');
        setAssetType(null);
        break;
      default:
        navigate('/');
    }
  };

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    switch (step) {
      case 'select':
        setStep('identity');
        break;
      case 'identity':
        setStep('payment');
        break;
      case 'payment':
        setStep('details');
        break;
      case 'details':
        setStep('location');
        break;
      case 'location':
        setStep('photos');
        break;
      case 'photos':
        setStep('pricing');
        break;
      case 'pricing':
        // Submit the complete form data
        console.log('Final form data:', { ...formData, ...data });
        navigate('/host/success');
        break;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'select':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">What would you like to list?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setAssetType('accommodation');
                  handleNext({});
                }}
                className="p-6 text-left border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Building className="h-8 w-8 mb-2 text-blue-600" />
                <h3 className="font-semibold">Accommodation</h3>
                <p className="text-sm text-gray-600">List your property for guests to stay</p>
              </button>
              
              <button
                onClick={() => {
                  setAssetType('vehicle');
                  handleNext({});
                }}
                className="p-6 text-left border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Car className="h-8 w-8 mb-2 text-blue-600" />
                <h3 className="font-semibold">Vehicle</h3>
                <p className="text-sm text-gray-600">Rent out your car or other vehicles</p>
              </button>
              
              <button
                onClick={() => {
                  setAssetType('bicycle');
                  handleNext({});
                }}
                className="p-6 text-left border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Bike className="h-8 w-8 mb-2 text-blue-600" />
                <h3 className="font-semibold">Bicycle</h3>
                <p className="text-sm text-gray-600">Share your bikes with travelers</p>
              </button>
              
              <button
                onClick={() => {
                  setAssetType('quad_bike');
                  handleNext({});
                }}
                className="p-6 text-left border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Truck className="h-8 w-8 mb-2 text-blue-600" />
                <h3 className="font-semibold">Quad Bike</h3>
                <p className="text-sm text-gray-600">List your quad bikes for adventure seekers</p>
              </button>

              <button
                onClick={() => {
                  setAssetType('custom');
                  handleNext({});
                }}
                className="p-6 text-left border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Plus className="h-8 w-8 mb-2 text-blue-600" />
                <h3 className="font-semibold">Other Mobility Asset</h3>
                <p className="text-sm text-gray-600">List any other mobility equipment you have</p>
              </button>
            </div>
          </div>
        );

      case 'identity':
        return <IdentityStep onBack={handleBack} onNext={handleNext} initialData={formData} />;

      case 'payment':
        return <PaymentStep onBack={handleBack} onNext={handleNext} initialData={formData} />;

      case 'details':
        const FormComponent = {
          accommodation: AccommodationForm,
          vehicle: VehicleForm,
          bicycle: BicycleForm,
          quad_bike: QuadBikeForm,
          custom: CustomMobilityForm
        }[assetType!];
        return <FormComponent onBack={handleBack} onNext={handleNext} />;

      case 'location':
        return <LocationStep onBack={handleBack} onNext={handleNext} initialData={formData} />;

      case 'photos':
        return <PhotosStep onBack={handleBack} onNext={handleNext} initialData={formData} />;

      case 'pricing':
        return (
          <PricingStep
            onBack={handleBack}
            onNext={handleNext}
            initialData={formData}
            assetType={assetType!}
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <BackButton onClick={handleBack} />
      
      <h1 className="text-3xl font-bold mb-8">
        {step === 'select' 
          ? 'Become a Host' 
          : `List Your ${assetType ? assetType.charAt(0).toUpperCase() + assetType.slice(1) : 'Asset'}`}
      </h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['select', 'identity', 'payment', 'details', 'location', 'photos', 'pricing'].map((s, index) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ['select', 'identity', 'payment', 'details', 'location', 'photos', 'pricing'].indexOf(step) >= index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      
      {renderStep()}
    </div>
  );
}