import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { DiscordCards } from "./discord-cards";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
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
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden"
      >
 
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
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />


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

       
        <div className="pointer-events-none absolute inset-0 z-30 bg-black/[0.04]" />


        <div className="absolute inset-0 z-40">
          <div className="absolute left-0 top-0 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-white">
                RANSXM
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-white/80">
                Welcome to the RANSXM community.
              </p>

              <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-3 font-general text-xs uppercase">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Enter RANSXM
                </span>

                <TiLocationArrow className="relative z-10 transition-colors duration-300 group-hover:text-white" />

                <span className="absolute inset-0 z-0 translate-y-full bg-black transition-transform duration-300 group-hover:translate-y-0" />
              </button>
            </div>
          </div>

  
          <DiscordCards />
        </div>
      </div>
    </div>
  );
};
