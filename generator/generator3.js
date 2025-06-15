let frames = []; // 3次元配列 (フレーム数 x 高さ x 幅)
let frameCountMax = 60; // 生成するフレーム数
let rotationSpeed = 0.5 * Math.PI / 60; // 1秒(60フレーム)で90度 (PI/2) 回転
let pg; // オフスクリーンレンダリング用グラフィックスバッファ

function setup() {
  createCanvas(50, 30, WEBGL); // 幅50、高さ30のキャンバスをWebGLモードで作成
  pixelDensity(1); // ピクセル密度を1に設定
  pg = createGraphics(50, 30, WEBGL);
}

function draw() {
  if (frameCount > frameCountMax) {
    noLoop();
    console.log("配列生成が完了しました。");
    console.log("生成された配列のサイズ:", frames.length, "x", frames[0].length, "x", frames[0][0].length);

    // 配列をJavaScriptファイルとして保存する処理を呼び出し
    saveArrayAsJSFile(frames, "imageData.js", "imageData"); // ファイル名と変数名を指定

    return;
  }

  // グラフィックスバッファに描画
  pg.background(0); // 背景を黒に
  pg.stroke(255);   // 枠線を白に
  pg.noFill();     // 塗りつぶしなし

  // 立方体の回転
  pg.rotateX(frameCount * rotationSpeed);
  pg.rotateY(frameCount * rotationSpeed);
  pg.box(20); // 立方体を描画（サイズは調整可能）

  // メインキャンバスにグラフィックスバッファを描画
  image(pg, -width / 2, -height / 2, width, height);

  // ピクセル情報を取得
  pg.loadPixels();
  let currentFrameData = [];
  for (let y = 0; y < pg.height; y++) {
    let row = [];
    for (let x = 0; x < pg.width; x++) {
      let index = (x + y * pg.width) * 4;
      let colorValue = pg.pixels[index];
      row.push(colorValue > 127 ? 1 : 0);
    }
    currentFrameData.push(row);
  }
  frames.push(currentFrameData);

  // 進行状況表示（オプション）
  displayProgress();
}

// 進行状況をキャンバスに表示する関数
function displayProgress() {
  // WEBGLモードの場合、2D描画は別の設定が必要ですが、
  // 今回はコンソール出力で十分と判断し、表示は省略します。
  // もしキャンバス上に表示したい場合は、新しいグラフィックスバッファを作成し、
  // WEBGLモードではなく2Dモードで作成する必要があります。
}

/**
 * 3次元配列をJSON形式の文字列に変換し、JavaScriptファイルとしてダウンロードします。
 * @param {Array} arrayToSave 保存する3次元配列
 * @param {string} fileName 保存するファイル名 (例: "data.js")
 * @param {string} variableName ファイル内で配列を格納する変数名 (例: "myArray")
 */
function saveArrayAsJSFile(arrayToSave, fileName, variableName) {
  // 配列をJSON文字列に変換
  const jsonString = JSON.stringify(arrayToSave);

  // 変数宣言を含んだJavaScriptファイルの内容を作成
  const jsContent = `const ${variableName} = ${jsonString};`;

  // Blobを作成
  const blob = new Blob([jsContent], { type: "application/javascript" });

  // ダウンロードリンクを作成
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // ダウンロードされるファイル名
  document.body.appendChild(a); // ドキュメントに追加（一時的）
  a.click(); // クリックしてダウンロードを開始
  document.body.removeChild(a); // ダウンロード後、要素を削除
  URL.revokeObjectURL(url); // URLを解放
  console.log(`${fileName} をダウンロードしました。`);
}