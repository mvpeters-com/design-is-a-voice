"use client";

import InfiniteImageScroller from "../components/InfiniteImageScroller";

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <div className="flex p-8">
        <h1 className="text-[32px] md:text-[48px] font-bold">
          Design is a voice.
        </h1>
      </div>

      <InfiniteImageScroller />

      <div className="flex md:flex-row flex-col w-full justify-between align-center p-8">
        <h1 className="text-[32px] md:text-[48px] font-bold">
          Free Palestine.
        </h1>

        <div className="flex flex-row gap-4">
          <a className="self-end" href="mailto:info@designisavoice.com">participate</a>
          <a className="self-end" href="https://www.icrc.org/en/donate/israelgaza">donate</a>
        </div>
      </div>
    </div>
  );
}