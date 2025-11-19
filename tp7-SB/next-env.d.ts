/**
 * 📄 NEXT-ENV.D.TS - EL "DICCIONARIO DE TIPOS" AUTOMÁTICO
 * 
 * ¿QUÉ HACE?
 * - Define tipos TypeScript para Next.js
 * - Se genera AUTOMÁTICAMENTE
 * - Ayza a TypeScript a entender Next.js
 * 
 * ⚠️ IMPORTANTE:
 * // NOTE: This file should not be edited
 * // NO EDITES ESTE ARCHIVO - Next.js lo maneja automáticamente
 */

/// <reference types="next" />          // 📚 Tipos básicos de Next.js
/// <reference types="next/image-types/global" /> // 🖼️ Tipos para componente Image

/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.


/**
 * 🎯 PARA QUÉ SIRVE EN LA PRÁCTICA:
 * - Cuando usas `next/link` → TypeScript sabe qué props espera
 * - Cuando usas `next/image` → TypeScript valida los atributos  
 * - Cuando usas rutas → TypeScript entiende la estructura de app/
 * 
 * 💡 CURIOSIDAD:
 * - Este archivo se regenera cada vez que:
 *   - Hacés `npm run dev`
 *   - Hacés `npm run build`
 *   - Cambiás la estructura de carpetas
 * - Por eso NO se edita manualmente
 */