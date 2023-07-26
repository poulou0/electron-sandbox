document.addEventListener("DOMContentLoaded", () => {
    let transparentMode = false;
    const body = document.body;
    const button = document.createElement("button");
    button.textContent = "Toggle";
    button.style.position = "absolute"
    button.style.right = "10px"
    button.style.top = "10px"
    body.appendChild(button);

    button.addEventListener("click", () => {
        body.style.backgroundColor = !transparentMode ? "transparent" : "black";
        body.style.color = !transparentMode ? "black" : "white";
        body.style.textShadow = !transparentMode ? "1px 1px 1px #fff, 1px -1px 1px #fff, -1px 1px 1px #fff, -1px -1px 1px #fff" : "none";
        transparentMode = !transparentMode;
    });
});