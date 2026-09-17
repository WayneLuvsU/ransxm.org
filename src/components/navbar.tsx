import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { NAV_ITEMS } from "@/constants";

gsap.registerPlugin(ScrollToPlugin);

export const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const targetY =
      element.getBoundingClientRect().top +
      window.scrollY -
      80;

    gsap.to(window, {
      scrollTo: {
        y: targetY,
        autoKill: true,
      },
      duration: 1.8,
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    const handlePageLoad = () => {
      setIsNavVisible(true);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);

      return () => {
        window.removeEventListener("load", handlePageLoad);
      };
    }
  }, []);

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
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <div className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <button
              onClick={() => handleNavClick("hero")}
              className="transition hover:opacity-75"
            >
              <img
                src="https://file.garden/aN0Uo2YmaWI-OmAY/Untitled%20design%20(1).png"
                alt="Logo"
                className="w-10"
              />
            </button>
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
          </div>
        </nav>
      </div>
    </header>
  );
};
