// Drives the home-page color mood. The dot-wave canvas (background.js) reads
// --bg-color and re-tints itself, so we only manage the CSS variable here.

var animationColors = ['#b33737', '#3737b3', '#37b337', '#b37337'];
var colorIndex = 0;
var isHovering = false;
var colorAnimation = null;

function setBgColor(color) {
  document.documentElement.style.setProperty('--bg-color', color);
}

function startColorAnimation() {
  if (colorAnimation) return;
  var body = document.getElementsByTagName('body')[0];
  if (!body.classList.contains('home-page')) return;

  colorAnimation = setInterval(function () {
    if (isHovering) return;
    colorIndex = (colorIndex + 1) % animationColors.length;
    setBgColor(animationColors[colorIndex]);
  }, 5000); // slower idle cycle; the canvas wave fills in the visual motion
}

function changeBackgroundColor(color) {
  isHovering = true;
  setBgColor(color);
}

function resetBackgroundColor() {
  isHovering = false;
  setBgColor(animationColors[colorIndex]);
}

document.addEventListener('DOMContentLoaded', function () {
  var body = document.getElementsByTagName('body')[0];
  if (body.classList.contains('home-page')) {
    setBgColor(animationColors[0]);
    startColorAnimation();
  }
});

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

function onlyShowCardsByClass(className, classNames) {
  for (var i = 0; i < classNames.length; i++) hideCardsByClass(classNames[i]);
  showCardsByClass(className);
}

function showAllCards(classNames) {
  for (var i = 0; i < classNames.length; i++) showCardsByClass(classNames[i]);
}
