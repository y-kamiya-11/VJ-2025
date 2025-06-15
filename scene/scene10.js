// イージング関数は別ファイルに定義されていることを想定しています
// function function easeIn(time, maxTime, power = 4) { ... }
// function easeOut(time, maxTime, power = 4) { ... }
// function easeInOut(time, maxTime, power = 4) { ... }

// グローバル変数 (p5.jsのスケッチ内で定義されていることを想定)
// let lastSectionMillis = 0;
// let lastBeatMillis = 0; // 最新の拍頭のmillisを保存する変数
// let currentBeat = 0; // 現在の拍数 (0-3で1,2,3,4拍目を表す)

let scene10 = {
  settings: {
    backgroundColor: 0, // 黒背景
    borderWeight: 20, // 枠線の太さ（共通）

    // 正方形1のパラメータ
    square1: {
      size: 200,
      color: 255, // 白
      animationDuration: 1000, // 各アニメーションの持続時間（ミリ秒）
    },

    // 正方形2のパラメータ
    square2: {
      initialSize: 50, // 基準となるサイズ（スケールアップ前）
      color: 255, // 白
      maxScale: 10, // 超でかいスケールの最大値
      minScale: 0.5, // 最小スケール値
      easingPower: 6, // ここを調整します。デフォルトの3より大きくすると、減速感が強まります。
    },

    // 正方形3のパラメータ (正方形1とほぼ同じ設定を使用)
    square3: {
      size: 200, // 正方形1と同じサイズ
      color: 255, // 白
      animationDuration: 1000, // 正方形1と同じアニメーション持続時間
    }
  },

  // 正方形1のアニメーション状態
  square1State: {
    animationState: 0, // 0: 下に移動, 1: スケールダウン, 2: 回転, 3: 右に移動, 4: 下に移動してフレームアウト
    startTime: 0,
    calcX: 0,
    calcY: 0,
    calcScale: 1,
    calcRotation: 0,
    displayX: 0,
    displayY: 0,
    displayScale: 1,
    displayRotation: 0,
  },

  // 正方形2のアニメーション状態
  square2State: {
    calcScale: 1, // 計算用のスケール
    displayScale: 1, // 描画用のスケール
  },

  // 正方形3のアニメーション状態 (正方形1と同じプロパティを持つ)
  square3State: {
    animationState: 0,
    startTime: 0,
    calcX: 0,
    calcY: 0,
    calcScale: 1,
    calcRotation: 0,
    displayX: 0,
    displayY: 0,
    displayScale: 1,
    displayRotation: 0,
  },

  // 最後に描画パラメータが更新された16分音符のインデックスを記録 (初回は -1 で初期化)
  // 正方形2,3は拍の同期を global.lastBeatMillis に合わせるため、このスナップは正方形1のみに影響。
  // ただし、display更新は全てのオブジェクトで行うため残します。
  _lastRenderedSixteenthNoteIndex: -1,

  setupScene(g) {
    // 正方形1の初期設定
    this.square1State.startTime = millis(); // 各アニメーションの開始時刻
    this.square1State.calcX = g.width / 2;
    this.square1State.calcY = -this.settings.square1.size; // 画面外上部
    this.square1State.calcScale = 1;
    this.square1State.calcRotation = 0;
    this.square1State.animationState = 0;

    // 描画用パラメータも初期化
    this.square1State.displayX = this.square1State.calcX;
    this.square1State.displayY = this.square1State.calcY;
    this.square1State.displayScale = this.square1State.calcScale;
    this.square1State.displayRotation = this.square1State.calcRotation;

    // 正方形2の初期設定
    this.square2State.calcScale = this.settings.square2.maxScale; // 超でかいスケールから開始
    this.square2State.displayScale = this.square2State.calcScale;

    // 正方形3の初期設定 (正方形1と点対称な初期位置)
    this.square3State.startTime = millis(); // 正方形1と同じ時刻で開始
    this.square3State.calcX = g.width / 2; // 中心
    this.square3State.calcY = g.height + this.settings.square3.size; // 画面外下部
    this.square3State.calcScale = 1;
    this.square3State.calcRotation = 0;
    this.square3State.animationState = 0; // 正方形1と同じアニメーション状態から開始

    // 正方形3の描画用パラメータも初期化
    this.square3State.displayX = this.square3State.calcX;
    this.square3State.displayY = this.square3State.calcY;
    this.square3State.displayScale = this.square3State.calcScale;
    this.square3State.displayRotation = this.square3State.calcRotation;


    // 最後に描画パラメータが更新された16分音符のインデックスを初期化
    this._lastRenderedSixteenthNoteIndex = -1; // 強制的に初回更新させるため
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);

    const currentTime = millis();
    const currentBpm = typeof bpm !== 'undefined' && bpm > 0 ? bpm : 120; // BPMが未定義または0の場合はデフォルト値
    const beatDuration = (60 / currentBpm) * 1000; // 現在のBPMに基づく1拍の持続時間
    const sixteenthNoteInterval = beatDuration / 4; // 16分音符の間隔

    // --- 描画パラメータの更新（16分音符スナップ） ---
    const elapsedTimeSinceLastBeat = currentTime - lastBeatMillis;
    // 1拍内の16分音符のインデックス (0, 1, 2, 3)
    const currentSixteenthNoteIndexInBeat = floor(elapsedTimeSinceLastBeat / sixteenthNoteInterval);

    // 描画パラメータの更新は、16分音符の区間が変わったときに行います。
    // これにより、描画自体は16分音符にスナップされます。
    if (this._lastRenderedSixteenthNoteIndex !== currentSixteenthNoteIndexInBeat) {
      // 正方形1の描画パラメータを更新
      this.square1State.displayX = this.square1State.calcX;
      this.square1State.displayY = this.square1State.calcY;
      this.square1State.displayScale = this.square1State.calcScale;
      this.square1State.displayRotation = this.square1State.calcRotation;

      // 正方形2の描画パラメータを更新
      this.square2State.displayScale = this.square2State.calcScale;

      // 正方形3の描画パラメータを更新
      this.square3State.displayX = this.square3State.calcX;
      this.square3State.displayY = this.square3State.calcY;
      this.square3State.displayScale = this.square3State.calcScale;
      this.square3State.displayRotation = this.square3State.calcRotation;

      // 最後にスナップした16分音符のインデックスを更新
      this._lastRenderedSixteenthNoteIndex = currentSixteenthNoteIndexInBeat;
    }


    // --- 正方形1のアニメーション計算 ---
    let s1ElapsedTime = currentTime - this.square1State.startTime;
    let s1T = min(1, s1ElapsedTime / this.settings.square1.animationDuration);
    let s1EasedT = easeInOut(s1ElapsedTime, this.settings.square1.animationDuration, 3);

    switch (this.square1State.animationState) {
      case 0: // 下に移動
        this.square1State.calcY = lerp(-this.settings.square1.size, g.height / 2, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 1;
          this.square1State.startTime = currentTime;
        }
        break;
      case 1: // スケールダウン
        this.square1State.calcScale = lerp(1, 0.5, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 2;
          this.square1State.startTime = currentTime;
        }
        break;
      case 2: // 回転
        this.square1State.calcRotation = lerp(0, TWO_PI, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 3;
          this.square1State.startTime = currentTime;
        }
        break;
      case 3: // 右に移動
        this.square1State.calcX = lerp(g.width / 2, g.width - this.settings.square1.size / 2, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 4;
          this.square1State.startTime = currentTime;
        }
        break;
      case 4: // 下に移動してフレームアウト
        this.square1State.calcY = lerp(g.height / 2, g.height + this.settings.square1.size, s1EasedT);
        if (s1T >= 1) {
          // アニメーション終了、最初に戻る
          this.square1State.animationState = 0;
          this.square1State.startTime = currentTime;
          this.square1State.calcX = g.width / 2;
          this.square1State.calcY = -this.settings.square1.size;
          this.square1State.calcScale = 1;
          this.square1State.calcRotation = 0;
        }
        break;
    }

    // --- 正方形3のアニメーション計算 (正方形1と点対称) ---
    let s3ElapsedTime = currentTime - this.square3State.startTime;
    let s3T = min(1, s3ElapsedTime / this.settings.square3.animationDuration);
    let s3EasedT = easeInOut(s3ElapsedTime, this.settings.square3.animationDuration, 3);

    switch (this.square3State.animationState) {
      case 0: // 正方形1が下移動 -> 正方形3は上移動
        this.square3State.calcY = lerp(g.height + this.settings.square3.size, g.height / 2, s3EasedT);
        if (s3T >= 1) {
          this.square3State.animationState = 1;
          this.square3State.startTime = currentTime;
        }
        break;
      case 1: // 正方形1がスケールダウン -> 正方形3はスケールダウン (スケールは点対称にしない)
        this.square3State.calcScale = lerp(1, 0.5, s3EasedT);
        if (s3T >= 1) {
          this.square3State.animationState = 2;
          this.square3State.startTime = currentTime;
        }
        break;
      case 2: // 正方形1が回転 -> 正方形3は逆回転 (点対称)
        this.square3State.calcRotation = lerp(0, -TWO_PI, s3EasedT); // 逆方向へ回転
        if (s3T >= 1) {
          this.square3State.animationState = 3;
          this.square3State.startTime = currentTime;
        }
        break;
      case 3: // 正方形1が右移動 -> 正方形3は左移動 (点対称)
        this.square3State.calcX = lerp(g.width / 2, this.settings.square3.size / 2, s3EasedT);
        if (s3T >= 1) {
          this.square3State.animationState = 4;
          this.square3State.startTime = currentTime;
        }
        break;
      case 4: // 正方形1が下移動してフレームアウト -> 正方形3は上移動してフレームアウト (点対称)
        this.square3State.calcY = lerp(g.height / 2, -this.settings.square3.size, s3EasedT);
        if (s3T >= 1) {
          // アニメーション終了、最初に戻る
          this.square3State.animationState = 0;
          this.square3State.startTime = currentTime;
          this.square3State.calcX = g.width / 2;
          this.square3State.calcY = g.height + this.settings.square3.size; // 画面外下部に戻す
          this.square3State.calcScale = 1;
          this.square3State.calcRotation = 0;
        }
        break;
    }

    // --- 正方形2のアニメーション計算 (1拍ごとにリセット) ---
    // elapsedTimeSinceLastBeat は lastBeatMillis からの経過時間
    // これを beatDuration で正規化し、1拍の周期で0.0〜1.0を繰り返すようにします。
    let normalizedBeatTime = (elapsedTimeSinceLastBeat % beatDuration) / beatDuration;
    let easedBeatT = easeInOut(elapsedTimeSinceLastBeat % beatDuration, beatDuration, this.settings.square2.easingPower);

    // 正方形2: 超でかいスケールから最小スケールへスケールダウン
    this.square2State.calcScale = lerp(this.settings.square2.maxScale, this.settings.square2.minScale, easedBeatT);


    // --- 正方形1の描画 ---
    g.push();
    g.stroke(this.settings.square1.color);
    g.strokeWeight(this.settings.borderWeight);
    g.noFill();
    g.translate(this.square1State.displayX, this.square1State.displayY);
    g.scale(this.square1State.displayScale);
    g.rotate(this.square1State.displayRotation);
    g.rectMode(CENTER);
    g.rect(0, 0, this.settings.square1.size, this.settings.square1.size);
    g.pop();

    // --- 正方形2の描画 ---
    g.push();
    g.stroke(this.settings.square2.color);
    g.strokeWeight(this.settings.borderWeight);
    g.noFill();
    g.translate(g.width / 2, g.height / 2); // 画面中央に配置
    g.scale(this.square2State.displayScale);
    g.rectMode(CENTER);
    g.rect(0, 0, this.settings.square2.initialSize, this.settings.square2.initialSize); // 基準サイズで描画
    g.pop();

    // --- 正方形3の描画 ---
    g.push();
    g.stroke(this.settings.square3.color);
    g.strokeWeight(this.settings.borderWeight);
    g.noFill();
    g.translate(this.square3State.displayX, this.square3State.displayY);
    g.scale(this.square3State.displayScale);
    g.rotate(this.square3State.displayRotation);
    g.rectMode(CENTER);
    g.rect(0, 0, this.settings.square3.size, this.settings.square3.size);
    g.pop();

    // デバッグ表示 (オプション)
    // g.fill(255);
    // g.textSize(20);
    // g.textAlign(LEFT, TOP);
    // g.text(`currentBeat: ${currentBeat}`, 20, 20);
    // g.text(`lastBeatMillis: ${lastBeatMillis}`, 20, 40);
    // g.text(`elapsedSinceBeat: ${elapsedTimeSinceLastBeat.toFixed(2)}`, 20, 60);
    // g.text(`normalizedBeatTime: ${normalizedBeatTime.toFixed(2)}`, 20, 80);
    // g.text(`s2Scale: ${this.square2State.displayScale.toFixed(2)}`, 20, 100);
    // g.text(`s3Scale (s1 synced): ${this.square3State.displayScale.toFixed(2)}`, 20, 120);
  }
};