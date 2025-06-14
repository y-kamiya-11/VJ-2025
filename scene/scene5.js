let scene5 = {
  settings: {
    backgroundColor: null,
    curveCount: 10,     // 1フレームあたりの曲線の本数
    maxPoints: 6,        // 1本の曲線の最大頂点数
    maxLength: 400,      // 制御点の最大移動量
    maxWeight: 4,        // 曲線の最大太さ（増やした）
    timeScale: 0.001,    // 時間ノイズのスケール
    margin: 200          // 画面外にはみ出す余白
  },

  setupScene(g) {
    this.settings.backgroundColor = color(0, 25);
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.noFill();
    g.blendMode(ADD);

    let t = millis() * this.settings.timeScale;
    let m = this.settings.margin;

    for (let i = 0; i < this.settings.curveCount; i++) {
      let points = floor(random(3, this.settings.maxPoints));

      // 色決定（基本白、たまにグレー〜黒）
      let colChance = random();
      if (colChance < 0.85) {
        g.stroke(255, random(120, 255));
      } else {
        g.stroke(random(0, 180));
      }

      // 線の太さをより暴れるように
      let weight = pow(random(1, this.settings.maxWeight), random(0.5, 2));
      g.strokeWeight(weight);

      g.beginShape();
      for (let p = 0; p < points; p++) {
        let x = random(-m, g.width + m) + sin(t + p) * random(-50, 50);
        let y = random(-m, g.height + m) + cos(t + p) * random(-50, 50);
        g.curveVertex(x, y);
      }
      g.endShape();
    }

    g.blendMode(BLEND);
  }
};
