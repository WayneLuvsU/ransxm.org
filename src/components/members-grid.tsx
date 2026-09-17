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
        id: "1498182038342336542",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/ransommukhangxtazy.png",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/Hev%20Abi%20-%20MEDICAL%20(1)%20(mp3cut.net).mp3",
      },
      {
        id: "737630884823433267",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/xo.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/Teenage%20Fever%20%5BUc57OKGTDXk%5D%20(mp3cut.net).mp3",
      },
      {
        id: "1411934822544314381",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/a387c19a64644060f368931d481b712a.png",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/ssstik.io_@supahflyyyy_1766001840975.mp3",
      },
      {
        id: "1015473740391399474",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/0ad735f722522d9a424b2a018ff63319.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/snaptik_7464739156128828678_v2%20(1).mp3",
      },
      {
        id: "453061371513536523",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/8d8c95e3de8ed723cfb50c3ea4a6407d.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/DaBaby%20Ft%20(mp3cut.net).mp3",
      },
      {
        id: "1418922415802679330",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/IMG_6476.jpg",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/guatno-filipino-ot-remix-official-music-video-128-ytshorts.savetube.me.mp3",
      },
      {
        id: "1171474815874506864",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/7d329e822816984545eed29b3ece8601.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/xxxtentacion-rip-roach-audio-feat-ki-mask-the-slump-god-128-ytshorts%20(mp3cut.net).mp3",
      },
      {
        id: "1477383583386828850",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/Untitled_design.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/frank-ocean-ivy-128-ytshorts.savetube.me.mp3",
      },
      {
        id: "1361012595561205951",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/d310d314fc99e1aedd20294e5cc6c5b1.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/I%20BE%20LIKE%20(DIFG)%20-%20gaspari%20x%20costa%20cashman%20(OLV).mp3",
      },
      {
        id: "1286586160361246789",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/IMG_0111.jpg",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/offtide!%20-%20by%20a%20thread%20(Official%20Video)%20(1)%20(mp3cut.net).mp3",
      },
      {
        id: "1380573575282692166",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/328826fa582ff4e248949e467cd59710.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/hev-abi-ya-dig-freestyle-feat-gins-melodies-128-ytshorts.savetube.me.mp3",
      },
      {
        id: "984436577612759111",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/09fae4879b5c83ac5620f3e0b75156fb.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/Teenage%20Fever%20%5BUc57OKGTDXk%5D%20(mp3cut.net).mp3",
      },
      {
        id: "1252278719184113724",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/8a266a935a82db27b3c75a8d6dab9b1a.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/Downtown%20Q%20-%20Panadero%202%20No%20Heart%20Remix%20feat%20(mp3cut.net)%20(1).mp3",
      },
      {
        id: "1501588984810176792",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/902fb683da6e99129aa43990f81607cd.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/nazty-kidd-those-eyez-ft-hev-abi-official-lyric-video-128-ytshorts%20(mp3cut.net).mp3",
      },
    ];

    const activityIcons: Record<string, string> = {
      Roblox: "https://cdn.simpleicons.org/roblox/ffffff",
      "Visual Studio Code": "https://cdn.simpleicons.org/visualstudiocode/ffffff",
      Discord: "https://cdn.simpleicons.org/discord/ffffff",
      Chrome: "https://cdn.simpleicons.org/googlechrome/ffffff",
      Firefox: "https://cdn.simpleicons.org/firefox/ffffff",
      Steam: "https://cdn.simpleicons.org/steam/ffffff",
      VALORANT: "https://cdn.simpleicons.org/valorant/ffffff",
      "League of Legends":
        "https://cdn.simpleicons.org/leagueoflegends/ffffff",
      Minecraft: "https://cdn.simpleicons.org/minecraft/ffffff",
      Fortnite: "https://cdn.simpleicons.org/fortnite/ffffff",
      "Call of Duty": "https://cdn.simpleicons.org/callofduty/ffffff",
      Spotify: "https://cdn.simpleicons.org/spotify/ffffff",
      YouTube: "https://cdn.simpleicons.org/youtube/ffffff",
      Netflix: "https://cdn.simpleicons.org/netflix/ffffff",
      Twitch: "https://cdn.simpleicons.org/twitch/ffffff",
      "Among Us": "https://cdn.simpleicons.org/amongus/ffffff",
      "Genshin Impact": "https://cdn.simpleicons.org/genshinimpact/ffffff",
      "Adobe Photoshop": "https://cdn.simpleicons.org/adobephotoshop/ffffff",
      "Apex Legends": "https://cdn.simpleicons.org/apexlegends/ffffff",
      "Cyberpunk 2077": "https://cdn.simpleicons.org/cyberpunk2077/ffffff",
      Dota: "https://cdn.simpleicons.org/dota/ffffff",
      "Rocket League": "https://cdn.simpleicons.org/rocketleague/ffffff",
      PUBG: "https://cdn.simpleicons.org/pubg/ffffff",
      "Grand Theft Auto V": "https://cdn.simpleicons.org/rockstargames/ffffff",
      "Grand Theft Auto V Legacy":
        "https://cdn.simpleicons.org/rockstargames/ffffff",
      Bloodstrike: "https://cdn.simpleicons.org/target/ffffff",
    };

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const renderDiscordEmoji = (emoji: any) => {
      if (!emoji) return "";

      if (emoji.id) {
        const ext = emoji.animated ? "gif" : "png";

        return `<img src="https://cdn.discordapp.com/emojis/${emoji.id}.${ext}?size=32" style="width:18px;height:18px;object-fit:contain;vertical-align:middle;margin-right:6px;" />`;
      }

      return escapeHtml(emoji.name || "");
    };

    const getStatusInfo = (status: string) => {
      if (status === "online") {
        return {
          label: "Online",
          color: "#23a55a",
        };
      }

      if (status === "idle") {
        return {
          label: "Idle",
          color: "#f0b232",
        };
      }

      if (status === "dnd") {
        return {
          label: "Do Not Disturb",
          color: "#f23f42",
        };
      }

      return {
        label: "Offline",
        color: "#747f8d",
      };
    };

    const updateDiscordCard = (drac: HTMLElement, discordData: any) => {
      const status = discordData?.discord_status || "offline";
      const statusInfo = getStatusInfo(status);

      const customActivity = discordData?.activities?.find(
        (activity: any) => activity.type === 4
      );

      const activities =
        discordData?.activities?.filter(
          (activity: any) =>
            activity.type !== 4 && activity.name !== "Spotify"
        ) || [];

      const statusElement = drac.querySelector(
        ".drac-status"
      ) as HTMLElement | null;

      const customStatusElement = drac.querySelector(
        ".drac-custom-status"
      ) as HTMLElement | null;

      const activityElement = drac.querySelector(
        ".drac-activity"
      ) as HTMLElement | null;

      if (statusElement) {
        statusElement.innerHTML = `
          <span class="drac-status-dot" style="background:${statusInfo.color};box-shadow:0 0 8px ${statusInfo.color};"></span>
          <span>${statusInfo.label}</span>
        `;
      }

      if (customStatusElement) {
        if (customActivity) {
          customStatusElement.style.display = "flex";
          customStatusElement.innerHTML = `
            <span class="drac-custom-emoji">
              ${renderDiscordEmoji(customActivity.emoji)}
            </span>
            <span>${escapeHtml(customActivity.state || "")}</span>
          `;
        } else {
          customStatusElement.style.display = "none";
          customStatusElement.innerHTML = "";
        }
      }

      if (activityElement) {
        if (activities.length > 0) {
          const activity = activities[0];

          const icon =
            activityIcons[activity.name] ||
            activity.assets?.large_image ||
            "";

          let iconHtml = "";

          if (icon.startsWith("http")) {
            iconHtml = `<img src="${icon}" class="drac-activity-icon" />`;
          }

          const activityDetails =
            activity.details ||
            activity.state ||
            activity.name ||
            "";

          const activityState =
            activity.details && activity.state
              ? activity.state
              : "";

          activityElement.style.display = "flex";

          activityElement.innerHTML = `
            <div class="drac-activity-icon-wrap">
              ${iconHtml}
            </div>
            <div class="drac-activity-text">
              <span class="drac-activity-label">ACTIVITY</span>
              <strong>${escapeHtml(activity.name || "Activity")}</strong>
              <span>${escapeHtml(activityDetails)}</span>
              ${
                activityState
                  ? `<span>${escapeHtml(activityState)}</span>`
                  : ""
              }
            </div>
          `;
        } else {
          activityElement.style.display = "none";
          activityElement.innerHTML = "";
        }
      }
    };

    const fetchDiscordInfoMembers = async (discordId: string) => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${discordId}`
        );

        const json = await res.json();

        if (json.success) {
          const data = json.data;
          const u = data.discord_user;

          const avatarUrl = u.avatar
            ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=512`
            : `https://cdn.discordapp.com/embed/avatars/${Number(u.discriminator || 0) % 5}.png`;

          return {
            data,
            displayName: u.global_name || u.display_name || u.username,
            username: u.username,
            avatar: avatarUrl,
          };
        }
      } catch (err) {
        console.error("Lanyard fetch error", err);
      }

      return {
        data: null,
        displayName: "Unknown",
        username: "Unknown",
        avatar: "",
      };
    };

    const activeState = {
      card: null as HTMLElement | null,
      originalRect: null as DOMRect | null,
      originalHeight: 0,
      audio: null as HTMLAudioElement | null,
    };

    const resetCards = () => {
      if (!dracGridRef.current) return;

      const cards =
        dracGridRef.current.querySelectorAll<HTMLElement>(".drac");

      cards.forEach((card) => {
        gsap.killTweensOf(card);

        card.classList.remove("drac-active");

        gsap.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });

        card.style.zIndex = "2";
        card.style.height = `${card.dataset.originalHeight || "220"}px`;
      });

      if (bannerBgRef.current) {
        bannerBgRef.current.style.opacity = "0";
      }

      if (activeState.audio) {
        activeState.audio.pause();
        activeState.audio.currentTime = 0;
      }

      const navbarAudio = (window as any)
        .navbarAudioRef as HTMLAudioElement;

      const wasPlaying = (window as any)
        .isNavbarAudioPlaying as boolean;

      if (navbarAudio && wasPlaying) {
        navbarAudio.play().catch(() => {});
      }

      activeState.card = null;
      activeState.originalRect = null;
      activeState.audio = null;
    };

    const activateCard = (
      drac: HTMLElement,
      user: (typeof discordUsers)[number],
      audio: HTMLAudioElement
    ) => {
      if (
        activeState.card &&
        activeState.card !== drac
      ) {
        return;
      }

      if (activeState.card === drac) return;

      activeState.card = drac;
      activeState.originalRect = drac.getBoundingClientRect();
      activeState.originalHeight = drac.offsetHeight;
      activeState.audio = audio;

      drac.dataset.originalHeight = String(
        activeState.originalHeight
      );

      const rect = activeState.originalRect;

      const targetWidth = Math.min(
        Math.max(rect.width, 600),
        window.innerWidth - 80
      );

      const targetHeight = Math.min(
        Math.max(activeState.originalHeight + 160, 380),
        window.innerHeight - 100
      );

      const targetLeft =
        (window.innerWidth - targetWidth) / 2;

      const targetTop =
        (window.innerHeight - targetHeight) / 2;

      const targetX =
        targetLeft - rect.left;

      const targetY =
        targetTop - rect.top;

      const cards =
        dracGridRef.current?.querySelectorAll<HTMLElement>(
          ".drac"
        );

      cards?.forEach((card) => {
        if (card !== drac) {
          gsap.killTweensOf(card);

          gsap.to(card, {
            opacity: 0,
            scale: 0.92,
            filter: "blur(8px)",
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });

          card.style.pointerEvents = "none";
        }
      });

      drac.style.zIndex = "50";
      drac.style.pointerEvents = "auto";
      drac.classList.add("drac-active");

      gsap.killTweensOf(drac);

      gsap.to(drac, {
        x: targetX,
        y: targetY,
        width: targetWidth,
        height: targetHeight,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "power3.out",
        overwrite: true,
      });

      if (bannerBgRef.current) {
        bannerBgRef.current.style.backgroundImage =
          `url('${user.banner}')`;
        bannerBgRef.current.style.opacity = "1";
      }

      const navbarAudio = (window as any)
        .navbarAudioRef as HTMLAudioElement;

      if (navbarAudio) {
        navbarAudio.pause();
      }

      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const handlePointerMove = (event: PointerEvent) => {
      const activeCard = activeState.card;

      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        resetCards();
      }
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    const initialize = async () => {
      if (!dracGridRef.current) return;

      for (const user of discordUsers) {
        const info = await fetchDiscordInfoMembers(user.id);

        if (!dracGridRef.current) return;

        const drac = document.createElement("div");

        drac.className = "drac";
        drac.dataset.originalHeight = "220";

        drac.innerHTML = `
          <div
            class="drac-banner"
            style="
              background-image:url('${user.banner}');
              opacity:0.35;
            "
          ></div>

          <div class="drac-content">
            <div
              class="avatar"
              style="
                background-image:url('${info.avatar}');
              "
            ></div>

            <div class="info">
              <h1>${escapeHtml(info.displayName)}</h1>

              <p>@${escapeHtml(info.username)}</p>

              <div class="drac-status">
                <span
                  class="drac-status-dot"
                  style="
                    background:#747f8d;
                    box-shadow:0 0 8px #747f8d;
                  "
                ></span>
                <span>Offline</span>
              </div>

              <div
                class="drac-custom-status"
                style="display:none;"
              ></div>

              <div
                class="drac-activity"
                style="display:none;"
              ></div>
            </div>
          </div>
        `;

        const audio = document.createElement("audio");

        audio.src = user.music;
        audio.preload = "auto";
        audio.volume = 0.5;

        drac.appendChild(audio);
        dracGridRef.current.appendChild(drac);

        updateDiscordCard(drac, info.data);

        const ws = new WebSocket(
          "wss://api.lanyard.rest/socket"
        );

        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              op: 2,
              d: {
                subscribe_to_id: user.id,
              },
            })
          );
        };

        ws.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);

            if (!payload.d) return;

            if (
              payload.t === "INIT_STATE" ||
              payload.t === "PRESENCE_UPDATE"
            ) {
              updateDiscordCard(drac, payload.d);
            }
          } catch {
            return;
          }
        };

        drac.addEventListener("pointerenter", () => {
          activateCard(drac, user, audio);
        });
      }

      if (!dracGridRef.current) return;

      const dracCards =
        dracGridRef.current.querySelectorAll<HTMLElement>(
          ".drac"
        );

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
    };

    void initialize();

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      resetCards();

      if (dracGridRef.current) {
        dracGridRef.current.innerHTML = "";
      }

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === dracGridRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={bannerBgRef}
        className="drac-banner-bg"
      />

      <div
        ref={dracGridRef}
        className="drac-grid"
      />
    </div>
  );
};
