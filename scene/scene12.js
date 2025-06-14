let scene8 = {
  // 内部変数
  _initialPassDone: false,
  _currentListIndex: 0,
  _previousListType: null, // listTypeの変更を検出するための内部変数

  settings: {
    listType: "oneLine", // "oneLine", "twoLine", "fourLine"
    oneLineList: [
  "CORE: dis ... [DATA AVAILABLE]",
  "APP: compress textu ... [ACTIVE]",
  "KERNEL: calibrate ... [RETRYING] ",
  "SERVICE: generate servic ... [DONE]",
  "SERVER: log transfer info ... [DONE] ",
  "SERVICE: buffer effect ad ... [ACTIVE]",
  "KERNEL: temp gain init m ... [INFO 0xCD]",
  "CORE: volume start client debug ... [OK] ",
  "APP: resource visual authen ... [COMPLETE]",
  "STATUS: network io display a ... [INFO 0xCD]",
  "SERVER: verify sync send frequenc ... [READY]",
  "CLIENT: io system fail network gp ... [FAILED]",
  "VISUAL: visual display resource e ... [RUNNING]",
  "APP: activate spectrum deactivat ... [INFO 0xCD]",
  "CORE: daemon pending init che ... [WARNING 0xAB]",
  "GPU: start network analyze driver s ... [PENDING]",
  "NETWORK: update buffer daemon secur ... [SUCCESS]",
  "SYSTEM: render pending driver proc ... [INFO 0xCD]",
  "WARNING: init memory restart error grap ... [DONE]",
  "PROCESS: disconnect audio upd ... [DATA AVAILABLE]",
  "SYSTEM: visual gpu check process serv ... [SYNCED]",
  "AUDIO: check alloc decompress devi ... [ERROR 404]",
  "PROCESS: log volume gpu install mem ... [RUNNING]",
  "INFO: process io start dmx storage stora ... [OK]",
  "LOG: warning transfer admin graph ... [INACTIVE]",
  "SERVICE: time log dmx time disabl ... [RUNNING]",
  "NETWORK: activate geometry effec ... [PENDING]",
  "INFO: monitor kernel decrypt cli ... [ACTIVE]",
  "TASK: device visual filter packet e ... [OK]",
  "AUDIO: driver geometry load ... [COMPLETE] ",
  "PROCESS: stream reset event ... [SUCCESS] ",
  "SYSTEM: generate monitor ... [ERROR 404]",
  "AUDIO: admin authenticate r ... [READY]",
  "SERVICE: success w ... [WARNING 0xAB]",
  "STATUS: temp success ... [OPTIMIZED]",
  "APP: texture reset l ... [PENDING]",
  "GPU: fail log text ... [VERIFIED]",
  "SERVICE: start ... [INFO 0xCD] ",
  "PROCESS: geomet ... [PENDING]",
  "WARNING: log fre ... [DONE]",
  "SYSTEM: rep ... [RETRYING]",
  "APP: dis ... [OPTIMIZED]",
  "SYSTEM: i ... [SUCCESS]",
  "AUDIO: g ... [FAILED]",
  "AUDIO: ... [ACTIVE] ",
  "SE ... [ERROR 404]",
  "IN ... [COMPLETE]",
  " ... [INFO 0xCD]",
  " ... [ERROR 404",
  " ... [INACTIVE",
  " ... [RUNNING",
  " ... [SUCCES",
  " ... [RETRY",
  " ... [DATA ",
  " ... [READ",
  " ... [OPTI",
  " ... [ERRO",
  " ... [SUCC",
  " ... [SUCC",
  " ... [STOPP",
  " ... [RUNNI",
  "DEB ... [OK]",
  " ... [ERROR ",
  " ... [OPTIMIZ",
  " ... [INACTIVE",
  " ... [COMPLETE]",
  " ... [OPTIMIZED]",
  "CLIEN ... [SYNCED]",
  "GPU: ... [STOPPED] ",
  "W ... [WARNING 0xAB]",
  "AUDIO: task l ... [OK]",
  "KERNEL: ch ... [SYNCED]",
  "DEBUG: deact ... [FAILED]",
  "APP: install serve ... [OK]",
  "CLIENT: optimiz ... [FAILED]",
  "NETWORK: user t ... [RETRYING]",
  "DEBUG: admin midi r ... [SYNCED]",
  "ERROR: shader buf ... [ERROR 404]",
  "SERVICE: restart unl ... [RETRYING]",
  "NETWORK: disconnect r ... [INFO 0xCD]",
  "KERNEL: authenticate a ... [ERROR 404]",
  "TASK: disconnect monitor o ... [STOPPED]",
  "NETWORK: server display con ... [PENDING]",
  "KERNEL: execute memory module sys ... [OK]",
  "KERNEL: event cpu client gene ... [RETRYING]",
  "INFO: texture encrypted geomet ... [COMPLETE]",
  "SERVER: generate uptime process ... [VERIFIED]",
  "INFO: admin render error system ... [OPTIMIZED]",
  "DEBUG: sync stop decompress client ... [PENDING]",
  "SYSTEM: geometry stop alloc unload ... [SUCCESS]",
  "CMD: install io authenticate transfer st ... [OK]",
  "SYSTEM: spectrum log pending verif ... [VERIFIED]",
  "INFO: memory update system amplitu ... [OPTIMIZED]",
  "SERVER: transfer disable reset monit ... [PENDING]",
  "SERVICE: driver execute texture comp ... [SUCCESS]",
  "CLIENT: warning memory log sync ve ... [OPTIMIZED]",
  "GPU: send filter decrypt deactivate u ... [FAILED]",
  "ERROR: geometry calibrate compress ... [COMPLETE]",
  "PROCESS: encrypted config system se ... [STOPPED]",
  "CLIENT: cpu generate particle render ev ... [OK]",
  "CLIENT: complete spectrum st ... [WARNING 0xAB]",
  "KERNEL: enable sync gain config ... [PENDING] ",
  "WARNING: buffer spectrum filter ... [FAILED] ",
  "ERROR: config device system a ... [RETRYING]",
  "SYSTEM: encrypted complete d ... [COMPLETE]",
  "CORE: resource process process ... [DONE] ",
  "SYSTEM: receive system ge ... [INACTIVE]",
  "AUDIO: texture time check r ... [READY]",
  "APP: decrypt midi debug ac ... [DONE]",
  "CLIENT: filter client r ... [SYNCED]",
  "CORE: daemon task de ... [STOPPED]",
  "GPU: amplitude allo ... [SUCCESS]",
  "NETWORK: enable ... [RETRYING] ",
  "STATUS: client ... [VERIFIED]",
  "VISUAL: decrypt ... [READY]",
  "NETWORK: gai ... [RUNNING]",
  "CMD: rese ... [COMPLETE]",
  "ERROR: pac ... [FAILED]",
  "AUDIO: ... [INACTIVE]",
  "SYST ... [INFO 0xCD]",
  "LO ... [OPTIMIZED]",
  " ... [WARNING 0xA",
  "NE ... [STOPPED]",
  "SE ... [SYNCED]",
  " ... [RUNNING]",
  " ... [VERIFIE",
  " ... [SYNCED",
  " ... [STOPP",
  " ... [WARNI",
  " ... [DONE",
  " ... [DONE",
  " ... [COMP",
  " ... [DATA",
  " ... [SYNC",
  " ... [VERIF",
  " ... [WARNI",
  " ... [STOPPE",
  " ... [WARNIN",
  " ... [FAILED]",
  "S ... [FAILED]",
  " ... [INFO 0xCD",
  "ER ... [PENDING]",
  "AP ... [INFO 0xCD]",
  "CLIE ... [RETRYING]",
  "SERVI ... [COMPLETE]",
  "SYSTEM: ... [PENDING] ",
  "SERV ... [WARNING 0xAB]",
  "SERVER: s ... [ERROR 404]",
  "TASK: debug tra ... [READY]",
  "PROCESS: task ... [STOPPED] ",
  "VISUAL: service ... [VERIFIED]",
  "APP: buffer memory ad ... [DONE]",
  "CLIENT: stream ... [WARNING 0xAB]",
  "DEBUG: free client e ... [RETRYING]",
  "LOG: report monitor sy ... [RETRYING]",
  "APP: disconnect memory ... [VERIFIED] ",
  "KERNEL: send time resource ... [RUNNING]",
  "KERNEL: encrypted frequen ... [INFO 0xCD]",
  "INFO: osc graphic stream tim ... [RUNNING]",
  "SERVER: check packet message de ... [ACTIVE]",
  "DEBUG: render install succ ... [WARNING 0xAB]",
  "INFO: io connect config pending te ... [READY]",
  "SYSTEM: resource transfer system ... [VERIFIED]",
  "STATUS: success stop dmx module config ... [OK] ",
  "STATUS: update temp load cpu ... [WARNING 0xAB] ",
  "LOG: fail temp temp particle disco ... [INACTIVE]",
  "PROCESS: service task analyze optimiz ... [READY]",
  "SERVER: message check driver optimize ... [ACTIVE]",
  "NETWORK: driver optimize reset temp ... [PENDING] ",
  "PROCESS: install cpu deactivate generate ... [OK] ",
  "TASK: success deactivate log message ... [PENDING]",
  "ERROR: decompress gain temp upd ... [WARNING 0xAB]",
  "SYSTEM: load update midi decrypt te ... [STOPPED]",
  "SERVER: analyze packet buffer data s ... [FAILED]",
  "TASK: reset spectrum alloc gpu sto ... [SUCCESS]",
  "STATUS: process authenticate start eff ... [OK]",
  "NETWORK: free stream effect task ... [PENDING]",
  "GPU: report verify video admin c ... [FAILED]",
  "NETWORK: cpu encrypted send sy ... [RUNNING]",
  "LOG: video config display pr ... [VERIFIED]",
  "SYSTEM: filter amplitude send ... [SYNCED]",
  "NETWORK: deactivate device r ... [READY]",
  "ERROR: receive optimize ... [INACTIVE] ",
  "LOG: midi log calibra ... [OPTIMIZED]",
  "GPU: log genera ... [DATA AVAILABLE]",
  "TASK: compres ... [DATA AVAILABLE]",
  "STATUS: warning st ... [VERIFIED]",
  "APP: debug alloc ... [VERIFIED]",
  "PROCESS: filter ... [ACTIVE] ",
  "AUDIO: r ... [WARNING 0xAB]",
  "TASK: secu ... [INFO 0xCD]",
  "STATUS: monit ... [DONE]",
  "CLIENT: s ... [STOPPED]",
  "STATUS ... [INACTIVE]",
  "CORE: ... [INACTIVE]",
  " ... [DATA AVAILAB",
  "CMD: ... [ACTIVE]",
  "COR ... [FAILED]",
  "V ... [STOPPED]",
  " ... [STOPPED]",
  " ... [ERROR 4",
  "A ... [DONE]",
  " ... [COMPL",
  " ... [SYNCE",
  " ... [WARN",
  " ... [RUNN",
  " ... [VERI",
  " ... [COMP",
  " ... [COMP",
  " ... [DONE]",
  " ... [SYNCE",
  "D ... [DONE]",
  " ... [RETRYI",
  "L ... [READY]",
  " ... [WARNING ",
  " ... [INFO 0xCD",
  " ... [OPTIMIZED]",
  " ... [DATA AVAILAB",
  " ... [WARNING 0xAB]",
  "PROCESS ... [SYNCED]",
  "SYSTEM: ... [RETRYING]",
  "PROCESS: ... [RETRYING]",
  "SYSTEM: t ... [ERROR 404]",
  "TASK: compr ... [OPTIMIZED]",
  "SYSTEM: comp ... [OPTIMIZED]",
  "INFO: calibrate ... [STOPPED] ",
  "NETWORK: gpu task suc ... [DONE]",
  "SERVER: render repor ... [SYNCED]",
  "INFO: osc authentica ... [COMPLETE]",
  "INFO: status time netw ... [VERIFIED]",
  "DEBUG: complete cpu event ... [FAILED]",
  "NETWORK: sync graphic visual bu ... [OK]",
  "PROCESS: log frequency vis ... [COMPLETE]",
  "SYSTEM: stop decrypt instal ... [COMPLETE]",
  "PROCESS: service monitor cpu de ... [ACTIVE]",
  "PROCESS: event status decrypt mid ... [READY]",
  "SERVER: client client io authent ... [RUNNING]",
  "SERVER: error log graphic execute ... [PENDING]",
  "SERVICE: osc debug system report ... [RETRYING] ",
  "CORE: calibrate particle memory upda ... [READY]",
  "SERVER: admin log admin load rece ... [OPTIMIZED]",
  "AUDIO: send receive resource drive ... [COMPLETE]",
  "KERNEL: free event daemon calibrate d ... [FAILED]",
  "GPU: uptime process effect check m ... [OPTIMIZED]",
  "NETWORK: stream server data dec ... [WARNING 0xAB]",
  "PROCESS: admin amplitude server ge ... [ERROR 404]",
  "LOG: client video shader receive p ... [OPTIMIZED]",
  "SERVER: user unload deactivate ve ... [INFO 0xCD]",
  "CMD: audio secure service volume ... [OPTIMIZED] ",
  "AUDIO: load sync authenticate log ... [RETRYING]",
  "VISUAL: send amplitude check netw ... [PENDING]",
  "NETWORK: reset pending analyze s ... [STOPPED]",
  "PROCESS: disconnect particle ... [INFO 0xCD] ",
  "TASK: enable error audio audi ... [RETRYING]",
  "CORE: status temp packet tex ... [INACTIVE]",
  "SYSTEM: shader frequency re ... [VERIFIED]",
  "DEBUG: shader stop resta ... [OPTIMIZED]",
  "ERROR: daemon send complet ... [SYNCED]",
  "PROCESS: user success f ... [PENDING]",
  "TASK: info analyze dea ... [STOPPED]",
  "SERVICE: stop osc tex ... [FAILED]",
  "STATUS: time graphi ... [STOPPED]",
  "STATUS: verify re ... [RUNNING]",
  "LOG: free ... [WARNING 0xAB] ",
  "INFO: encrypt ... [SUCCESS]",
  "NETWORK: time ... [READY] ",
  "KERNEL: kernel... [OK]  ",
  "APP: load ... [RUNNING]",
  " ... [DATA AVAILABLE]",
  "GPU: ... [RETRYING] ",
  " ... [WARNING 0xAB",
  "CLIE ... [SYNCED]",
  " ... [INFO 0xCD]",
  "ER ... [FAILED]",
  "S ... [FAILED]",
  " ... [INACTIV",
  " ... [STOPPE",
  " ... [ERROR",
  " ... [ERROR",
  " ... [VERI",
  " ... [DATA",
  "N ... [OK]",
  " ... [PEND",
  " ... [READ",
  " ... [COMPL",
  " ... [ERROR",
  " ... [ACTIVE",
  " ... [WARNIN",
  " ... [ACTIVE]",
  "TASK: ... [OK]",
  "TA ... [SYNCED]",
  " ... [DATA AVAIL",
  "GPU: ... [RUNNING]",
  "SER ... [ERROR 404]",
  "WARNING ... [FAILED]",
  "GPU: secur ... [READY]",
  "SYST ... [WARNING 0xAB]",
  "SERVER: me ... [VERIFIED]",
  "VISUAL: process ... [DONE] ",
  "STATUS: remove ... [SYNCED] "
  ],
    twoLineList: [
      ["aaa", "bbb"],
      ["ccc", "ddd"],
      ["eee", "fff"]
    ],
    fourLineList: [
        [
    "KERNEL: generative data d ... [RETRYING]",
    "INFO: texture warning virtua ... [OK]",
    "AUDIO: info telecom t ... [STOPPED]",
    "CLIENT: rollback fractal d ... [SUCCESS]"
  ],
  [
    "ERROR: report baseline queue deactiva ... [ERROR 404]",
    "SECURITY: recovery backup time ... [NOMINAL] ",
    "CLIENT: data hotfix thread init t ... [PROCESSING]",
    "CMD: data throughput snapshot kernel a ... [ACTIVE]"
  ],
  [
    "KERNEL: time container snapshot opti ... [OPTIMIZED]",
    "IO: transfer execute texture optimize ... [FLUSHED] ",
    "ANALYZE: buffer load iterative interface ... [VERIFIED]",
    "APP: config optimize recovery dmx user s ... [WARNING 0xAB]"
  ],
  [
    "KERNEL: synchronize connect status disable e ... [READY]",
    "EFFECT: service spectrum recovery backup kernel s ... [NO DATA]",
    "EFFECT: update abstract connect secure aut ... [DATA AVAILABLE]",
    "PROCESS: install version routing sync opti ... [CRITICAL]"
  ],
  [
    "NETWORK: complete warning version pro ... [WARNING 0xAB]",
    "CORE: orchestrate restore volume transf ... [ERROR 404]",
    "CORE: audio stream archive temp authorization snaps ... [DONE]",
    "UPDATE: free latency volume diagnostic queu ... [INFO 0xCD]"
  ],
  [
    "STATUS: queue admin kernel free verify admi ... [OK]",
    "SECURITY: virtual connect session alloc ... [READY] ",
    "STATUS: calibrate validation midi ... [PENDING]",
    "ANALYZE: provision integrity stream vide ... [NO DATA]"
  ],
  [
    "INFO: network event t ... [PROCESSING]",
    "SECURITY: execute video ... [INITIALIZING]",
    "INIT: enable check debug de ... [DONE]",
    "INFO: start stream message calibra ... [DONE]"
  ],
  [
    "SERVER: disconnect daemon ... [DONE]",
    "SECURITY: patch ... [PENDING] ",
    "SYSTEM: deform subsy ... [NOMINAL]",
    "WARNING: install info ... [FAILED] "
  ],
  [
    "INFO: sy ... [RUNNING]",
    "VISUAL: fi ... [SUCCESS]",
    "UPDATE: morph ... [CRITICAL]",
    "SYSTEM: buffe ... [SYNCED]"
  ],
  [
    "SYSTEM: ... [SYNCED]",
    "DATA: re ... [READY]",
    "RENDER ... [RUNNING]",
    "UPDATE: t ... [FAILED]"
  ],
  [
    "DATA: rol ... [COMPLETE]",
    "CMD: as ... [FAILED]",
    "APP: gpu ba ... [SYNCED]",
    "LOG: telemetry i ... [OK]"
  ],
  [
    "DEBUG: p ... [SYNCED]",
    "AUDIO: realtime ... [ADJUSTED]",
    "STATUS: m ... [ACTIVE]",
    "SERVICE: syst ... [CONNECTED]"
  ],
  [
    "NETWORK: latency container in ... [OK]",
    "CMD: complete frac ... [PENDING]",
    "SERVICE: activate sta ... [STOPPED]",
    "CLIENT: admin telemet ... [ERROR 404]"
  ],
  [
    "LOG: transfer authorization a ... [COMPLETE]",
    "GPU: queue release dmx osc tim ... [RUNNING]",
    "EFFECT: spectrum kernel amplitud ... [NOMINAL]",
    "SECURITY: deform midi alert analyz ... [INACTIVE]"
  ],
  [
    "TASK: virtual release midi buffer sequen ... [INFO 0xCD]",
    "SYNC: memory telemetry snapshot gener ... [OPTIMIZED]",
    "WARNING: instance fractal bandwidth con ... [FLUSHED]",
    "TASK: authenticate time report free reset ... [PROCESSING]"
  ],
  [
    "DEBUG: integrity system io security generati ... [ACTIVE]",
    "SERVICE: migration diagnostic audio status c ... [CRITICAL]",
    "LOG: parallel fractal network interface ... [RETRYING] ",
    "SERVER: unload subsystem rollback storage al ... [CRITICAL]"
  ],
  [
    "SECURITY: decompress firewall hotfix session f ... [NO DATA]",
    "NETWORK: stream threshold procedural rollb ... [PROCESSING]",
    "IO: alloc integrity start compression eve ... [CONNECTED]",
    "STATUS: storage indicator container baseline su ... [FAILED]"
  ],
  [
    "WARNING: generative encryption provisi ... [ACTIVE]",
    "TASK: encrypted install render analyze firewall ... [OK] ",
    "ALERT: fail success server system parall ... [COMPLETE]",
    "VISUAL: daemon admin recovery warning d ... [STOPPED]"
  ],
  [
    "AUDIO: encrypted fractal pr ... [DATA AVAILABLE]",
    "IO: decompress realtime pipeli ... [PENDING]",
    "VISUAL: throughput osc snapshot ... [FLUSHED] ",
    "EFFECT: transfer latency authori ... [ERROR 404]"
  ],
  [
    "AUDIO: iterative transf ... [ERROR 404]",
    "KERNEL: routing debug dis ... [OPTIMIZED]",
    "DISPLAY: componen ... [INITIALIZING]",
    "IO: validation transfer pro ... [RUNNING]"
  ],
  [
    "PROCESS: ... [SUCCESS] ",
    "SERVER ... [WARNING 0xAB]",
    "GPU: sessi ... [FAILED]",
    "UPDATE ... [WARNING 0xAB]"
  ],
  [
    "TASK: ... [STOPPED] ",
    "AUDIO: m ... [CRITICAL]",
    "INIT ... [CONNECTED]",
    "GPU: i ... [FLUSHED]"
  ],
  [
    "ERROR: ... [OPTIMIZED]",
    "SYNC: ... [CRITICAL]",
    "SERV ... [INFO 0xCD]",
    "SYNC: ... [VERIFIED]"
  ],
  [
    "VISUAL: s ... [RUNNING]",
    "AUDIO: exe ... [NOMINAL]",
    "ALE ... [INITIALIZING]",
    "EFFECT: free ... [FLUSHED]"
  ],
  [
    "RENDER: session ... [STOPPED] ",
    "LOG: protocol g ... [WARNING 0xAB]",
    "ERROR: virtu ... [NOMINAL]",
    "SERVICE: admin ... [NO DATA] "
  ],
  [
    "AUDIO: cpu concrete stream sta ... [DONE]",
    "CLIENT: release event ... [DISCONNECTED]",
    "IO: report optimize sec ... [STOPPED]",
    "INIT: video debug uptime ... [RETRYING]"
  ],
  [
    "TASK: compress start amplitude p ... [NO DATA]",
    "ANALYZE: metric provision synchr ... [NOMINAL]",
    "DISPLAY: debug buffer display re ... [FAILED]",
    "DATA: server firmware restart volume pr ... [RETRYING]"
  ],
  [
    "NETWORK: texture info complete archive event ... [VERIFIED]",
    "NETWORK: privilege module volume migration textu ... [OK]",
    "ALERT: log integrity start snapshot enable vol ... [COMPLETE]",
    "LOG: handshake restart driver activate ... [INITIALIZING]"
  ],
  [
    "KERNEL: filter threshold load encryption volume sec ... [ACTIVE]",
    "APP: check compress admin deploy integrity inf ... [FAILED]",
    "NETWORK: telecom physical realtime network sto ... [SYNCED]",
    "PROCESS: midi integrity storage sync disa ... [STOPPED]"
  ],
  [
    "VISUAL: decompress protocol morph frequency co ... [VERIFIED]",
    "INFO: execute secure check deploy connect ... [ADJUSTED]",
    "EFFECT: virtual server enable monitor component au ... [OK]",
    "SYNC: storage thread memory io generate r ... [ADJUSTED]"
  ],
  [
    "SYNC: patch start message calibrate ... [SUCCESS] ",
    "LOG: gain virtual session texture conne ... [VERIFIED]",
    "AUDIO: disconnect stream encryption morph tele ... [OK]",
    "LOG: routing firewall admin process ... [READY] "
  ],
  [
    "GPU: packet error transfer ch ... [PENDING]",
    "RENDER: buffer device mess ... [RETRYING]",
    "ALERT: patch success patch d ... [RUNNING]",
    "GPU: verify spectrum warni ... [VERIFIED]"
  ],
  [
    "SECURITY: version use ... [SUCCESS]",
    "DATA: optimize fractal ... [RETRYING]",
    "APP: session moni ... [FLUSHED]",
    "INFO: stream res ... [PENDING]"
  ],
  [
    "STATUS: sync c ... [ACTIVE]",
    "EFFECT: ale ... [PENDING]",
    "ERROR: ... [SUCCESS]",
    "UPDATE: co ... [READY]"
  ],
  [
    "CORE: str ... [VERIFIED]",
    "AUDIO: ... [ACTIVE] ",
    "CMD: ... [VERIFIED] ",
    "TASK: qu ... [PENDING]"
  ],
  [
    "SYNC: ... [NO DATA] ",
    "A ... [WARNING 0xAB]",
    "IN ... [DATA AVAILABLE]",
    "APP: fra ... [NOMINAL]"
  ],
  [
    "SYNC: securi ... [NOMINAL]",
    "STATUS ... [INACTIVE]",
    "DEBUG: morph mess ... [OK]",
    "UPDATE: session ... [FLUSHED]"
  ],
  [
    "KERNEL: iterativ ... [RUNNING]",
    "STATUS: shader dr ... [CONNECTED]",
    "NETWORK: render fai ... [RETRYING]",
    "ERROR: restart shad ... [ADJUSTED]"
  ],
  [
    "STATUS: daemon integrity gain com ... [PENDING]",
    "ALERT: message service ca ... [ERROR 404]",
    "CORE: temp resource system d ... [ADJUSTED]",
    "RENDER: load interactive ... [CONNECTED] "
  ],
  [
    "SERVER: thread calibrate subsystem r ... [FLUSHED]",
    "RENDER: io patch stream security device f ... [CRITICAL]",
    "GPU: recovery rollback complete concrete uptim ... [OK]",
    "SECURITY: frequency latency geometry s ... [CRITICAL]"
  ],
  [
    "DATA: admin transfer network temp concr ... [INACTIVE]",
    "SERVER: display encrypted device secure dri ... [DISCONNECTED]",
    "LOG: virtual activate activate packet tr ... [CONNECTED]",
    "SYNC: firmware pipeline temp compress log gp ... [CONNECTED]"
  ],
  [
    "DEBUG: service info error transform activate a ... [STOPPED]",
    "NETWORK: handshake integrity pipeline latency pa ... [FAILED]",
    "CLIENT: archive authenticate volume mapping phys ... [FLUSHED]",
    "STATUS: server dmx pipeline generative thread s ... [INFO 0xCD]"
  ],
  [
    "WARNING: diagnostic synchronize resto ... [VERIFIED]",
    "DEBUG: migration packet receive secure t ... [RUNNING]",
    "PROCESS: recovery storage render user pro ... [ADJUSTED]",
    "ALERT: debug synchronize optimize freque ... [SUCCESS]"
  ],
  [
    "APP: monitor success routing s ... [ERROR 404]",
    "PROCESS: component dmx cpu au ... [NOMINAL]",
    "VISUAL: client shader metric ... [PENDING]",
    "TASK: time verify frequency de ... [CONNECTED]"
  ],
  [
    "DATA: diagnostic insta ... [FLUSHED]",
    "DEBUG: baseline p ... [VERIFIED]",
    "PROCESS: deform system ... [ADJUSTED] ",
    "VISUAL: storage rend ... [FAILED]"
  ],
  [
    "RENDER: decrypt c ... [DONE]",
    "INIT: iterative ... [NO DATA]",
    "GPU: integrity ... [SYNCED]",
    "CMD: shader ... [ADJUSTED] "
  ],
  [
    "LOG: g ... [WARNING 0xAB]",
    "DEBUG: secur ... [FAILED]",
    "ERROR: c ... [CONNECTED]",
    "STATUS: s ... [DONE]"
  ],
  [
    "RENDER: ... [NOMINAL]",
    "COMPU ... [INACTIVE]",
    "IO: ... [ERROR 404] ",
    "CMD: ... [CRITICAL] "
  ],
  [
    "SYNC: ... [INITIALIZING]",
    "APP: syst ... [NO DATA]",
    "ANALYZE: ... [SUCCESS] ",
    "COMPUTI ... [VERIFIED]"
  ],
  [
    "ERROR: mapping ... [SYNCED]",
    "SECURITY: co ... [VERIFIED]",
    "IO: snapshot dev ... [STOPPED]",
    "LOG: restar ... [WARNING 0xAB]"
  ]
    ],
    // 最初に一周だけ表示するリスト
    oneLineFirstPassList: [
      "Initializing system core 7.0.1 (build 20250611_2230)... [OK]",
      "Loading kernel modules: acpi cpufreq ext4 usbhid nvidia_drm... [DONE]",
      "Mounting /dev/sda1 on /boot/efi as FAT32 filesystem... [SUCCESS]",
      "Checking filesystem integrity on /dev/sdb2 (root partition)... [CLEAN]",
      "Starting network services: dhcpcd wpa_supplicant sshd... [OK]",
      "Detected 16GB physical memory: 8GB used, 8GB free. Swap: 0B used, 16GB free.",
      "Configuring display adapter: NVIDIA GeForce RTX 4080 (driver version 550.78)... [ACTIVE]",
      "Establishing secure connection to remote server: 192.168.1.100:22... [CONNECTED]",
      "Authenticating user 'vj_operator' with SSH key... [VERIFIED]",
      "Downloading configuration updates from cdn.example.com/vj_data/config.zip... [25%] [######....] 1.2MB/4.8MB",
      "Processing incoming data stream: stream_id=00aB3F, bitrate=120Mbps, latency=10ms.",
      "Compiling real-time shader assets for scene_gamma (Pass 1 of 3)... 45% complete.",
      "Generating dynamic texture maps: 2048x2048, Noise (Perlin), Scale=0.8, Seed=12345.",
      "Audio engine status: Latency: 5.2ms, Sample Rate: 48kHz, Buffers: 256/2, MIDI In: Active.",
      "Allocating GPU memory for particle system 'nebula_cloud': 512MB... [OK]",
      "Starting log rotation service for /var/log/vj_events.log... [RUNNING]",
      "Monitoring system temperature: CPU=65C, GPU=72C, Mainboard=48C. Thresholds: 90C, 95C, 70C.",
      "Executing background task 'sync_metadata.sh': PID 12345... [STARTED]",
      "Disk I/O statistics: Read: 25.7MB/s, Write: 18.2MB/s. Average queue depth: 2.3.",
      "Network traffic: Rx: 89.2Mbps, Tx: 34.5Mbps. Packet loss: 0.01%.",
      "Updating system clock via NTP: time.nist.gov -> 2025-06-11 22:39:16 JST... [SYNCED]",
      "Applying security patches: CVE-2025-XXXXX, CVE-2025-YYYYY... [PATCHING]",
      "Resizing framebuffer to 1920x1080 @ 144Hz. Pixel format: RGBA8888.",
      "Loading audio sample bank 'SYNTH_PAD_01.WAV': 4.5MB... [LOADED]",
      "Activating VJ overlay layer 'grid_pattern_02'... [ENABLED]",
      "Detecting connected MIDI devices: KORG nanoKEY2, Akai MPK Mini Mk3... [2 DEVICES FOUND]",
      "Mapping MIDI control change events (CC 1, 7, 10, 11, 20) to VJ parameters.",
      "Starting OSC server on UDP port 8000 for external control... [LISTENING]",
      "Receiving OSC message: /scene/brightness 0.75, /effect/glow 0.5.",
      "Generating new random seed for generative art module: 789012345.",
      "Checking for pending updates for VJ software (version 7.0.1)... No new updates.",
      "Initiating self-test sequence for GPU rendering pipeline... [PASSED]",
      "Allocating 128MB for live camera feed buffer (1920x1080@30fps, YUY2)... [BUFFERED]",
      "Applying color grading LUT 'cinematic_vj.cube'... [APPLIED]",
      "Transforming vertex data for 3D object 'fractal_sphere': scale=1.2, rotateY=0.01.",
      "Processing audio FFT data: bin=20, freq=440Hz, magnitude=0.78, phase=120deg.",
      "Storing performance metrics to /var/log/vj_perf.csv... [WRITING]",
      "Checking for audio clipping: Max_dBFS=-1.2, Peak_dBFS=0.1. Clipping detected: 0.1dB.",
      "Adjusting audio compressor settings: Ratio=4:1, Threshold=-6dBFS, Attack=5ms.",
      "Setting global tempo to 128 BPM. Sync source: Internal Clock.",
      "MIDI Clock sent: Beat 1, Division 1/4. Next pulse in 125ms.",
      "Sending DMX command to lighting controller: Channel 1=255 (Red), Channel 2=0 (Green).",
      "Recording VJ session to /home/vj_operator/recordings/session_20250611_2239.mp4... [RECORDING]",
      "Synchronizing playback with external timecode: SMPTE 00:00:15:23... [SYNCED]",
      "Activating post-processing effect 'chromatic_aberration': strength=0.05.",
      "Generating new particle 'sparkle_001': pos=(100,200,50), vel=(2, -1, 0.5), size=5.",
      "Flushing render queue: 1547 triangles, 23 textures, 8 shaders... [FLUSHED]",
      "Updating UI elements: frame rate=60fps, elapsed time=00:01:30.",
      "Error: Input stream 'camera_feed' dropped 3 frames in last second. Check source.",
      "Recovering from minor rendering glitch. Recalculating normals for 3D model 'cube_array'.",
      "Optimizing memory usage: Freed 200MB of unused textures. Total GPU memory: 15.8GB.",
      "Applying filter 'pixelate': block_size=8, threshold=0.3.",
      "Sending keep-alive packet to remote server. Response time: 2ms.",
      "Receiving control message from touchOSC: /mixer/volume/master 0.8.",
      "Loading next sequence 'transition_to_scene9.seq'... [PRELOADED]",
      "Processing feedback loop for visual effect 'infinity_tunnel': gain=0.98, offset=0.02.",
      "Detected peak audio amplitude: Left=0.85, Right=0.92. Applying gain reduction.",
      "Initializing FFT analysis for audio input. Spectrum range: 20Hz-20kHz.",
      "Generating sound reactive particles. Particle count: 5000. Max lifetime: 120 frames.",
      "Updating light probe reflections: 8 probes, 1024x1024 resolution. Refreshed 2 probes.",
      "Applying bloom effect: radius=15, intensity=0.6, threshold=0.8.",
      "Sending Art-Net data to DMX node 0: Universe 0, channels 1-512... [SENT]",
      "Checking storage space on /dev/sdc: 200GB free, 1.8TB total. Sufficient for recording.",
      "System uptime: 0 days, 0 hours, 2 minutes, 15 seconds.",
      "Executing custom script 'fade_out_audio.py'... [EXECUTED]",
      "Resuming normal operation. No critical errors detected since last log.",
      "CALCULATING PRIME FACTORS FOR 9876543210987654321...",
      "Searching database for matching waveform patterns: QUERY 'synthwave_bass_line'.",
      "Applying glsl shader 'glitch_effect_01.glsl'. Uniforms: time=123.45, distortion=0.1.",
      "Monitoring CPU core usage: Core 0: 75%, Core 1: 68%, Core 2: 70%, Core 3: 72%.",
      "Updating physics engine: 120 rigid bodies, 50 collisions per frame.",
      "Adjusting camera position: (X+0.01, Y-0.005, Z+0.02). LookAt point: (0,0,0).",
      "Performing garbage collection: 345 objects freed, 2.3MB reclaimed.",
      "Receiving network broadcast: 'VJ_SYNC_PULSE'. Latency: 1.5ms.",
      "Initiating buffer swap for double buffering. Frame 3600 rendered.",
      "Generating complex procedural geometry: Iteration 5 of 8... [COMPUTING]",
      "Error: MIDI device 'Akai MPK Mini Mk3' disconnected. Reconnecting...",
      "Reconnected MIDI device 'Akai MPK Mini Mk3'. Device ID: 0x00AABBCC.",
      "Loading texture 'background_abstract_03.png': 4096x4096, DXT5 compression... [LOADED]",
      "Updating render targets. Resolution: 1920x1080. Depth buffer: 24-bit.",
      "Applying blur filter 'gaussian': radius=5.0, sigma=2.5.",
      "Sending log entry to remote syslog server: log.example.com:514.",
      "Processing user input: Key 'SPACE' pressed. Toggling effect 'strobe_light'.",
      "Loading font 'Hack-Regular.ttf' for text overlay. Size: 24px.",
      "Rendering text 'HELLO VJ WORLD!' at (100, 100) with color #FF00FF.",
      "Checking for audio peak events: Threshold=0.9. Detected 2 peaks in last buffer.",
      "Adjusting reverb parameters: Room Size=0.7, Decay Time=2.0s, Damping=0.5.",
      "Synchronizing video playback: Current frame=12345, Target frame=12345.",
      "Generating random number sequence for effect modulation: 12, 54, 87, 32, 91.",
      "Performing Z-buffer pre-pass for complex scene. 80% complete.",
      "Starting performance counter: VRAM usage, draw calls, shader compiles.",
      "Processing gesture input from Leap Motion: Hand 'Left', Pinch strength=0.8.",
      "Applying post-processing chain: Bloom -> Chromatic Aberration -> Grain.",
      "Loading new sound clip 'DRUM_HIT_03.WAV': 0.5s duration... [LOADED]",
      "Updating material properties for object 'water_surface': reflectivity=0.9, refraction=1.33.",
      "Sending WebSocket message to browser client: {'status': 'active', 'fps': 59.8}.",
      "Compiling real-time shader assets for scene_alpha (Pass 2 of 3)... 60% complete.",
      "Generating dynamic texture maps: 1024x1024, Cloud (Worley), Scale=1.2, Seed=98765.",
      "Audio engine status: Input Level: -3dBFS, Output Level: -0.5dBFS, CPU Load: 15%.",
      "Allocating GPU memory for particle system 'star_field': 256MB... [OK]",
      "Starting log rotation service for /var/log/system_status.log... [RUNNING]",
      "Monitoring system temperature: CPU=66C, GPU=73C, Mainboard=49C. All within safe limits.",
      "Executing background task 'cleanup_temp_files.sh': PID 12346... [FINISHED]",
      "Disk I/O statistics: Read: 20.1MB/s, Write: 15.5MB/s. Average queue depth: 1.8.",
      "Network traffic: Rx: 75.0Mbps, Tx: 30.1Mbps. Packet loss: 0.00%.",
      "Updating system clock via NTP: time.google.com -> 2025-06-11 22:39:17 JST... [SYNCED]",
      "Applying security patches: CVE-2025-XXXXX, CVE-2025-YYYYY... [APPLIED]",
      "Resizing framebuffer to 1920x1080 @ 144Hz. Pixel format: RGBA8888.",
      "Loading audio sample bank 'PERCUSSION_LOOP_02.WAV': 2.1MB... [LOADED]",
      "Activating VJ overlay layer 'scanline_effect_01'... [ENABLED]",
      "Detecting connected DMX controllers: Enttec USB DMX Pro... [1 DEVICE FOUND]",
      "Mapping DMX channels (1-10) to VJ parameters: color, intensity, strobe.",
      "Starting OSC client to send data to 127.0.0.1:9000... [CONNECTED]",
      "Sending OSC message: /vj/tempo 128.0, /vj/master_volume 0.9.",
      "Generating new random seed for generative art module: 456789012.",
      "Checking for pending updates for Linux kernel (version 6.8.9)... No new updates.",
      "Initiating self-test sequence for Audio I/O subsystem... [PASSED]",
      "Allocating 64MB for audio analysis buffer (Stereo, 48kHz, 24-bit)... [BUFFERED]",
      "Applying video filter 'invert_colors'... [APPLIED]",
      "Transforming vertex data for 3D object 'pyramid_stack': scale=0.9, rotateX=0.005.",
      "Processing audio FFT data: bin=50, freq=1100Hz, magnitude=0.65, phase=270deg.",
      "Storing performance metrics to /var/log/system_load.csv... [WRITING]",
      "Checking for audio clipping: Max_dBFS=-0.8, Peak_dBFS=0.3. Clipping detected: 0.3dB.",
      "Adjusting audio limiter settings: Threshold=-1dBFS, Release=100ms.",
      "Setting global tempo to 120 BPM. Sync source: External MIDI.",
      "MIDI Clock received: Beat 2, Division 1/8. Next pulse in 62ms.",
      "Sending DMX command to lighting controller: Channel 3=128 (Blue), Channel 4=255 (White).",
      "Recording VJ session to /home/vj_operator/recordings/session_20250611_2239_part2.mp4... [RECORDING]",
      "Synchronizing playback with external timecode: SMPTE 00:00:30:10... [SYNCED]",
      "Activating post-processing effect 'rgb_split': amount=0.03.",
      "Generating new particle 'smoke_plume_002': pos=(300,150,10), vel=(-1, 0.5, -0.2), size=20.",
      "Flushing render queue: 2100 triangles, 30 textures, 10 shaders... [FLUSHED]",
      "Updating UI elements: CPU load=70%, GPU load=85%, memory=50%.",
      "Warning: Remote server connection latency increased to 50ms. Investigating...",
      "Recovering from minor network interruption. Resending last 5 packets.",
      "Optimizing memory usage: Freed 150MB of temporary buffers. Total RAM: 15.6GB.",
      "Applying filter 'noise_grain': amount=0.08.",
      "Sending debug message to remote terminal: 'Effect_Strobe_Enabled'.",
      "Receiving control message from OSC: /effect/brightness 0.9.",
      "Loading next sequence 'scene_transition_A.seq'... [PRELOADED]",
      "Processing feedback loop for visual effect 'kaleidoscope': segments=8, rotation=0.05.",
      "Detected peak audio amplitude: Left=0.90, Right=0.88. Applying mild compression.",
      "Initializing FFT analysis for audio output. Spectrum range: 20Hz-20kHz.",
      "Generating sound reactive lines. Line count: 200. Max length: 100 pixels.",
      "Updating light probe reflections: 8 probes, 1024x1024 resolution. Refreshed 3 probes.",
      "Applying glow effect: radius=10, intensity=0.8, threshold=0.7.",
      "Sending Art-Net data to DMX node 1: Universe 0, channels 1-512... [SENT]",
      "Checking storage space on /dev/sdd: 500GB free, 2TB total. Sufficient for backups.",
      "System uptime: 0 days, 0 hours, 3 minutes, 40 seconds.",
      "Executing custom script 'reset_visual_parameters.sh'... [EXECUTED]",
      "Resuming normal operation. No critical warnings since last log.",
      "DECOMPRESSING ARCHIVE 'vj_assets_pack_gamma.tar.gz'...",
      "Searching database for matching waveform patterns: QUERY 'dubstep_drop_01'.",
      "Applying glsl shader 'data_moshing_02.glsl'. Uniforms: seed=789, strength=0.2.",
      "Monitoring CPU core usage: Core 0: 78%, Core 1: 71%, Core 2: 73%, Core 3: 75%.",
      "Updating physics engine: 150 rigid bodies, 60 collisions per frame.",
      "Adjusting camera position: (X-0.008, Y+0.01, Z-0.015). LookAt point: (0,0,0).",
      "Performing garbage collection: 400 objects freed, 3.1MB reclaimed.",
      "Receiving network broadcast: 'EFFECT_TRIGGER_PULSE'. Latency: 2.0ms.",
      "Initiating buffer swap for double buffering. Frame 3660 rendered.",
      "Generating complex procedural geometry: Iteration 6 of 8... [COMPUTING]",
      "Error: DMX controller 'Enttec USB DMX Pro' reports data error. Retrying...",
      "DMX controller 'Enttec USB DMX Pro' data error resolved. Connection stable.",
      "Loading texture 'noise_texture_05.png': 2048x2048, RGB compression... [LOADED]",
      "Updating render targets. Resolution: 1920x1080. MSAA: 4x.",
      "Applying blur filter 'motion_blur': amount=0.08, samples=8.",
      "Sending log entry to remote database: db.example.com:5432.",
      "Processing user input: Mouse clicked. Activating effect 'ripple_effect'.",
      "Loading font 'RobotoMono-Regular.ttf' for text overlay. Size: 28px.",
      "Rendering text 'SYSTEM ONLINE' at (50, 50) with color #00FFFF.",
      "Checking for audio peak events: Threshold=0.95. Detected 1 peak in last buffer.",
      "Adjusting compressor parameters: Ratio=3:1, Threshold=-8dBFS, Release=150ms.",
      "Synchronizing video playback: Current frame=12400, Target frame=12400.",
      "Generating random number sequence for effect modulation: 99, 12, 34, 56, 78.",
      "Performing Z-buffer pre-pass for complex scene. 90% complete.",
      "Starting performance counter: VRAM bandwidth, triangle throughput, pixel fillrate.",
      "Processing gesture input from Kinect: Body 'User 1', Joint 'Right Hand' position.",
      "Applying post-processing chain: Glow -> Grain -> Sharpen.",
      "Loading new sound clip 'PAD_SYNTH_CHORD.WAV': 1.5s duration... [LOADED]",
      "Updating material properties for object 'glass_shards': transparency=0.7, refractive_index=1.5.",
      "Sending WebSocket message to mobile app: {'command': 'status_update', 'data': 'visual_sync_ok'}.",
      "Compiling real-time shader assets for scene_beta (Pass 3 of 3)... 80% complete.",
      "Generating dynamic texture maps: 4096x4096, Marble (Value), Scale=0.5, Seed=54321.",
      "Audio engine status: Input Gain: +6dB, Output Gain: -1dB, Buffers: 128/2.",
      "Allocating GPU memory for particle system 'rain_drops': 1GB... [OK]",
      "Starting log rotation service for /var/log/gpu_status.log... [RUNNING]",
      "Monitoring system temperature: CPU=67C, GPU=74C, Mainboard=50C. All stable.",
      "Executing background task 'render_preview_image.sh': PID 12347... [STARTED]",
      "Disk I/O statistics: Read: 30.5MB/s, Write: 22.0MB/s. Average queue depth: 3.0.",
      "Network traffic: Rx: 100.1Mbps, Tx: 40.2Mbps. Packet loss: 0.00%.",
      "Updating system clock via NTP: pool.ntp.org -> 2025-06-11 22:39:18 JST... [SYNCED]",
      "Applying security patches: CVE-2025-XXXXX, CVE-2025-YYYYY... [COMPLETED]",
      "Resizing framebuffer to 1920x1080 @ 144Hz. Pixel format: RGBA8888.",
      "Loading audio sample bank 'FX_SWEEP_UP.WAV': 1.0MB... [LOADED]",
      "Activating VJ overlay layer 'data_overlay_03'... [ENABLED]",
      "Detecting connected MIDI interfaces: Focusrite Scarlett 2i2... [1 INTERFACE FOUND]",
      "Mapping MIDI notes (C3-C5) to VJ parameters: color changes, opacity, position.",
      "Starting OSC server on UDP port 9000 for external control... [LISTENING]",
      "Receiving OSC message: /vj/effect/blur 0.2, /vj/effect/contrast 1.2.",
      "Generating new random seed for generative art module: 123456789.",
      "Checking for pending updates for VJ software (version 7.0.2)... Update available (7.0.2.1).",
      "Initiating self-test sequence for Network Interface Card... [PASSED]",
      "Allocating 256MB for video recording buffer (1920x1080@60fps, H.264)... [BUFFERED]",
      "Applying video filter 'invert_luminance'... [APPLIED]",
      "Transforming vertex data for 3D object 'cityscape': scale=1.0, rotateZ=0.001.",
      "Processing audio FFT data: bin=100, freq=2200Hz, magnitude=0.55, phase=90deg.",
      "Storing performance metrics to /var/log/vj_system.log... [WRITING]",
      "Checking for audio clipping: Max_dBFS=-0.5, Peak_dBFS=0.0. No clipping.",
      "Adjusting master gain: -1.0dB. Preventing overload.",
      "Setting global tempo to 130 BPM. Sync source: Ableton Link.",
      "Ableton Link: Partner detected (192.168.1.50). Syncing tempo.",
      "Sending DMX command to lighting controller: Channel 5=200 (Magenta), Channel 6=100 (Cyan).",
      "Recording VJ session to /home/vj_operator/recordings/session_20250611_2239_final.mp4... [RECORDING]",
      "Synchronizing playback with external timecode: SMPTE 00:00:45:00... [SYNCED]",
      "Activating post-processing effect 'anamorphic_flare': threshold=0.9, blur=0.02.",
      "Generating new particle 'smoke_puff_003': pos=(50,300,100), vel=(0, -0.5, 0), size=10.",
      "Flushing render queue: 2500 triangles, 35 textures, 12 shaders... [FLUSHED]",
      "Updating UI elements: connection status=stable, frame buffer=full.",
      "Error: OSC server '9000' timeout. Reinitializing connection.",
      "OSC server '9000' reinitialized. Connection successful.",
      "Optimizing memory usage: Freed 250MB from render targets. Total GPU memory: 15.5GB.",
      "Applying filter 'scanline': density=0.8, strength=0.05.",
      "Sending broadcast message to all connected clients: 'SYSTEM READY FOR NEW COMMANDS'.",
      "Receiving control message from Android tablet: /vj/scene/change 'scene_transition_B'.",
      "Loading next sequence 'final_loop_sequence.seq'... [PRELOADED]",
      "Processing feedback loop for visual effect 'pixel_sort': direction=vertical, threshold=0.5.",
      "Detected peak audio amplitude: Left=0.95, Right=0.95. Applying gentle compression.",
      "Initializing FFT analysis for specific frequency band: 60Hz-250Hz (Bass).",
      "Generating sound reactive spheres. Sphere count: 1000. Radius range: 5-20.",
      "Updating light probe reflections: 8 probes, 1024x1024 resolution. Refreshed 4 probes.",
      "Applying bloom effect: radius=12, intensity=0.7, threshold=0.9.",
      "Sending Art-Net data to DMX node 2: Universe 0, channels 1-512... [SENT]",
      "Checking storage space on /dev/sde: 1TB free, 4TB total. Adequate for long session.",
      "System uptime: 0 days, 0 hours, 4 minutes, 50 seconds.",
      "Executing custom script 'trigger_audio_sample.sh'... [EXECUTED]",
      "Resuming normal operation. All systems report nominal status.",
      "DECRYPTING SECURE DATA TRANSFER: SESSION KEY VALIDATED...",
      "Searching database for matching waveform patterns: QUERY 'ambient_drone_effect'.",
      "Applying glsl shader 'displacement_map_03.glsl'. Uniforms: height=0.1, frequency=10.0.",
      "Monitoring CPU core usage: Core 0: 80%, Core 1: 75%, Core 2: 78%, Core 3: 82%.",
      "Updating physics engine: 180 rigid bodies, 70 collisions per frame.",
      "Adjusting camera position: (X+0.005, Y-0.002, Z+0.01). LookAt point: (0,0,0).",
      "Performing garbage collection: 450 objects freed, 3.5MB reclaimed.",
      "Receiving network broadcast: 'HEARTBEAT_SIGNAL'. Latency: 1.0ms.",
      "Initiating buffer swap for double buffering. Frame 3720 rendered.",
      "Generating complex procedural geometry: Iteration 7 of 8... [COMPUTING]",
      "Error: GPU memory allocator reported fragmentation. Attempting defragmentation...",
      "GPU memory defragmentation complete. Reclaiming 500MB. Performance restored.",
      "Loading texture 'circuit_board_pattern.png': 1024x1024, Grayscale... [LOADED]",
      "Updating render targets. Resolution: 1920x1080. Render pass: Alpha Blend.",
      "Applying blur filter 'radial_blur': angle=45, strength=0.1.",
      "Sending log entry to cloud storage: s3.amazonaws.com/vj_logs.",
      "Processing user input: Gamepad button 'A' pressed. Activating effect 'lens_flare'.",
      "Loading font 'Consolas.ttf' for text overlay. Size: 20px.",
      "Rendering text 'DATA FLOW OPTIMIZED' at (200, 50) with color #00FF00.",
      "Checking for audio peak events: Threshold=0.98. Detected 3 peaks in last buffer.",
      "Adjusting gate parameters: Threshold=-20dBFS, Attack=1ms, Release=200ms.",
      "Synchronizing video playback: Current frame=12450, Target frame=12450.",
      "Generating random number sequence for effect modulation: 1, 2, 3, 4, 5.",
      "Performing Z-buffer pre-pass for complex scene. 95% complete.",
      "Starting performance counter: Fan speeds, PSU voltage, system power draw.",
      "Processing gesture input from VR headset: Head rotation (Yaw, Pitch, Roll).",
      "Applying post-processing chain: Sharpen -> Vignette -> Film Grain.",
      "Loading new sound clip 'BASS_DROP_01.WAV': 0.8s duration... [LOADED]",
      "Updating material properties for object 'smoke_plumes': density=0.5, absorption=0.2.",
      "Sending WebSocket message to smart lighting system: {'command': 'set_color', 'color': 'red'}.",
      "Compiling real-time shader assets for scene_delta (Final Pass)... 95% complete.",
      "Generating dynamic texture maps: 2048x2048, Plasma (Sine), Scale=0.9, Seed=23456.",
      "Audio engine status: Effects Chain: Active, Compressor, Reverb, EQ, Limiter.",
      "Allocating GPU memory for particle system 'fireflies': 768MB... [OK]",
      "Starting log rotation service for /var/log/network_traffic.log... [RUNNING]",
      "Monitoring system temperature: CPU=68C, GPU=75C, Mainboard=51C. Nominal.",
      "Executing background task 'upload_session_summary.sh': PID 12348... [STARTED]",
      "Disk I/O statistics: Read: 35.0MB/s, Write: 25.5MB/s. Average queue depth: 3.5.",
      "Network traffic: Rx: 110.0Mbps, Tx: 45.0Mbps. Packet loss: 0.00%.",
      "Updating system clock via NTP: time.apple.com -> 2025-06-11 22:39:19 JST... [SYNCED]",
      "Applying security patches: CVE-2025-XXXXX, CVE-2025-YYYYY... [ALL DONE]",
      "Resizing framebuffer to 1920x1080 @ 144Hz. Pixel format: RGBA8888.",
      "Loading audio sample bank 'VOICE_SAMPLE_01.WAV': 0.8MB... [LOADED]",
      "Activating VJ overlay layer 'terminal_emulator_effect'... [ENABLED]",
      "Detecting connected USB devices: Logitech G915, Razer DeathAdder V2... [2 DEVICES FOUND]",
      "Mapping keyboard events to VJ parameters: next scene, previous scene, effect toggle.",
      "Starting OSC client to send data to 192.168.1.200:7000... [CONNECTED]",
      "Sending OSC message: /vj/scene/tempo_multiplier 1.5, /vj/effect/intensity 1.0.",
      "Generating new random seed for generative art module: 345678901.",
      "Checking for pending updates for OBS Studio (version 30.1.2)... No new updates.",
      "Initiating self-test sequence for entire system... [PASSED ALL TESTS]",
      "Allocating 512MB for render output buffer (4K UHD@30fps, ProRes HQ)... [BUFFERED]",
      "Applying video filter 'color_shifting': speed=0.01, range=0.1.",
      "Transforming vertex data for 3D object 'star_cluster': scale=1.5, rotateX=0.002.",
      "Processing audio FFT data: bin=150, freq=3300Hz, magnitude=0.45, phase=180deg.",
      "Storing performance metrics to /var/log/vj_debug.log... [WRITING]",
      "Checking for audio clipping: Max_dBFS=-0.2, Peak_dBFS=0.0. No issues.",
      "Adjusting sidechain compressor: Input=Kick Drum, Output=Bass Synth.",
      "Setting global tempo to 135 BPM. Sync source: MIDI Master.",
      "MIDI Clock sent: Beat 4, Division 1/16. Next pulse in 31ms.",
      "Sending DMX command to lighting controller: Channel 7=255 (Yellow), Channel 8=150 (Orange).",
      "Recording VJ session to /home/vj_operator/recordings/session_final_cut.mp4... [RECORDING]",
      "Synchronizing playback with external timecode: SMPTE 00:01:00:00... [SYNCED]",
      "Activating post-processing effect 'old_tv_static': intensity=0.2, frequency=0.5.",
      "Generating new particle 'electric_arcs_004': pos=(200,400,20), vel=(0.1, -0.2, 0), length=50.",
      "Flushing render queue: 3000 triangles, 40 textures, 15 shaders... [FLUSHED]",
      "Updating UI elements: recording status=active, file size=1.5GB.",
    ],

    twoLineFirstPassList: [
      ["AAA", "BBB"],
      ["CCC", "DDD"],
      ["EEE", "FFF"]
    ],
    fourLineFirstPassList: [
      ["AAA", "BBB", "CCC", "DDD"],
      ["EEE", "FFF", "GGG", "HHH"]
    ],
    backgroundColor: null,
  },

  setupScene(g) {
    this.settings.backgroundColor = g.color(0, 20); // 透過性のある背景色
    g.colorMode(g.HSB, 360, 100, 100, 100); // HSBモードに設定
    // setupScene時に内部変数を初期化
    this._initialPassDone = false;
    this._currentListIndex = 0;
    this._previousListType = this.settings.listType; // 初期設定を保持
  },

  drawScene(g) {
    g.background(this.settings.backgroundColor);

    // listTypeが変更されたか検出
    if (this.settings.listType !== this._previousListType) {
      addLog(`List type changed to: ${this.settings.listType}. Starting initial pass.`);
      this._initialPassDone = false; // ファーストパスを再実行
      this._currentListIndex = 0; // インデックスをリセット
      this._previousListType = this.settings.listType; // 変更を記録
    }

    let currentList;
    let listToUse;

    // 最初にパスモードで、まだ完了していない場合
    if (!this._initialPassDone) {
      switch (this.settings.listType) {
        case "oneLine":
          listToUse = this.settings.oneLineFirstPassList;
          break;
        case "twoLine":
          listToUse = this.settings.twoLineFirstPassList;
          break;
        case "fourLine":
          listToUse = this.settings.fourLineFirstPassList;
          break;
        default:
          addLog("Invalid listType specified for firstPass mode.");
          return;
      }
    } else {
      // ループモード
      switch (this.settings.listType) {
        case "oneLine":
          listToUse = this.settings.oneLineList;
          break;
        case "twoLine":
          listToUse = this.settings.twoLineList;
          break;
        case "fourLine":
          listToUse = this.settings.fourLineList;
          break;
        default:
          addLog("Invalid listType specified for loop mode.");
          return;
      }
    }

    if (listToUse.length === 0) {
      addLog("Current list is empty.");
      return;
    }

    // 現在のフレームで表示するリスト要素を取得
    let elementToLog = listToUse[this._currentListIndex];

    // 要素が配列であれば、その中の各要素をログに出力
    if (Array.isArray(elementToLog)) {
      elementToLog.forEach(item => {
        addLog(item);
      });
    } else {
      // 配列でなければそのままログに出力
      addLog(elementToLog);
    }

    // 次のフレームのためにインデックスを更新
    this._currentListIndex++;

    // ファーストパスの処理
    if (!this._initialPassDone) {
      if (this._currentListIndex >= listToUse.length) {
        this._initialPassDone = true; // 最初のパスが完了
        this._currentListIndex = 0; // ループリストに切り替えるのでインデックスをリセット
        addLog(`Initial pass for ${this.settings.listType} completed. Switching to loop mode.`);
      }
    } else {
      // ループリストの場合の処理
      this._currentListIndex = this._currentListIndex % listToUse.length;
    }
  }
};