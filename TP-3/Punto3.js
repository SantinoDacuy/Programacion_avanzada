function sumUnique(nums) {
  const onlyNumbers = nums.filter(n => Number.isFinite(n));
  const uniqueNumbers = new Set(onlyNumbers);
  return Array.from(uniqueNumbers).reduce((acc, n) => acc + n, 0);
}

// Ejemplos de uso
console.log(sumUnique([1,2,2,3])); // 6
console.log(sumUnique([1,'2',2,3,'a'])); // 6
