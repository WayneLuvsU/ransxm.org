import * as THREE from 'three';

const LYRICS = [
  { time: 0,   line: '' },
  { time: 10,  line: '...' },
  { time: 12,  line: 'wala e pinakamainit talaga sa ganitong scene' },
  { time: 15,  line: 'tawag sakin baby hev god baby' },
  { time: 16,  line: 'b o double s chest out baby' },
  { time: 18,  line: 'galing wala tapos ten thou baby' },
  { time: 20,  line: 'twenty thou baby hunnid thou baby' },
  { time: 23,  line: 'milyon na minsan ung money down baby' },
  { time: 25,  line: 'opps pahilaw nang pahilaw baby' },
  { time: 26,  line: 'said what i said and do what i did kaya' },
  { time: 28,  line: 'minsan nalang nanghahalimaw, baby ya dig.' },
  { time: 31,  line: 'kami kami lang sa downtown moneytree we tryna get it ya bish' },
  { time: 35,  line: 'pa ka yan sumama samin mahihirapan yan makaalis' },
  { time: 38,  line: 'ako lang walang kalapit sa industriya' },
  { time: 40,  line: 'PERO WALA PARING MAKAPANIS?' },
  { time: 42,  line: 'alikabok lang lahat yan para sakin' },
  { time: 44,  line: 'kaya wala kong hindi winalis' },
  { time: 46,  line: 'para saan po lahat ng nagpapaliwanag wala ka namang magegets' },
  { time: 50,  line: 'magkaiba tayo ng laro sa buhay checkers sayo kami dito nag cchess' },
  { time: 53,  line: 'pitik sa barya para samin lumalabas lagi' },
  { time: 56,  line: 'sa tatlo pare puro heads' },
  { time: 57,  line: 'nagkakabuhol buhol mga bara sa jan ' },
  { time: 59,  line: 'sa tenga mo na para bang naka dreads' },
  { time: 61,  line: 'pano ba kikilabutan wala naman talaga sa kanila merong THREAT ' },
  { time: 65, line: 'pano ba kikilabutan wala naman talaga sa kanila merong BREAD ' },
  { time: 69, line: 'huh said what i said, huhdid what i did ' },
  { time: 72, line: 'minsananan nalang nanghahalimaw, baby ya dig.' },
];

const TEXT          = 'RANSXM';
const SAMPLE_W      = 1400;
const SAMPLE_H      = 400;
const SAMPLE_STEP   = 2;
const BRIGHTNESS    = 128;
const FONT_STACK    = '"Helvetica Neue", "Arial Black", Arial, sans-serif';

const PARTICLE_COUNT = 80000;

const FOV           = 55;
const CAMERA_Z      = 46;
const CAMERA_PARALLAX_X = 4.0;
const CAMERA_PARALLAX_Y = 2.8;

const WAVE_AMP_MAIN  = 5.5;
const WAVE_AMP_SUB   = 3.0;
const WAVE_AMP_Z     = 8.0;

const WIND_STRENGTH  = 6.0;

const SPRING_FIELD   = 0.035;
const SPRING_TEXT    = 0.11;
const DAMP_FIELD     = 0.94;
const DAMP_TEXT      = 0.86;

const MORPH_DECAY    = 0.20;
const TEXT_SHIMMER   = 0.12;

const RIGHT_SIDE_VW    = 5;
const RIGHT_SIDE_VH    = 62;
const LEFT_SIDE_VW     = 5;
const LEFT_SIDE_VH     = 30;

const container    = document.getElementById('canvas-container');
const hero         = document.getElementById('hero');
const hint         = document.getElementById('hint');
const overlayEl    = document.getElementById('overlay');
const navbarEl     = document.getElementById('navbar');
const logoImg      = document.getElementById('navLogoImg');
const brandEl      = document.getElementById('brandText');
const audioEl      = document.getElementById('bgAudio');
const soundBtn     = document.getElementById('soundToggle');
const lyricsEl     = document.getElementById('lyrics');
const lyricPrev    = document.getElementById('lyricPrev');
const lyricCurr    = document.getElementById('lyricCurr');
const bgImageEl    = document.getElementById('bgImage');
const cameraFlash  = document.getElementById('cameraFlash');
const strobeLine   = document.getElementById('strobeLine');

logoImg.addEventListener('error', () => logoImg.classList.add('broken'));

let width  = innerWidth;
let height = innerHeight;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.011);

const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 400);
camera.position.set(0, 0, CAMERA_Z);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

function visibleAtZ(z) {
  const vH = 2 * Math.tan((FOV * Math.PI / 180) / 2) * (CAMERA_Z - z);
  return { w: vH * camera.aspect, h: vH };
}
const vis = visibleAtZ(0);

const sampleCanvas = document.createElement('canvas');
sampleCanvas.width  = SAMPLE_W;
sampleCanvas.height = SAMPLE_H;
const sctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
sctx.fillStyle = '#000'; sctx.fillRect(0,0,SAMPLE_W,SAMPLE_H);
sctx.textAlign = 'center'; sctx.textBaseline = 'middle'; sctx.fillStyle = '#fff';

(function fitAndDraw() {
  let fontSize = SAMPLE_H * 0.85;
  sctx.font = `900 ${fontSize}px ${FONT_STACK}`;
  let m = sctx.measureText(TEXT);
  while (m.width > SAMPLE_W * 0.92 && fontSize > 10) {
    fontSize -= 2;
    sctx.font = `900 ${fontSize}px ${FONT_STACK}`;
    m = sctx.measureText(TEXT);
  }
  sctx.fillText(TEXT, SAMPLE_W / 2, SAMPLE_H / 2);
})();

const imgData = sctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
const rawPoints = [];
for (let y = 0; y < SAMPLE_H; y += SAMPLE_STEP) {
  for (let x = 0; x < SAMPLE_W; x += SAMPLE_STEP) {
    if (imgData[(y * SAMPLE_W + x) * 4] > BRIGHTNESS) rawPoints.push([x, y]);
  }
}
const textSampleCount = rawPoints.length;

const shuffledSamples = [...Array(textSampleCount).keys()];
for (let i = shuffledSamples.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledSamples[i], shuffledSamples[j]] = [shuffledSamples[j], shuffledSamples[i]];
}

const TEXT_WORLD_WIDTH = vis.w * 0.72;
const TEXT_SCALE = TEXT_WORLD_WIDTH / SAMPLE_W;

const N = PARTICLE_COUNT;
const fieldPositions = new Float32Array(N * 3);
const textPositions  = new Float32Array(N * 3);
const positions      = new Float32Array(N * 3);
const velocities     = new Float32Array(N * 3);
const seeds          = new Float32Array(N);

const FIELD_W = vis.w * 1.35;
const FIELD_H = vis.h * 1.35;
const FIELD_D = 40;

for (let i = 0; i < N; i++) {
  const i3 = i * 3;
  fieldPositions[i3]     = (Math.random() - 0.5) * FIELD_W;
  fieldPositions[i3 + 1] = (Math.random() - 0.5) * FIELD_H;
  fieldPositions[i3 + 2] = (Math.random() - 0.5) * FIELD_D;
  seeds[i] = Math.random() * 1000;
}

for (let i = 0; i < N; i++) {
  const sample = rawPoints[shuffledSamples[i % textSampleCount]];
  const sx = sample[0], sy = sample[1];
  const tx = (sx - SAMPLE_W / 2) * TEXT_SCALE + (Math.random() - 0.5) * 0.35;
  const ty = -(sy - SAMPLE_H / 2) * TEXT_SCALE + (Math.random() - 0.5) * 0.35;
  const tz = (Math.random() - 0.5) * 1.5;
  const i3 = i * 3;
  textPositions[i3] = tx; textPositions[i3+1] = ty; textPositions[i3+2] = tz;
}

for (let i = 0; i < N * 3; i++) {
  positions[i] = fieldPositions[i] + (Math.random() - 0.5) * 40;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

function makeParticleTexture() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  g.addColorStop(0.00, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
  g.addColorStop(0.75, 'rgba(255,255,255,0.08)');
  g.addColorStop(1.00, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

const material = new THREE.PointsMaterial({
  size: 0.30, map: makeParticleTexture(), color: 0xffffff,
  transparent: true, opacity: 0.9,
  blending: THREE.AdditiveBlending,
  depthWrite: false, depthTest: true,
  sizeAttenuation: true, alphaTest: 0.001, fog: true
});

const points = new THREE.Points(geometry, material);
scene.add(points);

const simplex = (() => {
  const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
  const p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  const perm = new Uint8Array(512), pm12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) { perm[i] = p[i & 255]; pm12[i] = perm[i] % 12; }
  const F3 = 1/3, G3 = 1/6;
  const dot = (g, x, y, z) => g[0]*x + g[1]*y + g[2]*z;
  return function (xin, yin, zin) {
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const x0 = xin - (i - t), y0 = yin - (j - t), z0 = zin - (k - t);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1=1;j1=0;k1=0; i2=1;j2=1;k2=0; }
      else if (x0 >= z0) { i1=1;j1=0;k1=0; i2=1;j2=0;k2=1; }
      else { i1=0;j1=0;k1=1; i2=1;j2=0;k2=1; }
    } else {
      if (y0 < z0) { i1=0;j1=0;k1=1; i2=0;j2=1;k2=1; }
      else if (x0 < z0) { i1=0;j1=1;k1=0; i2=0;j2=1;k2=1; }
      else { i1=0;j1=1;k1=0; i2=1;j2=1;k2=0; }
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2*G3, y2 = y0 - j2 + 2*G3, z2 = z0 - k2 + 2*G3;
    const x3 = x0 - 1 + 3*G3, y3 = y0 - 1 + 3*G3, z3 = z0 - 1 + 3*G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if (t0 > 0) { t0 *= t0; n0 = t0*t0*dot(grad3[pm12[ii + perm[jj + perm[kk]]]], x0, y0, z0); }
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if (t1 > 0) { t1 *= t1; n1 = t1*t1*dot(grad3[pm12[ii+i1 + perm[jj+j1 + perm[kk+k1]]]], x1, y1, z1); }
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if (t2 > 0) { t2 *= t2; n2 = t2*t2*dot(grad3[pm12[ii+i2 + perm[jj+j2 + perm[kk+k2]]]], x2, y2, z2); }
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if (t3 > 0) { t3 *= t3; n3 = t3*t3*dot(grad3[pm12[ii+1 + perm[jj+1 + perm[kk+1]]]], x3, y3, z3); }
    return 32 * (n0 + n1 + n2 + n3);
  };
})();

audioEl.volume = 0.55;
let audioStarted = false;
function startAudio() {
  if (audioStarted) return;
  audioStarted = true;
  const p = audioEl.play();
  if (p && typeof p.then === 'function') {
    p.then(() => soundBtn.classList.add('visible'))
     .catch(err => { console.warn(err); audioStarted = false; });
  } else {
    soundBtn.classList.add('visible');
  }
}
soundBtn.addEventListener('click', e => {
  e.stopPropagation();
  audioEl.muted = !audioEl.muted;
  soundBtn.classList.toggle('muted', audioEl.muted);
});

let currentLyricIndex = -1;
let currentSide = 'right';
function placeLine(el, side, isPrev) {
  const effective = isPrev ? (side === 'right' ? 'left' : 'right') : side;
  const vw = innerWidth, vh = innerHeight;
  if (effective === 'right') {
    el.style.left = ''; el.style.right = (vw * (RIGHT_SIDE_VW / 100)) + 'px';
    el.style.top = (vh * (RIGHT_SIDE_VH / 100)) + 'px';
    el.style.textAlign = 'right';
  } else {
    el.style.right = ''; el.style.left = (vw * (LEFT_SIDE_VW / 100)) + 'px';
    el.style.top = (vh * (LEFT_SIDE_VH / 100)) + 'px';
    el.style.textAlign = 'left';
  }
}
function positionLyrics() {
  placeLine(lyricCurr, currentSide, false);
  placeLine(lyricPrev, currentSide, true);
}
function updateLyrics() {
  if (!audioStarted) return;
  const time = audioEl.currentTime;
  let idx = -1;
  for (let i = 0; i < LYRICS.length; i++) {
    if (LYRICS[i].time <= time) idx = i; else break;
  }
  if (idx === currentLyricIndex) return;
  currentLyricIndex = idx;
  const curr = LYRICS[idx];
  const prev = idx > 0 ? LYRICS[idx - 1] : null;
  if (!curr || !curr.line) { lyricsEl.classList.remove('active'); return; }
  currentSide = (currentSide === 'right') ? 'left' : 'right';
  lyricCurr.textContent = curr.line;
  lyricPrev.textContent = (prev && prev.line) ? prev.line : '';
  positionLyrics();
  lyricsEl.classList.add('active');
}
positionLyrics();

let targetMorph = 0, morphProgress = 0, morphLocked = false;
const mouseNDC = new THREE.Vector2(0, 0);
let camTargetX = 0, camTargetY = 0, camPosX = 0, camPosY = 0;

addEventListener('mousemove', e => {
  mouseNDC.x = (e.clientX / innerWidth) * 2 - 1;
  mouseNDC.y = -(e.clientY / innerHeight) * 2 + 1;
  camTargetX = mouseNDC.x * CAMERA_PARALLAX_X;
  camTargetY = mouseNDC.y * CAMERA_PARALLAX_Y;
});

function setClick() {
  if (morphLocked) return;
  startAudio();
  targetMorph = 1;
  hint.classList.add('hidden');
}
hero.addEventListener('click', setClick);
hero.addEventListener('touchstart', setClick, { passive: true });
hero.addEventListener('dragstart', e => e.preventDefault());
hero.addEventListener('contextmenu', e => e.preventDefault());

let navbarGlassActive = false;

function updateNavbarForScroll() {
  const glassThreshold = innerHeight * 0.15;
  const lightThreshold = innerHeight * 0.6;

  const shouldBeGlass = window.scrollY > glassThreshold;

  if (shouldBeGlass && !navbarGlassActive) {
    navbarGlassActive = true;
    navbarEl.classList.add('glass');

    navbarEl.classList.remove('pop');
    void navbarEl.offsetWidth;
    navbarEl.classList.add('pop');
    setTimeout(() => navbarEl.classList.remove('pop'), 1000);

    navbarEl.classList.remove('shine');
    void navbarEl.offsetWidth;
    navbarEl.classList.add('shine');
    setTimeout(() => navbarEl.classList.remove('shine'), 1700);
  } else if (!shouldBeGlass && navbarGlassActive) {
    navbarGlassActive = false;
    navbarEl.classList.remove('glass', 'pop', 'shine');
  }

  if (window.scrollY > lightThreshold) navbarEl.classList.add('light');
  else navbarEl.classList.remove('light');
}
window.addEventListener('scroll', updateNavbarForScroll, { passive: true });

const TILE_COLS = 5;
const TILE_ROWS = 6;

function buildShatterGrid(col, bannerUrl) {
  const shatter = col.querySelector('.hof-shatter');
  if (!shatter || !bannerUrl) return;

  const tileW = 100 / TILE_COLS;
  const tileH = 100 / TILE_ROWS;

  for (let r = 0; r < TILE_ROWS; r++) {
    for (let c = 0; c < TILE_COLS; c++) {
      const tile = document.createElement('div');
      tile.className = 'hof-tile';
      tile.style.left = (c * tileW) + '%';
      tile.style.top  = (r * tileH) + '%';
      tile.style.width  = tileW + '%';
      tile.style.height = tileH + '%';

      tile.style.backgroundSize = `${TILE_COLS * 100}% ${TILE_ROWS * 100}%`;
      tile.style.backgroundPosition =
        `${(c / (TILE_COLS - 1)) * 100}% ${(r / (TILE_ROWS - 1)) * 100}%`;
      tile.style.backgroundImage = `url("${bannerUrl}")`;

      const centerX = (c + 0.5) / TILE_COLS - 0.5;
      const centerY = (r + 0.5) / TILE_ROWS - 0.5;

      const baseDist = 180;
      const jitterX  = (Math.random() - 0.5) * 90;
      const jitterY  = (Math.random() - 0.5) * 90;
      const tx = centerX * baseDist * 2.2 + jitterX;
      const ty = centerY * baseDist * 2.2 + jitterY;
      const rot = (Math.random() - 0.5) * 40;

      tile.style.setProperty('--tx',  tx.toFixed(1) + 'px');
      tile.style.setProperty('--ty',  ty.toFixed(1) + 'px');
      tile.style.setProperty('--rot', rot.toFixed(1) + 'deg');

      const delay = Math.random() * 0.18;
      tile.style.transitionDelay = delay + 's';

      shatter.appendChild(tile);
    }
  }
}

document.querySelectorAll('#hof .hof-col').forEach(col => {
  const bannerUrl = col.dataset.banner;
  if (bannerUrl) buildShatterGrid(col, bannerUrl);
});

document.querySelectorAll('#hof .hof-col').forEach(col => {
  let timer = null;
  function onEnter() {
    clearTimeout(timer);
    col.classList.add('hovering');
  }
  function onLeave() {
    clearTimeout(timer);
    col.classList.remove('hovering');
  }
  col.addEventListener('pointerenter', onEnter);
  col.addEventListener('pointerleave', onLeave);
});

const AVATAR_CENTER_TARGET = 250;
const INFO_GAP_BELOW_CENTER = 110;

function syncHofPositions() {
  document.querySelectorAll('#hof .hof-col').forEach(col => {
    const colH = col.clientHeight;
    if (!colH) return;
    const offset = AVATAR_CENTER_TARGET - colH / 2;
    col.style.setProperty('--avatar-hover-y', offset + 'px');
    col.style.setProperty('--avatar-hover-center', AVATAR_CENTER_TARGET + 'px');
  });
}

syncHofPositions();
window.addEventListener('resize', syncHofPositions);
new MutationObserver(syncHofPositions).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class'],
});
window.addEventListener('load', syncHofPositions);
setTimeout(syncHofPositions, 100);
setTimeout(syncHofPositions, 500);
setTimeout(syncHofPositions, 1500);

const LANYARD_REFRESH_MS = 15000;

function formatTime(ms) {
  if (!ms || ms < 0) return '0:00';
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function activityIconUrl(activity) {
  if (!activity) return '';
  const name = (activity.name || '').toLowerCase();
  if (activity.assets && activity.assets.large_image) {
    const li = activity.assets.large_image;
    if (li.startsWith('mp:')) return `https://media.discordapp.net/${li.slice(3)}`;
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${li}.png`;
  }
  if (name.includes('roblox'))    return 'https://cdn.discordapp.com/app-icons/327256388083908610/3ba4c0f6bd7e3fcdfe08eed9a4f00b1e.png';
  if (name.includes('valorant'))  return 'https://cdn.discordapp.com/app-icons/700136079562375258/e8e5b6cb1a6a5b0d6e3a36c05f6c0b8e.png';
  if (name.includes('league'))    return 'https://cdn.discordapp.com/app-icons/356869127241072640/8c1c9fda5f2b5b3e6c1f5c96f7e90a4b.png';
  if (name.includes('minecraft')) return 'https://cdn.discordapp.com/app-icons/356875570916753438/9b1f1e5b6a3fbb10d2a60c0f3a6dfb36.png';
  return '';
}

function applyDecoration(col, deco) {
  if (!deco) return;
  const img = col.querySelector('.hof-decoration');
  if (!img) return;
  img.src = `https://cdn.discordapp.com/avatar-decoration-presets/${deco}.png?size=240`;
  img.classList.add('has-deco');
}

function fillInfo(col, json) {
  const u = json.data.discord_user || {};
  const displayName = u.display_name || u.global_name || u.username || '—';
  const username = u.username ? `@${u.username}` : '';

  col.querySelector('[data-field="name"]').textContent = displayName;
  col.querySelector('[data-field="username"]').textContent = username;

  const statusEl = col.querySelector('[data-field="status"]');
  const custom = (json.data.activities || []).find(a => a.type === 4);
  if (custom && (custom.state || custom.name)) {
    statusEl.textContent = custom.state || custom.name;
    statusEl.classList.add('has-status');
  } else {
    statusEl.textContent = '';
    statusEl.classList.remove('has-status');
  }

  const activityEl = col.querySelector('[data-field="activity"]');
  const activity = (json.data.activities || []).find(a => a.type !== 4 && a.name !== 'Spotify');
  if (activity) {
    activityEl.classList.add('has-activity');
    const icon = activityEl.querySelector('[data-field="activity-img"]');
    const iconUrl = activityIconUrl(activity);
    if (iconUrl) { icon.src = iconUrl; icon.style.display = 'block'; }
    else { icon.style.display = 'none'; }
    activityEl.querySelector('[data-field="activity-title"]').textContent = `Playing ${activity.name}`;
    const sub = activity.details
      ? `${activity.details}${activity.state ? ' · ' + activity.state : ''}`
      : (activity.state || '');
    activityEl.querySelector('[data-field="activity-sub"]').textContent = sub;
  } else {
    activityEl.classList.remove('has-activity');
  }

  const spotifyEl = col.querySelector('[data-field="spotify"]');
  const timeEl = col.querySelector('[data-field="time"]');
  if (json.data.listening_to_spotify && json.data.spotify) {
    const s = json.data.spotify;
    spotifyEl.classList.add('has-activity');
    spotifyEl.querySelector('[data-field="spotify-img"]').src = s.album_art_url || '';
    spotifyEl.querySelector('[data-field="spotify-title"]').textContent = `${s.song} — ${s.artist}`;
    spotifyEl.querySelector('[data-field="spotify-sub"]').textContent = s.album || '';
    timeEl.classList.add('has-time');
    const elapsed = Date.now() - s.timestamps.start;
    const total = s.timestamps.end - s.timestamps.start;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    col.querySelector('[data-field="time-now"]').textContent = formatTime(elapsed);
    col.querySelector('[data-field="time-end"]').textContent = formatTime(total);
    col.querySelector('[data-field="time-fill"]').style.width = pct + '%';
  } else {
    spotifyEl.classList.remove('has-activity');
    timeEl.classList.remove('has-time');
  }
}

async function loadHofData() {
  const cols = document.querySelectorAll('#hof .hof-col[data-user-id]');
  if (!cols.length) return;
  await Promise.all([...cols].map(async col => {
    const id = col.dataset.userId;
    if (!id) return;
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`, { cache: 'no-store' });
      const json = await res.json();
      if (!json.success || !json.data) return;
      const u = json.data.discord_user || {};
      const deco = u.avatar_decoration_data && u.avatar_decoration_data.asset;
      applyDecoration(col, deco);
      fillInfo(col, json);
      col._lanyardData = json;
    } catch (err) {}
  }));
}
loadHofData();
setInterval(loadHofData, LANYARD_REFRESH_MS);

setInterval(() => {
  document.querySelectorAll('#hof .hof-col[data-user-id]').forEach(col => {
    const json = col._lanyardData;
    if (!json || !json.data || !json.data.listening_to_spotify || !json.data.spotify) return;
    const s = json.data.spotify;
    const elapsed = Date.now() - s.timestamps.start;
    const total = s.timestamps.end - s.timestamps.start;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    col.querySelector('[data-field="time-now"]').textContent = formatTime(elapsed);
    col.querySelector('[data-field="time-fill"]').style.width = pct + '%';
  });
}, 1000);

const loaderEl = document.getElementById('loader');
const trackEl  = document.getElementById('track');
let loaderRunning = false;

function positionLoader() {
  const topPx = innerHeight / 2 + innerWidth * 0.05 + 30;
  loaderEl.style.top = topPx + 'px';
}
positionLoader();

function buildTrack() {
  trackEl.innerHTML = '';
  for (let i = 100; i >= 0; i--) {
    const row = document.createElement('div');
    row.className = 'row';
    row.textContent = i;
    trackEl.appendChild(row);
  }
}

function fireCameraFlash() {
  cameraFlash.classList.remove('fire');
  strobeLine.classList.remove('fire');
  void cameraFlash.offsetWidth;
  void strobeLine.offsetWidth;
  cameraFlash.classList.add('fire');
  strobeLine.classList.add('fire');
}

function startLoader() {
  if (loaderRunning) return;
  loaderRunning = true;
  buildTrack();
  positionLoader();
  loaderEl.classList.add('active');
  setTimeout(() => {
    trackEl.classList.add('go');
    setTimeout(() => {
      loaderEl.classList.remove('active');
      container.classList.add('zoomed');
      overlayEl.classList.add('dim');
      bgImageEl.classList.add('visible');
      fireCameraFlash();
      document.documentElement.classList.add('scrollable');
      updateNavbarForScroll();
if (typeof window.Lenis !== 'undefined') {
  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    lerp: 0.1,
  });
  window.__lenis = lenis;

  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    lenis.on('scroll', window.ScrollTrigger.update);
    window.gsap.ticker.add((time) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    });
  });

  let rT;
  window.addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => {
      lenis.resize();
      if (typeof window.ScrollTrigger !== 'undefined') window.ScrollTrigger.refresh();
    }, 150);
  });

  setTimeout(() => lenis.resize(), 300);
}
setTimeout(() => {
  if (!document.documentElement.classList.contains('scrollable')) {
    document.documentElement.classList.add('scrollable');
    updateNavbarForScroll();
    navbarEl.classList.add('visible');
    window.dispatchEvent(new Event('ransxm:scrollable'));
  }
}, 6000);
      setTimeout(() => {
        navbarEl.classList.add('visible');
        brandEl.classList.add('hidden-brand');
        syncHofPositions();
      }, 220);
    }, 3000 + 1000);
  }, 500);
}

const heroClock = new THREE.Clock();
const posAttr  = geometry.attributes.position;
const posArray = posAttr.array;

function animateHero() {
  requestAnimationFrame(animateHero);

  const dt = Math.min(heroClock.getDelta(), 0.05);
  const t  = heroClock.elapsedTime;

  updateLyrics();

  const easeFactor = 1 - Math.pow(MORPH_DECAY, dt);
  morphProgress += (targetMorph - morphProgress) * easeFactor;
  const mp = morphProgress;
  const invMp = 1 - mp;

  if (!morphLocked && targetMorph === 1 && morphProgress > 0.98) {
    morphLocked = true;
    hint.classList.add('hidden');
    startLoader();
  }

  const doSimplex = mp > 0.02;
  const doWaves   = invMp > 0.02;

  camPosX += (camTargetX - camPosX) * 3 * dt;
  camPosY += (camTargetY - camPosY) * 3 * dt;
  const autoX = Math.sin(t * 0.11) * 1.6;
  const autoY = Math.cos(t * 0.15) * 1.1;
  camera.position.x = camPosX + autoX;
  camera.position.y = camPosY + autoY;
  camera.position.z = CAMERA_Z;
  camera.lookAt(0, 0, 0);

  const k = SPRING_FIELD + mp * (SPRING_TEXT - SPRING_FIELD);
  const d = DAMP_FIELD   + mp * (DAMP_TEXT   - DAMP_FIELD);

  const globalWindX = Math.sin(t * 0.08) * 0.65 + Math.sin(t * 0.23) * 0.25;
  const globalWindY = Math.cos(t * 0.11) * 0.30;
  const globalWindZ = Math.sin(t * 0.06) * 0.55;

  for (let i = 0; i < N; i++) {
    const i3 = i * 3;
    const seed = seeds[i];
    const fx = fieldPositions[i3];
    const fy = fieldPositions[i3 + 1];
    const fz = fieldPositions[i3 + 2];

    let fieldX = fx, fieldY = fy, fieldZ = fz;
    if (doWaves) {
      const swellA = Math.sin(fy * 0.045 + t * 0.62);
      const swellB = Math.cos(fx * 0.040 + t * 0.55);
      const swellC = Math.sin(fz * 0.060 + t * 0.72);
      const midA = Math.sin((fx + fy) * 0.055 + t * 0.88);
      const midB = Math.cos((fy - fz) * 0.050 + t * 0.79);
      const midC = Math.sin((fz + fx) * 0.058 + t * 0.95);
      const ripA = Math.sin(fx * 0.17 + fy * 0.12 + t * 1.45) * 0.5;
      const ripB = Math.cos(fy * 0.19 + fz * 0.14 + t * 1.28) * 0.5;
      const ripC = Math.sin(fz * 0.16 + fx * 0.13 + t * 1.62) * 0.5;
      const waveX = swellA * WAVE_AMP_MAIN + midA * WAVE_AMP_SUB + ripA * 2.2;
      const waveY = swellB * WAVE_AMP_MAIN + midB * WAVE_AMP_SUB + ripB * 2.2;
      const waveZ = swellC * WAVE_AMP_Z    + midC * WAVE_AMP_SUB * 1.4 + ripC * 3.0;
      const windPhase = seed * 0.0012 + t * 0.11;
      const windGust  = 0.6 + Math.sin(windPhase) * 0.4;
      const windX = globalWindX * WIND_STRENGTH * windGust + Math.sin(windPhase * 2.1) * WIND_STRENGTH * 0.25;
      const windY = globalWindY * WIND_STRENGTH * windGust + Math.cos(windPhase * 1.7) * WIND_STRENGTH * 0.20;
      const windZ = globalWindZ * WIND_STRENGTH * windGust + Math.sin(windPhase * 0.9) * WIND_STRENGTH * 0.30;
      fieldX = fx + waveX + windX;
      fieldY = fy + waveY + windY;
      fieldZ = fz + waveZ + windZ;
    }

    let textX = textPositions[i3];
    let textY = textPositions[i3 + 1];
    let textZ = textPositions[i3 + 2];
    if (doSimplex) {
      const shX = simplex(textX * 0.14, textY * 0.14, t * 0.9) * TEXT_SHIMMER;
      const shY = simplex(textY * 0.14 + 40, textX * 0.14, t * 0.9) * TEXT_SHIMMER;
      const shZ = simplex(textZ * 0.14 + 80, textX * 0.14, t * 0.75) * TEXT_SHIMMER * 2;
      textX += shX; textY += shY; textZ += shZ;
    }

    const targetX = fieldX * invMp + textX * mp;
    const targetY = fieldY * invMp + textY * mp;
    const targetZ = fieldZ * invMp + textZ * mp;

    const px = posArray[i3], py = posArray[i3 + 1], pz = posArray[i3 + 2];
    let vx = velocities[i3], vy = velocities[i3 + 1], vz = velocities[i3 + 2];

    vx = (vx + (targetX - px) * k) * d;
    vy = (vy + (targetY - py) * k) * d;
    vz = (vz + (targetZ - pz) * k) * d;

    posArray[i3]     = px + vx;
    posArray[i3 + 1] = py + vy;
    posArray[i3 + 2] = pz + vz;

    velocities[i3]     = vx;
    velocities[i3 + 1] = vy;
    velocities[i3 + 2] = vz;
  }

  posAttr.needsUpdate = true;
  material.opacity = 0.9 + Math.sin(t * 1.7) * 0.05 + mp * 0.10;
  material.size    = 0.30 - mp * 0.05;

  renderer.render(scene, camera);
}
animateHero();

addEventListener('resize', () => {
  width  = innerWidth;
  height = innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  positionLoader();
  positionLyrics();
  updateNavbarForScroll();
});

(function initAboutEffects() {
  const about = document.getElementById('about');
  if (!about) return;

  about.querySelectorAll('.about-info p').forEach(p => {
    const html = p.innerHTML
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(word => {
        const isStrong = word.startsWith('<strong>');
        const cleaned = word
          .replace(/<\/?strong>/g, '')
          .replace(/<[^>]+>/g, '');
        return `<span class="word${isStrong ? ' strong' : ''}">${cleaned}</span>`;
      })
      .join(' ');
    p.innerHTML = html;
  });

  let idx = 0;
  about.querySelectorAll('.about-info p .word').forEach(span => {
    span.style.setProperty('--i', idx++);
  });

  const aboutSub = about.querySelector('.about-subtitle');
  if (aboutSub) {
    aboutSub.innerHTML = aboutSub.textContent
      .trim()
      .split(/\s+/)
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');
    let subIdx = 0;
    aboutSub.querySelectorAll('.word').forEach(span => {
      span.style.setProperty('--i', subIdx++);
    });
  }

  const hof = document.getElementById('hof');
  const hofSub = hof && hof.querySelector('.hof-subtitle');
  if (hofSub) {
    hofSub.innerHTML = hofSub.textContent
      .trim()
      .split(/\s+/)
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');
    let hofIdx = 0;
    hofSub.querySelectorAll('.word').forEach(span => {
      span.style.setProperty('--i', hofIdx++);
    });
  }

  const members = document.getElementById('members');
  const membersSub = members && members.querySelector('.members-subtitle');
  if (membersSub) {
    membersSub.innerHTML = membersSub.textContent
      .trim()
      .split(/\s+/)
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');
    let mIdx = 0;
    membersSub.querySelectorAll('.word').forEach(span => {
      span.style.setProperty('--i', mIdx++);
    });
  }

  const affiliations = document.getElementById('affiliations');
  const affiliationsSub = affiliations && affiliations.querySelector('.affiliations-subtitle');
  if (affiliationsSub) {
    affiliationsSub.innerHTML = affiliationsSub.textContent
      .trim()
      .split(/\s+/)
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');
    let aIdx = 0;
    affiliationsSub.querySelectorAll('.word').forEach(span => {
      span.style.setProperty('--i', aIdx++);
    });
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.documentElement.classList.add('in-view-' + entry.target.id);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });

  io.observe(about);
  if (hof) io.observe(hof);
  if (members) io.observe(members);
  if (affiliations) io.observe(affiliations);
})();

(function initServerStats() {
  const INVITE_CODE = '6qnj82NAH';
  const membersEl = document.getElementById('statMembers');
  const onlineEl  = document.getElementById('statOnline');
  if (!membersEl || !onlineEl) return;

  async function fetchStats() {
    try {
      const res = await fetch(
        `https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true&with_expiration=true`,
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error('invite fetch failed');
      const data = await res.json();
      const members = data.approximate_member_count;
      const online  = data.approximate_presence_count;

      if (typeof members === 'number') membersEl.textContent = members.toLocaleString();
      if (typeof online  === 'number') onlineEl.textContent  = online.toLocaleString();
    } catch (err) {
      console.warn('[stats] failed:', err);
    }
  }

  fetchStats();
  setInterval(fetchStats, 60000);
})();

(function initMembersCarousel() {
  const membersSection = document.getElementById('members');
  if (!membersSection) return;

  const CARDS = [
    { id: "737630884823433267", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/902fb683da6e99129aa43990f81607cd.gif" },
    { id: "1498182038342336542", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/b26aac9e27b62fa97df88df0f1d9ab85.gif" },
    { id: "984436577612759111",  banner: "https://file.garden/aN0Uo2YmaWI-OmAY/e573837f9c6a6b63d9e5c624f5016778.gif" },
    { id: "1501588984810176792", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/7b6dc6e8b7c0a9de2707d95b5d576fd8.gif" },
    { id: "1525699033882955967", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/c0b7c40bb0597f78a558a9e4daa8bd62.gif" },
    { id: "453061371513536523",  banner: "https://file.garden/aN0Uo2YmaWI-OmAY/d310d314fc99e1aedd20294e5cc6c5b1.gif" },
    { id: "1411934822544314381", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/5bda4cf535a9f4e6691ab12a62598746.gif" },
    { id: "1322181942078341174", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/ea68e70d72f18df93e7cd450f99be896.gif" },
    { id: "1418922415802679330", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/36adbd4765f5e1f65d7615cf0ae48f65.gif" },
    { id: "1171474815874506864", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/328826fa582ff4e248949e467cd59710.gif" },
    { id: "1477383583386828850", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/971702e33529e796a3dd79b73fd6ac42.gif" },
    { id: "1361012595561205951", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/8ad20ddb5e0a0a04e5564036fc1ba36c.gif" },
    { id: "1495036966360842260", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/3a09b8909238a19355cd7dd946658e46.gif" },
    { id: "1380573575282692166", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/7d329e822816984545eed29b3ece8601.gif" },
    { id: "1252278719184113724", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/0ad735f722522d9a424b2a018ff63319.gif" },
    { id: "1409472056109826181", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/2498b7aeb833d49748f0af151cf199a5.gif" },
    { id: "998493903286181928", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/2a7e42c8a096727f801abbbdd0dc370b.gif" },
    { id: "1439556646966923317", banner: "https://file.garden/aN0Uo2YmaWI-OmAY/d748caa0ffc9c604a10beedc75d4775f.gif" },
  ];

  const RADIUS_X = 720;
  const RADIUS_Y = 175;
  const DEPTH_Z  = 460;
  const ROTATION_SPEED = 0.08;
  const FRONT_SPREAD = 0.97;

  const stage    = document.getElementById('membersStage');
  const carousel = document.getElementById('membersCarousel');
  const prevBtn  = document.getElementById('membersPrevBtn');
  const nextBtn  = document.getElementById('membersNextBtn');

  const ambientA = document.getElementById('membersAmbientA');
  const ambientB = document.getElementById('membersAmbientB');

  const cards = [];

  let rotation = 0;
  let isHoveringCard = false;
  let isNavigating = false;
  let hoveredIndex = null;
  let lastTime = performance.now();

  let ambientFront = ambientA;
  let ambientBack  = ambientB;
  let ambientUrl   = null;

  const STATUS_COLORS = {
    online: "#23a55a",
    idle:   "#f0b232",
    dnd:    "#f23f43",
    offline:"#747f8d"
  };

  function setAmbient(url) {
    if (url === ambientUrl) return;

    if (!url) {
      ambientUrl = null;
      ambientFront.classList.remove("active");
      ambientBack.classList.remove("active");
      return;
    }

    ambientUrl = url;
    ambientBack.style.backgroundImage = `url("${url}")`;
    void ambientBack.offsetWidth;

    ambientBack.classList.add("active");
    ambientFront.classList.remove("active");

    const tmp = ambientFront;
    ambientFront = ambientBack;
    ambientBack  = tmp;
  }

  function buildCards() {
    carousel.innerHTML = "";
    cards.length = 0;

    CARDS.forEach((entry, i) => {
      const id     = typeof entry === "string" ? entry : entry.id;
      const banner = typeof entry === "string" ? ""    : (entry.banner || "");

      const card = document.createElement("div");
      card.className = "card loading";
      card.dataset.index  = i;
      card.dataset.banner = banner;

      const bannerStyle = banner
        ? `style="background-image:url('${banner}');"`
        : "";

      card.innerHTML = `
        <div class="card-banner" ${bannerStyle}></div>

        <div class="card-body">
          <img
            class="card-avatar"
            alt=""
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%232b2f3a'/%3E%3C/svg%3E"
          >
          <div class="card-info">
            <div class="card-displayname">UNKNOWN</div>
            <div class="card-username">—</div>
          </div>
        </div>
      `;

      carousel.appendChild(card);
      cards.push(card);

      card.addEventListener("pointerenter", () => {
        if (isNavigating) return;
        const index = Number(card.dataset.index);
        isHoveringCard = true;

        card.classList.add("hovered");
        stage.classList.add("focus");

        setAmbient(card.dataset.banner || null);

        if (hoveredIndex !== index) {
          hoveredIndex = index;
          centerCard(index);
        }
      });

      card.addEventListener("pointerleave", () => {
        card.classList.remove("hovered");
        stage.classList.remove("focus");

        requestAnimationFrame(() => {
          const el = document.elementFromPoint(
            window.__lastX ?? -1,
            window.__lastY ?? -1
          );
          if (!el || !el.closest(".card")) {
            hoveredIndex = null;
            isHoveringCard = false;
            setAmbient(null);
          }
        });
      });

      fetchLanyard(id, card);
    });
  }

  stage.addEventListener("pointermove", (e) => {
    window.__lastX = e.clientX;
    window.__lastY = e.clientY;
  });

  stage.addEventListener("pointerleave", () => {
    hoveredIndex = null;
    isHoveringCard = false;
    stage.classList.remove("focus");
    cards.forEach(c => c.classList.remove("hovered"));
    setAmbient(null);
  });

  prevBtn.addEventListener("pointerenter", () => {
    isHoveringCard = false;
    hoveredIndex = null;
    setAmbient(null);
  });
  nextBtn.addEventListener("pointerenter", () => {
    isHoveringCard = false;
    hoveredIndex = null;
    setAmbient(null);
  });

  async function fetchLanyard(userId, cardEl) {
    try {
      const res  = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      const json = await res.json();
      if (!json.success || !json.data) throw new Error("No data");

      const d    = json.data;
      const user = d.discord_user;

      const avatar = user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${(user.discriminator ?? "0") % 5}.png`;

      const img     = cardEl.querySelector(".card-avatar");
      const unameEl = cardEl.querySelector(".card-username");
      const dnameEl = cardEl.querySelector(".card-displayname");
      const color   = STATUS_COLORS[d.discord_status] ?? STATUS_COLORS.offline;

      img.src = avatar;
      img.alt = user.username;

      dnameEl.textContent = user.global_name || user.username;

      unameEl.innerHTML = `
        <span class="status-dot" style="background:${color}"></span>
        ${user.username}
      `;

      cardEl.classList.remove("loading");
    } catch (err) {
      console.warn(`Lanyard fetch failed for ${userId}:`, err.message);
      cardEl.classList.remove("loading");
    }
  }

  function getActiveIndex() {
    const total = cards.length;
    if (!total) return 0;

    const step = 360 / total;
    let bestIndex = 0;
    let bestDistance = Infinity;

    cards.forEach((_, i) => {
      const angle = 90 + i * step + rotation;
      let distance = ((angle - 90 + 180) % 360 + 360) % 360 - 180;
      distance = Math.abs(distance);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    });

    return bestIndex;
  }

  function layout() {
    const total = cards.length;
    if (!total) return;

    let closestOffset = Infinity;
    let activeIndex = 0;

    cards.forEach((card, i) => {
      const baseAngle = 90 + (i / total) * 360;
      const angleDeg  = baseAngle + rotation;
      const angleRad  = angleDeg * Math.PI / 180;

      const frontness  = (Math.sin(angleRad) + 1) / 2;
      const depthCurve = Math.pow(frontness, 2.8);
      const xSpread    = 1 - (1 - FRONT_SPREAD) * depthCurve;

      const x = Math.cos(angleRad) * RADIUS_X * xSpread;
      const y = Math.sin(angleRad) * RADIUS_Y;

      const z = -DEPTH_Z + depthCurve * DEPTH_Z;

      const scale   = 0.48 + depthCurve * 0.52;
      const opacity = 0.28 + Math.pow(frontness, 1.5) * 0.72;

      const d    = ((angleDeg - 90) % 360 + 540) % 360 - 180;
      const absD = Math.abs(d);

      const rotateY = absD < 0.001 ? 0 : Math.cos(angleRad) * -32;

      card.style.transform = `
        translate(-50%, -50%)
        translate3d(${x}px, ${y}px, ${z}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      card.style.opacity = opacity;
      card.style.zIndex  = 1000 + Math.round(depthCurve * 100);

      if (absD < closestOffset) {
        closestOffset = absD;
        activeIndex = i;
      }
    });

    cards.forEach((card, i) => {
      card.classList.toggle("active", i === activeIndex);
    });
  }

  function centerCard(index) {
    if (cards.length < 2 || isNavigating) return;

    const total = cards.length;
    const step  = 360 / total;
    const desiredRotation = -index * step;

    let delta = desiredRotation - rotation;
    delta = ((delta + 180) % 360 + 360) % 360 - 180;

    if (Math.abs(delta) < 0.01) {
      rotation = desiredRotation;
      layout();
      return;
    }

    const start = rotation;
    const target = rotation + delta;
    const startTime = performance.now();
    const duration = 500;
    isNavigating = true;

    function animateCenter(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      rotation = start + (target - start) * eased;
      layout();
      if (t < 1) {
        requestAnimationFrame(animateCenter);
      } else {
        rotation = desiredRotation;
        layout();
        isNavigating = false;
      }
    }
    requestAnimationFrame(animateCenter);
  }

  function nudge(direction) {
    if (cards.length < 2 || isNavigating) return;

    const total = cards.length;
    const step  = 360 / total;

    const currentIndex = getActiveIndex();
    const targetIndex = (currentIndex - direction + total) % total;
    const desiredRotation = -targetIndex * step;

    let delta = desiredRotation - rotation;
    delta = ((delta + 180) % 360 + 360) % 360 - 180;

    const start = rotation;
    const target = rotation + delta;
    const startTime = performance.now();
    const duration = 600;

    isNavigating = true;
    hoveredIndex = null;
    isHoveringCard = false;

    function stepAnim(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      rotation = start + (target - start) * eased;
      layout();
      if (t < 1) {
        requestAnimationFrame(stepAnim);
      } else {
        rotation = desiredRotation;
        layout();
        isNavigating = false;
      }
    }
    requestAnimationFrame(stepAnim);
  }

  prevBtn.addEventListener("click", () => nudge(-1));
  nextBtn.addEventListener("click", () => nudge(1));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  nudge(-1);
    if (e.key === "ArrowRight") nudge(1);
  });

  function animate(now) {
    const dt = Math.min(now - lastTime, 50);
    lastTime = now;

    if (!isHoveringCard && !isNavigating && cards.length > 1) {
      rotation += ROTATION_SPEED * (dt / 16.6667);
    }

    layout();
    requestAnimationFrame(animate);
  }

  buildCards();
  layout();
  lastTime = performance.now();
  requestAnimationFrame(animate);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) lastTime = performance.now();
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 120);
  });
})();

(function initAffiliations() {
  /* ---------- 1. LIVE DATA ---------- */
  const API_BASE = 'https://discord-invite-proxy.engr-wayne02.workers.dev';
  const CACHE_KEY = 'affiliations-cache-v1';
  const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

  const SEEDS = {
    'qVJABByQd': {
      guild: {
        id: '1483361925847846952',
        name: 'Nagmamahal, Ganja #revshit',
        icon: 'd78edbe8d8a1218d2e0fa2011ba7eea4',
        splash: 'c9318c7ccb9b422f5f16e028b3491709',
        banner: null
      },
      approximate_member_count: 679,
      approximate_presence_count: 141
    },
    'p6BXP6rvm': {
      guild: {
        id: '1537377944274468904',
        name: 'kidos',
        icon: 'c7efee6b9c3ea799b17cce2b62aa3dd8',
        splash: 'f3885084544451f618eee553a740041f',
        banner: '718d83af9e0240d547ee22e3b31ad663'
      },
      approximate_member_count: 1125,
      approximate_presence_count: 144
    },
    '8J33FXeT5': {
      guild: {
        id: '1452985229647024180',
        name: '/purpz #breeding grounds #Sacred Hearts',
        icon: '6b5a98eaa9153feb3a9bb862705f9f85',
        splash: '3a87ef4205cd287f98d8e0719b4e02b8',
        banner: 'a_b4bf74812aa3dc547e3acebe788eee7a'
      },
      approximate_member_count: 1402,
      approximate_presence_count: 205
    }
  };

  const FALLBACKS = {
    'qVJABByQd': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f97316"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white" font-family="Inter,system-ui">N</text></svg>',
    'p6BXP6rvm': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%237c3aed"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white" font-family="Inter,system-ui">K</text></svg>',
    '8J33FXeT5': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23e03a7c"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white" font-family="Inter,system-ui">P</text></svg>'
  };

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }
  function writeCache(code, data) {
    try {
      const all = readCache();
      all[code] = { ts: Date.now(), data };
      localStorage.setItem(CACHE_KEY, JSON.stringify(all));
    } catch (e) { console.warn('[cache] write failed', e); }
  }
  function getCached(code) {
    const all = readCache();
    const entry = all[code];
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return entry;
  }

  function buildIconUrl(id, hash) {
    if (!id || !hash) return null;
    const ext = hash.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/icons/${id}/${hash}.${ext}?size=128`;
  }
  function buildBannerUrl(id, hash) {
    if (!id || !hash) return null;
    const ext = hash.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/banners/${id}/${hash}.${ext}?size=600`;
  }
  function buildSplashUrl(id, hash) {
    if (!id || !hash) return null;
    return `https://cdn.discordapp.com/splashes/${id}/${hash}.png?size=600`;
  }

  function applyData(card, data) {
    const nameEl  = card.querySelector('.aff-server-name');
    const statsEl = card.querySelector('.aff-server-stats');
    const imgEl   = card.querySelector('.aff-server-avatar img');
    const coverEl = card.querySelector('.aff-card-cover img');

    const guild   = data.guild || {};
    const name    = guild.name || card.dataset.invite;
    const members = data.approximate_member_count;
    const online  = data.approximate_presence_count;

    nameEl.textContent = name;

    const fmt = (n) => (typeof n === 'number' ? n.toLocaleString() : '—');
    statsEl.innerHTML =
      `<span><span class="aff-online-dot"></span> ${fmt(online)} online</span>` +
      `<span><span class="aff-members-icon"></span> ${fmt(members)} members</span>`;

    const iconUrl = buildIconUrl(guild.id, guild.icon);
    if (iconUrl) {
      imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = FALLBACKS[card.dataset.invite] || '';
      };
      imgEl.src = iconUrl;
    } else {
      imgEl.src = FALLBACKS[card.dataset.invite] || '';
    }

    const bannerUrl = buildBannerUrl(guild.id, guild.banner);
    const splashUrl = buildSplashUrl(guild.id, guild.splash);
    const coverUrl  = bannerUrl || splashUrl;

    if (coverUrl) {
      card.classList.add('has-cover');
      coverEl.onerror = () => {
        coverEl.onerror = null;
        if (coverEl.src !== splashUrl && splashUrl) {
          coverEl.src = splashUrl;
        } else {
          card.classList.remove('has-cover');
          coverEl.removeAttribute('src');
        }
      };
      coverEl.src = coverUrl;
    } else {
      card.classList.remove('has-cover');
      coverEl.removeAttribute('src');
    }
  }

  function applyFallback(card) {
    const code = card.dataset.invite;
    card.querySelector('.aff-server-name').textContent = 'Unavailable';
    card.querySelector('.aff-server-stats').innerHTML =
      `<span><span class="aff-online-dot"></span> — online</span>` +
      `<span><span class="aff-members-icon"></span> — members</span>`;
    card.querySelector('.aff-server-avatar img').src = FALLBACKS[code] || '';
    card.classList.remove('has-cover');
    card.querySelector('.aff-card-cover img').removeAttribute('src');
  }

  async function hydrateCard(card) {
    const code = card.dataset.invite;

    const cached = getCached(code);
    if (cached) {
      applyData(card, cached.data);
    } else if (SEEDS[code]) {
      applyData(card, SEEDS[code]);
    } else {
      card.querySelector('.aff-server-avatar img').src = FALLBACKS[code] || '';
    }

    try {
      const res = await fetch(`${API_BASE}/api/invite/${code}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.message && data.message.includes('rate limited')) {
        throw new Error('Rate limited');
      }
      if (data.error) throw new Error(data.error);

      applyData(card, data);
      writeCache(code, data);
    } catch (err) {
      console.warn(`[affiliations] fetch failed for ${code}:`, err.message);
      if (!cached && !SEEDS[code]) {
        applyFallback(card);
      }
    }
  }

  document.querySelectorAll('#affiliations .aff-card[data-invite]').forEach(hydrateCard);

  const section = document.getElementById('affiliations');
  const cardRow = document.getElementById('affiliationsCardRow');
  if (!section || !cardRow) return;

  const cards = cardRow.querySelectorAll('.aff-card');
  let ticking = false;

  function getProgress() {
    const rect = section.getBoundingClientRect();
    const vh   = window.innerHeight;
    const startY = vh;         
    const endY   = 0;          
    const raw    = (startY - rect.top) / (startY - endY);
    return Math.min(Math.max(raw, 0), 1);
  }

  function mapRange(v, inMin, inMax, outMin, outMax) {
    const t = Math.min(Math.max((v - inMin) / (inMax - inMin), 0), 1);
    return outMin + (outMax - outMin) * t;
  }

  function update() {
    const p = getProgress();
    const c1 = mapRange(p, 0.00, 0.30, 0, 1);
    if (cards[0]) {
      cards[0].style.opacity   = c1;
      cards[0].style.transform = `translateY(${(1 - c1) * 60}px)`;
    }

    const c2 = mapRange(p, 0.30, 0.60, 0, 1);
    if (cards[1]) {
      cards[1].style.opacity   = c2;
      cards[1].style.transform = `translateX(${(1 - c2) * 80}px)`;
    }

    const c3 = mapRange(p, 0.60, 0.90, 0, 1);
    if (cards[2]) {
      cards[2].style.opacity   = c3;
      cards[2].style.transform = `translateX(${(1 - c3) * 80}px)`;
    }

    const cardWidth = 380 + 28;
    const shift = ((3 - (1 + c2 + c3)) / 2) * cardWidth;
    cardRow.style.transform = `translateX(${shift}px)`;

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key))) {
    e.preventDefault();
  }
});
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
})();
