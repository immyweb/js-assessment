import { describe, test, expect } from 'vitest';
import {
  reverseInt,
  isPalindrome,
  sumDigits,
  countDigits,
  largestDigit,
  multiplyDigits,
  allPrimeDigits
} from '../exercises/numbers';

describe('Numbers', () => {
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
