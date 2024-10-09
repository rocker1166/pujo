import { useState, useEffect } from 'react';

export interface PujoEvent {
  id: number;
  title: string;
  images: string[];
  rating: number;
  location: string;
  date: string; // ISO string
  time: string;
  description: string;
  crowdLevel: 'Low' | 'Medium' | 'High' | 'VeryHigh' | 'Extreme';
  latitude: number;
  longitude: number;
}

const CACHE_KEY = 'pujoEvents';
const CACHE_TIMESTAMP_KEY = 'pujoEventsTimestamp';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export function usePujoEvents() {
  const [events, setEvents] = useState<PujoEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Check if data is in local storage
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cachedTimestamp) {
          const age = Date.now() - Number.parseInt(cachedTimestamp, 10);
          if (age < CACHE_TTL) {
            // Use cached data
            setEvents(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const response = await fetch('/api/pujo-events');
        if (!response.ok) {
          throw new Error('Failed to fetch pujo events.');
        }
        const data: PujoEvent[] = await response.json();

        // Update state and cache
        setEvents(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}