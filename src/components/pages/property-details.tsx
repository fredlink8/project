import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '../ui/back-button';
import { PropertyHeader } from '../property/property-header';
import { PropertyGallery } from '../property/property-gallery';
import { PropertyAmenities } from '../property/property-amenities';
import { PropertyDescription } from '../property/property-description';
import { PropertyPricing } from '../property/property-pricing';
import { PropertyMap } from '../map/property-map';
import { MobilityAssets } from '../property/mobility-assets';
import { ReviewsSection } from '../property/reviews-section';
import { sampleProperties } from '../../lib/data/sample-properties';
import { sampleReviews } from '../../lib/data/sample-reviews';
import { useAuth } from '../../hooks/use-auth';

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const property = sampleProperties.find(p => p.id === id);
  const reviews = sampleReviews[id as keyof typeof sampleReviews] || [];

  if (!property) {
    return <div>Property not found</div>;
  }

  // A user can review if they're logged in and haven't already reviewed
  const canReview = user && !reviews.some(review => review.author === user.name);

  return (
    <div className="max-w-4xl mx-auto relative">
      <BackButton onClick={() => navigate('/explore')} />
      
      <div className="space-y-8">
        <PropertyGallery images={property.images} title={property.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyHeader
              title={property.title}
              rating={property.rating}
              address={property.address}
              capacity={property.capacity}
            />
            
            <PropertyDescription description={property.description} />
            
            <PropertyAmenities amenities={property.amenities} />
            
            <div className="h-[300px] rounded-lg overflow-hidden">
              <PropertyMap properties={[property]} />
            </div>
            
            <MobilityAssets propertyId={property.id} />

            <ReviewsSection
              propertyId={property.id}
              reviews={reviews}
              canReview={canReview}
            />
          </div>
          
          <div className="lg:col-span-1">
            <PropertyPricing
              propertyId={property.id}
              pricePerDay={property.price_per_day}
              rating={property.rating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}