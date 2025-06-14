let scene9 = {
  settings: {
    backgroundColor: null,
    rectangles: [], // 初期化時に空であることを確認
    texts: [
      "Ⅳ△7", "Ⅲ", "Ⅲm7/Ⅵ", "Ⅰ7",
      "Ⅱm7", "♭Ⅶ7", "Ⅱm7", "Ⅴm7",
      "Ⅶm7-5", "Ⅴ7", "Ⅲm7", "Ⅰaug/♯Ⅳ",
      "Ⅳm7", "Ⅴm7", "♭Ⅶ△7", "♯Ⅳm7-5"
    ],
    lastFlashTime: 0,
    halfNoteInterval: 0, // 2分音符の間隔 (ms)

    // 光る順番を指定する配列の配列
    // 例: [[3, 2, 5, 7], [2, 5, 4, 3], ...]
    // ここではサンプルとしていくつかのシーケンスを定義します
    flashSequences: [
      [0, 1, 2, 3],
      [0, 5, 2, 7],
      [4, 9, 2, 3],
      [0, 1, 2, 3],

      [0, 1, 2, 3],
      [0, 5, 2, 7],
      [4, 9, 2, 3],
      [0, 1, 2, 3],

      [0, 1, 2, 3],
      [0, 5, 2, 7],
      [4, 9, 2, 3],
      [0, 1, 2, 3],

      [0, 1, 6, 3],
      [0, 5, 10, 7],
      [8, 1, 6, 3],
      [4, 1, 14, 11],

      [0, 1, 2, 3],
      [0, 5, 2, 7],
      [4, 9, 2, 3],
      [0, 1, 2, 3],

      [4, 1, 6, 3],
      [4, 5, 2, 7],
      [0, 1, 6, 3],
      [12, 9, 10, 15],
      [0, 1, 6, 3],

      [0, 1, 2, 3],
      [0, 5, 2, 7],
      [4, 9, 2, 3],
      [0, 1, 2, 3],

      [0, 1, 2, 3],
      [0, 5, 2, 7],
      [4, 9, 2, 3],
      [0, 1, 2, 3],

      [0, 1, 2, 3],
      [8, 1, 2, 7],
      [4, 9, 2, 15],
      [12, 13, 14, 3],
    ],
    currentSequenceIndex: 0, // 現在のシーケンスのインデックス
    currentFlashStep: 0,     // 現在のシーケンス内のステップ

    flashingRectangleIndex: -1, // 現在光っている長方形のインデックス
    isSequenceActive: false, // シーケンスがアクティブかどうか（枠線や連結線描画用）
    currentActiveRectIndices: [] // 現在のシーケンスでアクティブな長方形のインデックスを保持
  },

  setupScene(g) {
    // ここで既存の長方形データをクリアする
    this.settings.rectangles = []; 

    this.settings.backgroundColor = g.color(0); // 黒背景

    g.rectMode(g.CORNER); // ここに追記

    // 長方形の配置を計算
    let rectWidth = g.width / 5; // 左右に余白を持たせるため5で割る
    let rectHeight = g.height / 6; // 上下に余白を持たせるため5で割る
    let startX = (g.width - (rectWidth * 4 + g.width / 20 * 3)) / 2; // 中央揃えのための開始X座標
    let startY = (g.height - (rectHeight * 4 + g.height / 20 * 3)) / 2; // 中央揃えのための開始Y座標

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let x = startX + col * (rectWidth + g.width / 20); // 長方形と長方形の間に余白
        let y = startY + row * (rectHeight + g.height / 20); // 長方形と長方形の間に余白
        this.settings.rectangles.push({
          x: x,
          y: y,
          width: rectWidth,
          height: rectHeight,
          isFlashing: false
        });
      }
    }

    // 初回描画のために初期ステップを設定
    this.settings.currentFlashStep = 0;
    this.settings.currentSequenceIndex = 0; // シーンがセットアップされるたびにシーケンスもリセット
    this.settings.currentActiveRectIndices = this.settings.flashSequences[this.settings.currentSequenceIndex];
    this.settings.isSequenceActive = true; // 最初にシーケンスがアクティブな状態にする
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.rectMode(g.CORNER);
    this.settings.halfNoteInterval = (60000 / bpm) * 2;

    // 2分音符ごとにシーケンスに従って長方形を光らせる
    if (g.millis() - this.settings.lastFlashTime > this.settings.halfNoteInterval) {
      // 前回光っていた長方形を元に戻す
      if (this.settings.flashingRectangleIndex !== -1) {
        this.settings.rectangles[this.settings.flashingRectangleIndex].isFlashing = false;
      }

      // 現在のシーケンスを取得
      let currentSequence = this.settings.flashSequences[this.settings.currentSequenceIndex];

      // 次のステップに進む前に、isSequenceActiveとcurrentActiveRectIndicesを更新
      if (this.settings.currentFlashStep === 0) {
        // 新しいシーケンスの最初の要素が光るタイミングでアクティブ化
        this.settings.isSequenceActive = true;
        this.settings.currentActiveRectIndices = currentSequence;
      }

      // シーケンス内の次の長方形のインデックスを取得
      let nextIndex = currentSequence[this.settings.currentFlashStep];

      // 新しい長方形を光らせる
      this.settings.rectangles[nextIndex].isFlashing = true;
      this.settings.flashingRectangleIndex = nextIndex;

      // 次のステップに進む
      this.settings.currentFlashStep++;
      if (this.settings.currentFlashStep >= currentSequence.length) {
        // シーケンスの終わりなら、次のシーケンスへ移行し、ステップをリセット
        this.settings.currentFlashStep = 0;
        this.settings.currentSequenceIndex = (this.settings.currentSequenceIndex + 1) % this.settings.flashSequences.length;
        // isSequenceActive は次のシーケンスの最初の要素が光るまでtrueのまま
      }

      this.settings.lastFlashTime = g.millis();
    }

    g.textAlign(g.CENTER, g.CENTER); // ここも g.CENTER に修正
    g.textSize(32);

    // シーケンス中の長方形の連結線を保持する配列
    let activeRectsForDrawing = [];

    for (let i = 0; i < this.settings.rectangles.length; i++) {
      let rect = this.settings.rectangles[i];
      let textContent = this.settings.texts[i];

      // デフォルトの描画設定
      g.noStroke(); // 枠なし
      g.fill(50);   // ダークグレー塗り (RGB 50,50,50)

      // 光っている長方形の描画
      if (rect.isFlashing) {
        g.fill(255); // 白で塗りつぶす
        g.stroke(255); // 白枠
        g.strokeWeight(2);
        g.rect(rect.x, rect.y, rect.width, rect.height);
        g.fill(0); // 文字を黒にする
      } else {
        // デフォルトの描画（ダークグレー塗り、枠なし）
        g.noStroke();
        g.fill(50);
        g.rect(rect.x, rect.y, rect.width, rect.height);
        g.fill(255); // 文字を白にする
      }

      // シーケンスがアクティブな場合、該当する長方形の枠を白にする
      if (this.settings.isSequenceActive && this.settings.currentActiveRectIndices.includes(i)) {
        // 光っている長方形は既に白枠なので、光っていない長方形のみ白枠を追加
        if (!rect.isFlashing) { // ここで光っている長方形には二重に枠を描画しないようにチェック
          g.stroke(255); // 白枠
          g.strokeWeight(2);
          g.noFill(); // 塗りはなしにリセットして枠だけ描画
          g.rect(rect.x, rect.y, rect.width, rect.height);
        }
        // 文字の色は上記で設定済みのため変更しない

        // 連結線を描画するため、アクティブな長方形を保存
        activeRectsForDrawing.push({ rect: rect, index: i }); // インデックスも一緒に保存
      }

      // 中央に文字を配置
      g.text(textContent, rect.x + rect.width / 2, rect.y + rect.height / 2);
    }

    // ---
    // 連結線の描画
    // ---
    // activeRectsForDrawing を元のシーケンスの順番にソートする
    // これにより、線が正しく結ばれる
    if (this.settings.isSequenceActive && activeRectsForDrawing.length > 0) { // activeRectsForDrawing.length === 4 は厳密すぎる可能性があるので > 0 に変更
      // currentActiveRectIndices の順に activeRectsForDrawing をソート
      activeRectsForDrawing.sort((a, b) => {
        return this.settings.currentActiveRectIndices.indexOf(a.index) - this.settings.currentActiveRectIndices.indexOf(b.index);
      });

      g.stroke(255); // 白線
      g.strokeWeight(2);
      g.noFill();

      for (let i = 0; i < activeRectsForDrawing.length - 1; i++) {
        let rect1 = activeRectsForDrawing[i].rect;
        let rect2 = activeRectsForDrawing[i+1].rect;

        // rect1の右端とrect2の左端を結ぶ
        g.line(rect1.x + rect1.width, rect1.y + rect1.height / 2,
               rect2.x, rect2.y + rect2.height / 2);
      }
    }
  }
};