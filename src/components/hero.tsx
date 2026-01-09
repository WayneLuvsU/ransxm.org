import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { DiscordCards } from "./discord-cards";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const handleWatchTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <img
          src="https://file.garden/aN0Uo2YmaWI-OmAY/Untitled62_20251227223904.png"
          alt="background"
          className="absolute left-0 top-0 size-full object-cover object-center"
        />

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Ra<b>n</b>sxm 
            </h1>

            <button
              id="watch-trailer"
              onClick={handleWatchTrailer}
              className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full border border-white px-7 py-3 text-white transition hover:opacity-75 flex-center gap-1"
            >
              <TiLocationArrow />
              <p className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                Watch Trailer
              </p>
            </button>
          </div>

          <div className="absolute right-10 top-32 scale-50 sm:scale-75 md:scale-100">
            <DiscordCards />
          </div>
        </div>
      </div>

      {showTrailer && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
          onClick={handleCloseTrailer}
        >
          <div
            className="relative w-11/12 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseTrailer}
              className="absolute -top-10 right-0 text-2xl text-white hover:text-gray-300"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/FT-F5UFwbG8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
