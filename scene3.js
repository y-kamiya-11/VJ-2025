let scene3 = {
  setupScene(g) {
    g.background(0);
  },
  drawScene(g) {
    g.loadPixels();
    for (let y = 0; y < g.height; y++) {
      for (let x = 0; x < g.width; x++) {
        let n = noise(x * 0.01, y * 0.01, frameCount * 0.01);
        let col = map(n, 0, 1, 0, 360);
        let idx = 4 * (y * g.width + x);
        g.pixels[idx] = col;
        g.pixels[idx + 1] = 100;
        g.pixels[idx + 2] = 200;
        g.pixels[idx + 3] = 255;
      }
    }
    g.updatePixels();
  }
};
