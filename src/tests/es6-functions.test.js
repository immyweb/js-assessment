import { describe, test, expect, vi } from 'vitest';

import {
  // Arrow Functions and Enhanced Object Literals
  createEnhancedObject,
  createContextDemo,
  processNumbers,
  createCurryFunction,
  // Default Parameters and Parameter Handling
  complexDefaults,
  configureApp,
  sendEmail,
  processConfig,
  // Advanced Function Patterns
  compose,
  memoize,
  throttle,
  debounce
} from '../exercises/es6-functions';

describe('ES6 Functions: Arrow Functions, Object Literals, and Parameters', () => {
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

    describe('processConfig', () => {
      test('should combine options with rest parameters', () => {
        const result = processConfig({ debug: true }, 'main', 'secondary');
        expect(result.options.debug).toBe(true);
        expect(result.settings).toContain('main');
        expect(result.settings).toContain('secondary');
      });

      test('should use default options when not provided', () => {
        const result = processConfig(undefined, 'test');
        expect(result.options).toEqual({});
        expect(result.settings).toContain('test');
      });
    });
  });

  describe('Advanced Function Patterns', () => {
    describe('compose', () => {
      test('should compose functions from right to left', () => {
        const addOne = (x) => x + 1;
        const double = (x) => x * 2;
        const square = (x) => x * x;

        const composed = compose(square, double, addOne);
        expect(composed(3)).toBe(64); // square(double(addOne(3))) = square(double(4)) = square(8) = 64
      });

      test('should handle single function', () => {
        const double = (x) => x * 2;
        const composed = compose(double);
        expect(composed(5)).toBe(10);
      });
    });

    describe('memoize', () => {
      test('should cache function results', () => {
        const fn = vi.fn((n) => n * 2);
        const memoized = memoize(fn);

        memoized(42);
        memoized(42);
        expect(fn).toHaveBeenCalledTimes(1);
      });

      test('should return correct results', () => {
        const fn = (n) => n * 3;
        const memoized = memoize(fn);

        expect(memoized(5)).toBe(15);
        expect(memoized(10)).toBe(30);
      });
    });

    describe('throttle', () => {
      test('should limit function calls', () => {
        vi.useFakeTimers();
        const fn = vi.fn();
        const throttled = throttle(fn, 100);

        throttled();
        throttled();
        throttled();
        expect(fn).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);
        throttled();
        expect(fn).toHaveBeenCalledTimes(2);

        vi.useRealTimers();
      });
    });

    describe('debounce', () => {
      test('should delay function execution until input stops', () => {
        vi.useFakeTimers();
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50);
        debounced();
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(1);

        vi.useRealTimers();
      });
    });
  });
});
