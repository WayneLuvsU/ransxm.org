import { AnimatedTitle } from "./animated-title";

export const Story = () => {
  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center justify-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          affiliations
        </p>

        <div className="relative w-full">
          <AnimatedTitle containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10">
            {"<b>A</b>lliances"}
          </AnimatedTitle>
        </div>

        <div className="mt-16 flex justify-center gap-8 flex-wrap md:flex-nowrap">
          <img 
            src="https://file.garden/aN0Uo2YmaWI-OmAY/13.png" 
            alt="Alliance 1" 
            className="h-80 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer"
          />
          <img 
            src="https://file.garden/aN0Uo2YmaWI-OmAY/purpp.png" 
            alt="Alliance 2" 
            className="h-80 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer"
          />
          <img 
            src="https://file.garden/aN0Uo2YmaWI-OmAY/stunnaz.png" 
            alt="Alliance 3" 
            className="h-80 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer"
          />
          <img 
            src="https://file.garden/aN0Uo2YmaWI-OmAY/5ffe9bcee94f63a8ed74b19f4ae7b903-1-removebg-preview.png" 
            alt="Alliance 4" 
            className="h-80 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};
