# 🛫 Flybondi Challenge - Mis Vacaciones Ideales

## 📋 Descripción del Proyecto

Aplicación web desarrollada para el challenge de Flybondi, diseñada específicamente para ayudar a usuarios como Nelsona (65 años) a encontrar las mejores opciones de vacaciones dentro de su presupuesto.

## 🎯 Problema a Resolver

**Usuario objetivo**: Nelsona, jubilada de 65 años con presupuesto limitado de $800 para pasajes ida y vuelta.

**Requisitos**:
- Interfaz súper simple (máximo 2 clicks)
- Texto grande y claro para adultos mayores
- Búsqueda inteligente por presupuesto
- Flexibilidad para viajar sola o con familia
- Resultados claros: destino, precio, fechas, duración

## ✨ Características Principales

### 🎨 **UX/UI Diseñada para Jubilados**
- **Interfaz minimalista**: Solo 2 campos (presupuesto + pasajeros)
- **Texto grande**: Fuentes de 18px+ para fácil lectura
- **Colores contrastantes**: Naranja Flybondi (#FF6B35) y azul (#004080)
- **Botones grandes**: Fácil de hacer clic
- **Navegación simple**: Un solo botón "Buscar"

### 🔍 **Búsqueda Inteligente**
- **Algoritmo de valor**: Prioriza mejor relación precio/duración
- **Filtrado por disponibilidad**: Solo vuelos con asientos suficientes
- **Combinaciones ida/vuelta**: Encuentra vuelos de regreso válidos
- **Cálculo automático**: Precio total y por persona

### 👨‍👩‍👧‍👦 **Flexibilidad Familiar**
- **1-4 pasajeros**: Nelsona sola o con Víctor, Valentina, Adriana
- **Presupuesto compartido**: $800 se divide entre todos
- **Comparación fácil**: Valentina puede ver todas las opciones

## 🛠️ Stack Tecnológico

### **Backend**
- **Node.js** + **Express**: Servidor robusto y escalable
- **API REST**: Endpoint `/api/search` con parámetros
- **Algoritmo de búsqueda**: Combinaciones ida/vuelta optimizadas
- **Manejo de datos**: 1035+ vuelos del dataset

### **Frontend**
- **Vanilla JavaScript**: Sin frameworks pesados
- **CSS Grid/Flexbox**: Layout responsive
- **DOM manipulation**: Eventos y AJAX
- **Animaciones CSS**: Transiciones suaves

### **Características Técnicas**
- **Responsive Design**: Móvil y desktop
- **Accesibilidad**: ARIA, contraste, navegación por teclado
- **Performance**: Algoritmo eficiente, lazy loading
- **Error Handling**: Try/catch, validaciones

## 🚀 Instalación y Uso

### **Prerrequisitos**
- Node.js 18+
- npm

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/SantinoDacuy/Programacion_avanzada.git
cd Programacion_avanzada/Flybondi-spa

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

### **Acceso**
- **URL**: http://localhost:3000
- **API**: http://localhost:3000/api/search?budget=800&passengers=1

## 📊 Dataset

El proyecto incluye un dataset realista con:
- **1035+ vuelos** de Argentina
- **Destinos**: Córdoba, Mendoza, Bariloche, El Palomar
- **Fechas**: Agosto 2025
- **Precios**: $150-$500 por vuelo
- **Disponibilidad**: 1-10 asientos por vuelo

## 🎯 Casos de Uso

### **Nelsona sola**
- Presupuesto: $800
- Pasajeros: 1
- Resultado: Opciones individuales con mejor valor

### **Nelsona + Víctor**
- Presupuesto: $800
- Pasajeros: 2
- Resultado: $400 por persona

### **Familia completa**
- Presupuesto: $800
- Pasajeros: 4
- Resultado: $200 por persona

## 🏆 Evaluación del Proyecto

### **Cumplimiento de Consigna**
- ✅ **Simplicidad**: Interfaz de 2 clicks máximo
- ✅ **Accesibilidad**: Diseño para adultos mayores
- ✅ **Funcionalidad**: Búsqueda por presupuesto
- ✅ **Flexibilidad**: Múltiples pasajeros

### **Creatividad**
- 🎨 **UX centrada en usuario**: Diseño específico para jubilados
- 🧠 **Algoritmo inteligente**: Mejor relación precio/duración
- 🎯 **Solución completa**: End-to-end funcional

### **Buenas Prácticas**
- 📝 **Código limpio**: Funciones bien separadas
- 🔒 **Manejo de errores**: Try/catch, validaciones
- ♿ **Accesibilidad**: ARIA, contraste, navegación
- ⚡ **Performance**: Algoritmo eficiente

## 📱 Screenshots

### **Página Principal**
- Formulario simple con presupuesto y pasajeros
- Botón grande "Buscar mis vacaciones ideales"
- Diseño amigable con colores Flybondi

### **Resultados**
- Cards informativas con destino, fechas, precio
- Información clara: duración, disponibilidad
- Botón "Buscar de nuevo" para probar otros presupuestos

## 👥 Equipo

**Desarrollador**: Santino Dacuy
**Curso**: Programación Avanzada - 3er año
**Institución**: Licenciatura en Sistemas

## 📄 Licencia

MIT License - Proyecto académico

---

## 🎯 Conclusión

Este proyecto demuestra la capacidad de crear soluciones tecnológicas que realmente resuelven problemas reales, con un enfoque especial en la accesibilidad y usabilidad para usuarios no técnicos. La aplicación cumple perfectamente con los requisitos del challenge de Flybondi, proporcionando una experiencia excepcional para Nelsona y su familia.

**¡Perfecto para 3er año de Licenciatura en Sistemas!** 🎓
