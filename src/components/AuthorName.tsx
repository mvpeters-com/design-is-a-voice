"use client";

import { useAtom } from "jotai";
import { authorAtom } from "../name";

export default function AuthorName() {
    const [author] = useAtom(authorAtom);

    if (!author) return null;

    return (
        <a
            href={author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
        >
            {author.name}
        </a>
    );
}
