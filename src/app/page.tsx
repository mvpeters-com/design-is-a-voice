"use client";

import { useState } from "react";
import InfiniteImageScroller from "../components/InfiniteImageScroller";
import ParticipateModal from "../components/ParticipateModal";
import AuthorName from "@/components/AuthorName";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <div className="flex flex-row p-6 md:p-10 justify-between">
        <h1 className="text-[36px] md:text-[48px] leading-none font-bold">
          Design is a voice.
          <span className="block md:hidden mt-2">Free Palestine.</span>
        </h1>

        <div className="flex justify-end text-[16px] text-[#E4230A] hidden md:flex items-end">
          <AuthorName />
        </div>
      </div>

      <InfiniteImageScroller />

      <div className="flex flex-row flex-col w-full justify-between align-center p-6 md:p-10">
        <div className="flex  text-[16px] text-[#E4230A] flex md:hidden items-end">
          <AuthorName />
        </div>

        <h1 className="text-[36px] md:text-[48px] hidden md:block leading-none font-bold">
          Free Palestine.
        </h1>

        <div className="flex flex-row gap-4 text-[16px]">
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