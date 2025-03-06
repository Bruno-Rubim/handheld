export let keyIsPressed = {}
export let keyPressedFunction = {}

window.addEventListener("keydown", function(event) {
    if (keyPressedFunction[event.key]){
        keyPressedFunction[event.key]()
    }
    keyIsPressed[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keyIsPressed[event.key] = false;
});