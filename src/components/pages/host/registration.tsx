import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../ui/back-button';
import { AccommodationForm } from './asset-forms/accommodation-form';
import { VehicleForm } from './asset-forms/vehicle-form';
import { BicycleForm } from './asset-forms/bicycle-form';
import { QuadBikeForm } from './asset-forms/quad-bike-form';
import { CustomMobilityForm } from './asset-forms/custom-mobility-form';
import { LocationStep } from './steps/location-step';
import { PhotosStep } from './steps/photos-step';
import { PricingStep } from './steps/pricing-step';
import { PaymentSettings } from './steps/payment-settings';

type AssetType = 'accommodation' | 'vehicle' | 'bicycle' | 'quad_bike' | 'custom' | null;
type Step = 'select' | 'details' | 'location' | 'photos' | 'pricing' | 'payment';

export function HostRegistration() {
  const navigate = useNavigate();
  const [assetType, setAssetType] = useState<AssetType>(null);
  const [step, setStep] = useState<Step>('select');
  const [formData, setFormData] = useState({});

  const handleBack = () => {
    switch (step) {
      case 'payment':
        setStep('pricing');
        break;
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
        setStep('select');
        setAssetType(null);
        break;
      default:
        navigate('/host');
    }
  };

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    switch (step) {
      case 'select':
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
        setStep('payment');
        break;
      case 'payment':
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
              {/* ... existing asset type selection buttons ... */}
            </div>
          </div>
        );

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

      case 'payment':
        return (
          <PaymentSettings
            onBack={handleBack}
            onNext={handleNext}
            initialData={formData}
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <BackButton onClick={handleBack} />
      
      <h1 className="text-3xl font-bold mb-8">List Your {assetType ? assetType.charAt(0).toUpperCase() + assetType.slice(1) : 'Asset'}</h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['select', 'details', 'location', 'photos', 'pricing', 'payment'].map((s, index) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ['select', 'details', 'location', 'photos', 'pricing', 'payment'].indexOf(step) >= index
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