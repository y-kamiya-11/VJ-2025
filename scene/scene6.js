let scene6 = {
  settings: {
    pointCount: 250,
    fillRatio: 0.03,
    shapeCount: 200,
  },

  points: [],
  triangles: [],
  fillTriangles: [],
  glowBuffer: null,

  setupScene(g) {
    this.points = [];
    this.triangles = [];
    this.fillTriangles = [];
    this.glowBuffer = createGraphics(g.width, g.height);
    // glowBufferもメインのグラフィックと同じRGBモードに設定
    // これにより、色の解釈のずれを防ぎます
    this.glowBuffer.colorMode(RGB, 255, 255, 255, 255); 

    // 点を適当に配置
    for (let i = 0; i < this.settings.pointCount; i++) {
      this.points.push({
        pos: createVector(random(g.width), random(g.height)),
        seedX: random(1000),
        seedY: random(1000)
      });
    }

    // 近傍結線で三角形生成
    this.generateTriangles();
  },

  generateTriangles() {
    this.triangles = [];

    for (let i = 0; i < this.points.length; i++) {
      let dists = [];
      for (let j = 0; j < this.points.length; j++) {
        if (i != j) {
          let d = p5.Vector.dist(this.points[i].pos, this.points[j].pos);
          dists.push({
            index: j,
            dist: d
          });
        }
      }
      dists.sort((a, b) => a.dist - b.dist);

      let p1 = this.points[i].pos;
      let p2 = this.points[dists[0].index].pos;
      let p3 = this.points[dists[1].index].pos;
      this.triangles.push([p1, p2, p3]);
    }
  },

  drawScene(g) {
    g.background(0);
    g.stroke(255, 100);
    g.strokeWeight(2);
    g.noFill();

    // 点の移動
    for (let p of this.points) {
      let speed = 1.5; // 動きの速さ
      p.pos.x = (noise(p.seedX, frameCount * 0.003 + p.seedX) * 3 - 1) * g.width;
      p.pos.y = (noise(p.seedY, frameCount * 0.003 + p.seedY) * 3 - 1) * g.height;
    }

    // 三角形の再生成
    this.generateTriangles();
    // 面の2割を塗り潰し用に
    let fillCount = floor(this.triangles.length * this.settings.fillRatio);
    this.fillTriangles = shuffle([...this.triangles]).slice(0, fillCount);

    // 三角形描画（線のみ）
    for (let t of this.triangles) {
      g.beginShape();
      for (let p of t) {
        g.vertex(p.x, p.y);
      }
      g.endShape(CLOSE);
    }

    // ---

    this.glowBuffer.clear(); 
    this.glowBuffer.noStroke();
    // glowBufferの塗り色をメインのグラフィックと同じRGB値で指定
    this.glowBuffer.fill(50, 150, 255, 255); 

    // メインのグラフィックに塗りつぶし用三角形を直接描画
    g.noStroke();
    // メインのグラフィックの塗り色を指定
    g.fill(50, 150, 255, 255); 

    for (let t of this.fillTriangles) {
      // メインのグラフィックに描画
      g.beginShape();
      for (let p of t) {
        g.vertex(p.x, p.y);
      }
      g.endShape(CLOSE);

      // グロー用バッファに描画
      this.glowBuffer.beginShape();
      for (let p of t) {
        this.glowBuffer.vertex(p.x, p.y);
      }
      this.glowBuffer.endShape(CLOSE);
    }

    // ---

    g.tint(255, 10);
    this.glowBuffer.filter(BLUR, 4);
    g.blend(this.glowBuffer, 0, 0, g.width, g.height, 0, 0, g.width, g.height, SCREEN);
    this.glowBuffer.filter(BLUR, 8);
    g.blend(this.glowBuffer, 0, 0, g.width, g.height, 0, 0, g.width, g.height, SCREEN);
    this.glowBuffer.filter(BLUR, 16);
    g.blend(this.glowBuffer, 0, 0, g.width, g.height, 0, 0, g.width, g.height, SCREEN);
    g.noTint();
  }
};