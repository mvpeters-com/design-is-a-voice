"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";

interface ParticipateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ParticipateModal = ({ isOpen, onRequestClose }: ParticipateModalProps) => {
  useEffect(() => {
    // Set the app element for accessibility
    ReactModal.setAppElement("body");
  }, []);

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Participate Modal"
        className="fixed inset-0 flex items-center justify-center md:p-0 outline-none"
        overlayClassName="fixed inset-0 bg-black/90 bg-opacity-60 z-50"
        bodyOpenClassName="overflow-hidden"
      >
        <div className="bg-[#E4230A] text-black relative w-full h-full md:w-[1280px] md:h-[640px] overflow-y-auto flex flex-col">
          {/* Close button */}
          <button
            onClick={onRequestClose}
            className="absolute top-4 right-4 md:top-5 md:right-5 bg-transparent border-none text-black text-2xl md:text-3xl cursor-pointer w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:opacity-70 z-10"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Modal content */}
          <div className="p-6 md:p-10 pt-12 md:pt-10 flex flex-col h-full">
            {/* Title - Top on both mobile and desktop */}
            <h2 className="text-[40px] md:text-[48px] font-bold leading-tight mb-8 md:mb-10 max-w-[90%] md:max-w-[80%]">
              Design is a voice.
              <br />
              <span className="text-white">Use it.</span>
            </h2>

            {/* Mobile Layout: Middle section with sizes + icons, Bottom with email */}
            <div className="flex-1 flex flex-col justify-between md:hidden">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-0">
                  <div className="flex gap-2 text-base text-white">
                    <span>Size:</span>
                    <span className="font-bold">3000×1500px</span>
                  </div>
                  <div className="flex gap-2 text-base text-white">
                    <span>Color:</span>
                    <span className="font-bold">#E4230A</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="/templates/design_is_a_voice_template.psd"
                    download="design_is_a_voice_template.psd"
                    className="w-10 h-10 border-2 rounded-md border-white text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-[#E4230A] transition-colors cursor-pointer"
                  >
                    Ps
                  </a>
                  <a
                    href="/templates/design_is_a_voice_template.ai"
                    download="design_is_a_voice_template.ai"
                    className="w-10 h-10 border-2 rounded-md border-white text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-[#E4230A] transition-colors cursor-pointer"
                  >
                    Ai
                  </a>
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href="mailto:hello@omvorm.studio"
                  className="text-white no-underline text-base hover:underline"
                >
                  hello@omvorm.studio
                </a>
              </div>
            </div>

            {/* Desktop Layout: Bottom row with sizes + icons on left, email on right */}
            <div className="hidden md:flex md:flex-1 md:flex-col md:justify-end">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-0">
                    <div className="flex gap-2 text-base text-black">
                      <span>Size:</span>
                      <span className="font-bold">3000×1500px</span>
                    </div>
                    <div className="flex gap-2 text-base text-black">
                      <span>Color:</span>
                      <span className="font-bold">#E4230A</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="/templates/design_is_a_voice_template.psd"
                      download="design_is_a_voice_template.psd"
                      className="w-10 h-10 border-2 border-white rounded-md text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-[#E4230A] transition-colors cursor-pointer"
                    >
                      Ps
                    </a>
                    <a
                      href="/templates/design_is_a_voice_template.ai"
                      download="design_is_a_voice_template.ai"
                      className="w-10 h-10 border-2 border-white rounded-md text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-[#E4230A] transition-colors cursor-pointer"
                    >
                      Ai
                    </a>
                  </div>
                </div>

                <div>
                  <a
                    href="mailto:hello@omvorm.studio"
                    className="text-white no-underline text-base hover:underline"
                  >
                    hello@omvorm.studio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default ParticipateModal;
