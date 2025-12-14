const enterScreen = document.getElementById("enterScreen");
const video = document.getElementById("bgVideo");
const card = document.querySelector(".card");
const opacitySlider = document.getElementById("opacitySlider");
const avatarImg = document.getElementById("profileAvatar");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const discordUsernameDiv = document.getElementById("discordUsername");
const volumeSlider = document.getElementById("volumeSlider");

const bgAudio = document.createElement("audio");
bgAudio.src = ""; 
bgAudio.loop = true;
bgAudio.volume = volumeSlider.value / 100;

const userId = "737630884823433267"; 
const lanyardUrl = `https://api.lanyard.rest/v1/users/${userId}`;

let discordUsername = "@Unknown";

card.style.setProperty("--card-opacity", opacitySlider.value/100);
document.querySelector(".status-box").style.setProperty("--card-opacity", opacitySlider.value/100);
opacitySlider.addEventListener("input", () => {
  const value = opacitySlider.value/100;
  card.style.setProperty("--card-opacity", value);
  document.querySelector(".status-box").style.setProperty("--card-opacity", value);
});

async function fetchDiscordData() {
  try {
    const res = await fetch(lanyardUrl);
    const data = await res.json();
    const discordData = data.data;

    avatarImg.src = discordData.discord_user.avatar
      ? `https://cdn.discordapp.com/avatars/${userId}/${discordData.discord_user.avatar}.png?size=128`
      : "default-avatar.png";

    const statusColors = { online:"#3ba55d", idle:"#faa61a", dnd:"#f04747", offline:"#555"};
    const discordStatus = discordData.discord_status || "offline";
    statusDot.style.background = statusColors[discordStatus] || "#555";

    let activityText = discordStatus==="offline"?"Offline":"Online";
    if(discordData.activities && discordData.activities.length>0){
      const act = discordData.activities[0];
      switch(act.type){
        case 0: activityText = `Playing ${act.name}`; break;
        case 2: activityText = `Listening to ${act.name}`; break;
        case 3: activityText = `Watching ${act.name}`; break;
        case 4: activityText = act.state || act.details || act.name; break;
        default: activityText = act.name; break;
      }
    }
    statusText.textContent = activityText;

    discordUsername = discordData.discord_user.username
      ? `@${discordData.discord_user.username}`
      : "@Unknown";

    if(card.classList.contains("show")) {
      discordUsernameDiv.textContent = discordUsername;
    }

  } catch(err){
    console.error("Failed to fetch Discord data:", err);
    statusText.textContent="Offline";
    statusDot.style.background="#555";
    discordUsernameDiv.textContent = "@Unknown";
  }
}
fetchDiscordData();
setInterval(fetchDiscordData, 30000);

enterScreen.addEventListener("click", () => {
  enterScreen.classList.add("fade-out");
  setTimeout(()=>enterScreen.remove(), 1600);

  video.load();
  video.volume = volumeSlider.value / 100;
  const playPromise = video.play();
  if(playPromise !== undefined) playPromise.catch(err=>console.warn(err));

  bgAudio.volume = volumeSlider.value / 100;
  bgAudio.play().catch(err=>console.warn("Audio play blocked:", err));

  setTimeout(()=>{ 
    card.classList.add("show"); 
    discordUsernameDiv.textContent = discordUsername;
  }, 25000);
});

document.addEventListener("mousemove", (e) => {
  if(!card.classList.contains("show")) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  const rotateX = (deltaY / centerY) * 20; 
  const rotateY = -(deltaX / centerX) * 20;

  card.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "translate(-50%, -50%) rotateX(0deg) rotateY(0deg)";
});

volumeSlider.addEventListener("input", () => {
  const vol = volumeSlider.value / 100;
  video.volume = vol;
  bgAudio.volume = vol;
});
