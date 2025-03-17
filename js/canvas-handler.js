export const canvasElement = document.querySelector('canvas');
export const ctx = canvasElement.getContext('2d');
export let renderScale;
export const scaleMultiplyer = 1

export let layout;

let canvasPc = {
    originalWidth: 446,
    originalHeight: 269,
}

let canvasMobile = {
    originalWidth: 320,
    originalHeight: 583,
}

let canvas;

if (innerWidth > innerHeight) {
    layout = 'pc'
    canvas = canvasPc
} else {
    layout = 'mobile'
    canvas = canvasMobile
}

export function clearCanvas(){
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

export const updateCanvas = () => {
    let x = 0
    if (innerWidth > innerHeight) {
        x = Math.floor(innerHeight / canvas.originalHeight)
    } else {
        x = Math.floor(innerWidth / canvas.originalWidth)
    }
    canvas.width = x * canvas.originalWidth
    canvas.height = x * canvas.originalHeight

    renderScale = canvas.width / canvas.originalWidth * scaleMultiplyer;
    canvasElement.style.left = ((innerWidth - canvas.width) / 2) + 'px';
    canvasElement.style.top = ((innerHeight - canvas.height) / 2) + 'px';
    canvasElement.width = canvas.width;
    canvasElement.height = canvas.height;
    canvasElement.style.position = 'absolute'
    canvasElement.style.top = ((innerHeight - canvas.height) / 2) + 'px'
    ctx.imageSmoothingEnabled = false
}