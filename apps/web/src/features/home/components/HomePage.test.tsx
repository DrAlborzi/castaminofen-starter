import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('HomePage', () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (root) {
      const currentRoot = root;
      act(() => {
        currentRoot.unmount();
      });
    }
    container?.remove();
    root = null;
    container = null;
  });

  it('renders the premium home experience sections', () => {
    const rendered = mount(<HomePage />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('خوش آمدی');
    expect(rendered.container.textContent).toContain('ادامه‌ی تجربه');
    expect(rendered.container.textContent).toContain('پادکست');
    expect(rendered.container.textContent).toContain('جامعه');
  });
});
