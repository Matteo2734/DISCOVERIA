/**
 * Configuración global del sitio
 * Modifica estos valores para personalizar la identidad del proyecto
 */
const SITE_CONFIG = {
  SITE_NAME: 'DISCOVERIA',
  SITE_DESCRIPTION: 'Revista digital de divulgación científica en español. Explora las ideas, descubrimientos y preguntas que nos ayudan a entender el universo.',
  SITE_URL: 'https://discoveria-site.netlify.app',
  AUTHOR: 'Equipo DISCOVERIA',
  EMAIL: 'discoveria.support@gmail.com',
  SOCIAL_LINKS: {
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    github: 'https://github.com/'
  },
  CATEGORIES: [
    { id: 'fisica', name: 'Física', description: 'Leyes fundamentales del universo', icon: '⚛' },
    { id: 'astronomia', name: 'Astronomía', description: 'Estrellas, galaxias y el cosmos', icon: '✦' },
    { id: 'biologia', name: 'Biología', description: 'La vida en todas sus formas', icon: '◉' },
    { id: 'quimica', name: 'Química', description: 'Átomos, moléculas y reacciones', icon: '◈' },
    { id: 'matematicas', name: 'Matemáticas', description: 'El lenguaje del universo', icon: '∞' },
    { id: 'neurociencia', name: 'Neurociencia', description: 'El cerebro y la mente', icon: '◎' },
    { id: 'tierra', name: 'Tierra', description: 'Geología, clima y ecosistemas', icon: '◐' },
    { id: 'tecnologia', name: 'Tecnología', description: 'Innovación y el futuro digital', icon: '◇' }
  ]
};
