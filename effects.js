// effects.js

let glowBuffer;
let glowAlpha = 0;

let overlayBuffer1, overlayBuffer2, overlayBuffer3;
let overlayActiveTime = [0, 0, 0];

let shapeOverlays = [];

function initializeEffects() {
    glowBuffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
    overlayBuffer1 = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
    overlayBuffer2 = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
    overlayBuffer3 = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function applyBlinkEffect(keyCode, inputBuffer) {
    if (keyIsDown(keyCode) && inputBuffer === "") {
        let blinkAlpha;
        if (keyCode === KEY_ONE) {
            blinkAlpha = map(sin(millis() * 0.1) * 3, -1, 1, 0, 90);
            fill(255, blinkAlpha);
        } else if (keyCode === KEY_TWO) {
            blinkAlpha = map(sin(millis() * 0.1) * 5 + 3, -1, 1, 0, 255);
            fill(0, blinkAlpha);
        }
        noStroke();
        rect(0, 0, width, height);
    }
}

function applyGlowEffect(currentBuffer, inputBuffer) {
    if (glowAlpha > 0 && inputBuffer === "") {
        glowBuffer.image(currentBuffer, 0, 0);

        blendMode(ADD);
        tint(255, glowAlpha);
        glowBuffer.filter(BLUR, 2);
        image(glowBuffer, 0, 0);
        glowBuffer.filter(BLUR, 4);
        image(glowBuffer, 0, 0);
        glowBuffer.filter(BLUR, 8);
        image(glowBuffer, 0, 0);
        glowBuffer.filter(BLUR, 16);
        image(glowBuffer, 0, 0);
        glowBuffer.filter(BLUR, 32);
        image(glowBuffer, 0, 0);
        noTint();
        blendMode(BLEND);

        glowAlpha -= GLOW_DECAY_SPEED; // config.jsから参照
        glowAlpha = max(glowAlpha, 0);
    }
}

function triggerGlow() {
    glowAlpha = 180;
}

// オーバーレイ描画関数 (仮の関数名。実際のオーバーレイ描画関数に置き換える)
// これらの関数は、具体的な描画ロジックを持つため、本来は独立したファイルに置くべきですが、
// ここでは簡易的に effects.js に含めます。
function overlay1(buffer) {
    buffer.clear();
    buffer.background(255, 50);
    buffer.fill(0);
    buffer.textSize(50);
    buffer.textAlign(CENTER, CENTER);
    buffer.text("OVERLAY 1 ACTIVE", buffer.width / 2, buffer.height / 2);
}

function overlay2(buffer) {
    buffer.clear();
    buffer.background(0, 50);
    buffer.fill(255);
    buffer.textSize(50);
    buffer.textAlign(CENTER, CENTER);
    buffer.text("OVERLAY 2 ACTIVE", buffer.width / 2, buffer.height / 2);
}

function overlay3(buffer) {
    buffer.clear();
    buffer.background(255, 0, 0, 50);
    buffer.fill(255);
    buffer.textSize(50);
    buffer.textAlign(CENTER, CENTER);
    buffer.text("OVERLAY 3 ACTIVE", buffer.width / 2, buffer.height / 2);
}

function drawOverlays() {
    if (overlayActiveTime[0] > 0 && millis() - overlayActiveTime[0] < OVERLAY_DURATION) {
        overlay1(overlayBuffer1);
        image(overlayBuffer1, 0, 0);
    }
    if (overlayActiveTime[1] > 0 && millis() - overlayActiveTime[1] < OVERLAY_DURATION) {
        overlay2(overlayBuffer2);
        image(overlayBuffer2, 0, 0);
    }
    if (overlayActiveTime[2] > 0 && millis() - overlayActiveTime[2] < OVERLAY_DURATION) {
        overlay3(overlayBuffer3);
        image(overlayBuffer3, 0, 0);
    }
}

function triggerOverlay(index) {
    if (index >= 0 && index < overlayActiveTime.length) {
        overlayActiveTime[index] = millis();
    }
}

function addShapeOverlay(type) {
    shapeOverlays.push({
        type: type,
        x: random(width),
        y: random(height),
        size: random(50, 150),
        rotation: random(TWO_PI),
        initialRotationSpeed: random(-0.1, 0.1),
        alpha: 255,
        elapsedTime: 0,
        lifeSpan: SHAPE_OVERLAY_LIFE_SPAN // config.jsから参照
    });
}

function drawShapeOverlays() {
    for (let i = shapeOverlays.length - 1; i >= 0; i--) {
        let s = shapeOverlays[i];
        push();
        translate(s.x, s.y);
        let easedRotationFactor = 1 - easeOut(s.elapsedTime, s.lifeSpan, 6); // utils.jsから参照
        s.rotation += s.initialRotationSpeed * easedRotationFactor;

        s.elapsedTime++;
        rotate(s.rotation);
        noFill();
        stroke(255, s.alpha);
        strokeWeight(2);

        if (s.type === 'rect') {
            rectMode(CENTER);
            rect(0, 0, s.size, s.size);
        } else if (s.type === 'tri') {
            triangle(0, -s.size / 2, -s.size / 2, s.size / 2, s.size / 2, s.size / 2);
        } else if (s.type === 'circle') {
            ellipse(0, 0, s.size, s.size);
        } else if (s.type === 'cross') {
            line(-s.size / 2, -s.size / 2, s.size / 2, s.size / 2);
            line(s.size / 2, -s.size / 2, -s.size / 2, s.size / 2);
        }
        pop();

        s.alpha -= 5;
        if (s.alpha <= 0) {
            shapeOverlays.splice(i, 1);
        }
    }
}