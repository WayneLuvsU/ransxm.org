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

  const heroTitleRef = useRef<HTMLDivElement>(null);

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
    // ==========================================
    // VIDEO FRAME SCROLL ANIMATION
    // ==========================================

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
    // RANSXM TITLE
    // ==========================================

    const title = heroTitleRef.current;

    if (!title) return;

    const letters = title.querySelectorAll(".ransxm-letter");

    const outlineTop = title.querySelector(
      ".ransxm-glitch-top"
    ) as HTMLElement | null;

    const outlineBottom = title.querySelector(
      ".ransxm-glitch-bottom"
    ) as HTMLElement | null;

    const outlineLeft = title.querySelector(
      ".ransxm-glitch-left"
    ) as HTMLElement | null;

    const outlineRight = title.querySelector(
      ".ransxm-glitch-right"
    ) as HTMLElement | null;

    // ==========================================
    // INITIAL LETTER STATE
    // R → A → N → S → X → M
    // ==========================================

    gsap.set(letters, {
      opacity: 0,
      y: -180,
      scale: 0.75,
      rotationX: -90,
      filter: "blur(12px)",
      transformOrigin: "50% 100%",
    });

    // Keep glitch borders hidden initially
    gsap.set(
      [
        outlineTop,
        outlineBottom,
        outlineLeft,
        outlineRight,
      ],
      {
        opacity: 0,
      }
    );

    // ==========================================
    // LETTER-BY-LETTER REVEAL
    // ==========================================

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

    // Small final settle
    introTimeline.to(
      letters,
      {
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "+=0.05"
    );

    // ==========================================
    // BORDER GLITCH SYSTEM
    //
    // CLEAN
    // CLEAN
    // GLITCH
    // CLEAN
    // CLEAN
    // GLITCH
    // ==========================================

    const glitchTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 3.4,
      delay: 2.6,
    });

    // ------------------------------------------
    // FIRST BORDER TEAR
    // ------------------------------------------

    glitchTimeline
      .set(outlineTop, {
        opacity: 0,
        clipPath: "inset(0 0 85% 0)",
        x: 0,
        y: 0,
      })
      .set(outlineBottom, {
        opacity: 0,
        clipPath: "inset(85% 0 0 0)",
        x: 0,
        y: 0,
      })
      .set(outlineLeft, {
        opacity: 0,
        clipPath: "inset(20% 85% 20% 0)",
        x: 0,
        y: 0,
      })
      .set(outlineRight, {
        opacity: 0,
        clipPath: "inset(20% 0 20% 85%)",
        x: 0,
        y: 0,
      })

      // TOP BORDER FLASH
      .to(outlineTop, {
        opacity: 0.9,
        x: -8,
        y: -2,
        duration: 0.045,
        ease: "none",
      })

      // BOTTOM BORDER FLASH
      .to(
        outlineBottom,
        {
          opacity: 0.75,
          x: 9,
          y: 2,
          duration: 0.045,
          ease: "none",
        },
        "<"
      )

      // LEFT BORDER
      .to(
        outlineLeft,
        {
          opacity: 0.8,
          x: -5,
          duration: 0.04,
          ease: "none",
        },
        "<"
      )

      // RIGHT BORDER
      .to(
        outlineRight,
        {
          opacity: 0.7,
          x: 6,
          duration: 0.04,
          ease: "none",
        },
        "<"
      )

      // ------------------------------------------
      // QUICK BORDER DISPLACEMENT
      // ------------------------------------------

      .to(outlineTop, {
        x: 13,
        y: 3,
        opacity: 0.55,
        duration: 0.04,
        ease: "none",
      })

      .to(
        outlineBottom,
        {
          x: -12,
          y: -3,
          opacity: 0.5,
          duration: 0.04,
          ease: "none",
        },
        "<"
      )

      .to(
        outlineLeft,
        {
          x: 8,
          opacity: 0.45,
          duration: 0.04,
          ease: "none",
        },
        "<"
      )

      .to(
        outlineRight,
        {
          x: -9,
          opacity: 0.45,
          duration: 0.04,
          ease: "none",
        },
        "<"
      )

      // ------------------------------------------
      // HARD BORDER SNAP
      // ------------------------------------------

      .to(outlineTop, {
        x: -4,
        y: 0,
        opacity: 0.85,
        duration: 0.035,
        ease: "none",
      })

      .to(
        outlineBottom,
        {
          x: 4,
          y: 0,
          opacity: 0.8,
          duration: 0.035,
          ease: "none",
        },
        "<"
      )

      // ------------------------------------------
      // FINAL FLICKER
      // ------------------------------------------

      .to(
        [
          outlineTop,
          outlineBottom,
          outlineLeft,
          outlineRight,
        ],
        {
          opacity: 0,
          duration: 0.08,
          ease: "none",
        }
      );

    // ==========================================
    // RANDOM MICRO BORDER FLASHES
    // ==========================================

    const microGlitch = gsap.timeline({
      repeat: -1,
      repeatDelay: 3.4,
      delay: 2.6,
    });

    microGlitch
      .to(outlineTop, {
        opacity: 0.45,
        x: -15,
        duration: 0.025,
        ease: "none",
      })
      .to(outlineTop, {
        opacity: 0,
        x: 0,
        duration: 0.025,
        ease: "none",
      })
      .to(outlineBottom, {
        opacity: 0.4,
        x: 12,
        duration: 0.025,
        ease: "none",
      })
      .to(outlineBottom, {
        opacity: 0,
        x: 0,
        duration: 0.025,
        ease: "none",
      });

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      introTimeline.kill();
      glitchTimeline.kill();
      microGlitch.kill();
    };
  });

  return (
    <section
      id="hero"
      className="relative h-dvh w-screen overflow-x-hidden"
    >
      {/* ==========================================
          LOADING SCREEN
      ========================================== */}

      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* ==========================================
          VIDEO FRAME
      ========================================== */}

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

        {/* ==========================================
            GRAIN + SCANLINES
        ========================================== */}

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

        {/* ==========================================
            HERO CONTENT
        ========================================== */}

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">

            {/* ==========================================
                RANSXM CINEMATIC TITLE
            ========================================== */}

            <div
              ref={heroTitleRef}
              className="relative"
              style={{
                perspective: "1000px",
              }}
            >
              {/* ========================================
                  TOP GLITCH BORDER
              ======================================== */}

              <h1
                aria-hidden="true"
                className="hero-heading special-font pointer-events-none absolute left-0 top-0 text-blue-100"
                style={{
                  color: "transparent",
                  WebkitTextStroke:
                    "2px rgba(255,255,255,0.95)",
                  opacity: 0,
                  clipPath: "inset(0 0 85% 0)",
                  willChange:
                    "transform, opacity, clip-path",
                }}
              >
                RANSXM
              </h1>

              {/* ========================================
                  BOTTOM GLITCH BORDER
              ======================================== */}

              <h1
                aria-hidden="true"
                className="hero-heading special-font pointer-events-none absolute left-0 top-0 text-blue-100"
                style={{
                  color: "transparent",
                  WebkitTextStroke:
                    "2px rgba(255,255,255,0.95)",
                  opacity: 0,
                  clipPath: "inset(85% 0 0 0)",
                  willChange:
                    "transform, opacity, clip-path",
                }}
              >
                RANSXM
              </h1>

              {/* ========================================
                  LEFT GLITCH BORDER
              ======================================== */}

              <h1
                aria-hidden="true"
                className="ransxm-glitch-left hero-heading special-font pointer-events-none absolute left-0 top-0 text-blue-100"
                style={{
                  color: "transparent",
                  WebkitTextStroke:
                    "1px rgba(255,255,255,0.8)",
                  opacity: 0,
                  clipPath: "inset(20% 85% 20% 0)",
                  willChange:
                    "transform, opacity, clip-path",
                }}
              >
                RANSXM
              </h1>

              {/* ========================================
                  RIGHT GLITCH BORDER
              ======================================== */}

              <h1
                aria-hidden="true"
                className="ransxm-glitch-right hero-heading special-font pointer-events-none absolute left-0 top-0 text-blue-100"
                style={{
                  color: "transparent",
                  WebkitTextStroke:
                    "1px rgba(255,255,255,0.8)",
                  opacity: 0,
                  clipPath: "inset(20% 0 20% 85%)",
                  willChange:
                    "transform, opacity, clip-path",
                }}
              >
                RANSXM
              </h1>

              {/* ========================================
                  MAIN CLEAN RANSXM
              ======================================== */}

              <h1
                className="hero-heading special-font relative text-blue-100"
                style={{
                  willChange:
                    "transform, opacity, filter",
                }}
              >
                {"RANSXM".split("").map(
                  (letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      className="ransxm-letter inline-block"
                    >
                      {letter}
                    </span>
                  )
                )}
              </h1>
            </div>

            {/* ==========================================
                WATCH TRAILER
            ========================================== */}

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

          {/* ==========================================
              DISCORD CARDS
          ========================================== */}

          <div className="absolute right-10 top-32 scale-50 sm:scale-75 md:scale-100">
            <DiscordCards />
          </div>
        </div>
      </div>

      {/* ==========================================
          TRAILER MODAL
      ========================================== */}

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
