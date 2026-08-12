/**
 * Sistema de búsqueda de artículos
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => initSearchInput(input));
}

function initSearchInput(input) {
  const wrapper = input.closest('.search-wrapper') || input.parentElement;
  let resultsContainer = wrapper.querySelector('.search-results');

  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.setAttribute('role', 'listbox');
    resultsContainer.setAttribute('aria-label', 'Resultados de búsqueda');
    wrapper.appendChild(resultsContainer);
  }

  let debounceTimer;
  let activeIndex = -1;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => handleSearch(input, resultsContainer), 200);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) handleSearch(input, resultsContainer);
  });

  input.addEventListener('keydown', e => {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      updateActiveItem(items, activeIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActiveItem(items, activeIndex);
    } else if (e.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
      e.preventDefault();
      items[activeIndex].click();
    } else if (e.key === 'Escape') {
      closeResults(resultsContainer);
      input.blur();
    }
  });

  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target)) {
      closeResults(resultsContainer);
    }
  });
}

function handleSearch(input, resultsContainer) {
  const query = input.value.trim();
  activeIndex = -1;

  if (query.length < 2) {
    closeResults(resultsContainer);
    return;
  }

  const results = searchArticles(query);
  renderSearchResults(results, resultsContainer, query, input);
}

function renderSearchResults(results, container, query, input) {
  const isArticlesPage = window.location.pathname.includes('articles.html');
  const basePath = isArticlesPage ? '' : (window.location.pathname.includes('/articles/') ? '../' : '');

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-no-results" role="option">
        No encontramos artículos relacionados con tu búsqueda.
      </div>
    `;
    container.classList.add('open');
    return;
  }

  container.innerHTML = results.slice(0, 6).map(article => `
    <a href="${basePath}${article.url}" class="search-result-item" role="option">
      <div class="search-result-image">
        <img src="${basePath}${article.image}" alt="" loading="lazy">
      </div>
      <div class="search-result-info">
        <span class="category-tag category-tag--small">${article.category}</span>
        <span class="search-result-title">${highlightMatch(article.title, query)}</span>
      </div>
    </a>
  `).join('');

  if (results.length > 6) {
    container.innerHTML += `
      <a href="${basePath}articles.html?q=${encodeURIComponent(query)}" class="search-see-all">
        Ver todos los resultados (${results.length})
      </a>
    `;
  }

  container.classList.add('open');
}

function highlightMatch(text, query) {
    return text;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateActiveItem(items, index) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

function closeResults(container) {
  container.classList.remove('open');
  container.innerHTML = '';
}

/** Búsqueda en página de artículos con parámetro URL */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (!query || !document.getElementById('articles-grid')) return;

  const searchInput = document.querySelector('.search-input');
  if (searchInput) searchInput.value = query;

  const results = searchArticles(query);
  const grid = document.getElementById('articles-grid');

  if (results.length === 0) {
    grid.innerHTML = '<p class="no-results">No encontramos artículos relacionados con tu búsqueda.</p>';
    return;
  }

  grid.innerHTML = results.map((article, i) => `
    <article class="article-card article-card--grid reveal visible" style="--delay: ${i * 0.04}s">
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
});
