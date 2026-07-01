import { Wifi, Coffee, Car, Bike } from 'lucide-react';

interface AmenityIconProps {
  name: string;
}

export function AmenityIcon({ name }: AmenityIconProps) {
  if (name.includes('WiFi')) return <Wifi className="h-5 w-5 mr-2 text-blue-500" />;
  if (name.includes('Kitchen')) return <Coffee className="h-5 w-5 mr-2 text-blue-500" />;
  if (name.includes('Vehicle')) return <Car className="h-5 w-5 mr-2 text-blue-500" />;
  if (name.includes('Bicycle')) return <Bike className="h-5 w-5 mr-2 text-blue-500" />;
  return null;
}