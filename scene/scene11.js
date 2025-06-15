// イージング関数は別ファイルに定義されていることを想定しています
// function easeIn(time, maxTime, power = 4) { ... }
// function easeOut(time, maxTime, power = 4) { ... }
// function easeInOut(time, maxTime, power = 4) { ... }

// グローバル変数 (p5.jsのスケッチ内で定義されていることを想定)
// let lastSectionMillis = 0; // 最新の小節頭のmillisを保存する変数
// let lastBeatMillis = 0; // 最新の拍頭のmillisを保存する変数
// let currentBeat = 0; // 現在の拍数 (0-3で1,2,3,4拍目を表す)
// let bpm = 120; // グローバルでBPMが管理されていることを想定
// let intensity = 0; // 追加: グローバルなintensity変数 (0～150)

let scene11 = {
  settings: {
    backgroundColor: null,
    rectangles: [], // 枠線のみの長方形を格納
    squares: [], // 新しい塗りつぶしの正方形を格納
    tinySquares: [], // 追加: ランダムな小さな白い正方形 (パーティクル) を格納
    oneBarInterval: 0, // 1小節の時間の長さ (ミリ秒)
    twoBarInterval: 0, // 2小節の時間の長さ (ミリ秒)
    oneBeatInterval: 0, // 1拍の時間の長さ (ミリ秒)
    maxBars: 16, // 描画する最大小節数

    // パーティクル関連の設定
    // tinySquareGenerationChance: 0.1, // intensityに基づいて動的に計算するため削除
    tinySquareInitialSize: 4, // パーティクルの初期サイズ
    tinySquareDecayRate: 0.02, // パーティクルの縮小速度
    tinySquareMoveSpeed: 0.05, // パーティクルの中心への移動速度
    tinySquareLifeTimeMillis: 3000, // パーティクルの生存期間 (ミリ秒)
  },

  // 内部状態管理変数（重複生成防止用）
  _lastGeneratedThinRectBarIndex: -1,
  _lastGeneratedThickRectBarIndex: -1,
  _lastGeneratedSquareBeatState: { beat: -1, bar: -1 },

  setupScene(g) {
    this.settings.backgroundColor = g.color(0); // 黒背景
    if (typeof bpm === 'undefined' || bpm === 0) {
      console.warn("Global variable 'bpm' is not defined or is 0. Scene updates might not occur.");
      bpm = 120; // 仮のデフォルト値
    }

    this.settings.oneBeatInterval = (60000 / bpm);
    this.settings.oneBarInterval = this.settings.oneBeatInterval * 4;
    this.settings.twoBarInterval = this.settings.oneBarInterval * 2;

    const initialBarIndex = floor(lastSectionMillis / this.settings.oneBarInterval);
    this._lastGeneratedThinRectBarIndex = initialBarIndex - 1;
    const initialTwoBarIndex = floor(lastSectionMillis / this.settings.twoBarInterval);
    this._lastGeneratedThickRectBarIndex = initialTwoBarIndex - 1;

    // 正方形の生成初期状態を設定 (最初の描画ループで確実に生成されるように調整)
    if (currentBeat === 0 && initialBarIndex === 0) {
        this._lastGeneratedSquareBeatState = { beat: 3, bar: -1 };
    } else if (currentBeat === 0) {
        this._lastGeneratedSquareBeatState = { beat: 3, bar: initialBarIndex - 1 };
    } else {
        this._lastGeneratedSquareBeatState = { beat: currentBeat - 1, bar: initialBarIndex };
    }

    // パーティクルの配列をクリア（シーンのリセット時など）
    this.settings.tinySquares = [];
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.rectMode(g.CENTER);

    const currentTime = millis();
    const currentBarIndex = floor(lastSectionMillis / this.settings.oneBarInterval);
    const currentTwoBarIndex = floor(lastSectionMillis / this.settings.twoBarInterval);

    // --- オブジェクト生成ロジック ---

    // === 枠線のみの長方形の生成 (1小節ごと) ===
    if (currentBarIndex > this._lastGeneratedThinRectBarIndex) {
      this.settings.rectangles.push({
        type: 'rect',
        birthTime: lastSectionMillis,
        initialScale: g.width,
        strokeWeight: 4
      });
      this._lastGeneratedThinRectBarIndex = currentBarIndex;
    }

    // === 枠線のみの長方形の生成 (2小節ごと) ===
    if (currentTwoBarIndex > this._lastGeneratedThickRectBarIndex) {
      this.settings.rectangles.push({
        type: 'rect',
        birthTime: lastSectionMillis,
        initialScale: g.width,
        strokeWeight: 10
      });
      this._lastGeneratedThickRectBarIndex = currentTwoBarIndex;
    }

    // === 塗りつぶしの正方形の生成 (1拍ごと) ===
    const isNewBeat = (currentBeat !== this._lastGeneratedSquareBeatState.beat) ||
                      (currentBarIndex !== this._lastGeneratedSquareBeatState.bar);

    if (isNewBeat) {
      this.settings.squares.push({
        type: 'square',
        birthTime: lastBeatMillis,
        initialScale: g.width / 5,
        x: g.random(g.width),
        y: g.random(g.height),
        fillColor: g.color(g.random(180, 240), 100, 100) // 水色～青のランダムな色相
      });
      this._lastGeneratedSquareBeatState = { beat: currentBeat, bar: currentBarIndex };
    }

    // --- 追加: 小さな白い正方形 (パーティクル) のランダム生成 ---
    // intensityに基づいて生成確率を動的に計算
    // intensity: 0-150 -> 確率: 0.0-1.0 にマッピング
    // 例えば、intensityが0のときは確率0、intensityが150のときは最大確率 (ここでは0.5) になるように調整
    // g.map(value, start1, stop1, start2, stop2) を使用
    // 最大確率を0.5（50%）と仮定。これにより、生成されすぎず、パフォーマンスも考慮。
    const mappedIntensity = g.map(intensity, 0, 150, 0.0, 0.5); // 0.0～0.5の間で確率を変化
    const currentTinySquareGenerationChance = mappedIntensity;

    if (g.random() < currentTinySquareGenerationChance) {
      this.settings.tinySquares.push({
        birthTime: currentTime,
        initialSize: this.settings.tinySquareInitialSize,
        x: g.random(g.width), // 画面全体からランダムな位置
        y: g.random(g.height),
        color: g.color(255) // 白色
      });
    }


    // --- 各種オブジェクトの描画と更新 ---

    // === 追加: 小さな白い正方形 (パーティクル) の描画と更新 (描画順序を下に) ===
    g.noStroke(); // パーティクルは枠線なし
    for (let i = 0; i < this.settings.tinySquares.length; i++) {
      let tinySquare = this.settings.tinySquares[i];
      let elapsedTime = currentTime - tinySquare.birthTime;

      // 寿命が尽きたら描画スキップ
      if (elapsedTime > this.settings.tinySquareLifeTimeMillis) {
        continue;
      }

      // スケールを徐々に小さくする (スケールアウト)
      let normalizedTime = elapsedTime / this.settings.tinySquareLifeTimeMillis;
      let currentSize = tinySquare.initialSize * (1 - normalizedTime * this.settings.tinySquareDecayRate * 10);
      currentSize = g.max(0.1, currentSize);

      // 不透明度も時間と共に減衰
      let alpha = g.map(elapsedTime, 0, this.settings.tinySquareLifeTimeMillis, 255, 0);
      g.fill(tinySquare.color, alpha);

      // 中心に向かって移動
      let targetX = g.width / 2;
      let targetY = g.height / 2;
      tinySquare.x += (targetX - tinySquare.x) * this.settings.tinySquareMoveSpeed;
      tinySquare.y += (targetY - tinySquare.y) * this.settings.tinySquareMoveSpeed;

      g.rect(tinySquare.x, tinySquare.y, currentSize, currentSize);
    }


    // === 既存の長方形の描画と更新 ===
    for (let i = 0; i < this.settings.rectangles.length; i++) {
      let rect = this.settings.rectangles[i];
      let elapsedTime = currentTime - rect.birthTime;
      let currentScale = rect.initialScale / (1 + elapsedTime * 0.005);

      if (elapsedTime / this.settings.oneBarInterval > this.settings.maxBars) {
        continue;
      }

      g.noFill();
      g.stroke(255);
      g.strokeWeight(rect.strokeWeight);
      g.rect(g.width / 2, g.height / 2, currentScale, currentScale);
    }

    // === 既存の塗りつぶし正方形の描画と更新 ===
    for (let i = 0; i < this.settings.squares.length; i++) {
      let square = this.settings.squares[i];
      let elapsedTime = currentTime - square.birthTime;
      let currentScale = square.initialScale / (1 + elapsedTime * 0.008);

      let targetX = g.width / 2;
      let targetY = g.height / 2;
      square.x += (targetX - square.x) * 0.02;
      square.y += (targetY - square.y) * 0.02;

      if (elapsedTime / this.settings.oneBarInterval > this.settings.maxBars) {
        continue;
      }

      g.noStroke();
      g.fill(square.fillColor);
      g.rect(square.x, square.y, currentScale, currentScale);
    }

    // --- 不要になったオブジェクトのリストからの破棄 ---
    this.settings.rectangles = this.settings.rectangles.filter(rect => {
      const elapsedTime = currentTime - rect.birthTime;
      return (elapsedTime / this.settings.oneBarInterval) <= this.settings.maxBars;
    });

    this.settings.squares = this.settings.squares.filter(square => {
      const elapsedTime = currentTime - square.birthTime;
      return (elapsedTime / this.settings.oneBarInterval) <= this.settings.maxBars;
    });

    // パーティクルの寿命が尽きたものを破棄
    this.settings.tinySquares = this.settings.tinySquares.filter(tinySquare => {
      const elapsedTime = currentTime - tinySquare.birthTime;
      return elapsedTime <= this.settings.tinySquareLifeTimeMillis;
    });

    // デバッグ表示 (オプション)
    // g.fill(255);
    // g.textSize(20);
    // g.textAlign(LEFT, TOP);
    // g.text(`currentBeat: ${currentBeat}`, 20, 20);
    // g.text(`lastBeatMillis: ${lastBeatMillis.toFixed(0)}`, 20, 40);
    // g.text(`lastSectionMillis: ${lastSectionMillis.toFixed(0)}`, 20, 60);
    // g.text(`currentBarIndex: ${currentBarIndex}`, 20, 80);
    // g.text(`_lastGeneratedSquareBeatState: {beat: ${this._lastGeneratedSquareBeatState.beat}, bar: ${this._lastGeneratedSquareBeatState.bar}}`, 20, 100);
    // g.text(`Num Rects: ${this.settings.rectangles.length}`, 20, 120);
    // g.text(`Num Squares: ${this.settings.squares.length}`, 20, 140);
    // g.text(`Num Tiny Squares: ${this.settings.tinySquares.length}`, 20, 160);
    // g.text(`Intensity: ${intensity}`, 20, 180); // intensityの値を表示
    // g.text(`Chance: ${currentTinySquareGenerationChance.toFixed(2)}`, 20, 200); // 計算された生成確率を表示
  }
};