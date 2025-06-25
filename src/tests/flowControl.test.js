import { describe, test, expect } from 'vitest';
import {
  fizzBuzz,
  getLetterGrade,
  getDayType,
  getValueOrDefault,
  getNullishDefault,
  getUserCity,
  findFirstEven,
  countNonNegative,
  findMaxInNested,
  findPairWithSum,
  validatePassword,
  safeArrayAccess,
  calculateShipping,
  getHttpMessage,
  trafficLight,
  processNumbers,
  transformByType,
  simpleRetry
} from '../exercises/flowControl';

describe('flow control', () => {
  describe('fizzBuzz', () => {
    test('should be able to conditionally branch your code', () => {
      let num = 0;

      while (num % 3 === 0 || num % 5 === 0) {
        num = Math.floor(Math.random() * 10) + 1;
      }

      expect(fizzBuzz()).toBeFalsy();
      expect(fizzBuzz('foo')).toBeFalsy();
      expect(fizzBuzz(2)).toEqual(2);
      expect(fizzBuzz(101)).toEqual(101);

      expect(fizzBuzz(3)).toEqual('fizz');
      expect(fizzBuzz(6)).toEqual('fizz');
      expect(fizzBuzz(num * 3)).toEqual('fizz');

      expect(fizzBuzz(5)).toEqual('buzz');
      expect(fizzBuzz(10)).toEqual('buzz');
      expect(fizzBuzz(num * 5)).toEqual('buzz');

      expect(fizzBuzz(15)).toEqual('fizzbuzz');
      expect(fizzBuzz(num * 3 * 5)).toEqual('fizzbuzz');
    });
  });

  describe('getLetterGrade', () => {
    test('should return correct letter grades for valid scores', () => {
      expect(getLetterGrade(95)).toBe('A');
      expect(getLetterGrade(90)).toBe('A');
      expect(getLetterGrade(89)).toBe('B');
      expect(getLetterGrade(80)).toBe('B');
      expect(getLetterGrade(79)).toBe('C');
      expect(getLetterGrade(70)).toBe('C');
      expect(getLetterGrade(69)).toBe('D');
      expect(getLetterGrade(60)).toBe('D');
      expect(getLetterGrade(59)).toBe('F');
      expect(getLetterGrade(0)).toBe('F');
    });

    test('should return Invalid for invalid inputs', () => {
      expect(getLetterGrade(-5)).toBe('Invalid');
      expect(getLetterGrade(101)).toBe('Invalid');
      expect(getLetterGrade('85')).toBe('Invalid');
      expect(getLetterGrade(null)).toBe('Invalid');
      expect(getLetterGrade(undefined)).toBe('Invalid');
    });
  });

  describe('getDayType', () => {
    test('should return weekday for days 1-5', () => {
      expect(getDayType(1)).toBe('weekday');
      expect(getDayType(2)).toBe('weekday');
      expect(getDayType(3)).toBe('weekday');
      expect(getDayType(4)).toBe('weekday');
      expect(getDayType(5)).toBe('weekday');
    });

    test('should return weekend for days 6-7', () => {
      expect(getDayType(6)).toBe('weekend');
      expect(getDayType(7)).toBe('weekend');
    });

    test('should return invalid for invalid inputs', () => {
      expect(getDayType(0)).toBe('invalid');
      expect(getDayType(8)).toBe('invalid');
      expect(getDayType(-1)).toBe('invalid');
      expect(getDayType('5')).toBe('invalid');
      expect(getDayType(null)).toBe('invalid');
    });
  });

  describe('getValueOrDefault', () => {
    test('should return input for truthy values', () => {
      expect(getValueOrDefault('hello')).toBe('hello');
      expect(getValueOrDefault(1)).toBe(1);
      expect(getValueOrDefault(true)).toBe(true);
      expect(getValueOrDefault([])).toEqual([]);
      expect(getValueOrDefault({})).toEqual({});
    });

    test('should return default for falsy values', () => {
      expect(getValueOrDefault('')).toBe('default');
      expect(getValueOrDefault(0)).toBe('default');
      expect(getValueOrDefault(false)).toBe('default');
      expect(getValueOrDefault(null)).toBe('default');
      expect(getValueOrDefault(undefined)).toBe('default');
    });
  });

  describe('getNullishDefault', () => {
    test('should return input for non-nullish values', () => {
      expect(getNullishDefault('hello')).toBe('hello');
      expect(getNullishDefault(0)).toBe(0);
      expect(getNullishDefault(false)).toBe(false);
      expect(getNullishDefault('')).toBe('');
      expect(getNullishDefault([])).toEqual([]);
    });

    test('should return N/A for null/undefined', () => {
      expect(getNullishDefault(null)).toBe('N/A');
      expect(getNullishDefault(undefined)).toBe('N/A');
    });
  });

  describe('getUserCity', () => {
    test('should return city when present', () => {
      const data = { user: { address: { city: 'NYC' } } };
      expect(getUserCity(data)).toBe('NYC');
    });

    test('should return Unknown when city is missing', () => {
      expect(getUserCity({ user: { address: {} } })).toBe('Unknown');
      expect(getUserCity({ user: {} })).toBe('Unknown');
      expect(getUserCity({})).toBe('Unknown');
      expect(getUserCity(null)).toBe('Unknown');
      expect(getUserCity(undefined)).toBe('Unknown');
    });
  });

  describe('findFirstEven', () => {
    test('should return first even number', () => {
      expect(findFirstEven([1, 3, 4, 7, 8])).toBe(4);
      expect(findFirstEven([2, 1, 3])).toBe(2);
      expect(findFirstEven([1, 2, 3, 4])).toBe(2);
    });

    test('should return null when no even numbers', () => {
      expect(findFirstEven([1, 3, 5])).toBe(null);
      expect(findFirstEven([1, 7, 9, 11])).toBe(null);
      expect(findFirstEven([])).toBe(null);
    });
  });

  describe('countNonNegative', () => {
    test('should count non-negative numbers', () => {
      expect(countNonNegative([1, -2, 3, -4, 5])).toBe(3);
      expect(countNonNegative([1, 2, 3])).toBe(3);
      expect(countNonNegative([0, 1, 2])).toBe(3);
    });

    test('should return 0 for all negative numbers', () => {
      expect(countNonNegative([-1, -2, -3])).toBe(0);
      expect(countNonNegative([-5, -10])).toBe(0);
    });

    test('should handle empty array', () => {
      expect(countNonNegative([])).toBe(0);
    });
  });

  describe('findMaxInNested', () => {
    test('should find maximum across nested arrays', () => {
      expect(findMaxInNested([[1, 2], [3, 4], [5]])).toBe(5);
      expect(findMaxInNested([[1], [2, 3]])).toBe(3);
      expect(findMaxInNested([[10, 20], [5, 15], [25]])).toBe(25);
    });

    test('should handle negative numbers', () => {
      expect(
        findMaxInNested([
          [-1, -2],
          [-3, -4]
        ])
      ).toBe(-1);
    });

    test('should return -Infinity for empty arrays', () => {
      expect(findMaxInNested([])).toBe(-Infinity);
      expect(findMaxInNested([[], []])).toBe(-Infinity);
    });
  });

  describe('findPairWithSum', () => {
    test('should find pair that sums to target', () => {
      const result = findPairWithSum([1, 2, 3, 4], 5);
      expect(result).toEqual(expect.arrayContaining([1, 4]));
      expect(result[0] + result[1]).toBe(5);
    });

    test('should return null when no pair found', () => {
      expect(findPairWithSum([1, 2, 3], 10)).toBe(null);
      expect(findPairWithSum([1, 1, 1], 3)).toBe(null);
    });

    test('should handle empty array', () => {
      expect(findPairWithSum([], 5)).toBe(null);
    });
  });

  describe('validatePassword', () => {
    test('should return true for valid passwords', () => {
      expect(validatePassword('Abc123456')).toBe(true);
      expect(validatePassword('MyPassword1')).toBe(true);
      expect(validatePassword('Test123ABC')).toBe(true);
    });

    test('should return appropriate error messages', () => {
      expect(validatePassword('short')).toBe('Must be at least 8 characters');
      expect(validatePassword('nouppercase123')).toBe(
        'Must contain uppercase letter'
      );
      expect(validatePassword('NOLOWERCASE123')).toBe(
        'Must contain lowercase letter'
      );
      expect(validatePassword('NoNumbers')).toBe('Must contain number');
    });
  });

  describe('safeArrayAccess', () => {
    test('should return element at valid index', () => {
      expect(safeArrayAccess([1, 2, 3], 0)).toBe(1);
      expect(safeArrayAccess([1, 2, 3], 1)).toBe(2);
      expect(safeArrayAccess([1, 2, 3], 2)).toBe(3);
    });

    test('should return error message for invalid access', () => {
      expect(safeArrayAccess([1, 2, 3], 5)).toBe('Index out of bounds');
      expect(safeArrayAccess([1, 2, 3], -1)).toBe('Index out of bounds');
      expect(safeArrayAccess(null, 0)).toBe('Index out of bounds');
      expect(safeArrayAccess(undefined, 0)).toBe('Index out of bounds');
    });
  });

  describe('calculateShipping', () => {
    test('should calculate shipping with standard priority', () => {
      expect(calculateShipping(2, 250, 'standard')).toBe(10.0);
      expect(calculateShipping(1, 100, 'standard')).toBe(6.0);
      expect(calculateShipping(1, 50, 'standard')).toBe(5.0);
    });

    test('should calculate shipping with express priority', () => {
      expect(calculateShipping(1, 100, 'express')).toBe(9.0);
      expect(calculateShipping(2, 200, 'express')).toBe(13.5);
    });

    test('should calculate shipping with overnight priority', () => {
      expect(calculateShipping(3, 300, 'overnight')).toBe(24.0);
      expect(calculateShipping(1, 100, 'overnight')).toBe(12.0);
    });
  });

  describe('getHttpMessage', () => {
    test('should return appropriate messages for status codes', () => {
      expect(getHttpMessage(200)).toBe('Success');
      expect(getHttpMessage(201)).toBe('Success');
      expect(getHttpMessage(404)).toBe('Not Found');
      expect(getHttpMessage(500)).toBe('Server Error');
      expect(getHttpMessage(502)).toBe('Server Error');
      expect(getHttpMessage(999)).toBe('Unknown Status');
    });
  });

  describe('trafficLight', () => {
    test('should handle normal state transitions', () => {
      expect(trafficLight('red', 'next')).toBe('green');
      expect(trafficLight('green', 'next')).toBe('yellow');
      expect(trafficLight('yellow', 'next')).toBe('red');
    });

    test('should handle emergency transitions', () => {
      expect(trafficLight('green', 'emergency')).toBe('red');
      expect(trafficLight('yellow', 'emergency')).toBe('red');
      expect(trafficLight('red', 'emergency')).toBe('red');
    });
  });

  describe('processNumbers', () => {
    test('should return statistics for number objects', () => {
      const result = processNumbers([{ value: 1 }, { value: 2 }, { value: 3 }]);
      expect(result).toEqual({
        total: 6,
        average: 2,
        min: 1,
        max: 3,
        evenCount: 1
      });
    });

    test('should handle mixed even/odd numbers', () => {
      const result = processNumbers([{ value: 2 }, { value: 4 }, { value: 6 }]);
      expect(result).toEqual({
        total: 12,
        average: 4,
        min: 2,
        max: 6,
        evenCount: 3
      });
    });

    test('should handle empty array', () => {
      const result = processNumbers([]);
      expect(result).toEqual({
        total: 0,
        average: 0,
        min: Infinity,
        max: -Infinity,
        evenCount: 0
      });
    });
  });

  describe('transformByType', () => {
    test('should transform elements based on type', () => {
      expect(transformByType([1, 'hello', true, 3])).toEqual([
        1,
        'HELLO',
        true,
        9
      ]);
      expect(transformByType(['a', 2, null])).toEqual(['A', 4, null]);
    });

    test('should handle mixed types', () => {
      expect(transformByType([4, 'world', {}, 'test'])).toEqual([
        16,
        'WORLD',
        {},
        'TEST'
      ]);
    });

    test('should handle empty array', () => {
      expect(transformByType([])).toEqual([]);
    });
  });

  describe('simpleRetry', () => {
    test('should return result on success', () => {
      const alwaysSuccess = () => 'success';
      expect(simpleRetry(alwaysSuccess, 3)).toBe('success');
    });

    test('should return null after max retries', () => {
      const alwaysFail = () => false;
      expect(simpleRetry(alwaysFail, 3)).toBe(null);
    });

    test('should succeed after some retries', () => {
      let attempt = 0;
      const eventualSuccess = () => {
        attempt++;
        return attempt >= 3 ? 'success' : false;
      };
      expect(simpleRetry(eventualSuccess, 5)).toBe('success');
    });
  });
});
