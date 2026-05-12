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
let currentFilter = 'new';
let currentTeam = null;
let currentSearch = '';
let currentSort = 'default';
let quickViewProduct = null;
let currentCustomization = null; // { name, number, shortsNumber, sockSize }
let favorites = JSON.parse(localStorage.getItem('gk_favorites') || '[]'); // array di product id

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
    'Real Madrid', 'Barcellona', 'Atletico Madrid', 'Siviglia', 'Villarreal',
    'Real Betis', 'Athletic Bilbao', 'Real Sociedad', 'Osasuna', 'Valencia'
  ],
  Nazionali: [
    'Italia', 'Francia', 'Spagna', 'Germania', 'Brasile', 'Argentina',
    'Portogallo', 'Inghilterra', 'Belgio', 'Olanda', 'Marocco', 'Giappone'
  ],
  Mondiale2026: [
    'Italia', 'Francia', 'Spagna', 'Germania', 'Brasile', 'Argentina',
    'Portogallo', 'Inghilterra', 'USA', 'Messico', 'Canada', 'Marocco',
    'Giappone', 'Corea del Sud', 'Australia', 'Olanda', 'Belgio', 'Svizzera',
    'Colombia', 'Uraguay', 'Senegal', 'Croazia'
  ],
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  renderProducts(currentFilter);
  updateCartUI();
  setupParticles();
  setupNav();
  setupNavCampionati();
  setupFeatured();
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
  setupFavorites();
  setupCustomizeModal();
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
  if (filter === 'new') return p.badge === 'new';
  if (filter === 'vintage') {
    return p.badgeLabel && p.badgeLabel.toLowerCase() === 'vintage';
  }
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

  let filtered = PRODUCTS.filter(p =>
    productMatchesCategory(p, filter) &&
    productMatchesTeam(p, team) &&
    productMatchesSearch(p, currentSearch)
  );

  // Sort
  if (currentSort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (currentSort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  // Aggiorna contatore
  const countEl = document.getElementById('shopCount');
  if (countEl) countEl.textContent = `(${filtered.length})`;

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
      ? p.categoryLabel[0]
      : p.categoryLabel;
    const fav = isFavorite(p.id);
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onclick="openQuickView(${p.id})"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22360%22><rect fill=%22%230f1525%22 width=%22300%22 height=%22360%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2260%22>&#x26BD;</text></svg>'" style="cursor:pointer;width:100%;height:100%;object-fit:cover;display:block;">
        ${p.badge ? `<span class="card-badge ${p.badge}">${p.badgeLabel}</span>` : ''}
        <button class="card-fav-btn${fav ? ' active' : ''}" data-pid="${p.id}" onclick="event.stopPropagation();toggleFavorite(${p.id},this)" title="${fav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}" aria-label="Preferiti">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${fav ? '#e44545' : 'none'}" stroke="${fav ? '#e44545' : '#999'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="card-info" onclick="openQuickView(${p.id})" style="cursor:pointer;">
        <div class="card-category">${catLabel}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-price-row">
          <span class="card-price">&#x20AC;${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="card-price-old">&#x20AC;${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

}

// ── SETUP FILTRI SIDEBAR 3-LEVEL ──
function setupFilters() {

  // ── Novità / Vintage ──
  document.getElementById('filterNew')?.addEventListener('click', () => setActiveFilter('new', null));
  document.getElementById('filterVintage')?.addEventListener('click', () => setActiveFilter('vintage', null));

  // ── CALCIO: toggle apre/chiude l'intera sezione campionati ──
  const calcioBtn = document.getElementById('calcioToggleBtn');
  const calcioList = document.getElementById('calcioSubList');
  if (calcioBtn && calcioList) {
    calcioBtn.addEventListener('click', () => {
      const isOpen = calcioList.classList.contains('open');
      // Chiudi Accessori se aperto
      document.getElementById('accessoriSubList')?.classList.remove('open');
      document.getElementById('accessoriToggleBtn')?.classList.remove('active');
      if (isOpen) {
        calcioList.classList.remove('open');
        calcioBtn.classList.remove('active');
      } else {
        calcioList.classList.add('open');
        calcioBtn.classList.add('active');
      }
    });
  }

  // ── League buttons (livello 2 dentro Calcio) ──
  const leagueDefs = [
    { btnId: 'filterChampions', listId: 'menuChampions', filter: 'Champions' },
    { btnId: 'megaBtnSerieA', listId: 'megaListSerieA', filter: 'SerieA' },
    { btnId: 'megaBtnLaLiga', listId: 'megaListLaLiga', filter: 'LaLiga' },
    { btnId: 'megaBtnPremier', listId: 'megaListPremier', filter: 'Premier' },
    { btnId: 'megaBtnBundesliga', listId: 'megaListBundesliga', filter: 'Bundesliga' },
    { btnId: 'megaBtnSaudi', listId: 'megaListSaudi', filter: 'SaudiLeague' },
    { btnId: 'megaBtnNazionali', listId: 'megaListNazionali', filter: 'Nazionali' },
  ];

  // ── MONDIALE 2026: pulsante flat diretto ──
  const mondialBtn = document.getElementById('megaBtnMondiale2026');
  if (mondialBtn) {
    mondialBtn.addEventListener('click', () => {
      setActiveFilter('Mondiale2026', null);
    });
  }

  leagueDefs.forEach(({ btnId, listId, filter }) => {
    const btn = document.getElementById(btnId);
    const list = document.getElementById(listId);
    if (!btn || !list) return;

    // Popola lista squadre (livello 3)
    list.innerHTML = (TEAMS[filter] || []).map(t =>
      `<li><button data-team="${t}" data-filter="${filter}">${t}</button></li>`
    ).join('');

    // Click campionato: filtra lega + toggle squadre, non chiude Calcio
    btn.addEventListener('click', () => {
      const isOpen = list.classList.contains('open');
      // Chiudi tutte le altre sub-list di livello 3 dentro calcio (non calcioSubList)
      if (calcioList) {
        calcioList.querySelectorAll('.sidebar-sub-list.open').forEach(sl => {
          if (sl !== list) sl.classList.remove('open');
        });
        calcioList.querySelectorAll('.sidebar-nested-btn').forEach(b => {
          if (b !== btn) b.classList.remove('active');
        });
      }
      if (!isOpen) {
        list.classList.add('open');
        btn.classList.add('active');
      } else {
        list.classList.remove('open');
        btn.classList.remove('active');
      }
      setActiveFilter(filter, null);
    });

    // Click team (livello 3)
    list.addEventListener('click', (e) => {
      const item = e.target.closest('button[data-team]');
      if (!item) return;
      list.querySelectorAll('button').forEach(b => b.classList.remove('dd-item-active'));
      item.classList.add('dd-item-active');
      setActiveFilter(filter, item.dataset.team || null);
      // Su mobile la sidebar è sopra la griglia → scroll alla griglia prodotti
      setTimeout(() => {
        const gridEl = document.getElementById('productsGrid');
        if (gridEl) {
          const navbarH = (document.querySelector('.header')?.offsetHeight || 60) + 16;
          const top = gridEl.getBoundingClientRect().top + window.pageYOffset - navbarH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 120);
    });
  });

  // ── ACCESSORI: toggle apre/chiude la sezione ──
  const accessoriBtn = document.getElementById('accessoriToggleBtn');
  const accessoriList = document.getElementById('accessoriSubList');
  if (accessoriBtn && accessoriList) {
    accessoriBtn.addEventListener('click', () => {
      const isOpen = accessoriList.classList.contains('open');
      // Chiudi Calcio se aperto
      calcioList?.classList.remove('open');
      calcioBtn?.classList.remove('active');
      if (isOpen) {
        accessoriList.classList.remove('open');
        accessoriBtn.classList.remove('active');
      } else {
        accessoriList.classList.add('open');
        accessoriBtn.classList.add('active');
      }
    });

    // Sub-item Accessori
    accessoriList.querySelectorAll('.sidebar-nested-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        accessoriList.querySelectorAll('.sidebar-nested-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setActiveFilter(btn.dataset.filter, null);
      });
    });
  }

  // ── Toggle sidebar ("Nascondi filtri" / "Mostra filtri") ──
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const layout = document.getElementById('shopLayout');
  if (toggleBtn && layout) {
    toggleBtn.addEventListener('click', () => {
      const hidden = layout.classList.toggle('sidebar-hidden');
      toggleBtn.innerHTML = hidden
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg> Mostra filtri`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg> Nascondi filtri`;
    });
  }

  // ── Sort menu ──
  const sortWrap = document.querySelector('.shop-sort-wrap');
  const sortBtn = document.getElementById('shopSortBtn');
  if (sortBtn && sortWrap) {
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortWrap.classList.toggle('open');
    });
    document.addEventListener('click', () => sortWrap.classList.remove('open'));
    document.querySelectorAll('.shop-sort-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.shop-sort-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentSort = item.dataset.sort || 'default';
        sortWrap.classList.remove('open');
        renderProducts(currentFilter, currentTeam);
      });
    });
  }
}

function closeAllDropdowns() {
  // (kept for compatibility)
}

function setActiveFilter(filter, team, updateActiveBtn = true) {
  currentFilter = filter;
  currentTeam = team || null;
  if (updateActiveBtn) {
    // Resetta tutti i flat-btn e nested-btn
    document.querySelectorAll('.sidebar-flat-btn, .sidebar-nested-btn').forEach(b => {
      if (b.id !== 'calcioToggleBtn' && b.id !== 'accessoriToggleBtn') {
        b.classList.remove('active');
      }
    });
    if (filter === 'new') document.getElementById('filterNew')?.classList.add('active');
    else if (filter === 'vintage') document.getElementById('filterVintage')?.classList.add('active');
    else if (filter === 'Champions') document.getElementById('filterChampions')?.classList.add('active');
    else if (filter === 'SerieA') document.getElementById('megaBtnSerieA')?.classList.add('active');
    else if (filter === 'LaLiga') document.getElementById('megaBtnLaLiga')?.classList.add('active');
    else if (filter === 'Premier') document.getElementById('megaBtnPremier')?.classList.add('active');
    else if (filter === 'Bundesliga') document.getElementById('megaBtnBundesliga')?.classList.add('active');
    else if (filter === 'SaudiLeague') document.getElementById('megaBtnSaudi')?.classList.add('active');
    else if (filter === 'Nazionali') document.getElementById('megaBtnNazionali')?.classList.add('active');
    else if (filter === 'Mondiale2026') document.getElementById('megaBtnMondiale2026')?.classList.add('active');
    // Accessori sub-items sono già gestiti direttamente
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
  currentCustomization = null;
  const content = document.getElementById('quickViewContent');
  const catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : p.categoryLabel;
  const kitType = p.kitType || 'solo';
  const isSoloAllowed = kitType !== 'unico';
  const isFav = isFavorite(p.id);
  content.innerHTML = `
    <div class="qv-grid">
      <div class="qv-img-wrap">
        <img src="${p.image}" alt="${p.name}" class="qv-img"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22480%22><rect fill=%22%230f1525%22 width=%22400%22 height=%22480%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2270%22>&#x26BD;</text></svg>'">
        ${p.badge ? `<span class="card-badge ${p.badge} qv-badge">${p.badgeLabel}</span>` : ''}
      </div>
      <div class="qv-details">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.2rem;">
          <div class="qv-category">${catLabel}</div>
          <button class="card-fav-btn${isFav ? ' active' : ''}" id="qvFavBtn" onclick="toggleFavoriteFromQV(${p.id})" title="${isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}" style="position:static;box-shadow:none;background:transparent;border:1.5px solid rgba(0,0,0,.12);width:34px;height:34px;flex-shrink:0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? '#e44545' : 'none'}" stroke="${isFav ? '#e44545' : '#aaa'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="qv-name">${p.name}</div>
        <div class="qv-desc">${p.description}</div>

        <div class="qv-price-wrap">
          <span class="qv-price" id="qvPriceDisplay" data-base="${p.price}">&#x20AC;${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="qv-price-old">&#x20AC;${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>

        <!-- Taglia -->
        <div class="qv-section-label">Taglia</div>
        <div class="qv-sizes">
          ${p.sizes.map((s, i) => `<button class="qv-size-btn${i === 0 ? ' active' : ''}" onclick="selectQvSize(this)">${s}</button>`).join('')}
        </div>

        <!-- Tipo Maglia -->
        <div class="qv-section-label">Tipo Maglia</div>
        <div class="qv-fabric-row">
          <button class="qv-option-btn active" data-extra="0" onclick="selectQvFabric(this)">
            <span class="qv-opt-icon">&#x1F455;</span>
            <span class="qv-opt-text"><strong>Standard</strong><small>Tifoso</small></span>
          </button>
          <button class="qv-option-btn" data-extra="4" onclick="selectQvFabric(this)">
            <span class="qv-opt-icon">&#x26A1;</span>
            <span class="qv-opt-text"><strong>Player</strong><small>+&#x20AC;3,00</small></span>
          </button>
        </div>

        <!-- Composizione -->
        <div class="qv-section-label">Composizione</div>
        <div class="qv-kit-row">
          ${isSoloAllowed ? `<button class="qv-option-btn active" data-kit="solo" data-extra="0" onclick="selectQvKit(this)">
            <span class="qv-opt-icon">&#x1F455;</span>
            <span class="qv-opt-text"><strong>Solo Maglia</strong><small>Inclusa nel prezzo</small></span>
          </button>` : ''}
          <button class="qv-option-btn${!isSoloAllowed ? ' active' : ''}" data-kit="shorts" data-extra="6" onclick="selectQvKit(this)">
            <span class="qv-opt-icon">&#x26BD;</span>
            <span class="qv-opt-text"><strong>Maglia + Pantaloncino</strong><small>+&#x20AC;6,00</small></span>
          </button>
          <button class="qv-option-btn" data-kit="full" data-extra="10" onclick="selectQvKit(this)">
            <span class="qv-opt-icon">&#x1F3C6;</span>
            <span class="qv-opt-text"><strong>Kit Completo</strong><small>Maglia+Pant+Calzettoni +&#x20AC;10,00</small></span>
          </button>
        </div>

        <!-- Badge personalizzazione applicata -->
        <div id="qvCustomizeBadge" style="display:none;margin-top:.5rem;">
          <span class="customize-applied-badge">&#x270F;&#xFE0F; Personalizzazione applicata</span>
        </div>

        <button class="btn btn-primary btn-full qv-add-btn" onclick="addToCartFromQV(${p.id}); closeQuickView();">
          &#x1F6D2; Aggiungi al Carrello
        </button>

        <!-- Pulsante Personalizza (sempre visibile) -->
        <button class="qv-customize-btn" id="qvCustomizeBtn" onclick="openCustomizeModal(${p.id})" style="display:flex;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          &#x270F;&#xFE0F; Personalizza (Nome &amp; Numero)
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
  btn.closest('.qv-fabric-row').querySelectorAll('.qv-option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateQvPrice();
}

function selectQvKit(btn) {
  btn.closest('.qv-kit-row').querySelectorAll('.qv-option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateQvPrice();
  // Il pulsante Personalizza è sempre visibile per qualsiasi kit
  const kit = btn.dataset.kit || 'solo';
  const customizeBtn = document.getElementById('qvCustomizeBtn');
  if (customizeBtn) customizeBtn.style.display = 'flex';
  // Se si cambia kit, resetta la personalizzazione precedente per non creare confusione
  currentCustomization = null;
  const badge = document.getElementById('qvCustomizeBadge');
  if (badge) badge.style.display = 'none';
  // Placeholder: mantiene compatibilità con il resto del codice
  if (false) {
  }
}

function updateQvPrice() {
  const priceEl = document.getElementById('qvPriceDisplay');
  if (!priceEl) return;
  const base = parseFloat(priceEl.dataset.base || 0);
  const fabricBtn = document.querySelector('.qv-fabric-row .qv-option-btn.active');
  const kitBtn = document.querySelector('.qv-kit-row .qv-option-btn.active');
  const fabricExtra = fabricBtn ? parseFloat(fabricBtn.dataset.extra || 0) : 0;
  const kitExtra = kitBtn ? parseFloat(kitBtn.dataset.extra || 0) : 0;
  priceEl.textContent = `€${(base + fabricExtra + kitExtra).toFixed(2)}`;
}

function addToCartFromQV(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const activeSize = document.querySelector('.qv-sizes .qv-size-btn.active');
  const activeFabric = document.querySelector('.qv-fabric-row .qv-option-btn.active');
  const activeKit = document.querySelector('.qv-kit-row .qv-option-btn.active');

  const selectedSize = activeSize ? activeSize.textContent.trim() : (p.sizes[0] || 'M');
  const fabricText = activeFabric ? activeFabric.querySelector('strong').textContent.trim() : 'Standard';
  const fabricLabel = '\uD83D\uDC55 ' + fabricText;
  const fabricExtra = activeFabric ? parseFloat(activeFabric.dataset.extra || 0) : 0;
  const kitMode = activeKit ? activeKit.dataset.kit : 'solo';
  const isWithShorts = kitMode === 'shorts' || kitMode === 'full';
  const isFullKit = kitMode === 'full';
  const finalPrice = p.price + fabricExtra;

  // Testo personalizzazione maglia
  let custNote = '';
  if (currentCustomization && (currentCustomization.name || currentCustomization.number)) {
    const parts = [];
    if (currentCustomization.name) parts.push('Nome: ' + currentCustomization.name);
    if (currentCustomization.number) parts.push('N.' + currentCustomization.number);
    custNote = parts.join(' | ');
  }

  // Aggiungi maglia
  const existing = cart.find(item =>
    item.id === productId && item.size === selectedSize && item.fabric === fabricLabel && item.custNote === custNote
  );
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: p.id, name: p.name, price: finalPrice, image: p.image, qty: 1, size: selectedSize, fabric: fabricLabel, custNote: custNote, _uid: Date.now() + '-' + Math.random().toString(36).slice(2) });
  }

  // Aggiungi pantaloncino (Maglia+Pantaloncino oppure Kit Completo)
  if (isWithShorts) {
    // Se la maglia ha un prodotto pantaloncino reale collegato, usa nome e immagine da quel prodotto
    // ma il PREZZO è sempre quello del kit (6€), non il prezzo standalone del prodotto
    const shortsProduct = p.shortsProductId ? PRODUCTS.find(x => x.id === p.shortsProductId) : null;
    const shortsName = shortsProduct
      ? shortsProduct.name
      : 'Pantaloncini \u2013 ' + p.name.replace(/Maglia\s*/i, '').trim();
    const shortsKitPrice = 6; // prezzo scontato in kit (standalone = 10, in kit = 6)
    const shortsPrice = shortsKitPrice + fabricExtra;
    const shortsImage = shortsProduct ? shortsProduct.image : (p.shortsImage || p.image);
    const shortsWithNumber = currentCustomization && currentCustomization.shortsNumber;
    const shortsCustNote = (shortsWithNumber && currentCustomization.number)
      ? 'N.' + currentCustomization.number + ' sul pantaloncino'
      : '';
    cart.push({ id: 'shorts-' + p.id, name: shortsName, price: shortsPrice, image: shortsImage, qty: 1, size: selectedSize, fabric: fabricLabel, custNote: shortsCustNote, _uid: Date.now() + '-s-' + Math.random().toString(36).slice(2) });
  }

  // Aggiungi calzettoni (solo Kit Completo)
  if (isFullKit) {
    const sockSize = (currentCustomization && currentCustomization.sockSize) || '';
    // Se la maglia ha un prodotto calzettoni reale collegato, usalo
    const socksProduct = p.socksProductId ? PRODUCTS.find(x => x.id === p.socksProductId) : null;
    const socksName = socksProduct
      ? socksProduct.name
      : 'Calzettoni \u2013 ' + p.name.replace(/Maglia\s*/i, '').trim();
    const socksPrice = socksProduct ? socksProduct.price : 4; // kit completo: 6 (pant) + 4 (calzettoni) = 10 extra
    const socksImage = socksProduct ? socksProduct.image : (p.socksImage || p.shortsImage || p.image);
    const socksCustNote = sockSize ? 'Taglia scarpa: ' + sockSize : '';
    cart.push({ id: 'socks-' + p.id, name: socksName, price: socksPrice, image: socksImage, qty: 1, size: sockSize || selectedSize, fabric: fabricLabel, custNote: socksCustNote, _uid: Date.now() + '-k-' + Math.random().toString(36).slice(2) });
  }

  saveCart();
  updateCartUI();
  const custSuffix = custNote ? ' + personalizzazione' : '';
  const msg = isFullKit
    ? 'Kit Completo (' + selectedSize + ' \u00B7 ' + fabricText + ')' + custSuffix + ' aggiunto!'
    : isWithShorts
      ? 'Maglia + Pantaloncino (' + selectedSize + ' \u00B7 ' + fabricText + ')' + custSuffix + ' aggiunto!'
      : '"' + p.name + '" (' + selectedSize + ' \u00B7 ' + fabricText + ')' + custSuffix + ' aggiunto!';
  showToast('\u2705', msg);
  openCart();
  currentCustomization = null;
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
      + '<div class="cart-item-meta">Taglia: ' + item.size + (item.fabric ? ' &nbsp;&middot;&nbsp; ' + item.fabric : '') + (item.custNote ? '<br><span style="color:#2e7d32;font-size:.72rem;">\u270F\uFE0F ' + item.custNote + '</span>' : '') + '</div>'
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
    openCart();

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

// ═══════════════════════════════════════════════
// NAVBAR DROPDOWN CAMPIONATI
// ═══════════════════════════════════════════════
function setupNavCampionati() {
  const wrap = document.getElementById('navCampionatiWrap');
  const btn = document.getElementById('navCampionatiBtn');
  const menu = document.getElementById('navCampionatiMenu');
  if (!wrap || !btn || !menu) return;

  // Apri/chiudi al click sul bottone
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrap.classList.contains('open');
    closeNavDropdown();
    if (!isOpen) {
      wrap.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Click su una voce: filtra e scrolla ai prodotti
  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-dd-item');
    if (!item) return;
    e.stopPropagation();
    const league = item.dataset.league;
    closeNavDropdown();
    // Applica il filtro
    setActiveFilter(league, null);
    // Scrolla alla sezione prodotti
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Chiudi cliccando fuori
  document.addEventListener('click', closeNavDropdown);
}

function closeNavDropdown() {
  const wrap = document.getElementById('navCampionatiWrap');
  const btn = document.getElementById('navCampionatiBtn');
  wrap?.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
}

// ═══════════════════════════════════════════════
// FEATURED HOME — Category cards + Prodotti in evidenza
// ═══════════════════════════════════════════════
function setupFeatured() {
  // ── 1. Category cards: click → filtra e scrolla ──
  document.querySelectorAll('.feat-league-card').forEach(card => {
    card.addEventListener('click', () => {
      const league = card.dataset.league;
      setActiveFilter(league, null);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── 2. Ultimi Arrivi: prodotti con badge "new" (max 4) ──
  const newRow = document.getElementById('featNewRow');
  if (newRow) {
    const newProducts = PRODUCTS.filter(p => p.badge === 'new').slice(0, 4);
    newRow.innerHTML = newProducts.length
      ? newProducts.map(p => featProductCardHTML(p)).join('')
      : '<p style="color:var(--text-muted);grid-column:1/-1">Nessuna novità al momento.</p>';
  }

  // ── 3. Più Richiesti: prime 4 maglie Serie A + La Liga con prezzi bassi ──
  const topRow = document.getElementById('featTopRow');
  if (topRow) {
    // Seleziona 4 prodotti: i primi disponibili da categorie principali
    const topCats = ['SerieA', 'LaLiga', 'Bundesliga', 'Premier'];
    const topProducts = [];
    topCats.forEach(cat => {
      const found = PRODUCTS.find(p => {
        const cats = Array.isArray(p.category) ? p.category : [p.category];
        return cats.includes(cat) && !topProducts.includes(p);
      });
      if (found) topProducts.push(found);
    });
    topRow.innerHTML = topProducts.length
      ? topProducts.map(p => featProductCardHTML(p)).join('')
      : '<p style="color:var(--text-muted);grid-column:1/-1">Nessun prodotto disponibile.</p>';
  }

  // ── 4. Pulsanti "Vedi tutti" ──
  document.getElementById('featSeeAllNew')?.addEventListener('click', () => {
    setActiveFilter('all', null);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('featSeeAllTop')?.addEventListener('click', () => {
    setActiveFilter('all', null);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// HTML di una mini product card per le featured rows
function featProductCardHTML(p) {
  const label = Array.isArray(p.categoryLabel)
    ? p.categoryLabel[0]
    : (p.categoryLabel || '');
  const badgeHTML = p.badge
    ? `<span class="feat-product-badge ${p.badge}">${p.badgeLabel}</span>`
    : '';
  return `
    <div class="feat-product-card" onclick="openQuickView(${p.id})" title="${p.name}">
      ${badgeHTML}
      <img class="feat-product-img"
           src="${p.image}" alt="${p.name}" loading="lazy"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22180%22><rect fill=%22%230f1525%22 width=%22300%22 height=%22180%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2240%22>⚽</text></svg>'">
      <div class="feat-product-body">
        <div class="feat-product-league">${label}</div>
        <div class="feat-product-name">${p.name}</div>
        <div class="feat-product-price">€${p.price.toFixed(2)}</div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════
// PREFERITI — Sidebar laterale + badge navbar
// ═══════════════════════════════════════════════

function saveFavorites() {
  localStorage.setItem('gk_favorites', JSON.stringify(favorites));
}

function isFavorite(productId) {
  return favorites.includes(productId);
}

function updateFavBadge() {
  const badge = document.getElementById('favBadge');
  const btn = document.getElementById('favBtn');
  const count = favorites.length;
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }
  if (btn) {
    btn.classList.toggle('has-items', count > 0);
  }
}

function openFavSidebar() {
  document.getElementById('favOverlay')?.classList.add('open');
  document.getElementById('favSidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderFavoritesSidebar();
}

function closeFavSidebar() {
  document.getElementById('favOverlay')?.classList.remove('open');
  document.getElementById('favSidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleFavorite(productId, btnEl) {
  const idx = favorites.indexOf(productId);
  if (idx === -1) {
    favorites.push(productId);
    showToast('❤️', 'Aggiunto ai preferiti!');
  } else {
    favorites.splice(idx, 1);
    showToast('🤍', 'Rimosso dai preferiti.');
  }
  saveFavorites();
  updateFavBadge();
  // Aggiorna icona cuore sulla card cliccata
  if (btnEl) {
    const isFav = isFavorite(productId);
    btnEl.classList.toggle('active', isFav);
    const svg = btnEl.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? '#e44545' : 'none');
      svg.setAttribute('stroke', isFav ? '#e44545' : '#999');
    }
  }
  // Se la sidebar è aperta, aggiorna anche quella
  if (document.getElementById('favSidebar')?.classList.contains('open')) {
    renderFavoritesSidebar();
  }
}

function toggleFavoriteFromQV(productId) {
  const idx = favorites.indexOf(productId);
  if (idx === -1) {
    favorites.push(productId);
    showToast('❤️', 'Aggiunto ai preferiti!');
  } else {
    favorites.splice(idx, 1);
    showToast('🤍', 'Rimosso dai preferiti.');
  }
  saveFavorites();
  updateFavBadge();
  // Aggiorna il bottone nel quick view
  const btn = document.getElementById('qvFavBtn');
  if (btn) {
    const isFav = isFavorite(productId);
    btn.classList.toggle('active', isFav);
    btn.title = isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti';
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? '#e44545' : 'none');
      svg.setAttribute('stroke', isFav ? '#e44545' : '#aaa');
    }
  }
  // Aggiorna anche le card nella griglia prodotti
  document.querySelectorAll('[data-pid="' + productId + '"]').forEach(cardBtn => {
    const isFav = isFavorite(productId);
    cardBtn.classList.toggle('active', isFav);
    const svg = cardBtn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? '#e44545' : 'none');
      svg.setAttribute('stroke', isFav ? '#e44545' : '#999');
    }
  });
}

function renderFavoritesSidebar() {
  const container = document.getElementById('favItems');
  const footer = document.getElementById('favFooter');
  const empty = document.getElementById('favEmpty');
  if (!container) return;

  const favProducts = favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (favProducts.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    // Rimuovi vecchi item
    container.querySelectorAll('.fav-item').forEach(el => el.remove());
    return;
  }

  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';

  // Ricostruisci lista
  container.querySelectorAll('.fav-item').forEach(el => el.remove());

  favProducts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'fav-item';
    div.innerHTML =
      '<img class="fav-item-img" src="' + p.image + '" alt="' + p.name + '" onclick="closeFavSidebar();openQuickView(' + p.id + ')" ' +
      'onerror="this.style.display=\'none\'">' +
      '<div class="fav-item-info">' +
      '<div class="fav-item-name" onclick="closeFavSidebar();openQuickView(' + p.id + ')">' + p.name + '</div>' +
      '<div class="fav-item-price">&#x20AC;' + p.price.toFixed(2) + '</div>' +
      '<div class="fav-item-actions">' +
      '<button class="fav-item-add" onclick="closeFavSidebar();openQuickView(' + p.id + ')">Vedi prodotto</button>' +
      '<button class="fav-item-remove" onclick="removeFavoriteFromSidebar(' + p.id + ')" title="Rimuovi dai preferiti">&#x2665;</button>' +
      '</div>' +
      '</div>';
    container.insertBefore(div, empty ? empty.nextSibling : null);
    container.appendChild(div);
  });
}

function removeFavoriteFromSidebar(productId) {
  const idx = favorites.indexOf(productId);
  if (idx !== -1) favorites.splice(idx, 1);
  saveFavorites();
  updateFavBadge();
  // Aggiorna cuore sulla card prodotto
  document.querySelectorAll('[data-pid="' + productId + '"]').forEach(btn => {
    btn.classList.remove('active');
    const svg = btn.querySelector('svg');
    if (svg) { svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', '#999'); }
  });
  renderFavoritesSidebar();
}

function setupFavorites() {
  // Badge iniziale
  updateFavBadge();

  // Apri sidebar al click sul cuore navbar
  document.getElementById('favBtn')?.addEventListener('click', openFavSidebar);

  // Chiudi sidebar
  document.getElementById('favClose')?.addEventListener('click', closeFavSidebar);
  document.getElementById('favOverlay')?.addEventListener('click', closeFavSidebar);

  // Vai ai prodotti
  document.getElementById('goShopFromFavBtn')?.addEventListener('click', closeFavSidebar);

  // Svuota preferiti
  document.getElementById('favClearBtn')?.addEventListener('click', () => {
    favorites = [];
    saveFavorites();
    updateFavBadge();
    // Aggiorna tutti i cuori nelle card
    document.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.classList.remove('active');
      const svg = btn.querySelector('svg');
      if (svg) { svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', '#999'); }
    });
    renderFavoritesSidebar();
    showToast('🤍', 'Preferiti svuotati.');
  });

  // Aggiungi tutti al carrello
  document.getElementById('favAddAllBtn')?.addEventListener('click', () => {
    const favProducts = favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    favProducts.forEach(p => {
      const existing = cart.find(i => i.id === p.id && !i.custNote);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1, size: p.sizes[0] || 'M', fabric: '\uD83D\uDC55 Standard', custNote: '', _uid: Date.now() + '-' + Math.random().toString(36).slice(2) });
      }
    });
    saveCart();
    updateCartUI();
    closeFavSidebar();
    showToast('✅', favProducts.length + ' prodotti aggiunti al carrello!');
    openCart();
  });
}

// ═══════════════════════════════════════════════
// MODALE PERSONALIZZAZIONE MAGLIA
// ═══════════════════════════════════════════════

let _customizeProductId = null;
let _customizeKitType = 'shorts'; // kit attivo quando si apre il modal

function openCustomizeModal(productId) {
  _customizeProductId = productId;

  // Determina il tipo di kit selezionato nel quick view
  const activeKitBtn = document.querySelector('.qv-kit-row .qv-option-btn.active');
  _customizeKitType = activeKitBtn ? (activeKitBtn.dataset.kit || 'solo') : 'solo';

  const overlay = document.getElementById('customizeOverlay');
  if (!overlay) return;

  // Mostra/nascondi sezioni in base al tipo di kit
  // Solo Maglia → solo nome/numero, niente shorts checkbox né calzettoni
  // Maglia+Pantaloncino → nome/numero + checkbox pantaloncino
  // Kit Completo → tutto
  const shortsGroup = document.getElementById('custShortsNumberGroup');
  const sockGroup = document.getElementById('custSockGroup');
  if (shortsGroup) shortsGroup.style.display = (_customizeKitType === 'shorts' || _customizeKitType === 'full') ? 'block' : 'none';
  if (sockGroup) sockGroup.style.display = _customizeKitType === 'full' ? 'block' : 'none';

  // Precompila con personalizzazione esistente
  const custName = document.getElementById('custName');
  const custNumber = document.getElementById('custNumber');
  const custShortsNumber = document.getElementById('custShortsNumber');
  const custSockSize = document.getElementById('custSockSize');
  if (currentCustomization) {
    if (custName) custName.value = currentCustomization.name || '';
    if (custNumber) custNumber.value = currentCustomization.number || '';
    if (custShortsNumber) custShortsNumber.checked = !!currentCustomization.shortsNumber;
    if (custSockSize) custSockSize.value = currentCustomization.sockSize || '';
  } else {
    if (custName) custName.value = '';
    if (custNumber) custNumber.value = '';
    if (custShortsNumber) custShortsNumber.checked = false;
    if (custSockSize) custSockSize.value = '';
  }
  updateCustomizePreview();

  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeCustomizeModal() {
  const overlay = document.getElementById('customizeOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 320);
}

function updateCustomizePreview() {
  const name = (document.getElementById('custName')?.value || '').trim().toUpperCase() || 'IL TUO NOME';
  const number = (document.getElementById('custNumber')?.value || '').trim() || '10';
  const prevName = document.getElementById('prevName');
  const prevNumber = document.getElementById('prevNumber');
  if (prevName) prevName.textContent = name;
  if (prevNumber) prevNumber.textContent = number;
}

function setupCustomizeModal() {
  const overlay = document.getElementById('customizeOverlay');
  const closeBtn = document.getElementById('customizeClose');
  const confirmBtn = document.getElementById('customizeConfirmBtn');
  const custName = document.getElementById('custName');
  const custNumber = document.getElementById('custNumber');

  if (!overlay) return;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCustomizeModal();
  });
  closeBtn?.addEventListener('click', closeCustomizeModal);
  custName?.addEventListener('input', updateCustomizePreview);
  custNumber?.addEventListener('input', updateCustomizePreview);

  confirmBtn?.addEventListener('click', () => {
    const name = (custName?.value || '').trim();
    const number = (custNumber?.value || '').trim();
    const shortsNumber = document.getElementById('custShortsNumber')?.checked || false;
    const sockSize = document.getElementById('custSockSize')?.value || '';

    if (!name && !number) {
      showToast('\u26A0\uFE0F', 'Inserisci almeno il nome o il numero!');
      return;
    }
    if (number && (parseInt(number) < 1 || parseInt(number) > 99)) {
      showToast('\u26A0\uFE0F', 'Il numero deve essere tra 1 e 99.');
      return;
    }
    if (_customizeKitType === 'full' && !sockSize) {
      showToast('\u26A0\uFE0F', 'Seleziona la taglia dei calzettoni!');
      return;
    }

    currentCustomization = { name, number, shortsNumber, sockSize };

    const badge = document.getElementById('qvCustomizeBadge');
    if (badge) badge.style.display = 'block';

    const parts = [];
    if (name) parts.push(name);
    if (number) parts.push('#' + number);
    if (shortsNumber) parts.push('N. pantaloncino');
    if (sockSize) parts.push('Calzettoni ' + sockSize);
    showToast('\u270F\uFE0F', 'Personalizzazione: ' + parts.join(' | '));
    closeCustomizeModal();
  });
}
