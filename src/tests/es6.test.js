import { describe, beforeEach, test, expect, vi } from 'vitest';

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
  applyFunction,
  // Arrow Functions and Enhanced Object Literals
  createEnhancedObject,
  createContextDemo,
  processNumbers,
  createCurryFunction,
  // Maps, Sets, WeakMap, and WeakSet
  countCharacters,
  setOperations,
  createPersonWithPrivateData,
  createObjectProcessor,
  // Symbols and Well-Known Symbols
  createSymbolObject,
  manageGlobalSymbols,
  createIterableRange,
  createCustomConversion,
  // Proxy and Reflect
  createLoggingProxy,
  createValidationProxy,
  dynamicMethodCall,
  createDefaultProxy,
  // Iterators and for...of
  createFibonacciIterator,
  createCompleteIterator,
  transformIterable,
  createAsyncIterator,
  // Default Parameters and Parameter Handling
  complexDefaults,
  configureApp,
  sendEmail,
  // Module Patterns
  createModuleNamespace,
  dynamicImport,
  createModule,
  createTreeShakeableBundle,
  // Advanced ES6+ Patterns
  createAdvancedDataStructure,
  createReactiveObject,
  createPipeline
} from '../exercises/es6';

describe('ES6+ Modern Features', () => {
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

  describe('Arrow Functions and Enhanced Object Literals', () => {
    describe('createEnhancedObject', () => {
      test('should create object with enhanced literal syntax', () => {
        const result = createEnhancedObject('name', 'John', 'getName');
        expect(result.name).toBe('John');
        expect(typeof result.getName).toBe('function');
        expect(result.getName()).toBe('John');
      });

      test('should support computed property names', () => {
        const result = createEnhancedObject('title', 'Developer', 'getTitle');
        expect(result.title).toBe('Developer');
        expect(typeof result.getTitle).toBe('function');
      });

      test('should include dynamic properties', () => {
        const result = createEnhancedObject('prop', 'value', 'getProp');
        expect(Object.keys(result)).toContain('prop');
        expect(Object.keys(result)).toContain('getProp');
      });
    });

    describe('createContextDemo', () => {
      test('should create object with different method types', () => {
        const obj = createContextDemo('test');
        expect(typeof obj.regularMethod).toBe('function');
        expect(typeof obj.arrowMethod).toBe('function');
      });

      test('should demonstrate context binding differences', () => {
        const obj = createContextDemo('test');
        // Regular method should have access to 'this'
        const regularResult = obj.regularMethod();
        expect(regularResult).toBe('test');
      });
    });

    describe('processNumbers', () => {
      test('should filter evens, square them, and sum', () => {
        const result = processNumbers([1, 2, 3, 4, 5, 6]);
        // Evens: 2, 4, 6 -> Squared: 4, 16, 36 -> Sum: 56
        expect(result).toBe(56);
      });

      test('should handle arrays with no even numbers', () => {
        const result = processNumbers([1, 3, 5]);
        expect(result).toBe(0);
      });

      test('should handle empty arrays', () => {
        const result = processNumbers([]);
        expect(result).toBe(0);
      });
    });

    describe('createCurryFunction', () => {
      test('should create curried function for full application', () => {
        const add = createCurryFunction((a, b, c) => a + b + c);
        const result = add(1)(2)(3);
        expect(result).toBe(6);
      });

      test('should support partial application', () => {
        const add = createCurryFunction((a, b, c) => a + b + c);
        const result = add(1, 2)(3);
        expect(result).toBe(6);
      });

      test('should work with different arities', () => {
        const multiply = createCurryFunction((a, b) => a * b);
        const result = multiply(3)(4);
        expect(result).toBe(12);
      });
    });
  });

  describe('Maps, Sets, WeakMap, and WeakSet', () => {
    describe('countCharacters', () => {
      test('should count character frequencies using Map', () => {
        const result = countCharacters('hello');
        expect(result instanceof Map).toBe(true);
        expect(result.get('h')).toBe(1);
        expect(result.get('e')).toBe(1);
        expect(result.get('l')).toBe(2);
        expect(result.get('o')).toBe(1);
      });

      test('should handle empty string', () => {
        const result = countCharacters('');
        expect(result instanceof Map).toBe(true);
        expect(result.size).toBe(0);
      });

      test('should handle repeated characters', () => {
        const result = countCharacters('aaaaaa');
        expect(result.get('a')).toBe(6);
        expect(result.size).toBe(1);
      });
    });

    describe('setOperations', () => {
      test('should perform set operations correctly', () => {
        const result = setOperations([1, 2, 3], [2, 3, 4]);
        expect(result.union.sort()).toEqual([1, 2, 3, 4]);
        expect(result.intersection.sort()).toEqual([2, 3]);
        expect(result.difference.sort()).toEqual([1]);
      });

      test('should handle disjoint sets', () => {
        const result = setOperations([1, 2], [3, 4]);
        expect(result.union.sort()).toEqual([1, 2, 3, 4]);
        expect(result.intersection).toEqual([]);
        expect(result.difference.sort()).toEqual([1, 2]);
      });

      test('should handle identical sets', () => {
        const result = setOperations([1, 2, 3], [1, 2, 3]);
        expect(result.union.sort()).toEqual([1, 2, 3]);
        expect(result.intersection.sort()).toEqual([1, 2, 3]);
        expect(result.difference).toEqual([]);
      });
    });

    describe('createPersonWithPrivateData', () => {
      test('should create person with private data access', () => {
        const person = createPersonWithPrivateData('John', 25);
        expect(typeof person.getName).toBe('function');
        expect(typeof person.getAge).toBe('function');
        expect(person.getName()).toBe('John');
        expect(person.getAge()).toBe(25);
      });

      test('should not expose private data directly', () => {
        const person = createPersonWithPrivateData('Alice', 30);
        expect(person.name).toBeUndefined();
        expect(person.age).toBeUndefined();
      });

      test('should work with different instances', () => {
        const person1 = createPersonWithPrivateData('John', 25);
        const person2 = createPersonWithPrivateData('Jane', 30);
        expect(person1.getName()).toBe('John');
        expect(person2.getName()).toBe('Jane');
      });
    });

    describe('createObjectProcessor', () => {
      test('should track processed objects using WeakSet', () => {
        const processor = createObjectProcessor();
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };

        expect(processor.process(obj1)).toBe('Processed');
        expect(processor.process(obj1)).toBe('Already processed');
        expect(processor.process(obj2)).toBe('Processed');
      });

      test('should handle multiple objects independently', () => {
        const processor = createObjectProcessor();
        const objA = { data: 'A' };
        const objB = { data: 'B' };

        processor.process(objA);
        expect(processor.process(objB)).toBe('Processed');
        expect(processor.process(objA)).toBe('Already processed');
      });
    });
  });

  describe('Symbols and Well-Known Symbols', () => {
    describe('createSymbolObject', () => {
      test('should create object with Symbol properties', () => {
        const obj = createSymbolObject('test data');
        expect(typeof obj[Symbol.iterator]).toBe('function');
        expect(obj[Symbol.toStringTag]).toBeDefined();
      });

      test('should make object iterable', () => {
        const obj = createSymbolObject('test');
        expect(typeof obj[Symbol.iterator]).toBe('function');
        // Should be able to use in for...of
        const values = [...obj];
        expect(Array.isArray(values)).toBe(true);
      });

      test('should have custom string tag', () => {
        const obj = createSymbolObject('data');
        const stringTag = obj[Symbol.toStringTag];
        expect(stringTag).toBeDefined();
      });
    });

    describe('manageGlobalSymbols', () => {
      test('should create and retrieve global symbols', () => {
        const sym1 = manageGlobalSymbols('app.config');
        const sym2 = manageGlobalSymbols('app.config');
        expect(sym1).toBe(sym2); // Should be the same symbol
      });

      test('should create different symbols for different keys', () => {
        const sym1 = manageGlobalSymbols('key1');
        const sym2 = manageGlobalSymbols('key2');
        expect(sym1).not.toBe(sym2);
      });

      test('should return Symbol type', () => {
        const sym = manageGlobalSymbols('test.key');
        expect(typeof sym).toBe('symbol');
      });
    });

    describe('createIterableRange', () => {
      test('should create iterable range object', () => {
        const range = createIterableRange(1, 5);
        const values = [...range];
        expect(values).toEqual([1, 2, 3, 4, 5]);
      });

      test('should work with for...of loop', () => {
        const range = createIterableRange(3, 6);
        const collected = [];
        for (const value of range) {
          collected.push(value);
        }
        expect(collected).toEqual([3, 4, 5, 6]);
      });

      test('should handle single value range', () => {
        const range = createIterableRange(5, 5);
        const values = [...range];
        expect(values).toEqual([5]);
      });
    });

    describe('createCustomConversion', () => {
      test('should convert to number with + operator', () => {
        const obj = createCustomConversion(42);
        expect(+obj).toBe(42);
      });

      test('should convert to string in template literal', () => {
        const obj = createCustomConversion(42);
        expect(`${obj}`).toBe('42');
      });

      test('should convert to string with + ""', () => {
        const obj = createCustomConversion(42);
        expect(obj + '').toBe('42');
      });
    });
  });

  describe('Proxy and Reflect', () => {
    describe('createLoggingProxy', () => {
      test('should log property access and modifications', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});
        const obj = createLoggingProxy({ name: 'John' });

        const value = obj.name;
        obj.age = 25;

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
      });

      test('should return correct property values', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});
        const obj = createLoggingProxy({ name: 'John', age: 30 });

        expect(obj.name).toBe('John');
        expect(obj.age).toBe(30);

        consoleSpy.mockRestore();
      });

      test('should allow property setting', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});
        const target = { name: 'John' };
        const obj = createLoggingProxy(target);

        obj.age = 25;
        expect(target.age).toBe(25);

        consoleSpy.mockRestore();
      });
    });

    describe('createValidationProxy', () => {
      test('should allow valid property assignments', () => {
        const rules = {
          name: (val) => typeof val === 'string',
          age: (val) => typeof val === 'number' && val >= 0
        };
        const person = createValidationProxy(rules);

        expect(() => {
          person.name = 'John';
          person.age = 25;
        }).not.toThrow();

        expect(person.name).toBe('John');
        expect(person.age).toBe(25);
      });

      test('should throw error for invalid assignments', () => {
        const rules = {
          name: (val) => typeof val === 'string',
          age: (val) => typeof val === 'number' && val >= 0
        };
        const person = createValidationProxy(rules);

        expect(() => {
          person.name = 123; // Invalid: should be string
        }).toThrow();

        expect(() => {
          person.age = -5; // Invalid: should be >= 0
        }).toThrow();
      });
    });

    describe('dynamicMethodCall', () => {
      test('should call methods dynamically using Reflect', () => {
        const obj = {
          add: (a, b) => a + b,
          multiply: (a, b, c) => a * b * c
        };

        const result1 = dynamicMethodCall(obj, 'add', [5, 3]);
        expect(result1).toBe(8);

        const result2 = dynamicMethodCall(obj, 'multiply', [2, 3, 4]);
        expect(result2).toBe(24);
      });

      test('should handle methods with no arguments', () => {
        const obj = {
          getValue: () => 42
        };

        const result = dynamicMethodCall(obj, 'getValue', []);
        expect(result).toBe(42);
      });
    });

    describe('createDefaultProxy', () => {
      test('should return default values for undefined properties', () => {
        const obj = createDefaultProxy({}, 'N/A');
        expect(obj.anyProperty).toBe('N/A');
        expect(obj.anotherProperty).toBe('N/A');
      });

      test('should return actual values for defined properties', () => {
        const target = { definedProp: 'actual value' };
        const obj = createDefaultProxy(target, 'N/A');

        expect(obj.definedProp).toBe('actual value');
        expect(obj.undefinedProp).toBe('N/A');
      });

      test('should allow setting new properties', () => {
        const target = {};
        const obj = createDefaultProxy(target, 'default');

        obj.newProp = 'new value';
        expect(obj.newProp).toBe('new value');
        expect(target.newProp).toBe('new value');
      });
    });
  });

  describe('Iterators and for...of', () => {
    describe('createFibonacciIterator', () => {
      test('should generate Fibonacci numbers up to limit', () => {
        const fib = createFibonacciIterator(100);
        const values = [...fib];
        expect(values).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);
      });

      test('should handle small limits', () => {
        const fib = createFibonacciIterator(5);
        const values = [...fib];
        expect(values).toEqual([0, 1, 1, 2, 3, 5]);
      });

      test('should handle limit of 0', () => {
        const fib = createFibonacciIterator(0);
        const values = [...fib];
        expect(values).toEqual([0]);
      });
    });

    describe('createCompleteIterator', () => {
      test('should implement complete iterator protocol', () => {
        const iter = createCompleteIterator([1, 2, 3]);

        expect(iter.next()).toEqual({ value: 1, done: false });
        expect(iter.next()).toEqual({ value: 2, done: false });
        expect(iter.next()).toEqual({ value: 3, done: false });
        expect(iter.next()).toEqual({ value: undefined, done: true });
      });

      test('should support return method', () => {
        const iter = createCompleteIterator([1, 2, 3]);
        iter.next(); // Start iteration

        const result = iter.return('early exit');
        expect(result).toEqual({ value: 'early exit', done: true });
      });

      test('should handle empty arrays', () => {
        const iter = createCompleteIterator([]);
        expect(iter.next()).toEqual({ value: undefined, done: true });
      });
    });

    describe('transformIterable', () => {
      test('should transform iterable values', () => {
        const doubled = transformIterable([1, 2, 3], (x) => x * 2);
        const values = [...doubled];
        expect(values).toEqual([2, 4, 6]);
      });

      test('should work with different transformations', () => {
        const squared = transformIterable([1, 2, 3, 4], (x) => x * x);
        const values = [...squared];
        expect(values).toEqual([1, 4, 9, 16]);
      });

      test('should handle empty iterables', () => {
        const result = transformIterable([], (x) => x * 2);
        const values = [...result];
        expect(values).toEqual([]);
      });
    });

    describe('createAsyncIterator', () => {
      test('should create async iterator', async () => {
        const asyncData = createAsyncIterator([1, 2, 3], 10);
        expect(typeof asyncData[Symbol.asyncIterator]).toBe('function');
      });

      test('should yield values with delays', async () => {
        const asyncData = createAsyncIterator([1, 2], 10);
        const values = [];

        for await (const value of asyncData) {
          values.push(value);
        }

        expect(values).toEqual([1, 2]);
      });
    });
  });

  describe('Default Parameters and Parameter Handling', () => {
    describe('complexDefaults', () => {
      test('should use provided parameters', () => {
        const result = complexDefaults('John', 1000, 'Hi John', {
          verbose: false
        });
        expect(result).toMatchObject({
          name: 'John',
          timestamp: 1000,
          greeting: 'Hi John',
          options: { verbose: false }
        });
      });

      test('should use computed defaults', () => {
        const result = complexDefaults('Alice');
        expect(result.name).toBe('Alice');
        expect(result.greeting).toContain('Alice');
        expect(typeof result.timestamp).toBe('number');
        expect(result.options.verbose).toBe(true);
      });
    });

    describe('configureApp', () => {
      test('should merge configurations with defaults', () => {
        const result = configureApp(
          { host: 'remote.db', port: 3306 },
          { timeout: 10000 }
        );

        expect(result.database.host).toBe('remote.db');
        expect(result.database.port).toBe(3306);
        expect(result.api.timeout).toBe(10000);
        expect(result.api.retries).toBe(3); // default
      });

      test('should use all defaults when no parameters', () => {
        const result = configureApp();
        expect(result.database.host).toBe('localhost');
        expect(result.database.port).toBe(5432);
        expect(result.api.timeout).toBe(3000);
        expect(result.api.retries).toBe(3);
      });
    });

    describe('sendEmail', () => {
      test('should send email with provided parameters', () => {
        const result = sendEmail({
          to: 'user@example.com',
          subject: 'Test Email',
          body: 'Hello World'
        });

        expect(result.to).toBe('user@example.com');
        expect(result.subject).toBe('Test Email');
        expect(result.body).toBe('Hello World');
      });

      test('should use defaults for missing parameters', () => {
        const result = sendEmail({ to: 'user@example.com' });

        expect(result.to).toBe('user@example.com');
        expect(result.subject).toBe('No Subject');
        expect(result.body).toBe('');
        expect(result.smtp).toBe('localhost');
        expect(result.port).toBe(587);
        expect(result.secure).toBe(false);
      });
    });
  });

  describe('Module Patterns', () => {
    describe('createModuleNamespace', () => {
      test('should create namespace-like object', () => {
        const utils = createModuleNamespace({
          add: (a, b) => a + b,
          subtract: (a, b) => a - b
        });

        expect(utils.add(1, 2)).toBe(3);
        expect(utils.subtract(5, 3)).toBe(2);
        expect(Object.keys(utils)).toContain('add');
        expect(Object.keys(utils)).toContain('subtract');
      });

      test('should handle empty exports', () => {
        const empty = createModuleNamespace({});
        expect(Object.keys(empty)).toEqual([]);
      });
    });

    describe('dynamicImport', () => {
      test('should return Promise for module', async () => {
        const modulePromise = dynamicImport('math');
        expect(modulePromise instanceof Promise).toBe(true);

        const module = await modulePromise;
        expect(typeof module).toBe('object');
      });

      test('should simulate different modules', async () => {
        const mathModule = await dynamicImport('math');
        const utilsModule = await dynamicImport('utils');

        expect(mathModule).toBeDefined();
        expect(utilsModule).toBeDefined();
      });
    });

    describe('createModule', () => {
      test('should create module with dependencies', () => {
        const moduleA = createModule('A', ['B']);
        expect(moduleA.name).toBe('A');
        expect(moduleA.dependencies).toContain('B');
      });

      test('should handle modules without dependencies', () => {
        const module = createModule('standalone');
        expect(module.name).toBe('standalone');
        expect(Array.isArray(module.dependencies)).toBe(true);
      });
    });

    describe('createTreeShakeableBundle', () => {
      test('should include only used exports', () => {
        const bundle = createTreeShakeableBundle(
          {
            add: (a, b) => a + b,
            multiply: (a, b) => a * b,
            unused: () => 'unused'
          },
          ['add', 'multiply']
        );

        expect(bundle.add).toBeDefined();
        expect(bundle.multiply).toBeDefined();
        expect(bundle.unused).toBeUndefined();
      });

      test('should handle empty used exports', () => {
        const bundle = createTreeShakeableBundle({ add: (a, b) => a + b }, []);

        expect(Object.keys(bundle)).toEqual([]);
      });
    });
  });

  describe('Advanced ES6+ Patterns', () => {
    describe('createAdvancedDataStructure', () => {
      test('should create advanced data structure', () => {
        const data = [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ];
        const advanced = createAdvancedDataStructure(data);

        expect(advanced.findByName('John')).toEqual({ id: 1, name: 'John' });
        expect(advanced.size).toBe(2);
      });

      test('should handle empty data', () => {
        const advanced = createAdvancedDataStructure([]);
        expect(advanced.size).toBe(0);
      });
    });

    describe('createReactiveObject', () => {
      test('should create reactive object with computed properties', () => {
        const reactive = createReactiveObject({
          firstName: 'John',
          lastName: 'Doe',
          get fullName() {
            return `${this.firstName} ${this.lastName}`;
          }
        });

        expect(reactive.fullName).toBe('John Doe');

        reactive.firstName = 'Jane';
        expect(reactive.fullName).toBe('Jane Doe');
      });

      test('should update computed properties automatically', () => {
        const reactive = createReactiveObject({
          width: 5,
          height: 3,
          get area() {
            return this.width * this.height;
          }
        });

        expect(reactive.area).toBe(15);

        reactive.width = 10;
        expect(reactive.area).toBe(30);
      });
    });

    describe('createPipeline', () => {
      test('should create pipeline with chained operations', async () => {
        const pipeline = createPipeline([1, 2, 3, 4, 5, 6]);

        expect(typeof pipeline.filter).toBe('function');
        expect(typeof pipeline.map).toBe('function');
        expect(typeof pipeline.asyncMap).toBe('function');
        expect(typeof pipeline.toArray).toBe('function');
      });

      test('should support method chaining', async () => {
        const pipeline = createPipeline([1, 2, 3, 4]);
        const chained = pipeline.filter((x) => x % 2 === 0);

        expect(typeof chained.map).toBe('function');
        expect(typeof chained.toArray).toBe('function');
      });
    });
  });
});
