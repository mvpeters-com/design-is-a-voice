"use client";

import { useAtom } from "jotai";
import { authorAtom } from "../name";

export default function AuthorName() {
    const [author] = useAtom(authorAtom);

    return <>{author}</>;
}
