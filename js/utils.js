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