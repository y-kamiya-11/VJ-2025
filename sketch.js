let currentScene;
let targetScene;
let alpha = 255;
let transitionSpeed = 5;

let currentBuffer, targetBuffer;
let customFont;

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

function keyPressed() {
  if (key === '1') targetScene = scene1;
  if (key === '2') targetScene = scene2;
  if (key === '3') targetScene = scene3;

  addLog("Transition to Scene " + key + "...");
}
