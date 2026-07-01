import type { MobilityAsset } from '../types/mobility';

export const sampleMobilityAssets: Record<string, MobilityAsset[]> = {
  '1': [
    {
      id: 'v1',
      type: 'vehicle',
      name: 'Toyota RAV4',
      description: 'Modern SUV perfect for city and safari trips. Available with or without a driver.',
      pricePerDay: 75,
      driverPrice: 50,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80'
    },
    {
      id: 'b1',
      type: 'bicycle',
      name: 'Mountain Bike',
      description: 'Professional mountain bike for trail adventures',
      pricePerDay: 25,
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80'
    },
    {
      id: 'c1',
      type: 'custom',
      customType: 'Jet Ski',
      name: 'Sea-Doo Spark',
      description: 'Fun and agile watercraft for coastal adventures',
      pricePerDay: 120,
      requiresOperator: true,
      operatorPrice: 80,
      image: 'https://images.unsplash.com/photo-1626455613895-c790cf1d3876?auto=format&fit=crop&q=80'
    }
  ],
  '3': [
    {
      id: 'q1',
      type: 'quad_bike',
      name: 'Yamaha Raptor',
      description: 'Powerful quad bike for desert adventures',
      pricePerDay: 95,
      image: 'https://images.unsplash.com/photo-1513547554977-e17c0a0c5c65?auto=format&fit=crop&q=80'
    },
    {
      id: 'c2',
      type: 'custom',
      customType: 'Horse',
      name: 'Arabian Horse',
      description: 'Majestic Arabian horse for guided tours',
      pricePerDay: 150,
      requiresOperator: true,
      operatorPrice: 100,
      image: 'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?auto=format&fit=crop&q=80'
    }
  ]
};