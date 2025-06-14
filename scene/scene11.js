let scene11 = {
  settings: {
    scrollSpeed: -4, // スクロール速度を負の値にして上向きに
    backgroundColor: null,
    elements: [],
    colors: ['#FFFFFF'],
    font: 'Arial',
    words: ['VISUAL', 'MOTION', 'LOOP', 'BEATS', 'FLOW', 'SYNC', 'WAVE', 'PULSE'],
    echoFrames: 20, // エコー効果のフレーム数（過去10フレーム）
    frameHistory: [] // 過去のフレーム情報を保存
  },

  captureElementStates() {
    let elementStates = [];

    this.settings.elements.forEach(element => {
      let currentElementFrame = frameCount - element.spawnFrame;
      
      let alpha = 255; // 基本的に不透明

      let x, y;

      // 初期移動が終わったら、ターゲット位置で静止し、全体スクロールに合わせる
      if (currentElementFrame >= element.initialMoveDuration) {
        x = element.targetX + sin(frameCount * element.frequency + element.initialX * 0.01) * element.amplitude;
        y = element.targetY;
      } else {
        // 初期移動中
        let easedProgress = easeIn(currentElementFrame, element.initialMoveDuration, 6); // イージングをよりパキっとさせる (power = 8)

        switch (element.initialMovePattern) {
          case 'fromBottom':
            x = lerp(element.startX, element.targetX, easedProgress);
            y = lerp(element.startY, element.targetY, easedProgress);
            break;
          case 'fromLeft':
            x = lerp(element.startX, element.targetX, easedProgress);
            y = lerp(element.startY, element.targetY, easedProgress); // Yも動かす
            break;
          case 'fromRight':
            x = lerp(element.startX, element.targetX, easedProgress);
            y = lerp(element.startY, element.targetY, easedProgress); // Yも動かす
            break;
          case 'fromTop':
            x = lerp(element.startX, element.targetX, easedProgress); // Xも動かす
            y = lerp(element.startY, element.targetY, easedProgress);
            break;
        }
        // 初期移動中の波動効果は、イージングに合わせて減衰
        x += sin(currentElementFrame * element.frequency + element.initialX * 0.01) * element.amplitude * (1 - easedProgress);
      }

      // 要素のライフサイクル全体の進行度（画面外に出るためのもの）
      let overallProgress = (frameCount - element.spawnFrame) / element.totalDuration;
      // 寿命の終盤でフェードアウト
      if (overallProgress > 0.8) { 
        alpha = map(overallProgress, 0.8, 1, 255, 0);
      }
      if (alpha < 10 || overallProgress > 1) return; // 透明度が低いか寿命が尽きたらスキップ

      elementStates.push({
        type: element.type,
        x: x,
        y: y,
        size: element.size,
        rotation: element.rotation + (element.type !== 'text' ? currentElementFrame * element.rotationSpeed : 0),
        strokeWeight: element.strokeWeight,
        filled: element.filled,
        text: element.text,
        fontSize: element.fontSize,
        font: this.settings.font,
        color: element.color,
        alpha: alpha // 要素自体の透明度
      });
    });

    return elementStates;
  },

  drawElementFromState(g, elementState) {
    g.push();
    // 全体スクロールに合わせてY座標を調整
    g.translate(elementState.x, elementState.y + frameCount * this.settings.scrollSpeed);

    if (elementState.type !== 'text') {
      g.rotate(elementState.rotation);
    }

    let c = color(elementState.color);
    c.setAlpha(elementState.alpha);
    let black = color(0);

    // 塗りと枠線の条件分岐
    if (elementState.filled) {
      g.fill(c);
      g.stroke(black);
      g.strokeWeight(elementState.strokeWeight + 2);
    } else {
      g.noFill();
      g.stroke(c);
      g.strokeWeight(elementState.strokeWeight);
    }

    // 文字は常に白塗り黒枠線
    if (elementState.type === 'text') {
      g.fill(c);
      g.stroke(black);
      g.strokeWeight(elementState.strokeWeight + 2);
    }

    switch (elementState.type) {
      case 'circle':
        g.ellipse(0, 0, elementState.size, elementState.size);
        break;
      case 'rect':
        g.rectMode(CENTER);
        g.rect(0, 0, elementState.size, elementState.size * 0.6);
        break;
      case 'triangle':
        g.triangle(-elementState.size / 2, elementState.size / 3, elementState.size / 2, elementState.size / 3, 0, -elementState.size / 2);
        break;
      case 'text':
        g.textFont(elementState.font);
        g.textSize(elementState.fontSize);
        g.text(elementState.text, 0, 0);
        break;
      case 'line':
        g.line(-elementState.size / 2, 0, elementState.size / 2, 0);
        g.line(0, -elementState.size / 2, 0, elementState.size / 2);
        break;
    }

    g.pop();
  },

  setupScene(g) {
    this.settings.backgroundColor = color(0);
    g.colorMode(RGB);
    g.textAlign(CENTER, CENTER);
  },

  generateElements(g) {
    if (frameCount % 5 === 0) {
      let elementType = random(['circle', 'rect', 'triangle', 'text', 'line']);
      let size = random(30, 300);
      let initialMoveDuration = random(30, 90); // 静止するまでのフレーム数
      // 全体の寿命を長くし、画面外にスクロールアウトするまで表示されるように調整
      let totalDuration = 50; // 約10秒間表示されるように固定

      let startX, startY, targetX, targetY;
      let initialMovePattern = random(['fromBottom', 'fromLeft', 'fromRight', 'fromTop']);

      // 画面内のどこでもターゲットY座標になりうる
      targetY = random(g.height * 0.1, g.height * 0.9) - frameCount * this.settings.scrollSpeed; // 画面の10%から90%の範囲

      switch (initialMovePattern) {
        case 'fromBottom':
          startX = random(-100, g.width + 100);
          startY = g.height + random(50, 200) - frameCount * this.settings.scrollSpeed;
          targetX = random(g.width * 0.1, g.width * 0.9); // 画面内に収まるように
          break;
        case 'fromLeft':
          startX = -100 - random(0, 100);
          startY = random(g.height * 0.1, g.height * 0.9) - frameCount * this.settings.scrollSpeed; // Yは画面内で動く
          targetX = random(g.width * 0.1, g.width * 0.9);
          break;
        case 'fromRight':
          startX = g.width + 100 + random(0, 100);
          startY = random(g.height * 0.1, g.height * 0.9) - frameCount * this.settings.scrollSpeed; // Yは画面内で動く
          targetX = random(g.width * 0.1, g.width * 0.9);
          break;
        case 'fromTop':
          startX = random(g.width * 0.1, g.width * 0.9); // Xは画面内で動く
          startY = -100 - random(0, 100) - frameCount * this.settings.scrollSpeed;
          targetX = random(g.width * 0.1, g.width * 0.9);
          break;
      }

      let element = {
        type: elementType,
        initialX: random(-100, g.width + 100), // 波動効果の基準点
        startX: startX,
        startY: startY,
        targetX: targetX,
        targetY: targetY,
        initialMovePattern: initialMovePattern,
        size: size,
        color: '#FFFFFF',
        rotation: random(TWO_PI),
        rotationSpeed: random(-0.05, 0.05),
        strokeWeight: random(1, 5),
        filled: (elementType === 'text' || random() < 0.4),
        amplitude: random(30, 100),
        frequency: random(0.01, 0.03),
        spawnFrame: frameCount,
        initialMoveDuration: initialMoveDuration,
        totalDuration: totalDuration // 全体の寿命
      };

      if (elementType === 'text') {
        element.text = random(this.settings.words);
        element.fontSize = size * 0.8;
      }

      this.settings.elements.push(element);
    }

    // 画面外に出た要素を削除（totalDurationで判断）
    this.settings.elements = this.settings.elements.filter(element => {
      // オブジェクトが画面下部に到達したら削除（スクロール速度を考慮）
      let currentYPosition = element.targetY + (frameCount - element.spawnFrame) * this.settings.scrollSpeed;
      return (frameCount - element.spawnFrame) < element.totalDuration && currentYPosition > -element.size * 2; // 画面上部から完全に消えたら削除
    });
  },

  drawScene(g) {
    g.background(0);
    this.generateElements(g);

    let currentFrameData = {
      elements: this.captureElementStates()
    };
    this.settings.frameHistory.push(currentFrameData);

    while (this.settings.frameHistory.length > this.settings.echoFrames) {
      this.settings.frameHistory.shift();
    }

    for (let i = this.settings.frameHistory.length - 1; i >= 0; i--) {
      let frameData = this.settings.frameHistory[i];
      
      frameData.elements.forEach(elementState => {
        let finalAlpha = elementState.alpha; // 要素自体のフェードアウト効果
        
        let echoColor = color(elementState.color);
        echoColor.setAlpha(finalAlpha); 

        this.drawElementFromState(g, { ...elementState, color: echoColor, alpha: finalAlpha });
      });
    }

    this.drawForegroundEffects(g, frameCount);
  },

  drawForegroundEffects(g, currentFrame) {
    g.stroke(255, 10);
    g.strokeWeight(1);
    for (let i = 0; i < g.height; i += 4) {
      g.line(0, i, g.width, i);
    }
  }
};