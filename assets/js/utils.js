// Drives the home-page color mood. The dot-wave canvas (background.js) reads
// --bg-color and re-tints itself, so we only manage the CSS variable here.

var animationColors = ['#b33737', '#3737b3', '#37b337', '#b37337'];
var colorIndex = 0;
var isHovering = false;
var colorAnimation = null;
var pageDefaultColor = null;

function setBgColor(color) {
  document.documentElement.style.setProperty('--bg-color', color);
}

function startColorAnimation() {
  if (colorAnimation) return;
  colorAnimation = setInterval(function () {
    if (isHovering) return;
    colorIndex = (colorIndex + 1) % animationColors.length;
    setBgColor(animationColors[colorIndex]);
  }, 5000);
}

function changeBackgroundColor(color) {
  isHovering = true;
  setBgColor(color);
}

function resetBackgroundColor() {
  isHovering = false;
  var body = document.getElementsByTagName('body')[0];
  if (body.classList.contains('home-page')) {
    setBgColor(animationColors[colorIndex]);
  } else {
    setBgColor(pageDefaultColor);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Capture the page's default --bg-color before any JS overrides it.
  pageDefaultColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();

  var body = document.getElementsByTagName('body')[0];
  if (body.classList.contains('home-page')) {
    setBgColor(animationColors[0]);
    startColorAnimation();
  }

  initBlogPostScrollSpy();
});

// Highlights the TOC link for whichever section is currently in view. Runs on
// blog-post pages that render a <d-contents> sidebar; no-ops elsewhere.
function initBlogPostScrollSpy() {
  var nav = document.querySelector('d-contents nav');
  if (!nav) return;
  var links = nav.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  var items = [];
  for (var i = 0; i < links.length; i++) {
    var id = decodeURIComponent(links[i].getAttribute('href').slice(1));
    if (!id) continue;
    var el = document.getElementById(id);
    if (el) items.push({ link: links[i], el: el });
  }
  if (!items.length) return;

  function update() {
    var offset = 120;
    var activeIdx = -1;
    for (var i = 0; i < items.length; i++) {
      if (items[i].el.getBoundingClientRect().top - offset <= 0) activeIdx = i;
    }
    if (activeIdx === -1) activeIdx = 0;
    for (var j = 0; j < items.length; j++) {
      items[j].link.classList.toggle('active', j === activeIdx);
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

function addUnderline(object) { object.style.textDecoration = 'underline'; }
function removeUnderline(object) { object.style.textDecoration = 'none'; }

function showCardsByClass(className) {
  var objects = document.getElementsByClassName(className);
  for (var i = 0; i < objects.length; i++) objects[i].style.display = 'inline-block';
}

function hideCardsByClass(className) {
  var objects = document.getElementsByClassName(className);
  for (var i = 0; i < objects.length; i++) objects[i].style.display = 'none';
}

function setActiveSidebarLink(el) {
  var links = document.querySelectorAll('.blog-sidebar-link');
  for (var i = 0; i < links.length; i++) links[i].classList.remove('active');
  if (el) el.classList.add('active');
}

function onlyShowCardsByClass(className, classNames) {
  for (var i = 0; i < classNames.length; i++) hideCardsByClass(classNames[i]);
  showCardsByClass(className);
  setActiveSidebarLink(event && event.currentTarget);
}

function showAllCards(classNames) {
  for (var i = 0; i < classNames.length; i++) showCardsByClass(classNames[i]);
  setActiveSidebarLink(null);
}
