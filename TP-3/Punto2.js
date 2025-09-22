function pick(obj, keys) {
  // Crea un nuevo objeto con solo las claves indicadas
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

// Ejemplo de uso
console.log(pick({a:1,b:2,c:3}, ['a','c','z'])); // {a:1, c:3}
