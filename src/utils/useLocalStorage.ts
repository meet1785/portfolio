import { useState, useCallback, useEffect } from 'react';

const LOCAL_STORAGE_CHANGE_EVENT = 'local-storage-change';
type LocalStorageChangeDetail = {
  key: string;
  rawValue: string | null;
};

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
            const rawValue = JSON.stringify(valueToStore);
            window.localStorage.setItem(key, rawValue);
            window.dispatchEvent(
              new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT, {
                detail: { key, rawValue } satisfies LocalStorageChangeDetail,
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
            detail: { key, rawValue: null } satisfies LocalStorageChangeDetail,
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

    const handleLocalChange: EventListener = (event) => {
      const customEvent = event as CustomEvent<LocalStorageChangeDetail>;
      if (customEvent.detail.key !== key) {
        return;
      }

      setStoredValue(readValue(customEvent.detail.rawValue));
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleLocalChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleLocalChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}
