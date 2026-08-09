import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const usePodcastsMock = vi.hoisted(() => vi.fn());

vi.mock('@/features/podcasts/hooks/usePodcasts', () => ({
  usePodcasts: usePodcastsMock,
}));

vi.mock('@/features/podcasts/PodcastCard', () => ({
  PodcastCard: ({ podcast }: { podcast: { title: string } }) => <article>{podcast.title}</article>,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}));

import PodcastsPage from './page';

describe('PodcastsPage', () => {
  beforeEach(() => {
    usePodcastsMock.mockReset();
  });

  it('renders the canonical loading state while the catalog query is pending', () => {
    usePodcastsMock.mockReturnValue({ isLoading: true, isError: false });

    const html = renderToStaticMarkup(<PodcastsPage />);

    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('Loading podcasts...');
  });

  it('renders an error state when the catalog query fails', () => {
    usePodcastsMock.mockReturnValue({ isLoading: false, isError: true, error: new Error('Catalog unavailable') });

    const html = renderToStaticMarkup(<PodcastsPage />);

    expect(html).toContain('role="alert"');
    expect(html).toContain('Catalog unavailable');
  });

  it('renders a semantic no-results state for a successful empty catalog', () => {
    usePodcastsMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { data: [], pagination: { totalPages: 1 } },
    });

    const html = renderToStaticMarkup(<PodcastsPage />);

    expect(html).toContain('<h1 class="text-heading">Podcasts</h1>');
    expect(html).toContain('for &quot;your search&quot;');
    expect(html).toContain('data-category="no-results"');
    expect(html).not.toContain('error-state');
  });

  it('renders catalog content and accessible pagination controls', () => {
    usePodcastsMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        data: [{ id: 'podcast-1', title: 'A podcast' }],
        pagination: { totalPages: 3 },
      },
    });

    const html = renderToStaticMarkup(<PodcastsPage />);

    expect(html).toContain('A podcast');
    expect(html).toContain('href="/podcasts/new"');
    expect(html).toContain('aria-label="Page 1 of 3"');
    expect(html).toContain('disabled=""');
    expect(html).toContain('>Next</span>');
  });
});