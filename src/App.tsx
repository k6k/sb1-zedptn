import React, { useState, useCallback, useEffect } from 'react';
import { Calculator, DollarSign, MapPin, Utensils, Coffee, Wine, Car, Scissors, Building2, MoreHorizontal, Truck } from 'lucide-react';
import { VenueType, ServiceQuality, Location, locations, calculateTip, formatCurrency, getTipSuggestions, getServiceEmoji, getVenueLabel } from './utils';
import TipButton from './components/TipButton';
import NumberInput from './components/NumberInput';

function App() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [venueType, setVenueType] = useState<VenueType>('restaurant');
  const [customTipPercent, setCustomTipPercent] = useState<string>('');
  const [selectedTipPercent, setSelectedTipPercent] = useState<number>(0);
  const [location, setLocation] = useState<Location>(locations[0]);
  const [serviceQuality, setServiceQuality] = useState<ServiceQuality>('good');

  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      const locationData = locations.find(loc => loc.name === savedLocation);
      if (locationData) setLocation(locationData);
    }
  }, []);

  const handleVenueChange = useCallback((type: VenueType) => {
    setVenueType(type);
    setSelectedTipPercent(0);
    setCustomTipPercent('');
  }, []);

  const handleTipSelect = useCallback((percent: number) => {
    setSelectedTipPercent(percent);
    setCustomTipPercent('');
  }, []);

  const handleLocationChange = useCallback((locationName: string) => {
    const newLocation = locations.find(loc => loc.name === locationName);
    if (newLocation) {
      setLocation(newLocation);
      localStorage.setItem('selectedLocation', locationName);
    }
  }, []);

  const getVenueIcon = (type: VenueType) => {
    const icons = {
      restaurant: Utensils,
      cafe: Coffee,
      bar: Wine,
      delivery: Truck,
      haircut: Scissors,
      taxi: Car,
      hotel: Building2,
      other: MoreHorizontal
    };
    const Icon = icons[type];
    return <Icon className="w-5 h-5" />;
  };

  const tipAmount = calculateTip(
    parseFloat(billAmount) || 0,
    customTipPercent ? parseFloat(customTipPercent) : selectedTipPercent
  );
  
  const taxAmount = (parseFloat(billAmount) || 0) * location.taxRate;
  const total = (parseFloat(billAmount) || 0) + tipAmount + taxAmount;
  const suggestedTips = getTipSuggestions(venueType, serviceQuality);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Calculator className="w-8 h-8 text-[#FF5A5F]" />
          <h1 className="text-3xl font-bold text-gray-900">Smart Tip Calculator</h1>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bill Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <NumberInput
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none text-lg transition-shadow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(['restaurant', 'cafe', 'bar', 'delivery', 'haircut', 'taxi', 'hotel', 'other'] as VenueType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleVenueChange(type)}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                    venueType === type 
                      ? 'border-[#FF5A5F] bg-[#FFF8F6] text-[#FF5A5F]' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {getVenueIcon(type)}
                  <span className="text-sm font-medium mt-2">{getVenueLabel(type)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Quality</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(['outstanding', 'good', 'average', 'poor'] as ServiceQuality[]).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setServiceQuality(quality)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    serviceQuality === quality
                      ? 'border-[#FF5A5F] bg-[#FFF8F6] text-[#FF5A5F]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <span className="text-xl">{getServiceEmoji(quality)}</span>
                  <span className="font-medium capitalize">{quality}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <select
              value={location.name}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none text-gray-700 appearance-none bg-white transition-shadow"
            >
              {locations.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name} ({(loc.taxRate * 100).toFixed(1)}% {loc.taxName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tip Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {suggestedTips.map((percent) => (
                <TipButton
                  key={percent}
                  percent={percent}
                  selected={selectedTipPercent === percent && !customTipPercent}
                  onClick={() => handleTipSelect(percent)}
                />
              ))}
            </div>
            <div className="relative mt-3">
              <input
                type="number"
                value={customTipPercent}
                onChange={(e) => {
                  setCustomTipPercent(e.target.value);
                  setSelectedTipPercent(0);
                }}
                placeholder="Custom tip %"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none transition-shadow"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location.name} ({(location.taxRate * 100).toFixed(1)}% {location.taxName})</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(parseFloat(billAmount) || 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax ({(location.taxRate * 100).toFixed(1)}%)</span>
                <span className="font-medium">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-[#FF5A5F]">
                <span>Tip</span>
                <span className="font-medium">{formatCurrency(tipAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-900 text-xl font-bold pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;