function groupBy(list, keyOrFn) {
  return list.reduce((acc, item) => {
    // Determina la clave según el tipo de keyOrFn
    const key = typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

// Ejemplos de uso
console.log(groupBy([{t:'a'},{t:'b'},{t:'a'}], 't')); // { a:[{t:'a'},{t:'a'}], b:[{t:'b'}] }
console.log(groupBy([6,7,8,9], n => n%2 ? 'impar' : 'par')); // { par:[6,8], impar:[7,9] }
