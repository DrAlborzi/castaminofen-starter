import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const mockUsePlayerRuntime = vi.fn();
const mockUsePlayerState = vi.fn();
const mockUseUpdateListeningHistory = vi.fn();

vi.mock('@/features/player/hooks/usePlayerRuntime', () => ({
  usePlayerRuntime: () => mockUsePlayerRuntime(),
}));

vi.mock('@/features/player/hooks/usePlayerState', () => ({
  usePlayerState: () => mockUsePlayerState(),
}));

vi.mock('../hooks/useUpdateListeningHistory', () => ({
  useUpdateListeningHistory: () => mockUseUpdateListeningHistory(),
}));

const { ContinueListeningSection } = await import('./ContinueListeningSection');

describe('ContinueListeningSection', () => {
  it('renders a clearer recovery action for the empty continue-listening state', () => {
    mockUsePlayerRuntime.mockReturnValue({
      loadItem: vi.fn(),
      appendToQueue: vi.fn(),
    });

    mockUsePlayerState.mockReturnValue({
      currentItem: null,
      currentPosition: 0,
      duration: 0,
      playbackStatus: 'idle',
    });

    mockUseUpdateListeningHistory.mockReturnValue({
      mutate: vi.fn(),
    });

    const html = renderToStaticMarkup(<ContinueListeningSection items={[]} />);

    expect(html).toContain('پادکست‌ها را باز کن');
    expect(html).toContain('برای شروع، یک اپیزود را پخش کن');
  });
});
