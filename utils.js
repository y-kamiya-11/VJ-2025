// utils.js

let currentAppFrameRate = DEFAULT_FRAME_RATE; // config.jsから参照

function setAppFrameRate(targetRate) {
    frameRate(targetRate);
    currentAppFrameRate = targetRate;
}

function smoothFrameRateChange(targetRate, lerpFactor) {
    currentAppFrameRate = lerp(currentAppFrameRate, targetRate, lerpFactor);
    frameRate(currentAppFrameRate);
}