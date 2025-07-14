import { describe, test, expect } from 'vitest';
import {
  reverseInt,
  isPalindrome,
  sumDigits,
  countDigits,
  largestDigit,
  multiplyDigits,
  allPrimeDigits,
  isValidNumber,
  isSafeInteger,
  isPowerOfTwo,
  parseNumber,
  convertToBase,
  convertTemperature,
  factorial,
  gcd,
  average,
  compoundInterest,
  fixPrecision,
  roundNumber,
  calculatePercentage,
  randomBetween,
  clampNumber
} from '../exercises/numbers';

describe('Numbers', () => {
  // ====================================================================
  // CATEGORY 1: DIGIT MANIPULATION & ANALYSIS
  // ====================================================================

  describe('Digit Manipulation & Analysis', () => {
    test('you should be able to reverse an integer', () => {
      expect(reverseInt(15)).toEqual(51);
      expect(reverseInt(0)).toEqual(0);
      expect(reverseInt(5)).toEqual(5);
      expect(reverseInt(90)).toEqual(9);
      expect(reverseInt(2359)).toEqual(9532);
      expect(reverseInt(-5)).toEqual(-5);
      expect(reverseInt(-15)).toEqual(-51);
      expect(reverseInt(-90)).toEqual(-9);
      expect(reverseInt(-2359)).toEqual(-9532);
    });

    test('you should be able to determine if integer is a palindrome', () => {
      expect(isPalindrome(121)).toBeTruthy();
      expect(isPalindrome(-121)).toBeFalsy();
      expect(isPalindrome(10)).toBeFalsy();
      expect(isPalindrome(1221)).toBeTruthy();
      expect(isPalindrome(0)).toBeTruthy();
    });

    test('you should be able to return the sum of all its digits', () => {
      expect(sumDigits(123)).toEqual(6);
      expect(sumDigits(999)).toEqual(27);
      expect(sumDigits(-123)).toEqual(6);
      expect(sumDigits(0)).toEqual(0);
      expect(sumDigits(5)).toEqual(5);
    });

    test('you should be able to return the number of digits it contains', () => {
      expect(countDigits(123)).toEqual(3);
      expect(countDigits(0)).toEqual(1);
      expect(countDigits(-456)).toEqual(3);
      expect(countDigits(1000)).toEqual(4);
      expect(countDigits(7)).toEqual(1);
    });

    test('you should be able to return the largest digit in the number', () => {
      expect(largestDigit(123)).toEqual(3);
      expect(largestDigit(987)).toEqual(9);
      expect(largestDigit(-456)).toEqual(6);
      expect(largestDigit(0)).toEqual(0);
      expect(largestDigit(1000)).toEqual(1);
    });

    test('you should be able to multiply all digits in a number together', () => {
      expect(multiplyDigits(123)).toEqual(6);
      expect(multiplyDigits(505)).toEqual(0);
      expect(multiplyDigits(999)).toEqual(729);
      expect(multiplyDigits(-123)).toEqual(6);
      expect(multiplyDigits(7)).toEqual(7);
    });

    test('you should be able to check if all digits in a number are prime', () => {
      expect(allPrimeDigits(2357)).toBeTruthy();
      expect(allPrimeDigits(2468)).toBeFalsy();
      expect(allPrimeDigits(23)).toBeTruthy();
      expect(allPrimeDigits(1357)).toBeFalsy();
      expect(allPrimeDigits(7)).toBeTruthy();
    });
  });

  // ====================================================================
  // CATEGORY 2: NUMBER VALIDATION & TYPE CHECKING
  // ====================================================================

  describe('Number Validation & Type Checking', () => {
    test('you should be able to validate if a value is a valid finite number', () => {
      expect(isValidNumber(42)).toBeTruthy();
      expect(isValidNumber(3.14)).toBeTruthy();
      expect(isValidNumber(0)).toBeTruthy();
      expect(isValidNumber(-5)).toBeTruthy();
      expect(isValidNumber(NaN)).toBeFalsy();
      expect(isValidNumber(Infinity)).toBeFalsy();
      expect(isValidNumber(-Infinity)).toBeFalsy();
      expect(isValidNumber('123')).toBeFalsy();
      expect(isValidNumber(null)).toBeFalsy();
      expect(isValidNumber(undefined)).toBeFalsy();
    });

    test('you should be able to check if a number is within safe integer range', () => {
      expect(isSafeInteger(123)).toBeTruthy();
      expect(isSafeInteger(9007199254740991)).toBeTruthy(); // Number.MAX_SAFE_INTEGER
      expect(isSafeInteger(-9007199254740991)).toBeTruthy(); // Number.MIN_SAFE_INTEGER
      expect(isSafeInteger(9007199254740992)).toBeFalsy();
      expect(isSafeInteger(3.14)).toBeFalsy();
      expect(isSafeInteger(NaN)).toBeFalsy();
      expect(isSafeInteger(Infinity)).toBeFalsy();
    });

    test('you should be able to check if a number is a power of two', () => {
      expect(isPowerOfTwo(1)).toBeTruthy(); // 2^0
      expect(isPowerOfTwo(2)).toBeTruthy(); // 2^1
      expect(isPowerOfTwo(8)).toBeTruthy(); // 2^3
      expect(isPowerOfTwo(16)).toBeTruthy(); // 2^4
      expect(isPowerOfTwo(1024)).toBeTruthy(); // 2^10
      expect(isPowerOfTwo(3)).toBeFalsy();
      expect(isPowerOfTwo(0)).toBeFalsy();
      expect(isPowerOfTwo(-8)).toBeFalsy();
      expect(isPowerOfTwo(6)).toBeFalsy();
    });
  });

  // ====================================================================
  // CATEGORY 3: NUMBER PARSING & CONVERSION
  // ====================================================================

  describe('Number Parsing & Conversion', () => {
    test('you should be able to parse numbers from strings in various formats', () => {
      expect(parseNumber('123')).toEqual(123);
      expect(parseNumber('3.14')).toEqual(3.14);
      expect(parseNumber('  42  ')).toEqual(42);
      expect(parseNumber('123abc')).toEqual(123);
      expect(parseNumber('0xFF')).toEqual(255);
      expect(parseNumber('0b1010')).toEqual(10);
      expect(isNaN(parseNumber('abc123'))).toBeTruthy();
      expect(isNaN(parseNumber('hello'))).toBeTruthy();
    });

    test('you should be able to convert numbers to different bases', () => {
      expect(convertToBase(10, 2)).toEqual('1010');
      expect(convertToBase(255, 16)).toEqual('ff');
      expect(convertToBase(8, 8)).toEqual('10');
      expect(convertToBase(35, 36)).toEqual('z');
      expect(convertToBase(0, 2)).toEqual('0');
      expect(convertToBase(16, 16)).toEqual('10');
    });

    test('you should be able to convert temperatures', () => {
      expect(convertTemperature(0, 'toF')).toEqual(32);
      expect(convertTemperature(32, 'toC')).toEqual(0);
      expect(convertTemperature(100, 'toF')).toEqual(212);
      expect(convertTemperature(98.6, 'toC')).toBeCloseTo(37, 1);
      expect(convertTemperature(-40, 'toF')).toEqual(-40);
      expect(convertTemperature(-40, 'toC')).toEqual(-40);
    });
  });

  // ====================================================================
  // CATEGORY 4: MATHEMATICAL OPERATIONS & CALCULATIONS
  // ====================================================================

  describe('Mathematical Operations & Calculations', () => {
    test('you should be able to calculate factorials', () => {
      expect(factorial(0)).toEqual(1);
      expect(factorial(1)).toEqual(1);
      expect(factorial(5)).toEqual(120);
      expect(factorial(10)).toEqual(3628800);
      expect(factorial(-1)).toBeUndefined();
      expect(factorial(3.5)).toBeUndefined();
    });

    test('you should be able to find the greatest common divisor', () => {
      expect(gcd(12, 18)).toEqual(6);
      expect(gcd(15, 25)).toEqual(5);
      expect(gcd(7, 13)).toEqual(1);
      expect(gcd(0, 5)).toEqual(5);
      expect(gcd(-12, 18)).toEqual(6);
      expect(gcd(48, 18)).toEqual(6);
      expect(gcd(17, 19)).toEqual(1);
    });

    test('you should be able to calculate the average of an array', () => {
      expect(average([1, 2, 3, 4, 5])).toEqual(3);
      expect(average([10, 20])).toEqual(15);
      expect(average([7])).toEqual(7);
      expect(average([])).toEqual(0);
      expect(average([1.5, 2.5, 3.5])).toEqual(2.5);
      expect(average([0, 0, 0])).toEqual(0);
    });

    test('you should be able to calculate compound interest', () => {
      expect(compoundInterest(1000, 0.05, 1, 1)).toBeCloseTo(1050, 2);
      expect(compoundInterest(1000, 0.05, 12, 2)).toBeCloseTo(1104.94, 2);
      expect(compoundInterest(1500, 0.043, 4, 6)).toBeCloseTo(1938.84, 2);
      expect(compoundInterest(5000, 0.08, 1, 10)).toBeCloseTo(10794.62, 2);
    });
  });

  // ====================================================================
  // CATEGORY 5: NUMBER FORMATTING & PRECISION
  // ====================================================================

  describe('Number Formatting & Precision', () => {
    test('you should be able to fix floating point precision issues', () => {
      expect(fixPrecision(0.1 + 0.2, 1)).toEqual(0.3);
      expect(fixPrecision(0.1 + 0.2, 2)).toEqual(0.3);
      expect(fixPrecision(1.005, 2)).toEqual(1.01);
      expect(fixPrecision(123.456789, 3)).toEqual(123.457);
      expect(fixPrecision(2.675, 2)).toEqual(2.68);
    });

    test('you should be able to round numbers using different methods', () => {
      expect(roundNumber(4.7, 'floor')).toEqual(4);
      expect(roundNumber(4.7, 'ceil')).toEqual(5);
      expect(roundNumber(4.7, 'round')).toEqual(5);
      expect(roundNumber(4.7, 'trunc')).toEqual(4);
      expect(roundNumber(-4.7, 'floor')).toEqual(-5);
      expect(roundNumber(-4.7, 'ceil')).toEqual(-4);
      expect(roundNumber(-4.7, 'round')).toEqual(-5);
      expect(roundNumber(-4.7, 'trunc')).toEqual(-4);
    });

    test('you should be able to calculate percentages', () => {
      expect(calculatePercentage(25, 100, 0)).toEqual(25);
      expect(calculatePercentage(1, 3, 2)).toEqual(33.33);
      expect(calculatePercentage(5, 8, 1)).toEqual(62.5);
      expect(calculatePercentage(0, 100, 0)).toEqual(0);
      expect(calculatePercentage(3, 4, 3)).toEqual(75.0);
    });
  });

  // ====================================================================
  // CATEGORY 6: UTILITY FUNCTIONS & RANGE OPERATIONS
  // ====================================================================

  describe('Utility Functions & Range Operations', () => {
    test('you should be able to generate random numbers within a range', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomBetween(1, 6);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
        expect(Number.isInteger(result)).toBeTruthy();
      }

      for (let i = 0; i < 50; i++) {
        const result = randomBetween(-5, 5);
        expect(result).toBeGreaterThanOrEqual(-5);
        expect(result).toBeLessThanOrEqual(5);
        expect(Number.isInteger(result)).toBeTruthy();
      }
    });

    test('you should be able to clamp numbers within a range', () => {
      expect(clampNumber(5, 1, 10)).toEqual(5);
      expect(clampNumber(-5, 1, 10)).toEqual(1);
      expect(clampNumber(15, 1, 10)).toEqual(10);
      expect(clampNumber(3.7, 2.5, 4.2)).toEqual(3.7);
      expect(clampNumber(2.0, 2.5, 4.2)).toEqual(2.5);
      expect(clampNumber(5.0, 2.5, 4.2)).toEqual(4.2);
    });
  });
});
