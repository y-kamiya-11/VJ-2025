let scene1 = {
  setupScene(g) {
    g.background(0);
  },
  drawScene(g) {
    g.background(0, 20);
    g.noStroke();
    for (let i = 0; i < 20; i++) {
      g.fill(random(360), 80, 100);
      g.ellipse(random(g.width), random(g.height), random(20, 80));
    }
  }
};
