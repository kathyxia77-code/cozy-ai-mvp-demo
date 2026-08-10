/* ═══════════════════════════════════════════════════════════
   The Now Map (此刻 · 同频地图) — North America edition
   进入小组前的开场层：一张「正在泵奶的人」的实时地图。
   - Every lamp = a mom pumping right now (or an M9 at work)
   - Islands = 小组状态/场景，与信息流筛选打通（tag 字段）
   - "Light my lamp" = 零压力的在场表达，比发帖轻得多
   通过 window.MMAP_CONFIG 配置，两个小组页共用本文件。
   调试：URL 加 ?hh=3 可以预览凌晨 3 点的地图氛围。
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var mapColors = {};

  function syncMapColors() {
    var styles = window.getComputedStyle(document.documentElement);
    mapColors.sky = styles.getPropertyValue('--group-map-sky').trim();
    mapColors.lamp = styles.getPropertyValue('--group-map-lamp').trim();
  }

  syncMapColors();
  window.addEventListener('momcozy-theme-change', syncMapColors);

  /* ── 配置 ─────────────────────────────────────────────── */
  var pageHost = document.querySelector('.mm-page-host');
  var pageFallbackConfig = pageHost ? {
    mode: 'page',
    pageMode: true,
    noStrip: true,
    mount: '.mm-page-host',
    counterLabel: 'moms pumping right now',
    lightLabel: 'Light my lamp — try it',
    litLabel: 'Lit · the app keeps it glowing',
    lightNote: 'This lamp fades when you leave. The app remembers yours.',
    enterLabel: 'Get the app',
    greetLit: 'That’s it. You’re on the map.',
    density: 1.1,
    mapZoom: 1.44,
    avatarRatio: 0.08,
    avatarSize: 14,
    onEnter: function () {
      var download = document.getElementById('download');
      if (download) download.scrollIntoView({ behavior: 'smooth' });
    }
  } : {};

  var CFG = Object.assign({
    mode: 'group',                 // 'group' | 'm9' | 'page'
    counterLabel: 'moms pumping with you right now',
    lightLabel: 'Light my lamp',
    litLabel: 'Lit · you’re on the map',
    lightNote: 'No posting, no talking — being here is enough',
    enterLabel: 'Enter the group',
    stripSub: 'Back to the live map · see who’s with you',
    greetLit: 'Your lamp is on — you’re on the map now',
    scale: 1,
    density: 1,
    mapZoom: 1.44,
    pageMode: false,
    noStrip: false,
    autoOpen: true,
    islands: null,
    snippets: null,
    toasts: null,
    avatarSources: [
      './assets/activeavatara.png',
      './assets/activeavatarb.png',
      './assets/activeavatarc.png',
      './assets/activeavatard.png'
    ],
    peakIconSrc: './assets/IconMountain.svg',
    avatarRatio: 0.18,
    avatarSize: 14,
    onEnter: null
  }, pageFallbackConfig, window.MMAP_CONFIG || {});

  function isSharedMapMode() {
    return CFG.pageMode || CFG.mode === 'group';
  }

  var CITIES = ['Austin', 'Seattle', 'Chicago', 'Denver', 'Atlanta', 'Portland', 'Nashville',
    'Boston', 'Phoenix', 'Dallas', 'Minneapolis', 'San Diego', 'Columbus', 'Miami',
    'Kansas City', 'Salt Lake City', 'Toronto', 'Vancouver', 'Charlotte', 'Raleigh'];

  /* 每小时基准人数：夜里最高 —— 夜奶时分，灯反而最多 */
  var HOUR_CURVE = [1180, 1260, 1330, 1360, 1240, 980, 760, 700, 760, 720, 680, 660,
    700, 720, 680, 650, 640, 690, 760, 850, 960, 1060, 1120, 1150];

  var DEFAULT_ISLANDS = [
    { label: 'pumping', tag: 'pumping', x: .52, y: .425, r: 88, w: 19, avatarBoost: 1, hours: [[0, 24]] },
    { label: 'tired', tag: 'tired', x: .30, y: .285, r: 66, w: 14, hours: [[0, 6], [20, 24]] },
    { label: "can't sleep", tag: "can't sleep", x: .705, y: .335, r: 58, w: 11, hours: [[0, 6]] },
    { label: 'need company', tag: 'need company', x: .315, y: .555, r: 52, w: 7, hours: [[0, 24]] },
    { label: 'baby sleeping', tag: 'baby sleeping', x: .765, y: .545, r: 50, w: 6, hours: [[12, 15], [20, 23]] },
    { label: 'hands full', tag: 'hands full', x: .475, y: .612, r: 46, w: 4, hours: [[7, 11], [16, 21]] },
    { label: 'music on', tag: 'music on', x: .30, y: .64, r: 40, w: 3, hours: [[0, 24]] },
    { label: 'cluster feeding', tag: 'cluster feeding', x: .71, y: .67, r: 38, w: 1, hours: [[18, 24], [0, 4]] }
  ];

  var DEFAULT_SNIPPETS = {
    'pumping': [
      { m: 'Austin · 18 min in', t: 'Netflix and pump. We ride.' },
      { m: 'Denver · just started', t: 'Aiming for 5 oz tonight' },
      { m: 'Atlanta · 41 min in', t: 'Last stretch — stay with me' }
    ],
    'tired': [
      { m: 'Portland · just now', t: 'Running on fumes, still showing up.' },
      { m: 'Phoenix · 8 min ago', t: 'Tiny break, big exhale.' },
      { m: 'Toronto · 12 min ago', t: 'Tired, but not alone.' }
    ],
    "can't sleep": [
      { m: 'Seattle · 3:12 AM', t: 'Whole house asleep but us.' },
      { m: 'Chicago · 2:47 AM', t: 'One more pump, then real sleep.' },
      { m: 'Nashville · 3:30 AM', t: 'Wide awake, quietly here.' }
    ],
    'need company': [
      { m: 'Boston · just now', t: 'Anybody else pumping right now?' },
      { m: 'Dallas · 5 min ago', t: 'Staying here until the bottle fills.' },
      { m: 'Minneapolis · 12 min ago', t: 'Company makes this easier.' }
    ],
    'baby sleeping': [
      { m: 'San Diego · just now', t: 'Nap time = pump time' },
      { m: 'Columbus · 8 min ago', t: 'Finally down. My 30 minutes.' },
      { m: 'Miami · just now', t: 'Pumping in the quiet. Bliss.' }
    ],
    'hands full': [
      { m: 'Kansas City · just now', t: 'One hand on baby, one hand on parts.' },
      { m: 'Salt Lake City · 6 min ago', t: 'Multitasking at expert level.' },
      { m: 'Vancouver · 11 min ago', t: 'Hands full, heart fuller.' }
    ],
    'music on': [
      { m: 'Charlotte · now playing', t: 'Playlist carrying this session.' },
      { m: 'Raleigh · 4 min ago', t: 'One song at a time.' },
      { m: 'Austin · 9 min ago', t: 'Pump rhythm, soft volume.' }
    ],
    'cluster feeding': [
      { m: 'Denver · just now', t: 'Back again. We know this loop.' },
      { m: 'Portland · 7 min ago', t: 'Feeding, pumping, repeating.' },
      { m: 'Seattle · 15 min ago', t: 'Cluster night, steady lights.' }
    ]
  };

  var DEFAULT_TOASTS = {
    start: function () { return 'a mom just lit her lamp'; },
    ongoing: function (n) { return 'a lamp has been on for ' + n + ' min'; },
    finish: function () { return 'one more pump done — well earned'; },
    ignite: 'Your lamp is lit · the map remembers'
  };

  var islands = CFG.islands || DEFAULT_ISLANDS;
  var SNIPPETS = CFG.snippets || DEFAULT_SNIPPETS;
  var TOASTS = Object.assign({}, DEFAULT_TOASTS, CFG.toasts || {});
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var avatarImages = (CFG.avatarSources || []).map(function (src) {
    var img = new Image();
    img.decoding = 'async';
    img.src = src;
    return img;
  });

  /* ── 小工具 ────────────────────────────────────────────── */
  var TAU = Math.PI * 2;
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var seed = 20260703;
  var srand = mulberry32(seed);
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function fmt(n) { return Math.max(0, Math.round(n)).toLocaleString('en-US'); }
  function fmtTime(h, m) {
    var hh = h % 12; if (hh === 0) hh = 12;
    return hh + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM');
  }

  /* 当前时间（支持 ?hh=3 调试凌晨氛围） */
  function nowParts() {
    var d = new Date();
    var q = new URLSearchParams(location.search);
    var hh = q.has('hh') ? parseInt(q.get('hh'), 10) : d.getHours();
    if (isNaN(hh) || hh < 0 || hh > 23) hh = d.getHours();
    return { h: hh, m: d.getMinutes() };
  }
  function daypart(h) {
    if (h < 5) return { greet: 'Half the map is awake with you' };
    if (h < 8) return { greet: 'First pumps of the morning' };
    if (h < 11) return { greet: 'Mid-morning lamps, everywhere' };
    if (h < 13) return { greet: 'Lunchtime pumps, quietly on' };
    if (h < 17) return { greet: 'Afternoon lamps, coast to coast' };
    if (h < 19) return { greet: 'Golden hour — lamps coming on' };
    if (h < 22) return { greet: 'Kids are down. Mom time.' };
    return { greet: 'Last pump of the day. Almost there.' };
  }
  function inHours(isl, h) {
    return (isl.hours || []).some(function (b) { return h >= b[0] && h < b[1]; });
  }
  /* 当前「最应景」的岛：优先选时段最专属的那座 */
  function hotIsland(h) {
    var best = null, bestSpan = 25;
    islands.forEach(function (isl) {
      if (!inHours(isl, h)) return;
      var span = (isl.hours || []).reduce(function (s, b) { return s + (b[1] - b[0]); }, 0);
      if (span < bestSpan) { bestSpan = span; best = isl; }
    });
    return best || islands[0];
  }

  /* ── 挂载 DOM ─────────────────────────────────────────── */
  var host = CFG.pageMode
    ? document.querySelector(CFG.mount || '.mm-page-host')
    : document.querySelector('.phone');
  if (!host) return;

  var overlay = document.createElement('div');
  overlay.className = 'mm-overlay' + (CFG.pageMode ? ' mm-overlay--page' : '') + (CFG.autoOpen === false && !CFG.pageMode ? ' is-away' : '');
  overlay.innerHTML =
    '<canvas class="mm-canvas"></canvas>' +
    '<header class="mm-head">' +
    '  <div class="mm-clock"></div>' +
    '  <div class="mm-counter"><b>0</b><span>' + CFG.counterLabel + '</span></div>' +
    '  <div class="mm-greet"></div>' +
    '</header>' +
    '<div class="mm-labels"></div>' +
    '<div class="mm-user-chip">This spot is yours</div>' +
    '<div class="mm-toast"></div>' +
    '<footer class="mm-foot">' +
    '  <button class="mm-light" type="button">🕯 ' + CFG.lightLabel + '</button>' +
    '  <p class="mm-light-note">' + CFG.lightNote + '</p>' +
    '  <button class="mm-enter" type="button">' + CFG.enterLabel + '</button>' +
    '</footer>' +
    '<section class="mm-sheet" aria-hidden="true">' +
    '  <div class="mm-sheet-grip"></div>' +
    '  <div class="mm-sheet-head"><span class="mm-sheet-title"></span><span class="mm-sheet-sub"></span></div>' +
    '  <div class="mm-sheet-lines"></div>' +
    '  <div class="mm-sheet-actions">' +
    '    <button class="mm-sheet-go" type="button"></button>' +
    '    <button class="mm-sheet-close" type="button">Close</button>' +
    '  </div>' +
    '</section>';
  host.appendChild(overlay);

  var canvas = overlay.querySelector('.mm-canvas');
  var ctx = canvas.getContext('2d');
  var elCount = overlay.querySelector('.mm-counter b');
  var elClock = overlay.querySelector('.mm-clock');
  var elGreet = overlay.querySelector('.mm-greet');
  var elLabels = overlay.querySelector('.mm-labels');
  var elChip = overlay.querySelector('.mm-user-chip');
  var elToast = overlay.querySelector('.mm-toast');
  var elLight = overlay.querySelector('.mm-light');
  var elEnter = overlay.querySelector('.mm-enter');
  var sheet = overlay.querySelector('.mm-sheet');

  /* ── 状态 ─────────────────────────────────────────────── */
  var W = 0, H = 0, DPR = 1;
  var running = false, rafId = 0, t0 = performance.now();
  var tp = nowParts();
  var hot = hotIsland(tp.h);
  var baseCount = HOUR_CURVE[tp.h] * CFG.scale + Math.floor(srand() * 40 - 20);
  var drift = 0, userAdd = 0;
  var lit = false;
  var ripples = [];
  var lens = { isl: null, t: 0, target: 0 };
  var storeKey = 'mmapLit-' + CFG.mode;
  try { lit = sessionStorage.getItem(storeKey) === '1'; } catch (e) { }
  if (lit) userAdd = 1;

  /* ── 岛屿几何与光点 ───────────────────────────────────── */
  var layoutRetry = 0;
  function layout() {
    var rect = host.getBoundingClientRect();
    /* 后台标签页里可能量出 0 尺寸：等页面真正可见再排 */
    if (rect.width < 50 || rect.height < 50) {
      clearTimeout(layoutRetry);
      layoutRetry = setTimeout(layout, 200);
      return;
    }
    srand = mulberry32(seed);
    W = rect.width; H = rect.height;
    lastW = W; lastH = H;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    var sharedMapMode = isSharedMapMode();
    var mapZoom = sharedMapMode ? (CFG.mapZoom || 1.44) : 1;
    var mapCx = W * 0.5;
    var mapCy = H * (W < 640 ? 0.35 : 0.5);
    var rScale = sharedMapMode ? Math.max(W < 640 ? 1.07 : 1, Math.min(W, 1100) / 500) : 1;
    islands.forEach(function (isl) {
      isl.px = mapCx + (isl.x * W - mapCx) * mapZoom;
      isl.py = mapCy + (isl.y * H - mapCy) * mapZoom;
      isl.pr = isl.r * rScale;
      isl.phase = [srand() * TAU, srand() * TAU, srand() * TAU];
    });
    compactMobileLowerPeaks();
    staggerPeakRows();

    var mobileMap = sharedMapMode && W < 640;
    var minPeakWeight = islands.reduce(function (min, isl) {
      return Math.min(min, peakWeight(isl));
    }, Infinity);
    var maxPeakWeight = islands.reduce(function (max, isl) {
      return Math.max(max, peakWeight(isl));
    }, 1);

    islands.forEach(function (isl) {
      var isHot = isl === hot || inHours(isl, tp.h);
      var desktopMap = sharedMapMode && W >= 640;
      var particleScale = sharedMapMode ? (desktopMap ? 2.55 : 1.95) : 1.35;
      var dotSpread = sharedMapMode ? 1.5 : 1;
      var peakRank = (peakWeight(isl) - minPeakWeight) / (maxPeakWeight - minPeakWeight || 1);
      var avatarTarget = sharedMapMode && avatarImages.length
        ? (mobileMap
          ? clamp(Math.round(1 + Math.pow(peakRank, 1.25) * 5), 1, 6)
          : clamp(Math.round(1 + Math.pow(peakRank, 1.35) * 9), 1, 10))
        : 0;
      var n = Math.round(isl.w * (isHot ? 1.7 : 1) * CFG.density * particleScale);
      if (avatarTarget) n = Math.max(n, avatarTarget * 5);
      var bandCount = Math.max(4, Math.min(7, Math.round(Math.sqrt(Math.max(6, n)))));
      isl.dots = [];
      var avatarSpots = [];
      for (var i = 0; i < n; i++) {
        var avatarSafeTop = sharedMapMode ? H * 0.18 : 160;
        var avatarSafeBottom = sharedMapMode ? H * 0.88 : H - 190;
        var avatarRatioScale = sharedMapMode ? (desktopMap ? 1.05 : 0.72) : 1;
        var islandAvatarRatio = Math.min(0.5, CFG.avatarRatio * (isl.avatarBoost || 1) * avatarRatioScale);
        var showAvatar = avatarImages.length && (avatarTarget ? avatarSpots.length < avatarTarget : srand() < islandAvatarRatio);
        var avatarSize = (sharedMapMode ? CFG.avatarSize * 1.25 : CFG.avatarSize) * (0.86 + srand() * 0.28);
        var a = 0, d = 0, x = 0, y = 0, band = 0;
        var placed = false;
        var maxAttempts = showAvatar ? (sharedMapMode ? (mobileMap ? 42 : 34) : 22) : 1;
        for (var attempt = 0; attempt < maxAttempts; attempt++) {
          var contourPoint = participantContourPoint(isl, i, bandCount, attempt, showAvatar ? 1 : dotSpread);
          a = contourPoint.a;
          d = contourPoint.d;
          x = contourPoint.x;
          y = contourPoint.y;
          band = contourPoint.band;
          if (!showAvatar) { placed = true; break; }
          var safelyInside = d > participantRadius(isl) * 0.28 && y > avatarSafeTop && y < avatarSafeBottom;
          var clearOfAvatars = clearOfAvatarSpots(avatarSpots, x, y, avatarSize, 14);
          var clearOfLabel = clearOfPeakLabel(isl, x, y, avatarSize);
          if (safelyInside && clearOfAvatars && clearOfLabel) { placed = true; break; }
        }
        if (showAvatar && !placed) showAvatar = false;
        if (!placed) {
          var fallbackPoint = participantContourPoint(isl, i, bandCount, 23, showAvatar ? 1 : dotSpread);
          a = fallbackPoint.a;
          d = fallbackPoint.d;
          x = fallbackPoint.x;
          y = fallbackPoint.y;
          band = fallbackPoint.band;
        }
        if (showAvatar) avatarSpots.push({ x: x, y: y, r: avatarSize / 2 });
        var innerBias = 1 + (1 - band / Math.max(1, bandCount - 1)) * 0.72;
        isl.dots.push({
          x: x,
          y: y,
          band: band,
          terrainWeight: (showAvatar ? 2.2 : 0.92) * innerBias,
          s: 0.9 + srand() * 1.5,
          ph: srand() * TAU,
          sp: 0.4 + srand() * 0.9,
          al: 0.3 + srand() * 0.55,
          born: 260 + (i * 14) + srand() * 500,
          avatar: showAvatar ? Math.floor(srand() * avatarImages.length) : -1,
          avatarSize: avatarSize
        });
      }
      if (avatarTarget) fillAvatarQuota(isl, avatarSpots, avatarTarget, bandCount);
    });
    /* 岛与岛之间的零星光点，铺出「地图」的底 */
    ambient = [];
    var m = Math.round((sharedMapMode ? (W >= 640 ? 86 : 60) : 34) * CFG.density);
    for (var j = 0; j < m; j++) {
      ambient.push({
        x: srand() * W, y: (0.14 + srand() * 0.72) * H,
        s: 0.6 + srand() * 0.9, ph: srand() * TAU,
        sp: 0.3 + srand() * 0.6, al: 0.10 + srand() * 0.22,
        born: srand() * 1400
      });
    }
    /* 你的位置：落在当前时段的岛屿边缘 */
    var ua = -0.55;
    user = {
      x: hot.px + Math.cos(ua) * hot.pr * 0.74,
      y: hot.py + Math.sin(ua) * hot.pr * 0.74
    };
    elChip.style.left = user.x + 'px';
    elChip.style.top = (user.y + 12) + 'px';
    buildDensityField();
    buildLabels();
  }
  var ambient = [], user = { x: 0, y: 0 }, densityField = null;

  function participantContourPoint(isl, index, bandCount, attempt, spread) {
    var golden = Math.PI * (3 - Math.sqrt(5));
    var core = participantRadius(isl) * (spread || 1);
    var bandSeed = hash2(index * 17 + attempt * 11, isl.w * 13 + bandCount);
    var band = Math.min(bandCount - 1, Math.floor(Math.pow(bandSeed, 1.08) * bandCount));
    var bandT = (band + 0.5) / bandCount;
    var angle = index * golden + band * 0.48 + attempt * 0.73 + isl.phase[0];
    var base = core * (0.16 + bandT * 0.98);
    var jitter = (hash2(index + attempt * 17, band + 3) - 0.5) * core * 0.14;
    var lobe =
      Math.sin(angle * 3 + isl.phase[0]) * 0.10 +
      Math.sin(angle * 5 - isl.phase[1]) * 0.075 +
      (fbm(Math.cos(angle) * 2.4 + isl.x * 7, Math.sin(angle) * 2.4 + isl.y * 7) - 0.5) * 0.15;
    var d = Math.max(core * 0.16, base * (1 + lobe) + jitter);
    return {
      a: angle,
      d: d,
      band: band,
      x: isl.px + Math.cos(angle) * d,
      y: isl.py + Math.sin(angle) * d * 0.92
    };
  }

  function peakParticleRadius(isl) {
    var base = isl.pr * (W < 640 ? 0.72 : 0.68);
    var max = W < 640 ? 88 : 150;
    return clamp(base, 30, max);
  }

  function participantRadius(isl) {
    var compact = isl.label === 'pumping'
      ? (W < 640 ? 0.68 : 0.58)
      : (W < 640 ? 0.74 : 0.66);
    var spread = isSharedMapMode() && W >= 640 ? 1.18 : 1;
    return peakParticleRadius(isl) * compact * spread;
  }

  function clearOfPeakLabel(isl, x, y, avatarSize) {
    return labelAvoidanceCost(isl, x, y, avatarSize) === 0;
  }

  function labelAvoidanceCost(isl, x, y, avatarSize) {
    var labelW = Math.max(78, Math.min(140, isl.label.length * (W < 640 ? 8.4 : 9.4) + 42));
    var labelH = W < 640 ? 46 : 52;
    var labelCenterY = isl.py + 10;
    var safeX = labelW / 2 + avatarSize * 0.62 + 8;
    var safeY = labelH / 2 + avatarSize * 0.62 + 8;
    var overlapX = safeX - Math.abs(x - isl.px);
    var overlapY = safeY - Math.abs(y - labelCenterY);
    return overlapX > 0 && overlapY > 0 ? overlapX + overlapY : 0;
  }

  function clearOfAvatarSpots(avatarSpots, x, y, avatarSize, padding) {
    var r = avatarSize / 2;
    var pad = padding == null ? 14 : padding;
    return avatarSpots.every(function (p) {
      var dx = x - p.x, dy = y - p.y;
      return Math.sqrt(dx * dx + dy * dy) >= r + p.r + pad;
    });
  }

  function fillAvatarQuota(isl, avatarSpots, target, bandCount) {
    if (!avatarImages.length || avatarSpots.length >= target) return;
    var sharedMapMode = isSharedMapMode();
    var avatarSafeTop = sharedMapMode ? H * 0.18 : 160;
    var avatarSafeBottom = sharedMapMode ? H * 0.88 : H - 190;
    var golden = Math.PI * (3 - Math.sqrt(5));
    var core = participantRadius(isl);
    var rings = [0.36, 0.48, 0.60, 0.72, 0.84, 0.96, 1.08];

    while (avatarSpots.length < target) {
      var avatarSize = (sharedMapMode ? CFG.avatarSize * 1.25 : CFG.avatarSize) * (0.86 + srand() * 0.28);
      var best = null;

      for (var attempt = 0; attempt < 90; attempt++) {
        var ring = rings[attempt % rings.length];
        var angle = (avatarSpots.length + 1) * 1.83 + attempt * golden + isl.phase[0];
        var wobble = 1 +
          Math.sin(angle * 3 + isl.phase[1]) * 0.08 +
          Math.sin(angle * 5 - isl.phase[2]) * 0.05;
        var d = core * ring * wobble;
        var x = isl.px + Math.cos(angle) * d;
        var y = isl.py + Math.sin(angle) * d * 0.92;
        if (y <= avatarSafeTop || y >= avatarSafeBottom) continue;

        if (!clearOfAvatarSpots(avatarSpots, x, y, avatarSize, 14)) continue;
        var labelCost = labelAvoidanceCost(isl, x, y, avatarSize);
        var score = labelCost * 12 + Math.abs(ring - 0.72) * 18 + attempt * 0.02;
        if (!best || score < best.score) {
          best = { x: x, y: y, band: Math.min(bandCount - 1, Math.max(0, Math.round(ring * bandCount) - 1)), score: score };
        }
        if (score === 0) break;
      }

      if (!best) break;
      var innerBias = 1 + (1 - best.band / Math.max(1, bandCount - 1)) * 0.72;
      avatarSpots.push({ x: best.x, y: best.y, r: avatarSize / 2 });
      isl.dots.push({
        x: best.x,
        y: best.y,
        band: best.band,
        terrainWeight: 2.2 * innerBias,
        s: 0.9 + srand() * 1.5,
        ph: srand() * TAU,
        sp: 0.4 + srand() * 0.9,
        al: 0.3 + srand() * 0.55,
        born: 260 + ((isl.dots || []).length * 14) + srand() * 500,
        avatar: Math.floor(srand() * avatarImages.length),
        avatarSize: avatarSize
      });
    }
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function staggerPeakRows() {
    var sharedMapMode = isSharedMapMode();
    var top = sharedMapMode ? H * 0.20 : 130;
    var bottom = sharedMapMode ? H * 0.76 : H - 190;
    var minRowGap = Math.max(34, H * (W < 640 ? 0.055 : 0.045));
    var ordered = islands.slice().sort(function (a, b) { return a.py - b.py; });

    ordered.forEach(function (isl, i) {
      var rowOffset = Math.sin((i + 1) * 2.17) * minRowGap * 0.34;
      var colOffset = Math.sin((i + 1) * 1.41) * Math.min(22, W * 0.018);
      isl.py = clamp(isl.py + rowOffset, top, bottom);
      isl.px = clamp(isl.px + colOffset, W * 0.12, W * 0.88);
    });

    for (var pass = 0; pass < 3; pass++) {
      ordered.sort(function (a, b) { return a.py - b.py; });
      for (var i = 1; i < ordered.length; i++) {
        var prev = ordered[i - 1];
        var cur = ordered[i];
        if (Math.abs(cur.py - prev.py) >= minRowGap) continue;
        var dir = cur.px >= prev.px ? 1 : -1;
        var push = (minRowGap - Math.abs(cur.py - prev.py)) * 0.58;
        cur.py = clamp(cur.py + push * dir, top, bottom);
      }
    }
  }

  function compactMobileLowerPeaks() {
    if (!isSharedMapMode() || W >= 640) return;
    var main = islands.filter(function (isl) { return isl.tag === 'pumping'; })[0] || islands[0];
    var lowerTags = {
      'need company': 1,
      'baby sleeping': 1,
      'hands full': 1,
      'music on': 1,
      'cluster feeding': 1
    };
    islands.forEach(function (isl) {
      if (!lowerTags[isl.tag]) return;
      var pull = isl.tag === 'hands full' ? 0.34 : 0.26;
      var maxLift = H * (isl.tag === 'cluster feeding' ? 0.16 : 0.13);
      var lift = Math.min(Math.max(0, isl.py - main.py) * pull, maxLift);
      isl.py -= lift;
    });
  }

  var builtOnce = false;
  function buildLabels() {
    elLabels.innerHTML = '';
    islands.forEach(function (isl, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mm-isl' + ((isl === hot) ? ' is-hot' : '');
      b.style.left = isl.px + 'px';
      b.style.top = isl.py + 'px';
      if (builtOnce) {
        b.style.animation = 'none';
        b.style.opacity = '1';
      } else {
        b.style.animationDelay = (420 + i * 130) + 'ms';
      }
      b.innerHTML =
        '<img class="mm-isl-icon" src="' + CFG.peakIconSrc + '" alt="" aria-hidden="true">' +
        '<span class="mm-isl-name">' + isl.label + '</span>' +
        '<span class="mm-isl-count"></span>';
      b.addEventListener('click', function () { openIsland(isl); });
      isl.el = b;
      elLabels.appendChild(b);
    });
    builtOnce = true;
    renderIslandCounts();
  }

  function totalW() { return islands.reduce(function (s, i) { return s + i.w; }, 0); }
  function displayCount() { return baseCount + drift + userAdd; }
  function renderIslandCounts() {
    var total = displayCount(), tw = totalW();
    islands.forEach(function (isl) {
      var share = Math.round(total * (isl.w / tw) * (isl === hot ? 1.25 : 1));
      var c = isl.el && isl.el.querySelector('.mm-isl-count');
      if (c) c.textContent = share + ' lamps';
      isl.share = share;
    });
  }

  /* ── 画布渲染 ─────────────────────────────────────────── */
  function wobbleR(base, th, ph, t) {
    var amp = REDUCED ? 0.35 : 1;
    return base * (1 +
      0.085 * amp * Math.sin(3 * th + ph[0] + t * 0.00006) +
      0.055 * amp * Math.sin(5 * th - ph[1] - t * 0.00004) +
      0.038 * amp * Math.sin(8 * th + ph[2]));
  }

  function traceIsland(isl, base, t, offsetY) {
    ctx.beginPath();
    for (var s = 0; s <= 60; s++) {
      var th = s / 60 * TAU;
      var rr = wobbleR(base, th, isl.phase, t);
      var x = isl.px + Math.cos(th) * rr;
      var y = isl.py + Math.sin(th) * rr * 0.92 + (offsetY || 0);
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function densityStep() {
    var side = Math.min(W, H);
    if (!isSharedMapMode()) return Math.max(12, Math.min(20, Math.round(side / 42)));
    return W >= 760
      ? Math.max(14, Math.min(22, Math.round(side / 56)))
      : Math.max(16, Math.min(26, Math.round(side / 32)));
  }

  function gaussian(x, y, cx, cy, sigmaX, sigmaY, weight) {
    var dx = (x - cx) / Math.max(1, sigmaX);
    var dy = (y - cy) / Math.max(1, sigmaY);
    return weight * Math.exp(-(dx * dx + dy * dy) * 0.5);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth01(t) { return t * t * (3 - 2 * t); }
  function hash2(x, y) {
    var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return s - Math.floor(s);
  }
  function valueNoise(x, y) {
    var ix = Math.floor(x), iy = Math.floor(y);
    var fx = smooth01(x - ix), fy = smooth01(y - iy);
    var a = hash2(ix, iy);
    var b = hash2(ix + 1, iy);
    var c = hash2(ix, iy + 1);
    var d = hash2(ix + 1, iy + 1);
    return lerp(lerp(a, b, fx), lerp(c, d, fx), fy);
  }
  function fbm(x, y) {
    var sum = 0, amp = 0.5, norm = 0;
    for (var i = 0; i < 4; i++) {
      sum += valueNoise(x, y) * amp;
      norm += amp;
      x *= 2.03;
      y *= 2.03;
      amp *= 0.52;
    }
    return sum / norm;
  }

  function terrainPoint(x, y) {
    var s = W < 640 ? 0.014 : 0.009;
    var warp = W < 640 ? 28 : 52;
    var nx = fbm(x * s, y * s);
    var ny = fbm(x * s + 19.7, y * s - 8.3);
    return {
      x: x + (nx - 0.5) * warp,
      y: y + (ny - 0.5) * warp * 0.82
    };
  }

  function terrainGrain(x, y) {
    var broad = fbm(x * 0.006, y * 0.006) - 0.5;
    var mid = fbm(x * 0.014 - 11.1, y * 0.014 + 4.6) - 0.5;
    var fine = fbm(x * 0.032 + 7.4, y * 0.032 - 3.2) - 0.5;
    return broad * 5.6 + mid * 4.2 + fine * 2.4;
  }

  function ridgeGaussian(x, y, a, b, weight) {
    var dx = b.px - a.px;
    var dy = b.py - a.py;
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var mx = (a.px + b.px) * 0.5;
    var my = (a.py + b.py) * 0.5;
    var ux = dx / dist;
    var uy = dy / dist;
    var rx = x - mx;
    var ry = y - my;
    var along = rx * ux + ry * uy;
    var perp = -rx * uy + ry * ux;
    var sigmaLong = dist * 0.68;
    var sigmaShort = Math.max(24, Math.min(peakParticleRadius(a), peakParticleRadius(b)) * 0.68);
    return weight * Math.exp(-((along / sigmaLong) * (along / sigmaLong) + (perp / sigmaShort) * (perp / sigmaShort)) * 0.5);
  }

  function peakWeight(isl) {
    var hotLift = (isl === hot || inHours(isl, tp.h)) ? 1.18 : 1;
    return (7.2 + Math.sqrt(Math.max(1, isl.w)) * 2.15) * hotLift;
  }

  function buildDensityField() {
    var step = densityStep();
    var cols = Math.ceil(W / step) + 1;
    var rows = Math.ceil(H / step) + 1;
    var values = new Float32Array(cols * rows);
    var max = 0;

    for (var gy = 0; gy < rows; gy++) {
      for (var gx = 0; gx < cols; gx++) {
        var x = gx * step;
        var y = gy * step;
        var p = terrainPoint(x, y);
        var tx = p.x;
        var ty = p.y;
        var h = 0;

        islands.forEach(function (isl) {
          var w = peakWeight(isl);
          var core = peakParticleRadius(isl);
          var sx = core * 0.72;
          var sy = core * 0.62;
          h += gaussian(tx, ty, isl.px, isl.py, sx, sy, w * 25.5);
          h += gaussian(tx, ty, isl.px, isl.py, sx * 1.85, sy * 1.76, w * 8.4);
          h += gaussian(tx, ty, isl.px, isl.py, sx * 3.7, sy * 3.25, w * 0.72);

          var dx = tx - isl.px;
          var dy = (ty - isl.py) / 0.92;
          var distLocal = Math.sqrt(dx * dx + dy * dy);
          var ring = Math.exp(-Math.pow(distLocal / Math.max(1, sx * 2.15), 2.2));
          var angle = Math.atan2(dy, dx);
          var lobes = Math.sin(angle * 3 + isl.phase[0]) * 0.72 +
            Math.sin(angle * 5 - isl.phase[1]) * 0.46 +
            Math.sin(angle * 8 + isl.phase[2]) * 0.22;
          h += ring * lobes * w * 2.8;
        });

        islands.forEach(function (isl, ki) {
          var knotCount = W < 640 ? 3 : 5;
          var core = peakParticleRadius(isl);
          for (var kn = 0; kn < knotCount; kn++) {
            var a = hash2(ki * 31 + kn * 7, 4) * TAU;
            var d = (0.48 + hash2(ki * 19, kn * 23) * 1.15) * core;
            var kx = isl.px + Math.cos(a) * d;
            var ky = isl.py + Math.sin(a) * d * 0.9;
            var kw = (hash2(ki * 13 + kn, 9) - 0.36) * peakWeight(isl) * 1.65;
            h += gaussian(tx, ty, kx, ky, core * 0.26, core * 0.21, kw);
          }
        });

        islands.forEach(function (isl) {
          var core = peakParticleRadius(isl);
          (isl.dots || []).forEach(function (d) {
            var sigma = core * (d.avatar >= 0 ? 0.26 : 0.18);
            var dotWeight = peakWeight(isl) * (d.avatar >= 0 ? 0.48 : 0.22) * (0.72 + d.al);
            h += gaussian(tx, ty, d.x, d.y, sigma, sigma * 0.78, dotWeight * (d.terrainWeight || 1));
          });
        });

        for (var ai = 0; ai < islands.length; ai++) {
          for (var bi = ai + 1; bi < islands.length; bi++) {
            var A = islands[ai];
            var B = islands[bi];
            var ddx = A.px - B.px;
            var ddy = A.py - B.py;
            var dist = Math.sqrt(ddx * ddx + ddy * ddy);
            var reach = (peakParticleRadius(A) + peakParticleRadius(B)) * (W < 640 ? 3.15 : 3.85);
            if (dist > reach) continue;
            var closeness = 1 - dist / reach;
            h += ridgeGaussian(tx, ty, A, B, Math.sqrt(peakWeight(A) * peakWeight(B)) * closeness * 1.85);
          }
        }

        h += terrainGrain(tx, ty);
        h = Math.max(0, h);
        h = Math.pow(h, 0.82);
        values[gy * cols + gx] = h;
        if (h > max) max = h;
      }
    }

    densityField = {
      step: step,
      cols: cols,
      rows: rows,
      values: values,
      max: max || 1,
      heat: buildHeatCanvas(values, cols, rows, max || 1)
    };
  }

  function buildHeatCanvas(values, cols, rows, max) {
    var c = document.createElement('canvas');
    c.width = cols;
    c.height = rows;
    var hctx = c.getContext('2d');
    var img = hctx.createImageData(cols, rows);
    var mobile = W < 640;
    for (var i = 0; i < values.length; i++) {
      var n = Math.max(0, Math.min(1, values[i] / max));
      var shaped = Math.pow(n, 0.82);
      var alpha = shaped < 0.045 ? 0 : Math.min(mobile ? 62 : 76, 10 + shaped * (mobile ? 92 : 112));
      var warm = Math.pow(n, 1.55);
      img.data[i * 4] = Math.round(104 + warm * 134);
      img.data[i * 4 + 1] = Math.round(16 + warm * 140);
      img.data[i * 4 + 2] = Math.round(42 + warm * 125);
      img.data[i * 4 + 3] = alpha;
    }
    hctx.putImageData(img, 0, 0);
    return c;
  }

  function densityValueAt(gx, gy, t) {
    if (!densityField) return 0;
    var idx = gy * densityField.cols + gx;
    return densityField.values[idx];
  }

  function contourPoint(a, b, av, bv, level) {
    var f = (level - av) / ((bv - av) || 1);
    f = Math.max(0, Math.min(1, f));
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  }

  function contourKey(p) {
    return Math.round(p.x * 4) + '|' + Math.round(p.y * 4);
  }

  function contourPathLength(path) {
    var len = 0;
    for (var i = 1; i < path.length; i++) {
      var dx = path[i].x - path[i - 1].x;
      var dy = path[i].y - path[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return len;
  }

  function connectContourSegments(segments) {
    var buckets = {};
    segments.forEach(function (seg, i) {
      seg.used = false;
      [contourKey(seg.a), contourKey(seg.b)].forEach(function (key) {
        if (!buckets[key]) buckets[key] = [];
        buckets[key].push(i);
      });
    });

    function nextSegment(key) {
      var list = buckets[key] || [];
      for (var i = 0; i < list.length; i++) {
        var seg = segments[list[i]];
        if (!seg.used) return seg;
      }
      return null;
    }

    function extend(path, forward) {
      for (var guard = 0; guard < 400; guard++) {
        var end = forward ? path[path.length - 1] : path[0];
        var endKey = contourKey(end);
        var seg = nextSegment(endKey);
        if (!seg) break;
        seg.used = true;
        var aKey = contourKey(seg.a);
        var next = aKey === endKey ? seg.b : seg.a;
        if (forward) path.push(next);
        else path.unshift(next);
        if (path.length > 3 && contourKey(path[0]) === contourKey(path[path.length - 1])) break;
      }
    }

    var paths = [];
    segments.forEach(function (seg) {
      if (seg.used) return;
      seg.used = true;
      var path = [seg.a, seg.b];
      extend(path, true);
      extend(path, false);
      if (path.length > 2 && contourPathLength(path) > 36) paths.push(path);
    });
    return paths;
  }

  function drawSmoothContourPath(path) {
    if (path.length < 2) return;
    ctx.moveTo(path[0].x, path[0].y);
    if (path.length === 2) {
      ctx.lineTo(path[1].x, path[1].y);
      return;
    }
    for (var i = 1; i < path.length - 1; i++) {
      var mid = {
        x: (path[i].x + path[i + 1].x) / 2,
        y: (path[i].y + path[i + 1].y) / 2
      };
      ctx.quadraticCurveTo(path[i].x, path[i].y, mid.x, mid.y);
    }
    ctx.lineTo(path[path.length - 1].x, path[path.length - 1].y);
  }

  function drawDensityHeat(t) {
    if (!densityField || !densityField.heat) return;
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha *= 0.62 + (REDUCED ? 0 : 0.04 * Math.sin(t * 0.0008));
    ctx.drawImage(densityField.heat, 0, 0, W, H);
    ctx.restore();
  }

  function drawSharedContours(t) {
    if (!densityField) return;
    var levels = [0.22, 0.265, 0.315, 0.375, 0.445, 0.525, 0.615, 0.72, 0.84].map(function (n) { return n * densityField.max; });
    var step = densityField.step;
    var cols = densityField.cols - 1;
    var rows = densityField.rows - 1;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    levels.forEach(function (level, li) {
      var segments = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var p0 = { x: x * step, y: y * step };
          var p1 = { x: (x + 1) * step, y: y * step };
          var p2 = { x: (x + 1) * step, y: (y + 1) * step };
          var p3 = { x: x * step, y: (y + 1) * step };
          var v0 = densityValueAt(x, y, t), v1 = densityValueAt(x + 1, y, t), v2 = densityValueAt(x + 1, y + 1, t), v3 = densityValueAt(x, y + 1, t);
          var pts = [];
          if ((v0 >= level) !== (v1 >= level)) pts.push(contourPoint(p0, p1, v0, v1, level));
          if ((v1 >= level) !== (v2 >= level)) pts.push(contourPoint(p1, p2, v1, v2, level));
          if ((v2 >= level) !== (v3 >= level)) pts.push(contourPoint(p2, p3, v2, v3, level));
          if ((v3 >= level) !== (v0 >= level)) pts.push(contourPoint(p3, p0, v3, v0, level));
          if (pts.length === 2) {
            segments.push({ a: pts[0], b: pts[1] });
          } else if (pts.length === 4) {
            segments.push({ a: pts[0], b: pts[1] });
            segments.push({ a: pts[2], b: pts[3] });
          }
        }
      }
      ctx.beginPath();
      connectContourSegments(segments).forEach(drawSmoothContourPath);
      ctx.strokeStyle = 'rgba(255,221,225,' + (0.040 + li * 0.0068).toFixed(3) + ')';
      ctx.lineWidth = li > 6 ? 1.12 : 0.82;
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawPeakGlow(isl, t, boost) {
    var lift = boost || 1;
    if (isl === hot) {
      var hotGlow = ctx.createRadialGradient(isl.px, isl.py, 8, isl.px, isl.py, isl.pr * 1.55);
      hotGlow.addColorStop(0, 'rgba(255,247,189,0.105)');
      hotGlow.addColorStop(1, 'rgba(255,247,189,0)');
      ctx.beginPath();
      ctx.arc(isl.px, isl.py, isl.pr * 1.55, 0, TAU);
      ctx.fillStyle = hotGlow;
      ctx.fill();
    }

    var g = ctx.createRadialGradient(isl.px, isl.py, 6, isl.px, isl.py, isl.pr * 1.18);
    g.addColorStop(0, 'rgba(103,14,40,' + (0.20 * lift).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(61,4,20,0)');
    ctx.beginPath();
    ctx.arc(isl.px, isl.py, isl.pr * 1.18, 0, TAU);
    ctx.fillStyle = g;
    ctx.fill();
  }

  function drawDot(d, t, boost) {
    var a = d.al * (0.62 + 0.38 * Math.sin(t * 0.001 * d.sp + d.ph));
    var inT = Math.min(1, Math.max(0, (t - d.born) / 700));
    a *= inT * (boost || 1);
    if (a <= 0.01) return;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.s * (boost ? 1.15 : 1), 0, TAU);
    ctx.fillStyle = 'rgba(255,221,225,' + Math.min(1, a).toFixed(3) + ')';
    ctx.fill();
  }

  function drawAvatar(d, t, boost) {
    var img = avatarImages[d.avatar];
    if (!img || !img.complete || !img.naturalWidth) {
      drawDot(d, t, boost);
      return;
    }
    var a = d.al * (0.74 + 0.26 * Math.sin(t * 0.001 * d.sp + d.ph));
    var inT = Math.min(1, Math.max(0, (t - d.born) / 700));
    a = Math.min(1, a * inT * (boost || 1));
    if (a <= 0.01) return;

    var size = d.avatarSize * (boost ? 1.18 : 1);
    var r = size / 2;
    ctx.save();
    ctx.globalAlpha *= a;

    var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r + 9);
    g.addColorStop(0, 'rgba(255,247,189,0.30)');
    g.addColorStop(1, 'rgba(238,156,167,0)');
    ctx.beginPath();
    ctx.arc(d.x, d.y, r + 9, 0, TAU);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(d.x, d.y, r + 1.2, 0, TAU);
    ctx.fillStyle = 'rgba(255,241,243,0.96)';
    ctx.fill();
    ctx.clip();
    ctx.drawImage(img, d.x - r, d.y - r, size, size);
    ctx.restore();

  }

  function drawParticipant(d, t, boost) {
    if (d.avatar >= 0) drawAvatar(d, t, boost);
    else drawDot(d, t, boost);
  }

  function drawUser(t) {
    var x = user.x, y = user.y;

    /* 官方配对语言：点状同心光环（Design System 配对图的 halo motif） */
    var haloA = lit ? 0.20 : 0.09;
    for (var hi = 0; hi < 2; hi++) {
      var hr = 24 + hi * 14;
      var hn = 22 + hi * 8;
      var rot = t * 0.00008 * (hi ? -1 : 1);
      for (var hk = 0; hk < hn; hk++) {
        var hth = hk / hn * TAU + rot;
        ctx.beginPath();
        ctx.arc(x + Math.cos(hth) * hr, y + Math.sin(hth) * hr * 0.94, 0.9, 0, TAU);
        ctx.fillStyle = 'rgba(255,221,225,' + (haloA * (1 - hi * 0.35)).toFixed(3) + ')';
        ctx.fill();
      }
    }

    if (!lit) {
      /* 虚位以待：一个慢慢转的虚线圈（Rose/300） */
      ctx.beginPath();
      ctx.setLineDash([3, 3.6]);
      ctx.lineDashOffset = -(t * 0.004);
      ctx.arc(x, y, 6.5, 0, TAU);
      ctx.strokeStyle = 'rgba(255,192,203,0.65)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, TAU);
      ctx.fillStyle = 'rgba(255,221,225,0.4)';
      ctx.fill();
      return;
    }
    /* 已点亮：烛光芯与地图底色都从主题 token 读取。 */
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.0016);
    var ringR = 7 + ((t * 0.012) % 22);
    var ringA = Math.max(0, 0.34 * (1 - ringR / 29));
    ctx.beginPath();
    ctx.arc(x, y, ringR, 0, TAU);
    ctx.strokeStyle = 'rgba(238,156,167,' + ringA.toFixed(3) + ')';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    var g = ctx.createRadialGradient(x, y, 0, x, y, 16);
    g.addColorStop(0, 'rgba(255,247,189,' + (0.5 + pulse * 0.25).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(238,156,167,0)');
    ctx.beginPath(); ctx.arc(x, y, 16, 0, TAU); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 2.8, 0, TAU);
    ctx.fillStyle = mapColors.lamp; ctx.fill();
  }

  function drawRipples(now) {
    ripples = ripples.filter(function (r) { return now - r.born < 1500; });
    ripples.forEach(function (r) {
      var p = (now - r.born) / 1500;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 4 + p * 26, 0, TAU);
      ctx.strokeStyle = 'rgba(255,217,222,' + (0.5 * (1 - p)).toFixed(3) + ')';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });
  }

  function draw(now) {
    if (!W || !H) return; /* layout 还没量到真实尺寸：跳过这一帧，循环继续 */
    var t = now - t0;
    ctx.clearRect(0, 0, W, H);

    /* 夜空底色与地形底面共享同一个主题 token。 */
    ctx.fillStyle = mapColors.sky;
    ctx.fillRect(0, 0, W, H);

    var globalIn = Math.min(1, t / 900);
    ctx.globalAlpha = globalIn;
    lens.t += (lens.target - lens.t) * 0.12;

    drawDensityHeat(t);
    drawSharedContours(t);
    ambient.forEach(function (d) { drawDot(d, t); });
    islands.forEach(function (isl) {
      if (!isl.dots) return;
      drawPeakGlow(isl, t, isl === hot ? 1.35 : 1);
      isl.dots.forEach(function (d) { drawParticipant(d, t); });
    });
    drawRipples(now);
    drawUser(t);

    /* 聚焦镜：镜外压暗，镜内提亮（flomo 的放大镜语言） */
    if (lens.t > 0.01 && lens.isl) {
      var L = lens.isl, lt = lens.t;
      var lr = L.pr * (2.2 - 0.65 * lt) * 0.8;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.arc(L.px, L.py, lr, 0, TAU);
      ctx.fillStyle = 'rgba(18,0,6,' + (0.66 * lt).toFixed(3) + ')';
      ctx.fill('evenodd');
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(L.px, L.py, lr, 0, TAU);
      ctx.clip();
      var bg2 = ctx.createRadialGradient(L.px, L.py, 10, L.px, L.py, lr);
      bg2.addColorStop(0, mapColors.sky);
      bg2.addColorStop(1, mapColors.sky);
      ctx.fillStyle = bg2;
      ctx.fillRect(L.px - lr, L.py - lr, lr * 2, lr * 2);
      drawDensityHeat(t);
      drawSharedContours(t);
      drawPeakGlow(L, t, 1.7);
      (L.dots || []).forEach(function (d) { drawParticipant(d, t, 1.5); });
      if (L === hot) drawUser(t);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(L.px, L.py, lr, 0, TAU);
      ctx.strokeStyle = 'rgba(255,221,225,' + (0.45 * lt).toFixed(3) + ')';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!running) return;
    try { draw(now); } catch (e) { /* 单帧异常不终止演示 */ }
    rafId = requestAnimationFrame(loop);
  }
  function start() { if (!running) { running = true; rafId = requestAnimationFrame(loop); } }
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); }

  /* ── 文案与数字 ───────────────────────────────────────── */
  function renderClockGreet() {
    tp = nowParts();
    var d = new Date();
    elClock.textContent = fmtTime(tp.h, d.getMinutes());
    if (!lit) elGreet.textContent = daypart(tp.h).greet;
  }
  function renderCount() { elCount.textContent = fmt(displayCount()); }

  var toastTimer = 0;
  function showToast(html) {
    elToast.innerHTML = html;
    elToast.classList.add('is-in');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { elToast.classList.remove('is-in'); }, 3400);
  }

  /* 城市小事件：有人点亮、有人还亮着、有人完成 */
  function scheduleEvents() {
    var delay = 4200 + Math.random() * 4200;
    setTimeout(function () {
      if (!overlay.classList.contains('is-away') && !document.hidden) {
        var city = pick(CITIES), roll = Math.random();
        if (roll < 0.55) {
          drift += 1;
          showToast('<em>' + city + '</em> · ' + TOASTS.start());
          var isl = pick(islands);
          var a = Math.random() * TAU, dd = Math.random() * isl.pr * 0.8;
          if (!REDUCED) ripples.push({ x: isl.px + Math.cos(a) * dd, y: isl.py + Math.sin(a) * dd * 0.92, born: performance.now() });
        } else if (roll < 0.85) {
          showToast('<em>' + city + '</em> · ' + TOASTS.ongoing(8 + Math.floor(Math.random() * 48)));
        } else {
          drift = Math.max(drift - 1, -30);
          showToast('<em>' + city + '</em> · ' + TOASTS.finish());
        }
        renderCount();
        renderIslandCounts();
      }
      scheduleEvents();
    }, delay);
  }

  /* ── 交互：点亮 / 下钻 / 进入 ─────────────────────────── */
  function ignite(silent) {
    if (lit && !silent) return;
    lit = true;
    userAdd = 1;
    try { sessionStorage.setItem(storeKey, '1'); } catch (e) { }
    elLight.classList.add('is-lit');
    elLight.textContent = '✓ ' + CFG.litLabel;
    elChip.textContent = 'You are here';
    elGreet.textContent = CFG.greetLit;
    elGreet.classList.add('is-lit');
    if (W && H) buildDensityField();
    if (!silent) {
      ripples.push({ x: user.x, y: user.y, born: performance.now() });
      setTimeout(function () { ripples.push({ x: user.x, y: user.y, born: performance.now() }); }, 260);
      showToast(TOASTS.ignite);
      renderCount();
      renderIslandCounts();
    }
  }

  function openIsland(isl) {
    lens.isl = isl;
    lens.target = 1;
    overlay.classList.add('is-lens');
    islands.forEach(function (o) { o.el.classList.toggle('is-focus', o === isl); });
    sheet.querySelector('.mm-sheet-title').textContent = isl.label;
    sheet.querySelector('.mm-sheet-sub').textContent = 'Live now · ' + (isl.share || '—') + ' lamps';
    var lines = (SNIPPETS[isl.label] || []).slice(0, 3).map(function (s) {
      return '<div class="mm-line"><span class="mm-line-meta">' + s.m + '</span><span>' + s.t + '</span></div>';
    }).join('');
    sheet.querySelector('.mm-sheet-lines').innerHTML = lines || '<div class="mm-line">Lamps glowing quietly here.</div>';
    var go = sheet.querySelector('.mm-sheet-go');
    go.textContent = CFG.pageMode ? 'Open in the app →' : 'See their posts →';
    go.onclick = function () { closeIsland(); enter(isl.tag); };
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
  }

  function closeIsland() {
    lens.target = 0;
    overlay.classList.remove('is-lens');
    islands.forEach(function (o) { o.el.classList.remove('is-focus'); });
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    setTimeout(function () { if (lens.target === 0) lens.isl = null; }, 600);
  }

  function enter(tag) {
    if (CFG.onEnter) { CFG.onEnter(tag); return; }
    overlay.classList.add('is-away');
    setTimeout(stop, 620);
    ensureStrip();
    if (tag && typeof window.selectTab === 'function') {
      setTimeout(function () {
        try {
          window.selectTab(tag);
          var moments = document.querySelector('.moments');
          var scroller = document.querySelector('.scroll');
          if (moments && scroller) scroller.scrollTo({ top: moments.offsetTop - 70, behavior: 'smooth' });
        } catch (e) { }
      }, 480);
    }
  }

  function open() {
    overlay.classList.remove('is-away');
    renderClockGreet();
    start();
  }

  /* 回到地图的常驻入口：挂在状态区上方 */
  var strip = null;
  function ensureStrip() {
    if (CFG.noStrip || strip) { updateStrip(); return; }
    var anchor = document.querySelector('.status-heading') || document.querySelector('.moments');
    if (!anchor) return;
    strip = document.createElement('button');
    strip.type = 'button';
    strip.className = 'mm-strip';
    strip.innerHTML =
      '<span class="mm-strip-dots"><i></i><i></i><i></i><i></i></span>' +
      '<span class="mm-strip-text">Right now, <b>' + fmt(displayCount()) + '</b> lamps are on' +
      '<small>' + CFG.stripSub + '</small></span>' +
      '<span class="mm-strip-arrow">›</span>';
    strip.addEventListener('click', open);
    anchor.parentNode.insertBefore(strip, anchor);
  }
  function updateStrip() {
    if (!strip) return;
    var b = strip.querySelector('b');
    if (b) b.textContent = fmt(displayCount());
  }

  /* ── 事件绑定与启动 ───────────────────────────────────── */
  elLight.addEventListener('click', function () { ignite(false); });
  elEnter.addEventListener('click', function () { enter(); });
  sheet.querySelector('.mm-sheet-close').addEventListener('click', closeIsland);
  canvas.addEventListener('click', function () { if (lens.isl) closeIsland(); });

  var lastW = 0, lastH = 0, resizeTimer = 0;
  function layoutIfChanged() {
    var r = host.getBoundingClientRect();
    if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 2) return;
    layout();
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stop(); return; }
    layoutIfChanged();
    if (!overlay.classList.contains('is-away')) start();
  });
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutIfChanged, 160);
  });

  layout();
  renderClockGreet();
  renderCount();
  renderIslandCounts();
  if (lit) ignite(true);
  setInterval(function () { renderClockGreet(); updateStrip(); }, 30000);
  scheduleEvents();
  if (CFG.autoOpen === false && !CFG.pageMode) {
    overlay.classList.add('is-away');
    ensureStrip();
  } else {
    start();
  }

  window.__momentMap = { open: open, enter: enter, ignite: ignite };
})();
