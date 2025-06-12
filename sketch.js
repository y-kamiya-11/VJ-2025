let currentScene;
let targetScene;
let alpha = 255;
let transitionSpeed = 5;

let currentBuffer, targetBuffer;
let customFont;

let inputBuffer = "";
let glowAlpha = 0;

let intensity = 50; // 0から100の範囲で設定（仮の値）

// オーバーレイ関連の変数
let overlayBuffer1, overlayBuffer2, overlayBuffer3;
let overlayActiveTime = [0, 0, 0]; // 各オーバーレイの描画開始時刻

// シェイプオーバーレイ関連の変数
let shapeOverlays = [];

// フレームレート関連の変数
let defaultFrameRate = 60; // デフォルトのフレームレート
let acceleratedFrameRate = 120; // 加速時のフレームレート
let deceleratedFrameRate = 24; // 減速時のフレームレート
let currentAppFrameRate = defaultFrameRate; // 現在のアプリのフレームレート

function preload() {
  customFont = loadFont('assets/fonts/BestTen-CRT.otf');
}

function setup() {
  createCanvas(1920, 1080);
  currentBuffer = createGraphics(width, height);
  targetBuffer  = createGraphics(width, height);
  glowBuffer = createGraphics(width, height);
  overlayBuffer1 = createGraphics(width, height);
  overlayBuffer2 = createGraphics(width, height);
  overlayBuffer3 = createGraphics(width, height);
  textFont(customFont);

  currentScene = scene6;
  targetScene = scene6;
  currentScene.setupScene(currentBuffer);
}

function draw() {
  // ターゲットと違えばディゾルブ開始
  if (currentScene !== targetScene || alpha <= 50) {
    alpha -= transitionSpeed;

    if (alpha <= 0) {
      // トランジション終了時にcurrentSceneを差し替え
      currentScene = targetScene;
      targetScene.drawScene(targetBuffer);
      currentScene.drawScene(currentBuffer);
      image(targetBuffer, 0, 0);

      // Sceneの反映にタイムラグがあるため、少し待ってから通常処理へ
      if (alpha <= -100) {
            alpha = 255;
      }
    } else {
      // 両方描画
      currentScene.drawScene(currentBuffer);
      targetScene.drawScene(targetBuffer);

      // 合成
      image(currentBuffer, 0, 0);
      tint(255, 255 - alpha);
      image(targetBuffer, 0, 0);
      noTint();
    }
  } else {
    currentScene.drawScene(currentBuffer);
    image(currentBuffer, 0, 0);
  }

  // scene8（ログのみの演出）の場合はalpha=255
  if (currentScene === scene8) {
    drawLogs(255);
  } else {
    drawLogs();
  }

  // 1キー・2キーで点滅
  if (keyIsDown(49) && inputBuffer === "") { // '1'キー
    let blinkAlpha = map(sin(millis()*0.1)*3, -1, 1, 0, 90);
    fill(255, blinkAlpha);
    noStroke();
    rect(0, 0, width, height);
  }
  if (keyIsDown(50) && inputBuffer === "") { // '2'キー
    let blinkAlpha = map(sin(millis()*0.1)*5+3, -1, 1, 0, 255);
    fill(0, blinkAlpha);
    noStroke();
    rect(0, 0, width, height);
  }

  // スペースキーでグロー効果発動
  if (glowAlpha > 0 && inputBuffer === "") {
    // currentBufferをglowBufferにコピー
    glowBuffer.image(currentBuffer, 0, 0);

    // 加算合成して表示
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

    glowAlpha -= 11;  // 減衰スピード（調整可）
    glowAlpha = max(glowAlpha, 0);
  }

  // 8キーが押されている間、加速
  if (keyIsDown(56) && inputBuffer === "") { // '8'キー
    if (currentAppFrameRate !== acceleratedFrameRate) {
      frameRate(acceleratedFrameRate);
      currentAppFrameRate = acceleratedFrameRate;
    }
  }
  // 9キーが押されている間、滑らかに減速
  else if (keyIsDown(57) && inputBuffer === "") { // '9'キー
    // currentAppFrameRateをdeceleratedFrameRateに近づける
    currentAppFrameRate = lerp(currentAppFrameRate, deceleratedFrameRate, 0.05); // 0.05は補間速度（調整可）
    frameRate(currentAppFrameRate);
  }
  // どちらのキーも押されていない場合、滑らかにデフォルトのフレームレートに戻す
  else {
    // currentAppFrameRateをdefaultFrameRateに近づける
    currentAppFrameRate = lerp(currentAppFrameRate, defaultFrameRate, 0.15); // 0.05は補間速度（調整可）
    frameRate(currentAppFrameRate);
  }

  // オーバーレイの描画
  // overlay1は仮の関数名。実際のオーバーレイ描画関数に置き換える
  if (overlayActiveTime[0] > 0 && millis() - overlayActiveTime[0] < 5000) {
    overlay1(overlayBuffer1); // overlay1関数でoverlayBuffer1に描画
    image(overlayBuffer1, 0, 0);
  }
  if (overlayActiveTime[1] > 0 && millis() - overlayActiveTime[1] < 5000) {
    overlay2(overlayBuffer2); // overlay2関数でoverlayBuffer2に描画
    image(overlayBuffer2, 0, 0);
  }
  if (overlayActiveTime[2] > 0 && millis() - overlayActiveTime[2] < 5000) {
    overlay3(overlayBuffer3); // overlay3関数でoverlayBuffer3に描画
    image(overlayBuffer3, 0, 0);
  }

  // シェイプオーバーレイの描画と更新
  for (let i = shapeOverlays.length - 1; i >= 0; i--) {
    let s = shapeOverlays[i];
    push();
    translate(s.x, s.y);
    let easedRotationFactor = 1 - easeOut(s.elapsedTime, s.lifeSpan, 6); 
    s.rotation += s.initialRotationSpeed * easedRotationFactor;

    // 不透明度の減衰と同じように、経過時間を更新
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

    s.alpha -= 5; // 不透明度を減らすスピード
    if (s.alpha <= 0) {
      shapeOverlays.splice(i, 1); // 透明になったら配列から削除
    }
  }
}

function keyTyped() {
  // 効果キーが1文字目に押された場合は、inputBufferに残さずにログに追加
  const targetKeyCodes = [32, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 68, 70, 74, 75];
  if (inputBuffer === "" && targetKeyCodes.includes(keyCode)) {
    inputBuffer += key;
    inputBuffer = "";
    return; // 早期return
  }
  
  if (keyCode !== ENTER && keyCode !== BACKSPACE) {
    inputBuffer += key;
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    inputBuffer = inputBuffer.slice(0, -1);
  }

  if (keyCode === 32) { // スペースキー
    glowAlpha = 180;
  }

  if (keyCode === ENTER) {
    handleCommand(inputBuffer);
    addLog(inputBuffer);
    inputBuffer = "";
  }

  // ↑キーでintensityを上げる
  if (keyCode === UP_ARROW) {
    intensity = min(intensity + 5, 100); // 最大100
    addLog("intensity: " + intensity);
  }
  // ↓キーでintensityを下げる
  if (keyCode === DOWN_ARROW) {
    intensity = max(intensity - 5, 0); // 最小0
    addLog("intensity: " + intensity);
  }

  // 4キー・5キー・6キーでoverlayBufferを描画
  if (keyCode === 52) { // '4'キー
    overlayActiveTime[0] = millis();
  }
  if (keyCode === 53) { // '5'キー
    overlayActiveTime[1] = millis();
  }
  if (keyCode === 54) { // '6'キー
    overlayActiveTime[2] = millis();
  }

  // D・F・J・Kキーでシェイプオーバーレイ描画
  // D・F・J・Kキーでシェイプオーバーレイ描画
  if (keyCode === 68) { // 'D'キー (四角形)
    shapeOverlays.push({
      type: 'rect',
      x: random(width),
      y: random(height),
      size: random(50, 150),
      rotation: random(TWO_PI),
      initialRotationSpeed: random(-0.1, 0.1), // 初期回転速度を保持
      alpha: 255,
      elapsedTime: 0, // 経過時間を初期化
      lifeSpan: 50 // 例: 50フレームで回転がほぼ停止する
    });
  }
  if (keyCode === 70) { // 'F'キー (三角形)
    shapeOverlays.push({
      type: 'tri',
      x: random(width),
      y: random(height),
      size: random(50, 150),
      rotation: random(TWO_PI),
      initialRotationSpeed: random(-0.1, 0.1),
      alpha: 255,
      elapsedTime: 0,
      lifeSpan: 50
    });
  }
  if (keyCode === 74) { // 'J'キー (丸)
    shapeOverlays.push({
      type: 'circle',
      x: random(width),
      y: random(height),
      size: random(50, 150),
      rotation: random(TWO_PI),
      initialRotationSpeed: random(-0.1, 0.1),
      alpha: 255,
      elapsedTime: 0,
      lifeSpan: 50
    });
  }
  if (keyCode === 75) { // 'K'キー (×)
    shapeOverlays.push({
      type: 'cross',
      x: random(width),
      y: random(height),
      size: random(50, 150),
      rotation: random(TWO_PI),
      initialRotationSpeed: random(-0.1, 0.1),
      alpha: 255,
      elapsedTime: 0,
      lifeSpan: 50
    });
  }
}

function handleCommand(command) {
  let scenes = {
  '1': scene1,
  '2': scene2,
  '3': scene3,
  '4': scene4, 
  '5': scene5, 
  '6': scene6,
  '7': scene7,  
  '8': scene8,  
};

  if (command.startsWith("scene=")) {
    let sceneNum = command.split("=")[1];
    if (scenes[sceneNum]) {
      targetScene = scenes[sceneNum];
      addLog("Switched to Scene " + sceneNum);
      targetScene.setupScene(targetBuffer);
    } else {
      addLog("Scene " + sceneNum + " not found.");
    }
  } else if (command.includes("=")) {
    let [key, value] = command.split("=");
    if (currentScene.settings && key in currentScene.settings) {
      currentScene.settings[key] = value;
      addLog(`Set ${key} = ${value}`);
    } else {
      addLog("Invalid key: " + key);
    }
  } else {
    addLog("Unknown command: " + command);
  }
}

