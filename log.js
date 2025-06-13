let logMessages = [];

function addLog(message) {
  logMessages.push({
    text: message,
    createdAt: millis()
  });
}

function drawLogs(alpha=100) {
  let now = millis();
  let displayDuration = 10000;
  let fadeDuration = 3000;
  let lineHeight = 50;
  let y = height - 10;

  textAlign(LEFT, BOTTOM);
  textSize(48);
  noStroke();

  // 現在の背景色取得（デフォルト黒）
  let bg = currentScene.settings?.backgroundColor || color(0);
  let brightnessValue = brightness(bg);

  // 背景の明るさに応じて文字色決定
  let textCol = (brightnessValue > 50) ? color(0) : color(255);

  // 入力中の文字列を一番下に描画
  textCol.setAlpha(alpha);
  fill(textCol);
  text(getInputBuffer(), 10, y);
  y -= lineHeight;

  // ログメッセージを最新のものから順に描画
  for (let i = logMessages.length - 1; i >= 0; i--) {
    let msg = logMessages[i];
    let age = now - msg.createdAt;

    if (age > displayDuration) {
      alpha = map(age, displayDuration, displayDuration + fadeDuration, 100, 0);
      if (alpha <= 0) {
        logMessages.splice(i, 1); // 生存時間を過ぎた要素はlogMessagesから削除
        continue;
      }
    }

    textCol.setAlpha(alpha);
    fill(textCol);
    text(msg.text, 10, y);
    y -= lineHeight;
  }
}