// Estado global de la aplicación
let currentSearchParams = {};

// Elementos del DOM
const searchForm = document.getElementById('searchForm');
const budgetInput = document.getElementById('budget');
const passengersSelect = document.getElementById('passengers');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('results');
const noResultsSection = document.getElementById('noResults');
const vacationsList = document.getElementById('vacationsList');
const resultsCount = document.getElementById('resultsCount');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 App iniciada');
    initializeApp();
});

searchForm.addEventListener('submit', handleSearch);
budgetInput.addEventListener('input', updateBudgetDisplay);

// Inicializar la aplicación
function initializeApp() {
    // Actualizar display del presupuesto
    updateBudgetDisplay();
    
    // Focus en el input principal
    budgetInput.focus();
    
    console.log('✅ App inicializada correctamente');
}

// Manejar el formulario de búsqueda
async function handleSearch(event) {
    event.preventDefault();
    
    const budget = parseFloat(budgetInput.value);
    const passengers = parseInt(passengersSelect.value);
    
    // Validación básica
    if (!budget || budget < 100) {
        showError('Por favor, ingresá un presupuesto válido (mínimo $100)');
        return;
    }
    
    currentSearchParams = { budget, passengers };
    
    console.log(`🔍 Iniciando búsqueda: $${budget} para ${passengers} persona${passengers > 1 ? 's' : ''}`);
    
    // Mostrar loading
    showSection('loading');
    
    try {
        const response = await fetch(`/api/search?budget=${budget}&passengers=${passengers}`);
        const data = await response.json();
        
        if (data.success) {
            displayResults(data);
        } else {
            throw new Error(data.error || 'Error en la búsqueda');
        }
    } catch (error) {
        console.error('❌ Error en búsqueda:', error);
        showError('Hubo un problema con la búsqueda. Por favor, intentá de nuevo.');
    }
}

// Mostrar resultados
function displayResults(data) {
    console.log(`✅ Resultados recibidos: ${data.vacations.length} opciones`);
    
    if (data.vacations.length === 0) {
        showSection('noResults');
        return;
    }
    
    // Actualizar contador
    resultsCount.textContent = `Encontramos ${data.vacations.length} opción${data.vacations.length > 1 ? 'es' : ''} para tu presupuesto de $${data.budget}`;
    
    // Generar HTML de las vacaciones
    vacationsList.innerHTML = data.vacations.map(vacation => 
        createVacationCard(vacation)
    ).join('');
    
    showSection('results');
    
    // Scroll suave hacia los resultados
    setTimeout(() => {
        resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }, 100);
}

// Crear tarjeta de vacación
function createVacationCard(vacation) {
    const outboundDate = formatDate(vacation.outbound.date);
    const returnDate = formatDate(vacation.return.date);
    const pricePerPerson = Math.round(vacation.pricePerPerson);
    
    return `
        <div class="vacation-card">
            <div class="vacation-header">
                <div class="route">
                    <h3>${vacation.origin.name} ✈️ ${vacation.destination.name}</h3>
                    <div class="route-info">
                        ${vacation.origin.code} → ${vacation.destination.code} → ${vacation.origin.code}
                    </div>
                </div>
                <div class="price-tag">
                    $${vacation.totalPrice.toFixed(0)}
                    <div style="font-size: 0.8em; font-weight: normal; margin-top: 2px;">
                        ($${pricePerPerson} por persona)
                    </div>
                </div>
            </div>
            
            <div class="vacation-details">
                <div class="detail-item">
                    <span class="detail-label">📅 Ida</span>
                    <div class="detail-value">${outboundDate}</div>
                </div>
                <div class="detail-item">
                    <span class="detail-label">🔄 Vuelta</span>
                    <div class="detail-value">${returnDate}</div>
                </div>
                <div class="detail-item">
                    <span class="detail-label">🏖️ Estadía</span>
                    <div class="detail-value duration-highlight">
                        ${vacation.duration} día${vacation.duration > 1 ? 's' : ''}
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-label">✅ Disponibilidad</span>
                    <div class="detail-value">
                        ${Math.min(vacation.outbound.availability, vacation.return.availability)} asientos
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Formatear fecha de manera amigable
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        day: 'numeric', 
        month: 'short',
        weekday: 'short'
    };
    return date.toLocaleDateString('es-AR', options);
}

// Actualizar display del presupuesto
function updateBudgetDisplay() {
    const budget = budgetInput.value;
    const passengers = passengersSelect.value;
    
    if (budget && passengers) {
        const perPerson = Math.round(budget / passengers);
        // Podrías agregar un indicador visual del presupuesto por persona aquí
    }
}

// Mostrar sección específica
function showSection(sectionName) {
    // Ocultar todas las secciones
    loading.classList.add('hidden');
    resultsSection.classList.add('hidden');
    noResultsSection.classList.add('hidden');
    
    // Mostrar la sección solicitada
    switch(sectionName) {
        case 'loading':
            loading.classList.remove('hidden');
            break;
        case 'results':
            resultsSection.classList.remove('hidden');
            break;
        case 'noResults':
            noResultsSection.classList.remove('hidden');
            break;
    }
}

// Mostrar búsqueda nuevamente
function showSearchAgain() {
    showSection('search');
    budgetInput.focus();
    
    // Scroll hacia arriba
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar error
function showError(message) {
    alert(message);
    showSection('search');
}

// Funciones de utilidad para mejorar UX

// Formateo de números con separadores de miles
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(amount);
}

// Agregar eventos de teclado para accesibilidad
document.addEventListener('keydown', function(event) {
    // ESC para volver a buscar
    if (event.key === 'Escape') {
        showSearchAgain();
    }
});

// Función para debug (puedes borrarla en producción)
function logSearchDetails() {
    console.log('Parámetros de búsqueda actuales:', currentSearchParams);
}

// Validar presupuesto en tiempo real
budgetInput.addEventListener('blur', function() {
    const budget = parseFloat(this.value);
    if (budget && budget < 100) {
        this.style.borderColor = '#dc3545';
        setTimeout(() => {
            this.style.borderColor = '';
        }, 3000);
    }
});