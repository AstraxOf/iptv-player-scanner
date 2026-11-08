
  let allChannels = [];
  let allServers = [];
  let activeIndex = -1;
  let currentHls = null;
  let currentMpegts = null;
  let retryCount = 0;
  const MAX_RETRIES = 4;
  let retryTimer = null;
  let lastUrl = null;
  let triedMpegtsFallback = false;
  let channelFailStatus = {};
  let noVideoCheckTimer = null;
  let currentView = [];

  // ---- theme ----
  function toggleTheme(){
    const root = document.documentElement;
    const cur = root.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let next;
    if(!cur) next = prefersDark ? 'light' : 'dark';
    else next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  }

  // ---- ip scanner functions ----
  function startIpScan() {
    const start = document.getElementById('start_ip').value;
    const end = document.getElementById('end_ip').value;
    const port = document.getElementById('port').value;
    
    document.getElementById('btnScanRange').disabled = true;
    const statusEl = document.getElementById('rangeStatusText');
    statusEl.textContent = "Estado: Escaneando red...";
    statusEl.className = 'status-line';

    fetch('/scan_ips', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({start_ip: start, end_ip: end, port: port})
    }).then(res => res.json()).then(data => {
        checkIpStatus();
    }).catch(err => {
        document.getElementById('btnScanRange').disabled = false;
        statusEl.textContent = 'Error al iniciar escaneo: ' + err.message;
        statusEl.className = 'status-line err';
    });
  }

  function checkIpStatus() {
    fetch('/ip_status').then(res => res.json()).then(data => {
        const statusEl = document.getElementById('rangeStatusText');
        statusEl.textContent = "Estado: " + data.status + " | Progreso: " + data.scanned + " / " + data.total;
        allServers = data.servers;
        renderServers(allServers);
        if(data.scanning) {
            setTimeout(checkIpStatus, 1500);
        } else {
            document.getElementById('btnScanRange').disabled = false;
            statusEl.className = 'status-line ok';
        }
    });
  }

  function renderServers(servers) {
    const list = document.getElementById('serverList');
    document.getElementById('countServers').textContent = servers.length;
    if(servers.length === 0){
      list.innerHTML = '<li class="empty-state">No se encontraron servidores activos.</li>';
      return;
    }
    list.innerHTML = '';
    servers.forEach(srv => {
        let isPublic = srv.status_type === 'public';
        let badgeClass = isPublic ? 'public' : 'auth';
        let badgeText = isPublic ? '🔓 Abierto / M3U Directo' : '🔒 Requiere Auth / Login';

        let li = document.createElement('li');
        li.className = "server-item";
        li.innerHTML = `
          <div class="srv-url">${srv.url}</div>
          <div><span class="badge ${badgeClass}">${badgeText}</span></div>
          <button class="btn-sm" onclick="useServer('${srv.url}')">Cargar M3U / Servidor</button>
        `;
        list.appendChild(li);
    });
  }

  function useServer(url) {
    document.getElementById('m3u_url').value = url;
    loadM3U();
  }

  // ---- load list ----
  function loadM3U(){
    const url = document.getElementById('m3u_url').value.trim();
    const statusEl = document.getElementById('loadStatus');
    const btn = document.getElementById('btnLoad');
    if(!url){ statusEl.textContent = 'Ingresa una URL M3U válida.'; statusEl.className='status-line err'; return; }
    btn.disabled = true;
    statusEl.textContent = 'Cargando lista…';
    statusEl.className = 'status-line';
    fetch('/load_m3u', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({url})
    }).then(r=>r.json()).then(data=>{
      btn.disabled = false;
      if(data.success){
        allChannels = data.channels;
        activeIndex = -1;
        renderChannels(allChannels);
        statusEl.textContent = `Cargados ${data.count} canales.`;
        statusEl.className = 'status-line ok';
      } else {
        statusEl.textContent = 'Error: ' + data.error;
        statusEl.className = 'status-line err';
      }
    }).catch(err=>{
      btn.disabled = false;
      statusEl.textContent = 'Error de red: ' + err.message;
      statusEl.className = 'status-line err';
    });
  }

  function renderChannels(channels){
    currentView = channels;
    const list = document.getElementById('channelList');
    document.getElementById('countChannels').textContent = channels.length;
    if(channels.length === 0){
      list.innerHTML = '<li class="empty-state">Sin canales que coincidan.</li>';
      return;
    }
    list.innerHTML = '';
    channels.forEach((ch, idx)=>{
      const li = document.createElement('li');
      const failed = !!channelFailStatus[ch.url];
      li.className = 'channel-item' + (idx === activeIndex ? ' active' : '') + (failed ? ' failed' : '');
      li.title = failed ? 'No compatible con el navegador — prueba en VLC' : '';
      li.innerHTML = `<span class="idx">${idx+1}</span><span class="name">${escapeHtml(ch.name)}</span>`
        + (failed ? '<span class="fail-dot"></span>' : '');
      li.onclick = ()=> playChannel(ch.url, ch.name, idx);
      list.appendChild(li);
    });
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function filterChannels(){
    const q = document.getElementById('searchBox').value.toLowerCase();
    renderChannels(allChannels.filter(ch => ch.name.toLowerCase().includes(q)));
  }

  // ---- overlay helpers ----
  function showOverlay(text, withSpinner=true, withRetry=false){
    const overlay = document.getElementById('overlay');
    const spinner = document.getElementById('spinner');
    const retryBtn = document.getElementById('retryBtn');
    document.getElementById('overlayText').textContent = text;
    spinner.style.display = withSpinner ? 'block' : 'none';
    retryBtn.style.display = withRetry ? 'inline-block' : 'none';
    overlay.classList.add('show');
  }
  function hideOverlay(){
    document.getElementById('overlay').classList.remove('show');
  }

  function retryCurrent(){
    if(lastUrl) playChannel(lastUrl, document.getElementById('nowPlaying').textContent.replace('Reproduciendo: ',''), activeIndex);
  }

  // ---- player ----
  function teardownPlayers(){
    if(currentHls){ currentHls.destroy(); currentHls = null; }
    if(currentMpegts){ currentMpegts.destroy(); currentMpegts = null; }
    if(retryTimer){ clearTimeout(retryTimer); retryTimer = null; }
  }

  function playChannel(url, name, idx){
    activeIndex = idx;
    lastUrl = url;
    retryCount = 0;
    triedMpegtsFallback = false;
    document.getElementById('nowPlaying').textContent = 'Reproduciendo: ' + name;
    renderChannels(currentView.length ? currentView : allChannels);

    const video = document.getElementById('videoPlayer');
    showOverlay('Cargando stream…', true, false);

    teardownPlayers();
    if(noVideoCheckTimer){ clearTimeout(noVideoCheckTimer); noVideoCheckTimer = null; }
    video.removeAttribute('src');
    video.load();

    const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
    const isProgressive = /\.(mp4|webm|ogg|mkv|m4v)$/.test(cleanUrl);

    if(isProgressive){
      video.src = url;
      video.play().catch(()=>{
        showOverlay('No se pudo reproducir automáticamente. Usa los controles.', false, false);
      });
    } else if(Hls.isSupported()){
      startHls(video, url, name, idx);
    } else if(video.canPlayType('application/vnd.apple.mpegurl')){
      video.src = url;
      video.play().catch(()=>{});
    } else if(typeof mpegts !== 'undefined' && mpegts.getFeatureList().mseLivePlayback){
      startMpegts(video, url, idx);
    } else {
      showOverlay('Formato no soportado por el navegador. Prueba con VLC.', false, true);
    }

    noVideoCheckTimer = setTimeout(()=>{
      if(idx !== activeIndex) return;
      if(video.readyState >= 2 && video.videoWidth === 0 && !video.paused){
        handleChannelFailure(idx, 'Solo audio: el códec de video de este canal no es compatible con el navegador. Prueba en VLC.');
      }
    }, 4000);
  }

  function handleChannelFailure(idx, message){
    if(idx == null || idx < 0 || !currentView[idx]) return;
    const ch = currentView[idx];
    channelFailStatus[ch.url] = true;
    renderChannels(currentView);
    showOverlay(message, false, true);
    if(document.getElementById('autoSkipToggle').checked){
      setTimeout(()=>{ if(idx === activeIndex) playNextChannel(idx); }, 1300);
    }
  }

  function playNextChannel(fromIdx){
    if(!currentView.length) return;
    for(let step = 1; step <= currentView.length; step++){
      const next = (fromIdx + step) % currentView.length;
      const ch = currentView[next];
      if(!channelFailStatus[ch.url]){
        playChannel(ch.url, ch.name, next);
        return;
      }
    }
    showOverlay('Ningún canal de la lista es compatible con tu navegador.', false, true);
  }

  document.getElementById('videoPlayer').addEventListener('waiting', ()=> showOverlay('Cargando…', true, false));
  document.getElementById('videoPlayer').addEventListener('playing', hideOverlay);
  document.getElementById('videoPlayer').addEventListener('canplay', hideOverlay);

  function startHls(video, url, name, idx){
    const hls = new Hls({
      maxBufferLength: 30,
      maxMaxBufferLength: 60,
      liveSyncDurationCount: 3,
      enableWorker: true,
      backBufferLength: 30
    });
    currentHls = hls;
    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function(){
      video.play().catch(()=>{});
    });

    hls.on(Hls.Events.ERROR, function(event, data){
      if(!data.fatal || idx !== activeIndex) return;

      const notHlsContent = data.details === 'manifestParsingError' || data.details === 'manifestLoadError';
      if(notHlsContent && !triedMpegtsFallback && typeof mpegts !== 'undefined' && mpegts.getFeatureList().mseLivePlayback){
        triedMpegtsFallback = true;
        hls.destroy();
        currentHls = null;
        showOverlay('Probando formato alterno…', true, false);
        startMpegts(video, url, idx);
        return;
      }

      if(retryCount >= MAX_RETRIES){
        handleChannelFailure(idx, 'No se pudo cargar el canal (caído o no compatible con el navegador). Prueba en VLC.');
        return;
      }
      retryCount++;
      const delay = Math.min(1000 * retryCount, 4000);
      showOverlay(`Reconectando… (${retryCount}/${MAX_RETRIES})`, true, false);
      retryTimer = setTimeout(()=>{
        switch(data.type){
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            hls.destroy();
            currentHls = null;
            startHls(video, url, name, idx);
            break;
        }
      }, delay);
    });
  }

  function startMpegts(video, url, idx){
    if(currentMpegts){ currentMpegts.destroy(); currentMpegts = null; }
    const player = mpegts.createPlayer({
      type: 'mpegts',
      isLive: true,
      url: url
    }, {
      enableWorker: true,
      liveBufferLatencyChasing: true
    });
    currentMpegts = player;
    player.attachMediaElement(video);
    player.load();
    player.play().catch(()=>{});

    player.on(mpegts.Events.ERROR, function(){
      if(idx !== activeIndex) return;
      if(retryCount >= MAX_RETRIES){
        handleChannelFailure(idx, 'No se pudo cargar el canal (caído o no compatible con el navegador). Prueba en VLC.');
        return;
      }
      retryCount++;
      const delay = Math.min(1000 * retryCount, 4000);
      showOverlay(`Reconectando… (${retryCount}/${MAX_RETRIES})`, true, false);
      retryTimer = setTimeout(()=>{
        player.unload();
        player.load();
        player.play().catch(()=>{});
      }, delay);
    });
  }
