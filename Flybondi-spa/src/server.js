const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('public'));

// Cargar dataset
let flightData = [];
try {
  flightData = JSON.parse(fs.readFileSync('./dataset.json', 'utf8'));
  console.log(`✅ Dataset cargado: ${flightData.length} vuelos`);
} catch (error) {
  console.error('❌ Error cargando dataset:', error);
}

// Mapeo de códigos IATA a nombres de ciudades
const cityNames = {
  'COR': 'Córdoba',
  'MDZ': 'Mendoza',
  'BRC': 'Bariloche',
  'EPA': 'El Palomar'
};

// API: Búsqueda inteligente de vacaciones
app.get('/api/search', (req, res) => {
  const { budget = 800, passengers = 1 } = req.query;
  const maxBudget = parseFloat(budget);
  const numPassengers = parseInt(passengers);

  console.log(`🔍 Buscando vacaciones para ${numPassengers} pasajeros con presupuesto $${maxBudget}`);

  try {
    const vacationOptions = findBestVacations(maxBudget, numPassengers);
    
    res.json({
      success: true,
      budget: maxBudget,
      passengers: numPassengers,
      totalResults: vacationOptions.length,
      vacations: vacationOptions.slice(0, 10) // Top 10 opciones
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// API: Obtener destinos disponibles
app.get('/api/destinations', (req, res) => {
  try {
    const destinations = [...new Set(flightData.map(flight => flight.destination))]
      .map(code => ({
        code,
        name: cityNames[code] || code
      }));

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error obteniendo destinos'
    });
  }
});

// Función principal: Encontrar mejores vacaciones
function findBestVacations(budget, passengers) {
  const roundTrips = [];
  
  // Buscar todas las combinaciones ida y vuelta
  flightData.forEach(outbound => {
    if (outbound.availability < passengers) return;
    
    // Buscar vuelos de vuelta desde el destino
    const returnFlights = flightData.filter(flight => 
      flight.origin === outbound.destination && 
      flight.destination === outbound.origin &&
      flight.availability >= passengers &&
      new Date(flight.date) > new Date(outbound.date)
    );

    returnFlights.forEach(returnFlight => {
      const totalPrice = (outbound.price + returnFlight.price) * passengers;
      
      if (totalPrice <= budget) {
        const daysBetween = calculateDaysBetween(outbound.date, returnFlight.date);
        
        roundTrips.push({
          origin: {
            code: outbound.origin,
            name: cityNames[outbound.origin] || outbound.origin
          },
          destination: {
            code: outbound.destination,
            name: cityNames[outbound.destination] || outbound.destination
          },
          outbound: {
            date: outbound.date,
            price: outbound.price,
            availability: outbound.availability
          },
          return: {
            date: returnFlight.date,
            price: returnFlight.price,
            availability: returnFlight.availability
          },
          totalPrice: totalPrice,
          duration: daysBetween,
          pricePerPerson: totalPrice / passengers,
          value: calculateValue(totalPrice, daysBetween, budget)
        });
      }
    });
  });

  // Ordenar por mejor valor (precio vs duración)
  return roundTrips.sort((a, b) => b.value - a.value);
}

// Calcular días entre fechas
function calculateDaysBetween(date1, date2) {
  const start = new Date(date1);
  const end = new Date(date2);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Calcular valor de la opción (más días por menos plata = mejor valor)
function calculateValue(totalPrice, duration, budget) {
  const priceRatio = 1 - (totalPrice / budget); // Menos precio = mejor
  const durationBonus = Math.min(duration / 7, 2); // Hasta 14 días tiene bonus
  return (priceRatio * 0.7) + (durationBonus * 0.3);
}

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Dataset: ${flightData.length} vuelos disponibles`);
});