let scene2 = {
  settings: {
    backgroundColor: null
  },

  setupScene(g) {
    this.settings.backgroundColor = color(0);
  },
  drawScene(g) {
    g.background(0, 50);
    g.strokeWeight(2);
    for (let i = 0; i < 50; i++) {
      g.stroke(random(360), 80, 100);
      g.line(g.width / 2, g.height / 2,
             random(g.width), random(g.height));
    }
  }
};
