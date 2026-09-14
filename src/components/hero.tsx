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
    <section
      id="hero"
      className="relative h-dvh w-screen overflow-x-hidden"
    >
      {/* LOADING SCREEN */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* VIDEO FRAME */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* BACKGROUND VIDEO */}
        <video
          src="https://file.garden/aN0Uo2YmaWI-OmAY/ezgif-686e4691d20e3345.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="pointer-events-none absolute left-0 top-0 size-full object-cover object-center"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        />

        {/* FILM GRAIN */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.9'/%3E%3C/svg%3E")
            `,
            backgroundSize: "180px 180px",
            opacity: 0.24,
            mixBlendMode: "soft-light",
          }}
        />

        {/* SUBTLE FILM SCANLINES */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.035) 0px,
                rgba(255,255,255,0.035) 1px,
                transparent 1px,
                transparent 5px
              )
            `,
            opacity: 0.32,
            mixBlendMode: "overlay",
          }}
        />

        {/* SECONDARY GRAIN */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.45' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='.65'/%3E%3C/svg%3E")
            `,
            backgroundSize: "250px 250px",
            opacity: 0.12,
            mixBlendMode: "overlay",
          }}
        />

        {/* VERY LIGHT DARKENING */}
        <div className="pointer-events-none absolute inset-0 z-30 bg-black/[0.04]" />

        {/* HERO CONTENT */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Ra<b>n</b>sxm
            </h1>

            <button
              id="watch-trailer"
              onClick={handleWatchTrailer}
              className="group relative z-10 flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full border border-white px-7 py-3 text-white transition hover:opacity-75"
            >
              <TiLocationArrow />

              <p className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                Watch Trailer
              </p>
            </button>
          </div>

          {/* DISCORD CARDS */}
          <div className="absolute right-10 top-32 scale-50 sm:scale-75 md:scale-100">
            <DiscordCards />
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
          onClick={handleCloseTrailer}
        >
          <div
            className="relative w-11/12 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={handleCloseTrailer}
              className="absolute -top-10 right-0 text-2xl text-white hover:text-gray-300"
            >
              ✕
            </button>

            {/* YOUTUBE VIDEO */}
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
