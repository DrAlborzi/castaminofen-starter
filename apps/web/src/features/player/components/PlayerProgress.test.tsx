import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockRuntime = {
  setCurrentTime: vi.fn(),
};

let mockState: any;

vi.mock('../hooks/usePlayerRuntime', () => ({
  usePlayerRuntime: () => mockRuntime,
}));

vi.mock('../hooks/usePlayerState', () => ({
  usePlayerState: () => mockState,
}));

const { PlayerProgress } = await import('./PlayerProgress');

const createItem = () => ({
  id: 'episode-1',
  title: 'Episode 1',
  audioUrl: 'https://example.com/episode-1.mp3',
  sourceType: 'episode' as const,
});

describe('PlayerProgress', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    mockRuntime.setCurrentTime.mockReset();
    mockState = {
      currentItem: createItem(),
      playbackStatus: 'loading',
      currentPosition: 12,
      duration: 0,
    };
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('renders unknown duration without fabricating determinate progress or seek controls', () => {
    act(() => {
      root.render(<PlayerProgress />);
    });

    const progress = container.querySelector('[role="progressbar"]');

    expect(progress).not.toBeNull();
    expect(progress?.getAttribute('aria-valuenow')).toBeNull();
    expect(progress?.getAttribute('aria-valuetext')).toBe('پیشرفت نامشخص');
    expect(container.querySelector('input[type="range"]')).toBeNull();
    expect(container.textContent).toContain('مدت نامشخص');
  });

  it('keeps known duration seek behavior delegated to the runtime', () => {
    mockState = {
      ...mockState,
      playbackStatus: 'paused',
      currentPosition: 12,
      duration: 120,
    };

    act(() => {
      root.render(<PlayerProgress />);
    });

    const input = container.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.getAttribute('aria-valuemax')).toBe('120');

    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    });

    expect(mockRuntime.setCurrentTime).toHaveBeenCalledWith(17);
  });
});