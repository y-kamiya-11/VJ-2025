// inputHandler.js

let inputBuffer = "";
let intensity = 50; // 初期値をここに定義するか、config.jsに移動

// 効果キーのリスト
const EFFECT_KEYS = [
    KEY_SPACE, KEY_ONE, KEY_TWO, KEY_THREE, KEY_FOUR, KEY_FIVE, KEY_SIX,
    KEY_SEVEN, KEY_EIGHT, KEY_NINE, KEY_D, KEY_F, KEY_J, KEY_K
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
    }

    if (keyCode === KEY_SPACE) {
        triggerGlow(); // effects.jsから参照
    }

    if (keyCode === KEY_ENTER) {
        parseCommand(inputBuffer);
        addLog(inputBuffer); // utils.jsから参照
        inputBuffer = "";
    }

    if (keyCode === KEY_UP_ARROW) {
        intensity = min(intensity + 5, 100);
        addLog("intensity: " + intensity);
    }
    if (keyCode === KEY_DOWN_ARROW) {
        intensity = max(intensity - 5, 0);
        addLog("intensity: " + intensity);
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

    // シェイプオーバーレイのトリガー
    if (keyCode === KEY_D) {
        addShapeOverlay('rect'); // effects.jsから参照
    }
    if (keyCode === KEY_F) {
        addShapeOverlay('tri');
    }
    if (keyCode === KEY_J) {
        addShapeOverlay('circle');
    }
    if (keyCode === KEY_K) {
        addShapeOverlay('cross');
    }

    // フレームレート制御
    if (keyCode === KEY_EIGHT) {
        setAppFrameRate(ACCELERATED_FRAME_RATE); // utils.jsから参照
    } else if (keyCode === KEY_NINE) {
        smoothFrameRateChange(DECELERATED_FRAME_RATE, 0.05); // utils.jsから参照
    } else {
        smoothFrameRateChange(DEFAULT_FRAME_RATE, 0.15); // utils.jsから参照
    }
}

function parseCommand(command) {
    if (command.startsWith("scene=")) {
        let sceneNum = command.split("=")[1];
        if (scenes[sceneNum]) { // config.jsから参照
            switchScene(scenes[sceneNum]); // sceneManager.jsから参照
        } else {
            addLog("Scene " + sceneNum + " not found.");
        }
    } else if (command.includes("=")) {
        let [key, value] = command.split("=");
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