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
const KEY_M = 77;
const KEY_N = 78;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_BACKSPACE = 8;
const LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_C = 67; // 'C'キー
const KEY_V = 86; // 'V'キー

// BPM設定
const BPM_INITIAL = 120;
const BPM_MIN = 30;
const BPM_MAX = 300;
const TAP_HISTORY_DURATION = 15000; // Mキーの履歴を保持する期間 (ミリ秒)

// ブロックノイズ設定
const BLOCK_NOISE_RECT_COUNT = 80;
const BLOCK_NOISE_RECT_SIZE_MIN = 3;
const BLOCK_NOISE_RECT_SIZE_MAX = 250;
const BLOCK_NOISE_DISPLACEMENT = 50; // Vキーでずらすピクセル数
const BLOCK_NOISE_SIZE_BIAS_POWER = 2.0; // 1を境に大きいほど大きい値、小さいほど小さい値が出やすくなる

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