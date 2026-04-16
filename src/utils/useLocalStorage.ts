import { useState, useCallback, useEffect } from 'react';

const LOCAL_STORAGE_CHANGE_EVENT = 'local-storage-change';

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
  const readValue = useCallback(
    (rawValue: string | null): T => {
      if (rawValue === null) {
        return initialValue;
      }

      try {
        return JSON.parse(rawValue) as T;
      } catch {
        return initialValue;
      }
    },
    [initialValue]
  );

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return readValue(window.localStorage.getItem(key));
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            window.dispatchEvent(
              new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT, {
                detail: { key, value: valueToStore },
              })
            );
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
        window.dispatchEvent(
          new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT, {
            detail: { key, value: null },
          })
        );
      }
    } catch {
      // Silently ignore remove errors
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key) {
        return;
      }

      setStoredValue(readValue(event.newValue));
    };

    const handleLocalChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ key?: string; value?: T | null }>;
      if (customEvent.detail?.key !== key) {
        return;
      }

      setStoredValue(customEvent.detail.value === null ? initialValue : (customEvent.detail.value as T));
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleLocalChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleLocalChange as EventListener);
    };
  }, [key, initialValue, readValue]);

  return [storedValue, setValue, removeValue];
}
