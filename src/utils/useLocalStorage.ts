import { useState, useCallback } from 'react';

/**
 * Custom hook for reading and writing a value to localStorage with type safety.
 * @param key - The localStorage key to store the value under
 * @param initialValue - Default value used when no stored value is found or on SSR
 * @returns A tuple of [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch {
        // Silently ignore write errors (e.g. private-browsing quota limits)
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Silently ignore remove errors
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
