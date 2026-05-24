import { act, renderHook } from '@testing-library/react';

import { useDebounce } from './use-debounce';
import { useDebounceSearch } from './use-debounce-search';

describe('debounce hooks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('updates useDebounce value after the configured delay', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      {
        initialProps: { value: 'initial' },
      }
    );

    rerender({ value: 'updated' });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });

  it('keeps only the latest useDebounceSearch timer active', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounceSearch(value, 200),
      {
        initialProps: { value: 'a' },
      }
    );

    rerender({ value: 'ab' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'abc' });

    act(() => {
      jest.advanceTimersByTime(199);
    });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('abc');
  });
});
