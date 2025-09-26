import { atom } from "jotai";

export interface Author {
  name: string;
  url: string;
  company?: string;
}

export const authorAtom = atom<Author | null>(null);
