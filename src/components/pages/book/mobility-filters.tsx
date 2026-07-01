import { Car, Bike, Truck } from 'lucide-react';

interface MobilityFiltersProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

export function MobilityFilters({ selectedTypes, onChange }: MobilityFiltersProps) {
  const mobilityOptions = [
    { type: 'vehicle', icon: Car, label: 'Vehicle' },
    { type: 'bicycle', icon: Bike, label: 'Bicycle' },
    { type: 'quad_bike', icon: Truck, label: 'Quad Bike' }
  ];

  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onChange(newTypes);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Mobility Options</h3>
      <div className="flex flex-wrap gap-2">
        {mobilityOptions.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm
              ${selectedTypes.includes(type)
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-gray-50 text-gray-700 border-gray-200'
              } border hover:bg-blue-50 transition-colors`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}