"use client";

import { useAtom } from "jotai";
import { authorAtom } from "../name";

export default function AuthorName() {
    const [author] = useAtom(authorAtom);

    if (!author) return null;

    return <>
        <a
            href={author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline md:hidden block"
        >
            {author.name} {author.company ? <>
                <br /><span>{author.company}</span>
            </> : ""}
        </a>
        <a
            href={author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hidden md:block"
        >
            {author.name} {author.company ? <>
                - {author.company}
            </> : ""}
        </a>
    </>

}
