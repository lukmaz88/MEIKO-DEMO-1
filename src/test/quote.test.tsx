import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(cleanup);
import { createMemoryRouter, RouterProvider } from 'react-router';
import { LangProvider } from '../i18n/LangContext';
import { Quote } from '../pages/Quote';
import { pl } from '../content/pl';

const mount = (url: string) =>
  render(
    <RouterProvider
      router={createMemoryRouter(
        [{ path: '/:lang/*', element: <LangProvider lang="pl"><Quote /></LangProvider> }],
        { initialEntries: [url] },
      )}
    />,
  );

const fill = (id: string, value: string) => fireEvent.change(document.getElementById(id)!, { target: { value } });

describe('quote form', () => {
  it('prefills service from query', () => {
    mount('/pl/zapytanie-ofertowe?service=spedycja');
    expect((document.getElementById('service') as HTMLSelectElement).value).toBe('spedycja');
  });

  it('shows 6 errors on empty submit', () => {
    mount('/pl/zapytanie-ofertowe');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getAllByRole('alert')).toHaveLength(6);
  });

  it('rejects a malformed email', () => {
    mount('/pl/zapytanie-ofertowe');
    fill('email', 'nie-email');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByText(pl.quote.errors.email)).toBeTruthy();
  });

  it('shows success after valid submit', () => {
    mount('/pl/zapytanie-ofertowe?service=transport');
    fill('contact', 'Anna Kowal');
    fill('email', 'anna.kowal@firma.pl');
    fill('company', 'Firma Sp. z o.o.');
    fill('phone', '+48 600 100 200');
    fill('cargo', 'Palety, komponenty');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByText(pl.quote.success.title)).toBeTruthy();
  });
});
