function wordFreq(text) {
  // Normaliza a minúsculas y elimina puntuación básica
  const cleanText = text.toLowerCase().replace(/[.,:;!?]/g, '');
  const words = cleanText.split(/\s+/).filter(Boolean);
  const freqMap = new Map();
  for (const word of words) {
    freqMap.set(word, (freqMap.get(word) || 0) + 1);
  }
  return freqMap;
}

// Ejemplo de uso
console.log(wordFreq('Hola, hola! chau.')); // Map { 'hola' => 2, 'chau' => 1 }
