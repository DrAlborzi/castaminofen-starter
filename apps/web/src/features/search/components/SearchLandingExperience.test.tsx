import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const { default: SearchLandingExperience } = await import('./SearchLandingExperience');

describe('SearchLandingExperience', () => {
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

  it('renders discovery guidance and category cards for a premium landing experience', () => {
    act(() => {
      root.render(<SearchLandingExperience onSelectSearch={() => undefined} />);
    });

    expect(container.textContent).toContain('کشف سریع');
    expect(container.textContent).toContain('پادکست');
    expect(container.textContent).toContain('پروفایل سازنده');
  });
});
