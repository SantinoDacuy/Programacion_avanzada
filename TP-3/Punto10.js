function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), ms);
    promise.then(
      value => {
        clearTimeout(timer);
        resolve(value);
      },
      err => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

function allSettledLite(promises) {
  return Promise.all(
    promises.map(p =>
      p.then(
        value => ({ status: 'fulfilled', value }),
        reason => ({ status: 'rejected', reason })
      )
    )
  );
}

// Ejemplo de uso
// withTimeout(Promise.resolve('ok'), 1000).then(console.log).catch(console.error);
// allSettledLite([Promise.resolve(1), Promise.reject('fail')]).then(console.log);
