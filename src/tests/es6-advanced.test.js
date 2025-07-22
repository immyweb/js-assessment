import { describe, test, expect, vi } from 'vitest';

import {
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
  // Advanced ES6+ Patterns
  createAdvancedDataStructure,
  createReactiveObject,
  createPipeline
} from '../exercises/es6-advanced';

describe('ES6 Advanced: Symbols, Proxy/Reflect, Iterators, and Modules', () => {
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

      test('filter should exclude items that do not match predicate', async () => {
        const pipeline = createPipeline([1, 2, 3, 4, 5]);
        const result = await pipeline.filter((x) => x % 2 === 0).toArray();
        expect(result).toEqual([2, 4]);
      });

      test('map should transform each item', async () => {
        const pipeline = createPipeline([1, 2, 3]);
        const result = await pipeline.map((x) => x * 2).toArray();
        expect(result).toEqual([2, 4, 6]);
      });

      test('asyncMap should apply async transformations', async () => {
        const pipeline = createPipeline([1, 2, 3]);
        const result = await pipeline
          .asyncMap(async (x) => {
            return await Promise.resolve(x + 1);
          })
          .toArray();
        expect(result).toEqual([2, 3, 4]);
      });

      test('should execute complete pipeline example correctly', async () => {
        const result = await createPipeline([1, 2, 3, 4, 5])
          .filter((x) => x % 2 === 0)
          .map((x) => x * 2)
          .asyncMap(async (x) => await Promise.resolve(x + 1))
          .toArray();
        expect(result).toEqual([5, 9]);
      });

      test('should handle empty arrays', async () => {
        const result = await createPipeline([])
          .filter((x) => x > 0)
          .map((x) => x * 2)
          .toArray();
        expect(result).toEqual([]);
      });

      test('should preserve operation order', async () => {
        // If we filter after mapping, we should get different results
        // than if we map after filtering
        const filterThenMap = await createPipeline([1, 2, 3, 4])
          .filter((x) => x > 2)
          .map((x) => x * 2)
          .toArray();

        const mapThenFilter = await createPipeline([1, 2, 3, 4])
          .map((x) => x * 2)
          .filter((x) => x > 4)
          .toArray();

        expect(filterThenMap).toEqual([6, 8]);
        expect(mapThenFilter).toEqual([6, 8]);
        // They happen to be the same in this case, but the pipeline should
        // still apply operations in the correct order
      });
    });
  });
});
