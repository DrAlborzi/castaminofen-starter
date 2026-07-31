import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt?: string; [key: string]: unknown }) => <img alt={alt ?? ''} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

import { WelcomeScreen } from './WelcomeScreen';

describe('WelcomeScreen', () => {
  it('introduces Castaminofen with a clearer first-step message', () => {
    const html = renderToStaticMarkup(<WelcomeScreen />);

    expect(html).toContain('برای شروع');
    expect(html).toContain('کشف');
  });
});
