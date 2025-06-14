// main.js

let customFont;
let fadeStartTime = 0;
const FADE_OUT_DURATION = 200; // 1秒

function preload() {
    customFont = loadFont('assets/fonts/BestTen-CRT.otf');
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); // config.jsから参照
    textFont(customFont);

    initializeSceneManager(); // sceneManager.jsから参照
    initializeEffects();      // effects.jsから参照
    lastBeatMillis = millis(); // 初期値を設定
}

function draw() {
    
    // シーンの更新と描画
    updateAndDrawScenes(); // sceneManager.jsから参照

    // エフェクトの適用
    applyBlinkEffect(KEY_ONE, getInputBuffer()); // effects.js, inputHandler.jsから参照
    applyBlinkEffect(KEY_TWO, getInputBuffer());
    applyGlowEffect(currentBuffer, getInputBuffer()); // effects.js, inputHandler.jsから参照

    // オーバーレイの描画
    drawOverlays(); // effects.jsから参照

    // シェイプオーバーレイの描画と更新
    drawShapeOverlays(); // effects.jsから参照

    if (keyIsDown(KEY_C) && getInputBuffer() === "") {
        generateBlockNoise(); // effects.jsから参照
    } else if (keyIsDown(KEY_V) && getInputBuffer() === "") {
        // currentBuffer は updateAndDrawScenes() で描画された最新のシーン内容を持つ
        applyDisplacedBlockNoise(currentBuffer); // effects.jsから参照
    }

    if (getInputBuffer() === "") {
        if (keyIsDown(KEY_EIGHT)) { // '8'キーが押されている間、加速
            setAppFrameRate(ACCELERATED_FRAME_RATE); // utils.jsから参照
        }
        // '9'キーが押されている間、滑らかに減速
        else if (keyIsDown(KEY_NINE)) {
            smoothFrameRateChange(DECELERATED_FRAME_RATE, 0.05); // utils.jsから参照
        }
        // どちらのキーも押されていない場合、滑らかにデフォルトのフレームレートに戻す
        else {
            smoothFrameRateChange(DEFAULT_FRAME_RATE, 0.15); // utils.jsから参照
        }
    } else {
        // inputBuffer が空でない場合は、デフォルトのフレームレートに戻す処理のみ行う
        // コマンド入力中にフレームレートが勝手に加速・減速しないように
        smoothFrameRateChange(DEFAULT_FRAME_RATE, 0.15);
    }

        if (isZeroKeyPressed) {
        let elapsedTime = millis() - fadeStartTime;
        // 経過時間に応じてアルファ値を0から255にマッピング
        let alphaValue = map(elapsedTime, 0, FADE_OUT_DURATION, 0, 255);
        alphaValue = constrain(alphaValue, 0, 255); // 0から255の範囲に制限

        noStroke(); // 四角形の枠線なし
        fill(0, alphaValue); // 黒色でアルファ値を設定
        rect(0, 0, width, height); // 画面全体に四角形を描画
    }
    
    drawLogs();
    
    // BPMの可視化と拍頭の更新
    handleBeatVisualization(); // 新しく追加する関数
}

// イベントリスナーは inputHandler.js に移譲
function keyTyped() {
    handleKeyTyped(); // inputHandler.jsから参照
}

function keyPressed() {
    handleKeyPressed(); // inputHandler.jsから参照
}

function keyReleased() {
    // 0キーが離されたときの処理
    if (keyCode === KEY_ZERO) {
        isZeroKeyPressed = false;
        // 離されたら即座に再描画（黒いrectが描画されなくなる）
    }
}

// BPMの可視化と拍頭の更新を行う新しい関数
function handleBeatVisualization() {
    const beatInterval = 60000 / bpm; // 1拍のミリ秒数

    if (millis() - lastBeatMillis >= beatInterval) {
        lastBeatMillis += beatInterval; // 次の拍頭の基準を更新
        currentBeat = (currentBeat + 1) % 4; // 0, 1, 2, 3 を繰り返す
    }

    const circleSize = 20;
    const padding = 10;
    const startX = width - (circleSize * 4 + padding * 3) - 20; // 右上からのオフセット
    const startY = 20;

    for (let i = 0; i < 4; i++) {
        let circleX = startX + (circleSize + padding) * i;
        let circleY = startY;

        // 現在の拍に対応する丸を緑色に、それ以外を灰色にする
        let displayColor = color(100); // 灰色
        // 拍頭からFADE_OUT_DURATIONだけ緑色に光らせる
        if (i === currentBeat && millis() - lastBeatMillis < FADE_OUT_DURATION) {
             displayColor = color(0, 255, 0); // 緑色
        }

        fill(displayColor);
        noStroke();
        ellipse(circleX, circleY, circleSize, circleSize);
    }
}