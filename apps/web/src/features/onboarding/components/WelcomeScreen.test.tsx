import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const usePodcastsMock = vi.hoisted(() => vi.fn());

vi.mock('@/features/podcasts/hooks/usePodcasts', () => ({
  usePodcasts: usePodcastsMock,
}));

vi.mock('next/image', () => ({
  default: ({ alt, priority: _priority, ...props }: { alt?: string; priority?: boolean; [key: string]: unknown }) => <img alt={alt ?? ''} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}));

import { WelcomeScreen } from './WelcomeScreen';

describe('WelcomeScreen', () => {
  it('keeps the orientation actions and renders public podcast content', () => {
    usePodcastsMock.mockReturnValue({
      data: {
        data: [
          { id: 'one', title: 'پادکست یک', description: 'توضیح یک', artworkUrl: '' },
          { id: 'two', title: 'پادکست دو', description: 'توضیح دو', artworkUrl: '' },
          { id: 'three', title: 'پادکست سه', description: 'توضیح سه', artworkUrl: '' },
          { id: 'four', title: 'پادکست چهار', description: 'توضیح چهار', artworkUrl: '' },
        ],
      },
      isLoading: false,
      isError: false,
    });

    const html = renderToStaticMarkup(<WelcomeScreen />);

    expect(html).toContain('href="/login"');
    expect(html).toContain('href="/podcasts"');
    expect(html).toContain('پادکست‌هایی برای شروع');
    expect(html).toContain('پادکست یک');
    expect(html).toContain('پادکست سه');
    expect(html).not.toContain('پادکست چهار');
    expect(html).toContain('href="/podcasts/one"');
    expect(html).toContain('پادکست یک، باز کردن پادکست');
  });

  it('renders an accessible loading state without content placeholders', () => {
    usePodcastsMock.mockReturnValue({ data: undefined, isLoading: true, isError: false });

    const html = renderToStaticMarkup(<WelcomeScreen />);

    expect(html).toContain('aria-label="در حال بارگذاری پادکست‌ها"');
    expect(html).not.toContain('پادکست یک');
  });

  it('renders the restrained empty state with both verified next steps', () => {
    usePodcastsMock.mockReturnValue({ data: { data: [] }, isLoading: false, isError: false });

    const html = renderToStaticMarkup(<WelcomeScreen />);

    expect(html).toContain('در حال حاضر پادکست عمومی برای نمایش در دسترس نیست');
    expect(html).toContain('href="/login"');
    expect(html).toContain('href="/podcasts"');
  });

  it('renders a safe error state with retry and discovery fallback', () => {
    usePodcastsMock.mockReturnValue({ data: undefined, isLoading: false, isError: true, refetch: vi.fn() });

    const html = renderToStaticMarkup(<WelcomeScreen />);

    expect(html).toContain('بارگذاری پادکست‌ها ممکن نشد');
    expect(html).toContain('تلاش دوباره');
    expect(html).toContain('href="/podcasts"');
  });

  it('introduces Castaminofen with a clearer first-step message', () => {
    usePodcastsMock.mockReturnValue({ data: { data: [] }, isLoading: false, isError: false });

    const html = renderToStaticMarkup(<WelcomeScreen />);

    expect(html).toContain('برای شروع');
    expect(html).toContain('کشف');
  });
});
