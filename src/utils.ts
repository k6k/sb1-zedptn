export type ServiceQuality = 'outstanding' | 'good' | 'average' | 'poor';
export type VenueType = 'restaurant' | 'cafe' | 'bar' | 'delivery' | 'haircut' | 'taxi' | 'hotel' | 'other';

export interface Location {
  name: string;
  taxRate: number;
  taxName: string;
}

export const locations: Location[] = [
  { name: 'Ontario', taxRate: 0.13, taxName: 'HST' },
  { name: 'British Columbia', taxRate: 0.12, taxName: 'GST + PST' },
  { name: 'Alberta', taxRate: 0.05, taxName: 'GST' },
  { name: 'Quebec', taxRate: 0.14975, taxName: 'GST + QST' },
  { name: 'Manitoba', taxRate: 0.12, taxName: 'GST + PST' },
  { name: 'Saskatchewan', taxRate: 0.11, taxName: 'GST + PST' },
  { name: 'Nova Scotia', taxRate: 0.15, taxName: 'HST' },
  { name: 'New Brunswick', taxRate: 0.15, taxName: 'HST' },
  { name: 'PEI', taxRate: 0.15, taxName: 'HST' },
  { name: 'Newfoundland', taxRate: 0.15, taxName: 'HST' },
];

export const getServiceEmoji = (quality: ServiceQuality): string => {
  const emojis = {
    outstanding: '🌟',
    good: '😊',
    average: '😐',
    poor: '😕'
  };
  return emojis[quality];
};

export const getTipSuggestions = (venueType: VenueType, serviceQuality: ServiceQuality): number[] => {
  const baseTips = {
    restaurant: { outstanding: [20, 22, 25], good: [18, 20, 22], average: [15, 18, 20], poor: [10, 12, 15] },
    cafe: { outstanding: [18, 20, 22], good: [15, 18, 20], average: [12, 15, 18], poor: [8, 10, 12] },
    bar: { outstanding: [20, 22, 25], good: [18, 20, 22], average: [15, 18, 20], poor: [10, 12, 15] },
    delivery: { outstanding: [18, 20, 22], good: [15, 18, 20], average: [12, 15, 18], poor: [8, 10, 12] },
    haircut: { outstanding: [20, 22, 25], good: [18, 20, 22], average: [15, 18, 20], poor: [10, 12, 15] },
    taxi: { outstanding: [15, 18, 20], good: [12, 15, 18], average: [10, 12, 15], poor: [8, 10, 12] },
    hotel: { outstanding: [18, 20, 22], good: [15, 18, 20], average: [12, 15, 18], poor: [8, 10, 12] },
    other: { outstanding: [18, 20, 22], good: [15, 18, 20], average: [12, 15, 18], poor: [8, 10, 12] }
  };

  return baseTips[venueType][serviceQuality];
};

export const calculateTip = (amount: number, tipPercent: number): number => {
  return (amount * tipPercent) / 100;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export const getVenueLabel = (type: VenueType): string => {
  const labels = {
    restaurant: 'Sit-down Restaurant',
    cafe: 'Café',
    bar: 'Bar/Pub',
    delivery: 'Food Delivery',
    haircut: 'Hair Salon',
    taxi: 'Taxi/Rideshare',
    hotel: 'Hotel Service',
    other: 'Other Service'
  };
  return labels[type];
};