// main.js

let customFont;

function preload() {
    customFont = loadFont('assets/fonts/BestTen-CRT.otf');
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); // config.jsから参照
    textFont(customFont);

    initializeSceneManager(); // sceneManager.jsから参照
    initializeEffects();      // effects.jsから参照
}

function draw() {
    // シーンの更新と描画
    updateAndDrawScenes(); // sceneManager.jsから参照

    // ログ演出（sceneManagerから現在のシーンを取得して判定）
    if (getCurrentScene() === scene8) { // sceneManager.jsから参照
        drawLogs(255); // utils.jsから参照
    } else {
        drawLogs(100);
    }

    // エフェクトの適用
    applyBlinkEffect(KEY_ONE, getInputBuffer()); // effects.js, inputHandler.jsから参照
    applyBlinkEffect(KEY_TWO, getInputBuffer());
    applyGlowEffect(currentBuffer, getInputBuffer()); // effects.js, inputHandler.jsから参照

    // オーバーレイの描画
    drawOverlays(); // effects.jsから参照

    // シェイプオーバーレイの描画と更新
    drawShapeOverlays(); // effects.jsから参照

    // フレームレート制御（keyReleased イベントで調整するか、drawで継続的に調整するか）
    // 現状は keyPressed で行っているので、ここでは特別な処理は不要。
    // smoothFrameRateChange は keyPressed/keyReleased で呼び出すのがより自然です。
    // ただし、長押しでフレームレートを変化させたい場合は draw で継続的に smoothFrameRateChange を呼び出すのもありです。
    // 今回の例では keyPressed で rate が変更され、離されたら draw で smoothFrameRateChange が動くように想定しています。
    if (!keyIsDown(KEY_EIGHT) && !keyIsDown(KEY_NINE)) {
        smoothFrameRateChange(DEFAULT_FRAME_RATE, 0.15); // utils.jsから参照
    }
}

// イベントリスナーは inputHandler.js に移譲
function keyTyped() {
    handleKeyTyped(); // inputHandler.jsから参照
}

function keyPressed() {
    handleKeyPressed(); // inputHandler.jsから参照
}