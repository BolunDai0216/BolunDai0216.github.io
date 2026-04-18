// Dot-wave background for the home page.
// A single Gaussian "band" of highlighted dots travels diagonally from the
// lower-left to the upper-right; once it clears the far edge it wraps back
// to just before the near edge, so only one band is visible at a time.
// The dots themselves sit on a fixed symmetric grid — only alpha + color
// pulse as the band passes through.
//
// Also drives the page background color: reads --bg-color from :root and
// lerps toward it each frame so hover transitions feel smooth regardless
// of the underlying CSS transition.
(function () {
  'use strict';

  var body = document.body;
  if (!body) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Canvas element — injected once per page.
  var canvas = document.createElement('canvas');
  canvas.id = 'dot-wave-bg';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  // ---- Traveling band ------------------------------------------------------
  // Direction vector: +x, -y (screen y grows downward, so -y is up).
  var DIR_X = 1 / Math.SQRT2;
  var DIR_Y = -1 / Math.SQRT2;
  var BAND_WIDTH = 120;        // Gaussian sigma (px along u)
  var BAND_SPEED = 0.35;       // px per ms
  var TWO_SIGMA2 = 2 * BAND_WIDTH * BAND_WIDTH;

  // Range of u = x*DIR_X + y*DIR_Y across the viewport — recomputed on resize.
  var uMin = 0, uMax = 0, uTravel = 0;
  function computeURange() {
    var u00 = 0;
    var u10 = W * DIR_X;
    var u01 = H * DIR_Y;
    var u11 = W * DIR_X + H * DIR_Y;
    uMin = Math.min(u00, u10, u01, u11);
    uMax = Math.max(u00, u10, u01, u11);
    // Small pad → short gap between the band leaving and re-entering.
    var pad = 1.5 * BAND_WIDTH;
    uMin -= pad; uMax += pad;
    uTravel = uMax - uMin;
  }

  // ---- Color (live reactive) ----------------------------------------------
  var cur = [179, 55, 55], target = [179, 55, 55];
  function hex2rgb(h) {
    h = h.trim().replace('#', '');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function readTarget() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
    if (v) { try { target = hex2rgb(v); } catch (e) {} }
  }
  readTarget();
  new MutationObserver(readTarget).observe(document.documentElement, {
    attributes: true, attributeFilter: ['style']
  });
  // Safety net for environments where MutationObserver misses inline writes.
  setInterval(readTarget, 250);

  // ---- Sizing --------------------------------------------------------------
  var W = 0, H = 0;
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  computeURange();
  window.addEventListener('resize', function () { resize(); computeURange(); }, { passive: true });

  // ---- Render loop ---------------------------------------------------------
  var start = performance.now();

  function frame(now) {
    // Lerp color toward target (~0.5s feel at 60fps).
    cur[0] += (target[0] - cur[0]) * 0.08;
    cur[1] += (target[1] - cur[1]) * 0.08;
    cur[2] += (target[2] - cur[2]) * 0.08;
    var r = cur[0] | 0, g = cur[1] | 0, b = cur[2] | 0;

    // Base fill
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    ctx.fillRect(0, 0, W, H);

    // Highlight (toward white) + shadow (toward dark) colors for the dots.
    var lightR = r + (255 - r) * 0.65;
    var lightG = g + (255 - g) * 0.65;
    var lightB = b + (255 - b) * 0.65;
    var darkR = r * 0.72, darkG = g * 0.72, darkB = b * 0.72;

    var t = reduce ? 0 : (now - start);

    // Dense symmetric grid centered on viewport — covers whole page.
    var spacing = W < 640 ? 18 : W < 1100 ? 22 : 24;
    var baseRadius = W < 640 ? 1.7 : 2.0;
    var cx = W / 2, cy = H / 2;
    var nX = Math.ceil((W / 2) / spacing) + 1;
    var nY = Math.ceil((H / 2) / spacing) + 1;

    // Soft vignette so dots fade at the far corners.
    var halfDiag = Math.sqrt(W * W + H * H) / 2;
    var vigStart = halfDiag * 0.75;
    var vigEnd = halfDiag * 1.05;

    // Current band-center position along u (wraps once off-screen).
    var u0 = uMin + ((t * BAND_SPEED) % uTravel);

    for (var j = -nY; j <= nY; j++) {
      for (var i = -nX; i <= nX; i++) {
        var px = cx + i * spacing;
        var py = cy + j * spacing;
        if (px < -spacing || px > W + spacing) continue;
        if (py < -spacing || py > H + spacing) continue;

        // Vignette mask (radial).
        var dx = px - cx, dy = py - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var m = 1 - Math.min(Math.max((dist - vigStart) / (vigEnd - vigStart), 0), 1);
        m = m * m * (3 - 2 * m);
        if (m <= 0.005) continue;

        // Gaussian pulse along the direction axis.
        var u = px * DIR_X + py * DIR_Y;
        var du = u - u0;
        var pulse = Math.exp(-(du * du) / TWO_SIGMA2); // 0..1, peak at band center
        var alpha = (0.06 + pulse * 0.9) * m;

        var cr = darkR + (lightR - darkR) * pulse;
        var cg = darkG + (lightG - darkG) * pulse;
        var cb = darkB + (lightB - darkB) * pulse;

        ctx.beginPath();
        ctx.arc(px, py, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + (cr|0) + ',' + (cg|0) + ',' + (cb|0) + ',' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
