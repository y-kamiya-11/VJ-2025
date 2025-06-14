let scene11 = {
  settings: {
    backgroundColor: null,
    rectangles: [], // 枠線のみの長方形を格納
    squares: [], // 新しい塗りつぶしの正方形を格納
    lastThinRectTime: 0, // 最後に細い枠線の長方形が生成された時間
    lastThickRectTime: 0, // 最後に太い枠線の長方形が生成された時間
    lastSquareTime: 0, // 最後に正方形が生成された時間
    oneBarInterval: 0, // 1小節の時間の長さ
    twoBarInterval: 0, // 2小節の時間の長さ
    oneBeatInterval: 0, // 1拍の時間の長さ
    maxBars: 16 // 描画する最大小節数 (16小節に変更)
  },

  setupScene(g) {
    this.settings.backgroundColor = g.color(0); // 黒背景
    // 1小節の時間の長さを計算 (ミリ秒)
    // 1拍のミリ秒数 = 60000 / bpm
    // 1小節の拍数を4拍と仮定
    this.settings.oneBeatInterval = (60000 / bpm); // 1拍の長さ
    this.settings.oneBarInterval = this.settings.oneBeatInterval * 4; // 1小節の長さ
    this.settings.twoBarInterval = this.settings.oneBarInterval * 2; // 2小節の長さ
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.rectMode(g.CENTER); // 四角形を中央揃えで描画

    // === 枠線のみの長方形の生成 ===
    // 1小節ごとに細い枠線の長方形を追加
    if (millis() - this.settings.lastThinRectTime > this.settings.oneBarInterval) {
      this.settings.rectangles.push({
        type: 'rect',
        birthTime: millis(), // 生成された時間
        initialScale: g.width, // 初期スケールは画面幅と同じ
        strokeWeight: 1 // 細い枠線
      });
      this.settings.lastThinRectTime = millis();
    }

    // 2小節ごとに太い枠線の長方形を追加
    if (millis() - this.settings.lastThickRectTime > this.settings.twoBarInterval) {
      this.settings.rectangles.push({
        type: 'rect',
        birthTime: millis(), // 生成された時間
        initialScale: g.width, // 初期スケールは画面幅と同じ
        strokeWeight: 5 // 太い枠線
      });
      this.settings.lastThickRectTime = millis();
    }

    // === 塗りつぶしの正方形の生成 ===
    // 1拍ごとに正方形を追加
    if (millis() - this.settings.lastSquareTime > this.settings.oneBeatInterval) {
      this.settings.squares.push({
        type: 'square',
        birthTime: millis(), // 生成された時間
        initialScale: g.width / 5, // 初期スケール（画面幅の1/5程度）
        x: g.random(g.width), // ランダムなX座標
        y: g.random(g.height), // ランダムなY座標
        fillColor: g.color(g.random(180, 240), 100, 100) // 水色～青のランダムな色相
      });
      this.settings.lastSquareTime = millis();
    }

    // === 各長方形の描画と更新 ===
    for (let i = 0; i < this.settings.rectangles.length; i++) {
      let rect = this.settings.rectangles[i];
      let elapsedTime = millis() - rect.birthTime; // 生成されてからの経過時間

      // スケールを計算
      let currentScale = rect.initialScale / (1 + elapsedTime * 0.005); // 0.005は調整可能な減衰速度の係数

      // 16小節を超えたものは描画しない
      if (elapsedTime / this.settings.oneBarInterval > this.settings.maxBars) {
        continue; // 描画スキップ
      }

      g.noFill(); // 塗りなし
      g.stroke(255); // 白い枠線
      g.strokeWeight(rect.strokeWeight); // 枠線の太さを設定
      g.rect(g.width / 2, g.height / 2, currentScale, currentScale);
    }

    // === 各正方形の描画と更新 ===
    for (let i = 0; i < this.settings.squares.length; i++) {
      let square = this.settings.squares[i];
      let elapsedTime = millis() - square.birthTime; // 生成されてからの経過時間

      // スケールを計算
      let currentScale = square.initialScale / (1 + elapsedTime * 0.008); // 減衰速度は調整可能（長方形とは別）

      // 画面の中心に向かって移動するベクトルを計算
      let targetX = g.width / 2;
      let targetY = g.height / 2;
      let moveAmount = elapsedTime * 0.0005; // 移動速度を調整する係数
      
      // 現在位置から目標位置までの距離に応じた移動
      let dx = targetX - square.x;
      let dy = targetY - square.y;
      
      // 移動量を制限し、ゆっくりと中心に近づくようにする
      square.x += dx * 0.02; // 0.02は移動の追従速度（調整可能）
      square.y += dy * 0.02;

      // 16小節を超えたものは描画しない
      if (elapsedTime / this.settings.oneBarInterval > this.settings.maxBars) {
        continue; // 描画スキップ
      }
      
      g.noStroke(); // 枠なし
      g.fill(square.fillColor); // 塗りつぶし色
      g.rect(square.x, square.y, currentScale, currentScale);
    }

    // === 16小節を超えたものをリストから破棄 ===
    this.settings.rectangles = this.settings.rectangles.filter(rect => {
      const elapsedTime = millis() - rect.birthTime;
      return (elapsedTime / this.settings.oneBarInterval) <= this.settings.maxBars;
    });

    this.settings.squares = this.settings.squares.filter(square => {
      const elapsedTime = millis() - square.birthTime;
      return (elapsedTime / this.settings.oneBarInterval) <= this.settings.maxBars;
    });
  }
};