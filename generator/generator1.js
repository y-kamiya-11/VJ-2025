// generate_list.js

// --- addLog関数は不要なので削除 ---
// （純粋なログ出力なのでconsole.logを使います）

function generateWavyLengths(count = 150, minLen = 10, maxLen = 50, numWaves = 5) {
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
    "effect", "shader", "texture", "geometry", "particle", "visual", "graphic"
  ];

  const prefixes = [
    "INFO:", "DEBUG:", "WARNING:", "ERROR:", "SYSTEM:", "NETWORK:", "GPU:",
    "KERNEL:", "SERVICE:", "APP:", "LOG:", "STATUS:", "CLIENT:", "SERVER:",
    "PROCESS:", "CORE:", "CMD:", "TASK:", "AUDIO:", "VISUAL:"
  ];

  const suffixes = [
    "... [OK]", "... [DONE]", "... [SUCCESS]", "... [FAILED]", "... [ACTIVE]",
    "... [INACTIVE]", "... [RUNNING]", "... [STOPPED]", "... [COMPLETE]",
    "... [PENDING]", "... [VERIFIED]", "... [SYNCED]", "... [ERROR 404]",
    "... [WARNING 0xAB]", "... [INFO 0xCD]", "... [DATA AVAILABLE]",
    "... [RETRYING]", "... [OPTIMIZED]", "... [READY]"
  ];

  let message = "";
  message += prefixes[Math.floor(Math.random() * prefixes.length)] + " ";
  let remainingLength = length - message.length;

  if (remainingLength < 10) {
    message += words[Math.floor(Math.random() * 5)] + "...";
  } else {
    while (remainingLength > 5) {
      const word = words[Math.floor(Math.random() * words.length)];
      if (message.length + word.length + 1 < length) {
        message += word + " ";
        remainingLength = length - message.length;
      } else {
        break;
      }
    }
  }

  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  if (message.length + suffix.length <= length) {
    message = message.trim() + suffix;
  } else {
    message = message.substring(0, Math.max(0, length - suffix.length - 1)).trim() + " " + suffix;
  }

  if (message.length < length) {
    message = message + " ".repeat(length - message.length);
  } else if (message.length > length) {
    message = message.substring(0, length);
  }
  return message;
}

// --- ここから実行部分 ---
const numElements = 300;
const minLen = 10;
const maxLen = 50;
const numWaves = 4; // 波の数を調整して好みの見た目に

const lengths = generateWavyLengths(numElements, minLen, maxLen, numWaves);

const oneLineLoopList = [];
for (let i = 0; i < numElements; i++) {
  oneLineLoopList.push(generateLinuxLikeLog(lengths[i]));
}

// `oneLineFirstPassList` 用に300行のログを生成することも可能
const oneLineFirstPassList = [];
// 例えば、ファーストパスは文字数を固定にする、など調整できます
const firstPassLengths = generateWavyLengths(300, 40, 60, 2); // 長さを少し長く、波を少なく
for(let i = 0; i < 300; i++) {
    oneLineFirstPassList.push(generateLinuxLikeLog(firstPassLengths[i]));
}


// `JSON.stringify` で整形してコンソールに出力
console.log("// --- oneLineList (ループ用) ---");
console.log("const oneLineList = " + JSON.stringify(oneLineLoopList, null, 2) + ";");
console.log("\n// --- oneLineFirstPassList (最初の一周用) ---");
console.log("const oneLineFirstPassList = " + JSON.stringify(oneLineFirstPassList, null, 2) + ";");

// 必要であれば、他のリストもここで生成して出力できます