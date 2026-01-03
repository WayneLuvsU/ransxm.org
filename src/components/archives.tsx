import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const Archives = () => {
  const archivesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!archivesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to("html", {
        backgroundColor: "#ffffff",
        scrollTrigger: {
          trigger: archivesRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Blend from black to white
            const r = Math.round(0 + (255 - 0) * progress);
            const g = Math.round(0 + (255 - 0) * progress);
            const b = Math.round(0 + (255 - 0) * progress);
            document.documentElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          },
        },
      });

      // Pop-out animation for video cards
      const videoCards = gridRef.current?.querySelectorAll("[data-video-card]");
      if (videoCards) {
        gsap.fromTo(
          videoCards,
          { 
            opacity: 0, 
            scale: 0.8,
            y: 50
          },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const videos = [
    {
      id: 1,
      videoId: "EpzxWhMZ6Q4",
      title: "Archive 1",
    },
    {
      id: 2,
      videoId: "juQtNyuB62g",
      title: "Archive 2",
    },
    {
      id: 3,
      videoId: "FT-F5UFwbG8",
      title: "Archive 3",
    },
    {
      id: 4,
      videoId: "AfDNjWcZrGI",
      title: "Archive 4",
    },
    {
      id: 5,
      videoId: "RwFne43z5Tc",
      title: "Archive 5",
    },
    {
      id: 6,
      videoId: "7RuUDjGos48",
      title: "Archive 6",
    },
    {
      id: 7,
      videoId: "I86PC-VvA70",
      title: "Archive 7",
    },
    {
      id: 8,
      videoId: "pCsr5cfvrgo",
      title: "Archive 8",
    },
  ];

  return (
    <section ref={archivesRef} id="archives" className="min-h-screen w-screen bg-white py-20">
      <div className="container mx-auto px-3 md:px-10">
        <div className="text-center mb-16">
          <p className="font-general text-sm uppercase md:text-[10px] text-black">
            Archives
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} data-video-card className="aspect-video group cursor-pointer">
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
