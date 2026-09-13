import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { LangProvider } from '../i18n/LangContext';
import { Quote } from '../pages/Quote';
import { pl } from '../content/pl';

afterEach(cleanup);

const mount = (url: string) =>
  render(
    <RouterProvider
      router={createMemoryRouter(
        [{ path: '/:lang/*', element: <LangProvider lang="pl"><Quote /></LangProvider> }],
        { initialEntries: [url] },
      )}
    />,
  );

const type = (id: string, value: string) => fireEvent.change(document.getElementById(id)!, { target: { value } });

describe('quote card', () => {
  it('mentions the service when opened from a service page', () => {
    mount('/pl/zapytanie-ofertowe?service=spedycja');
    expect(screen.getByText(/Usługa: Spedycja/)).toBeTruthy();
    cleanup();
    mount('/pl/zapytanie-ofertowe');
    expect(screen.queryByText(/Usługa:/)).toBeNull();
  });

  it('requires all three fields', () => {
    mount('/pl/zapytanie-ofertowe');
    type('who', 'Anna Kowal');
    type('reach', 'anna@firma.pl');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByRole('alert').textContent).toBe(pl.quote.errors.required);
  });

  it('validates the contact and shows success', () => {
    mount('/pl/zapytanie-ofertowe');
    type('who', 'Anna Kowal');
    type('desc', '12 palet komponentów');
    type('reach', 'xx');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByRole('alert').textContent).toBe(pl.quote.errors.email);
    type('reach', '+48 600 100 200');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByText(pl.quote.success.title)).toBeTruthy();
  });
});
