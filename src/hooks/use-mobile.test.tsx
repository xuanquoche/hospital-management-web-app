import { act, renderHook } from '@testing-library/react';

import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  const listeners = new Set<() => void>();

  beforeEach(() => {
    listeners.clear();

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn(() => ({
        addEventListener: jest.fn((_event: string, listener: () => void) => {
          listeners.add(listener);
        }),
        matches: false,
        removeEventListener: jest.fn((_event: string, listener: () => void) => {
          listeners.delete(listener);
        }),
      })),
    });
  });

  it('returns true after the viewport enters the mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 767;
      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(true);
  });
});
