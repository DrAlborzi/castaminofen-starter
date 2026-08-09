import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const useSessionMock = vi.hoisted(() => vi.fn());
const useAuthStoreMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/auth', () => ({
  fetchProfile: vi.fn(),
  loginUser: vi.fn(),
  registerUser: vi.fn(),
  useSession: useSessionMock,
}));

vi.mock('@/stores/authStore', () => ({
  useAuthStore: useAuthStoreMock,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt?: string }) => <span aria-label={alt ?? ''} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}));

import { LoginPageView } from './LoginForm';
import { RegisterPageView } from './RegisterForm';
import { ProtectedRoute } from './ProtectedRoute';

describe('auth presentation', () => {
  it('exposes native login fields and a non-busy form at rest', () => {
    const html = renderToStaticMarkup(<LoginPageView />);

    expect(html).toContain('<form class="form space-y-5" aria-busy="false">');
    expect(html).toContain('<label for="email" class="form-label">ایمیل</label>');
    expect(html).toContain('id="email"');
    expect(html).toContain('type="email"');
    expect(html).toContain('autoComplete="current-password"');
    expect(html).toContain('href="/register"');
  });

  it('keeps registration fields labeled and uses a new-password autocomplete contract', () => {
    const html = renderToStaticMarkup(<RegisterPageView />);

    expect(html).toContain('<label for="name" class="form-label">نام</label>');
    expect(html).toContain('id="name"');
    expect(html).toContain('autoComplete="new-password"');
    expect(html).toContain('href="/login"');
  });

  it('presents unresolved sessions as a localized busy state', () => {
    useSessionMock.mockReturnValue({ data: undefined, isLoading: true, isError: false });
    useAuthStoreMock.mockImplementation((selector: (state: { isAuthenticated: boolean; isHydrated: boolean }) => unknown) => selector({ isAuthenticated: false, isHydrated: false }));

    const html = renderToStaticMarkup(<ProtectedRoute><p>private content</p></ProtectedRoute>);

    expect(html).toContain('احراز هویت');
    expect(html).toContain('در حال بررسی نشست شما...');
    expect(html).toContain('aria-busy="true"');
    expect(html).not.toContain('private content');
  });
});
