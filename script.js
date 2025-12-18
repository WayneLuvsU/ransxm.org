function renderDiscordEmoji(emoji) {
  if (!emoji) return "";
  if (emoji.id) {
    const ext = emoji.animated ? "gif" : "png";
    return `<img src="https://cdn.discordapp.com/emojis/${emoji.id}.${ext}" alt="${emoji.name}" style="width:20px;height:20px;vertical-align:middle;margin-right:4px;">`;
  }
  return emoji.name || "";
}

document.querySelectorAll(".card").forEach(card => {
  const userId = card.dataset.userId;

  const avatar = card.querySelector(".avatar img");
  const username = card.querySelector(".username");
  const statusDot = card.querySelector(".status-dot");
  const statusBox = card.querySelector(".status-box");
  const activityName = card.querySelector(".activity-name");
  const activityDetails = card.querySelector(".activity-details");
  const activityIcon = card.querySelector(".activity-icon");
  const spotifyAlbum = card.querySelector(".spotify-album");
  const spotifySong = card.querySelector(".spotify-song");
  const spotifyArtist = card.querySelector(".spotify-artist");
  const spotifyProgressFill = card.querySelector(".spotify-progress-fill");
  const spotifyContainer = card.querySelector(".spotify-container");

  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.onopen = () => {
    ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
  };

  ws.onmessage = event => {
    const payload = JSON.parse(event.data);
    if (!payload.d) return;
    const user = payload.d;

 
    if (user.discord_user?.avatar) {
      avatar.src = `https://cdn.discordapp.com/avatars/${userId}/${user.discord_user.avatar}.png?size=256`;
    }

    const globalName = user.discord_user?.global_name || user.discord_user?.username || "Unknown";
    const discordUsername = user.discord_user?.username || "Unknown";
    username.textContent = globalName;
    username.dataset.discordUsername = discordUsername;
    
    username.addEventListener('mouseenter', () => {
      username.style.opacity = '0';
      setTimeout(() => {
        username.textContent = '@' + discordUsername;
        username.style.opacity = '1';
      }, 250);
    });
    
    username.addEventListener('mouseleave', () => {
      username.style.opacity = '0';
      setTimeout(() => {
        username.textContent = globalName;
        username.style.opacity = '0.8';
      }, 250);
    });
    
    statusDot.className = `status-dot status-${user.discord_status}`;

    const customStatus = user.activities?.find(a => a.type === 4);
    if (customStatus && (customStatus.emoji || customStatus.state)) {
      const emoji = renderDiscordEmoji(customStatus.emoji) || "";
      const state = customStatus.state || "";
      statusBox.innerHTML = emoji + state;
    } else {
      statusBox.textContent = user.discord_status.toUpperCase();
    }

    const activity = user.activities?.find(a => a.type !== 4 && a.name !== "Spotify");
    if (activity) {
      activityName.textContent = activity.name;
      
      let detailsText = "";
      if (activity.state) detailsText = activity.state;
      if (activity.details) detailsText += (detailsText ? " - " : "") + activity.details;
      
      activityDetails.textContent = detailsText || "";
      
      if (activity.assets?.large_image && activity.application_id) {
        activityIcon.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
        activityIcon.style.display = "block";
      } else {
        activityIcon.style.display = "none";
      }
    } else {
      activityName.textContent = "No activity";
      activityDetails.textContent = "";
      activityIcon.style.display = "none";
    }

    const spotify = user.spotify;
    if (spotify) {
      spotifyContainer.style.display = "block";
      spotifyAlbum.src = spotify.album_art_url || "";
      spotifySong.textContent = spotify.song || "Unknown Song";
      spotifyArtist.textContent = spotify.artist || "Unknown Artist";
      card.spotifyData = spotify;
    } else {
      spotifyContainer.style.display = "none";
      card.spotifyData = null;
    }
  };
});

setInterval(() => {
  document.querySelectorAll(".card").forEach(card => {
    const spotifyProgressFill = card.querySelector(".spotify-progress-fill");
    const spotifyContainer = card.querySelector(".spotify-container");
    if (card.spotifyData) {
      const duration = card.spotifyData.timestamps.end - card.spotifyData.timestamps.start;
      const elapsed = Math.max(0, Date.now() - card.spotifyData.timestamps.start);
      
      if (elapsed >= duration) {
        spotifyContainer.style.display = "none";
        card.spotifyData = null;
        spotifyProgressFill.style.width = "0%";
      } else {
        const percentage = Math.min(100, (elapsed / duration) * 100);
        spotifyProgressFill.style.width = percentage + "%";
      }
    }
  });
}, 100);

const cards = document.querySelectorAll('.card');
const audio = document.getElementById('audio');
const songs = [
  "https://file.garden/aN0Uo2YmaWI-OmAY/Hev%20Abi%20-%20MEDICAL%20(1)%20(mp3cut.net).mp3", 
  "https://file.garden/aN0Uo2YmaWI-OmAY/snaptik_7464739156128828678_v2%20(1).mp3", 
  "https://file.garden/aN0Uo2YmaWI-OmAY/ssstik.io_@supahflyyyy_1766001840975.mp3"  
];

cards.forEach((card, index) => {
  card.dataset.audio = songs[index];
});

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    audio.src = card.dataset.audio;
    audio.currentTime = 0;
    audio.play();
  });

  card.addEventListener('mouseleave', () => {
    audio.pause();
  });
});
