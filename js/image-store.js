const images = {}

export function getImg(src) {
    let img = images[src]
    if (img !== undefined) {
        return img
    }
    console.warn(`Image ${src} wasn't preloaded`)
    img = document.createElement('img')
    img.src = src
    images[src] = img
    return img
}

export function preloadImg(src) {
    const img = document.createElement('img')
    images[src] = img
    return new Promise(function(done, fail) {
        img.onload = done
        img.onerror = fail
        img.src = src
    })
}
