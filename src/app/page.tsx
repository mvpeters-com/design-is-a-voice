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
    </div>
  );
}