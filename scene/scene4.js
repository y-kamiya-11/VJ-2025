let scene4 = {
  settings: {
    backgroundColor: null,
    cellSize: 25,
    shapeSize: 20,
    noiseScale: 0.05,
    timeScale: 0.01,
    patternType: "noise", // "random" / "noise" / "symmetry" / "wave"
    shapeType: "circle"   // "circle" / "text"
  },

  dummyText: "BAURAUM PRE 02 KOENJI",
  charIndexOffset: 0, // ← これで1フレームごとに+1する

  setupScene(g) {
    this.settings.backgroundColor = color(20);
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.noStroke();
    g.textAlign(CENTER, CENTER);
    g.textSize(this.settings.cellSize * 0.8);

    let cols = floor(g.width / this.settings.cellSize);
    let rows = floor(g.height / this.settings.cellSize);
    let t = millis() * this.settings.timeScale;
    let textLength = this.dummyText.length;

    let charCounter = this.charIndexOffset;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let fillColor;
        let isWhite;

        // パターンの判定
        switch (this.settings.patternType) {
          case "random":
            isWhite = random() > 0.5;
            break;

          case "noise":
            let n = noise(x * this.settings.noiseScale, y * this.settings.noiseScale, t);
            isWhite = n > 0.5;
            break;

          case "symmetry":
            let centerX = cols / 2;
            let mirrorX = abs(x - centerX);
            let sn = noise(mirrorX * this.settings.noiseScale, y * this.settings.noiseScale, t);
            isWhite = sn > 0.5;
            break;

          case "wave":
            let v = sin(x * 0.3 + t) * sin(y * 0.3 + t);
            isWhite = v > 0;
            break;

          default:
            isWhite = false;
        }

        fillColor = isWhite ? 255 : 0;
        g.fill(fillColor);

        let cx = x * this.settings.cellSize + this.settings.shapeSize / 2;
        let cy = y * this.settings.cellSize + this.settings.shapeSize / 2;

        if (this.settings.shapeType === "circle") {
          g.ellipse(cx, cy, this.settings.shapeSize, this.settings.shapeSize);
        } else if (this.settings.shapeType === "text") {
          if (isWhite) {
            g.fill(255);
            let char = this.dummyText.charAt(charCounter % textLength);
            g.text(char, cx, cy);
          }
          charCounter++;
        }
      }
    }

    // 10フレームごとにオフセットをずらす
    if (frameCount % 10 === 0) {
      this.charIndexOffset+=3;
    }
  }
};
