import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div 
        className="relative h-[500px] -mx-4 sm:-mx-6 lg:-mx-8 mb-12"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            SAMAAS
          </h1>
          <p className="text-lg max-w-2xl">
            Find comfortable accommodations across Africa. Our hosts also offer convenient
            mobility options like vehicles and bicycles, and more to enhance your stay.
          </p>
        </div>
      </div>

      <div className="text-center">
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600"
            onClick={() => navigate('/explore')}
          >
            <Search className="mr-2 h-5 w-5" />
            Explore Properties
          </Button>
          <Button 
            size="lg" 
            className="flex items-center bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
            onClick={() => navigate('/book')}
          >
            Book Accommodation
          </Button>
          <Button 
            size="lg" 
            className="flex items-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            onClick={() => navigate('/host')}
          >
            Become a Host
          </Button>
        </div>
        <div className="mt-8 text-sm text-gray-600">
          * Mobility services like vehicles, bicycles, and quad bikes are available as add-ons from participating hosts
        </div>
      </div>
    </div>
  );
}