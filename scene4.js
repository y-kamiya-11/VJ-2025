let scene4 = {
  settings: {
    backgroundColor: null,
    cellSize: 20,
    ellipseSize: 15,
    noiseScale: 0.05,
    timeScale: 0.01, 
    patternType: "noise" // "random" / "noise" / "symmetry" / "wave"
  },

  setupScene(g) {
    this.settings.backgroundColor = color(0);
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.noStroke();

    let cols = floor(g.width / this.settings.cellSize);
    let rows = floor(g.height / this.settings.cellSize);
    let t = millis() * this.settings.timeScale;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let fillColor;

        switch (this.settings.patternType) {
          case "random":
            fillColor = random() > 0.5 ? 255 : 0;
            break;

          case "noise":
            let n = noise(x * this.settings.noiseScale, y * this.settings.noiseScale, t);
            fillColor = n > 0.5 ? 255 : 0;
            break;

          case "symmetry":
            let centerX = cols / 2;
            let mirrorX = abs(x - centerX);
            let sn = noise(mirrorX * this.settings.noiseScale, y * this.settings.noiseScale, t);
            fillColor = sn > 0.5 ? 255 : 0;
            break;

          case "wave":
            let v = sin(x * 0.3 + t) * sin(y * 0.3 + t);
            fillColor = v > 0 ? 255 : 0;
            break;

          default:
            fillColor = 0;
        }

        g.fill(fillColor);

        // 円描画
        let cx = x * this.settings.cellSize + this.settings.ellipseSize / 2;
        let cy = y * this.settings.cellSize + this.settings.ellipseSize / 2;
        g.ellipse(cx, cy, this.settings.ellipseSize, this.settings.ellipseSize);
      }
    }
  }
};
