import { atom } from "jotai";

export interface Author {
  name: string;
  url: string;
}

export const authorAtom = atom<Author | null>(null);
