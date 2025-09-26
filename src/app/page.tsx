"use client";

import { useState } from "react";
import InfiniteImageScroller from "../components/InfiniteImageScroller";
import ParticipateModal from "../components/ParticipateModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <div className="flex p-4 md:p-8">
        <h1 className="text-[32px] md:text-[48px] font-bold">
          Design is a voice.
        </h1>
      </div>

      <InfiniteImageScroller />

      <div className="flex md:flex-row flex-col w-full justify-between align-center p-4 md:p-8">
        <h1 className="text-[32px] md:text-[48px] font-bold">
          Free Palestine.
        </h1>

        <div className="flex flex-row gap-4">
          <button
            className="self-end cursor-pointer bg-transparent border-none text-inherit"
            onClick={openModal}
          >
            participate
          </button>
          <a className="self-end" target="_blank" href="https://www.icrc.org/en/donate/israelgaza">donate</a>
        </div>
      </div>

      <ParticipateModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}