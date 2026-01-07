import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const MembersGrid = () => {
  const dracGridRef = useRef<HTMLDivElement>(null);
  const bannerBgRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const discordUsers = [
      {
        id: "1413874403837476956",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/ransommukhangxtazy.png",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/Hev%20Abi%20-%20MEDICAL%20(1)%20(mp3cut.net).mp3"
      },
      {
        id: "737630884823433267",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/xo.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/Future%20-%20WAIT%20FOR%20U%20(Official%20Audio)%20ft%20(mp3cut.net).mp3"
      },
      {
        id: "1283033719371993111",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/a387c19a64644060f368931d481b712a.png",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/ssstik.io_@supahflyyyy_1766001840975.mp3"
      },
      {
        id: "1015473740391399474",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/0ad735f722522d9a424b2a018ff63319.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/snaptik_7464739156128828678_v2%20(1).mp3"
      },
      {
        id: "453061371513536523",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/8d8c95e3de8ed723cfb50c3ea4a6407d.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/DaBaby%20Ft%20(mp3cut.net).mp3"
      },
      {
        id: "1418922415802679330",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/IMG_6476.jpg",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/guatno-filipino-ot-remix-official-music-video-128-ytshorts.savetube.me.mp3"
      },
      {
        id: "1350849152136773717",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/06d85dfe641057ec9462c0bc6b092aa6.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/Jhen%C3%A9%20Aiko%20-%20Sativa%20ft%20(mp3cut.net).mp3"
      },
      {
        id: "1451159758953250953",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/b2182d59db19a0910fbf7146d1232edb.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/side-p-feat-d0m-128-ytshorts.savetube.me.mp3"
      },
      {
        id: "1427591256552247347",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/1c8b8c326b8356c732ba949aece5a516.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/Tj%20-%20Stay%20Happy%20%5BMusic%20Video%5D%20%20GRM%20Daily.mp3"
      },
      {
        id: "1322249368719593582",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/92c0fdcda32637768839dc73b38a4595.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/M%20Let's%20Do%20It%20(feat.%20Janny%20Saint%2C%20Ddot%20Skinny%20%26%20Rico%20Laced).mp3"
      },
      {
        id: "1380656322046857286",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/From%20KlickPin%20CF%20Pin%20em%20AMoments.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/partynextdoor-drake-nokia-128-ytshorts.savetube.me.mp3"
      },
      {
        id: "1171474815874506864",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/7d329e822816984545eed29b3ece8601.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/xxxtentacion-rip-roach-audio-feat-ki-mask-the-slump-god-128-ytshorts%20(mp3cut.net).mp3"
      },
      {
        id: "1447286267900330184",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/2498b7aeb833d49748f0af151cf199a5.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/jazz-binalagbag-cuervo-messiah-128-ytshorts.savetube.me.mp3"
      },
      {
        id: "1385658740447121423",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/328826fa582ff4e248949e467cd59710.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/hev-abi-ya-dig-freestyle-feat-gins-melodies-128-ytshorts.savetube.me.mp3"
      },
      {
        id: "1309674736887791698",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/Untitled_design.gif",
        music: "https://file.garden/aN0Uo2YmaWI-OmAY/frank-ocean-ivy-128-ytshorts.savetube.me.mp3"
      }
    ];

    async function fetchDiscordInfoMembers(discordId: string) {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json = await res.json();
        if (json.success) {
          const u = json.data.discord_user;
          const avatarUrl = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=512`;
          return {
            displayName: u.display_name || u.username,
            username: u.username,
            avatar: avatarUrl
          };
        }
      } catch (err) {
        console.error('Lanyard fetch error', err);
      }
      return { displayName: 'Unknown', username: 'Unknown', avatar: '' };
    }

    (async () => {
      if (!dracGridRef.current) return;

      for (const user of discordUsers) {
        const info = await fetchDiscordInfoMembers(user.id);

        const drac = document.createElement('div');
        drac.classList.add('drac');

        drac.innerHTML = `
          <div class="drac-banner" style="background-image:url('${user.banner}'); opacity:0.35;"></div>
          <div class="drac-content">
            <div class="avatar" style="background-image:url('${info.avatar}')"></div>
            <div class="info">
              <h1>${info.displayName}</h1>
              <p>@${info.username}</p>
            </div>
          </div>
        `;

        const audio = document.createElement('audio');
        audio.src = user.music;
        audio.preload = "auto";
        audio.volume = 0.5;
        drac.appendChild(audio);

        drac.addEventListener('mouseenter', () => {
          if (bannerBgRef.current) {
            bannerBgRef.current.style.backgroundImage = `url('${user.banner}')`;
            bannerBgRef.current.style.opacity = '1';
          }
          const navbarAudio = (window as any).navbarAudioRef as HTMLAudioElement;
          if (navbarAudio) navbarAudio.pause();
          audio.currentTime = 0;
          audio.play().catch(() => {
            
          });
        });

        drac.addEventListener('mouseleave', () => {
          if (bannerBgRef.current) {
            bannerBgRef.current.style.opacity = '0';
          }
          audio.pause();
          audio.currentTime = 0;
          const navbarAudio = (window as any).navbarAudioRef as HTMLAudioElement;
          const wasPlaying = (window as any).isNavbarAudioPlaying as boolean;
          if (navbarAudio && wasPlaying) navbarAudio.play().catch(() => {});
        });

        dracGridRef.current.appendChild(drac);
      }

      // Add scroll animation to all drac cards
      if (dracGridRef.current) {
        const dracCards = dracGridRef.current.querySelectorAll('.drac');
        
        gsap.fromTo(
          dracCards,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dracGridRef.current,
              start: "top center+=100",
              end: "center center",
              scrub: 0.5,
              markers: false,
            },
          }
        );
      }
    })();
  }, []);

  return (
    <div className="w-full">
      <div 
        ref={bannerBgRef}
        className="drac-banner-bg"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: 0,
          filter: 'blur(2px) brightness(0.6)',
          transition: 'opacity 0.6s ease, background 0.3s ease',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        ref={dracGridRef}
        className="drac-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 600px)',
          gap: '30px',
          zIndex: 2,
          maxWidth: '100%',
          position: 'relative',
          justifyContent: 'center',
          padding: '40px 20px'
        }}
      />
    </div>
  );
};
