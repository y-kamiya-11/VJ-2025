let scene6 = {
  settings: {
    pointCount: 250,
    fillRatio: 0.05,
    shapeCount: 200,
  },

  points: [],
  triangles: [],
  fillTriangles: [],
  colorBuffer: null,

  setupScene(g) {
    this.points = [];
    this.triangles = [];
    this.fillTriangles = [];
    this.colorBuffer = createGraphics(g.width, g.height);
    this.colorBuffer.colorMode(HSB, 360, 100, 100, 255);
    this.maskBuffer = createGraphics(g.width, g.height);
    this.maskBuffer.clear();

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
            dists.push({ index: j, dist: d });
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

    // 三角形描画
    for (let t of this.triangles) {
      g.beginShape();
      for (let p of t) {
        g.vertex(p.x, p.y);
      }
      g.endShape(CLOSE);
    }

    // カラフルな図形の集合を描く
    this.colorBuffer.clear();
    this.colorBuffer.noStroke();

    for (let i = 0; i < this.settings.shapeCount; i++) {
      let x = (noise(i * 0.1, frameCount * 0.01) * 3 - 1) * this.colorBuffer.width;
      let y = (noise(i * 0.1 + 200, frameCount * 0.01) * 3 - 1) * this.colorBuffer.height;
      let r = sin(frameCount * 0.1 + i) * 200 + 100;
      let hueVal = (frameCount * 2 + i * 10) % 360;
      this.colorBuffer.fill(hueVal, 80, 100, 200);
      this.colorBuffer.ellipse(x, y, r);
    }

    // マスク用バッファ
    this.maskBuffer.clear();
    this.maskBuffer.noStroke();
    this.maskBuffer.fill(255);

    for (let t of this.fillTriangles) {
      this.maskBuffer.beginShape();
      for (let p of t) {
        this.maskBuffer.vertex(p.x, p.y);
      }
      this.maskBuffer.endShape(CLOSE);

      // 可視化用 α127白塗り
      g.fill(255, 127);
      g.beginShape();
      for (let p of t) {
        g.vertex(p.x, p.y);
      }
      g.endShape(CLOSE);
    }

    // マスク画像
    let maskImage = this.maskBuffer.get(0, 0, g.width, g.height);
    let colorImage = this.colorBuffer.get(0, 0, g.width, g.height);
    colorImage.mask(maskImage);

    // 合成
    g.image(colorImage, 0, 0);
  }
};
