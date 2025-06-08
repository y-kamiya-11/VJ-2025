let currentScene;
let targetScene;
let alpha = 255;
let transitionSpeed = 5;

let currentBuffer, targetBuffer;
let customFont;

let inputBuffer = "";

function preload() {
  customFont = loadFont('assets/fonts/BestTen-CRT.otf');
}

function setup() {
  createCanvas(1920, 1080);
  currentBuffer = createGraphics(width, height);
  targetBuffer  = createGraphics(width, height);
  textFont(customFont);

  currentScene = scene1;
  targetScene = scene1;
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
}

function keyTyped() {
  if (keyCode !== ENTER && keyCode !== BACKSPACE) {
    inputBuffer += key;
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    inputBuffer = inputBuffer.slice(0, -1);
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
  '3': scene3
  // 以後追加ならここだけ追記
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

/*function keyPressed() {
  if (key === '1') targetScene = scene1;
  if (key === '2') targetScene = scene2;
  if (key === '3') targetScene = scene3;

  addLog("Transition to Scene " + key + "...");
}*/
