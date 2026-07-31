import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockUseSearch = vi.fn();

vi.mock('../hooks/useSearch', () => ({
  useSearch: (...args: unknown[]) => mockUseSearch(...args),
}));

const { default: SearchResults } = await import('./SearchResults');

describe('SearchResults', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    mockUseSearch.mockReset();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('renders a direct empty-state message and recovery action for no results', () => {
    mockUseSearch.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: { data: [], pagination: { totalPages: 1 } },
    });

    act(() => {
      root.render(<SearchResults q="پادکست آزمایشی" page={1} />);
    });

    expect(container.textContent).toContain('نتیجه‌ای پیدا نشد');
    expect(container.textContent).toContain('جستجوی ساده‌تر');
  });
});
