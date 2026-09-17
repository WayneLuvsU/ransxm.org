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
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/ransommukhangxtazy.png",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/Hev%20Abi%20-%20MEDICAL%20(1)%20(mp3cut.net).mp3",
      },
      {
        id: "737630884823433267",
        banner: "https://file.garden/aN0Uo2YmaWI-OmAY/xo.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/groundZERO%20-%20TMA%20(Tyler%20x%20ODP%20x%20Primera)%20%5B%20Official%20Music%20Video%20%5D%20%5BOhfOaPdi7yc%5D%20(1)%20(mp3cut.net).mp3",
      },
      {
        id: "1411934822544314381",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/a387c19a64644060f368931d481b712a.png",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/ssstik.io_@supahflyyyy_1766001840975.mp3",
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
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/IMG_6476.jpg",
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
      {
        id: "1322181942078341174",
        banner:
          "https://file.garden/aN0Uo2YmaWI-OmAY/8f4c8e897a81920fbf4e56f0b5da4c1c.gif",
        music:
          "https://file.garden/aN0Uo2YmaWI-OmAY/EsDeeKid%20%26%20Rico%20Ace%20-%20Phantom%20(Lyrics)%20%5BGlnYAkcHdGo%5D%20(mp3cut.net).mp3",
      },
    ];

    const activityIcons: { [key: string]: string } = {
      Roblox: "https://www.roblox.com/favicon.ico",
      "Visual Studio Code": "https://code.visualstudio.com/favicon.ico",
      Discord: "https://discord.com/favicon.ico",
      Chrome:
        "https://www.google.com/chrome/static/images/favicons/favicon.ico",
      Firefox: "https://www.mozilla.org/media/img/favicons/favicon.ico",
      Steam: "https://steamcommunity-a.akamaihd.net/favicon.ico",
      VALORANT:
        "https://img.icons8.com/?size=96&id=aUZxT3Erwill&format=png",
      "League of Legends":
        "https://images.seeklogo.com/logo-png/38/1/league-of-legends-logo-png_seeklogo-385125.png",
      Minecraft: "https://static.cdnlogo.com/logos/m/26/minecraft.svg",
      Fortnite: "https://www.epicgames.com/favicon.ico",
      "Call of Duty":
        "https://store.steampowered.com/public/images/apps/310650/capsule_231x87.jpg",
      Spotify: "https://www.spotify.com/favicon.ico",
      YouTube: "https://www.youtube.com/favicon.ico",
      Netflix: "https://www.netflix.com/favicon.ico",
      Twitch: "https://www.twitch.tv/favicon.ico",
      CrossFire:
        "https://file.garden/aN0Uo2YmaWI-OmAY/crossfire-z8games-smilegate-logo-download-cf-a610310d8f7ca8528c9da8061f46431b.png",
      "Among Us":
        "https://upload.wikimedia.org/wikipedia/en/f/f2/Among_Us_mascots.png",
      "Genshin Impact":
        "https://webstatic.hoyoverse.com/upload/favicon/favicon.ico",
      "Adobe Photoshop": "https://www.adobe.com/favicon.ico",
      "Nba 2k23": "https://www.2k.com/favicon.ico",
      "Animal Crossing":
        "https://upload.wikimedia.org/wikipedia/en/1/1d/Animal_Crossing_New_Horizons.png",
      "Apex Legends": "https://www.ea.com/favicon.ico",
      "Cyberpunk 2077": "https://www.cyberpunk.net/favicon.ico",
      "Dota 2": "https://www.dota2.com/favicon.ico",
      Overwatch:
        "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg",
      "Rocket League":
        "https://upload.wikimedia.org/wikipedia/en/e/e3/Rocket_League_Cover_Art.jpg",
      PUBG: "https://www.pubg.com/favicon.ico",
      Hearthstone:
        "https://upload.wikimedia.org/wikipedia/en/0/0f/Hearthstone_logo.png",
      "World of Warcraft": "https://worldofwarcraft.com/favicon.ico",
      "Final Fantasy XIV": "https://na.finalfantasyxiv.com/favicon.ico",
      Fivem:
        "https://img.icons8.com/?size=96&id=gdOksUo2UvLH&format=png",
      "Grand Theft Auto V Legacy":
        "https://img.icons8.com/?size=128&id=79082&format=png",
      "Read Dead Redemption 2":
        "https://www.rockstargames.com/favicon.ico",
      Bloodstrike:
        "https://cdn2.steamgriddb.com/icon_thumb/7e89f702c876c07b698b5b315807e0c5.png",
    };

    const renderDiscordEmoji = (emoji: any) => {
      if (!emoji) return "";

      if (emoji.id) {
        const ext = emoji.animated ? "gif" : "png";

        return `
          <img
            src="https://cdn.discordapp.com/emojis/${emoji.id}.${ext}"
            alt="${emoji.name || ""}"
            style="width:20px;height:20px;object-fit:contain;vertical-align:middle;margin-right:5px;"
          />
        `;
      }

      return emoji.name || "";
    };

    const fetchDiscordInfoMembers = async (discordId: string) => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${discordId}`
        );

        const json = await res.json();

        if (json.success) {
          const u = json.data.discord_user;

          const avatarUrl = u.avatar
            ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=512`
            : `https://cdn.discordapp.com/embed/avatars/0.png`;

          return {
            displayName: u.global_name || u.display_name || u.username,
            username: u.username,
            avatar: avatarUrl,
          };
        }
      } catch (err) {
        console.error("Lanyard fetch error", err);
      }

      return {
        displayName: "Unknown",
        username: "Unknown",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      };
    };

    (async () => {
      if (!dracGridRef.current) return;

      for (const user of discordUsers) {
        const info = await fetchDiscordInfoMembers(user.id);

        const drac = document.createElement("div");
        drac.classList.add("drac");

        drac.style.position = "relative";
        drac.style.overflow = "hidden";
        drac.style.willChange = "transform, opacity, filter, height";
        drac.style.transformOrigin = "center center";

        drac.innerHTML = `
          <div
            class="drac-banner"
            style="background-image:url('${user.banner}'); opacity:0.35;"
          ></div>

          <div class="drac-content">
            <div
              class="avatar"
              style="background-image:url('${info.avatar}');"
            ></div>

            <div class="info">
              <h1>${info.displayName}</h1>
              <p>@${info.username}</p>
            </div>

            <div
              class="drac-status"
              style="
                display:flex;
                align-items:center;
                gap:7px;
                margin-top:8px;
                font-size:12px;
                opacity:0.9;
              "
            >
              <span
                class="drac-status-dot"
                style="
                  width:9px;
                  height:9px;
                  min-width:9px;
                  border-radius:50%;
                  background:#747f8d;
                  box-shadow:0 0 8px rgba(255,255,255,0.25);
                "
              ></span>

              <span class="drac-status-text">Offline</span>
            </div>

            <div
              class="drac-custom-status"
              style="
                margin-top:6px;
                font-size:12px;
                opacity:0.75;
                min-height:18px;
                display:flex;
                align-items:center;
                justify-content:center;
                text-align:center;
              "
            ></div>

            <div
              class="drac-activity"
              style="
                margin-top:10px;
                padding-top:10px;
                border-top:1px solid rgba(255,255,255,0.15);
                display:none;
                flex-direction:column;
                gap:5px;
                width:100%;
              "
            >
              <div
                style="
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  gap:8px;
                "
              >
                <div
                  class="drac-activity-icon"
                  style="
                    width:30px;
                    height:30px;
                    border-radius:7px;
                    background:rgba(255,255,255,0.08);
                    border:1px solid rgba(255,255,255,0.15);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    overflow:hidden;
                    flex-shrink:0;
                  "
                ></div>

                <div
                  style="
                    display:flex;
                    flex-direction:column;
                    min-width:0;
                    text-align:left;
                  "
                >
                  <span
                    class="drac-activity-name"
                    style="
                      font-size:12px;
                      font-weight:600;
                      color:white;
                      white-space:nowrap;
                      overflow:hidden;
                      text-overflow:ellipsis;
                    "
                  ></span>

                  <span
                    class="drac-activity-details"
                    style="
                      font-size:10px;
                      opacity:0.65;
                      white-space:nowrap;
                      overflow:hidden;
                      text-overflow:ellipsis;
                    "
                  ></span>
                </div>
              </div>

              <div
                class="drac-activity-icons"
                style="
                  display:flex;
                  justify-content:center;
                  align-items:center;
                  gap:6px;
                  flex-wrap:wrap;
                "
              ></div>
            </div>
          </div>
        `;

        const audio = document.createElement("audio");
        audio.src = user.music;
        audio.preload = "auto";
        audio.volume = 0.5;
        drac.appendChild(audio);

        const statusDot = drac.querySelector(
          ".drac-status-dot"
        ) as HTMLElement;

        const statusText = drac.querySelector(
          ".drac-status-text"
        ) as HTMLElement;

        const customStatus = drac.querySelector(
          ".drac-custom-status"
        ) as HTMLElement;

        const activityBox = drac.querySelector(
          ".drac-activity"
        ) as HTMLElement;

        const activityIcon = drac.querySelector(
          ".drac-activity-icon"
        ) as HTMLElement;

        const activityName = drac.querySelector(
          ".drac-activity-name"
        ) as HTMLElement;

        const activityDetails = drac.querySelector(
          ".drac-activity-details"
        ) as HTMLElement;

        const activityIconsContainer = drac.querySelector(
          ".drac-activity-icons"
        ) as HTMLElement;

        const ws = new WebSocket("wss://api.lanyard.rest/socket");

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

            const discordData = payload.d;

            if (discordData.discord_user?.avatar) {
              const avatar = drac.querySelector(
                ".avatar"
              ) as HTMLElement;

              if (avatar) {
                avatar.style.backgroundImage = `url('https://cdn.discordapp.com/avatars/${user.id}/${discordData.discord_user.avatar}.png?size=512')`;
              }
            }

            const status = discordData.discord_status || "offline";

            const statusMap: Record<
              string,
              { label: string; color: string }
            > = {
              online: {
                label: "Online",
                color: "#23a55a",
              },
              idle: {
                label: "Idle",
                color: "#f0b232",
              },
              dnd: {
                label: "Do Not Disturb",
                color: "#f23f42",
              },
              offline: {
                label: "Offline",
                color: "#747f8d",
              },
            };

            const currentStatus =
              statusMap[status] || statusMap.offline;

            if (statusDot) {
              statusDot.style.background = currentStatus.color;
              statusDot.style.boxShadow = `0 0 10px ${currentStatus.color}`;
            }

            if (statusText) {
              statusText.textContent = currentStatus.label;
            }

            const customActivity = discordData.activities?.find(
              (activity: any) => activity.type === 4
            );

            if (customActivity && customStatus) {
              const emoji = renderDiscordEmoji(
                customActivity.emoji
              );

              const state = customActivity.state || "";

              customStatus.innerHTML = `${emoji}${state}`;
              customStatus.style.display = "flex";
            } else if (customStatus) {
              customStatus.innerHTML = "";
              customStatus.style.display = "none";
            }

            const activities =
              discordData.activities?.filter(
                (activity: any) =>
                  activity.type !== 4 &&
                  activity.name !== "Spotify"
              ) || [];

            if (activities.length > 0) {
              const primaryActivity = activities[0];

              if (activityBox) {
                activityBox.style.display = "flex";
              }

              if (activityName) {
                activityName.textContent =
                  primaryActivity.name || "Activity";
              }

              let detailsText = "";

              if (primaryActivity.state) {
                detailsText = primaryActivity.state;
              }

              if (primaryActivity.details) {
                detailsText += detailsText
                  ? ` - ${primaryActivity.details}`
                  : primaryActivity.details;
              }

              if (activityDetails) {
                activityDetails.textContent = detailsText;
              }

              if (activityIcon) {
                activityIcon.innerHTML = "";

                const iconUrl =
                  activityIcons[primaryActivity.name];

                if (iconUrl) {
                  const img =
                    document.createElement("img");

                  img.src = iconUrl;
                  img.alt = primaryActivity.name || "";
                  img.style.width = "100%";
                  img.style.height = "100%";
                  img.style.objectFit = "contain";
                  img.style.padding = "5px";

                  activityIcon.appendChild(img);
                }
              }

              if (activityIconsContainer) {
                activityIconsContainer.innerHTML = "";

                const seenActivityNames = new Set<string>();

                activities.forEach((activity: any) => {
                  if (
                    !activity?.name ||
                    seenActivityNames.has(activity.name)
                  ) {
                    return;
                  }

                  seenActivityNames.add(activity.name);

                  const iconUrl =
                    activityIcons[activity.name];

                  if (!iconUrl) return;

                  const iconWrapper =
                    document.createElement("div");

                  iconWrapper.style.width = "24px";
                  iconWrapper.style.height = "24px";
                  iconWrapper.style.borderRadius = "5px";
                  iconWrapper.style.overflow = "hidden";
                  iconWrapper.style.background =
                    "rgba(255,255,255,0.08)";
                  iconWrapper.style.border =
                    "1px solid rgba(255,255,255,0.15)";
                  iconWrapper.title = activity.name;

                  const img =
                    document.createElement("img");

                  img.src = iconUrl;
                  img.alt = activity.name;
                  img.style.width = "100%";
                  img.style.height = "100%";
                  img.style.objectFit = "contain";
                  img.style.padding = "3px";

                  iconWrapper.appendChild(img);
                  activityIconsContainer.appendChild(
                    iconWrapper
                  );
                });
              }
            } else {
              if (activityBox) {
                activityBox.style.display = "none";
              }
            }
          } catch (err) {
            console.error("Lanyard message error", err);
          }
        };

        ws.onerror = () => {
          ws.close();
        };

        drac.addEventListener("mouseenter", () => {
          const allCards =
            dracGridRef.current?.querySelectorAll(".drac");

          if (!allCards || !dracGridRef.current) return;

          const rect = drac.getBoundingClientRect();

          const viewportCenterX = window.innerWidth / 2;
          const viewportCenterY = window.innerHeight / 2;

          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;

          const moveX = viewportCenterX - cardCenterX;
          const moveY = viewportCenterY - cardCenterY;

          const originalHeight = rect.height;

          drac.dataset.originalHeight =
            originalHeight.toString();

          gsap.killTweensOf(allCards);
          gsap.killTweensOf(drac);

          gsap.set(drac, {
            zIndex: 50,
          });

          allCards.forEach((card) => {
            if (card !== drac) {
              gsap.to(card, {
                opacity: 0,
                scale: 0.85,
                filter: "blur(10px)",
                duration: 0.45,
                ease: "power3.out",
                overwrite: true,
              });
            }
          });

          gsap.to(drac, {
            x: moveX,
            y: moveY,
            scale: 1.08,
            opacity: 1,
            filter: "blur(0px)",
            height: originalHeight + 110,
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
        });

        drac.addEventListener("mouseleave", () => {
          const allCards =
            dracGridRef.current?.querySelectorAll(".drac");

          if (!allCards) return;

          gsap.to(allCards, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.inOut",
            overwrite: true,
          });

          const originalHeight = Number(
            drac.dataset.originalHeight || 0
          );

          if (originalHeight) {
            gsap.to(drac, {
              height: originalHeight,
              duration: 0.6,
              ease: "power3.inOut",
              overwrite: true,
            });
          }

          gsap.set(drac, {
            zIndex: "",
          });

          if (bannerBgRef.current) {
            bannerBgRef.current.style.opacity = "0";
          }

          audio.pause();
          audio.currentTime = 0;

          const navbarAudio = (window as any)
            .navbarAudioRef as HTMLAudioElement;

          const wasPlaying = (window as any)
            .isNavbarAudioPlaying as boolean;

          if (navbarAudio && wasPlaying) {
            navbarAudio.play().catch(() => {});
          }
        });

        dracGridRef.current.appendChild(drac);
      }

      if (dracGridRef.current) {
        const dracCards =
          dracGridRef.current.querySelectorAll(".drac");

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
          position: "fixed",
          inset: 0,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0,
          filter: "blur(2px) brightness(0.6)",
          transition:
            "opacity 0.6s ease, background 0.3s ease",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        ref={dracGridRef}
        className="drac-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 600px)",
          gap: "30px",
          zIndex: 2,
          maxWidth: "100%",
          position: "relative",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      />
    </div>
  );
};
