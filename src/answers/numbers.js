// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

export function reverseInt(n) {
  const str = Math.abs(n).toString().split('').reverse().join('');
  const returned = parseInt(str) * Math.sign(n);

  return returned;
}

// PALINDROME NUMBER
// Determine if an integer is a palindrome (reads the same forwards and backwards)
// Examples:
//   isPalindrome(121) === true
//   isPalindrome(-121) === false
//   isPalindrome(10) === false
//   isPalindrome(1221) === true
//   isPalindrome(0) === true

export function isPalindrome(n) {
  if (n < 0) return false;
  const str = n.toString();
  return str === str.split('').reverse().join('');
}

// SUM OF DIGITS
// Given an integer, return the sum of all its digits
// Examples:
//   sumDigits(123) === 6
//   sumDigits(999) === 27
//   sumDigits(-123) === 6
//   sumDigits(0) === 0
//   sumDigits(5) === 5

export function sumDigits(n) {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit), 0);
}

// DIGIT COUNT
// Given an integer, return the number of digits it contains
// Examples:
//   countDigits(123) === 3
//   countDigits(0) === 1
//   countDigits(-456) === 3
//   countDigits(1000) === 4
//   countDigits(7) === 1

export function countDigits(n) {
  return Math.abs(n).toString().length;
}

// LARGEST DIGIT
// Given an integer, return the largest digit in that number
// Examples:
//   largestDigit(123) === 3
//   largestDigit(987) === 9
//   largestDigit(-456) === 6
//   largestDigit(0) === 0
//   largestDigit(1000) === 1

export function largestDigit(n) {
  return Math.max(...Math.abs(n).toString().split('').map(Number));
}

// MULTIPLY DIGITS
// Multiply all digits in a number together
// Examples:
//   multiplyDigits(123) === 6  (1*2*3)
//   multiplyDigits(505) === 0  (5*0*5)
//   multiplyDigits(999) === 729  (9*9*9)
//   multiplyDigits(-123) === 6
//   multiplyDigits(7) === 7

export function multiplyDigits(n) {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((product, digit) => product * parseInt(digit), 1);
}

// PRIME DIGITS
// Check if all digits in a number are prime (2, 3, 5, 7)
// Examples:
//   allPrimeDigits(2357) === true
//   allPrimeDigits(2468) === false
//   allPrimeDigits(23) === true
//   allPrimeDigits(1357) === false  (1 is not prime)
//   allPrimeDigits(7) === true

export function allPrimeDigits(n) {
  const primeDigits = new Set(['2', '3', '5', '7']);
  return Math.abs(n)
    .toString()
    .split('')
    .every((digit) => primeDigits.has(digit));
}
