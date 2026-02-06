var colorAnimation = null;
var animationColors = ['#b33737', '#3737b3', '#37b337', '#b37337'];
var colorIndex = 0;
var isHovering = false;

var slowTransition = 'background-color 3s ease';
var fastTransition = 'background-color 0.5s ease';

function startColorAnimation() {
    if (colorAnimation) return;
    var body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('home-page')) return;

    colorAnimation = setInterval(function() {
        if (isHovering) return;
        body.style.transition = slowTransition;
        colorIndex = (colorIndex + 1) % animationColors.length;
        body.style.backgroundColor = animationColors[colorIndex];
    }, 3000);
}

function changeBackgroundColor(color) {
    isHovering = true;
    var body = document.getElementsByTagName('body')[0];
    body.style.transition = fastTransition;
    body.style.backgroundColor = color;
}

function resetBackgroundColor() {
    isHovering = false;
    var body = document.getElementsByTagName('body')[0];
    body.style.transition = fastTransition;
}

// Start animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    var body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('home-page')) {
        body.style.transition = slowTransition;
        body.style.backgroundColor = animationColors[0];
        startColorAnimation();
    }
});

function addUnderline(object) {
    object.style.textDecoration = "underline";
}

function removeUnderline(object) {
    object.style.textDecoration = "none";
}

function showCardsByClass(className) {
    objects = document.getElementsByClassName(className)
    for (const obj of objects) {
        obj.style.display = "inline-block";
    }
}

function hideCardsByClass(className) {
    objects = document.getElementsByClassName(className)
    for (const obj of objects) {
        obj.style.display = "none";
    }
}

function onlyShowCardsByClass(className, classNames) {
    for (const hiddenClasses of classNames) {
        hideCardsByClass(hiddenClasses)
    }
    showCardsByClass(className)
}

function showAllCards(classNames) {
    for (const classes of classNames) {
        showCardsByClass(classes)
    }
}