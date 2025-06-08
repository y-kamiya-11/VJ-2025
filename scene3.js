let scene3 = {
  settings: {
    rectCount: 10,
    rectSizeMin: 50,
    rectSizeMax: 200,
    appearDuration: 60,   // フレーム数
    disappearDuration: 60
  },

  rects: [],

  setupScene(g) {
    g.background(255);
    this.rects = [];
    for (let i = 0; i < this.settings.rectCount; i++) {
      this.rects.push(this.createRect(g));
    }
  },

  createRect(g) {
    return {
      x: random(g.width),
      y: random(g.height),
      w: random(this.settings.rectSizeMin, this.settings.rectSizeMax),
      h: random(this.settings.rectSizeMin, this.settings.rectSizeMax),
      state: 'appearing', // 'appearing', 'visible', 'disappearing'
      time: 0,
      anchor: random(['top', 'bottom', 'left', 'right'])
    };
  },

  drawScene(g) {
    g.background(255);

    for (let rect of this.rects) {
      if (rect.state === 'appearing') {
        let progress = easeIn(rect.time, this.settings.appearDuration);
        this.drawRect(g, rect, progress);
        rect.time++;
        if (rect.time >= this.settings.appearDuration) {
          rect.state = 'visible';
          rect.time = 0;
        }
      } else if (rect.state === 'visible') {
        this.drawRect(g, rect, 1);
        if (random() < 0.01) {  // ランダムに消える
          rect.state = 'disappearing';
          rect.time = 0;
        }
      } else if (rect.state === 'disappearing') {
        let progress = 1 - easeOut(rect.time, this.settings.disappearDuration);
        this.drawRect(g, rect, progress);
        rect.time++;
        if (rect.time >= this.settings.disappearDuration) {
          // 消えたら新しいrectに置き換え
          Object.assign(rect, this.createRect(g));
        }
      }
    }
  },

  drawRect(g, rect, scale) {
    g.push();
    g.translate(rect.x, rect.y);

    // アンカー設定
    if (rect.anchor === 'top') {
      g.translate(0, -rect.h / 2);
    } else if (rect.anchor === 'bottom') {
      g.translate(0, rect.h / 2);
    } else if (rect.anchor === 'left') {
      g.translate(-rect.w / 2, 0);
    } else if (rect.anchor === 'right') {
      g.translate(rect.w / 2, 0);
    }

    g.scale(scale);
    g.fill(0);
    g.noStroke();
    g.rectMode(CENTER);
    g.rect(0, 0, rect.w, rect.h);
    g.pop();
  }
};

