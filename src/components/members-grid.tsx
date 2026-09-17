import { useEffect, useRef } from "react";
import gsap from "gsap";

type DiscordUser = {
  id: string;
  banner: string;
  music: string;
};

type LanyardActivity = {
  id?: string;
  name?: string;
  type?: number;
  details?: string | null;
  state?: string | null;
  application_id?: string | null;
  assets?: {
    large_image?: string | null;
    large_text?: string | null;
    small_image?: string | null;
    small_text?: string | null;
  } | null;
};

type LanyardData = {
  discord_user: {
    id: string;
    username: string;
    global_name?: string | null;
    display_name?: string | null;
    avatar?: string | null;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  spotify?: {
    track_id?: string;
    song?: string;
    artist?: string;
    album?: string;
    album_art_url?: string;
    timestamps?: {
      start?: number;
      end?: number;
    };
  } | null;
};

type MemberInfo = {
  displayName: string;
  username: string;
  avatar: string;
  status: string;
  customStatus: string;
  customEmoji: string;
  customEmojiUrl: string;
  activityName: string;
  activityDetails: string;
  activityState: string;
  activityIcon: string;
  activityType: string;
  spotify: LanyardData["spotify"];
};

const discordUsers: DiscordUser[] = [
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
    id: "984436577612759111",
    banner:
      "https://file.garden/aN0Uo2YmaWI-OmAY/09fae4879b5c83ac5620f3e0b75156fb.gif",
    music:
      "https://file.garden/aN0Uo2YmaWI-OmAY/Teenage%20Fever%20%5BUc57OKGTDXk%5D%20(mp3cut.net).mp3",
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
    id: "1322181942078341174",
    banner:
      "https://file.garden/aN0Uo2YmaWI-OmAY/8f4c8e897a81920fbf4e56f0b5da4c1c.gif",
    music:
      "https://file.garden/aN0Uo2YmaWI-OmAY/EsDeeKid%20%26%20Rico%20Ace%20-%20Phantom%20(Lyrics)%20%5BGlnYAkcHdGo%5D%20(mp3cut.net).mp3",
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

const emptyInfo = (): MemberInfo => ({
  displayName: "Unknown",
  username: "Unknown",
  avatar: "",
  status: "offline",
  customStatus: "",
  customEmoji: "",
  customEmojiUrl: "",
  activityName: "",
  activityDetails: "",
  activityState: "",
  activityIcon: "",
  activityType: "",
  spotify: null,
});

function getAvatarUrl(
  userId: string,
  avatar: string | null | undefined
): string {
  if (!avatar) {
    return "https://cdn.discordapp.com/embed/avatars/0.png";
  }

  const extension = avatar.startsWith("a_") ? "gif" : "png";

  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${extension}?size=512`;
}

function getActivityIcon(
  activity: LanyardActivity | undefined
): string {
  if (!activity) return "";

  const largeImage = activity.assets?.large_image || "";
  const activityName = (activity.name || "").toLowerCase();

  if (
    activityName === "spotify" ||
    activityName.includes("spotify") ||
    activity.type === 2
  ) {
    return "https://cdn.simpleicons.org/spotify/1DB954";
  }

  if (
    activityName === "roblox" ||
    activityName.includes("roblox")
  ) {
    if (activity.application_id && largeImage) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${largeImage}.png?size=128`;
    }

    return "https://cdn.simpleicons.org/roblox/ffffff";
  }

  if (!largeImage) {
    return "";
  }

  if (
    largeImage.startsWith("http://") ||
    largeImage.startsWith("https://")
  ) {
    return largeImage;
  }

  if (largeImage.startsWith("mp:external/")) {
    const externalUrl = largeImage.replace(
      "mp:external/",
      ""
    );

    if (
      externalUrl.startsWith("http://") ||
      externalUrl.startsWith("https://")
    ) {
      return externalUrl;
    }
  }

  if (largeImage.startsWith("spotify:")) {
    return "https://cdn.simpleicons.org/spotify/1DB954";
  }

  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${largeImage}.png?size=128`;
  }

  return "";
}

function getActivityType(type?: number): string {
  switch (type) {
    case 0:
      return "Playing";
    case 1:
      return "Streaming";
    case 2:
      return "Listening to";
    case 3:
      return "Watching";
    case 4:
      return "Custom Status";
    case 5:
      return "Competing in";
    default:
      return "Activity";
  }
}

function getCustomStatus(
  activities: LanyardActivity[]
): {
  text: string;
  emoji: string;
  emojiUrl: string;
} {
  const custom = activities.find(
    (activity) => activity.type === 4
  );

  if (!custom) {
    return {
      text: "",
      emoji: "",
      emojiUrl: "",
    };
  }

  const emojiData = (
    custom as LanyardActivity & {
      emoji?: {
        name?: string | null;
        id?: string | null;
        animated?: boolean;
      } | null;
    }
  ).emoji;

  let emoji = emojiData?.name || "";
  let emojiUrl = "";

  if (emojiData?.id) {
    const extension = emojiData.animated ? "gif" : "png";

    emojiUrl = `https://cdn.discordapp.com/emojis/${emojiData.id}.${extension}?size=64`;
    emoji = "";
  }

  return {
    text: custom.state || "",
    emoji,
    emojiUrl,
  };
}

function chooseMainActivity(
  activities: LanyardActivity[]
): LanyardActivity | undefined {
  return activities.find((activity) => activity.type !== 4);
}

function buildMemberInfo(data: LanyardData): MemberInfo {
  const user = data.discord_user;
  const activities = data.activities || [];
  const mainActivity = chooseMainActivity(activities);
  const customStatus = getCustomStatus(activities);

  return {
    displayName:
      user.global_name ||
      user.display_name ||
      user.username ||
      "Unknown",
    username: user.username || "Unknown",
    avatar: getAvatarUrl(user.id, user.avatar),
    status: data.discord_status || "offline",
    customStatus: customStatus.text,
    customEmoji: customStatus.emoji,
    customEmojiUrl: customStatus.emojiUrl,
    activityName: mainActivity?.name || "",
    activityDetails: mainActivity?.details || "",
    activityState: mainActivity?.state || "",
    activityIcon: getActivityIcon(mainActivity),
    activityType: mainActivity
      ? getActivityType(mainActivity.type)
      : "",
    spotify: data.spotify || null,
  };
}

async function fetchDiscordInfoMembers(
  discordId: string
): Promise<MemberInfo> {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${discordId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return emptyInfo();
    }

    const json = await response.json();

    if (json.success && json.data) {
      return buildMemberInfo(json.data as LanyardData);
    }
  } catch (error) {
    console.error("Lanyard fetch error:", error);
  }

  return emptyInfo();
}

function formatStatus(status: string): string {
  switch (status) {
    case "online":
      return "Online";
    case "idle":
      return "Idle";
    case "dnd":
      return "Do Not Disturb";
    default:
      return "Offline";
  }
}

export const MembersGrid = () => {
  const dracGridRef = useRef<HTMLDivElement>(null);
  const bannerBgRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const activeUserRef = useRef<DiscordUser | null>(null);
  const memberDataRef = useRef(
    new Map<string, MemberInfo>()
  );

  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;

    let cancelled = false;
    let refreshTimer: number | undefined;
    let pointerMoveHandler: ((event: PointerEvent) => void) | null =
      null;
    let resizeHandler: (() => void) | null = null;
    let keydownHandler: ((event: KeyboardEvent) => void) | null =
      null;

    const grid = dracGridRef.current;

    if (!grid) return;

    const cards: HTMLDivElement[] = [];

    const navbarAudio = () =>
      (window as unknown as {
        navbarAudioRef?: HTMLAudioElement;
        isNavbarAudioPlaying?: boolean;
      }).navbarAudioRef;

    const navbarWasPlaying = () =>
      (window as unknown as {
        navbarAudioRef?: HTMLAudioElement;
        isNavbarAudioPlaying?: boolean;
      }).isNavbarAudioPlaying;

    const updateBanner = (
      user: DiscordUser | null,
      visible: boolean
    ) => {
      const banner = bannerBgRef.current;

      if (!banner) return;

      if (!user || !visible) {
        gsap.to(banner, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        });
        return;
      }

      banner.style.backgroundImage = `url("${user.banner}")`;

      gsap.to(banner, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    const stopCardAudio = (card: HTMLDivElement) => {
      const audio = card.querySelector(
        ".drac-audio"
      ) as HTMLAudioElement | null;

      if (!audio) return;

      audio.pause();
      audio.currentTime = 0;
    };

    const stopAllMemberAudio = () => {
      cards.forEach((card) => stopCardAudio(card));
    };

    const playCardAudio = (card: HTMLDivElement) => {
      const audio = card.querySelector(
        ".drac-audio"
      ) as HTMLAudioElement | null;

      if (!audio) return;

      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const pauseNavbarAudio = () => {
      const audio = navbarAudio();

      if (audio) {
        audio.pause();
      }
    };

    const resumeNavbarAudio = () => {
      const audio = navbarAudio();

      if (audio && navbarWasPlaying()) {
        audio.play().catch(() => {});
      }
    };

    const updateCard = (
      card: HTMLDivElement,
      info: MemberInfo
    ) => {
      const avatar = card.querySelector(
        ".drac-avatar"
      ) as HTMLDivElement | null;

      const displayName = card.querySelector(
        ".drac-display-name"
      ) as HTMLElement | null;

      const username = card.querySelector(
        ".drac-username"
      ) as HTMLElement | null;

      const statusText = card.querySelector(
        ".drac-status-text"
      ) as HTMLElement | null;

      const statusDot = card.querySelector(
        ".drac-status-dot"
      ) as HTMLElement | null;

      const customStatus = card.querySelector(
        ".drac-custom-status"
      ) as HTMLElement | null;

      const customStatusText = card.querySelector(
        ".drac-custom-status-text"
      ) as HTMLElement | null;

      const customStatusEmoji = card.querySelector(
        ".drac-custom-status-emoji"
      ) as HTMLElement | null;

      const activity = card.querySelector(
        ".drac-activity"
      ) as HTMLElement | null;

      const activityName = card.querySelector(
        ".drac-activity-name"
      ) as HTMLElement | null;

      const activityDetails = card.querySelector(
        ".drac-activity-details"
      ) as HTMLElement | null;

      const activityState = card.querySelector(
        ".drac-activity-state"
      ) as HTMLElement | null;

      const activityIcon = card.querySelector(
        ".drac-activity-icon"
      ) as HTMLImageElement | null;

      const activityType = card.querySelector(
        ".drac-activity-type"
      ) as HTMLElement | null;

      const spotify = card.querySelector(
        ".drac-spotify"
      ) as HTMLElement | null;

      const spotifyAlbum = card.querySelector(
        ".drac-spotify-album"
      ) as HTMLImageElement | null;

      const spotifySong = card.querySelector(
        ".drac-spotify-song"
      ) as HTMLElement | null;

      const spotifyArtist = card.querySelector(
        ".drac-spotify-artist"
      ) as HTMLElement | null;

      if (avatar) {
        avatar.style.backgroundImage = info.avatar
          ? `url("${info.avatar}")`
          : "";
      }

      if (displayName) {
        displayName.textContent = info.displayName;
      }

      if (username) {
        username.textContent = `@${info.username}`;
      }

      if (statusText) {
        statusText.textContent = formatStatus(info.status);
      }

      if (statusDot) {
        statusDot.dataset.status = info.status;
      }

      if (customStatus && customStatusText) {
        customStatusText.textContent = info.customStatus;

        if (customStatusEmoji) {
          if (info.customEmojiUrl) {
            customStatusEmoji.innerHTML = `<img src="${info.customEmojiUrl}" alt="" />`;
          } else {
            customStatusEmoji.textContent = info.customEmoji;
          }
        }

        customStatus.style.display = info.customStatus
          ? "flex"
          : "none";
      }

      if (activity) {
        if (info.activityName) {
          activity.style.display = "flex";

          if (activityName) {
            activityName.textContent = info.activityName;
          }

          if (activityType) {
            activityType.textContent = info.activityType;
          }

          if (activityDetails) {
            activityDetails.textContent = info.activityDetails;
            activityDetails.style.display =
              info.activityDetails ? "block" : "none";
          }

          if (activityState) {
            activityState.textContent = info.activityState;
            activityState.style.display =
              info.activityState ? "block" : "none";
          }

          if (activityIcon) {
  if (info.activityIcon) {
    activityIcon.src = info.activityIcon;
    activityIcon.style.display = "block";

    activityIcon.onerror = () => {
      activityIcon!.style.display = "none";
    };
  } else {
    activityIcon.removeAttribute("src");
    activityIcon.style.display = "none";
  }
}
        }
      if (spotify) {
        const spotifyData = info.spotify;

        if (spotifyData) {
          spotify.style.display = "flex";

          if (spotifyAlbum && spotifyData.album_art_url) {
            spotifyAlbum.src = spotifyData.album_art_url;
          }

          if (spotifySong) {
            spotifySong.textContent =
              spotifyData.song || "Spotify";
          }

          if (spotifyArtist) {
            spotifyArtist.textContent =
              spotifyData.artist || "";
          }
        } else {
          spotify.style.display = "none";
        }
      }
    };

    const restoreOtherCards = (
      exceptCard?: HTMLDivElement
    ) => {
      cards.forEach((card) => {
        if (card === exceptCard) return;

        gsap.killTweensOf(card);

        card.classList.remove("drac-active");
        card.classList.remove("drac-dimmed");
        card.style.pointerEvents = "auto";

        gsap.to(card, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    const resetActiveCard = () => {
      const activeCard = activeCardRef.current;

      if (!activeCard) {
        updateBanner(null, false);
        resumeNavbarAudio();
        return;
      }

      activeCardRef.current = null;
      activeUserRef.current = null;

      gsap.killTweensOf(activeCard);

      activeCard.classList.remove("drac-active");
      activeCard.style.pointerEvents = "auto";

      gsap.to(activeCard, {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%",
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power4.inOut",
        overwrite: true,
        onComplete: () => {
          gsap.set(activeCard, {
            x: 0,
            y: 0,
            width: "100%",
            height: "100%",
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
          });

          activeCard.style.zIndex = "";
          activeCard.style.pointerEvents = "auto";
        },
      });

      restoreOtherCards(activeCard);

      updateBanner(null, false);
      stopAllMemberAudio();
      resumeNavbarAudio();
    };

    const isPointerInsideCard = (
      card: HTMLDivElement,
      event: PointerEvent
    ) => {
      const rect = card.getBoundingClientRect();

      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };

    const isPointerInsideOriginalSlot = (
      card: HTMLDivElement,
      event: PointerEvent
    ) => {
      const item = card.parentElement as HTMLDivElement | null;

      if (!item) return false;

      const rect = item.getBoundingClientRect();

      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };

    const activateCard = (
      card: HTMLDivElement,
      user: DiscordUser
    ) => {
      if (activeCardRef.current === card) return;

      if (activeCardRef.current) {
        resetActiveCard();
      }

      gsap.killTweensOf(card);

      const rect = card.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const targetWidth = Math.min(
        760,
        Math.max(320, viewportWidth - 40)
      );

      const targetHeight = Math.min(
        430,
        Math.max(240, viewportHeight - 120)
      );

      const targetLeft =
        viewportWidth / 2 - targetWidth / 2;

      const targetTop =
        viewportHeight / 2 - targetHeight / 2;

      const moveX = targetLeft - rect.left;
      const moveY = targetTop - rect.top;

      activeCardRef.current = card;
      activeUserRef.current = user;

      cards.forEach((otherCard) => {
        if (otherCard === card) {
          otherCard.classList.add("drac-active");
          otherCard.classList.remove("drac-dimmed");
          otherCard.style.zIndex = "100";
          otherCard.style.pointerEvents = "auto";
          return;
        }

        otherCard.classList.add("drac-dimmed");
        otherCard.style.pointerEvents = "none";

        gsap.killTweensOf(otherCard);

        gsap.to(otherCard, {
          opacity: 0.14,
          scale: 0.94,
          filter: "blur(5px)",
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      });

      pauseNavbarAudio();
      stopAllMemberAudio();
      playCardAudio(card);
      updateBanner(user, true);

      gsap.to(card, {
        x: moveX,
        y: moveY,
        width: targetWidth,
        height: targetHeight,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "power4.out",
        overwrite: true,
      });
    };

    const createCard = async (
      user: DiscordUser
    ): Promise<HTMLDivElement | null> => {
      const info = await fetchDiscordInfoMembers(user.id);

      if (cancelled || !grid) {
        return null;
      }

      memberDataRef.current.set(user.id, info);

      const item = document.createElement("div");
      item.className = "drac-item";

      const card = document.createElement("div");
      card.className = "drac";
      card.dataset.userId = user.id;

      card.innerHTML = `
        <div
          class="drac-banner"
          style="background-image:url('${user.banner}')"
        ></div>

        <div class="drac-shade"></div>

        <div class="drac-content">
          <div
            class="drac-avatar"
            style="background-image:url('${info.avatar}')"
          ></div>

          <div class="drac-info">
            <div class="drac-name-row">
              <div class="drac-display-name"></div>

              <div class="drac-status">
                <span class="drac-status-dot"></span>
                <span class="drac-status-text"></span>
              </div>
            </div>

            <div class="drac-username"></div>

            <div class="drac-custom-status">
              <span class="drac-custom-status-emoji"></span>
              <span class="drac-custom-status-text"></span>
            </div>

            <div class="drac-activity">
              <div class="drac-activity-icon-wrap">
                <img
                  class="drac-activity-icon"
                  alt=""
                />
              </div>

              <div class="drac-activity-text">
                <span class="drac-activity-type"></span>
                <strong class="drac-activity-name"></strong>
                <span class="drac-activity-details"></span>
                <span class="drac-activity-state"></span>
              </div>
            </div>

            <div class="drac-spotify">
              <img
                class="drac-spotify-album"
                alt=""
              />

              <div class="drac-spotify-info">
                <strong class="drac-spotify-song"></strong>
                <span class="drac-spotify-artist"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="drac-bottom-line"></div>
      `;

      const audio = document.createElement("audio");

      audio.className = "drac-audio";
      audio.src = user.music;
      audio.preload = "auto";
      audio.volume = 0.5;

      card.appendChild(audio);

      updateCard(card, info);

      card.addEventListener("pointerenter", () => {
        if (activeCardRef.current === card) return;

        activateCard(card, user);
      });

      card.addEventListener("pointerleave", () => {
        if (activeCardRef.current !== card) {
          stopCardAudio(card);
        }
      });

      item.appendChild(card);
      grid.appendChild(item);

      return card;
    };

    const initialize = async () => {
      for (const user of discordUsers) {
        const card = await createCard(user);

        if (card) {
          cards.push(card);
        }
      }

      if (cancelled || cards.length === 0) return;
    };

    pointerMoveHandler = (event: PointerEvent) => {
      const activeCard = activeCardRef.current;

      if (!activeCard) return;

      const insideCard = isPointerInsideCard(
        activeCard,
        event
      );

      const insideOriginalSlot =
        isPointerInsideOriginalSlot(activeCard, event);

      if (!insideCard && !insideOriginalSlot) {
        resetActiveCard();
      }
    };

    resizeHandler = () => {
      const activeCard = activeCardRef.current;

      if (!activeCard) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const targetWidth = Math.min(
        760,
        Math.max(320, viewportWidth - 40)
      );

      const targetHeight = Math.min(
        430,
        Math.max(240, viewportHeight - 120)
      );

      const rect = activeCard.getBoundingClientRect();

      const targetLeft =
        viewportWidth / 2 - targetWidth / 2;

      const targetTop =
        viewportHeight / 2 - targetHeight / 2;

      const moveX = targetLeft - rect.left;
      const moveY = targetTop - rect.top;

      gsap.killTweensOf(activeCard);

      gsap.to(activeCard, {
        x: `+=${moveX}`,
        y: `+=${moveY}`,
        width: targetWidth,
        height: targetHeight,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });
    };

    keydownHandler = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        activeCardRef.current
      ) {
        resetActiveCard();
      }
    };

    window.addEventListener(
      "pointermove",
      pointerMoveHandler
    );

    window.addEventListener(
      "resize",
      resizeHandler
    );

    window.addEventListener(
      "keydown",
      keydownHandler
    );

    initialize();

    refreshTimer = window.setInterval(async () => {
      if (cancelled) return;

      for (const user of discordUsers) {
        const card = cards.find(
          (item) => item.dataset.userId === user.id
        );

        if (!card) continue;

        const info = await fetchDiscordInfoMembers(
          user.id
        );

        if (cancelled) return;

        memberDataRef.current.set(user.id, info);

        updateCard(card, info);
      }
    }, 15000);

    return () => {
      cancelled = true;

      if (refreshTimer) {
        window.clearInterval(refreshTimer);
      }

      if (pointerMoveHandler) {
        window.removeEventListener(
          "pointermove",
          pointerMoveHandler
        );
      }

      if (resizeHandler) {
        window.removeEventListener(
          "resize",
          resizeHandler
        );
      }

      if (keydownHandler) {
        window.removeEventListener(
          "keydown",
          keydownHandler
        );
      }

      stopAllMemberAudio();

      gsap.killTweensOf(cards);

      cards.forEach((card) => {
        card.parentElement?.remove();
      });

      cards.length = 0;

      activeCardRef.current = null;
      activeUserRef.current = null;
    };
  }, []);

  return (
    <div className="drac-members-wrapper">
      <div
        ref={bannerBgRef}
        className="drac-banner-bg"
        aria-hidden="true"
      />

      <div
        ref={dracGridRef}
        className="drac-grid"
      />
    </div>
  );
};
