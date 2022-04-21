function changeBackgroundColor(color) {
    body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = color;
}

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