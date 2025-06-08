let scene3 = {
  settings: {
    rectCount: 80,
    rectSizeMin: 3,
    rectSizeMax: 200,
    appearDuration: 30,   // フレーム数
    disappearDuration: 30,
    backgroundColor: null,
    offsetSpeed: 2, // 左にずれる速度
  },

  rects: [],
  intersectionColors: {},

  setupScene(g) {
    this.settings.backgroundColor = color(20);
    this.rects = [];
    for (let i = 0; i < this.settings.rectCount; i++) {
      this.rects.push(this.createRect(g, i));
    }
  },

  createRect(g, id) {
    let extraMargin = g.width;  // 画面幅ぶん余裕
    return {
      id: id,
      x: random(g.width + extraMargin),  // 今の画面の右〜そのさらに右側
      y: random(g.height),
      w: random(this.settings.rectSizeMin, this.settings.rectSizeMax),
      h: random(this.settings.rectSizeMin, this.settings.rectSizeMax),
      state: 'appearing', // 'appearing', 'visible', 'disappearing'
      time: 0,
      anchor: random(['top', 'bottom', 'left', 'right']),
      currentScale: 0,
    };
  },

  // scaleとanchorを考慮して描画用矩形の領域を取得（x,yは中心座標）
  getRectArea(rect) {
    let w = rect.w;
    let h = rect.h;
    let scale = rect.currentScale;
    let x = rect.x;
    let y = rect.y;

    if (rect.anchor === 'top') {
      h *= scale;
      x = rect.x - rect.w / 2 + w / 2;
      y = rect.y - rect.h / 2 + h / 2;
    } else if (rect.anchor === 'bottom') {
      h *= scale;
      x = rect.x - rect.w / 2 + w / 2;
      y = rect.y - rect.h / 2 + rect.h - h / 2;
    } else if (rect.anchor === 'left') {
      w *= scale;
      x = rect.x - rect.w / 2 + w / 2;
      y = rect.y - rect.h / 2 + h / 2;
    } else if (rect.anchor === 'right') {
      w *= scale;
      x = rect.x - rect.w / 2 + rect.w - w / 2;
      y = rect.y - rect.h / 2 + h / 2;
    }

    return { x, y, w, h };
  },

  drawRect(g, rect, scale) {
    let area = this.getRectArea(rect, scale);
    g.strokeWeight(3);
    g.stroke(0);
    g.noFill();
    g.rectMode(CENTER);
    g.rect(area.x, area.y, area.w, area.h);
  },

  // 矩形同士の交差判定、交差領域を返す（中心座標、幅高さ）
  getIntersection(r1, r2) {
    let x1 = max(r1.x - r1.w / 2, r2.x - r2.w / 2);
    let y1 = max(r1.y - r1.h / 2, r2.y - r2.h / 2);
    let x2 = min(r1.x + r1.w / 2, r2.x + r2.w / 2);
    let y2 = min(r1.y + r1.h / 2, r2.y + r2.h / 2);

    if (x1 < x2 && y1 < y2) {
      return { x: (x1 + x2) / 2, y: (y1 + y2) / 2, w: x2 - x1, h: y2 - y1 };
    } else {
      return null;
    }
  },

  // ある領域areaに重なっているrectの数を数える
  countOverlaps(rectAreas, area) {
    let count = 0;
    for (let r of rectAreas) {
      let rLeft = r.x - r.w / 2;
      let rRight = r.x + r.w / 2;
      let rTop = r.y - r.h / 2;
      let rBottom = r.y + r.h / 2;

      let aLeft = area.x - area.w / 2;
      let aRight = area.x + area.w / 2;
      let aTop = area.y - area.h / 2;
      let aBottom = area.y + area.h / 2;

      if (rLeft < aRight && rRight > aLeft && rTop < aBottom && rBottom > aTop) {
        count++;
      }
    }
    return count;
  },

  drawScene(g) {
    for (let rect of this.rects) {
      rect.x -= this.settings.offsetSpeed;
    }
    g.background(this.settings.backgroundColor);

    // まず各rectの現在の描画領域を計算
    let rectAreas = [];

    for (let rect of this.rects) {
      let progress;
      if (rect.state === 'appearing') {
        progress = easeIn(rect.time, this.settings.appearDuration);
        rect.currentScale = progress;
        rect.time++;
        if (rect.time >= this.settings.appearDuration) {
          rect.state = 'visible';
          rect.time = 0;
          // アンカーの反転
          if (rect.anchor === 'top') rect.anchor = 'bottom';
          else if (rect.anchor === 'bottom') rect.anchor = 'top';
          else if (rect.anchor === 'left') rect.anchor = 'right';
          else if (rect.anchor === 'right') rect.anchor = 'left';
        }
      } else if (rect.state === 'visible') {
        progress = 1;
        rect.currentScale = 1;
        if (random() < 0.1) {
          rect.state = 'disappearing';
          rect.time = 0;
        }
      } else if (rect.state === 'disappearing') {
        progress = 1 - easeOut(rect.time, this.settings.disappearDuration);
        rect.currentScale = progress;
        rect.time++;
        if (rect.time >= this.settings.disappearDuration) {
          Object.assign(rect, this.createRect(g, rect.id));
          progress = easeIn(rect.time, this.settings.appearDuration); // reset progress for new rect
          rect.time++;
        }
      }

      rectAreas.push(this.getRectArea(rect, progress));
    }

    // 交差領域も含めて塗り分け描画

    // 1. 各長方形の領域を描画（奇数は透過・偶数は黒塗り）
    for (let area of rectAreas) {
      let overlapCount = this.countOverlaps(rectAreas, area);
      g.noFill();
      g.stroke(230);
      g.strokeWeight(2);
      g.rectMode(CENTER);
      g.rect(area.x, area.y, area.w, area.h);
    }

    // 2. 交差領域を描画（偶数重なりは黒塗り）
    for (let i = 0; i < rectAreas.length; i++) {
      for (let j = i + 1; j < rectAreas.length; j++) {
        let rectA = this.rects[i];
        let rectB = this.rects[j];

        let areaA = this.getRectArea(rectA);
        let areaB = this.getRectArea(rectB);

        let inter = this.getIntersection(areaA, areaB);
        if (inter) {
          let overlapCount = this.countOverlaps(rectAreas, inter);

          if (overlapCount >= 2) {
            let key = [Math.min(rectA.id, rectB.id), Math.max(rectA.id, rectB.id)].join('_');

            if (!this.intersectionColors[key]) {
              this.intersectionColors[key] = color(random(255), random(255), random(255));
            }

            g.fill(this.intersectionColors[key]);
          } else {
            g.noFill();
          }
          g.stroke(230);
          g.strokeWeight(2);
          g.rectMode(CENTER);
          g.rect(inter.x, inter.y, inter.w, inter.h);
        }
      }
    }
  },
};
