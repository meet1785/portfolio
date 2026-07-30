import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

// Mock window.matchMedia for jsdom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock BrowserRouter to use MemoryRouter so we can control the initial route
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, style }: React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>, ref: React.Ref<HTMLDivElement>) => (
      <div ref={ref} className={className} style={style}>{children}</div>
    )),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useMotionValue: () => ({ set: () => {}, get: () => 0 }),
  useSpring: () => ({ set: () => {}, get: () => 0 }),
}));

// Mock Three.js scene components
vi.mock('../components/scene/PortfolioBackgroundScene', () => ({
  PortfolioBackgroundScene: () => null,
}));

vi.mock('../components/scene/CyberpunkJourney', () => ({
  CarJourneyLanding: () => <div>Mock Landing</div>,
}));

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() },
}));

// Mock resume generators
vi.mock('../utils/resumeGenerator', () => ({
  generatePDFResume: vi.fn(),
  generateDOCXResume: vi.fn(),
  generateResumeData: () => ({
    personalInfo: {
      name: 'Test User',
      title: 'Developer',
      email: 'test@test.com',
      phone: '123',
      location: 'Test',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    summary: 'Test summary',
    education: [],
    experience: [],
    projects: [],
    skills: {},
    certifications: [],
    achievements: [],
  }),
}));

import App from '../App';

describe('NotFoundPage', () => {
  it('renders 404 heading for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('displays the attempted path', () => {
    render(
      <MemoryRouter initialEntries={['/some-bad-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('/some-bad-route')).toBeInTheDocument();
  });

  it('renders navigation links to valid pages', () => {
    render(
      <MemoryRouter initialEntries={['/missing']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('renders quick links to all main pages', () => {
    render(
      <MemoryRouter initialEntries={['/missing']}>
        <App />
      </MemoryRouter>
    );

    // Verify all 5 quick navigation links are present
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);

    const workLinks = screen.getAllByRole('link', { name: /work/i });
    expect(workLinks.length).toBeGreaterThanOrEqual(1);

    const resumeLinks = screen.getAllByRole('link', { name: /resume/i });
    expect(resumeLinks.length).toBeGreaterThanOrEqual(1);

    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);

    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });
});
