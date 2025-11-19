/**
 * 🎨 POSTCSS.CONFIG.MJS - EL "ASESOR DE ESTILOS" DE TAILWINDCSS
 * 
 * ¿QUÉ HACE?
 * - Le dice a PostCSS: "Usá TailwindCSS para procesar los estilos"
 * - Convierte las clases de Tailwind en CSS normal que el navegador entiende
 * - Procesa y optimiza los estilos CSS
 * 
 * EN TÉRMINOS SIMPLES:
 * Sin este archivo → TailwindCSS no funcionaría
 * Con este archivo → Las clases como "bg-blue-500" se convierten en CSS real
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
/**
 * 🔄 CÓMO FUNCIONA EN LA PRÁCTICA:
 * 
 * TU CÓDIGO: <div className="bg-slate-900 text-white p-4">
 *            ↓
 * POSTCSS + TAILWIND: 
 *   - Busca qué es "bg-slate-900" → Encuentra que es: background-color: #0f172a;
 *   - Busca qué es "text-white" → Encuentra que es: color: #ffffff;  
 *   - Busca qué es "p-4" → Encuentra que es: padding: 1rem;
 *            ↓
 * CSS FINAL: .clase-generada { 
 *   background-color: #0f172a;
 *   color: #ffffff;
 *   padding: 1rem;
 * }
 * 
 * 🎯 PARA QUÉ SIRVE EN ESTE PROYECTO:
 * - Procesa todos los estilos de la interfaz bancaria
 * - Convierte las clases de Tailwind que ves en los componentes React
 * - Genera el CSS final que se envía al navegador
 * 
 * 💡 CURIOSIDAD:
 * - PostCSS es como un "traductor" que convierte CSS moderno a CSS que todos los navegadores entienden
 * - TailwindCSS es un "framework" que provee las clases predefinidas
 * - Este archivo los conecta
 */