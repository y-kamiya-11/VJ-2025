// イージング関数は別ファイルに定義されていることを想定しています
// function easeIn(time, maxTime, power = 4) { ... }
// function easeOut(time, maxTime, power = 4) { ... }
// function easeInOut(time, maxTime, power = 4) { ... }

// グローバル変数 (p5.jsのスケッチ内で定義されていることを想定)
// let lastSectionMillis = 0; // 小節頭のmillisを保存する変数
// let lastBeatMillis = 0;
// let currentBeat = 0;
// let bpm = 120; // BPMもグローバルで定義されていることを想定

let scene12 = {
  settings: {
    cols: 3, // グリッドの列数
    rows: 3, // グリッドの行数
    blockSize: 0, // 各ブロックのサイズ
    rectangles: [], // 現在表示されている（古い）長方形の配列
    nextRectangles: [], // 次に表示される（新しい）長方形の配列
    animationStartTime: 0, // アニメーション開始時間
    animationDuration: 1000, // アニメーションの持続時間 (ミリ秒)
    // bpmResetInterval: 4, // lastSectionMillis を使うため不要
    // beatCount: 0, // lastSectionMillis を使うため不要
    // lastBeatTime: 0, // lastSectionMillis を使うため不要
    backgroundColor: null,
  },

  // scene12の状態を管理するための内部変数
  _lastTriggeredSectionMillis: 0, // 最後にアニメーションをトリガーした小節頭のmillis

  // setupSceneにはp5.Graphicsインスタンス `g` が渡されることを想定
  setupScene(g) {
    g.colorMode(g.HSL, 360, 100, 100, 1);
    this.settings.backgroundColor = g.color(0, 0, 0, 0.08);
    this.settings.blockSize = g.width / this.settings.cols;

    // 初回はアニメーション無しで完全に描画された状態にする
    this.generateRectangles(g); // `g` を渡す
    this.settings.rectangles = [...this.settings.nextRectangles]; // nextRectanglesの内容を即座にrectanglesにコピー
    this.settings.nextRectangles = []; // nextRectanglesをクリア

    // 初期化時にlastSectionMillisと同期
    // scene12が初めてセットアップされる際、直前の小節頭に同期させる
    // これにより、シーン開始直後からlastSectionMillisに基づいたアニメーションができる
    this._lastTriggeredSectionMillis = lastSectionMillis;
    this.settings.animationStartTime = lastSectionMillis; // アニメーション開始時刻も小節頭に同期
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
    // ここでp5.Graphicsインスタンスのrandomを使うシャッフルを再度確認
    for (let i = cellOrder.length - 1; i > 0; i--) {
      const j = g.floor(g.random() * (i + 1));
      [cellOrder[i], cellOrder[j]] = [cellOrder[j], cellOrder[i]];
    }

    // 最初に1x2の長方形を優先的に配置
    for (let i = 0; i < cellOrder.length; i++) {
      let r = cellOrder[i].r;
      let c = cellOrder[i].c;

      if (!grid[r][c]) {
        let placed = false;

        if (g.random() < 0.5) {
          if (c + 1 < this.settings.cols && !grid[r][c + 1]) {
            this.settings.nextRectangles.push({
              x: c * this.settings.blockSize,
              y: r * this.settings.blockSize,
              w: this.settings.blockSize * 2,
              h: this.settings.blockSize,
              color: g.color(g.random(360), g.random(70, 100), g.random(70, 100)),
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
    g.background(this.settings.backgroundColor);
    g.noStroke();

    // デバッグ用: bpmが未定義または0の場合の警告
    if (typeof bpm === 'undefined' || bpm === 0) {
      console.warn("Global variable 'bpm' is not defined or is 0. Scene updates might not occur.");
      bpm = 120; // 仮のデフォルト値
    }

    // グローバル変数 lastSectionMillis を使用して、小節の切り替わりを検出
    // lastSectionMillis が更新された（新しい小節に入った）らアニメーションを開始
    if (lastSectionMillis !== this._lastTriggeredSectionMillis) {
      // 次の長方形セットがまだ準備できていない場合は生成
      if (this.settings.nextRectangles.length === 0) {
        this.settings.rectangles = [...this.settings.rectangles]; // 現在のものを古いものとして保持
        this.generateRectangles(g); // 新しい長方形セットを生成
      }
      this.settings.animationStartTime = lastSectionMillis; // アニメーション開始時刻を新しい小節頭に同期
      this._lastTriggeredSectionMillis = lastSectionMillis; // トリガーした小節頭を記録
    }

    // アニメーションの経過時間と進捗を計算
    let elapsedTime = millis() - this.settings.animationStartTime;
    let easedProgress = easeIn(elapsedTime, this.settings.animationDuration);

    // 既存の長方形を描画（古いもの）
    // nextRectanglesが空の場合、またはアニメーション中に既存のものを描画
    if (this.settings.nextRectangles.length === 0 || elapsedTime < this.settings.animationDuration) {
      for (let i = 0; i < this.settings.rectangles.length; i++) {
        let r = this.settings.rectangles[i];
        g.fill(r.color);
        g.rect(r.x, r.y, r.w, r.h);
      }
    }

    // 新しい長方形を重ねて描画（スケールアニメーション）
    if (elapsedTime < this.settings.animationDuration) {
      for (let i = 0; i < this.settings.nextRectangles.length; i++) {
        let r = this.settings.nextRectangles[i];
        g.fill(r.color);

        let currentWidth = g.map(easedProgress, 0, 1, 0, r.w);
        g.rect(r.x, r.y, currentWidth, r.h);
      }
    } else { // アニメーションが完了した場合
      // アニメーション完了時にnextRectanglesがある場合のみ、rectanglesを更新してnextRectanglesをクリア
      // これにより、小節の途中で何度もアニメーションがトリガーされないようになる
      if (this.settings.nextRectangles.length > 0) {
        this.settings.rectangles = [...this.settings.nextRectangles];
        this.settings.nextRectangles = [];
      }
      // アニメーション完了後は、更新されたrectanglesを描画
      for (let i = 0; i < this.settings.rectangles.length; i++) {
        let r = this.settings.rectangles[i];
        g.fill(r.color);
        g.rect(r.x, r.y, r.w, r.h);
      }
    }

    // デバッグ表示 (オプション)
    // g.fill(255);
    // g.textSize(20);
    // g.textAlign(LEFT, TOP);
    // g.text(`lastSectionMillis: ${lastSectionMillis}`, 20, 20);
    // g.text(`_lastTriggeredSectionMillis: ${this._lastTriggeredSectionMillis}`, 20, 40);
    // g.text(`elapsedTime: ${elapsedTime.toFixed(2)}`, 20, 60);
    // g.text(`easedProgress: ${easedProgress.toFixed(2)}`, 20, 80);
  }
};