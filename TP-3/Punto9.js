function debounce(fn, delay) {
  let timer;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
}

// Ejemplo de uso
const log = debounce((msg) => console.log(msg), 500);
log('hola'); // Si se llama varias veces rápido, solo se ejecuta la última después de 500ms
