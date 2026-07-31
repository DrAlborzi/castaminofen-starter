/* eslint-disable @next/next/no-img-element */

import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ alt, onError, ...props }: any) => <img alt={alt} onError={onError} {...props} />,
}));

const { Avatar } = await import('../identity/avatar');
const { ContentArtwork } = await import('./content-artwork');

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
});
