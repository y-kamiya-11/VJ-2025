let logMessages = [];

function addLog(message) {
  logMessages.push({
    text: message,
    createdAt: millis()
  });
}

function drawLogs() {
  let now = millis();
  let displayDuration = 10000;
  let fadeDuration = 3000;
  let lineHeight = 50;
  let y = height - 10;

  textAlign(LEFT, BOTTOM);
  textSize(48);
  noStroke();

  // 入力中の文字列を一番下に描画
  fill(255, 255, 255, alpha);
  text(inputBuffer, 10, y);
  y -= lineHeight;

  // ログメッセージを最新のものから順に描画
  for (let i = logMessages.length - 1; i >= 0; i--) {
    let msg = logMessages[i];
    let age = now - msg.createdAt;
    let alpha = 100;

    if (age > displayDuration) {
      alpha = map(age, displayDuration, displayDuration + fadeDuration, 100, 0);
      if (alpha <= 0) {
        logMessages.splice(i, 1); // 生存時間を過ぎた要素はlogMessagesから削除
        continue;
      }
    }

    fill(255, 255, 255, alpha);
    text(msg.text, 10, y);
    y -= lineHeight;
  }
}