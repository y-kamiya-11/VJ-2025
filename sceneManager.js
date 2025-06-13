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

function updateAndDrawScenes() {
    if (currentScene !== targetScene || alpha <= 50) {
        alpha -= transitionSpeed;

        if (alpha <= 0) {
            currentScene = targetScene;
            targetScene.drawScene(targetBuffer);
            currentScene.drawScene(currentBuffer);
            image(targetBuffer, 0, 0);

            if (alpha <= -100) {
                alpha = 255;
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
        currentScene.drawScene(currentBuffer);
        image(currentBuffer, 0, 0);
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