let scene12 = {
  settings: {
    cols: 3, // グリッドの列数
    rows: 3, // グリッドの行数
    blockSize: 0, // 各ブロックのサイズ
    rectangles: [], // 現在表示されている（古い）長方形の配列
    nextRectangles: [], // 次に表示される（新しい）長方形の配列
    animationStartTime: 0, // アニメーション開始時間
    animationDuration: 1000, // アニメーションの持続時間 (ミリ秒)
    bpmResetInterval: 4, // 4小節ごとにリセット
    beatCount: 0, // ビートカウンター
    lastBeatTime: 0, // 最後にビートを検出した時間
    backgroundColor: null,
  },

  // setupSceneにはp5.Graphicsインスタンス `g` が渡されることを想定
  setupScene(g) {
    // g.colorModeはp5.Graphicsのメソッド
    g.colorMode(g.HSL, 360, 100, 100, 1);
    // g.colorはp5.Graphicsのメソッド
    this.settings.backgroundColor = g.color(0, 0, 0, 0.08);
    // g.widthはp5.Graphicsのプロパティ
    this.settings.blockSize = g.width / this.settings.cols;

    // 初回はアニメーション無しで完全に描画された状態にする
    this.generateRectangles(g); // `g` を渡す
    this.settings.rectangles = [...this.settings.nextRectangles]; // nextRectanglesの内容を即座にrectanglesにコピー
    this.settings.nextRectangles = []; // nextRectanglesをクリア

    // millis()はグローバルスコープの関数
    this.settings.lastBeatTime = millis();
    this.settings.animationStartTime = millis() - this.settings.animationDuration;
  },

  // generateRectanglesにはp5.Graphicsインスタンス `g` が渡されることを想定
  generateRectangles(g) {
    this.settings.nextRectangles = [];
    let grid = Array(this.settings.rows).fill(0).map(() => Array(this.settings.cols).fill(false));

    let cellOrder = [];
    for (let r = 0; r < this.settings.rows; r++) {
      for (let c = 0; c < this.settings.cols; c++) {
        cellOrder.push({ r: r, c: c });
      }
    }
    // g.shuffleはp5.Graphicsのメソッドではない。グローバルスコープのshuffle関数か、カスタム実装を想定。
    // 仮にp5.jsのグローバルなshuffle()があるならそれを使う。
    // または、以下のように手動でシャッフルを実装。ここではp5.Graphicsインスタンスのrandomを使う。
    for (let i = cellOrder.length - 1; i > 0; i--) {
        const j = g.floor(g.random() * (i + 1)); // g.random, g.floorはp5.Graphicsのメソッド
        [cellOrder[i], cellOrder[j]] = [cellOrder[j], cellOrder[i]];
    }


    // 最初に1x2の長方形を優先的に配置
    for (let i = 0; i < cellOrder.length; i++) {
      let r = cellOrder[i].r;
      let c = cellOrder[i].c;

      if (!grid[r][c]) {
        let placed = false;

        if (g.random() < 0.5) { // g.randomはp5.Graphicsのメソッド
          if (c + 1 < this.settings.cols && !grid[r][c + 1]) {
            this.settings.nextRectangles.push({
              x: c * this.settings.blockSize,
              y: r * this.settings.blockSize,
              w: this.settings.blockSize * 2,
              h: this.settings.blockSize,
              color: g.color(g.random(360), g.random(70, 100), g.random(70, 100)), // g.color, g.randomはp5.Graphicsのメソッド
            });
            grid[r][c] = true;
            grid[r][c + 1] = true;
            placed = true;
          }
        }

        if (!placed) {
          if (r + 1 < this.settings.rows && !grid[r + 1][c]) {
            this.settings.nextRectangles.push({
              x: c * this.settings.blockSize,
              y: r * this.settings.blockSize,
              w: this.settings.blockSize,
              h: this.settings.blockSize * 2,
              color: g.color(g.random(360), g.random(70, 100), g.random(70, 100)),
            });
            grid[r][c] = true;
            grid[r + 1][c] = true;
            placed = true;
          }
        }
      }
    }

    // 埋まっていない部分を1x1で埋める（グリッドを再度順序よく走査）
    for (let r = 0; r < this.settings.rows; r++) {
      for (let c = 0; c < this.settings.cols; c++) {
        if (!grid[r][c]) {
          this.settings.nextRectangles.push({
            x: c * this.settings.blockSize,
            y: r * this.settings.blockSize,
            w: this.settings.blockSize,
            h: this.settings.blockSize,
            color: g.color(g.random(360), g.random(70, 100), g.random(70, 100)),
          });
          grid[r][c] = true;
        }
      }
    }
  },

  // drawSceneにはp5.Graphicsインスタンス `g` が渡されることを想定
  drawScene(g) {
    g.rectMode(g.CORNER);
    g.background(this.settings.backgroundColor); // g.backgroundはp5.Graphicsのメソッド
    g.noStroke(); // g.noStrokeはp5.Graphicsのメソッド

    // デバッグ用: bpmが未定義または0の場合の警告
    if (typeof bpm === 'undefined' || bpm === 0) {
      console.warn("Global variable 'bpm' is not defined or is 0. Scene updates might not occur.");
      // bpmがない場合はデフォルト値を使うことで、NaNを避けて描画を続行
      // ただし、音楽同期は行われません
      bpm = 120; // 仮のデフォルト値
    }

    // BPMに基づくリセット
    let beatDuration = 60000 / bpm; // bpmはグローバル、または上でデフォルト設定
    // millis()はグローバルスコープの関数
    let currentBeat = floor((millis() - this.settings.lastBeatTime) / beatDuration); // floorもグローバル

    if (currentBeat >= this.settings.bpmResetInterval) {
      if (this.settings.nextRectangles.length === 0) {
        this.settings.rectangles = [...this.settings.rectangles];
        this.generateRectangles(g); // `g` を渡す
        this.settings.animationStartTime = millis(); // millisはグローバル
      }
      this.settings.lastBeatTime = millis(); // millisはグローバル
    }

    let elapsedTime = millis() - this.settings.animationStartTime; // millisはグローバル
    // easeOut関数はグローバルスコープにあると仮定するため g. は不要
    let easedProgress = easeIn(elapsedTime, this.settings.animationDuration);

    // 既存の長方形を描画（古いもの）
    if (this.settings.nextRectangles.length === 0 || elapsedTime < this.settings.animationDuration) {
      for (let i = 0; i < this.settings.rectangles.length; i++) {
        let r = this.settings.rectangles[i];
        g.fill(r.color); // g.fillはp5.Graphicsのメソッド
        g.rect(r.x, r.y, r.w, r.h); // g.rectはp5.Graphicsのメソッド
      }
    }

    // 新しい長方形を重ねて描画（スケールアニメーション）
    if (elapsedTime < this.settings.animationDuration) {
      for (let i = 0; i < this.settings.nextRectangles.length; i++) {
        let r = this.settings.nextRectangles[i];
        g.fill(r.color);

        let currentWidth = g.map(easedProgress, 0, 1, 0, r.w); // g.mapはp5.Graphicsのメソッド
        g.rect(r.x, r.y, currentWidth, r.h);
      }
    } else { // アニメーションが完了した場合
      if (this.settings.nextRectangles.length > 0) {
        this.settings.rectangles = [...this.settings.nextRectangles];
        this.settings.nextRectangles = [];
      }
      for (let i = 0; i < this.settings.rectangles.length; i++) {
        let r = this.settings.rectangles[i];
        g.fill(r.color);
        g.rect(r.x, r.y, r.w, r.h);
      }
    }
  }
};