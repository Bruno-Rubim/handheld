export const canvasElement = document.querySelector('canvas');
export const ctx = canvasElement.getContext('2d');
export let renderScale;
export const scaleMultiplyer = 1
export let layout;

let pcSizeConfig = {
    originalWidth: 446,
    originalHeight: 269,
}

let mobileSizeConfig = {
    originalWidth: 320,
    originalHeight: 513,
}

let sizeConfig;

if (innerWidth > innerHeight) {
    layout = 'pc'
    sizeConfig = pcSizeConfig
} else {
    layout = 'mobile'
    sizeConfig = mobileSizeConfig
}

export function clearCanvas(){
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

export const updateCanvas = () => {
    let scale = 0
    if (innerWidth > innerHeight) {
        scale = Math.floor(innerHeight / sizeConfig.originalHeight)
    } else {
        scale = Math.floor(innerWidth / sizeConfig.originalWidth)
    }
    sizeConfig.width = scale * sizeConfig.originalWidth
    sizeConfig.height = scale * sizeConfig.originalHeight

    renderScale = scale * scaleMultiplyer;
    ctx.imageSmoothingEnabled = false

    if (layout == 'mobile') {
        canvasElement.width = sizeConfig.width
        canvasElement.height = sizeConfig.height
        canvasElement.style.width = innerWidth + 'px'
    } else {
        canvasElement.style.left = ((innerWidth - sizeConfig.width) / 2) + 'px';
        canvasElement.style.top = ((innerHeight - sizeConfig.height) / 2) + 'px';
        canvasElement.width = sizeConfig.width;
        canvasElement.height = sizeConfig.height;
        canvasElement.style.position = 'absolute'
        ctx.imageSmoothingEnabled = false
    }
    
}