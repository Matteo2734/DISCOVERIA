/**
 * Base de datos de artículos
 * Para agregar un artículo: añade un objeto aquí y crea su HTML en articles/
 */
const articles = [
  {
    id: 'agujeros-negros',
    title: '¿Qué ocurre dentro de un agujero negro?',
    category: 'Astronomía',
    categoryId: 'astronomia',
    date: '2026-08-04',
    readingTime: '8 min',
    description: 'Exploramos qué sucede más allá del horizonte de eventos y por qué la física actual llega a sus límites.',
    image: 'images/agujeros-negros.jpg',
    url: 'articles/agujeros-negros.html',
    tags: ['espacio', 'gravedad', 'astronomía', 'relatividad'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'cielo-azul',
    title: '¿Por qué el cielo es azul?',
    category: 'Física',
    categoryId: 'fisica',
    date: '2026-08-05',
    readingTime: '5 min',
    description: 'La respuesta no es tan simple como parece: dispersión de la luz, atmósfera y percepción visual.',
    image: 'images/cielo.jpg',
    url: 'articles/cielo-azul.html',
    tags: ['luz', 'atmósfera', 'óptica', 'física'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'como-funciona-la-gravedad',
    title: '¿Cómo funciona la gravedad?',
    category: 'Física',
    categoryId: 'fisica',
    date: '2026-08-03',
    readingTime: '7 min',
    description: 'Desde Newton hasta Einstein: una fuerza misteriosa que moldea galaxias y mantiene nuestros pies en el suelo.',
    image: 'images/gravedad.jpg',
    url: 'articles/como-funciona-la-gravedad.html',
    tags: ['gravedad', 'newton', 'einstein', 'física'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'relatividad',
    title: '¿Qué es la relatividad?',
    category: 'Física',
    categoryId: 'fisica',
    date: '2026-03-28',
    readingTime: '10 min',
    description: 'El tiempo que se estira, el espacio que se curva y por qué nada puede viajar más rápido que la luz.',
    image: 'images/relatividad.jpg',
    url: 'articles/relatividad.html',
    tags: ['einstein', 'espacio-tiempo', 'relatividad', 'física'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'estrellas',
    title: '¿Cómo nacen las estrellas?',
    category: 'Astronomía',
    categoryId: 'astronomia',
    date: '2026-04-25',
    readingTime: '6 min',
    description: 'Del polvo cósmico a la fusión nuclear: el proceso que ilumina el universo.',
    image: 'images/estrellas.jpg',
    url: 'articles/estrellas.html',
    tags: ['estrellas', 'formación estelar', 'astronomía', 'nuclear'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'adn',
    title: '¿Cómo funciona el ADN?',
    category: 'Biología',
    categoryId: 'biologia',
    date: '2026-02-20',
    readingTime: '9 min',
    description: 'La doble hélice que contiene las instrucciones de la vida y cómo las células las interpretan.',
    image: 'images/adn.jpg',
    url: 'articles/como-funciona-el-adn.html',
    tags: ['genética', 'ADN', 'biología', 'células'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'celula',
    title: '¿Qué es una célula?',
    category: 'Biología',
    categoryId: 'biologia',
    date: '2026-06-15',
    readingTime: '6 min',
    description: 'La unidad fundamental de la vida: estructura, tipos y por qué todo organismo está hecho de células.',
    image: 'images/celulas.jpg',
    url: 'articles/que-es-una-celula.html',
    tags: ['células', 'biología', 'microscopio', 'vida'],
    featured: false,
    author: 'Equipo NEBULA'
  },
  {
    id: 'terremotos',
    title: '¿Por qué ocurren los terremotos?',
    category: 'Tierra',
    categoryId: 'tierra',
    date: '2026-06-10',
    readingTime: '7 min',
    description: 'Placas tectónicas, energía acumulada y el movimiento constante de la corteza terrestre.',
    image: 'images/terremotos.jpg',
    url: 'articles/por-que-ocurren-los-terremotos.html',
    tags: ['sismos', 'geología', 'placas tectónicas', 'tierra'],
    featured: false,
    author: 'Equipo NEBULA'
  },
  {
    id: 'mecanica-cuantica',
    title: '¿Qué es la mecánica cuántica?',
    category: 'Física',
    categoryId: 'fisica',
    date: '2026-05-05',
    readingTime: '11 min',
    description: 'El mundo subatómico donde las partículas pueden estar en dos lugares a la vez y la observación cambia la realidad.',
    image: 'images/mecanica-cuantica.jpg',
    url: 'articles/que-es-la-mecanica-cuantica.html',
    tags: ['cuántica', 'partículas', 'física', 'probabilidad'],
    featured: true,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'red-neuronal',
    title: '¿Cómo funciona una red neuronal?',
    category: 'Tecnología',
    categoryId: 'tecnologia',
    date: '2026-03-01',
    readingTime: '8 min',
    description: 'Inspiradas en el cerebro humano, las redes neuronales artificiales aprenden patrones y transforman la tecnología.',
    image: 'images/red-neuronal.jpg',
    url: 'articles/como-funciona-una-red-neuronal.html',
    tags: ['IA', 'machine learning', 'tecnología', 'neurociencia'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  },
  {
    id: 'origen-universo',
    title: '¿Cómo nació el universo?',
    category: 'Astronomía',
    categoryId: 'astronomia',
    date: '2026-04-28',
    readingTime: '9 min',
    description: 'Del Big Bang a la expansión acelerada: lo que sabemos sobre los primeros instantes del cosmos.',
    image: 'images/universo.jpg',
    url: 'articles/como-nacio-el-universo.html',
    tags: ['big bang', 'cosmología', 'universo', 'astronomía'],
    featured: false,
    author: 'Equipo DISCOVERIA'
  }
];

/**
 * Obtiene artículos por categoría
 */
function getArticlesByCategory(categoryId) {
  if (!categoryId || categoryId === 'todos') return articles;
  return articles.filter(a => a.categoryId === categoryId);
}

/**
 * Obtiene el artículo destacado
 */
function getFeaturedArticle() {
  return articles.find(a => a.featured) || articles[0];
}

/**
 * Obtiene artículos recientes (excluyendo destacado)
 */
function getRecentArticles(limit = 6) {
  const featured = getFeaturedArticle();
  return articles
    .filter(a => a.id !== featured.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

/**
 * Cuenta artículos por categoría
 */
function getArticleCountByCategory(categoryId) {
  return articles.filter(a => a.categoryId === categoryId).length;
}

/**
 * Obtiene artículos relacionados
 */
function getRelatedArticles(currentId, limit = 3) {
  const current = articles.find(a => a.id === currentId);
  if (!current) return [];

  const scored = articles
    .filter(a => a.id !== currentId)
    .map(a => {
      let score = 0;
      if (a.categoryId === current.categoryId) score += 3;
      const sharedTags = a.tags.filter(t => current.tags.includes(t));
      score += sharedTags.length;
      return { article: a, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length >= limit) return scored.slice(0, limit).map(s => s.article);

  const remaining = articles
    .filter(a => a.id !== currentId && !scored.find(s => s.article.id === a.id))
    .slice(0, limit - scored.length);

  return [...scored.map(s => s.article), ...remaining].slice(0, limit);
}

/**
 * Busca artículos por término
 */
function searchArticles(query) {
  if (!query || query.trim() === '') return [];
  const term = query.toLowerCase().trim();
  return articles.filter(a =>
    a.title.toLowerCase().includes(term) ||
    a.description.toLowerCase().includes(term) ||
    a.category.toLowerCase().includes(term) ||
    a.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

/**
 * Formatea fecha en español
 */
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}
