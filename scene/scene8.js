let scene8 = {
  // 内部変数
  _initialPassDone: false,
  _currentLogIndex: 0, // ログリストの現在の読み込み位置
  _previousLinesPerOutput: null, // 出力行数の変更を検出するための内部変数

  settings: {
    // 元の各種リストを一つの平坦なリストに統合
    // これにより、任意のN行ずつの出力に対応しやすくなります
    mainLogList: [
      // oneLineListから
      "CORE: dis ... [DATA AVAILABLE]", "APP: compress textu ... [ACTIVE]",
      "KERNEL: calibrate ... [RETRYING] ", "SERVICE: generate servic ... [DONE]",
      "SERVER: log transfer info ... [DONE] ", "SERVICE: buffer effect ad ... [ACTIVE]",
      "KERNEL: temp gain init m ... [INFO 0xCD]", "CORE: volume start client debug ... [OK] ",
      "APP: resource visual authen ... [COMPLETE]", "STATUS: network io display a ... [INFO 0xCD]",
      "SERVER: verify sync send frequenc ... [READY]", "CLIENT: io system fail network gp ... [FAILED]",
      "VISUAL: visual display resource e ... [RUNNING]", "APP: activate spectrum deactivat ... [INFO 0xCD]",
      "CORE: daemon pending init che ... [WARNING 0xAB]", "GPU: start network analyze driver s ... [PENDING]",
      "NETWORK: update buffer daemon secur ... [SUCCESS]", "SYSTEM: render pending driver proc ... [INFO 0xCD]",
      "WARNING: init memory restart error grap ... [DONE]", "PROCESS: disconnect audio upd ... [DATA AVAILABLE]",
      "SYSTEM: visual gpu check process serv ... [SYNCED]", "AUDIO: check alloc decompress devi ... [ERROR 404]",
      "PROCESS: log volume gpu install mem ... [RUNNING]", "INFO: process io start dmx storage stora ... [OK]",
      "LOG: warning transfer admin graph ... [INACTIVE]", "SERVICE: time log dmx time disabl ... [RUNNING]",
      "NETWORK: activate geometry effec ... [PENDING]", "INFO: monitor kernel decrypt cli ... [ACTIVE]",
      "TASK: device visual filter packet e ... [OK]", "AUDIO: driver geometry load ... [COMPLETE] ",
      "PROCESS: stream reset event ... [SUCCESS] ", "SYSTEM: generate monitor ... [ERROR 404]",
      "AUDIO: admin authenticate r ... [READY]", "SERVICE: success w ... [WARNING 0xAB]",
      "STATUS: temp success ... [OPTIMIZED]", "APP: texture reset l ... [PENDING]",
      "GPU: fail log text ... [VERIFIED]", "SERVICE: start ... [INFO 0xCD] ",
      "PROCESS: geomet ... [PENDING]", "WARNING: log fre ... [DONE]",
      "SYSTEM: rep ... [RETRYING]", "APP: dis ... [OPTIMIZED]",
      "SYSTEM: i ... [SUCCESS]", "AUDIO: g ... [FAILED]",
      "AUDIO: ... [ACTIVE] ", "SE ... [ERROR 404]",
      "IN ... [COMPLETE]", " ... [INFO 0xCD]",
      " ... [ERROR 404", " ... [INACTIVE",
      " ... [RUNNING", " ... [SUCCES",
      " ... [RETRY", " ... [DATA ",
      " ... [READ", " ... [OPTI",
      " ... [ERRO", " ... [SUCC",
      " ... [SUCC", " ... [STOPP",
      " ... [RUNNI", "DEB ... [OK]",
      // twoLineListの内容（平坦化）
      "aaa", "bbb", "ccc", "ddd", "eee", "fff",
      // fourLineListの内容（平坦化）
      "KERNEL: generative data d ... [RETRYING]", "INFO: texture warning virtua ... [OK]",
      "AUDIO: info telecom t ... [STOPPED]", "CLIENT: rollback fractal d ... [SUCCESS]",
      "ERROR: report baseline queue deactiva ... [ERROR 404]", "SECURITY: recovery backup time ... [NOMINAL] ",
      "CLIENT: data hotfix thread init t ... [PROCESSING]", "CMD: data throughput snapshot kernel a ... [ACTIVE]",
      "KERNEL: time container snapshot opti ... [OPTIMIZED]", "IO: transfer execute texture optimize ... [FLUSHED] ",
      "ANALYZE: buffer load iterative interface ... [VERIFIED]", "APP: config optimize recovery dmx user s ... [WARNING 0xAB]",
      "KERNEL: synchronize connect status disable e ... [READY]", "EFFECT: service spectrum recovery backup kernel s ... [NO DATA]",
      "EFFECT: update abstract connect secure aut ... [DATA AVAILABLE]", "PROCESS: install version routing sync opti ... [CRITICAL]",
      "NETWORK: complete warning version pro ... [WARNING 0xAB]", "CORE: orchestrate restore volume transf ... [ERROR 404]",
      "CORE: audio stream archive temp authorization snaps ... [DONE]", "UPDATE: free latency volume diagnostic queu ... [INFO 0xCD]",
      "STATUS: queue admin kernel free verify admi ... [OK]", "SECURITY: virtual connect session alloc ... [READY] ",
      "STATUS: calibrate validation midi ... [PENDING]", "ANALYZE: provision integrity stream vide ... [NO DATA]",
      "INFO: network event t ... [PROCESSING]", "SECURITY: execute video ... [INITIALIZING]",
      "INIT: enable check debug de ... [DONE]", "INFO: start stream message calibra ... [DONE]",
      "SERVER: disconnect daemon ... [DONE]", "SECURITY: patch ... [PENDING] ",
      "SYSTEM: deform subsy ... [NOMINAL]", "WARNING: install info ... [FAILED] ",
      "INFO: sy ... [RUNNING]", "VISUAL: fi ... [SUCCESS]",
      "UPDATE: morph ... [CRITICAL]", "SYSTEM: buffe ... [SYNCED]",
      "SYSTEM: ... [SYNCED]", "DATA: re ... [READY]",
      "RENDER ... [RUNNING]", "UPDATE: t ... [FAILED]"
    ],
    // 最初に一周だけ表示するリスト (平坦化)
    firstPassLogList: [
      "Initializing system core 7.0.1 (build 20250611_2230)... [OK]",
      "Loading kernel modules: acpi cpufreq ext4 usbhid nvidia_drm... [DONE]",
      "Mounting /dev/sda1 on /boot/efi as FAT32 filesystem... [SUCCESS]",
      "Compiling real-time shader assets for scene_delta (Final Pass)... 95% complete.",
      "Generating dynamic texture maps: 2048x2048, Plasma (Sine), Scale=0.9, Seed=23456.",
      "AAA", "BBB", "CCC", "DDD", "EEE", "FFF",
      "AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH"
    ],
    backgroundColor: null,
  },

  setupScene(g) {
    // 背景色とカラーモードを設定
    this.settings.backgroundColor = g.color(0, 20); // 透過性のある背景色
    g.colorMode(g.HSB, 360, 100, 100, 100); // HSBモードに設定
    // 内部変数を初期化
    this._initialPassDone = false;
    this._currentLogIndex = 0;
    // 初期設定の出力行数を保持し、変更検出に利用
    // intensityはグローバル変数として定義されている前提
    this._previousLinesPerOutput = Math.max(0, Math.floor(intensity / 5));
  },

  drawScene(g) {
    // intensityから現在の出力行数を計算（最低1行）
    // intensityはグローバル変数として定義されている前提
    const currentLinesPerOutput = Math.max(0, Math.floor(intensity / 5));

    // 出力行数が変更されたか検出
    if (currentLinesPerOutput !== this._previousLinesPerOutput) {
      addLog(`Lines per output changed to: ${currentLinesPerOutput}. Starting initial pass.`);
      this._initialPassDone = false; // ファーストパスを再実行
      this._currentLogIndex = 0; // インデックスをリセット
      this._previousLinesPerOutput = currentLinesPerOutput; // 変更を記録
    }

    let listToUse;
    if (!this._initialPassDone) {
      listToUse = this.settings.firstPassLogList;
    } else {
      listToUse = this.settings.mainLogList;
    }

    if (listToUse.length === 0) {
      return; // リストが空の場合は何もしない
    }

    // 背景をクリア
    g.background(this.settings.backgroundColor);

    const LOG_LINE_HEIGHT = 18; // ログメッセージの行間の高さ
    const startY = 20; // キャンバスの上からの開始位置

    // 現在表示すべきログを抽出し、addLog経由で出力
    for (let i = 0; i < currentLinesPerOutput; i++) {
      let actualLogIndex = (this._currentLogIndex + i);

      // ループモードの場合はリストの長さに合わせてインデックスを調整
      if (this._initialPassDone && listToUse.length > 0) {
        actualLogIndex %= listToUse.length;
      }

      // ファーストパス中にリストの終わりに達した場合、それ以上のログは出力しない
      if (!this._initialPassDone && actualLogIndex >= listToUse.length) {
        break;
      }

      const message = listToUse[actualLogIndex];
      if (message !== undefined) {
        addLog(message); // 外部で定義された addLog 関数を使用
      }
    }

    // 次のフレームのためにインデックスを更新
    // ファーストパスの処理
    if (!this._initialPassDone) {
      this._currentLogIndex += currentLinesPerOutput;
      if (this._currentLogIndex >= listToUse.length) {
        this._initialPassDone = true; // 最初のパスが完了
        this._currentLogIndex = 0; // ループリストに切り替えるのでインデックスをリセット
        addLog(`Initial pass completed. Switching to loop mode.`);
      }
    } else {
      // ループリストの場合の処理 (現在のインデックスを更新し、リストの長さに合わせてラップアラウンド)
      this._currentLogIndex = (this._currentLogIndex + currentLinesPerOutput) % listToUse.length;
    }
  }
};
