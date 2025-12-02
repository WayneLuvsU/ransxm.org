const introPanel = document.getElementById("intro-panel");
const introText = introPanel.querySelector(".intro-text");
const loadingText = introPanel.querySelector(".loading-text");
const loadingBar = introPanel.querySelector(".loading-bar");
const loadingBarBg = introPanel.querySelector(".loading-bar-bg");
const content = document.querySelector(".content");
const audio = document.getElementById("intro-audio");
const logo = document.querySelector(".top-logo");

introPanel.addEventListener("click", () => {
    introText.style.display = "none";
    loadingText.style.display = "block";
    loadingBarBg.style.display = "block";
    audio.volume = 0;
    audio.loop = true;
    audio.play().catch(() => {});
    fadeAudioIn();

    let progress = 0;
    let interval = setInterval(() => {
        progress += 2;
        loadingBar.style.width = progress + "%";
        loadingText.textContent = `Introducing Ransom... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            loadingText.textContent = "Initializing...";
            loadingBar.style.width = "100%";

            setTimeout(() => {
                introPanel.style.opacity = 0;
                setTimeout(() => {
                    introPanel.style.display = "none";
                    content.style.display = "block";
                    logo.style.opacity = 1;
                }, 500);
            }, 2000);
        }
    }, 80);
});

function fadeAudioIn() {
    let fade = setInterval(() => {
        if (audio.volume < 1) {
            audio.volume = Math.min(audio.volume + 0.02, 1);
        } else {
            clearInterval(fade);
        }
    }, 100);
}

const userIds = [
    "1350849152136773717",
    "453061371513536523", 
    "1418922415802679330",
    "1015473740391399474",
    "1380656322046857286",
    "1322249368719593582",
    "1380573575282692166",
    "1441730271396364419",
    "1377359018250600471",
    "1427591256552247347",
    "1279391589147345041",
    "1316856722307940494"
];

const DEFAULT_AVATAR = "https://cdn.discordapp.com/embed/avatars/0.png";
const SPOTIFY_LOGO = "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg";

const AUTO_APP_ICONS = {
    "Visual Studio Code": "https://code.visualstudio.com/assets/favicon.ico",
    "Roblox": "https://tr.rbxcdn.com/4a4f444db32e46d39fd3a136c5cb5041/420/420/Image/Png",
    "VALORANT": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Valorant_logo.svg",
    "Grand Theft Auto V": "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    "Discord": "https://cdn.discordapp.com/icons/discord.png",
    "Netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "Bloodstrike": "https://cdn.aptoide.com/imgs/b/b/0/bb010754b916af0f22cc31ebe8b52c58_icon.png",
    "Minecraft": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
    "Left4Dead 2": "https://upload.wikimedia.org/wikipedia/en/2/25/Left_4_Dead_2_cover.jpg",
    "Prototype": "https://upload.wikimedia.org/wikipedia/en/5/5e/Prototype_cover_art.jpg",
    "Among Us": "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_Logo.png",
    "Call of Duty: Warzone": "https://upload.wikimedia.org/wikipedia/en/0/0d/Call_of_Duty_Warzone_cover.jpg",
    "Fortnite": "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Fortnite_logo.svg/1200px-Fortnite_logo.svg.png",
    "Apex Legends": "https://upload.wikimedia.org/wikipedia/en/6/66/Apex_Legends_logo.png",
    "League of Legends": "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png",
    "DOTA 2": "https://upload.wikimedia.org/wikipedia/en/3/35/Dota_2_logo.png",
    "Counter-Strike: Global Offensive": "https://upload.wikimedia.org/wikipedia/en/2/2f/Counter-Strike_Global_Offensive_logo.svg",
    "Team Fortress 2": "https://upload.wikimedia.org/wikipedia/en/5/5f/Team_Fortress_2_logo.png",
    "Garry's Mod": "https://upload.wikimedia.org/wikipedia/en/5/5c/Garrys_Mod_logo.png",
    "Dead by Daylight": "https://upload.wikimedia.org/wikipedia/en/5/5e/Dead_by_Daylight_logo.png",
    "Rust": "https://upload.wikimedia.org/wikipedia/en/f/f3/Rust_cover_art.jpg",
    "The Elder Scrolls V: Skyrim": "https://upload.wikimedia.org/wikipedia/en/5/55/Skyrim_cover_art.jpg",
    "Cyberpunk 2077": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    "Fall Guys": "https://upload.wikimedia.org/wikipedia/en/a/a3/Fall_Guys_Box_Art.png",
    "Hollow Knight": "https://upload.wikimedia.org/wikipedia/en/3/3a/Hollow_Knight_cover_art.jpg",
    "Stardew Valley": "https://upload.wikimedia.org/wikipedia/en/f/fd/Stardew_Valley_cover_art.jpg",
    "Terraria": "https://upload.wikimedia.org/wikipedia/en/9/9c/Terraria_Coverart.png",
    "The Witcher 3: Wild Hunt": "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    "DOOM Eternal": "https://upload.wikimedia.org/wikipedia/en/5/57/DOOM_Eternal_cover_art.jpg",
    "Overwatch": "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg",
    "Rocket League": "https://upload.wikimedia.org/wikipedia/en/7/7e/Rocket_League_cover_art.jpg",
    "Call of Duty: Modern Warfare": "https://upload.wikimedia.org/wikipedia/en/7/7f/Call_of_Duty_Modern_Warfare_cover.jpg",
    "FIFA 21": "https://upload.wikimedia.org/wikipedia/en/5/51/FIFA_21_Cover_Art.jpg",
    "NBA 2K21": "https://upload.wikimedia.org/wikipedia/en/1/10/NBA_2K21_Cover_Art.jpg",
    "Crossfire": "https://upload.wikimedia.org/wikipedia/en/5/5e/CrossFire_logo.png",
    "Paladins": "https://upload.wikimedia.org/wikipedia/en/4/4b/Paladins_Logo.png",
    "Smite": "https://upload.wikimedia.org/wikipedia/en/5/5e/Smite_logo.png",
    "World of Warcraft": "https://upload.wikimedia.org/wikipedia/en/5/5e/World_of_Warcraft_logo.svg",
    "Final Fantasy XIV": "https://upload.wikimedia.org/wikipedia/en/0/0b/Final_Fantasy_XIV_logo.png",
    "Runescape": "https://upload.wikimedia.org/wikipedia/en/7/77/Runescape_logo.png",
    "Elden Ring": "https://upload.wikimedia.org/wikipedia/en/8/8e/Elden_Ring_Logo.png", 
    "God of War": "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    "Hades": "https://upload.wikimedia.org/wikipedia/en/8/8e/Hades_cover_art.jpg",
};

const avatarsContainer = document.getElementById("avatars-container");

async function fetchAvatarsConcurrently() {

    const fetchPromises = userIds.map(async (userId) => {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
            const data = await response.json();

            const discord = data.data.discord_user;
            const avatarHash = discord.avatar;

            let avatarURL;
            if (avatarHash && avatarHash.startsWith("a_")) {
                avatarURL = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.gif?size=512`;
            } else if (avatarHash) {
                avatarURL = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=512`;
            } else {
                avatarURL = DEFAULT_AVATAR;
            }

            return {
                avatarURL,
                fullData: data.data
            };

        } catch (err) {
            console.error("Error fetching user:", userId, err);
            return { avatarURL: DEFAULT_AVATAR, fullData: {} };
        }
    });

    const results = await Promise.all(fetchPromises);

    results.forEach((res) => {
        const data = res.fullData;
        const discord = data.discord_user || {};

        const displayName = discord.display_name || discord.username || "Unknown";
        const username = discord.username || "unknown";
        const status = data.discord_status || "offline";
        const statusClass = {
            online: "status-online",
            idle: "status-idle",
            dnd: "status-dnd",
            offline: "status-offline"
        }[status] || "status-offline";
        let activityName = "";
        let activityDetails = "";
        let activityIcon = null;
        if (data.activities && data.activities.length > 0) {
            const act = data.activities[0];
            if (act.type === 2) {
                activityName = "Listening to Spotify";
                activityDetails = `${act.details || ""} — ${act.state || ""}`;
                activityIcon = SPOTIFY_LOGO;
            }

            else if (act.type === 0) {
                activityName = `Playing ${act.name}`;
                activityDetails = act.details || "";
                if (act.assets) {
                    if (act.assets.large_image && act.assets.large_image.startsWith("mp:")) {
                        activityIcon = `https://media.discordapp.net/${act.assets.large_image.replace("mp:", "")}.png`;
                    } else if (act.assets.large_image) {
                        activityIcon = `https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.large_image}.png`;
                    }
                }
                if (!activityIcon && AUTO_APP_ICONS[act.name]) {
                    activityIcon = AUTO_APP_ICONS[act.name];
                }
            }

            else if (act.type === 4) {
                activityName = "";
                activityDetails = act.state || "";
            }
        }
        const profile = document.createElement("div");
        profile.className = "profile";
        const img = document.createElement("img");
        img.src = res.avatarURL;
        img.className = "profile-pic";
        const info = document.createElement("div");
        info.className = "profile-info";
        info.innerHTML = `
            <div class="name-row">
                <span class="profile-name">${displayName}</span>
                <span class="status-dot ${statusClass}"></span>
            </div>

            <div class="profile-username">@${username}</div>

            <div class="section-divider"></div>

            <div class="profile-activity">${activityName}</div>
            <div class="activity-details">${activityDetails}</div>

            ${activityIcon ? `<img class="activity-icon" src="${activityIcon}">` : ""}
        `;

        profile.appendChild(img);
        profile.appendChild(info);
        avatarsContainer.appendChild(profile);
    });
}

fetchAvatarsConcurrently();

const hofUserIds = [
    "1296817016434462782",
    "1283033719371993111",
    "737630884823433267"
];

const hofContainer = document.getElementById("hof-profiles");

async function loadHofAvatars() {
    const responses = await Promise.all(
        hofUserIds.map(id =>
            fetch(`https://api.lanyard.rest/v1/users/${id}`)
                .then(res => res.json())
                .catch(() => null)
        )
    );

    responses.forEach((data, index) => {
        if (!data || !data.success) return;

        const userId = hofUserIds[index];
        const info = data.data;
        const user = info.discord_user;

        const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png?size=512`
            : `https://cdn.discordapp.com/embed/avatars/${(user.discriminator % 5)}.png`;

        const status = info.discord_status || "offline";
        const statusClass = {
            online: "status-online",
            idle: "status-idle",
            dnd: "status-dnd",
            offline: "status-offline"
        }[status] || "status-offline";

        let activityName = "";
        let activityDetails = "";
        let activityIcon = null;

        if (info.activities && info.activities.length > 0) {
            const act = info.activities[0];

            if (act.type === 2) {
                activityName = "Listening to Spotify";
                activityDetails = `${act.details || ""} — ${act.state || ""}`;
                activityIcon = "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg";
            }

            else if (act.type === 0) {
                activityName = `Playing ${act.name}`;
                activityDetails = act.details || "";

                if (act.assets?.large_image?.startsWith("mp:")) {
                    activityIcon = `https://media.discordapp.net/${act.assets.large_image.replace("mp:", "")}.png`;
                } else if (act.assets?.large_image) {
                    activityIcon = `https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.large_image}.png`;
                }
            }

            else if (act.type === 4) {
                activityName = "";
                activityDetails = act.state || "";
            }
        }

        const profile = document.createElement("div");
        profile.className = "profile";

        profile.innerHTML = `
    <img src="${avatarUrl}" class="profile-pic">

    <div class="profile-info">

        <div class="name-row">
            <span class="profile-name">${user.display_name || user.username}</span>
            <span class="status-dot ${statusClass}"></span>
        </div>

        <div class="profile-username">@${user.username}</div>

        <div class="section-divider"></div>

        <div class="profile-activity">${activityName}</div>
        <div class="activity-details">${activityDetails}</div>

        ${activityIcon ? `<img class="activity-icon" src="${activityIcon}">` : ""}
    </div>
`;

        hofContainer.appendChild(profile);
    });
}

loadHofAvatars();

async function loadMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const container = document.getElementById("member-list");

    members.forEach(member => {
        const div = document.createElement("div");
        div.className = "member";

        div.innerHTML = `
            <img src="${member.avatar}" alt="${member.username}">
            <span>${member.username}</span>
        `;

        container.appendChild(div);
    });
}

loadMembers();
