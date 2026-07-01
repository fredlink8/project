import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Calendar, Users, MapPin, Search } from 'lucide-react';
import { SearchResults } from './book/search-results';
import { BackButton } from '../ui/back-button';
import { sampleProperties } from '../../lib/data/sample-properties';
import { filterProperties } from '../../lib/utils/property-filters';
import { Input } from '../ui/input';

export function BookAccommodation() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'search' | 'results'>('search');
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);

  const handleBack = () => {
    if (step === 'results') {
      setStep('search');
    } else {
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = filterProperties(sampleProperties, {
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests
    });
    
    setFilteredProperties(filtered);
    setStep('results');
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <BackButton onClick={handleBack} />
      
      <h1 className="text-3xl font-bold mb-8">Book Your Stay</h1>
      
      {step === 'search' ? (
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
              </label>
              <Input
                type="text"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                placeholder="Where are you going?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Guests
                </div>
              </label>
              <Input
                type="number"
                min="1"
                value={searchParams.guests}
                onChange={(e) => setSearchParams({ ...searchParams, guests: parseInt(e.target.value) })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check-in
                </div>
              </label>
              <Input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check-out
                </div>
              </label>
              <Input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-6">
            <Search className="h-4 w-4 mr-2" />
            Search Available Properties
          </Button>
        </form>
      ) : (
        <SearchResults
          searchParams={searchParams}
          properties={filteredProperties}
          onBack={handleBack}
          onSelectProperty={(id) => navigate(`/property/${id}`)}
        />
      )}
    </div>
  );
}