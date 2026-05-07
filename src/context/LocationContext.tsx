import React, { createContext, useContext, useState, useEffect } from 'react';
import { Address } from '../types';

interface LocationContextType {
  currentAddress: Address | null;
  savedAddresses: Address[];
  isLoading: boolean;
  serviceability: {
    isAvailable: boolean;
    eta: string;
    message: string;
  };
  setCurrentAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  detectLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Mock warehouses in major Indian cities
const WAREHOUSES = [
  { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
  { lat: 28.6139, lng: 77.2090, city: 'Delhi' },
  { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
  { lat: 21.1702, lng: 72.8311, city: 'Surat' }, // Mentioned in request
  { lat: 18.5204, lng: 73.8567, city: 'Pune' },
  { lat: 22.7196, lng: 75.8577, city: 'Indore' },
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAddress, setCurrentAddressState] = useState<Address | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceability, setServiceability] = useState({
    isAvailable: false,
    eta: '--',
    message: 'Select location to check availability'
  });

  useEffect(() => {
    const saved = localStorage.getItem('user_addresses');
    if (saved) setSavedAddresses(JSON.parse(saved));

    const active = localStorage.getItem('active_address');
    if (active) {
      const addr = JSON.parse(active);
      setCurrentAddress(addr);
    }
  }, []);

  const checkServiceability = (lat: number, lng: number) => {
    let minDistance = Infinity;
    WAREHOUSES.forEach(w => {
      const dist = calculateDistance(lat, lng, w.lat, w.lng);
      if (dist < minDistance) minDistance = dist;
    });

    if (minDistance <= 5) {
      setServiceability({
        isAvailable: true,
        eta: '10-15 mins',
        message: 'Delivery available'
      });
    } else if (minDistance <= 15) {
      setServiceability({
        isAvailable: true,
        eta: '25-30 mins',
        message: 'Delivery available'
      });
    } else {
      setServiceability({
        isAvailable: false,
        eta: '--',
        message: 'Coming soon to your area'
      });
    }
  };

  const setCurrentAddress = (address: Address) => {
    setCurrentAddressState(address);
    localStorage.setItem('active_address', JSON.stringify(address));
    checkServiceability(address.lat, address.lng);
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress = {
      ...addressData,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updated = [...savedAddresses, newAddress];
    setSavedAddresses(updated);
    localStorage.setItem('user_addresses', JSON.stringify(updated));
    setCurrentAddress(newAddress);
  };

  const deleteAddress = (id: string) => {
    const updated = savedAddresses.filter(a => a.id !== id);
    setSavedAddresses(updated);
    localStorage.setItem('user_addresses', JSON.stringify(updated));
    if (currentAddress?.id === id) {
      setCurrentAddressState(null);
      localStorage.removeItem('active_address');
    }
  };

  const detectLocation = async () => {
    setIsLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude: lat, longitude: lng } = position.coords;
      
      const addr: Address = {
        id: 'temp',
        type: 'Other',
        full_address: 'Detected Location (GPS)',
        city: 'Surat',
        state: 'Gujarat',
        pincode: '',
        lat,
        lng
      };
      setCurrentAddress(addr);
    } catch (error) {
      console.error('Error detecting location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocationContext.Provider value={{ 
      currentAddress, 
      savedAddresses, 
      isLoading, 
      serviceability,
      setCurrentAddress,
      addAddress,
      deleteAddress,
      detectLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
