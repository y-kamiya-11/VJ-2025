let scene1 = {
  settings: {
    ellipse: 20, 
    backgroundColor: null,
  },

  setupScene(g) {
    this.settings.backgroundColor = color(0, 20);
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);
    g.noStroke();
    for (let i = 0; i < this.settings.ellipse; i++) {
      g.fill(random(360), 80, 100);
      g.ellipse(random(g.width), random(g.height), random(20, 80));
    }
  }
};
