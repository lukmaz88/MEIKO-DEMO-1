# Meiko Trans Polska – demo strony WWW

Klikalny mockup pierwszego release'u (home + 11 podstron, PL/EN) dla zarządu. Vite + React + TypeScript, bez UI-kitów.

## Uruchomienie

```bash
npm i
npm run dev          # http://localhost:5173/pl
npm run build        # statyczne pliki w dist/
npx serve dist -s    # podgląd builda (SPA fallback)
npx vitest run       # testy: parytet PL/EN tras i treści, formularz
```

## Gdzie co jest

| Co | Plik |
|---|---|
| Treści PL / EN (cała kopia) | `src/content/pl.ts`, `src/content/en.ts` |
| Liczby i flaga „zatwierdzone” | `src/data/facts.ts` |
| Slugi PL ↔ EN | `src/i18n/routes.ts` |
| Znaczniki „do zatwierdzenia” (kropka) | `src/config.ts` → `SHOW_APPROVAL_MARKS` |
| Sekcje strony głównej | `src/components/sections.tsx` |
| Podstrony | `src/pages/*` |
| Style (tokeny / komponenty) | `src/styles/tokens.css`, `src/styles/components.css` |
| Media (wideo hero, kadry, logo) | `public/media/` |

## Media

`scripts/media.py` tnie pętlę hero (0:37–0:47.5 z `../MTP 2025.mp4`), kadry i eksportuje grafiki z PPTX. Uruchamiać z katalogu `app/`:

```bash
python scripts/media.py
```

Wymaga `imageio_ffmpeg` i `Pillow`. Pliki źródłowe (`*.mp4`, `*.pptx`) nie są w repo.

## Przed prezentacją

1. `SHOW_APPROVAL_MARKS = false` w `src/config.ts`, jeśli kropki mają zniknąć.
2. Grafiki wygenerowane w ChatGPT (styl dopasowany do ujęć z drona): `wh3-render.jpg`, `team.jpg`, `gen-transport.jpg`, `gen-forwarding.jpg`, `gen-manufacturing.jpg`, `gen-retail.jpg`, `gen-operators.jpg`.
3. Efekty ruchu (wszystkie wyłączane przez `prefers-reduced-motion`): wjazd hero słowo po słowie, zoom wideo, kurtyny na zdjęciach, stagger siatek, odliczanie liczb, maskowane nagłówki, linia tras w sekcji branż, auto-rotacja zakładek, paralaksa (Chromium), kurczący się header, przejścia między stronami, intro z logo (raz na sesję), taśma kadrów sterowana scrollem, rysująca się oś czasu, kanji z rozmycia, ukośne przejścia zdjęć w zakładkach, dryf zdjęć magazynów.
