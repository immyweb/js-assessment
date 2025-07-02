import { describe, test, expect } from 'vitest';

import {
  // Template Literals and String Features
  formatMessage,
  highlight,
  createHTML,
  getRawString,
  // Destructuring Assignment
  destructureArray,
  destructureUser,
  extractNested,
  calculateArea,
  // Spread and Rest Operators
  mergeArrays,
  mergeObjects,
  calculateStats,
  applyFunction
} from '../exercises/es6-basics';

describe('ES6 Basics: Template Literals, Destructuring, and Spread/Rest', () => {
  describe('Template Literals and String Features', () => {
    describe('formatMessage', () => {
      test('should create formatted message with template literals', () => {
        const result = formatMessage('John', 25, 'developer');
        expect(result).toMatch(/Hello John!/);
        expect(result).toMatch(/25 years old/);
        expect(result).toMatch(/work as a developer/);
        expect(result).toMatch(/Welcome to our platform!/);
      });

      test('should handle multi-line strings', () => {
        const result = formatMessage('Alice', 30, 'designer');
        expect(result).toContain('\n');
      });

      test('should interpolate all variables correctly', () => {
        const result = formatMessage('Bob', 35, 'manager');
        expect(result).toContain('Bob');
        expect(result).toContain('35');
        expect(result).toContain('manager');
      });
    });

    describe('highlight', () => {
      test('should wrap interpolated values in strong tags', () => {
        const result = highlight`Hello ${'John'}, you have ${5} messages`;
        expect(result).toBe(
          'Hello <strong>John</strong>, you have <strong>5</strong> messages'
        );
      });

      test('should handle multiple interpolations', () => {
        const result = highlight`User ${'Alice'} has ${10} points and ${3} badges`;
        expect(result).toContain('<strong>Alice</strong>');
        expect(result).toContain('<strong>10</strong>');
        expect(result).toContain('<strong>3</strong>');
      });

      test('should handle no interpolations', () => {
        const result = highlight`Simple string with no variables`;
        expect(result).toBe('Simple string with no variables');
      });
    });

    describe('createHTML', () => {
      test('should escape HTML special characters', () => {
        const result = createHTML('John', '<script>alert("xss")</script>');
        expect(result).toContain('&lt;script&gt;');
        expect(result).toContain('&lt;/script&gt;');
        expect(result).not.toContain('<script>');
      });

      test('should create proper HTML structure', () => {
        const result = createHTML('Alice', 'normal input');
        expect(result).toMatch(/<div>.*<\/div>/);
        expect(result).toContain('Alice');
        expect(result).toContain('normal input');
      });

      test('should escape other HTML entities', () => {
        const result = createHTML('Bob', '&<>"\'');
        expect(result).toContain('&amp;');
        expect(result).toContain('&lt;');
        expect(result).toContain('&gt;');
        expect(result).toContain('&quot;');
      });
    });

    describe('getRawString', () => {
      test('should preserve backslashes using String.raw', () => {
        const result = getRawString('path\\to\\file.txt');
        expect(result).toBe('path\\to\\file.txt');
      });

      test('should preserve other escape sequences', () => {
        const result = getRawString('line1\\nline2\\tindented');
        expect(result).toBe('line1\\nline2\\tindented');
      });
    });
  });

  describe('Destructuring Assignment', () => {
    describe('destructureArray', () => {
      test('should destructure array with all elements', () => {
        const result = destructureArray([1, 2, 3, 4, 5]);
        expect(result).toEqual({
          first: 1,
          second: 2,
          rest: [3, 4, 5]
        });
      });

      test('should handle partial arrays', () => {
        const result = destructureArray([1]);
        expect(result).toEqual({
          first: 1,
          second: undefined,
          rest: []
        });
      });

      test('should handle empty arrays', () => {
        const result = destructureArray([]);
        expect(result).toEqual({
          first: undefined,
          second: undefined,
          rest: []
        });
      });

      test('should handle arrays with two elements', () => {
        const result = destructureArray([10, 20]);
        expect(result).toEqual({
          first: 10,
          second: 20,
          rest: []
        });
      });
    });

    describe('destructureUser', () => {
      test('should destructure user with renaming and defaults', () => {
        const result = destructureUser({ name: 'John', age: 25 });
        expect(result).toEqual({
          userName: 'John',
          userAge: 25,
          userEmail: 'N/A'
        });
      });

      test('should use defaults for missing properties', () => {
        const result = destructureUser({ name: 'Alice' });
        expect(result).toEqual({
          userName: 'Alice',
          userAge: 18,
          userEmail: 'N/A'
        });
      });

      test('should override defaults when properties exist', () => {
        const result = destructureUser({
          name: 'Bob',
          age: 30,
          email: 'bob@example.com'
        });
        expect(result).toEqual({
          userName: 'Bob',
          userAge: 30,
          userEmail: 'bob@example.com'
        });
      });
    });

    describe('extractNested', () => {
      test('should extract deeply nested values', () => {
        const data = {
          user: {
            profile: { name: 'John', location: { city: 'NYC' } },
            hobbies: ['reading', 'coding']
          }
        };
        const result = extractNested(data);
        expect(result).toEqual({
          name: 'John',
          city: 'NYC',
          firstHobby: 'reading'
        });
      });

      test('should handle missing nested properties', () => {
        const data = {
          user: {
            profile: { name: 'Alice' },
            hobbies: []
          }
        };
        const result = extractNested(data);
        expect(result.name).toBe('Alice');
        expect(result.city).toBeUndefined();
        expect(result.firstHobby).toBeUndefined();
      });
    });

    describe('calculateArea', () => {
      test('should calculate area with given dimensions', () => {
        const result = calculateArea({ width: 5, height: 3 });
        expect(result).toBe(15);
      });

      test('should use default height when not provided', () => {
        const result = calculateArea({ width: 5 });
        expect(result).toBe(50); // 5 * 10 (default height)
      });

      test('should use all defaults when no arguments', () => {
        const result = calculateArea();
        expect(result).toBe(100); // 10 * 10 (both defaults)
      });

      test('should use all defaults when empty object', () => {
        const result = calculateArea({});
        expect(result).toBe(100);
      });
    });
  });

  describe('Spread and Rest Operators', () => {
    describe('mergeArrays', () => {
      test('should merge multiple arrays and remove duplicates', () => {
        const result = mergeArrays([1, 2], [2, 3], [3, 4]);
        expect(result).toEqual([1, 2, 3, 4]);
      });

      test('should handle empty arrays', () => {
        const result = mergeArrays([], [1, 2], []);
        expect(result).toEqual([1, 2]);
      });

      test('should sort the result', () => {
        const result = mergeArrays([3, 1], [4, 2]);
        expect(result).toEqual([1, 2, 3, 4]);
      });
    });

    describe('mergeObjects', () => {
      test('should merge objects with later properties overriding', () => {
        const result = mergeObjects(
          { a: 1, b: 2 },
          { b: 3, c: 4 },
          { c: 5, d: 6 }
        );
        expect(result).toEqual({ a: 1, b: 3, c: 5, d: 6 });
      });

      test('should handle empty objects', () => {
        const result = mergeObjects({}, { a: 1 }, {});
        expect(result).toEqual({ a: 1 });
      });

      test('should handle single object', () => {
        const result = mergeObjects({ x: 10, y: 20 });
        expect(result).toEqual({ x: 10, y: 20 });
      });
    });

    describe('calculateStats', () => {
      test('should calculate statistics for multiple numbers', () => {
        const result = calculateStats(1, 2, 3, 4, 5);
        expect(result).toEqual({
          sum: 15,
          average: 3,
          min: 1,
          max: 5
        });
      });

      test('should handle single number', () => {
        const result = calculateStats(42);
        expect(result).toEqual({
          sum: 42,
          average: 42,
          min: 42,
          max: 42
        });
      });

      test('should handle negative numbers', () => {
        const result = calculateStats(-2, -1, 0, 1, 2);
        expect(result).toEqual({
          sum: 0,
          average: 0,
          min: -2,
          max: 2
        });
      });
    });

    describe('applyFunction', () => {
      test('should apply Math.max to array using spread', () => {
        const result = applyFunction(Math.max, [1, 5, 3, 9, 2]);
        expect(result).toBe(9);
      });

      test('should apply Math.min to array using spread', () => {
        const result = applyFunction(Math.min, [1, 5, 3, 9, 2]);
        expect(result).toBe(1);
      });

      test('should work with custom functions', () => {
        const add = (a, b, c) => a + b + c;
        const result = applyFunction(add, [1, 2, 3]);
        expect(result).toBe(6);
      });
    });
  });
});
