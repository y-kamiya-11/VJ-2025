// generate_list.js

// --- 既存の generateWavyLengths 関数を再掲 (変更なし) ---
function generateWavyLengths(count = 200, minLen = 20, maxLen = 60, numWaves = 4) {
  const lengths = [];
  const amplitude = (maxLen - minLen) / 2;
  const offset = minLen + amplitude;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * (Math.PI * 2 * numWaves);
    const length = Math.round(offset + amplitude * Math.sin(angle));
    lengths.push(length);
  }
  return lengths;
}

// --- 既存の generateLinuxLikeLog 関数を再掲 (変更なし) ---
function generateLinuxLikeLog(length) {
  const words = [
    "status", "process", "system", "kernel", "network", "device", "driver",
    "module", "memory", "storage", "service", "daemon", "client", "server",
    "update", "install", "remove", "config", "check", "verify", "load", "unload",
    "buffer", "stream", "packet", "error", "warning", "info", "debug", "log",
    "sync", "init", "start", "stop", "restart", "monitor", "execute", "task",
    "data", "transfer", "receive", "send", "generate", "render", "display",
    "audio", "video", "midi", "osc", "dmx", "gpu", "cpu", "io", "temp", "time",
    "uptime", "resource", "alloc", "free", "complete", "pending", "success", "fail",
    "report", "message", "event", "user", "admin", "connect", "disconnect",
    "authenticate", "secure", "encrypted", "decrypt", "compress", "decompress",
    "optimize", "calibrate", "reset", "enable", "disable", "activate", "deactivate",
    "analyze", "spectrum", "frequency", "amplitude", "volume", "gain", "filter",
    "effect", "shader", "texture", "geometry", "particle", "visual", "graphic",
    "component", "subsystem", "integrity", "validation", "telemetry", "firmware",
    "diagnostic", "calibration", "snapshot", "telecom", "interface", "protocol",
    "encryption", "compression", "throughput", "latency", "bandwidth", "routing",
    "firewall", "security", "privilege", "authorization", "handshake", "session",
    "snapshot", "archive", "restore", "backup", "recovery", "migration", "provision",
    "orchestrate", "deploy", "rollback", "version", "release", "patch", "hotfix",
    "baseline", "metric", "indicator", "threshold", "alert", "notification", "event",
    "stream", "pipeline", "queue", "thread", "process", "instance", "container",
    "virtual", "physical", "abstract", "concrete", "mapping", "transform", "morph",
    "deform", "fractal", "procedural", "generative", "interactive", "realtime",
    "synchronize", "asynchronous", "parallel", "sequential", "recursive", "iterative"
  ];

  const prefixes = [
    "INFO:", "DEBUG:", "WARNING:", "ERROR:", "SYSTEM:", "NETWORK:", "GPU:",
    "KERNEL:", "SERVICE:", "APP:", "LOG:", "STATUS:", "CLIENT:", "SERVER:",
    "PROCESS:", "CORE:", "CMD:", "TASK:", "AUDIO:", "VISUAL:", "DATA:", "IO:",
    "SECURITY:", "ALERT:", "SYNC:", "INIT:", "UPDATE:", "COMPUTING:", "ANALYZE:",
    "RENDER:", "DISPLAY:", "EFFECT:"
  ];

  const suffixes = [
    "... [OK]", "... [DONE]", "... [SUCCESS]", "... [FAILED]", "... [ACTIVE]",
    "... [INACTIVE]", "... [RUNNING]", "... [STOPPED]", "... [COMPLETE]",
    "... [PENDING]", "... [VERIFIED]", "... [SYNCED]", "... [ERROR 404]",
    "... [WARNING 0xAB]", "... [INFO 0xCD]", "... [DATA AVAILABLE]",
    "... [RETRYING]", "... [OPTIMIZED]", "... [READY]", "... [PROCESSING]",
    "... [INITIALIZING]", "... [CONNECTED]", "... [DISCONNECTED]", "... [NO DATA]",
    "... [CRITICAL]", "... [NOMINAL]", "... [ADJUSTED]", "... [FLUSHED]"
  ];

  let message = "";
  message += prefixes[Math.floor(Math.random() * prefixes.length)] + " ";
  let remainingLength = length - message.length;

  // 短いメッセージ用のベース
  if (remainingLength < 10) {
    message += words[Math.floor(Math.random() * 5)] + "..."; // 最初の数個の短い単語から
  } else {
    // 繰り返し単語を追加して文字数を稼ぐ
    while (remainingLength > 5) { // 少なくとも5文字以上残っている間は単語を追加
      const word = words[Math.floor(Math.random() * words.length)];
      if (message.length + word.length + 1 < length) { // スペース込みで収まるかチェック
        message += word + " ";
        remainingLength = length - message.length;
      } else {
        break; // 入りきらない場合は終了
      }
    }
  }

  // 最後にサフィックスを追加 (文字数制限内で)
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  if (message.length + suffix.length <= length) {
    message = message.trim() + suffix; // 余分なスペースを削除してから追加
  } else {
    // サフィックスが入りきらない場合は、メッセージを切り詰めるか、サフィックスの一部を使う
    message = message.substring(0, Math.max(0, length - suffix.length - 1)).trim() + " " + suffix;
  }

  // 最終調整: 指定された文字数にパディングまたは切り詰め
  if (message.length < length) {
    message = message + " ".repeat(length - message.length);
  } else if (message.length > length) {
    message = message.substring(0, length);
  }
  return message;
}


// --- oneLineList (ループ用) ---
// const numElementsOneLine = 300;
// const oneLineLengths = generateWavyLengths(numElementsOneLine, 10, 50, 4);
// const oneLineLoopList = [];
// for (let i = 0; i < numElementsOneLine; i++) {
//   oneLineLoopList.push(generateLinuxLikeLog(oneLineLengths[i]));
// }
// console.log("// --- oneLineList (ループ用) ---");
// console.log("const oneLineList = " + JSON.stringify(oneLineLoopList, null, 2) + ";");


// --- oneLineFirstPassList (最初の一周用) ---
// const numElementsFirstPass = 300;
// const firstPassLengths = generateWavyLengths(numElementsFirstPass, 40, 60, 2);
// const oneLineFirstPassList = [];
// for(let i = 0; i < numElementsFirstPass; i++) {
//     oneLineFirstPassList.push(generateLinuxLikeLog(firstPassLengths[i]));
// }
// console.log("\n// --- oneLineFirstPassList (最初の一周用) ---");
// console.log("const oneLineFirstPassList = " + JSON.stringify(oneLineFirstPassList, null, 2) + ";");


// --- fourLineList (ループ用) ---
const numFourLineBlocks = 50; // 4行 x 50ブロック = 200行
const minLineLength = 20;
const maxLineLength = 60;
const numWavesFourLine = 4; // 全体としての波の数

const fourLineLoopList = [];

// 全体の波を生成するための基準となる文字長リスト
const baseLengths = generateWavyLengths(numFourLineBlocks, minLineLength, maxLineLength, numWavesFourLine);

for (let i = 0; i < numFourLineBlocks; i++) {
  const block = [];
  const baseLen = baseLengths[i]; // このブロックの基準となる文字長

  // 4行それぞれに、基準文字長から少しずらした文字長を割り当てる
  // 例えば、baseLenを中心に±5文字程度の範囲で散らばせる
  block.push(generateLinuxLikeLog(Math.max(minLineLength, baseLen + Math.floor(Math.random() * 10) - 5)));
  block.push(generateLinuxLikeLog(Math.max(minLineLength, baseLen + Math.floor(Math.random() * 10) - 5)));
  block.push(generateLinuxLikeLog(Math.max(minLineLength, baseLen + Math.floor(Math.random() * 10) - 5)));
  block.push(generateLinuxLikeLog(Math.max(minLineLength, baseLen + Math.floor(Math.random() * 10) - 5)));

  fourLineLoopList.push(block);
}

console.log("\n// --- fourLineList (ループ用) ---");
console.log("const fourLineList = " + JSON.stringify(fourLineLoopList, null, 2) + ";");


// --- fourLineFirstPassList (最初の一周用) ---
const numFourLineFirstPassBlocks = 50; // 4行 x 50ブロック = 200行
const firstPassMinLen = 40; // ファーストパスは長めに
const firstPassMaxLen = 60;
const numWavesFirstPassFourLine = 2; // 波の数を少なく

const fourLineFirstPassList = [];
const firstPassBaseLengths = generateWavyLengths(numFourLineFirstPassBlocks, firstPassMinLen, firstPassMaxLen, numWavesFirstPassFourLine);

for (let i = 0; i < numFourLineFirstPassBlocks; i++) {
    const block = [];
    const baseLen = firstPassBaseLengths[i];
    block.push(generateLinuxLikeLog(Math.max(firstPassMinLen, baseLen + Math.floor(Math.random() * 10) - 5)));
    block.push(generateLinuxLikeLog(Math.max(firstPassMinLen, baseLen + Math.floor(Math.random() * 10) - 5)));
    block.push(generateLinuxLikeLog(Math.max(firstPassMinLen, baseLen + Math.floor(Math.random() * 10) - 5)));
    block.push(generateLinuxLikeLog(Math.max(firstPassMinLen, baseLen + Math.floor(Math.random() * 10) - 5)));
    fourLineFirstPassList.push(block);
}

console.log("\n// --- fourLineFirstPassList (最初の一周用) ---");
console.log("const fourLineFirstPassList = " + JSON.stringify(fourLineFirstPassList, null, 2) + ";");