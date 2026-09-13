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
const pressed = () => screen.getAllByRole('button', { pressed: true }).map((b) => b.textContent);

describe('quote card', () => {
  it('preselects the service from the query, first one otherwise', () => {
    mount('/pl/zapytanie-ofertowe?service=magazynowanie');
    expect(pressed()).toEqual(['Magazyn']);
    cleanup();
    mount('/pl/zapytanie-ofertowe');
    expect(pressed()).toEqual(['Transport']);
  });

  it('switches service on click', () => {
    mount('/pl/zapytanie-ofertowe');
    fireEvent.click(screen.getByRole('button', { name: /Cło/ }));
    expect(pressed()).toEqual(['Cło']);
  });

  it('requires cargo and contact', () => {
    mount('/pl/zapytanie-ofertowe');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByRole('alert').textContent).toBe(pl.quote.errors.required);
  });

  it('rejects a bad contact, accepts a phone, shows success', () => {
    mount('/pl/zapytanie-ofertowe');
    type('cargo', '12 palet');
    type('reach', 'xx');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByRole('alert').textContent).toBe(pl.quote.errors.email);
    type('reach', '+48 600 100 200');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByText(pl.quote.success.title)).toBeTruthy();
  });
});
