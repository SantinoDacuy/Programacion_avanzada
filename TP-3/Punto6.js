function isBalanced(s) {
  const stack = [];
  const pairs = { '(': ')', '[': ']', '{': '}' };
  for (const char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (!stack.length) return false;
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  return stack.length === 0;
}

// Ejemplos de uso
console.log(isBalanced('([]{})')); // true
console.log(isBalanced('(]')); // false
console.log(isBalanced('([)]')); // false
