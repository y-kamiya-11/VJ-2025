// inputHandler.js

let inputBuffer = "";
let intensity = 0; // 初期値をここに定義するか、config.jsに移動
let bpm = 120; // 初期BPM
let lastSectionMillis = 0;
let lastBeatMillis = 0; // 最新の拍頭のmillisを保存する変数
let currentBeat = 0; // 現在の拍数 (0-3で1,2,3,4拍目を表す)
let tapTimes = []; // Mキーが押されたタイムスタンプを保持する配列 (ミリ秒)
let isZeroKeyPressed = false;

// 効果キーのリスト
const EFFECT_KEYS = [
    KEY_SPACE, KEY_ONE, KEY_TWO, KEY_THREE, KEY_FOUR, KEY_FIVE, KEY_SIX, KEY_ZERO,
    KEY_SEVEN, KEY_EIGHT, KEY_NINE, KEY_D, KEY_F, KEY_J, KEY_K, KEY_M, KEY_N, KEY_C, 
    KEY_V, KEY_B, KEY_MINUS, KEY_CARET_2, KEY_S, KEY_L
]; // config.jsで定義した定数を参照

function handleKeyTyped() {
    // 効果キーが1文字目に押された場合は、inputBufferに残さずにログに追加
    if (inputBuffer === "" && EFFECT_KEYS.includes(keyCode)) {
        addLog("Effect triggered: " + key); // utils.jsから参照
        // 特定のキーに対する効果は keyPressed で処理するため、ここではinputBufferをクリア
        inputBuffer = "";
        return;
    }

    if (keyCode !== KEY_ENTER && keyCode !== KEY_BACKSPACE) {
        inputBuffer += key;
    }
}

function handleKeyPressed() {
    if (keyCode === KEY_BACKSPACE) {
        inputBuffer = inputBuffer.slice(0, -1);
        return;
    }

    if (keyCode === KEY_ENTER) {
        parseCommand(inputBuffer);
        addLog(inputBuffer); // utils.jsから参照
        inputBuffer = "";
        return;
    }

    if (inputBuffer !== "") {
        return;
    }

    if (keyCode === KEY_SPACE) {
        triggerGlow(); // effects.jsから参照
    }

    if (keyCode === KEY_UP_ARROW) {
        intensity = min(intensity + 5, 150);
        addLog("intensity: " + intensity);
    }
    if (keyCode === KEY_DOWN_ARROW) {
        intensity = max(intensity - 5, 0);
        addLog("intensity: " + intensity);
    }

    if (keyCode === LEFT_ARROW) { 
        bpm = max(bpm - 1, BPM_MIN);
        addLog("BPM: " + bpm);
    }
    if (keyCode === RIGHT_ARROW) { 
        bpm = min(bpm + 1, BPM_MAX);
        addLog("BPM: " + bpm);
    }

    // オーバーレイのトリガー
    if (keyCode === KEY_FOUR) {
        triggerOverlay(0); // effects.jsから参照
    }
    if (keyCode === KEY_FIVE) {
        triggerOverlay(1);
    }
    if (keyCode === KEY_SIX) {
        triggerOverlay(2);
    }

    if (keyCode === KEY_ZERO && !isZeroKeyPressed) {
        isZeroKeyPressed = true;
        fadeStartTime = millis(); // フェードアウト開始時刻を記録
    }

    // シェイプオーバーレイのトリガー
    if (keyCode === KEY_D) {
        addShapeOverlay('rect'); // effects.jsから参照
    }
    if (keyCode === KEY_F) {
        addShapeOverlay('diamond');
    }
    if (keyCode === KEY_J) {
        addShapeOverlay('circle');
    }
    if (keyCode === KEY_K) {
        addShapeOverlay('cross');
    }
    if (keyCode === KEY_S) {
        addShapeOverlay('inverted_triangle');
    }
    if (keyCode === KEY_L) {
        addShapeOverlay('triangle');
    }

    if (keyCode === 77) { // 'M'キー
        // 既存のMキーのBPM計算ロジック
        const currentTime = millis();
        tapTimes = tapTimes.filter(time => currentTime - time < TAP_HISTORY_DURATION);

        tapTimes.push(currentTime);

        if (tapTimes.length > 1) {
            let totalInterval = 0;
            for (let i = 1; i < tapTimes.length; i++) {
                totalInterval += tapTimes[i] - tapTimes[i - 1];
            }
            const averageInterval = totalInterval / (tapTimes.length - 1);

            if (averageInterval > 0) {
                const calculatedBPM = round(60000 / averageInterval);
                bpm = constrain(calculatedBPM, BPM_MIN, BPM_MAX);
                addLog("Calculated BPM: " + bpm + " (Taps: " + tapTimes.length + ")");
            }
        } else {
            addLog("Tap M to set BPM. (Need more taps)");
        }
    }

    if (keyCode === 78) { // 'N'キー
        tapTimes = []; // タップ履歴をすべて削除
        addLog("BPM tap history cleared.");
    }

    if (keyCode === 66) { // 'B'キー
        // lastBeatMillis を更新し、currentBeat を強制的に0にする
        lastBeatMillis = millis();
        lastSessionMillis = millis();
        currentBeat = 0; // 1拍目(0)にリセット
        addLog("Beat reset to 1st beat by B key press.");
    }

    // マイナスキーが押されたら映像停止
    if (keyCode === 189) { // マイナスキーのkeyCode
        if (!isMinusKeyPressed) {
            // 停止する瞬間の描画内容をバッファにコピー
            pausedFrameBuffer.image(currentBuffer, 0, 0); // currentBufferの最新の内容をコピー
            isMinusKeyPressed = true;
            addLog("Video Paused.");
        }
    }
    // キャレットキーが押されたらカクカク表示
    if (keyCode === 220 || keyCode == 222) { // ^キーのkeyCode (JP keyboard)
        if (!isCaretKeyPressed) {
            isCaretKeyPressed = true;
            nextUpdateBeatMillis = lastBeatMillis; // 現在の拍頭から開始
            // 厳密には、次の16分音符のタイミングを計算して設定すべきだが、
            // ここでは簡易的にlastBeatMillisから始める
            addLog("Jittery Mode ON.");
        }
    }
}

function parseCommand(command) {
    if (command.startsWith("a")) {
        let sceneNum = command.slice(1);
        if (scenes[sceneNum]) { // config.jsから参照
            switchScene(scenes[sceneNum]); // sceneManager.jsから参照
        } else {
            addLog("Scene " + sceneNum + " not found.");
        }
    } else if (command.startsWith("o")) {
        let key = command.slice(0, 1);
        let value = Number(command.slice(1));
        let currentScene = getCurrentScene(); // sceneManager.jsから参照
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

// inputBuffer を取得する関数（必要に応じて）
function getInputBuffer() {
    return inputBuffer;
}

// intensity を取得する関数（必要に応じて）
function getIntensity() {
    return intensity;
}

function getBPM() {
    return bpm;
}