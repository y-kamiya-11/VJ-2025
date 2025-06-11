let currentScene;
let targetScene;
let alpha = 255;
let transitionSpeed = 5;

let currentBuffer, targetBuffer;
let customFont;

let inputBuffer = "";
let glowAlpha = 0;

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

  drawLogs();

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
}

function keyTyped() {
  // 効果キーが1文字目に押された場合は、inputBufferに残さずにログに追加
  if (inputBuffer === "" && (keyCode === 49 || keyCode === 50 || keyCode === 56 || keyCode === 57 || keyCode === 32)) {
    inputBuffer += key;
    addLog(inputBuffer);
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

