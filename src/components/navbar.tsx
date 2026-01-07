import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";

import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

import { Button } from "./button";

export const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prevAudioPlaying) => !prevAudioPlaying);
    setIsIndicatorActive((prevIndicatorActive) => !prevIndicatorActive);
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductsClick = () => {
    setShowComingSoon(true);
  };

  useEffect(() => {
    // Autoplay on page fully load
    const handlePageLoad = () => {
      setIsAudioPlaying(true);
      void audioElementRef.current?.play().catch(() => {
        // Autoplay might be blocked by browser
      });
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  useEffect(() => {
    if (isAudioPlaying) void audioElementRef.current?.play();
    else audioElementRef.current?.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
    // Listen for card audio events
    const handleCardAudioPlay = () => {
      audioElementRef.current?.pause();
    };
    const handleCardAudioStop = () => {
      if (isAudioPlaying) void audioElementRef.current?.play();
    };

    window.addEventListener('cardAudioPlay', handleCardAudioPlay);
    window.addEventListener('cardAudioStop', handleCardAudioStop);
    return () => {
      window.removeEventListener('cardAudioPlay', handleCardAudioPlay);
      window.removeEventListener('cardAudioStop', handleCardAudioStop);
    };
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <header
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <div className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <button onClick={() => handleNavClick("hero")} className="transition hover:opacity-75">
                <img src="https://file.garden/aN0Uo2YmaWI-OmAY/Untitled%20design%20(1).png" alt="Logo" className="w-10" />
              </button>

              <Button
                id="product-button"
                rightIcon={TiLocationArrow}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                onClick={handleProductsClick}
              >
                Products
              </Button>
            </div>

            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {NAV_ITEMS.map(({ label, href }) => (
                  <button 
                    key={href} 
                    onClick={() => handleNavClick(href.replace("#", ""))}
                    className="nav-hover-btn"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleAudioIndicator}
                  className="ml-10 flex items-center space-x-1 p-2 transition hover:opacity-75"
                  title="Play Audio"
                >
                  <audio
                    ref={audioElementRef}
                    src="https://file.garden/aN0Uo2YmaWI-OmAY/Hev%20Abi%20-%20molly%20to%20the%20head%20freestyle.mp3"
                    className="hidden"
                    loop
                  />

                  {Array(4)
                    .fill("")
                    .map((_, i) => {
                      return (
                        <div
                          key={i + 1}
                          className={cn(
                            "indicator-line",
                            isIndicatorActive && "active"
                          )}
                          style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                        />
                      );
                    })}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {showComingSoon && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowComingSoon(false)}
        >
          <div
            className="text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="font-circular-web text-6xl font-bold text-blue-50">
              Coming Soon!
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
