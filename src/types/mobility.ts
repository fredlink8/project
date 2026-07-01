export type MobilityType = 'vehicle' | 'bicycle' | 'quad_bike' | 'custom';

export interface MobilityAsset {
  id: string;
  type: MobilityType;
  name: string;
  description: string;
  pricePerDay: number;
  driverPrice?: number;
  image: string;
  customType?: string;
  requiresOperator?: boolean;
  operatorPrice?: number;
}