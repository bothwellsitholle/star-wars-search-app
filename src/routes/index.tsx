import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { PageLoader } from '../components/PageLoader';
import { RootLayout } from '../layouts/RootLayout';
import { NotFound } from '../pages/NotFound';

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, notFoundRoute]),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
