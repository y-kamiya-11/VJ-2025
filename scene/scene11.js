let scene11 = {
  settings: {
    maxShapes: 100, // 表示する図形の最大数
    currentScale: 1.0, // 現在のスケール
    scaleSpeed: 0.0005, // スケールが下がる速度
    shapes: [], // 図形オブジェクトを格納する配列
    backgroundColor: null,
  },

  setupScene(g) {
    g.colorMode(g.HSB, 360, 100, 100, 100); // HSBモードを使用
    this.settings.backgroundColor = g.color(220, 30, 10, 50); // 背景は青系のフォカマイユで少し透明度を持たせる
    // 初期図形をいくつか生成
    for (let i = 0; i < 10; i++) {
      this.addRandomShape(g);
    }
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);

    // 全体のスケールを徐々に下げる
    this.settings.currentScale -= this.settings.scaleSpeed;
    if (this.settings.currentScale < 0.1) { // 最小スケールを設定
      this.settings.currentScale = 0.1;
    }

    g.push(); // 現在の変換行列を保存
    g.translate(g.width / 2, g.height / 2); // 原点を中央に移動
    g.scale(this.settings.currentScale); // 全体をスケール

    // オブジェクトを随時生成
    if (this.settings.shapes.length < this.settings.maxShapes && g.frameCount % 5 === 0) { // 5フレームごとに新しい図形を生成
      this.addRandomShape(g);
    }

    // 古い図形を削除（任意、メモリ管理のため）
    if (this.settings.shapes.length > this.settings.maxShapes) {
      this.settings.shapes.splice(0, this.settings.shapes.length - this.settings.maxShapes);
    }

    // 各図形を描画・アニメーション
    for (let i = this.settings.shapes.length - 1; i >= 0; i--) {
      let s = this.settings.shapes[i];
      g.noStroke();
      g.fill(s.color);

      // アニメーションを適用
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotationSpeed;
      s.size += s.sizeChange;

      // 画面外に出たら消去、または跳ね返り
      if (Math.abs(s.x - 0) > g.width * 1.5 || Math.abs(s.y - 0) > g.height * 1.5 || s.size <= 0) {
        this.settings.shapes.splice(i, 1); // 画面外に出たら配列から削除
        this.addRandomShape(g); // 新しい図形を追加して補充
        continue;
      }


      g.push();
      g.translate(s.x - g.width / 2, s.y - g.height / 2); // 各図形を原点からの相対位置に移動
      g.rotate(s.rotation);

      if (s.type === 'ellipse') {
        g.ellipse(0, 0, s.size, s.size);
      } else if (s.type === 'rect') {
        g.rectMode(g.CENTER);
        g.rect(0, 0, s.size, s.size);
      } else if (s.type === 'triangle') {
        let triSize = s.size / 2;
        g.triangle(0, -triSize, -triSize * g.sqrt(3) / 2, triSize / 2, triSize * g.sqrt(3) / 2, triSize / 2);
      }
      g.pop();
    }
    g.pop(); // 変換行列を元に戻す
  },

  addRandomShape(g) {
    let type = g.random(['ellipse', 'rect', 'triangle']);
    let size = g.random(20, 150);
    // 青系のフォカマイユな配色
    let hue = g.random(200, 260); // 青系の色相範囲
    let saturation = g.random(50, 100);
    let brightness = g.random(70, 100);
    let alpha = g.random(50, 90); // 少し透明度を持たせる

    this.settings.shapes.push({
      type: type,
      x: g.random(-g.width / 2, g.width / 2), // 中央を基準にランダムな位置
      y: g.random(-g.height / 2, g.height / 2), // 中央を基準にランダムな位置
      size: size,
      color: g.color(hue, saturation, brightness, alpha),
      vx: g.random(-1, 1), // 動きの速さ
      vy: g.random(-1, 1),
      rotation: g.random(g.TWO_PI),
      rotationSpeed: g.random(-0.02, 0.02),
      sizeChange: g.random(-0.5, 0.5) // サイズの変化
    });
  }
};