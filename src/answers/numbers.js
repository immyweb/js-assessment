// ====================================================================
// DIGIT MANIPULATION & ANALYSIS
// ====================================================================
// These exercises focus on working with individual digits within numbers.
// You'll learn how to extract, analyze, and manipulate digits.

// REVERSE INTEGER
// Given an integer, return an integer that is the reverse ordering of numbers.
// Examples:
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
  const reversed = n.toString().split('').reverse().join('');

  return parseInt(reversed) === n;
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
    .map((num) => parseInt(num))
    .reduce((acc, num) => acc + num);
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
  let largest = 0;

  const arr = Math.abs(n)
    .toString()
    .split('')
    .map((num) => parseInt(num));

  arr.forEach((num) => {
    if (num > largest) {
      largest = num;
    }
  });

  return largest;
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
    .map((num) => parseInt(num))
    .reduce((acc, num) => acc * num);
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
  const primeDigits = new Set([2, 3, 5, 7]);

  return n
    .toString()
    .split('')
    .map((digit) => parseInt(digit))
    .every((digit) => primeDigits.has(digit));
}

// ====================================================================
// NUMBER VALIDATION & TYPE CHECKING
// ====================================================================
// These exercises help you understand JavaScript's number types and validate
// numbers for different use cases and edge conditions.

// NUMBER VALIDATION
// Check if a value is a valid finite number (not NaN, Infinity, or non-numeric)
// Examples:
//   isValidNumber(42) === true
//   isValidNumber(3.14) === true
//   isValidNumber(NaN) === false
//   isValidNumber(Infinity) === false
//   isValidNumber("123") === false
//   isValidNumber(null) === false

export function isValidNumber(value) {
  return !isNaN(value) && Number.isFinite(value) && typeof value === 'number';
}

// SAFE INTEGER CHECK
// Check if a number is within JavaScript's safe integer range
// Examples:
//   isSafeInteger(123) === true
//   isSafeInteger(9007199254740991) === true
//   isSafeInteger(9007199254740992) === false
//   isSafeInteger(3.14) === false
//   isSafeInteger(-9007199254740991) === true

export function isSafeInteger(num) {
  return Number.isSafeInteger(num);
}

// POWER OF TWO CHECK
// Check if a positive integer is a power of 2
// Examples:
//   isPowerOfTwo(1) === true   // 2^0
//   isPowerOfTwo(2) === true   // 2^1
//   isPowerOfTwo(8) === true   // 2^3
//   isPowerOfTwo(16) === true  // 2^4
//   isPowerOfTwo(3) === false
//   isPowerOfTwo(0) === false
//   isPowerOfTwo(-8) === false

export function isPowerOfTwo(n) {
  if (n <= 0) {
    return false;
  }

  while (n > 1) {
    if (n % 2 !== 0) return false;
    n = Math.floor(n / 2);
  }
  return true;
}

// ====================================================================
// NUMBER PARSING & CONVERSION
// ====================================================================
// These exercises teach you how to convert between different number formats
// and parse numbers from various string representations.

// NUMBER PARSING
// Parse a string and return a number, handling various formats
// Return NaN if parsing fails
// Examples:
//   parseNumber("123") === 123
//   parseNumber("3.14") === 3.14
//   parseNumber("  42  ") === 42
//   parseNumber("123abc") === 123
//   parseNumber("abc123") === NaN
//   parseNumber("0xFF") === 255  // hex
//   parseNumber("0b1010") === 10  // binary

export function parseNumber(str) {
  let format;
  const trimmed = str.trim();

  // Check for invalid strings that start with letters (except special prefixes)
  if (
    trimmed.match(/^[a-z]/i) &&
    !trimmed.startsWith('0x') &&
    !trimmed.startsWith('0b')
  ) {
    return NaN;
  }

  // Determine the number format
  if (trimmed.startsWith('0x')) {
    format = 'hex';
  } else if (trimmed.startsWith('0b')) {
    format = 'binary';
  } else if (trimmed.includes('.')) {
    format = 'decimal';
  }

  // Parse based on the detected format
  if (format === 'hex') {
    return parseInt(trimmed.substring(2), 16);
  } else if (format === 'binary') {
    return parseInt(trimmed.substring(2), 2);
  } else if (format === 'decimal') {
    return parseFloat(trimmed);
  } else {
    // For plain integers or strings that start with numbers like "123abc"
    return parseInt(trimmed);
  }
}

// CONVERT TO DIFFERENT BASES
// Convert a decimal number to specified base (2-36)
// Examples:
//   convertToBase(10, 2) === "1010"    // binary
//   convertToBase(255, 16) === "ff"    // hexadecimal
//   convertToBase(8, 8) === "10"       // octal
//   convertToBase(35, 36) === "z"      // base 36

export function convertToBase(num, base) {
  if (base >= 2 && base <= 36) {
    return Math.abs(num).toString(base);
  }
}

// TEMPERATURE CONVERSION
// Convert temperature between Celsius and Fahrenheit
// mode: 'toF' (Celsius to Fahrenheit) or 'toC' (Fahrenheit to Celsius)
// Formula: toF: (C x 9/5) + 32
// Examples:
//   convertTemperature(0, 'toF') === 32      // 0°C to °F
//   convertTemperature(32, 'toC') === 0      // 32°F to °C
//   convertTemperature(100, 'toF') === 212   // 100°C to °F
//   convertTemperature(98.6, 'toC') === 37   // 98.6°F to °C

export function convertTemperature(temp, mode) {
  if (mode === 'toF') {
    return (temp * 9) / 5 + 32;
  } else {
    return ((temp - 32) * 5) / 9;
  }
}

// ====================================================================
// MATHEMATICAL OPERATIONS & CALCULATIONS
// ====================================================================
// These exercises cover fundamental mathematical operations and algorithms
// commonly used in programming and real-world applications.

// FACTORIAL CALCULATION
// Calculate the factorial of a non-negative integer
// Examples:
//   factorial(0) === 1
//   factorial(1) === 1
//   factorial(5) === 120
//   factorial(10) === 3628800
//   factorial(-1) === undefined (invalid input)

export function factorial(n) {
  // Check for invalid inputs (negative numbers or decimals)
  if (n < 0 || !Number.isInteger(n)) {
    return undefined;
  }

  // Base case: 0! = 1
  if (n === 0) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

// GREATEST COMMON DIVISOR
// Find the greatest common divisor (GCD) of two integers
// Examples:
//   gcd(12, 18) === 6
//   gcd(15, 25) === 5
//   gcd(7, 13) === 1
//   gcd(0, 5) === 5
//   gcd(-12, 18) === 6

export function gcd(a, b) {
  // Convert negative numbers to positive
  a = Math.abs(a);
  b = Math.abs(b);

  // Handle edge cases
  if (a === 0) return b;
  if (b === 0) return a;

  // Euclidean algorithm
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

// AVERAGE OF ARRAY
// Calculate the average (mean) of an array of numbers
// Handle edge cases like empty arrays
// Examples:
//   average([1, 2, 3, 4, 5]) === 3
//   average([10, 20]) === 15
//   average([7]) === 7
//   average([]) === 0
//   average([1.5, 2.5, 3.5]) === 2.5

export function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  return numbers.reduce((acc, num) => acc + num) / numbers.length;
}

// COMPOUND INTEREST CALCULATOR
// Calculate compound interest: A = P(1 + r/n)^(nt)
// P = principal, r = annual rate (decimal), n = compounds per year, t = time in years
// Examples:
//   compoundInterest(1000, 0.05, 1, 1) === 1050    // $1000 at 5% for 1 year
//   compoundInterest(1000, 0.05, 12, 2) === 1104.89 (approximately)

export function compoundInterest(principal, rate, compoundsPerYear, years) {
  const ratePerPeriod = rate / compoundsPerYear + 1;
  const nt = compoundsPerYear * years;
  const compoundFactor = Math.pow(ratePerPeriod, nt);

  return Math.round(principal * compoundFactor * 100) / 100;
}

// ====================================================================
// NUMBER FORMATTING & PRECISION
// ====================================================================
// These exercises focus on controlling number precision, formatting,
// and handling floating-point arithmetic issues.

// FLOATING POINT PRECISION
// Fix floating point precision issues by rounding to specified decimal places
// Examples:
//   fixPrecision(0.1 + 0.2, 1) === 0.3
//   fixPrecision(0.1 + 0.2, 2) === 0.30
//   fixPrecision(1.005, 2) === 1.01
//   fixPrecision(123.456789, 3) === 123.457

export function fixPrecision(num, decimals) {
  return +(Math.round(num + 'e+' + decimals) + 'e-' + decimals);
}

// ROUNDING OPERATIONS
// Round a number using different rounding methods
// mode: 'floor', 'ceil', 'round', 'trunc'
// Examples:
//   roundNumber(4.7, 'floor') === 4
//   roundNumber(4.7, 'ceil') === 5
//   roundNumber(4.7, 'round') === 5
//   roundNumber(4.7, 'trunc') === 4
//   roundNumber(-4.7, 'floor') === -5
//   roundNumber(-4.7, 'ceil') === -4

export function roundNumber(num, mode) {
  return Math[mode](num);
}

// PERCENTAGE CALCULATION
// Calculate what percentage the first number is of the second number
// Round to specified decimal places
// Examples:
//   calculatePercentage(25, 100, 0) === 25
//   calculatePercentage(1, 3, 2) === 33.33
//   calculatePercentage(5, 8, 1) === 62.5
//   calculatePercentage(0, 100, 0) === 0

export function calculatePercentage(part, whole, decimals) {
  const percentage = (part / whole) * 100;

  return parseFloat(percentage.toFixed(decimals));
}

// ====================================================================
// UTILITY FUNCTIONS & RANGE OPERATIONS
// ====================================================================
// These exercises cover utility functions for working with number ranges,
// constraints, and random number generation.

// RANDOM NUMBER GENERATOR
// Generate a random integer between min and max (inclusive)
// Examples:
//   randomBetween(1, 6) // returns 1, 2, 3, 4, 5, or 6
//   randomBetween(10, 20) // returns integer from 10 to 20
//   randomBetween(-5, 5) // returns integer from -5 to 5

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// CLAMP NUMBER
// Restrict a number to be within a specified range
// Examples:
//   clampNumber(5, 1, 10) === 5
//   clampNumber(-5, 1, 10) === 1
//   clampNumber(15, 1, 10) === 10
//   clampNumber(3.7, 2.5, 4.2) === 3.7

export function clampNumber(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
