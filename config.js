// config.js
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const TRANSITION_SPEED = 5;
const GLOW_DECAY_SPEED = 11;
const OVERLAY_DURATION = 5000; // ミリ秒
const SHAPE_OVERLAY_LIFE_SPAN = 50; // フレーム数
const DEFAULT_FRAME_RATE = 60;
const ACCELERATED_FRAME_RATE = 120;
const DECELERATED_FRAME_RATE = 24;

// キーコードの定数
const KEY_ONE = 49;
const KEY_TWO = 50;
const KEY_THREE = 51;
const KEY_FOUR = 52;
const KEY_FIVE = 53;
const KEY_SIX = 54;
const KEY_SEVEN = 55;
const KEY_EIGHT = 56;
const KEY_NINE = 57;
const KEY_D = 68;
const KEY_F = 70;
const KEY_J = 74;
const KEY_K = 75;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_BACKSPACE = 8;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

// 初期シーンの設定
let initialScene = scene6;

// シーンオブジェクトのマッピング
const scenes = {
    '1': scene1,
    '2': scene2,
    '3': scene3,
    '4': scene4,
    '5': scene5,
    '6': scene6,
    '7': scene7,
    '8': scene8,
};