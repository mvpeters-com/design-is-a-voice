"use client";

import InfiniteImageScroller from "../components/InfiniteImageScroller";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="flex p-8">
        <h1 className="text-4xl font-bold">
          Design is a voice.
        </h1>
      </div>

      <InfiniteImageScroller />

      <div className="flex w-full justify-between align-center p-8">
        <h1 className="text-4xl font-bold">
          Free palestine.
        </h1>

        <div className="flex gap-4">
          <a href="mailto:info@designisavoice.com">participate</a>
          <a href="mailto:info@designisavoice.com">donate</a>
        </div>
      </div>
    </div>
  );
}