let scene8 = {
  settings: {
    // メインカラー: 水色と黄色（補色）
    mainColors: ['#00FFFF', '#FFFF00'],
    backgroundColor: '#000000', // 基本の背景色 (黒)
    particleCount: 20, // 毎フレームのパーティクル生成数
    particles: [],
    maxParticles: 1000, // 最大パーティクル数
    waveLineCount: 5, // 波打つラインの数
    waveAmplitude: 80, // 波の振幅
    waveFrequency: 0.05, // 波の周波数
    waveSpeed: 0.02, // 波の移動速度
    pulseStrength: 0.8, // パルスの強さ (0-1)
    pulseDuration: 30, // パルスが持続するフレーム数
    pulseTimer: 0, // パルス中のタイマー
    lastPulseFrame: -1, // 最後にパルスが発生したフレーム
  },

  // パーティクルクラスの定義
  Particle: class {
    constructor(g, x, y, hue, velocityMagnitude, rotationSpeed) {
      this.g = g;
      this.pos = g.createVector(x, y);
      this.vel = g.createVector(g.cos(g.radians(hue)), g.sin(g.radians(hue))).mult(velocityMagnitude);
      this.life = 255;
      this.alpha = 255;
      this.color = g.color(g.random(scene8.settings.mainColors)); // メインカラーからランダム
      this.rotation = g.random(g.TWO_PI); // 初期回転
      this.rotationSpeed = rotationSpeed; // 回転速度
      this.size = g.random(5, 15); // パーティクルサイズ
    }

    update() {
      this.pos.add(this.vel);
      this.vel.mult(0.98); // 速度を徐々に減衰
      this.life -= 3; // 寿命を減らす
      this.alpha = this.life; // 寿命に合わせて透明度を減らす
      this.rotation += this.rotationSpeed; // 回転
      this.size *= 0.99; // サイズを徐々に小さく
    }

    display() {
      this.g.push();
      this.g.translate(this.pos.x, this.pos.y);
      this.g.rotate(this.rotation);

      let c = this.color;
      c.setAlpha(this.alpha);

      this.g.noStroke();
      this.g.fill(c);

      this.g.rectMode(this.g.CENTER);
      this.g.rect(0, 0, this.size, this.size); // 正方形として描画
      this.g.pop();
    }
  },

  // p5.js の setup 関数に相当
  setupScene(gContext) {
    g = gContext; // p5.js コンテキストをグローバル変数 g に保存
    g.colorMode(g.RGB);
    g.noStroke();
  },

  // パーティクルストリームを生成する関数
  createParticleStream(g) {
    let centerX = g.width / 2;
    let centerY = g.height / 2;

    for (let i = 0; i < this.settings.particleCount; i++) {
      if (this.settings.particles.length < this.settings.maxParticles) {
        let angle = g.map(i, 0, this.settings.particleCount, 0, 360) + g.frameCount * 5; // 螺旋状に広がる角度
        let velocityMagnitude = g.random(2, 8); // 速度の大きさ
        let rotationSpeed = g.random(-0.1, 0.1); // 回転速度

        this.settings.particles.push(new this.Particle(g, centerX, centerY, angle, velocityMagnitude, rotationSpeed));
      }
    }
  },

  // 波打つラインを描画する関数
  drawWavyLines(g) {
    g.push();
    g.strokeWeight(3);

    for (let i = 0; i < this.settings.waveLineCount; i++) {
      let phaseOffset = i * (g.TWO_PI / this.settings.waveLineCount);
      let lineColor = (i % 2 === 0) ? this.settings.mainColors[0] : this.settings.mainColors[1]; // 交互に色を変える
      g.stroke(lineColor);

      g.beginShape();
      for (let x = 0; x <= g.width; x += 10) {
        let y = g.height / 2 +
                g.sin(x * this.settings.waveFrequency + g.frameCount * this.settings.waveSpeed + phaseOffset) *
                this.settings.waveAmplitude;
        g.curveVertex(x, y);
      }
      g.endShape();
    }
    g.pop();
  },

  // 背景色をパルスさせる関数
  colorPulse(g) {
    if (g.frameCount % 90 === 0) { // 3秒ごとにパルス (例)
      this.settings.pulseTimer = this.settings.pulseDuration;
      this.settings.lastPulseFrame = g.frameCount;
    }

    if (this.settings.pulseTimer > 0) {
      let progress = this.settings.pulseTimer / this.settings.pulseDuration;
      let easedProgress = g.sin(g.map(progress, 0, 1, 0, g.PI)); // 滑らかなイージング
      
      // パルスの強さに応じて背景色を混ぜる
      let baseColor = g.color(this.settings.backgroundColor);
      let pulseColor = g.color(this.settings.mainColors[g.floor(g.random(2))]); // 水色か黄色
      
      let r = g.lerp(g.red(baseColor), g.red(pulseColor), easedProgress * this.settings.pulseStrength);
      let gr = g.lerp(g.green(baseColor), g.green(pulseColor), easedProgress * this.settings.pulseStrength);
      let b = g.lerp(g.blue(baseColor), g.blue(pulseColor), easedProgress * this.settings.pulseStrength);
      
      g.background(r, gr, b);
      this.settings.pulseTimer--;
    } else {
      g.background(this.settings.backgroundColor); // 通常は黒背景
    }
  },


  // p5.js の draw 関数に相当
  drawScene(g) {
    this.colorPulse(g); // 背景をパルス

    this.createParticleStream(g); // パーティクル生成

    // パーティクルの更新と描画
    for (let i = this.settings.particles.length - 1; i >= 0; i--) {
      let p = this.settings.particles[i];
      p.update();
      p.display();
      if (p.life < 0) {
        this.settings.particles.splice(i, 1);
      }
    }

    this.drawWavyLines(g); // 波打つライン描画
  }
};
