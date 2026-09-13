import { afterEach, describe, it, expect, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
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
const f = pl.quote.flow;

describe('quote flow', () => {
  it('starts on the service step and advances after a pick', () => {
    vi.useFakeTimers();
    mount('/pl/zapytanie-ofertowe');
    expect(screen.getByRole('heading', { level: 2, name: f.steps[0] })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Magazynowanie/ }));
    act(() => { vi.runAllTimers(); });
    expect(screen.getByRole('heading', { level: 2, name: f.steps[1] })).toBeTruthy();
    expect(screen.getByText('zmagazynowania')).toBeTruthy();
    vi.useRealTimers();
  });

  it('skips the service step when prefilled from the query', () => {
    mount('/pl/zapytanie-ofertowe?service=spedycja');
    expect(screen.getByRole('heading', { level: 2, name: f.steps[1] })).toBeTruthy();
  });

  it('requires the cargo sentence before moving on', () => {
    mount('/pl/zapytanie-ofertowe?service=transport');
    fireEvent.click(screen.getByRole('button', { name: f.next }));
    expect(screen.getByRole('alert').textContent).toBe(pl.quote.errors.required);
    type('cargo', '12 palet komponentów');
    fireEvent.click(screen.getByRole('button', { name: f.next }));
    expect(screen.getByRole('heading', { level: 2, name: f.steps[2] })).toBeTruthy();
    expect(screen.getByText('12 palet komponentów')).toBeTruthy();
  });

  it('accepts a phone number as the contact and shows success', () => {
    mount('/pl/zapytanie-ofertowe?service=spedycja');
    type('cargo', 'Palety');
    fireEvent.click(screen.getByRole('button', { name: f.next }));
    type('who', 'Anna Kowal, Firma');
    type('reach', 'nie-kontakt');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByRole('alert').textContent).toBe(pl.quote.errors.email);
    type('reach', '+48 600 100 200');
    fireEvent.click(screen.getByRole('button', { name: pl.quote.submit }));
    expect(screen.getByText(pl.quote.success.title)).toBeTruthy();
  });
});
