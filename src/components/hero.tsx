import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

import { DiscordCards } from "./discord-cards";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const heroTitleRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsLoading(false);
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      transformPerspective: 1600,
      transformOrigin: "50% 50%",
      transformStyle: "preserve-3d",
    });

    gsap.to("#video-frame", {
      rotateX: -18,
      rotateY: -28,
      scale: 0.94,
      y: 25,
      ease: "none",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    const title = heroTitleRef.current;
    if (!title) return;

    const letters = title.querySelectorAll(".ransxm-letter");
    const glitchLayers = title.querySelectorAll(".ransxm-glitch-layer");

    gsap.set(letters, {
      opacity: 0,
      y: -150,
      scale: 0.8,
      rotationX: -80,
      filter: "blur(10px)",
      transformOrigin: "50% 100%",
    });

    gsap.set(glitchLayers, {
      opacity: 0,
      x: 0,
      y: 0,
      skewX: 0,
    });

    const intro = gsap.timeline({
      delay: 0.35,
    });

    intro.to(letters, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      filter: "blur(0px)",
      duration: 0.7,
      stagger: 0.13,
      ease: "back.out(1.7)",
    });

    const glitch = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      delay: 2.8,
    });

    glitch
      .set(glitchLayers, {
        opacity: 0,
        x: 0,
        y: 0,
        skewX: 0,
      })
      .to(".ransxm-glitch-top", {
        opacity: 0.9,
        x: -7,
        y: -2,
        skewX: -6,
        duration: 0.04,
        ease: "none",
      })
      .to(
        ".ransxm-glitch-bottom",
        {
          opacity: 0.75,
          x: 8,
          y: 2,
          skewX: 6,
          duration: 0.04,
          ease: "none",
        },
        "<",
      )
      .to(".ransxm-glitch-top", {
        x: 10,
        y: 1,
        skewX: 9,
        opacity: 0.55,
        duration: 0.045,
        ease: "none",
      })
      .to(
        ".ransxm-glitch-bottom",
        {
          x: -10,
          y: -1,
          skewX: -9,
          opacity: 0.55,
          duration: 0.045,
          ease: "none",
        },
        "<",
      )
      .to(".ransxm-glitch-left", {
        opacity: 0.8,
        x: -8,
        duration: 0.035,
        ease: "none",
      })
      .to(
        ".ransxm-glitch-right",
        {
          opacity: 0.7,
          x: 8,
          duration: 0.035,
          ease: "none",
        },
        "<",
      )
      .to(glitchLayers, {
        x: 0,
        y: 0,
        skewX: 0,
        opacity: 0,
        duration: 0.07,
        ease: "none",
      });

    return () => {
      intro.kill();
      glitch.kill();
    };
  });

  return (
    <section
      id="hero"
      className="relative h-dvh w-screen overflow-hidden"
      style={{ perspective: "1600px" }}
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
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
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
            <div
              ref={heroTitleRef}
              className="relative ml-6 sm:ml-12 md:ml-20 lg:ml-24"
              style={{ perspective: "1000px" }}
            >
              <h1
                aria-hidden="true"
                className="ransxm-glitch-layer ransxm-glitch-top hero-heading special-font pointer-events-none absolute left-0 top-0"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                }}
              >
                RANSXM
              </h1>

              <h1
                aria-hidden="true"
                className="ransxm-glitch-layer ransxm-glitch-bottom hero-heading special-font pointer-events-none absolute left-0 top-0"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.8)",
                }}
              >
                RANSXM
              </h1>

              <h1
                aria-hidden="true"
                className="ransxm-glitch-layer ransxm-glitch-left hero-heading special-font pointer-events-none absolute left-0 top-0"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.7)",
                  clipPath: "inset(15% 85% 15% 0)",
                }}
              >
                RANSXM
              </h1>

              <h1
                aria-hidden="true"
                className="ransxm-glitch-layer ransxm-glitch-right hero-heading special-font pointer-events-none absolute left-0 top-0"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.7)",
                  clipPath: "inset(15% 0 15% 85%)",
                }}
              >
                RANSXM
              </h1>

              <h1
                className="hero-heading special-font relative"
                style={{
                  willChange: "transform, opacity, filter",
                }}
              >
                <span
                  className="ransxm-letter inline-block"
                  style={{ color: "#ff003c" }}
                >
                  R
                </span>
                <span
                  className="ransxm-letter inline-block"
                  style={{ color: "#ff003c" }}
                >
                  A
                </span>
                <span
                  className="ransxm-letter inline-block"
                  style={{ color: "#ff003c" }}
                >
                  N
                </span>
                <span
                  className="ransxm-letter inline-block"
                  style={{ color: "#a855f7" }}
                >
                  S
                </span>
                <span
                  className="ransxm-letter inline-block"
                  style={{ color: "#a855f7" }}
                >
                  X
                </span>
                <span
                  className="ransxm-letter inline-block"
                  style={{ color: "#a855f7" }}
                >
                  M
                </span>
              </h1>
            </div>

          </div>

          <div className="absolute right-10 top-32 scale-50 sm:scale-75 md:scale-100">
            <DiscordCards />
          </div>
        </div>
      </div>

     
    </section>
  );
};
