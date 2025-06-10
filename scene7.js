let scene7 = {
    settings: {
        scrollSpeed: 2,
        backgroundColor: null,
        elements: [],
        loopTime: 300, // フレーム数でループ時間を定義
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
        fonts: ['Arial', 'Helvetica', 'Georgia', 'Times'],
        words: ['VISUAL', 'MOTION', 'LOOP', 'BEATS', 'FLOW', 'SYNC', 'WAVE', 'PULSE'],
        echoFrames: 5, // エコー効果のフレーム数
        frameHistory: [] // 過去のフレーム情報を保存
    },
    
    captureElementStates(currentFrame) {
        let elementStates = [];
        
        this.settings.elements.forEach(element => {
            let elementAge = (currentFrame - element.startFrame + this.settings.loopTime) % this.settings.loopTime;
            
            if (elementAge > element.duration) return;
            
            let progress = elementAge / element.duration;
            
            // 透明度アニメーション
            let alpha = sin(progress * PI) * 255;
            if (alpha < 10) return; // ほぼ透明な要素はスキップ
            
            // 位置計算（Y軸は等速移動、X軸のみ波動効果）
            let y = element.y;
            let waveOffset = sin(currentFrame * element.frequency + element.x * 0.01) * element.amplitude * (1 - progress);
            let x = element.x + waveOffset;
            
            elementStates.push({
                type: element.type,
                x: x,
                y: y,
                size: element.size,
                rotation: element.rotation + currentFrame * element.rotationSpeed,
                strokeWeight: element.strokeWeight,
                filled: element.filled,
                text: element.text,
                fontSize: element.fontSize,
                font: element.font
            });
        });
        
        return elementStates;
    },
    
    drawElementFromState(g, elementState) {
        g.push();
        g.translate(elementState.x, elementState.y);
        // 文字要素の場合は回転しない
        if (elementState.type !== 'text') {
            g.rotate(elementState.rotation);
        }
        
        // 色設定（常に白、不透明度100%）
        let c = color(255);
        
        if (elementState.filled) {
            g.fill(c);
            g.noStroke();
        } else {
            g.noFill();
            g.stroke(c);
            g.strokeWeight(elementState.strokeWeight);
        }
        
        // 形状描画
        switch (elementState.type) {
            case 'circle':
                g.ellipse(0, 0, elementState.size, elementState.size);
                break;
                
            case 'rect':
                g.rectMode(CENTER);
                g.rect(0, 0, elementState.size, elementState.size * 0.6);
                break;
                
            case 'triangle':
                g.triangle(-elementState.size/2, elementState.size/3, elementState.size/2, elementState.size/3, 0, -elementState.size/2);
                break;
                
            case 'text':
                g.fill(c);
                g.textFont(elementState.font);
                g.textSize(elementState.fontSize);
                g.text(elementState.text, 0, 0);
                break;
                
            case 'line':
                g.stroke(c);
                g.strokeWeight(elementState.strokeWeight);
                g.line(-elementState.size/2, 0, elementState.size/2, 0);
                g.line(0, -elementState.size/2, 0, elementState.size/2);
                break;
        }
        
        g.pop();
    },
    
    setupScene(g) {
        this.settings.backgroundColor = color(0);
        g.colorMode(RGB);
        g.textAlign(CENTER, CENTER);
        
        // 初期要素を生成
        this.generateElements(g);
    },
    
    generateElements(g) {
        this.settings.elements = [];
        
        // 様々な要素を生成
        for (let i = 0; i < 25; i++) {
            let elementType = random(['circle', 'rect', 'triangle', 'text', 'line']);
            let element = {
                type: elementType,
                x: random(-100, g.width + 100),
                y: random(g.height, g.height * 2),
                targetY: random(-200, g.height + 200),
                size: random(20, 120),
                color: '#FFFFFF',
                speed: random(0.5, 3),
                rotation: random(TWO_PI),
                rotationSpeed: random(-0.1, 0.1),
                startFrame: random(0, this.settings.loopTime),
                duration: random(60, 150),
                strokeWeight: random(1, 8),
                filled: random() > 0.5,
                easeType: random(['in', 'out', 'both']),
                amplitude: random(50, 200),
                frequency: random(0.01, 0.05)
            };
            
            if (elementType === 'text') {
                element.text = random(this.settings.words);
                element.fontSize = random(24, 72);
                element.font = random(this.settings.fonts);
            }
            
            this.settings.elements.push(element);
        }
    },
    
    drawScene(g) {
        // 背景グラデーション
        this.drawBackground(g);
        
        let currentFrame = frameCount % this.settings.loopTime;
        
        // 現在のフレームの要素状態を記録
        let currentFrameData = {
            frame: currentFrame,
            elements: this.captureElementStates(currentFrame)
        };
        
        // フレーム履歴に追加
        this.settings.frameHistory.push(currentFrameData);
        
        // 過去5フレームのみ保持
        if (this.settings.frameHistory.length > this.settings.echoFrames) {
            this.settings.frameHistory.shift();
        }
        
        // エコー効果で描画（過去フレームから現在まで）
        for (let i = 0; i < this.settings.frameHistory.length; i++) {
            let frameData = this.settings.frameHistory[i];
            
            g.push();
            g.translate(0, -frameData.frame * this.settings.scrollSpeed);
            
            // 全フレーム不透明度100%で描画
            frameData.elements.forEach(elementState => {
                this.drawElementFromState(g, elementState);
            });
            
            g.pop();
        }
        
        // 前景エフェクト
        this.drawForegroundEffects(g, currentFrame);
    },
    
    drawBackground(g) {
        // 黒背景
        g.background(0);
        
        // 背景パーティクル（白）
        g.fill(255, 30);
        g.noStroke();
        for (let i = 0; i < 20; i++) {
            let x = (noise(i * 0.1, frameCount * 0.01) * g.width);
            let y = (noise(i * 0.1 + 100, frameCount * 0.01) * g.height);
            g.ellipse(x, y, 2, 2);
        }
    },
    
    drawElement(g, element, currentFrame) {
        let elementAge = (currentFrame - element.startFrame + this.settings.loopTime) % this.settings.loopTime;
        
        if (elementAge > element.duration) return;
        
        let progress = elementAge / element.duration;
        let easedProgress;
        
        // イージング適用（フェードイン・アウト用）
        switch (element.easeType) {
            case 'in':
                easedProgress = easeIn(elementAge, element.duration);
                break;
            case 'out':
                easedProgress = easeOut(elementAge, element.duration);
                break;
            default:
                easedProgress = easeIn(elementAge, element.duration / 2) * 
                                (progress < 0.5 ? 1 : easeOut(elementAge - element.duration / 2, element.duration / 2));
        }
        
        // 位置計算（Y軸は等速移動、X軸のみ波動効果）
        let y = element.y; // Y座標は初期位置から変更しない（スクロールで移動）
        let waveOffset = sin(currentFrame * element.frequency + element.x * 0.01) * element.amplitude * (1 - progress);
        let x = element.x + waveOffset;
        
        // 透明度アニメーション
        let alpha = sin(progress * PI) * 255;
        let size = element.size;
        
        g.push();
        g.translate(x, y);
        // 文字要素の場合は回転しない
        if (element.type !== 'text') {
            g.rotate(element.rotation + currentFrame * element.rotationSpeed);
        }
        
        // 色設定
        let c = color(element.color);
        c.setAlpha(alpha);
        
        if (element.filled) {
            g.fill(c);
            g.noStroke();
        } else {
            g.noFill();
            g.stroke(c);
            g.strokeWeight(element.strokeWeight);
        }
        
        // 形状描画
        switch (element.type) {
            case 'circle':
                g.ellipse(0, 0, size, size);
                break;
                
            case 'rect':
                g.rectMode(CENTER);
                g.rect(0, 0, size, size * 0.6);
                break;
                
            case 'triangle':
                g.triangle(-size/2, size/3, size/2, size/3, 0, -size/2);
                break;
                
            case 'text':
                g.fill(c);
                g.textFont(element.font);
                g.textSize(element.fontSize);
                g.text(element.text, 0, 0);
                break;
                
            case 'line':
                g.stroke(c);
                g.strokeWeight(element.strokeWeight);
                g.line(-size/2, 0, size/2, 0);
                g.line(0, -size/2, 0, size/2);
                break;
        }
        
        g.pop();
    },
    
    drawForegroundEffects(g, currentFrame) {
        // スキャンライン効果
        g.stroke(255, 10);
        g.strokeWeight(1);
        for (let i = 0; i < g.height; i += 4) {
            g.line(0, i, g.width, i);
        }
        
        // 周期的なフラッシュ効果
        if (currentFrame % 60 < 5) {
            g.fill(255, 15);
            g.noStroke();
            g.rect(0, 0, g.width, g.height);
        }
        
        // ビート同期バー
        let beatProgress = (currentFrame % 30) / 30;
        let barHeight = easeOut(beatProgress, 1, 2) * 10;
        g.fill(255, 100);
        g.noStroke();
        g.rect(0, g.height - barHeight, g.width, barHeight);
    }
};