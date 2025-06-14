// 仮のグローバル変数 bpm （実際の環境に合わせて定義されているものとします）
// let bpm = 120; // 例: 1分間に120拍。この値は drawScene 中に変動する可能性があります。

// イージング関数は別ファイルに定義されていることを想定しています
// function easeIn(time, maxTime, power = 4) { ... }
// function easeOut(time, maxTime, power = 4) { ... }
// function easeInOut(time, maxTime, power = 4) { ... }

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
    startTime: 0, // このstartTimeはアニメーションの基準開始時刻として維持
    calcScale: 1, // 計算用のスケール
    displayScale: 1, // 描画用のスケール
  },

  // 拍頭更新のための変数（共通）
  // lastSnappedBeatTime: 0, // BPMが変動するため、この変数による管理は不要に
  sceneStartTime: 0, // シーン全体の開始時刻（BPM変動があっても基準となる時間）

  setupScene(g) {
    // シーン全体の開始時刻を記録
    this.sceneStartTime = millis();

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
    this.square2State.startTime = millis(); // 各アニメーションの開始時刻
    this.square2State.calcScale = this.settings.square2.maxScale; // 超でかいスケールから開始
    this.square2State.displayScale = this.square2State.calcScale;
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);

    const currentTime = millis();
    const currentBpm = typeof bpm !== 'undefined' && bpm > 0 ? bpm : 120; // BPMが未定義または0の場合はデフォルト値
    const beatDuration = (60 / currentBpm) * 1000; // 現在のBPMに基づく1拍の持続時間
    const sixteenthNoteInterval = beatDuration / 4; // 現在のBPMに基づく16分音符の間隔

    // シーン開始からの合計経過時間（BPMの変動に影響されない）
    const totalElapsedTimeSinceSceneStart = currentTime - this.sceneStartTime;

    // --- 描画パラメータの更新（拍頭スナップ） ---
    // 現在のBPMとシーン開始からの合計時間に基づいて、現在の拍頭のインデックスを計算
    const currentSixteenthBeatIndex = floor(totalElapsedTimeSinceSceneStart / sixteenthNoteInterval);
    // スナップすべき、現在の16分音符の正確な拍頭時刻
    const exactSixteenthBeatTime = this.sceneStartTime + currentSixteenthBeatIndex * sixteenthNoteInterval;

    // 最後に描画パラメータが更新された拍頭の時刻を記録する変数 (初回は sceneStartTime に合わせておく)
    if (!this._lastRenderSnappedTime) {
      this._lastRenderSnappedTime = this.sceneStartTime;
    }

    // もし、現在の正確な拍頭時刻が、最後に描画パラメータをスナップした時刻よりも進んでいたら更新する
    // (または、初回描画時)
    if (exactSixteenthBeatTime > this._lastRenderSnappedTime || this._lastRenderSnappedTime === this.sceneStartTime) {
      // 正方形1の描画パラメータを更新
      this.square1State.displayX = this.square1State.calcX;
      this.square1State.displayY = this.square1State.calcY;
      this.square1State.displayScale = this.square1State.calcScale;
      this.square1State.displayRotation = this.square1State.calcRotation;

      // 正方形2の描画パラメータを更新
      this.square2State.displayScale = this.square2State.calcScale;

      // 最後にスナップした時刻を更新
      this._lastRenderSnappedTime = exactSixteenthBeatTime;
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
          this.square1State.startTime = currentTime; // currentTime を使用
        }
        break;
      case 1: // スケールダウン
        this.square1State.calcScale = lerp(1, 0.5, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 2;
          this.square1State.startTime = currentTime; // currentTime を使用
        }
        break;
      case 2: // 回転
        this.square1State.calcRotation = lerp(0, TWO_PI, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 3;
          this.square1State.startTime = currentTime; // currentTime を使用
        }
        break;
      case 3: // 右に移動
        this.square1State.calcX = lerp(g.width / 2, g.width - this.settings.square1.size / 2, s1EasedT);
        if (s1T >= 1) {
          this.square1State.animationState = 4;
          this.square1State.startTime = currentTime; // currentTime を使用
        }
        break;
      case 4: // 下に移動してフレームアウト
        this.square1State.calcY = lerp(g.height / 2, g.height + this.settings.square1.size, s1EasedT);
        if (s1T >= 1) {
          // アニメーション終了、最初に戻る
          this.square1State.animationState = 0;
          this.square1State.startTime = currentTime; // currentTime を使用
          this.square1State.calcX = g.width / 2;
          this.square1State.calcY = -this.settings.square1.size;
          this.square1State.calcScale = 1;
          this.square1State.calcRotation = 0;
        }
        break;
    }

    // --- 正方形2のアニメーション計算 ---
    // 正方形2のアニメーション進行度を、シーン開始からの合計時間と現在のBPMに基づいて計算
    // これにより、BPMが変動しても拍に同期する
    let s2NormalizedTime = (totalElapsedTimeSinceSceneStart % beatDuration) / beatDuration;
    let s2EasedT = easeInOut(s2NormalizedTime * beatDuration, beatDuration, 3);

    // 超でかいスケールから通常スケールへスケールダウン
    this.square2State.calcScale = lerp(this.settings.square2.maxScale, this.settings.square2.minScale, s2EasedT);


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
  }
};