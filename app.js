/* ═══════════════════════════════════════════════
   GoalKit — app.js
   Carrello + Ordini + EmailJS
═══════════════════════════════════════════════ */

// ── CONFIG EMAIL (salvata in localStorage) ──
// Le credenziali sono configurate UNA VOLTA dal venditore via "⚙️ Setup Email"
// e poi funzionano automaticamente per tutti gli ordini di tutti i clienti.
const DEFAULT_EMAIL_CONFIG = {
  publicKey: "z3BLJtLhUWt266yFW",
  serviceId: "service_0onnes3",
  templateId: "template_i8e9odd",
  customerTemplateId: "template_oo5ig0c",
  ownerEmail: "worldofkits04@gmail.com"
};
let EMAIL_CONFIG = Object.assign({}, DEFAULT_EMAIL_CONFIG, JSON.parse(localStorage.getItem('gk_email_config') || '{}'));

// ── STATO ──
let cart = JSON.parse(localStorage.getItem('gk_cart') || '[]').map(function (item) {
  if (!item._uid) item._uid = Date.now() + '-' + Math.random().toString(36).slice(2);
  return item;
});
let currentFilter = 'all';
let currentTeam = null; // filtra per squadra specifica
let currentSearch = '';   // testo libero della search bar
let quickViewProduct = null;

// ── SQUADRE PER CATEGORIA ──
const TEAMS = {
  Champions: [
    'Real Madrid', 'Manchester City', 'Bayern Monaco', 'PSG', 'Inter', 'Juventus',
    'Atletico Madrid', 'Borussia Dortmund', 'Arsenal', 'Barcellona', 'Napoli', 'Porto',
    'Ajax', 'Chelsea', 'Liverpool', 'Milan', 'Tottenham', 'Benfica', 'Leverkusen', 
    'RB Leipzig', 'Atalanta', 
  ],
  Premier: [
    'Arsenal FC', 'Aston Villa', 'Brighton', 'Chelsea', 'Crystal Palace', 'Liverpool FC',
    'Manchester City', 'Manchester United', 'Newcastle', 'Tottenham', 'West Ham',
  ],
  SerieA: [
    'Atalanta', 'Bologna', 'Cagliari', 'Como', 'Cremonese', 'Fiorentina', 'Genoa', 'Inter', 'Juventus', 'Lazio',
    'Lecce', 'Milan', 'Napoli', 'Parma', 'Pisa', 'Roma', 'Sassuolo', 'Torino', 'Udinese', 'Verona'
  ],
  Bundesliga: [
    'Bayern Monaco', 'Borussia Dortmund', 'Bayer Leverkusen', 'RB Leipzig',
    'Eintracht Francoforte', 'Wolfsburg', 'Stoccarda', 'Friburgo'
  ],
  SaudiLeague: [
    'Al Nassr', 'Al Hilal', 'Al Ittihad', 'Al Ahli',
    'Al Qadsiah', 'Al Shabab', 'Al Ettifaq', 'Al Fayha'
  ],
  LaLiga: [
    'Al Nassr', 'Al Hilal', 'Al Ittihad', 'Al Ahli',
    'Al Qadsiah', 'Al Shabab', 'Al Ettifaq', 'Al Fayha'
  ],
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  renderProducts(currentFilter);
  updateCartUI();
  setupParticles();
  setupNav();
  setupCartSidebar();
  setupOrderModal();
  setupQuickView();
  setupContactForm();
  setupSetupModal();
  setupAdminBtn();
  setupScrollSpy();
  setupFilters();
  setupSearch();
  setupVendorPanel();
  setupReviews();
  setupCustomOrder();
  setupHeroCarousel();
  setupReviewMiniCarousels();
});

// ── EMAILJS INIT ──
function initEmailJS() {
  if (EMAIL_CONFIG.publicKey) {
    emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
  }
}

// ── PARTICELLE HERO ──
function setupParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${4 + Math.random() * 4}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      opacity: ${0.2 + Math.random() * 0.3};
    `;
    container.appendChild(p);
  }
}

// ── NAVBAR ──
function setupNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => navLinks?.classList.toggle('open'));

  // Chiudi menu su click link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('open'));
  });

  // Logo click → top
  document.querySelector('.nav-logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── SCROLL SPY ──
function setupScrollSpy() {
  const sections = ['home', 'products', 'about', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
}

// ═══════════════════════════════
// PRODOTTI
// ═══════════════════════════════

// Controlla se un prodotto appartiene a una categoria (supporta stringa e array)
function productMatchesCategory(p, filter) {
  if (filter === 'all') return true;
  const cats = Array.isArray(p.category) ? p.category : [p.category];
  return cats.includes(filter);
}

// Controlla se un prodotto appartiene a una squadra specifica
function productMatchesTeam(p, team) {
  if (!team) return true;
  return p.name.toLowerCase().includes(team.toLowerCase());
}

// Controlla se un prodotto corrisponde al testo di ricerca
function productMatchesSearch(p, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const name = p.name.toLowerCase();
  const label = Array.isArray(p.categoryLabel)
    ? p.categoryLabel.join(' ').toLowerCase()
    : (p.categoryLabel || '').toLowerCase();
  return name.includes(q) || label.includes(q);
}

function renderProducts(filter, team = null) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = PRODUCTS.filter(p =>
    productMatchesCategory(p, filter) &&
    productMatchesTeam(p, team) &&
    productMatchesSearch(p, currentSearch)
  );

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
        <p style="font-size:1.1rem;">Nessun prodotto trovato per questa selezione.</p>
      </div>`;
    return;
  }

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 0.06}s`;
    const catLabel = Array.isArray(p.categoryLabel)
      ? p.categoryLabel.join(', ')
      : p.categoryLabel;
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22220%22><rect fill=%22%230f1525%22 width=%22300%22 height=%22220%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2240%22>⚽</text></svg>'">
        ${p.badge ? `<span class="card-badge ${p.badge}">${p.badgeLabel}</span>` : ''}
        <div class="card-quick" onclick="openQuickView(${p.id})">🔍 Vista Rapida</div>
      </div>
      <div class="card-body">
        <div class="card-category">${catLabel}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-sizes" data-product-id="${p.id}">
          ${p.sizes.slice(0, 5).map((s, i) => `<button class="size-tag${i === 0 ? ' active' : ''}" onclick="selectCardSize(this)">${s}</button>`).join('')}
          ${p.sizes.length > 5 ? `<span class="size-tag">+${p.sizes.length - 5}</span>` : ''}
        </div>
        <div class="card-fabric" data-product-id="${p.id}">
          <button class="fabric-btn active" onclick="selectCardFabric(this)" data-extra="0">👕 Tifoso</button>
          <button class="fabric-btn" onclick="selectCardFabric(this)" data-extra="4">⚡ Player <span class="fabric-plus">+€4</span></button>
        </div>
        <div class="card-footer">
          <div>
            <span class="card-price" data-base="${p.price}" data-product-id="${p.id}">€${p.price.toFixed(2)}</span>
            ${p.oldPrice ? `<span class="card-price-old">€${p.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="card-add" onclick="addToCart(${p.id})">+ Aggiungi</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── SETUP FILTRI + DROPDOWN ──
function setupFilters() {
  // Bottone "Tutti"
  const allBtn = document.getElementById('filterAll');
  allBtn?.addEventListener('click', () => {
    setActiveFilter('all', null);
    closeAllDropdowns();
  });

  // Configura ogni dropdown
  const ddConfigs = [
    { ddId: 'ddChampions', menuId: 'menuChampions', filter: 'Champions', btnId: 'filterChampions' },
    { ddId: 'ddPremier', menuId: 'menuPremier', filter: 'Premier', btnId: 'filterPremier' },
    { ddId: 'ddSerieA', menuId: 'menuSerieA', filter: 'SerieA', btnId: 'filterSerie' },
    { ddId: 'ddBundesliga', menuId: 'menuBundesliga', filter: 'Bundesliga', btnId: 'filterBundesliga' },
    { ddId: 'ddSaudi', menuId: 'menuSaudi', filter: 'SaudiLeague', btnId: 'filterSaudi' },
  ];

  ddConfigs.forEach(({ ddId, menuId, filter, btnId }) => {
    const dd = document.getElementById(ddId);
    const menu = document.getElementById(menuId);
    const btn = document.getElementById(btnId);
    if (!dd || !menu || !btn) return;

    // Popola il menu con le squadre
    const teams = TEAMS[filter] || [];
    menu.innerHTML = `
      <li>
        <button data-team="" class="dd-item-all">⚽ Tutte le squadre</button>
      </li>
      <li><div class="dd-divider"></div></li>
      ${teams.map(t => `<li><button data-team="${t}">${t}</button></li>`).join('')}
    `;

    // Click sul bottone principale: filtra la categoria + apre/chiude dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        dd.classList.add('open');
        setActiveFilter(filter, null, false); // filtra categoria senza toccare lo stile active
      } else {
        setActiveFilter(filter, null);
      }
    });

    // Click su una voce del menu
    menu.addEventListener('click', (e) => {
      const item = e.target.closest('button[data-team]');
      if (!item) return;
      e.stopPropagation();
      const team = item.dataset.team || null;
      // Aggiorna stile voce attiva
      menu.querySelectorAll('button').forEach(b => b.classList.remove('dd-item-active'));
      item.classList.add('dd-item-active');
      setActiveFilter(filter, team);
      closeAllDropdowns();
    });
  });

  // Chiudi dropdown cliccando fuori
  document.addEventListener('click', () => closeAllDropdowns());
}

function closeAllDropdowns() {
  document.querySelectorAll('.filter-dropdown.open').forEach(dd => dd.classList.remove('open'));
}

function setActiveFilter(filter, team, updateActiveBtn = true) {
  currentFilter = filter;
  currentTeam = team || null;
  if (updateActiveBtn) {
    // Resetta tutti i filter-btn
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    // Attiva il bottone corretto
    if (filter === 'all') {
      document.getElementById('filterAll')?.classList.add('active');
    } else {
      const mapping = {
        Champions: 'filterChampions',
        Premier: 'filterPremier',
        SerieA: 'filterSerie',
        Bundesliga: 'filterBundesliga',
        SaudiLeague: 'filterSaudi'
      };
      document.getElementById(mapping[filter])?.classList.add('active');
    }
  }
  renderProducts(currentFilter, currentTeam);
}

// ── SEARCH BAR ──
function setupSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentSearch = input.value.trim();
      // Se c'è testo di ricerca, resetta filtro categoria per cercare ovunque
      if (currentSearch) {
        currentFilter = 'all';
        currentTeam = null;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('filterAll')?.classList.add('active');
        closeAllDropdowns();
      }
      clearBtn?.classList.toggle('visible', currentSearch.length > 0);
      renderProducts(currentFilter, currentTeam);
    }, 200);
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    currentSearch = '';
    clearBtn.classList.remove('visible');
    renderProducts(currentFilter, currentTeam);
    input.focus();
  });

  // Chiudi dropdown quando si digita nella search
  input.addEventListener('focus', () => closeAllDropdowns());
}

// ═══════════════════════════════
// QUICK VIEW
// ═══════════════════════════════
function setupQuickView() {
  document.getElementById('quickViewClose')?.addEventListener('click', closeQuickView);
  document.getElementById('quickViewOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'quickViewOverlay') closeQuickView();
  });
}

function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  quickViewProduct = p;
  const content = document.getElementById('quickViewContent');
  content.innerHTML = `
    <div class="qv-grid">
      <img src="${p.image}" alt="${p.name}" class="qv-img"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><rect fill=%22%230f1525%22 width=%22300%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2260%22>⚽</text></svg>'">
      <div>
        <div class="qv-category">${p.categoryLabel}</div>
        <div class="qv-name">${p.name}</div>
        <div class="qv-desc">${p.description}</div>
        <div class="qv-price" id="qvPriceDisplay" data-base="${p.price}">
          €${p.price.toFixed(2)}
          ${p.oldPrice ? `<small style="font-size:.9rem;color:var(--text-muted);text-decoration:line-through;margin-left:.4rem">€${p.oldPrice.toFixed(2)}</small>` : ''}
        </div>
        <div class="qv-size-label">Taglia</div>
        <div class="qv-sizes">
          ${p.sizes.map((s, i) => `<button class="qv-size-btn${i === 0 ? ' active' : ''}" onclick="selectQvSize(this)">${s}</button>`).join('')}
        </div>
        <div class="qv-size-label" style="margin-top:.75rem">Tessuto</div>
        <div class="qv-fabric-row">
          <button class="fabric-btn active" data-extra="0" onclick="selectQvFabric(this)">👕 Tifoso</button>
          <button class="fabric-btn" data-extra="4" onclick="selectQvFabric(this)">⚡ Player <span class="fabric-plus">+€4</span></button>
        </div>
        <button class="btn btn-primary btn-full" onclick="addToCartFromQV(${p.id}); closeQuickView();">
          🛒 Aggiungi al Carrello
        </button>
      </div>
    </div>
  `;
  openOverlay('quickViewOverlay');
}

function selectQvSize(btn) {
  btn.closest('.qv-sizes').querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectQvFabric(btn) {
  btn.closest('.qv-fabric-row').querySelectorAll('.fabric-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // aggiorna prezzo
  const priceEl = document.getElementById('qvPriceDisplay');
  if (priceEl) {
    const base = parseFloat(priceEl.dataset.base || 0);
    const extra = parseFloat(btn.dataset.extra || 0);
    priceEl.innerHTML = `€${(base + extra).toFixed(2)}`;
  }
}

function addToCartFromQV(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const activeSize = document.querySelector('.qv-sizes .qv-size-btn.active');
  const activeFabric = document.querySelector('.qv-fabric-row .fabric-btn.active');

  const selectedSize = activeSize ? activeSize.textContent.trim() : (p.sizes[0] || 'M');
  const fabricLabel = activeFabric ? activeFabric.textContent.replace('+€4', '').trim() : '👕 Tifoso';
  const fabricExtra = activeFabric ? parseFloat(activeFabric.dataset.extra || 0) : 0;
  const finalPrice = p.price + fabricExtra;

  const existing = cart.find(item =>
    item.id === productId && item.size === selectedSize && item.fabric === fabricLabel
  );
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: p.id, name: p.name, price: finalPrice, image: p.image, qty: 1, size: selectedSize, fabric: fabricLabel, _uid: Date.now() + '-' + Math.random().toString(36).slice(2) });
  }
  saveCart();
  updateCartUI();
  showToast('✅', `"${p.name}" (${selectedSize} · ${fabricLabel}) aggiunto!`);
  openCart();
}

function closeQuickView() {
  closeOverlay('quickViewOverlay');
}

// ═══════════════════════════════
// CARRELLO
// ═══════════════════════════════
function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  // Taglia attiva
  const sizeContainer = document.querySelector('.card-sizes[data-product-id="' + productId + '"]');
  const activeSize = sizeContainer ? sizeContainer.querySelector('.size-tag.active') : null;
  const selectedSize = activeSize ? activeSize.textContent.trim() : (p.sizes[0] || 'M');

  // Tessuto attivo (Tifoso / Player)
  const fabricContainer = document.querySelector('.card-fabric[data-product-id="' + productId + '"]');
  const activeFabric = fabricContainer ? fabricContainer.querySelector('.fabric-btn.active') : null;
  const fabricLabel = activeFabric ? activeFabric.textContent.replace('+€4', '').trim() : '👕 Tifoso';
  const fabricExtra = activeFabric ? parseFloat(activeFabric.dataset.extra || 0) : 0;
  const finalPrice = p.price + fabricExtra;

  // Distingui per id + taglia + tessuto
  const existing = cart.find(item =>
    item.id === productId && item.size === selectedSize && item.fabric === fabricLabel
  );
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: p.id,
      name: p.name,
      price: finalPrice,
      image: p.image,
      qty: 1,
      size: selectedSize,
      fabric: fabricLabel,
      _uid: Date.now() + '-' + Math.random().toString(36).slice(2)
    });
  }
  saveCart();
  updateCartUI();
  showToast('✅', '"' + p.name + '" (' + selectedSize + ' · ' + fabricLabel + ') aggiunto!');
  openCart();
}

function selectCardSize(btn) {
  const container = btn.closest('.card-sizes');
  if (!container) return;
  container.querySelectorAll('.size-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectCardFabric(btn) {
  const container = btn.closest('.card-fabric');
  if (!container) return;
  container.querySelectorAll('.fabric-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Aggiorna il prezzo mostrato nella card
  const productId = container.dataset.productId;
  const priceEl = document.querySelector('.card-price[data-product-id="' + productId + '"]');
  if (priceEl) {
    const base = parseFloat(priceEl.dataset.base || 0);
    const extra = parseFloat(btn.dataset.extra || 0);
    priceEl.textContent = '\u20ac' + (base + extra).toFixed(2);
  }
}

function removeFromCart(uid) {
  cart = cart.filter(item => item._uid !== uid && item.id != uid);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(uid, delta) {
  const item = cart.find(x => x._uid === uid || x.id == uid);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('gk_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const count = getCartCount();
  if (badge) badge.textContent = count;
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const empty = document.getElementById('cartEmpty');
  if (!container) return;

  if (cart.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    container.innerHTML = '';
    container.appendChild(empty);
    return;
  }
  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';

  const total = getCartTotal();
  const shipping = total >= 50 ? 'Gratuita' : '€3.00';

  let html = '';
  cart.forEach(function (item) {
    const isCustom = !!item.custom;
    const uid = item._uid || item.id;
    const uidRef = "'" + uid + "'";
    const imgSrc = item.image || '';
    const safeName = String(item.name).replace(/"/g, '&quot;');

    const imgHtml = isCustom
      ? '<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:rgba(108,99,255,.1);border-radius:8px;">🔍</div>'
      : '<img class="cart-item-img" src="' + imgSrc + '" alt="' + safeName + '" onerror="this.style.display=\'none\'">';

    const priceLabel = '&euro;' + (item.price * item.qty).toFixed(2);

    html += '<div class="cart-item">'
      + imgHtml
      + '<div class="cart-item-info">'
      + '<div class="cart-item-name">' + item.name + '</div>'
      + '<div class="cart-item-meta">Taglia: ' + item.size + (item.fabric ? ' &nbsp;·&nbsp; ' + item.fabric : '') + '</div>'
      + '<div class="cart-item-price">' + priceLabel + '</div>'
      + '<div class="cart-item-qty">'
      + '<button class="qty-btn" onclick="changeQty(' + uidRef + ', -1)">&minus;</button>'
      + '<span class="qty-val">' + item.qty + '</span>'
      + '<button class="qty-btn" onclick="changeQty(' + uidRef + ', +1)">+</button>'
      + '</div>'
      + '</div>'
      + '<button class="cart-item-remove" onclick="removeFromCart(' + uidRef + ')" title="Rimuovi">&#128465;&#65039;</button>'
      + '</div>';
  });
  container.innerHTML = html;

  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');
  if (subtotalEl) subtotalEl.textContent = `€${total.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping;
  const finalTotal = shipping === 'Gratuita' ? total : total + 3.00;
  if (totalEl) totalEl.textContent = `€${finalTotal.toFixed(2)}`;
}

// ── SIDEBAR CART ──
function setupCartSidebar() {
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('cartOverlay');
  const goShop = document.getElementById('goShopBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
  goShop?.addEventListener('click', () => { closeCart(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); });
  checkoutBtn?.addEventListener('click', () => { closeCart(); openOrderModal(); });
}

function openCart() {
  renderCartItems();
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════
// ORDINE MODAL
// ═══════════════════════════════
function setupOrderModal() {
  document.getElementById('orderClose')?.addEventListener('click', closeOrderModal);
  document.getElementById('orderOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'orderOverlay') closeOrderModal();
  });
  document.getElementById('orderForm')?.addEventListener('submit', submitOrder);
}

function openOrderModal() {
  if (cart.length === 0) { showToast('⚠️', 'Il carrello è vuoto!'); return; }
  renderOrderSummary();
  openOverlay('orderOverlay');
}

function closeOrderModal() {
  closeOverlay('orderOverlay');
}

function renderOrderSummary() {
  const box = document.getElementById('orderSummaryBox');
  if (!box) return;
  const total = getCartTotal();
  const shipping = total >= 50 ? 0 : 3.00;
  const finalTotal = total + shipping;
  box.innerHTML = `
    <h4>📋 Riepilogo Ordine</h4>
    ${cart.map(item => `
      <div class="order-summary-row">
        <span>${item.name} × ${item.qty} (${item.size})</span>
        <span>€${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join('')}
    <div class="order-summary-row">
      <span>Spedizione</span>
      <span>${shipping === 0 ? 'Gratuita 🎉' : '€3.00'}</span>
    </div>
    <div class="order-summary-total">
      <span>TOTALE</span>
      <span>€${finalTotal.toFixed(2)}</span>
    </div>
  `;
}

async function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('orderSubmitBtn');
  const btnText = document.getElementById('orderBtnText');

  // Controlla configurazione EmailJS (usa la variabile globale)
  if (!EMAIL_CONFIG.publicKey || !EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.ownerEmail) {
    showToast('⚠️', 'Sistema email non configurato. Clicca su "⚙️ Setup Email" per configurarlo.');
    return;
  }

  const name = document.getElementById('orderName').value.trim();
  const surname = document.getElementById('orderSurname').value.trim();
  const email = document.getElementById('orderEmail').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();
  const city = document.getElementById('orderCity').value.trim();
  const zip = document.getElementById('orderZip').value.trim();
  const notes = document.getElementById('orderNotes').value.trim();

  const total = getCartTotal();
  const shipping = total >= 60 ? 0 : 3.00;
  const finalTotal = total + shipping;
  const orderNum = 'WOK-' + Date.now().toString().slice(-6);

  const orderDetails = cart.map(item => {
    const priceStr = item.custom ? '⚠️ Prezzo da definire' : `€${(item.price * item.qty).toFixed(2)}`;
    return `• ${item.name} | Taglia: ${item.size} | Qtà: ${item.qty} | ${priceStr}`;
  }).join('\n');


  // Loading state
  btn.disabled = true;
  btnText.textContent = '⏳ Invio in corso...';

  try {
    // Invia email SOLO al venditore tramite EmailJS
    const emailData = {
      to_email: EMAIL_CONFIG.ownerEmail,
      customer_name: `${name} ${surname}`,
      customer_email: email,
      customer_phone: phone || 'Non fornito',
      customer_address: address,
      customer_city: city,
      customer_zip: zip,
      order_number: orderNum,
      order_details: orderDetails,
      order_subtotal: `€${total.toFixed(2)}`,
      order_shipping: shipping === 0 ? 'Gratuita' : '€3.00',
      order_total: `€${finalTotal.toFixed(2)}`,
      order_notes: notes || 'Nessuna nota',
      reply_to: email
    };

    console.log("DATI INVIATI A EMAILJS:", emailData);

    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      emailData
    );

    // Invia conferma automatica AL CLIENTE
    const customerTemplateId = EMAIL_CONFIG.customerTemplateId || EMAIL_CONFIG.templateId;
    const customerConfirmData = {
      to_email: email,                              // ← va al cliente
      customer_name: `${name} ${surname}`,
      customer_email: email,
      customer_phone: phone || 'Non fornito',
      customer_address: `${address}, ${zip} ${city}`,
      order_number: orderNum,
      order_details: orderDetails,
      order_subtotal: `€${total.toFixed(2)}`,
      order_shipping: shipping === 0 ? 'Gratuita 🎉' : '€3.00',
      order_total: `€${finalTotal.toFixed(2)}`,
      order_notes: notes || 'Nessuna nota',
      reply_to: EMAIL_CONFIG.ownerEmail            // cliente può rispondere al venditore
    };
    try {
      await emailjs.send(EMAIL_CONFIG.serviceId, customerTemplateId, customerConfirmData);
    } catch (customerErr) {
      console.warn('Email conferma cliente non inviata:', customerErr);
    }

    // Svuota carrello e mostra conferma al cliente
    const savedOrder = { orderNum, name, surname, finalTotal, shipping, cart: [...cart] };
    cart = [];
    saveCart();
    updateCartUI();
    closeOrderModal();
    document.getElementById('orderForm')?.reset();
    showOrderConfirmation(savedOrder);

  } catch (err) {
    console.error('Errore invio ordine:', err);
    showToast('❌', 'Errore nell’invio. Controlla la configurazione email e riprova.');
  } finally {
    btn.disabled = false;
    btnText.textContent = '✅ Conferma Ordine';
  }
}

// ── MODAL CONFERMA ORDINE (per il cliente) ──
function showOrderConfirmation({ orderNum, name, surname, finalTotal, shipping, cart: items }) {
  // Crea overlay dinamico
  let overlay = document.getElementById('confirmOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'confirmOverlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal glass" style="max-width:500px;text-align:center;">
        <div style="font-size:4rem;margin-bottom:1rem;">🎉</div>
        <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:.5rem;">Ordine Ricevuto!</h2>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;">Grazie <strong id="confName"></strong>, il tuo ordine è stato inviato con successo.</p>
        <div class="glass" style="border-radius:12px;padding:1rem;margin-bottom:1.5rem;text-align:left;">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
            <span style="color:var(--text-muted);font-size:.85rem;">Numero ordine</span>
            <strong id="confNum" style="color:var(--accent);"></strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-muted);font-size:.85rem;">Totale pagato</span>
            <strong id="confTotal"></strong>
          </div>
        </div>
        <p style="font-size:.85rem;color:var(--text-muted);margin-bottom:2rem;">Verrai contattato via email o telefono per la conferma della spedizione. Il pagamento avviene alla consegna.</p>
        <button class="btn btn-primary btn-full" id="confClose">✅ Perfetto, grazie!</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('confClose').addEventListener('click', () => {
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // ← ripristina lo scroll
      }, 300);
    });
  }

  document.getElementById('confName').textContent = `${name} ${surname}`;
  document.getElementById('confNum').textContent = orderNum;
  document.getElementById('confTotal').textContent = `€${finalTotal.toFixed(2)}`;

  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  // NON blocchiamo overflow qui — closeOrderModal lo ha già rilasciato
}



// ── CONTACT FORM ──
function setupContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const msg = document.getElementById('contactMsg').value;
    const btn = document.getElementById('contactSubmit');
    btn.disabled = true;

    try {
      if (EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId && EMAIL_CONFIG.templateId) {
        // 📩 EMAIL AL VENDITORE
        await emailjs.send(
          EMAIL_CONFIG.serviceId,
          EMAIL_CONFIG.templateId,
          emailData
        );

        // 📩 EMAIL AL CLIENTE
        await emailjs.send(
          EMAIL_CONFIG.serviceId,
          "order_customer", // 👈 nome template cliente
          {
            ...emailData,
            to_email: email // 👈 invia al cliente
          }
        );
      } else {
        const sub = encodeURIComponent(`[WorldOfKits] Messaggio da ${name}`);
        const body = encodeURIComponent(`Da: ${name} <${email}>\n\n${msg}`);
        window.open(`mailto:${EMAIL_CONFIG.ownerEmail || ''}?subject=${sub}&body=${body}`);
      }
      showToast('✅', 'Messaggio inviato! Ti risponderemo presto.');
      document.getElementById('contactForm').reset();
    } catch {
      showToast('❌', 'Errore invio. Riprova.');
    } finally {
      btn.disabled = false;
    }
  });
}

// ═══════════════════════════════
// SETUP EMAIL MODAL
// ═══════════════════════════════
function setupSetupModal() {
  document.getElementById('setupClose')?.addEventListener('click', closeSetupModal);
  document.getElementById('setupOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'setupOverlay') closeSetupModal();
  });
  document.getElementById('setupForm')?.addEventListener('submit', saveEmailConfig);

  // Pre-fill se già configurato
  if (EMAIL_CONFIG.publicKey) {
    document.getElementById('ejsPublicKey').value = EMAIL_CONFIG.publicKey || '';
    document.getElementById('ejsServiceId').value = EMAIL_CONFIG.serviceId || '';
    document.getElementById('ejsTemplateId').value = EMAIL_CONFIG.templateId || '';
    document.getElementById('ejsOwnerEmail').value = EMAIL_CONFIG.ownerEmail || '';
    const ctEl = document.getElementById('ejsCustomerTemplateId');
    if (ctEl) ctEl.value = EMAIL_CONFIG.customerTemplateId || '';
  }
}

function openSetupModal() {
  document.getElementById('setupOverlay').style.display = 'flex';
  setTimeout(() => document.getElementById('setupOverlay').classList.add('open'), 10);
}

function closeSetupModal() {
  document.getElementById('setupOverlay').classList.remove('open');
  setTimeout(() => document.getElementById('setupOverlay').style.display = 'none', 300);
}

function saveEmailConfig(e) {
  e.preventDefault();
  EMAIL_CONFIG = {
    publicKey: document.getElementById('ejsPublicKey').value.trim(),
    serviceId: document.getElementById('ejsServiceId').value.trim(),
    templateId: document.getElementById('ejsTemplateId').value.trim(),
    ownerEmail: document.getElementById('ejsOwnerEmail').value.trim(),
    customerTemplateId: (document.getElementById('ejsCustomerTemplateId')?.value || '').trim()
  };
  localStorage.setItem('gk_email_config', JSON.stringify(EMAIL_CONFIG));
  emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
  closeSetupModal();
  showToast('✅', 'Configurazione email salvata!');
  updateAdminBtnVisibility();
  updateVendorBtnVisibility();
}

// ── ADMIN BTN ──
function setupAdminBtn() {
  const btn = document.getElementById('adminBtn');
  if (!btn) return;

  // Nascondi il bottone se la configurazione è già salvata
  updateAdminBtnVisibility();

  btn.addEventListener('click', openSetupModal);
}

function updateAdminBtnVisibility() {
  const btn = document.getElementById('adminBtn');
  if (!btn) return;
  const isConfigured = EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId &&
    EMAIL_CONFIG.templateId && EMAIL_CONFIG.ownerEmail;
  btn.style.display = isConfigured ? 'none' : 'flex';
}

// ═══════════════════════════════
// UTILITY
// ═══════════════════════════════
function openOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'flex';
  requestAnimationFrame(() => el.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  setTimeout(() => { el.style.display = 'none'; }, 300);
  document.body.style.overflow = '';
}

let toastTimeout;
function showToast(icon, msg) {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  if (toastIcon) toastIcon.textContent = icon;
  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ═══════════════════════════════════════════════
// PANNELLO VENDITORE — Rispondi al Cliente
// ═══════════════════════════════════════════════

const REPLY_TEMPLATES = {
  confirm: (name, orderNum) =>
    `Ciao ${name || '[Nome Cliente]'},

grazie mille per il tuo ordine su WorldOfKits! 🎉

📦 Numero Ordine: ${orderNum || '[WOK-XXXXXX]'}

Il tuo ordine è stato ricevuto ed è attualmente in fase di lavorazione.
Ti contatteremo non appena è pronto per la spedizione.

Per qualsiasi domanda, rispondi pure a questa email.

A presto,
Il Team WorldOfKits ⚽`,

  shipped: (name, orderNum) =>
    `Ciao ${name || '[Nome Cliente]'},

ottime notizie! Il tuo ordine è in viaggio! 🚚

📦 Numero Ordine: ${orderNum || '[WOK-XXXXXX]'}

Il pacco è stato spedito e dovrebbe arrivare entro 24–72 ore lavorative.
Ti avviseremo con i dettagli di tracciamento non appena disponibili.

Grazie per aver scelto WorldOfKits!

Il Team WorldOfKits ⚽`,

  info: (name, orderNum) =>
    `Ciao ${name || '[Nome Cliente]'},

ti scriviamo riguardo al tuo ordine ${orderNum || '[WOK-XXXXXX]'}.

Per poter procedere, avremmo bisogno di alcune informazioni aggiuntive:

👉 [Scrivi qui cosa ti serve — es: conferma taglia, indirizzo, ecc.]

Puoi rispondere direttamente a questa email.

Grazie per la collaborazione,
Il Team WorldOfKits ⚽`,

  custom: () =>
    `Ciao [Nome Cliente],

[Scrivi qui il tuo messaggio personalizzato]

Il Team WorldOfKits ⚽`
};

function setupVendorPanel() {
  const vendorBtn = document.getElementById('vendorReplyBtn');
  const overlay = document.getElementById('vendorOverlay');
  const closeBtn = document.getElementById('vendorClose');
  const copyBtn = document.getElementById('replyCopyBtn');
  const mailtoBtn = document.getElementById('replyMailtoBtn');
  const ejsBtn = document.getElementById('replyEjsBtn');
  const msgArea = document.getElementById('replyMessage');
  const nameInput = document.getElementById('replyCustomerName');
  const numInput = document.getElementById('replyOrderNum');
  const tplBtns = document.querySelectorAll('.reply-tpl-btn');

  if (!vendorBtn || !overlay) return;

  // Mostra bottone solo se EmailJS è configurato
  updateVendorBtnVisibility();

  vendorBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('open'));
    document.body.style.overflow = 'hidden';
    refreshMessage();
  });

  closeBtn?.addEventListener('click', closeVendorPanel);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeVendorPanel(); });

  // Aggiorna messaggio al cambio template
  tplBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tplBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      refreshMessage();
    });
  });

  // Aggiorna messaggio al cambio nome/numero ordine
  nameInput?.addEventListener('input', refreshMessage);
  numInput?.addEventListener('input', refreshMessage);

  // Copia testo
  copyBtn?.addEventListener('click', () => {
    if (!msgArea) return;
    navigator.clipboard.writeText(msgArea.value).then(() => {
      showToast('📋', 'Messaggio copiato negli appunti!');
    });
  });

  // Apri client email (mailto)
  mailtoBtn?.addEventListener('click', () => {
    const toEmail = document.getElementById('replyEmail')?.value.trim();
    if (!toEmail) { showToast('⚠️', 'Inserisci l\'email del cliente!'); return; }
    const orderNum = numInput?.value.trim() || '';
    const subject = encodeURIComponent(`Re: Ordine WorldOfKits${orderNum ? ' — ' + orderNum : ''}`);
    const body = encodeURIComponent(msgArea?.value || '');
    window.open(`mailto:${toEmail}?subject=${subject}&body=${body}`);
  });

  // Invia via EmailJS (richiede secondo template)
  ejsBtn?.addEventListener('click', async () => {
    const toEmail = document.getElementById('replyEmail')?.value.trim();
    const customerName = nameInput?.value.trim() || 'Cliente';
    if (!toEmail) { showToast('⚠️', 'Inserisci l\'email del cliente!'); return; }
    if (!EMAIL_CONFIG.publicKey || !EMAIL_CONFIG.serviceId) {
      showToast('⚠️', 'EmailJS non configurato. Usa "Apri Email" come alternativa.');
      return;
    }
    try {
      ejsBtn.disabled = true;
      ejsBtn.textContent = '⏳ Invio...';
      await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, {
        to_email: toEmail,
        customer_name: customerName,
        customer_email: toEmail,
        order_number: numInput?.value.trim() || 'N/A',
        order_details: msgArea?.value || '',
        order_total: '—',
        order_notes: '—',
        reply_to: EMAIL_CONFIG.ownerEmail
      });
      showToast('✅', `Email inviata a ${toEmail}!`);
      closeVendorPanel();
    } catch (err) {
      console.error(err);
      showToast('❌', 'Errore invio. Usa "Apri Email" come alternativa.');
    } finally {
      ejsBtn.disabled = false;
      ejsBtn.textContent = '⚡ Invia via EmailJS';
    }
  });

  function refreshMessage() {
    const activeTpl = document.querySelector('.reply-tpl-btn.active')?.dataset.tpl || 'confirm';
    const name = nameInput?.value.trim();
    const num = numInput?.value.trim();
    if (msgArea) msgArea.value = REPLY_TEMPLATES[activeTpl](name, num);
  }

  function closeVendorPanel() {
    overlay.classList.remove('open');
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
    document.body.style.overflow = '';
  }
}

function updateVendorBtnVisibility() {
  const btn = document.getElementById('vendorReplyBtn');
  if (!btn) return;
  const isConfigured = EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId &&
    EMAIL_CONFIG.templateId && EMAIL_CONFIG.ownerEmail;
  btn.style.display = isConfigured ? 'flex' : 'none';
}

// ══════════════════════════════════
// CAROSELLO RECENSIONI
// ══════════════════════════════════
function setupReviews() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  const dotsEl = document.getElementById('reviewsDots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;
  let current = 0;
  let autoInterval = null;

  // Calcola la larghezza di uno step (card + gap)
  function cardWidth() {
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return card.offsetWidth + gap;
  }

  // Crea i dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'reviews-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Recensione ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * cardWidth()}px)`;
    dotsEl.querySelectorAll('.reviews-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Auto-play ogni 4s
  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }
  startAuto();

  // Pausa al hover
  const wrap = track.closest('.reviews-carousel-wrap');
  wrap?.addEventListener('mouseenter', () => clearInterval(autoInterval));
  wrap?.addEventListener('mouseleave', startAuto);

  // Swipe su mobile
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  });

  // Ricalcola posizione al resize
  window.addEventListener('resize', () => goTo(current));
}

// ══════════════════════════════════
// RICHIESTA PRODOTTO PERSONALIZZATA
// ══════════════════════════════════
function setupCustomOrder() {
  const form = document.getElementById('customOrderForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('customProductName')?.value.trim();
    const size = document.getElementById('customProductSize')?.value || 'M';
    const qty = parseInt(document.getElementById('customProductQty')?.value) || 1;

    if (!name) return;

    const customItem = {
      id: 'custom-' + Date.now(),
      name: '🔍 ' + name,
      size,
      qty,
      price: 28,
      custom: true
    };

    const existing = cart.find(i => i.name === customItem.name && i.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push(customItem);
    }

    saveCart();
    updateCartUI();
    openCart();  // openCart() chiama renderCartItems() internamente

    showToast('✅', `"${name}" aggiunto! Il prezzo ti verrà comunicato via email.`);
    form.reset();
    document.getElementById('customProductSize').value = 'M';
    document.getElementById('customProductQty').value = '1';
  });
}

// ══════════════════════════════════
// MINI-CAROSELLO RECENSIONI
// ══════════════════════════════════
function setupReviewMiniCarousels() {
  document.querySelectorAll('[data-rmc]').forEach(function (rmc) {
    const imgs = rmc.querySelectorAll('.rmc-img');
    const dots = rmc.querySelectorAll('.rmc-dot');
    if (imgs.length <= 1) return;

    let idx = 0;

    function goTo(n) {
      imgs[idx].classList.remove('active');
      dots[idx].classList.remove('active');
      idx = (n + imgs.length) % imgs.length;
      imgs[idx].classList.add('active');
      dots[idx].classList.add('active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); clearInterval(timer); timer = setInterval(function () { goTo(idx + 1); }, 3000); });
    });

    var timer = setInterval(function () { goTo(idx + 1); }, 3000);
  });
}

// ══════════════════════════════════
// HERO CAROUSEL (immagini modelli)
// ══════════════════════════════════
function setupHeroCarousel() {
  const imgs = document.querySelectorAll('.hero-carousel-img');
  const dotsEl = document.getElementById('heroCarouselDots');
  if (!imgs.length || !dotsEl) return;

  let current = 0;
  let interval = null;

  // Crea dots
  imgs.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'hero-carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Foto ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); resetAuto(); });
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    imgs[current].classList.remove('active');
    dotsEl.querySelectorAll('.hero-carousel-dot')[current].classList.remove('active');
    current = (index + imgs.length) % imgs.length;
    imgs[current].classList.add('active');
    dotsEl.querySelectorAll('.hero-carousel-dot')[current].classList.add('active');
  }

  function startAuto() {
    interval = setInterval(function () { goTo(current + 1); }, 2000);
  }
  function resetAuto() { clearInterval(interval); startAuto(); }
  startAuto();
}
