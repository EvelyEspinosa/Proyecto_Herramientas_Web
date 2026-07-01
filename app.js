/* ── ROUTING ── */
  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    const l = document.getElementById('nav-' + name);
    if (l) l.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ═══════════════════════════════════════
     ANIMACIÓN 1 — TELÉFONO: lógica ventas
  ═══════════════════════════════════════ */
  const products = [
    { item:'Suscripción Premium', price:129.99 },
    { item:'Soporte Nano Banana', price:45.00 },
    { item:'Funda Holográfica Z', price:34.50 },
    { item:'Licencia Engine Pro', price:299.99 },
    { item:'Kit Orbital Gold',    price:85.00 }
  ];
  let salesCount = 0;
  let totalRevenue = 129.99;

  function triggerCoinBurst() {
    const wrap = document.getElementById('phoneWrap');
    const prod = products[Math.floor(Math.random() * products.length)];
    salesCount++;
    totalRevenue += prod.price;

    document.getElementById('saleTitleDisplay').textContent = prod.item;
    document.getElementById('salePriceDisplay').textContent = '+$' + prod.price.toFixed(2) + ' USD';
    document.getElementById('revenueDisplay').textContent = totalRevenue.toLocaleString('es-PA', {minimumFractionDigits:2, maximumFractionDigits:2});

    // coin burst CSS class
    wrap.classList.remove('burst');
    void wrap.offsetWidth; // reflow
    wrap.classList.add('burst');
    setTimeout(() => wrap.classList.remove('burst'), 1000);
  }

  /* ═══════════════════════════════════════
     ANIMACIÓN 2 — CANDADO: toggle unlock
  ═══════════════════════════════════════ */
  function toggleLock() {
    const wrap = document.getElementById('lockWrap');
    const unlocked = wrap.classList.toggle('unlocked');
    document.getElementById('lockIcon').textContent        = unlocked ? '🔓' : '🛍';
    document.getElementById('lockStatusText').textContent  = unlocked ? 'SECURE_CHANNEL_ESTABLISHED' : 'STANDBY_CIPHER_ACTIVE';
    document.getElementById('lockBadgeLabel').textContent  = unlocked ? 'Pass GRANTED' : 'System OK';
    document.getElementById('connText').textContent        = unlocked ? 'Canal Encriptado' : 'Conexión Segura';
    document.getElementById('connSub').textContent         = unlocked ? 'AES_256_ACTIVE / KEY_OK' : 'TLS_1.3_STABLE / STANDBY';
  }

  /* ═══════════════════════════════════════
     ANIMACIÓN 3 — FLECHA: nodos y sync
  ═══════════════════════════════════════ */
  let growthLevel = 1;
  let connectedUsers = 482;
  const activeNodeIndices = [0, 4, 8, 12, 16];

  function buildNodeGrid() {
    const grid = document.getElementById('nodeGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const node = document.createElement('div');
      node.className = 'anim-node' + (activeNodeIndices.includes(i) ? ' active' : '');
      grid.appendChild(node);
    }
  }
  buildNodeGrid();

  function triggerSync() {
    growthLevel++;
    connectedUsers += Math.floor(Math.random() * 25) + 5;
    document.getElementById('syncVal').textContent  = '+' + (growthLevel * 14) + '% SYNC';
    document.getElementById('globeVal').textContent = connectedUsers;

    // randomise active nodes
    const newActive = [];
    while (newActive.length < 7) {
      const n = Math.floor(Math.random() * 18);
      if (!newActive.includes(n)) newActive.push(n);
    }
    activeNodeIndices.length = 0;
    newActive.forEach(n => activeNodeIndices.push(n));
    buildNodeGrid();
  }

  /* ═══════════════════════════════════════
     ANIMACIÓN 4 — COHETE: lanzamiento
  ═══════════════════════════════════════ */
  let launchCount = 0;
  const orbits = ['LEO', 'MEO', 'GEO', 'Luna', 'Marte', 'Alpha Centauri'];

  function launchRocket() {
    const wrap = document.getElementById('rocketWrap');
    launchCount++;
    const newSpeed = Math.min(1 + launchCount * 0.5, 10);
    document.getElementById('speedVal').textContent = newSpeed.toFixed(1) + 'x';
    document.getElementById('orbitVal').textContent = orbits[Math.min(launchCount - 1, orbits.length - 1)];

    wrap.classList.remove('launched');
    void wrap.offsetWidth;
    wrap.classList.add('launched');
    setTimeout(() => wrap.classList.remove('launched'), 1400);
  }