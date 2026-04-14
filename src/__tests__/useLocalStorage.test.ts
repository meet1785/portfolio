import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from '../utils/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns a stored value that already exists in localStorage', () => {
    localStorage.setItem('key', JSON.stringify('persisted'));
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('persisted');
  });

  it('writes a new value to state and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('updated');
  });

  it('accepts a function updater', () => {
    const { result } = renderHook(() => useLocalStorage<number>('count', 0));

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(5);
    expect(JSON.parse(localStorage.getItem('count')!)).toBe(5);
  });

  it('removes the value and reverts to the initial value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    act(() => {
      result.current[1]('updated');
    });
    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('default');
    expect(localStorage.getItem('key')).toBeNull();
  });

  it('persists objects correctly', () => {
    const initial = { a: 1, b: 'hello' };
    const { result } = renderHook(() =>
      useLocalStorage<typeof initial>('obj', initial)
    );

    act(() => {
      result.current[1]({ a: 42, b: 'world' });
    });

    expect(result.current[0]).toEqual({ a: 42, b: 'world' });
    expect(JSON.parse(localStorage.getItem('obj')!)).toEqual({ a: 42, b: 'world' });
  });

  it('persists arrays correctly', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string[]>('list', [])
    );

    act(() => {
      result.current[1](['react', 'typescript']);
    });

    expect(result.current[0]).toEqual(['react', 'typescript']);
  });

  it('falls back to initial value when localStorage contains invalid JSON', () => {
    localStorage.setItem('key', 'not-valid-json{');
    const { result } = renderHook(() => useLocalStorage('key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
