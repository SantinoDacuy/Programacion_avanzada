function sortByMany(list, specs) {
  // Clona el array para no mutar el original
  const cloned = [...list];
  // Función comparadora
  cloned.sort((a, b) => {
    for (const { key, dir } of specs) {
      if (a[key] < b[key]) return dir === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return dir === 'asc' ? 1 : -1;
      // Si son iguales, sigue con la siguiente regla
    }
    return 0;
  });
  return cloned;
}

// Ejemplo de uso
const users = [
  { lastName: 'Gomez', age: 30 },
  { lastName: 'Gomez', age: 25 },
  { lastName: 'Perez', age: 40 },
  { lastName: 'Perez', age: 20 }
];
console.log(sortByMany(users, [
  { key: 'lastName', dir: 'asc' },
  { key: 'age', dir: 'desc' }
]));
// Ordena por lastName asc y age desc
