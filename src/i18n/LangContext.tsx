import { createContext, useContext, type ReactNode } from 'react';
import { buildPath, type Lang, type RouteKey } from './routes';
import type { Content } from '../content/types';
import { pl } from '../content/pl';
import { en } from '../content/en';

const CONTENT: Record<Lang, Content> = { pl, en };
const LangCtx = createContext<Lang>('pl');

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>;
}

export const useLang = (): Lang => useContext(LangCtx);
export const useT = (): Content => CONTENT[useContext(LangCtx)];
export const useHref = () => {
  const lang = useContext(LangCtx);
  return (key: RouteKey, search = '') => buildPath(lang, key, search);
};
