/* eslint-disable @next/next/no-img-element */

import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ alt, onError, ...props }: any) => <img alt={alt} onError={onError} {...props} />,
}));

const { Avatar } = await import('../identity/avatar');
const { ContentArtwork } = await import('./content-artwork');
const { Duration } = await import('./duration');
const { MediaCard } = await import('./media-card');
const { MediaRow } = await import('./media-row');
const { PlaybackAffordance } = await import('./playback-affordance');
const { ProgressIndicator } = await import('../player/progress-indicator');

describe('image fallback behavior', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('falls back to the avatar label when the image fails to load', () => {
    act(() => {
      root.render(<Avatar src="https://bad.invalid/avatar.jpg" alt="User avatar" fallback="JD" />);
    });

    const image = container.querySelector('img');
    expect(image).toBeTruthy();

    act(() => {
      image?.dispatchEvent(new Event('error', { bubbles: true }));
    });

    expect(container.textContent).toContain('JD');
  });

  it('falls back to the artwork label when the artwork image fails to load', () => {
    act(() => {
      root.render(<ContentArtwork src="https://bad.invalid/artwork.jpg" alt="Podcast artwork" fallback="پ" />);
    });

    const image = container.querySelector('img');
    expect(image).toBeTruthy();

    act(() => {
      image?.dispatchEvent(new Event('error', { bubbles: true }));
    });

    expect(container.textContent).toContain('پ');
  });

  it('falls back immediately when the image source is blank whitespace', () => {
    act(() => {
      root.render(<ContentArtwork src="   " alt="Podcast artwork" fallback="پ" />);
    });

    expect(container.querySelector('img')).toBeNull();
    expect(container.textContent).toContain('پ');
  });

  it('formats numeric durations and labels unknown values honestly', () => {
    act(() => {
      root.render(<><Duration value={90} /><Duration /></>);
    });

    expect(container.textContent).toContain('1:30');
    expect(container.textContent).toContain('مدت نامشخص');
  });

  it('keeps unknown progress indeterminate instead of reporting zero', () => {
    act(() => {
      root.render(<ProgressIndicator />);
    });

    const progress = container.querySelector('[role="progressbar"]');
    expect(progress?.getAttribute('aria-valuenow')).toBeNull();
    expect(progress?.getAttribute('aria-valuetext')).toBe('پیشرفت نامشخص');
  });

  it('exposes playback state and composes media slots', () => {
    act(() => {
      root.render(
        <>
          <PlaybackAffordance isPlaying />
          <MediaCard title="Podcast" artwork={<span>art</span>} playback={<span>play</span>} actions={<span>action</span>} />
          <MediaRow title="Episode" artwork={<span>art</span>} actions={<span>action</span>} />
        </>,
      );
    });

    expect(container.querySelector('button')?.getAttribute('aria-pressed')).toBe('true');
    expect(container.textContent).toContain('Podcast');
    expect(container.textContent).toContain('Episode');
    expect(container.textContent).toContain('action');
  });
});
