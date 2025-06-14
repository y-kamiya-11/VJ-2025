// sceneManager.js

let currentScene;
let targetScene;
let alpha = 255;
let transitionSpeed = TRANSITION_SPEED; // config.jsから参照

let currentBuffer;
let targetBuffer;

function initializeSceneManager() {
    currentBuffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT); // config.jsから参照
    targetBuffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
    currentScene = initialScene; // config.jsから参照
    targetScene = initialScene;
    currentScene.setupScene(currentBuffer);
}

let transitionStarted = false; // トランジションが開始されたかどうかのフラグ

function updateAndDrawScenes() {
    if (currentScene !== targetScene || alpha <= 50) {
        // ここがトランジション中
        if (currentScene !== targetScene && !transitionStarted) {
            // トランジションの最初のフレーム
            if (currentScene === scene8) { // currentSceneがscene8の場合に限定
                logAlpha = 100;
            }
            if (targetScene === scene8) { // currentSceneがscene8の場合に限定
                logAlpha = 255;
            }
            transitionStarted = true; // フラグを立てて、次フレーム以降は実行しないようにする
        }

        alpha -= transitionSpeed;

        if (alpha <= 0) {
            currentScene = targetScene;
            currentScene.drawScene(currentBuffer); // currentBufferに描画
            targetScene.drawScene(targetBuffer); // targetBufferに描画
            image(targetBuffer, 0, 0); // targetBufferを表示

            if (alpha <= -100) {
                alpha = 255;

                // 新しいシーンに切り替わったので、トランジションフラグをリセット
                transitionStarted = false; 
            }
        } else {
            currentScene.drawScene(currentBuffer);
            targetScene.drawScene(targetBuffer);

            image(currentBuffer, 0, 0);
            tint(255, 255 - alpha);
            image(targetBuffer, 0, 0);
            noTint();
        }
    } else {
        // シーンが安定して表示されている状態
        currentScene.drawScene(currentBuffer);
        image(currentBuffer, 0, 0);
        
        // シーンが安定しているので、トランジションフラグをリセットしておく（念のため）
        transitionStarted = false;
    }
}
function switchScene(sceneObject) {
    if (targetScene !== sceneObject) {
        targetScene = sceneObject;
        addLog("Switched to Scene " + Object.keys(scenes).find(key => scenes[key] === sceneObject)); // addLogはutils.jsから参照
        targetScene.setupScene(targetBuffer);
        alpha = 255; // 新しいシーンへの遷移を開始
    }
}

function getCurrentScene() {
    return currentScene;
}

function getTargetScene() {
    return targetScene;
}