import { useEffect, useRef } from "react";

export const DiscordCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const songs = [
      "https://file.garden/aN0Uo2YmaWI-OmAY/Hev%20Abi%20-%20MEDICAL%20(1)%20(mp3cut.net).mp3",
      "https://file.garden/aN0Uo2YmaWI-OmAY/nazty-kidd-those-eyez-ft-hev-abi-official-lyric-video-128-ytshorts%20(mp3cut.net).mp3",
      "https://file.garden/aN0Uo2YmaWI-OmAY/ssstik.io_@supahflyyyy_1766001840975.mp3",
      "https://file.garden/aN0Uo2YmaWI-OmAY/NEMZZZ%20-%20COLD%20(OFFICIAL%20VIDEO).mp3",
    ];

    const cards = containerRef.current?.querySelectorAll(".card");
    if (!cards || !audioRef.current) return;

    // Audio playback on hover
    cards.forEach((card: Element, index: number) => {
      const cardElement = card as HTMLElement;
      cardElement.dataset.audio = songs[index];

      cardElement.addEventListener("mouseenter", () => {
        if (audioRef.current) {
          audioRef.current.src = songs[index];
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {
            // Auto-play might be blocked
          });
        }
      });

      cardElement.addEventListener("mouseleave", () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });
    });

    // Lanyard API WebSocket connection for each card
    cards.forEach((card: Element) => {
      const userId = card.getAttribute("data-user-id");
      if (!userId) return;

      const avatar = card.querySelector(".avatar img") as HTMLImageElement;
      const displayName = card.querySelector(".display-name") as HTMLElement;
      const username = card.querySelector(".username") as HTMLElement;
      const statusDot = card.querySelector(".status-dot") as HTMLElement;
      const statusBox = card.querySelector(".status-box") as HTMLElement;
      const spotifyContainer = card.querySelector(".spotify-container") as HTMLElement;
      const spotifyAlbum = card.querySelector(".spotify-album") as HTMLImageElement;
      const spotifySong = card.querySelector(".spotify-song") as HTMLElement;
      const spotifyArtist = card.querySelector(".spotify-artist") as HTMLElement;
      const spotifyProgressFill = card.querySelector(".spotify-progress-fill") as HTMLElement;

      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      let spotifyData: any = null;

      const activityIcons: { [key: string]: string } = {
        "Roblox": "https://www.roblox.com/favicon.ico",
        "Visual Studio Code": "https://code.visualstudio.com/favicon.ico",
        "Discord": "https://discord.com/favicon.ico",
        "Chrome": "https://www.google.com/chrome/static/images/favicons/favicon.ico",
        "Firefox": "https://www.mozilla.org/media/img/favicons/firefox/favicon.ico",
        "Steam": "https://steamcommunity-a.akamaihd.net/favicon.ico",
        "VALORANT": "https://img.icons8.com/?size=96&id=aUZxT3Erwill&format=png",
        "League of Legends": "https://images.seeklogo.com/logo-png/38/1/league-of-legends-logo-png_seeklogo-385125.png",
        "Minecraft": "https://static.cdnlogo.com/logos/m/26/minecraft.svg",
        "Fortnite": "https://www.epicgames.com/favicon.ico",
        "Call of Duty": "https://store.steampowered.com/public/images/apps/310650/capsule_231x87.jpg",
        "Spotify": "https://www.spotify.com/favicon.ico",
        "YouTube": "https://www.youtube.com/favicon.ico",
        "Netflix": "https://www.netflix.com/favicon.ico",
        "Twitch": "https://www.twitch.tv/favicon.ico",
        "CrossFire": "https://file.garden/aN0Uo2YmaWI-OmAY/crossfire-z8games-smilegate-logo-download-cf-a610310d8f7ca8528c9da8061f46431b.png",
        "Among Us": "https://upload.wikimedia.org/wikipedia/en/f/f2/Among_Us_mascots.png",
        "Genshin Impact": "https://webstatic.hoyoverse.com/upload/favicon/favicon.ico",
        "Adobe Photoshop": "https://www.adobe.com/favicon.ico",
        "Nba 2k23": "https://www.2k.com/favicon.ico",
        "Animal Crossing": "https://upload.wikimedia.org/wikipedia/en/1/1d/Animal_Crossing_New_Horizons.png",
        "Apex Legends": "https://www.ea.com/favicon.ico",
        "Cyberpunk 2077": "https://www.cyberpunk.net/favicon.ico",
        "Dota 2": "https://www.dota2.com/favicon.ico",
        "Overwatch": "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg",
        "Rocket League": "https://upload.wikimedia.org/wikipedia/en/e/e3/Rocket_League_Cover_Art.jpg",
        "PUBG": "https://www.pubg.com/favicon.ico",
        "Hearthstone": "https://upload.wikimedia.org/wikipedia/en/0/0f/Hearthstone_logo.png",
        "World of Warcraft": "https://worldofwarcraft.com/favicon.ico",
        "Final Fantasy XIV": "https://na.finalfantasyxiv.com/favicon.ico",
        "Fivem": "https://img.icons8.com/?size=96&id=gdOksUo2UvLH&format=png",
        "Grand Theft Auto V Legacy": "https://img.icons8.com/?size=128&id=79082&format=png",
        "Read Dead Redemption 2": "https://www.rockstargames.com/favicon.ico",
        "Bloodstrike": "https://cdn2.steamgriddb.com/icon_thumb/7e89f702c876c07b698b5b315807e0c5.png",
      };

      const renderDiscordEmoji = (emoji: any) => {
        if (!emoji) return "";
        if (emoji.id) {
          const ext = emoji.animated ? "gif" : "png";
          return `<img src="https://cdn.discordapp.com/emojis/${emoji.id}.${ext}" alt="${emoji.name}" style="width:20px;height:20px;vertical-align:middle;margin-right:4px;">`;
        }
        return emoji.name || "";
      };

      const activityName = card.querySelector(".activity-name") as HTMLElement;
      const activityDetails = card.querySelector(".activity-details") as HTMLElement;
      const activityIconsContainer = card.querySelector(".activity-icons-container") as HTMLElement;

      ws.onopen = () => {
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
      };

      ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        if (!payload.d) return;
        const user = payload.d;

        // Update avatar
        if (user.discord_user?.avatar && avatar) {
          avatar.src = `https://cdn.discordapp.com/avatars/${userId}/${user.discord_user.avatar}.png?size=256`;
        }

        // Update display name and username
        const globalName = user.discord_user?.global_name || user.discord_user?.username || "Unknown";
        const discordUsername = user.discord_user?.username || "Unknown";
        if (displayName) displayName.textContent = globalName;
        if (username) username.textContent = "@" + discordUsername;

        // Update status dot
        if (statusDot) {
          statusDot.className = `status-dot status-${user.discord_status}`;
        }

        // Update custom status with emoji
        const customStatus = user.activities?.find((a: any) => a.type === 4);
        if (customStatus && statusBox) {
          const emoji = renderDiscordEmoji(customStatus.emoji) || "";
          const state = customStatus.state || "";
          statusBox.innerHTML = emoji + state;
        }

        // Update activities with icons
        const activities = user.activities?.filter((a: any) => a.type !== 4 && a.name !== "Spotify") || [];
        
        if (activities && activities.length > 0) {
          const primaryActivity = activities[0];
          if (activityName) activityName.textContent = primaryActivity.name;
          
          let detailsText = "";
          if (primaryActivity.state) detailsText = primaryActivity.state;
          if (primaryActivity.details) detailsText += (detailsText ? " - " : "") + primaryActivity.details;
          
          if (activityDetails) activityDetails.textContent = detailsText || "";
          
          if (activityIconsContainer) {
            activityIconsContainer.innerHTML = "";
            const seenActivityNames = new Set<string>();
            
            activities.forEach((activity: any) => {
              if (!activity?.name || seenActivityNames.has(activity.name)) return;
              seenActivityNames.add(activity.name);
              
              const iconUrl = activityIcons[activity.name];
              
              if (iconUrl) {
                const iconDiv = document.createElement("div");
                iconDiv.className = "activity-icon-img";
                iconDiv.title = activity.name;
                
                const img = document.createElement("img");
                img.src = iconUrl;
                img.alt = activity.name;
                img.loading = "lazy";
                iconDiv.appendChild(img);
                activityIconsContainer.appendChild(iconDiv);
              }
            });
          }
        } else {
          if (activityName) activityName.textContent = "No Current Activity";
          if (activityDetails) activityDetails.textContent = "";
          if (activityIconsContainer) activityIconsContainer.innerHTML = "";
        }

        // Update Spotify
        if (user.spotify && spotifyContainer) {
          spotifyContainer.style.display = "block";
          if (spotifyAlbum) spotifyAlbum.src = user.spotify.album_art_url || "";
          if (spotifySong) spotifySong.textContent = user.spotify.song || "Unknown Song";
          if (spotifyArtist) spotifyArtist.textContent = user.spotify.artist || "Unknown Artist";
          spotifyData = user.spotify;
        } else if (spotifyContainer) {
          spotifyContainer.style.display = "none";
          spotifyData = null;
        }
      };

      ws.onerror = () => {
        ws.close();
      };

      // Update Spotify progress
      const spotifyInterval = setInterval(() => {
        if (spotifyData && spotifyProgressFill) {
          const duration = spotifyData.timestamps.end - spotifyData.timestamps.start;
          const elapsed = Math.max(0, Date.now() - spotifyData.timestamps.start);

          if (elapsed >= duration) {
            if (spotifyContainer) spotifyContainer.style.display = "none";
            spotifyData = null;
            if (spotifyProgressFill) spotifyProgressFill.style.width = "0%";
          } else {
            const percentage = Math.min(100, (elapsed / duration) * 100);
            spotifyProgressFill.style.width = percentage + "%";
          }
        }
      }, 100);

      return () => {
        clearInterval(spotifyInterval);
        ws.close();
      };
    });
  }, []);

  return (
    <div ref={containerRef} className="container-wrapper">
      <audio ref={audioRef} />

      <div className="card side" data-user-id="1413874403837476956">
        <div className="profile-ui">
          <div className="media-slot">
            <img
              className="media-img"
              src="https://file.garden/aN0Uo2YmaWI-OmAY/ransommukhangxtazy.png"
              alt="Profile"
            />
          </div>
          <div className="avatar">
            <img src="" alt="Avatar" />
            <span className="status-dot"></span>
          </div>
          <div className="user-info">
            <div className="display-name"></div>
            <div className="username"></div>
          </div>
          <div className="status-box"></div>
          <div className="activity-box">
            <div className="activity-content">
              <span className="activity-name"></span>
              <span className="activity-details"></span>
            </div>
            <div className="activity-icons-container"></div>
          </div>
          <div className="spotify-container">
            <div className="spotify-box">
              <img className="spotify-album" src="" alt="Album" />
              <div className="spotify-info">
                <div className="spotify-song"></div>
                <div className="spotify-artist"></div>
                <div className="spotify-progress-bar">
                  <div className="spotify-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card main" data-user-id="737630884823433267">
        <div className="profile-ui">
          <div className="media-slot">
            <img
              className="media-img"
              src="https://file.garden/aN0Uo2YmaWI-OmAY/xo.gif"
              alt="Profile"
            />
          </div>
          <div className="avatar">
            <img src="" alt="Avatar" />
            <span className="status-dot"></span>
          </div>
          <div className="user-info">
            <div className="display-name"></div>
            <div className="username"></div>
          </div>
          <div className="status-box"></div>
          <div className="activity-box">
            <div className="activity-content">
              <span className="activity-name"></span>
              <span className="activity-details"></span>
            </div>
            <div className="activity-icons-container"></div>
          </div>
          <div className="spotify-container">
            <div className="spotify-box">
              <img className="spotify-album" src="" alt="Album" />
              <div className="spotify-info">
                <div className="spotify-song"></div>
                <div className="spotify-artist"></div>
                <div className="spotify-progress-bar">
                  <div className="spotify-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card main" data-user-id="1283033719371993111">
        <div className="profile-ui">
          <div className="media-slot">
            <img
              className="media-img"
              src="https://file.garden/aN0Uo2YmaWI-OmAY/a387c19a64644060f368931d481b712a.png"
              alt="Profile"
            />
          </div>
          <div className="avatar">
            <img src="" alt="Avatar" />
            <span className="status-dot"></span>
          </div>
          <div className="user-info">
            <div className="display-name"></div>
            <div className="username"></div>
          </div>
          <div className="status-box"></div>
          <div className="activity-box">
            <div className="activity-content">
              <span className="activity-name"></span>
              <span className="activity-details"></span>
            </div>
            <div className="activity-icons-container"></div>
          </div>
          <div className="spotify-container">
            <div className="spotify-box">
              <img className="spotify-album" src="" alt="Album" />
              <div className="spotify-info">
                <div className="spotify-song"></div>
                <div className="spotify-artist"></div>
                <div className="spotify-progress-bar">
                  <div className="spotify-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card main" data-user-id="1335221585652613130">
        <div className="profile-ui">
          <div className="media-slot">
            <img
              className="media-img"
              src="https://file.garden/aN0Uo2YmaWI-OmAY/amiri.png"
              alt="Profile"
            />
          </div>
          <div className="avatar">
            <img src="" alt="Avatar" />
            <span className="status-dot"></span>
          </div>
          <div className="user-info">
            <div className="display-name"></div>
            <div className="username"></div>
          </div>
          <div className="status-box"></div>
          <div className="activity-box">
            <div className="activity-content">
              <span className="activity-name"></span>
              <span className="activity-details"></span>
            </div>
            <div className="activity-icons-container"></div>
          </div>
          <div className="spotify-container">
            <div className="spotify-box">
              <img className="spotify-album" src="" alt="Album" />
              <div className="spotify-info">
                <div className="spotify-song"></div>
                <div className="spotify-artist"></div>
                <div className="spotify-progress-bar">
                  <div className="spotify-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
