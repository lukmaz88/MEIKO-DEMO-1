import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import './styles/tokens.css';
import './styles/components.css';
import { LANGS, PATHS, type RouteKey } from './i18n/routes';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Service } from './pages/Service';
import { Warehouse } from './pages/Warehouse';
import { About } from './pages/About';
import { Quality } from './pages/Quality';
import { Contact } from './pages/Contact';
import { Quote } from './pages/Quote';
import { NotFound } from './pages/NotFound';

const PAGE: Record<Exclude<RouteKey, 'home'>, ReactNode> = {
  services: <Services />,
  svcForwarding: <Service k="svcForwarding" />,
  svcTransport: <Service k="svcTransport" />,
  svcWarehousing: <Service k="svcWarehousing" />,
  whGliwice1: <Warehouse k="whGliwice1" />,
  whGliwice2: <Warehouse k="whGliwice2" />,
  whDabrowa: <Warehouse k="whDabrowa" />,
  about: <About />,
  quality: <Quality />,
  contact: <Contact />,
  quote: <Quote />,
};

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/pl" replace /> },
  {
    path: '/:lang',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...(Object.keys(PAGE) as (keyof typeof PAGE)[]).flatMap((k) =>
        LANGS.map((l) => ({ path: PATHS[k][l], element: PAGE[k] })),
      ),
      { path: '*', element: <NotFound /> },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, '') });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
