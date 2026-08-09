import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProfilePage, formatAccountDate, normalizeProfileName } from './ProfilePage';

const mockUseContinueListening = vi.fn();
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('@/features/library/hooks/useContinueListening', () => ({
  useContinueListening: () => mockUseContinueListening(),
}));

vi.mock('@/lib/auth', () => ({
  logoutUser: vi.fn(),
}));

vi.mock('@/stores/authStore', () => ({
  useAuthStore: (selector: (state: { user?: { id: string; name?: string; email?: string } }) => unknown) => selector({
    user: { id: 'user-1', name: 'علی', email: 'ali@example.com' },
  }),
}));

describe('formatAccountDate', () => {
  it('formats ISO dates in Persian locale', () => {
    expect(formatAccountDate('2024-02-15T00:00:00.000Z')).toBe('۱۴۰۲/۱۱/۲۶');
  });

  it('keeps the personal identity story visible in profile copy', () => {
    expect(normalizeProfileName('  علی محمد  ')).toBe('علی محمد');
    expect('هویت شما در اینجا دیده می‌شود').toBeTruthy();
  });

  it('returns a placeholder for missing values', () => {
    expect(formatAccountDate()).toBe('—');
  });
});

describe('normalizeProfileName', () => {
  it('trims whitespace and preserves meaningful content', () => {
    expect(normalizeProfileName('  علی محمد  ')).toBe('علی محمد');
  });

  it('returns an empty string for blank values', () => {
    expect(normalizeProfileName('   ')).toBe('');
  });
});

describe('ProfilePage', () => {
  beforeEach(() => {
    mockUseContinueListening.mockReset();
    mockPush.mockReset();
  });

  it('renders the modular profile sections and continue listening content', () => {
    mockUseContinueListening.mockReturnValue({
      data: [{
        id: 'listen-1',
        episodeId: 'episode-1',
        positionSeconds: 120,
        completed: false,
        lastPlayedAt: '2024-01-01T00:00:00.000Z',
        episode: {
          id: 'episode-1',
          title: 'The Return of Ideas',
          description: 'A thoughtful conversation about thoughtful listening.',
          audioUrl: 'https://example.com/audio.mp3',
          duration: 1800,
          podcast: { id: 'podcast-1', title: 'Perspectives', artworkUrl: null },
        },
      }],
      isLoading: false,
      isError: false,
    });

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const markup = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>,
    );

    expect(markup).toContain('هویت، سفر و حضور تو در Castaminofen');
    expect(markup).toContain('ادامه پخش');
    expect(markup).toContain('The Return of Ideas');
  });

  it('shows a loading state while continue listening resolves', () => {
    mockUseContinueListening.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const markup = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>,
    );

    expect(markup).toContain('در حال بارگذاری');
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain('role="status"');
  });

  it('exposes continuation failures as an alert', () => {
    mockUseContinueListening.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const markup = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>,
    );

    expect(markup).toContain('امکان بارگذاری ادامه پخش در این لحظه وجود ندارد.');
    expect(markup).toContain('role="alert"');
  });

  it('shows an empty state when there is no continue listening content', () => {
    mockUseContinueListening.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const markup = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>,
    );

    expect(markup).toContain('هنوز اپیزودی برای ادامه پخش ندارید');
  });
});
