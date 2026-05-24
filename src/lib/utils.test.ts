import { cn } from './utils';

describe('cn', () => {
  it('combines truthy class names', () => {
    expect(cn('flex', false && 'hidden', undefined, 'items-center')).toBe(
      'flex items-center'
    );
  });

  it('keeps the later tailwind class when classes conflict', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });
});
