import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { LibraryCategoryTabs } from './LibraryCategoryTabs';

describe('LibraryCategoryTabs', () => {
  it('renders the category labels and marks the active tab', () => {
    const html = renderToStaticMarkup(
      <LibraryCategoryTabs activeCategory="podcasts" onSelect={vi.fn()} />,
    );

    expect(html).toContain('همه');
    expect(html).toContain('پادکست‌ها');
    expect(html).toContain('aria-selected="true"');
  });
});
