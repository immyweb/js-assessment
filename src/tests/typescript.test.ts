import { describe, test, expect, vi } from 'vitest';

import {
  // Basic Types
  getType,
  getStringLength,
  addValues,
  sumArray,
  // Interfaces and Type Aliases
  greetPerson,
  calculateShapeArea,
  // Functions and Generics
  reverseArray,
  getProperty,
  mergeObjects,
  // Advanced Types
  updateUser,
  getNestedValue,
  memoize
} from '../exercises/typescript';

describe('TypeScript Fundamentals', () => {
  describe('Basic Types', () => {
    describe('getType', () => {
      test('should return the correct type of primitives', () => {
        expect(getType(42)).toBe('number');
        expect(getType('hello')).toBe('string');
        expect(getType(true)).toBe('boolean');
        expect(getType(undefined)).toBe('undefined');
      });

      test('should handle objects correctly', () => {
        expect(getType(null)).toBe('object');
        expect(getType({})).toBe('object');
        expect(getType([])).toBe('object');
        expect(getType(() => {})).toBe('function');
      });
    });

    describe('getStringLength', () => {
      test('should return the length of a string', () => {
        expect(getStringLength('hello')).toBe(5);
        expect(getStringLength('')).toBe(0);
        expect(getStringLength('TypeScript')).toBe(10);
      });
    });

    describe('addValues', () => {
      test('should add two numbers and return a string', () => {
        expect(addValues(5, 10)).toBe('15');
      });

      test('should convert strings to numbers and add them', () => {
        expect(addValues('5', 10)).toBe('15');
        expect(addValues(5, '10')).toBe('15');
        expect(addValues('5', '10')).toBe('15');
      });

      test('should concatenate when strings cannot be converted to numbers', () => {
        expect(addValues('5', 'abc')).toBe('5abc');
        expect(addValues('abc', 5)).toBe('abc5');
      });
    });

    describe('sumArray', () => {
      test('should sum an array of numbers', () => {
        expect(sumArray([1, 2, 3])).toBe(6);
        expect(sumArray([-1, 0, 1])).toBe(0);
      });

      test('should convert string numbers and sum them', () => {
        expect(sumArray(['1', '2', '3'])).toBe(6);
      });

      test('should ignore strings that cannot be parsed', () => {
        expect(sumArray([1, '2', 3, 'four'])).toBe(6);
        expect(sumArray(['one', 'two', 'three'])).toBe(0);
      });
    });
  });

  describe('Interfaces and Type Aliases', () => {
    describe('greetPerson', () => {
      test('should greet a person with name and age', () => {
        const john = { name: 'John', age: 30 };
        expect(greetPerson(john)).toBe('Hello, John! You are 30 years old.');
      });

      test('should include email if provided', () => {
        const jane = { name: 'Jane', age: 25, email: 'jane@example.com' };
        expect(greetPerson(jane)).toBe(
          'Hello, Jane! You are 25 years old. Contact: jane@example.com'
        );
      });
    });

    describe('calculateShapeArea', () => {
      test('should calculate area of a circle', () => {
        expect(calculateShapeArea({ kind: 'circle', radius: 5 })).toBeCloseTo(
          78.54,
          2
        );
      });

      test('should calculate area of a rectangle', () => {
        expect(
          calculateShapeArea({ kind: 'rectangle', width: 4, height: 5 })
        ).toBe(20);
      });

      test('should calculate area of a triangle', () => {
        expect(
          calculateShapeArea({ kind: 'triangle', base: 8, height: 6 })
        ).toBe(24);
      });
    });
  });

  describe('Functions and Generics', () => {
    describe('reverseArray', () => {
      test('should reverse an array of numbers', () => {
        expect(reverseArray([1, 2, 3])).toEqual([3, 2, 1]);
      });

      test('should reverse an array of strings', () => {
        expect(reverseArray(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
      });

      test('should handle empty arrays', () => {
        expect(reverseArray([])).toEqual([]);
      });
    });

    describe('getProperty', () => {
      test('should return the value at the specified key', () => {
        const obj = { name: 'John', age: 30 };
        expect(getProperty(obj, 'name')).toBe('John');
        expect(getProperty(obj, 'age')).toBe(30);
      });
    });

    describe('mergeObjects', () => {
      test('should merge two objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        expect(mergeObjects(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
      });

      test('should handle empty objects', () => {
        const obj1 = { a: 1, b: 2 };
        expect(mergeObjects(obj1, {})).toEqual({ a: 1, b: 2 });
        expect(mergeObjects({}, obj1)).toEqual({ a: 1, b: 2 });
      });
    });
  });

  describe('Advanced Types', () => {
    describe('updateUser', () => {
      test('should update specific properties', () => {
        const user = { id: 1, name: 'John', email: 'john@example.com' };
        expect(updateUser(user, { name: 'Jane' })).toEqual({
          id: 1,
          name: 'Jane',
          email: 'john@example.com'
        });
      });

      test('should handle multiple updates', () => {
        const user = { id: 1, name: 'John', email: 'john@example.com' };
        expect(
          updateUser(user, { name: 'Jane', email: 'jane@example.com' })
        ).toEqual({
          id: 1,
          name: 'Jane',
          email: 'jane@example.com'
        });
      });

      test('should not add new properties', () => {
        const user = { id: 1, name: 'John' };
        const result = updateUser(user, { age: 30 });
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('name', 'John');
        expect(result).not.toHaveProperty('age');
      });
    });

    describe('getNestedValue', () => {
      test('should access nested properties', () => {
        const obj = { user: { profile: { name: 'John', age: 30 } } };
        expect(getNestedValue(obj, 'user.profile.name')).toBe('John');
        expect(getNestedValue(obj, 'user.profile.age')).toBe(30);
      });

      test('should return undefined for non-existent paths', () => {
        const obj = { user: { profile: { name: 'John' } } };
        expect(getNestedValue(obj, 'user.settings.theme')).toBeUndefined();
      });
    });

    describe('memoize', () => {
      test('should cache function results', () => {
        const spy = vi.fn((a: number, b: number) => a * b);
        const memoized = memoize(spy);

        expect(memoized(2, 3)).toBe(6);
        expect(spy).toHaveBeenCalledTimes(1);

        expect(memoized(2, 3)).toBe(6);
        expect(spy).toHaveBeenCalledTimes(1); // Should not be called again

        expect(memoized(3, 4)).toBe(12);
        expect(spy).toHaveBeenCalledTimes(2); // Different args, should be called
      });
    });
  });
});
