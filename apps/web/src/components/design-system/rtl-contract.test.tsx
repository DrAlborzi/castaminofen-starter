import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Duration } from './media/duration';
import SearchInput from '@/features/search/components/SearchInput';

describe('RTL and bidirectional UI contract', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('isolates duration values as LTR-readable metadata', () => {
    act(() => root.render(<Duration value="12:45" />));

    expect(container.querySelector('[dir="ltr"]')?.textContent).toBe('12:45');
  });

  it('uses logical adornment placement for the RTL search field', () => {
    act(() => root.render(<SearchInput onNavigate={() => undefined} />));

    expect(container.querySelector('svg')?.className.baseVal).toContain('end-4');
    expect(container.querySelector('input')?.className).toContain('pe-11');
  });
});