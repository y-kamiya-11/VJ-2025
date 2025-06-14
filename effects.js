// effects.js

let glowBuffer;
let glowAlpha = 0;

let overlayBuffer1, overlayBuffer2, overlayBuffer3;
let overlayActiveTime = [0, 0, 0];

let shapeOverlays = [];

let blockNoiseBuffer;
let tempDisplacedGraphics; // ずらしたシーンを描画するための一時バッファ
let tempOriginalGraphics;  // 元のシーンを描画するための一時バッファ
let inverseMaskGraphics;   // 逆マスクを生成するための一時バッファ

function initializeEffects() {
  glowBuffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  overlayBuffer1 = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  overlayBuffer2 = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  overlayBuffer3 = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  blockNoiseBuffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  tempDisplacedGraphics = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  tempOriginalGraphics = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  inverseMaskGraphics = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
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
    glowBuffer.filter(BLUR, 8);
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
  buffer.noFill();
  buffer.strokeWeight(2);
  buffer.stroke(0, 255, 0); // 緑色

  const arrowWidth = 50;
  const arrowHeight = 50;
  const arrowSpacing = 100;
  const arrowCount = 3;
  const startX = -arrowWidth; // 左端から登場させるため
  const endX = buffer.width + arrowWidth; // 右端まで移動させるため
  const centerY = buffer.height / 2;
  const animationDuration = 2000; // アニメーションの総時間 (ミリ秒)

  let currentTime = millis() - overlayActiveTime[0]; // overlay1が開始されてからの時間
  let normalizedTime = constrain(currentTime / animationDuration, 0, 1); // 0-1の範囲に正規化

  for (let i = 0; i < arrowCount; i++) {
    let arrowX = map(normalizedTime, 0, 1, startX + i * arrowSpacing, endX + i * arrowSpacing);
    let arrowY = centerY;
    let alpha;

    if (arrowX < 0) {
        alpha = map(arrowX, -arrowWidth, 0, 0, 255);
    } else if (arrowX > buffer.width) {
        alpha = map(arrowX, buffer.width, buffer.width + arrowWidth, 255, 0);
    } else {
        alpha = 255;
    }

    alpha = constrain(alpha, 0, 255);

    buffer.push();
    buffer.translate(arrowX, arrowY);
    buffer.rotate(-PI / 4); // "く"の字の角度を調整
    buffer.stroke(0, 255, 0, alpha); // 透明度を適用
    buffer.beginShape();
    buffer.vertex(0, 0);
    buffer.vertex(0, arrowHeight / 2);
    buffer.vertex(arrowWidth / 2, arrowHeight / 2);
    buffer.endShape();
    buffer.pop();
  }
}

function overlay2(buffer) {
  buffer.clear();
  buffer.noFill();
  buffer.stroke(0, 255, 0); // 緑色の文字

  const textLifeSpan = 500; // 各文字の生存時間 (ミリ秒)

  // 左上のテキスト
  const topLeftText = [
    "SYSTEM",
    "INITIALIZING",
    "..."
  ];
  let currentTopLeftCharTime = millis() - overlayActiveTime[1]; // overlay2開始からの時間

  buffer.textSize(20);
  buffer.textAlign(LEFT, TOP);
  for (let i = 0; i < topLeftText.length; i++) {
    let line = topLeftText[i];
    for (let j = 0; j < line.length; j++) {
      let charAlpha = 0;
      let charStartTime = (i * line.length + j) * 50; // 各文字の表示開始を少しずらす
      let charEndTime = charStartTime + textLifeSpan;

      if (currentTopLeftCharTime >= charStartTime && currentTopLeftCharTime < charEndTime) {
        charAlpha = map(currentTopLeftCharTime, charStartTime, charEndTime, 0, 255);
      } else if (currentTopLeftCharTime >= charEndTime && currentTopLeftCharTime < charEndTime + textLifeSpan) {
        charAlpha = map(currentTopLeftCharTime, charEndTime, charEndTime + textLifeSpan, 255, 0);
      }
      charAlpha = constrain(charAlpha, 0, 255);
      buffer.fill(0, 255, 0, charAlpha);
      buffer.text(line[j], 20 + buffer.textWidth(line.substring(0, j)), 20 + i * 25); // x座標を調整して文字送り
    }
  }
  buffer.noFill(); // 次の描画のためにfillをリセット

  // 右下のテキスト
  const bottomRightText = [
    "DATA STREAM:",
    "RECEIVING PACKETS",
    "ANALYZING",
    "COMPLETE"
  ];
  let currentBottomRightCharTime = millis() - overlayActiveTime[1];

  buffer.textSize(20);
  buffer.textAlign(RIGHT, BOTTOM);
  for (let i = 0; i < bottomRightText.length; i++) {
    let line = bottomRightText[i];
    for (let j = 0; j < line.length; j++) {
      let charAlpha = 0;
      let charStartTime = (i * line.length + j) * 50;
      let charEndTime = charStartTime + textLifeSpan;

      if (currentBottomRightCharTime >= charStartTime && currentBottomRightCharTime < charEndTime) {
        charAlpha = map(currentBottomRightCharTime, charStartTime, charEndTime, 0, 255);
      } else if (currentBottomRightCharTime >= charEndTime && currentBottomRightCharTime < charEndTime + textLifeSpan) {
        charAlpha = map(currentBottomRightCharTime, charEndTime, charEndTime + textLifeSpan, 255, 0);
      }
      charAlpha = constrain(charAlpha, 0, 255);
      buffer.fill(0, 255, 0, charAlpha);
      let lineWidth = buffer.textWidth(line);
      let charOffset = buffer.textWidth(line.substring(j + 1));
      buffer.text(line[j], buffer.width - 20 - charOffset, buffer.height - 20 - (bottomRightText.length - 1 - i) * 25);
    }
  }
  buffer.noFill();
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

function getThirtySecondNoteDuration(currentBPM, frameRate = 60) {
  if (currentBPM <= 0) return 1; // BPMが0以下の場合は最低1フレーム確保
  const secondsPerBeat = 60 / currentBPM; // 1拍あたりの秒数
  const secondsPerThirtySecondNote = secondsPerBeat / 8; // 1拍は8つの32分音符に相当
  return Math.max(1, Math.round(secondsPerThirtySecondNote * frameRate)); // フレーム数に変換し、最低1フレームは確保
}

function addShapeOverlay(type) {
  // ここで現在のbpmの値を参照して、その時点でのlifeSpanを計算する
  const currentLifeSpan = getThirtySecondNoteDuration(bpm);

  shapeOverlays.push({
    type: type,
    x: width / 2, // 画面中央に配置
    y: height / 2, // 画面中央に配置
    size: Math.min(width, height) * 0.7, // 画面サイズに応じて非常に大きくする (例: 短い方の70%)
    alpha: 255, // フェードアウト無効のため常に255
    elapsedTime: 0,
    lifeSpan: currentLifeSpan // 図形が生成された時点のBPMで計算された生存時間
  });
}

function drawShapeOverlays() {
  for (let i = shapeOverlays.length - 1; i >= 0; i--) {
    let s = shapeOverlays[i];
    push();
    translate(s.x, s.y);

    s.elapsedTime++;

    strokeCap(SQUARE);
    noFill();
    stroke(255, s.alpha);
    strokeWeight(150); // 線を非常に太くする (例: 10) - 適宜調整してください

    blendMode(DIFFERENCE);

    if (s.type === 'rect') {
      rectMode(CENTER);
      rect(0, 0, s.size, s.size);
    } else if (s.type === 'diamond') {
      push();
      rotate(PI / 4); // 45度回転
      rectMode(CENTER);
      rect(0, 0, s.size, s.size);
      pop();
    } else if (s.type === 'circle') {
      ellipse(0, 0, s.size, s.size);
    } else if (s.type === 'cross') {
      line(-s.size / 2, -s.size / 2, s.size / 2, s.size / 2);
      line(s.size / 2, -s.size / 2, -s.size / 2, s.size / 2);
    }

    blendMode(BLEND);
    pop();

    // lifeSpan が経過したら削除
    if (s.elapsedTime >= s.lifeSpan) {
      shapeOverlays.splice(i, 1);
    }
  }
}

/**
 * ランダムな白い長方形を blockNoiseBuffer に描画する。
 * @param {boolean} isMaskMode - Vキーモード (マスクとして使用) の場合 true。
 * このモードでは、マスクとして利用するため描画は行わない。
 */
function generateBlockNoise(isMaskMode = false) {
  blockNoiseBuffer.clear();
  blockNoiseBuffer.noStroke();
  blockNoiseBuffer.fill(255); // 白いブロックノイズ

  for (let i = 0; i < BLOCK_NOISE_RECT_COUNT; i++) {
    let x = random(CANVAS_WIDTH);
    let y = random(CANVAS_HEIGHT);
    let biasedRandom = pow(random(1), BLOCK_NOISE_SIZE_BIAS_POWER);
    let w = map(biasedRandom, 0, 1, BLOCK_NOISE_RECT_SIZE_MIN, BLOCK_NOISE_RECT_SIZE_MAX*2);
    biasedRandom = pow(random(1), BLOCK_NOISE_SIZE_BIAS_POWER);
    let h = map(biasedRandom, 0, 1, BLOCK_NOISE_RECT_SIZE_MIN, BLOCK_NOISE_RECT_SIZE_MAX*0.4);
    blockNoiseBuffer.rect(x, y, w, h);
  }

  if (!isMaskMode) {
    // Cキーモードの場合のみ、バッファを直接描画
    tint(255, 100); // 例: アルファ値を100に設定 (0-255の範囲で調整可能)
    image(blockNoiseBuffer, 0, 0);
    noTint();
  }
}

/**
 * Vキーモードでの描画処理。
 * blockNoiseBuffer をマスクとして使用し、sceneBuffer の内容を部分的にずらして描画する。
 * @param {p5.Graphics} sceneBuffer - 現在のシーンが描画されているバッファ
 */
function applyDisplacedBlockNoise(sceneBuffer) {
  // 1. ブロックノイズのマスク画像を生成
  generateBlockNoise(true); // blockNoiseBuffer に白い長方形を描画（描画はしない）
  let noiseMaskImage = blockNoiseBuffer.get(); // p5.Graphics の内容を p5.Image として取得

  // 2. ずらした部分の画像と元の部分の画像を一時バッファに描画
  // tempDisplacedGraphics の内容をクリアし、sceneBufferの内容をずらして描画
  tempDisplacedGraphics.clear();
  tempDisplacedGraphics.image(sceneBuffer, BLOCK_NOISE_DISPLACEMENT, 0);
  let displacedImageForMask = tempDisplacedGraphics.get(); // p5.Image として取得

  // tempOriginalGraphics の内容をクリアし、sceneBufferの内容をそのまま描画
  tempOriginalGraphics.clear();
  tempOriginalGraphics.image(sceneBuffer, 0, 0);
  let originalImageForMask = tempOriginalGraphics.get(); // p5.Image として取得

  // 3. マスクを適用して合成
  displacedImageForMask.mask(noiseMaskImage);

  // 逆マスクを生成 (inverseMaskGraphics を利用)
  inverseMaskGraphics.clear();
  inverseMaskGraphics.background(255); // 全体を白で埋める
  // blockNoiseBuffer の内容を inverseMaskGraphics に直接描画し、INVERT モードを適用
  inverseMaskGraphics.image(blockNoiseBuffer, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, INVERT);
  let inverseNoiseMaskImage = inverseMaskGraphics.get();

  originalImageForMask.mask(inverseNoiseMaskImage);
  
  // 4. 最終的な結果をメインキャンバスに描画
  image(originalImageForMask, 0, 0);
  image(displacedImageForMask, 0, 0);

  // p5.Image オブジェクトはガベージコレクションに任せる
}