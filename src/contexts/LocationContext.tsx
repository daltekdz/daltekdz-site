import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextProps {
  latitude: number | null;
  longitude: number | null;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  locationPermission: 'granted' | 'denied' | 'prompt' | 'loading';
  showLocationPopup: boolean;
  requestLocation: () => void;
  dismissLocationPopup: () => void;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
  sortByDistance: <T extends { latitude?: number; longitude?: number }>(items: T[]) => T[];
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'loading'>('prompt');
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  // Check if GPS prompt was shown before and show popup after 15 seconds
  useEffect(() => {
    const gpsPromptShown = localStorage.getItem('gpsPromptShown');
    const savedLocation = localStorage.getItem('userLocation');
    
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setUserLocation(location);
        setLocationPermission('granted');
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    } else if (!gpsPromptShown) {
      // Show popup after 15 seconds only if never shown before
      const timer = setTimeout(() => {
        setShowLocationPopup(true);
      }, 15000); // 15 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  // Sort items by distance from user location
  const sortByDistance = <T extends { latitude?: number; longitude?: number }>(items: T[]): T[] => {
    if (!userLocation) return items;

    return [...items].sort((a, b) => {
      if (!a.latitude || !a.longitude || !b.latitude || !b.longitude) return 0;
      
      const distanceA = calculateDistance(
        userLocation.latitude, 
        userLocation.longitude, 
        a.latitude, 
        a.longitude
      );
      const distanceB = calculateDistance(
        userLocation.latitude, 
        userLocation.longitude, 
        b.latitude, 
        b.longitude
      );
      
      return distanceA - distanceB;
    });
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      setShowLocationPopup(false);
      localStorage.setItem('gpsPromptShown', 'true');
      return;
    }

    setLocationPermission('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const location = {
          latitude: lat,
          longitude: lon
        };
        
        setLatitude(lat);
        setLongitude(lon);
        setUserLocation(location);
        setLocationPermission('granted');
        setShowLocationPopup(false);
        
        // Save to localStorage
        localStorage.setItem('userLocation', JSON.stringify(location));
        localStorage.setItem('gpsPromptShown', 'true');
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationPermission('denied');
        setShowLocationPopup(false);
        localStorage.setItem('gpsPromptShown', 'true');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const dismissLocationPopup = () => {
    setShowLocationPopup(false);
    localStorage.setItem('gpsPromptShown', 'true');
  };

  return (
    <LocationContext.Provider value={{ 
      latitude, 
      longitude, 
      userLocation,
      locationPermission,
      showLocationPopup,
      requestLocation,
      dismissLocationPopup,
      calculateDistance,
      sortByDistance
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};