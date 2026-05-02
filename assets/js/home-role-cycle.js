(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var nodes = document.querySelectorAll('.typed-text[data-phrases]');

  nodes.forEach(function (el) {
    var phrases;
    try { phrases = JSON.parse(el.getAttribute('data-phrases')); }
    catch (e) { return; }
    if (!Array.isArray(phrases) || phrases.length === 0) return;

    var caret = document.createElement('span');
    caret.className = 'typed-caret';
    caret.setAttribute('aria-hidden', 'true');
    el.insertAdjacentElement('afterend', caret);

    var i = 0, charIndex = phrases[0].length, deleting = true;

    function tick() {
      var phrase = phrases[i % phrases.length];
      if (!deleting) {
        el.textContent = phrase.slice(0, ++charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          return setTimeout(tick, 5000);
        }
      } else {
        el.textContent = phrase.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          i++;
          return setTimeout(tick, 400);
        }
      }
      setTimeout(tick, deleting ? 60 : 90);
    }

    setTimeout(tick, 5000);
  });
})();
