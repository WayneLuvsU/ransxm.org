import { useEffect, useState } from "react";
import { MembersGrid } from "./members-grid";

const TypewriterText = ({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <>{displayedText}</>;
};

export const Features = () => {
  const descriptionText = "RANSXM is a high-energy digital community built around knowledge, creativity, and awareness of the cyber world. What started as a collective of like-minded individuals has evolved into a space where curiosity, skill, and modern internet culture collide. We operate not to cause harm, but to learn, experiment, and apply knowledge responsibly. It is about knowledge, control, discipline, and using skills for the right reasons.";
  const [typewriterComplete, setTypewriterComplete] = useState(false);

  return (
    <section id="nexus" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="mx-auto font-circular-web text-lg text-blue-50 text-center">
           Introducing Ransxm 
          </p>

          <p className="mt-24 max-w-4xl mx-auto font-circular-web text-lg text-blue-50 opacity-50 text-center">
            <TypewriterText text={descriptionText} speed={20} onComplete={() => setTypewriterComplete(true)} />
          </p>

          <div className="mt-12 flex justify-center">
            <a 
              href="https://discord.gg/N8ngBwFK" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-8 py-3 border-2 border-white text-white font-circular-web text-lg hover:bg-white hover:text-black transition-colors duration-300 ${
                typewriterComplete 
                  ? 'animate-in fade-in zoom-in duration-500' 
                  : 'opacity-0 scale-75'
              }`}
            >
              JOIN US!
            </a>
          </div>
        </div>

        <div className="py-20">
          <p className="font-general text-sm uppercase md:text-[10px] text-center mb-16 text-blue-50">
            MEMBERS
          </p>

          <MembersGrid />
        </div>
      </div>
    </section>
  );
};
