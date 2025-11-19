/**
 * 🧹 ESLINT - EL "REVISOR DE CÓDIGO" AUTOMÁTICO
 * 
 * ¿QUÉ HACE?
 * - Revisa tu código mientras programás
 * - Marca errores de sintaxis, formato, y mejores prácticas  
 * - Sugiere correcciones automáticas
 * - Mantiene consistencia en el código
 * 
 * ¿POR QUÉ ESTÁ EN ESTE PROYECTO?
 * - 👨‍🏫 Para aprendizaje (buenas prácticas)
 * - 📚 Requisito académico común
 * - 🔧 Preparación para trabajo real
 * 
 * EN EMPRESAS SÍ ES NECESARIO → 10 programadores sin estándares = CAOS
 * EN PROYECTOS PERSONALES → Puede sentirse como "demás"
 */


import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";   // 📊 Reglas de PERFORMANCE web
import nextTs from "eslint-config-next/typescript";            // 🔷 Reglas de TYPESCRIPT

/**
 * ⚙️ CONFIGURACIÓN DE ESLINT
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

/**
 * 🚀 CÓMO USARLO:
 * 
 * AUTOMÁTICO: 
 * - Tu editor (VSCode) subraya errores en rojo/naranja
 * 
 * MANUAL:
 * npx eslint .          ← Revisa todo el proyecto
 * npx eslint . --fix    ← Revisa y ARREGLA automáticamente
 * 
 * 📝 EJEMPLOS DE LO QUE DETECTA:
 * - Variables no usadas
 * - Imports no utilizados  
 * - Formato incorrecto (falta espacios, puntos y coma)
 * - Malas prácticas de código
 * 
 * 💡 MI RECOMENDACIÓN:
 * - Déjalo activo para aprender
 * - Usa --fix cuando te molesten los errores
 * - No te estreses, es para ayudarte
 */

