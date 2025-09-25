"use client";

import InfiniteImageScroller from "../components/InfiniteImageScroller";

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <div className="flex p-8">
        <h1 className="text-4xl font-bold">
          Design is a voice.
        </h1>
      </div>

      <InfiniteImageScroller />

      <div className="flex w-full justify-between align-center p-8">
        <h1 className="text-4xl font-bold">
          Free Palestine.
        </h1>

        <div className="flex flex-row gap-4 align-end">
          <a href="mailto:info@designisavoice.com">participate</a>
          <a href="mailto:info@designisavoice.com">donate</a>
        </div>
      </div>
    </div>
  );
}