let scene8 = {
  // 内部変数
  _initialPassDone: false,
  _currentLogIndex: 0, // ログリストの現在の読み込み位置
  _previousLinesPerOutput: null, // 出力行数の変更を検出するための内部変数

  settings: {
    o: "1", // 1 or 2 or 3
    frameCounter: 0,
    // 元の各種リストを一つの平坦なリストに統合
    // これにより、任意のN行ずつの出力に対応しやすくなります
    mainLogList: [
      "Initializing system core 7.0.1 (build 20250611_2230)... [OK]",
      "Loading kernel modules: acpi cpufreq ext4 usbhid nvidia_drm... [DONE]",
      "Mounting /dev/sda1 on /boot/efi as FAT32 filesystem... [SUCCESS]",
      "Compiling real-time shader assets for scene_delta (Final Pass)... 95% complete.",
      "Generating dynamic texture maps: 2048x2048, Plasma (Sine), Scale=0.9, Seed=23456.",
        "Initializing system core 7.0.1 (build 20250611_2230)... [OK]",
        "Loading kernel modules: acpi cpufreq ext4 usbhid nvidia_drm... [DONE]",
        "Mounting /dev/sda1 on /boot/efi as FAT32 filesystem... [SUCCESS]",
        "Compiling real-time shader assets for scene_delta (Final Pass)... 95% complete.",
        "Generating dynamic texture maps: 2048x2048, Plasma (Sine), Scale=0.9, Seed=23456.",
        "System clock synchronized via NTP (ntp.openai.net)... [OK]",
        "Detecting connected displays... 2 display(s) detected.",
        "Loading audio drivers: alsa pulse jack... [DONE]",
        "Initializing GPU instance (NVIDIA RTX 5090Ti)... [OK]",
        "Allocating video memory pool: 16384MB... [SUCCESS]",
        "Parsing scene graph for scene_delta... 128 nodes found.",
        "Loading texture pack 'urban_night_v2'... [DONE]",
        "Compiling vertex shader: shader_main.vert... [SUCCESS]",
        "Compiling fragment shader: post_fx.frag... [SUCCESS]",
        "Uploading shaders to GPU... [DONE]",
        "Binding textures to active slots... [OK]",
        "Establishing secure websocket connection to 192.168.0.12:8181... [CONNECTED]",
        "Authorizing client token: 34a8b6df123e90... [GRANTED]",
        "Enabling physics simulation subsystem... [OK]",
        "Creating procedural mesh: tunnel_segment_01... [COMPLETE]",
        "Initializing particle system: particle_flare_02... 1000 emitters ready.",
        "Caching lightmap for scene_delta... 64 probes processed.",
        "Starting audio playback engine... [OK]",
        "Streaming soundtrack: ambient_loop_03.wav... [PLAYING]",
        "Mounting additional assets from /mnt/drive_b/scene_extras... [DONE]",
        "Compiling Lua script: ai_director.lua... [SUCCESS]",
        "Setting ambient lighting parameters: Intensity=0.8, Color=#FFAACC",
        "Executing startup script: init_vr_environment.sh... [OK]",
        "Calibrating VR headset (Vive Pro 3)... [SUCCESS]",
        "Tracking base stations detected: 2 units.",
        "Synchronizing player profile: user_deltav... [LOADED]",
        "Fetching leaderboard data... 128 entries retrieved.",
        "Initializing network session (peer-to-peer)... [ACTIVE]",
        "Registering input devices: gamepad, keyboard, mouse... [OK]",
        "Establishing matchmaking service link... [CONNECTED]",
        "Creating dynamic reflection probes... 16 active.",
        "Allocating audio channels: 64 simultaneous streams.",
        "Starting background asset loader thread... [RUNNING]",
        "Monitoring system temperature... CPU: 62°C, GPU: 71°C",
        "Scanning for local servers... 1 server found.",
        "Preparing dynamic weather system... [READY]",
        "Generating cloud volume: 1024x1024x256... [DONE]",
        "Loading font assets: OpenSans, Roboto, SourceCodePro... [OK]",
        "Configuring user interface layout... [COMPLETE]",
        "Launching scene manager instance... [ACTIVE]",
        "Generating procedural foliage mesh: 2048 instances.",
        "Applying post-processing effects chain... [ENGAGED]",
        "Compiling physics collision mesh: 4096 faces.",
        "Uploading mesh buffers to GPU... [DONE]",
        "Establishing voice chat connection... [CONNECTED]",
        "Loading motion capture data: session_23_capture.bvh... [SUCCESS]",
        "Starting AI navigation mesh generation... 512 zones computed.",
        "Compiling compute shader: particle_simulation.comp... [OK]",
        "Allocating compute shader storage buffers... 256MB",
        "Applying audio reverb settings: LargeHall, Wet=0.7",
        "Mounting DLC pack: future_city_extension_v1.2... [DONE]",
        "Synchronizing cloud save data... [SYNCED]",
        "Initializing in-game economy subsystem... [OK]",
        "Parsing dialogue tree for mission_05... 32 nodes.",
        "Setting dynamic resolution scaling parameters... Target=90fps",
        "Loading procedural skybox textures... [COMPLETE]",
        "Executing AI behavior scripts... [ACTIVE]",
        "Caching terrain LOD levels... 4 levels computed.",
        "Loading localization pack: ja_JP, en_US, fr_FR... [DONE]",
        "Starting social overlay services... [OK]",
        "Linking player statistics database... [CONNECTED]",
        "Assigning NPC behavior controllers... 128 agents.",
        "Compiling animation state machine: character_rig_01... [OK]",
        "Initializing inverse kinematics solver... [READY]",
        "Creating foliage billboard atlas... 512 entries.",
        "Registering multiplayer session: 5 players.",
        "Streaming world data chunks... 2048KB/s",
        "Preparing destructible object manager... [ENGAGED]",
        "Synchronizing in-game event triggers... [SYNCED]",
        "Applying screen-space ambient occlusion... [ACTIVE]",
        "Binding depth pre-pass shader... [OK]",
        "Spawning ambient AI agents... 64 entities.",
        "Scanning available VR room-scale boundaries... [FOUND]",
        "Registering weather effect emitters... 32 units.",
        "Allocating real-time shadow maps... 8192x8192",
        "Compiling tessellation shader: terrain_detail.tesc... [DONE]",
        "Applying volumetric lighting effects... [ACTIVE]",
        "Executing cutscene sequence: intro_scene.cam... [RUNNING]",
        "Starting facial animation blendshape manager... [OK]",
        "Loading weapon inventory definitions... [SUCCESS]",
        "Synchronizing co-op player inventories... [COMPLETE]",
        "Starting adaptive audio mixer... [ACTIVE]",
        "Loading environment cubemap: city_night_01.hdr... [OK]",
        "Registering input action mappings... 84 bindings.",
        "Creating vehicle physics profiles... 16 types.",
        "Executing server heartbeat ping... 32ms response.",
        "Mounting encrypted archive: dlc_future_city.dat... [DONE]",
        "Synchronizing real-time weather feed... [UPDATED]",
        "Generating procedural urban sprawl mesh... 32768 polys.",
        "Linking cinematic camera manager... [CONNECTED]",
        "Applying HDR tone mapping curve... [ACTIVE]",
        "Starting ragdoll physics simulations... [OK]",
        "Compiling GPU particle system shaders... [DONE]",
        "Uploading dynamic lighting buffers... 64MB",
        "Executing deferred lighting pass... [COMPLETE]",
        "Scanning saved replay data... 4 files found.",
        "Mounting networked asset repository... [CONNECTED]",
        "Synchronizing online marketplace listings... [DONE]",
        "Generating AI personality profiles... 64 types.",
        "Initializing player emoticon manager... [OK]",
        "Compiling cloud-based shader variants... 4096 permutations.",
        "Allocating VR controller haptics channels... [READY]",
        "Applying ambient audio loops... 16 tracks.",
        "Binding bloom post-effect shader... [ACTIVE]",
        "Streaming voice chat audio buffers... 128KB/s",
        "Registering environmental hazard zones... 8 zones.",
        "Calibrating hand-tracking sensors... [SUCCESS]",
        "Launching procedural story generator... [RUNNING]",
        "Applying global illumination probes... 128 samples.",
        "Streaming multiplayer avatar data... 32MB",
        "Loading subsurface scattering LUT... [OK]",
        "Compiling skin shader for character models... [SUCCESS]",
        "Generating ambient occlusion map... 2048x2048",
        "Uploading animation skeletons... 256 rigs.",
        "Compiling UI layout graphs... [COMPLETE]",
        "Synchronizing online achievements... [SYNCED]",
        "Starting game event scheduler... [ACTIVE]",
        "Configuring particle collision callbacks... [OK]",
        "Registering AI squad formations... 16 groups.",
        "Allocating audio spatialization buffers... 64MB",
        "Mounting virtual file system... [SUCCESS]",
        "Compiling pathfinding heuristics module... [DONE]",
        "Streaming cutscene audio tracks... 256KB/s",
        "Synchronizing server world state... [UP-TO-DATE]",
        "Executing real-time data analytics pass... [COMPLETE]",
    ],
    // 最初に一周だけ表示するリスト (平坦化)
    firstPassLogList: [
      "Initializing system core 7.0.1 (build 20250611_2230)... [OK]",
      "Loading kernel modules: acpi cpufreq ext4 usbhid nvidia_drm... [DONE]",
      "Mounting /dev/sda1 on /boot/efi as FAT32 filesystem... [SUCCESS]",
      "Compiling real-time shader assets for scene_delta (Final Pass)... 95% complete.",
      "Generating dynamic texture maps: 2048x2048, Plasma (Sine), Scale=0.9, Seed=23456.",
        "Initializing system core 7.0.1 (build 20250611_2230)... [OK]",
        "Loading kernel modules: acpi cpufreq ext4 usbhid nvidia_drm... [DONE]",
        "Mounting /dev/sda1 on /boot/efi as FAT32 filesystem... [SUCCESS]",
        "Compiling real-time shader assets for scene_delta (Final Pass)... 95% complete.",
        "Generating dynamic texture maps: 2048x2048, Plasma (Sine), Scale=0.9, Seed=23456.",
        "System clock synchronized via NTP (ntp.openai.net)... [OK]",
        "Detecting connected displays... 2 display(s) detected.",
        "Loading audio drivers: alsa pulse jack... [DONE]",
        "Initializing GPU instance (NVIDIA RTX 5090Ti)... [OK]",
        "Allocating video memory pool: 16384MB... [SUCCESS]",
        "Parsing scene graph for scene_delta... 128 nodes found.",
        "Loading texture pack 'urban_night_v2'... [DONE]",
        "Compiling vertex shader: shader_main.vert... [SUCCESS]",
        "Compiling fragment shader: post_fx.frag... [SUCCESS]",
        "Uploading shaders to GPU... [DONE]",
        "Binding textures to active slots... [OK]",
        "Establishing secure websocket connection to 192.168.0.12:8181... [CONNECTED]",
        "Authorizing client token: 34a8b6df123e90... [GRANTED]",
        "Enabling physics simulation subsystem... [OK]",
        "Creating procedural mesh: tunnel_segment_01... [COMPLETE]",
        "Initializing particle system: particle_flare_02... 1000 emitters ready.",
        "Caching lightmap for scene_delta... 64 probes processed.",
        "Starting audio playback engine... [OK]",
        "Streaming soundtrack: ambient_loop_03.wav... [PLAYING]",
        "Mounting additional assets from /mnt/drive_b/scene_extras... [DONE]",
        "Compiling Lua script: ai_director.lua... [SUCCESS]",
        "Setting ambient lighting parameters: Intensity=0.8, Color=#FFAACC",
        "Executing startup script: init_vr_environment.sh... [OK]",
        "Calibrating VR headset (Vive Pro 3)... [SUCCESS]",
        "Tracking base stations detected: 2 units.",
        "Synchronizing player profile: user_deltav... [LOADED]",
        "Fetching leaderboard data... 128 entries retrieved.",
        "Initializing network session (peer-to-peer)... [ACTIVE]",
        "Registering input devices: gamepad, keyboard, mouse... [OK]",
        "Establishing matchmaking service link... [CONNECTED]",
        "Creating dynamic reflection probes... 16 active.",
        "Allocating audio channels: 64 simultaneous streams.",
        "Starting background asset loader thread... [RUNNING]",
        "Monitoring system temperature... CPU: 62°C, GPU: 71°C",
        "Scanning for local servers... 1 server found.",
        "Preparing dynamic weather system... [READY]",
        "Generating cloud volume: 1024x1024x256... [DONE]",
        "Loading font assets: OpenSans, Roboto, SourceCodePro... [OK]",
        "Configuring user interface layout... [COMPLETE]",
        "Launching scene manager instance... [ACTIVE]",
        "Generating procedural foliage mesh: 2048 instances.",
        "Applying post-processing effects chain... [ENGAGED]",
        "Compiling physics collision mesh: 4096 faces.",
        "Uploading mesh buffers to GPU... [DONE]",
        "Establishing voice chat connection... [CONNECTED]",
        "Loading motion capture data: session_23_capture.bvh... [SUCCESS]",
        "Starting AI navigation mesh generation... 512 zones computed.",
        "Compiling compute shader: particle_simulation.comp... [OK]",
        "Allocating compute shader storage buffers... 256MB",
        "Applying audio reverb settings: LargeHall, Wet=0.7",
        "Mounting DLC pack: future_city_extension_v1.2... [DONE]",
        "Synchronizing cloud save data... [SYNCED]",
        "Initializing in-game economy subsystem... [OK]",
        "Parsing dialogue tree for mission_05... 32 nodes.",
        "Setting dynamic resolution scaling parameters... Target=90fps",
        "Loading procedural skybox textures... [COMPLETE]",
        "Executing AI behavior scripts... [ACTIVE]",
        "Caching terrain LOD levels... 4 levels computed.",
        "Loading localization pack: ja_JP, en_US, fr_FR... [DONE]",
        "Starting social overlay services... [OK]",
        "Linking player statistics database... [CONNECTED]",
        "Assigning NPC behavior controllers... 128 agents.",
        "Compiling animation state machine: character_rig_01... [OK]",
        "Initializing inverse kinematics solver... [READY]",
        "Creating foliage billboard atlas... 512 entries.",
        "Registering multiplayer session: 5 players.",
        "Streaming world data chunks... 2048KB/s",
        "Preparing destructible object manager... [ENGAGED]",
        "Synchronizing in-game event triggers... [SYNCED]",
        "Applying screen-space ambient occlusion... [ACTIVE]",
        "Binding depth pre-pass shader... [OK]",
        "Spawning ambient AI agents... 64 entities.",
        "Scanning available VR room-scale boundaries... [FOUND]",
        "Registering weather effect emitters... 32 units.",
        "Allocating real-time shadow maps... 8192x8192",
        "Compiling tessellation shader: terrain_detail.tesc... [DONE]",
        "Applying volumetric lighting effects... [ACTIVE]",
        "Executing cutscene sequence: intro_scene.cam... [RUNNING]",
        "Starting facial animation blendshape manager... [OK]",
        "Loading weapon inventory definitions... [SUCCESS]",
        "Synchronizing co-op player inventories... [COMPLETE]",
        "Starting adaptive audio mixer... [ACTIVE]",
        "Loading environment cubemap: city_night_01.hdr... [OK]",
        "Registering input action mappings... 84 bindings.",
        "Creating vehicle physics profiles... 16 types.",
        "Executing server heartbeat ping... 32ms response.",
        "Mounting encrypted archive: dlc_future_city.dat... [DONE]",
        "Synchronizing real-time weather feed... [UPDATED]",
        "Generating procedural urban sprawl mesh... 32768 polys.",
        "Linking cinematic camera manager... [CONNECTED]",
        "Applying HDR tone mapping curve... [ACTIVE]",
        "Starting ragdoll physics simulations... [OK]",
        "Compiling GPU particle system shaders... [DONE]",
        "Uploading dynamic lighting buffers... 64MB",
        "Executing deferred lighting pass... [COMPLETE]",
        "Scanning saved replay data... 4 files found.",
        "Mounting networked asset repository... [CONNECTED]",
        "Synchronizing online marketplace listings... [DONE]",
        "Generating AI personality profiles... 64 types.",
        "Initializing player emoticon manager... [OK]",
        "Compiling cloud-based shader variants... 4096 permutations.",
        "Allocating VR controller haptics channels... [READY]",
        "Applying ambient audio loops... 16 tracks.",
        "Binding bloom post-effect shader... [ACTIVE]",
        "Streaming voice chat audio buffers... 128KB/s",
        "Registering environmental hazard zones... 8 zones.",
        "Calibrating hand-tracking sensors... [SUCCESS]",
        "Launching procedural story generator... [RUNNING]",
        "Applying global illumination probes... 128 samples.",
        "Streaming multiplayer avatar data... 32MB",
        "Loading subsurface scattering LUT... [OK]",
        "Compiling skin shader for character models... [SUCCESS]",
        "Generating ambient occlusion map... 2048x2048",
        "Uploading animation skeletons... 256 rigs.",
        "Compiling UI layout graphs... [COMPLETE]",
        "Synchronizing online achievements... [SYNCED]",
        "Starting game event scheduler... [ACTIVE]",
        "Configuring particle collision callbacks... [OK]",
        "Registering AI squad formations... 16 groups.",
        "Allocating audio spatialization buffers... 64MB",
        "Mounting virtual file system... [SUCCESS]",
        "Compiling pathfinding heuristics module... [DONE]",
        "Streaming cutscene audio tracks... 256KB/s",
        "Synchronizing server world state... [UP-TO-DATE]",
        "Executing real-time data analytics pass... [COMPLETE]",
    ],
    Log2: "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
    backgroundColor: null,
  },

  setupScene(g) {
    // 背景色とカラーモードを設定
    this.settings.backgroundColor = g.color(20); // 透過性のある背景色
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
      this._currentLogIndex = 0; // インデックスをリセット
      this._previousLinesPerOutput = currentLinesPerOutput; // 変更を記録
    }

    // パターン1
    if (this.settings.o == "1") {
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

    // パターン2
    if (this.settings.o == "2") {
        for (let i = 0; i < 24; i++) {
            if ((i + this.settings.frameCounter) % 5 == 0) {
                addLog("STATUS:" + "-".repeat(52) + "[RUNNING]");
            } else {
                let headers = ["STATUS:", "CLIENT:", "KERNEL:", "STATUS:", "CLIENT:", "KERNEL:"];
                let header = headers[this.settings.frameCounter];
                addLog(header + ".".repeat(54) + "[RUNNING]");
            }
        }
        this.settings.frameCounter += 1;
        if (this.settings.frameCounter >= 5) {
            this.settings.frameCounter = 0;
        }
    }

    // パターン3
    if (this.settings.o == "3") {
        if (this.settings.frameCounter >= 84) {
            this.settings.frameCounter = 0;
        }
        for (let i = 0; i < 24; i++) {
            if ((i + this.settings.frameCounter) % 5 == 0) {
                let row = "";
                for (let j = 0; j < 50; j++) {
                    if(imageData[this.settings.frameCounter][23-i][j] == 1) {
                        row += "=";
                    } else {
                        row += "-";
                    }
                }
                addLog("STATUS:" + "-----" + row + "--[RUNNING]");
            } else {
                console.log("print this");
                let headers = ["STATUS:", "CLIENT:", "KERNEL:", "STATUS:", "CLIENT:", "KERNEL:"];
                let header = headers[this.settings.frameCounter % 5];
                let row = "";
                for (let j = 0; j < 50; j++) {
                    if(imageData[this.settings.frameCounter][23-i][j] == 1) {
                        row += "=";
                    } else {
                        row += ".";
                    }
                }
                addLog(header + "....." + row + "...[RUNNING]");
            }
        }
        this.settings.frameCounter += 1;
        if (this.settings.frameCounter >= 84) {
            this.settings.frameCounter = 0;
        }

    }


    // パターン4
    if (this.settings.o == "4") {
        for (let i = 0; i < 24; i++) {
            if ((i + this.settings.frameCounter) % 5 == 0) {
                let row = "";
                for (let j = 0; j < 50; j++) {
                    if(imageData2[this.settings.frameCounter][27-i][j] == 1) {
                        row += "=";
                    } else {
                        row += "-";
                    }
                }
                addLog("STATUS:" + "-----" + row + "--[RUNNING]");
            } else {
                console.log("print this");
                let headers = ["STATUS:", "CLIENT:", "KERNEL:", "STATUS:", "CLIENT:", "KERNEL:"];
                let header = headers[this.settings.frameCounter % 5];
                let row = "";
                for (let j = 0; j < 50; j++) {
                    if(imageData2[this.settings.frameCounter][27-i][j] == 1) {
                        row += "=";
                    } else {
                        row += ".";
                    }
                }
                addLog(header + "....." + row + "...[RUNNING]");
            }
        }
        this.settings.frameCounter += 1;
        if (this.settings.frameCounter >= 84*4) {
            this.settings.frameCounter = 0;
        }

    }

    // パターン5
    if (this.settings.o == "5") {
        let headers = ["STATUS:", "CLIENT:", "KERNEL:", "STATUS:", "CLIENT:", "KERNEL:"];
        let header = headers[this.settings.frameCounter % 5];
        addLog(header + "...");
        this.settings.frameCounter += 1;
        if (this.settings.frameCounter >= 5) {
            this.settings.frameCounter = 0;
        }
    }
}
};
