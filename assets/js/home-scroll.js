(function () {
  'use strict';

  if (!document.body.classList.contains('home-page')) return;

  var intro = document.getElementById('home-intro');
  if (!intro) return;

  var progress = 0;
  var WHEEL_TOTAL = 300;
  function computeTouchTotal() {
    var h = window.innerHeight || 700;
    return Math.max(140, Math.min(260, h * 0.35));
  }
  var TOUCH_TOTAL = computeTouchTotal();
  window.addEventListener('resize', function () {
    TOUCH_TOTAL = computeTouchTotal();
  }, { passive: true });
  var RAF_ID = null;
  var lastRendered = -1;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  function applyProgress() {
    if (progress === lastRendered) return;
    lastRendered = progress;

    var eased      = easeInOut(progress);
    var opacity    = eased;
    var translateY = (1 - eased) * 2.5;

    intro.style.opacity    = opacity;
    intro.style.transform  = 'translateY(' + translateY + 'rem)';
    intro.style.transition = 'none';

    if (progress > 0.02) {
      intro.classList.add('revealed');
    } else {
      intro.classList.remove('revealed');
    }
  }

  window.addEventListener('wheel', function (e) {
    e.preventDefault();
    var delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 18;
    if (e.deltaMode === 2) delta *= 200;
    progress = clamp(progress + delta / WHEEL_TOTAL, 0, 1);
    if (!RAF_ID) RAF_ID = requestAnimationFrame(function () { RAF_ID = null; applyProgress(); });
  }, { passive: false });

  var touchStartY = null;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (touchStartY === null) return;
    e.preventDefault();
    var dy = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    progress = clamp(progress + dy / TOUCH_TOTAL, 0, 1);
    if (!RAF_ID) RAF_ID = requestAnimationFrame(function () { RAF_ID = null; applyProgress(); });
  }, { passive: false });

  window.addEventListener('touchend', function () { touchStartY = null; }, { passive: true });

  window.addEventListener('keydown', function (e) {
    var step = 0;
    if (e.key === 'ArrowDown' || e.key === ' ') step =  0.15;
    if (e.key === 'ArrowUp')                    step = -0.15;
    if (step === 0) return;
    e.preventDefault();
    progress = clamp(progress + step, 0, 1);
    applyProgress();
  });

  applyProgress();
})();
