import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { DiscordCards } from "./discord-cards";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);

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

    // ==========================================
    // RANSXM LETTER-BY-LETTER INTRO
    // ==========================================

    const letters = heroTitleRef.current?.querySelectorAll(
      ".ransxm-letter"
    );

    if (!letters || letters.length === 0) return;

    // Initial state
    gsap.set(letters, {
      opacity: 0,
      y: -180,
      scale: 0.75,
      rotationX: -90,
      filter: "blur(12px)",
      transformOrigin: "50% 100%",
    });

    // Letter reveal: R → A → N → S → X → M
    const introTimeline = gsap.timeline({
      delay: 0.35,
    });

    introTimeline.to(letters, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      filter: "blur(0px)",
      duration: 0.7,
      stagger: 0.14,
      ease: "back.out(1.7)",
    });

    // Small settling motion after all letters arrive
    introTimeline.to(
      letters,
      {
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      },
      "+=0.05"
    );

    // ==========================================
    // GLITCH EFFECT
    // CLEAN → CLEAN → GLITCH → CLEAN → CLEAN → GLITCH
    // ==========================================

    const glitchTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 3.2,
      delay: 1.8,
    });

    glitchTimeline
      // Tiny pre-glitch twitch
      .to(
        letters,
        {
          x: 2,
          skewX: 3,
          duration: 0.035,
          stagger: 0.01,
          ease: "none",
        }
      )

      // Glitch burst
      .to(
        letters,
        {
          x: -5,
          skewX: -8,
          scaleX: 1.04,
          duration: 0.045,
          stagger: {
            each: 0.012,
            from: "random",
          },
          ease: "none",
        }
      )

      .to(
        letters,
        {
          x: 7,
          skewX: 10,
          scaleX: 0.97,
          duration: 0.04,
          stagger: {
            each: 0.01,
            from: "random",
          },
          ease: "none",
        }
      )

      // Hard snap
      .to(
        letters,
        {
          x: -3,
          skewX: -4,
          scaleX: 1.02,
          duration: 0.035,
          stagger: 0.008,
          ease: "none",
        }
      )

      // Return perfectly clean
      .to(letters, {
        x: 0,
        skewX: 0,
        scaleX: 1,
        duration: 0.08,
        ease: "power2.out",
      });

    // ==========================================
    // GLITCH OPACITY FLASH
    // ==========================================

    const opacityGlitch = gsap.timeline({
      repeat: -1,
      repeatDelay: 3.2,
      delay: 1.8,
    });

    opacityGlitch
      .to(letters, {
        opacity: 0.65,
        duration: 0.035,
        stagger: 0.01,
        ease: "none",
      })
      .to(letters, {
        opacity: 1,
        duration: 0.035,
        ease: "none",
      })
      .to(letters, {
        opacity: 0.8,
        duration: 0.025,
        ease: "none",
      })
      .to(letters, {
        opacity: 1,
        duration: 0.05,
        ease: "power2.out",
      });

    return () => {
      introTimeline.kill();
      glitchTimeline.kill();
      opacityGlitch.kill();
    };
  });

  return (
    <section
      id="hero"
      className="relative h-dvh w-screen overflow-x-hidden"
    >
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
        <video
          src="https://file.garden/aN0Uo2YmaWI-OmAY/ezgif-686e4691d20e3345.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute left-0 top-0 size-full object-cover object-center"
        />

        {/* GRAIN + SCANLINES */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.18]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.025) 0px,
                rgba(255,255,255,0.025) 1px,
                transparent 1px,
                transparent 4px
              ),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")
            `,
            mixBlendMode: "overlay",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-30 bg-black/10" />

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">

            {/* ==========================================
                CINEMATIC RANSXM TITLE
            ========================================== */}

            <h1
              ref={heroTitleRef}
              className="hero-heading special-font text-blue-100"
              style={{
                perspective: "1000px",
              }}
            >
              {"RANSXM".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="ransxm-letter inline-block"
                  style={{
                    willChange:
                      "transform, opacity, filter",
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* WATCH TRAILER */}

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
