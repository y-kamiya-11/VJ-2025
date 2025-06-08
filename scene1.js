let scene1 = {
  settings: {
    ellipse: 20
  },

  setupScene(g) {
    g.background(0);
  },

  drawScene(g) {
    g.background(0, 20);
    g.noStroke();
    for (let i = 0; i < this.settings.ellipse; i++) {
      g.fill(random(360), 80, 100);
      g.ellipse(random(g.width), random(g.height), random(20, 80));
    }
  }
};
