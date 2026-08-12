/**
 * Funciones principales del sitio
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteConfig();
  initHeader();
  initMobileMenu();
  initHeroCanvas();
  initHomePage();
  initArticlesPage();
  initArticlePage();
  initScrollAnimations();
  initFooter();
});

/** Aplica configuración global del sitio */
function initSiteConfig() {
  document.querySelectorAll('[data-site-name]').forEach(el => {
    el.textContent = SITE_CONFIG.SITE_NAME;
  });
  document.querySelectorAll('[data-site-description]').forEach(el => {
    el.textContent = SITE_CONFIG.SITE_DESCRIPTION;
  });
  document.querySelectorAll('[data-site-email]').forEach(el => {
    el.textContent = SITE_CONFIG.EMAIL;
    if (el.tagName === 'A') el.href = 'mailto:' + SITE_CONFIG.EMAIL;
  });
}

/** Header con efecto blur al scroll */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/** Menú móvil hamburguesa */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.nav-overlay');
  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    overlay?.classList.add('open');
    document.body.classList.add('menu-open');
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/** Canvas de partículas para el hero */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = canvas.offsetHeight + 'px';
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(canvas.offsetWidth / 15));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.offsetWidth;
      if (p.x > canvas.offsetWidth) p.x = 0;
      if (p.y < 0) p.y = canvas.offsetHeight;
      if (p.y > canvas.offsetHeight) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(17, 17, 17, ${p.opacity})`;
      ctx.fill();

      particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(17, 17, 17, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    animationId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    resize();
    createParticles();
    draw();
  });
}

/** Animaciones al hacer scroll */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/** Inicializa la página principal */
function initHomePage() {
  const featuredContainer = document.getElementById('featured-article');
  const categoriesContainer = document.getElementById('categories-grid');
  const recentContainer = document.getElementById('recent-articles');

  if (featuredContainer) renderFeaturedArticle(featuredContainer);
  if (categoriesContainer) renderCategories(categoriesContainer);
  if (recentContainer) renderRecentArticles(recentContainer);
}

/** Renderiza artículo destacado */
function renderFeaturedArticle(container) {
  const article = getFeaturedArticle();
  if (!article) return;

  container.innerHTML = `
    <article class="featured-article reveal">
      <div class="featured-image">
        <img src="${article.image}" alt="${article.title}" loading="eager">
        <div class="featured-image-overlay"></div>
      </div>
      <div class="featured-content">
        <span class="category-tag">${article.category}</span>
        <h2 class="featured-title">${article.title}</h2>
        <p class="featured-description">${article.description}</p>
        <div class="featured-meta">
          <span>${formatDate(article.date)}</span>
          <span class="meta-divider">·</span>
          <span>${article.readingTime} de lectura</span>
        </div>
        <a href="${article.url}" class="btn btn-primary">Leer artículo</a>
      </div>
    </article>
  `;
}

/** Renderiza grid de categorías */
function renderCategories(container) {
  const html = SITE_CONFIG.CATEGORIES.map((cat, i) => {
    const count = getArticleCountByCategory(cat.id);
    return `
      <a href="articles.html?category=${cat.id}" class="category-card reveal" style="--delay: ${i * 0.08}s" data-category="${cat.id}">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-info">
          <h3 class="category-name">${cat.name}</h3>
          <p class="category-desc">${cat.description}</p>
          <span class="category-count">${count} artículo${count !== 1 ? 's' : ''}</span>
        </div>
        <div class="category-arrow" aria-hidden="true">→</div>
      </a>
    `;
  }).join('');

  container.innerHTML = html;
}

/** Renderiza artículos recientes con layout editorial */
function renderRecentArticles(container) {
  const recent = getRecentArticles(6);
  if (recent.length === 0) return;

  const layouts = ['small', 'small', 'small', 'small', 'small', 'small'];

  container.innerHTML = recent.map((article, i) => `
    <article class="article-card article-card--${layouts[i]} reveal" style="--delay: ${i * 0.06}s">
      <a href="${article.url}" class="article-card-link">
        <div class="article-card-image">
          <img src="${article.image}" alt="" loading="lazy">
        </div>
        <div class="article-card-body">
          <span class="category-tag category-tag--small">${article.category}</span>
          <h3 class="article-card-title">${article.title}</h3>
          ${layouts[i] !== 'small' ? `<p class="article-card-desc">${article.description}</p>` : ''}
          <div class="article-card-meta">
            <time datetime="${article.date}">${formatDate(article.date)}</time>
            <span class="meta-divider">·</span>
            <span>${article.readingTime}</span>
          </div>
        </div>
      </a>
    </article>
  `).join('');
}

/** Inicializa página de artículos */
function initArticlesPage() {
  const grid = document.getElementById('articles-grid');
  const filters = document.querySelector('.filter-bar');
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let currentCategory = params.get('category') || 'todos';

  function renderFilteredArticles(category) {
    const filtered = getArticlesByCategory(category);
    if (filtered.length === 0) {
      grid.innerHTML = '<p class="no-results">No hay artículos en esta categoría.</p>';
      return;
    }

    grid.innerHTML = filtered.map((article, i) => `
      <article class="article-card article-card--grid reveal" style="--delay: ${i * 0.04}s" data-category="${article.categoryId}">
        <a href="${article.url}" class="article-card-link">
          <div class="article-card-image">
            <img src="${article.image}" alt="" loading="lazy">
          </div>
          <div class="article-card-body">
            <span class="category-tag category-tag--small">${article.category}</span>
            <h3 class="article-card-title">${article.title}</h3>
            <p class="article-card-desc">${article.description}</p>
            <div class="article-card-meta">
              <time datetime="${article.date}">${formatDate(article.date)}</time>
              <span class="meta-divider">·</span>
              <span>${article.readingTime}</span>
            </div>
          </div>
        </a>
      </article>
    `).join('');

    document.querySelectorAll('#articles-grid .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

  if (filters) {
    filters.querySelectorAll('.filter-btn').forEach(btn => {
      const cat = btn.dataset.category;
      if (cat === currentCategory) btn.classList.add('active');

      btn.addEventListener('click', () => {
        filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = cat;
        renderFilteredArticles(cat);
        history.replaceState(null, '', cat === 'todos' ? 'articles.html' : `articles.html?category=${cat}`);
      });
    });
  }

  renderFilteredArticles(currentCategory);
}

/** Inicializa página de artículo individual */
function initArticlePage() {
  const relatedContainer = document.getElementById('related-articles');
  if (!relatedContainer) return;

  const articleId = relatedContainer.dataset.articleId;
  if (!articleId) return;

  const related = getRelatedArticles(articleId, 3);
  if (related.length === 0) return;

  relatedContainer.innerHTML = related.map(article => `
    <article class="article-card article-card--related">
      <a href="${getRelativeUrl(article.url)}" class="article-card-link">
        <div class="article-card-image">
          <img src="${getRelativeUrl(article.image)}" alt="" loading="lazy">
        </div>
        <div class="article-card-body">
          <span class="category-tag category-tag--small">${article.category}</span>
          <h3 class="article-card-title">${article.title}</h3>
          <div class="article-card-meta">
            <span>${article.readingTime}</span>
          </div>
        </div>
      </a>
    </article>
  `).join('');
}

/** URL relativa desde subcarpeta articles/ */
function getRelativeUrl(path) {
  const inArticles = window.location.pathname.includes('/articles/');
  if (inArticles && !path.startsWith('http') && !path.startsWith('../')) {
    return '../' + path;
  }
  return path;
}

/** Renderiza footer dinámico */
function initFooter() {
  const categoriesList = document.getElementById('footer-categories');
  if (!categoriesList) return;

  categoriesList.innerHTML = SITE_CONFIG.CATEGORIES.map(cat =>
    `<li><a href="${getRelativeUrl('articles.html')}?category=${cat.id}">${cat.name}</a></li>`
  ).join('');
}

/** Utilidad: crear tarjeta de artículo reutilizable */
function createArticleCard(article, layout = 'grid') {
  return `
    <article class="article-card article-card--${layout}">
      <a href="${article.url}" class="article-card-link">
        <div class="article-card-image">
          <img src="${article.image}" alt="" loading="lazy">
        </div>
        <div class="article-card-body">
          <span class="category-tag category-tag--small">${article.category}</span>
          <h3 class="article-card-title">${article.title}</h3>
          <p class="article-card-desc">${article.description}</p>
          <div class="article-card-meta">
            <time datetime="${article.date}">${formatDate(article.date)}</time>
            <span class="meta-divider">·</span>
            <span>${article.readingTime}</span>
          </div>
        </div>
      </a>
    </article>
  `;
}
