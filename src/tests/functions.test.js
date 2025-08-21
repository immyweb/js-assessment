import { describe, beforeEach, test, expect, vi } from 'vitest';
import {
  argsAsArray,
  speak,
  functionFunction,
  makeClosures,
  partial,
  useArguments,
  callIt,
  partialUsingArguments,
  curryIt,
  createThisExample,
  demonstrateHoisting,
  createPrivateCounter,
  functionAsValue,
  sumAll,
  createGreeting,
  createObjectWithMethods,
  compareFunctionTypes,
  updateUserImmutably,
  calculateTax,
  impureCounter,
  callCount,
  compose,
  pipe,
  Maybe,
  map,
  filter,
  reduce,
  processNumbers,
  Box,
  memoize
} from '../exercises/functions';

describe('Functions', () => {
  let sayItCalled = false;
  const sayIt = function (greeting, name, punctuation) {
    sayItCalled = true;
    return `${greeting}, ${name}${punctuation ? punctuation : '!'}`;
    // return greeting + ", " + name + (punctuation || "!");
  };

  beforeEach(() => {
    sayItCalled = false;
  });

  // ===== FUNCTION ARGUMENTS & APPLICATION =====
  describe('Function Arguments & Application', () => {
    test('you should be able to use an array as arguments when calling a function', () => {
      const result = argsAsArray(sayIt, ['Hello', 'Ellie', '!']);
      expect(result).toEqual('Hello, Ellie!');
      expect(sayItCalled).toBeTruthy();
    });

    test('you should be able to use arguments', () => {
      const a = Math.random();
      const b = Math.random();
      const c = Math.random();
      const d = Math.random();

      expect(useArguments(a)).toEqual(a);
      expect(useArguments(a, b)).toEqual(a + b);
      expect(useArguments(a, b, c)).toEqual(a + b + c);
      expect(useArguments(a, b, c, d)).toEqual(a + b + c + d);
    });

    test('you should be able to apply functions with arbitrary numbers of arguments', () => {
      const a = Math.random();
      const b = Math.random();
      const c = Math.random();

      let wasITake2ArgumentsCalled = false;
      const iTake2Arguments = function (firstArgument, secondArgument) {
        expect(arguments.length).toEqual(2);
        expect(firstArgument).toEqual(a);
        expect(secondArgument).toEqual(b);

        wasITake2ArgumentsCalled = true;
      };

      let wasITake3ArgumentsCalled = false;
      const iTake3Arguments = function (
        firstArgument,
        secondArgument,
        thirdArgument
      ) {
        expect(arguments.length).toEqual(3);
        expect(firstArgument).toEqual(a);
        expect(secondArgument).toEqual(b);
        expect(thirdArgument).toEqual(c);

        wasITake3ArgumentsCalled = true;
      };

      callIt(iTake2Arguments, a, b);
      callIt(iTake3Arguments, a, b, c);

      expect(wasITake2ArgumentsCalled).toBeTruthy();
      expect(wasITake3ArgumentsCalled).toBeTruthy();
    });

    describe('sumAll', () => {
      test('should sum multiple numbers', () => {
        expect(sumAll(1, 2, 3)).toBe(6);
        expect(sumAll(10, 20)).toBe(30);
        expect(sumAll(1, 2, 3, 4, 5)).toBe(15);
      });

      test('should return 0 for no arguments', () => {
        expect(sumAll()).toBe(0);
      });

      test('should handle single argument', () => {
        expect(sumAll(42)).toBe(42);
      });

      test('should handle negative numbers', () => {
        expect(sumAll(-1, -2, -3)).toBe(-6);
        expect(sumAll(5, -3, 2)).toBe(4);
      });
    });

    describe('createGreeting', () => {
      test('should use default parameters', () => {
        expect(createGreeting()).toBe('Hello, World!');
      });

      test('should use custom greeting with default name', () => {
        expect(createGreeting('Hi')).toBe('Hi, World!');
      });

      test('should use custom greeting and name', () => {
        expect(createGreeting('Hey', 'Alice')).toBe('Hey, Alice!');
      });

      test('should handle empty strings', () => {
        expect(createGreeting('', 'Bob')).toBe(', Bob!');
        expect(createGreeting('Hello', '')).toBe('Hello, !');
      });
    });
  });

  // ===== FUNCTION CONTEXT & SCOPE =====
  describe('Function Context & Scope', () => {
    test('you should be able to change the context in which a function is called', () => {
      const speak2 = function () {
        return sayIt(this.greeting, this.name, '!!!');
      };
      const obj = {
        greeting: 'Hello',
        name: 'Lily'
      };

      const result = speak(speak2, obj);
      expect(result).toEqual('Hello, Lily!!!');
      expect(sayItCalled).toBeTruthy();
    });

    describe('createThisExample', () => {
      test('should return an object with regular and arrow methods', () => {
        const example = createThisExample();
        expect(example).toHaveProperty('regularMethod');
        expect(example).toHaveProperty('arrowMethod');
        expect(typeof example.regularMethod).toBe('function');
        expect(typeof example.arrowMethod).toBe('function');
      });

      test('should demonstrate different this binding behavior', () => {
        const example = createThisExample();
        const regularResult = example.regularMethod();
        const arrowResult = example.arrowMethod();

        // Results should be different to show this binding difference
        expect(regularResult).not.toBe(arrowResult);
      });
    });

    describe('demonstrateHoisting', () => {
      test('should successfully call a hoisted function', () => {
        const result = demonstrateHoisting();
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
      });

      test('should return expected hoisting message', () => {
        const result = demonstrateHoisting();
        expect(result).toContain('Hoisting');
      });
    });
  });

  // ===== HIGHER-ORDER FUNCTIONS & CLOSURES =====
  describe('Higher-Order Functions & Closures', () => {
    test('you should be able to return a function from a function', () => {
      expect(functionFunction('Hello')('world')).toEqual('Hello, world');
      expect(functionFunction('Hai')('can i haz funxtion?')).toEqual(
        'Hai, can i haz funxtion?'
      );
    });

    test('you should be able to use closures', () => {
      const arr = [Math.random(), Math.random(), Math.random(), Math.random()];
      const square = function (x) {
        return x * x;
      };

      const funcs = makeClosures(arr, square);
      expect(funcs).toHaveLength(arr.length);

      arr.forEach((num, i) => {
        expect(funcs[i]()).toEqual(square(arr[i]));
      });
    });

    describe('createPrivateCounter', () => {
      test('should return a function', () => {
        const counter = createPrivateCounter();
        expect(typeof counter).toBe('function');
      });

      test('should increment count on each call', () => {
        const counter = createPrivateCounter();
        expect(counter()).toBe(1);
        expect(counter()).toBe(2);
        expect(counter()).toBe(3);
      });

      test('should maintain separate state for different counters', () => {
        const counter1 = createPrivateCounter();
        const counter2 = createPrivateCounter();

        expect(counter1()).toBe(1);
        expect(counter2()).toBe(1);
        expect(counter1()).toBe(2);
        expect(counter2()).toBe(2);
      });
    });

    describe('functionAsValue', () => {
      test('should accept a function as parameter', () => {
        const testFn = vi.fn(() => 'test');
        const result = functionAsValue(testFn);
        expect(typeof result).toBe('function');
      });

      test('should return a function that calls the original', () => {
        const double = (x) => x * 2;
        const enhanced = functionAsValue(double);
        const result = enhanced(5);
        expect(result).toBe(10);
      });

      test('should add additional behavior to the function', () => {
        const mockFn = vi.fn((x) => x);
        const enhanced = functionAsValue(mockFn);
        enhanced(42);
        expect(mockFn).toHaveBeenCalledWith(42);
      });
    });
  });

  // ===== PARTIAL APPLICATION & CURRYING =====
  describe('Partial Application & Currying', () => {
    test('you should be able to create a "partial" function', () => {
      const partial1 = partial(sayIt, 'Hello', 'Ellie');
      expect(partial1('!!!')).toEqual('Hello, Ellie!!!');
      expect(sayItCalled).toBeTruthy();
    });

    test('you should be able to create a "partial" function for variable number of applied arguments', () => {
      const partialMe = function (x, y, z) {
        return (x / y) * z;
      };

      const a = Math.random();
      const b = Math.random();
      const c = Math.random();
      expect(partialUsingArguments(partialMe)(a, b, c)).toEqual(
        partialMe(a, b, c)
      );
      expect(partialUsingArguments(partialMe, a)(b, c)).toEqual(
        partialMe(a, b, c)
      );
      expect(partialUsingArguments(partialMe, a, b)(c)).toEqual(
        partialMe(a, b, c)
      );
      expect(partialUsingArguments(partialMe, a, b, c)()).toEqual(
        partialMe(a, b, c)
      );
    });

    test('you should be able to curry existing functions', () => {
      const curryMe = function (x, y, z) {
        return (x / y) * z;
      };

      const a = Math.random();
      const b = Math.random();
      const c = Math.random();
      let result;

      result = curryIt(curryMe);
      expect(typeof result).toEqual('function');
      expect(result.length).toEqual(1);

      result = curryIt(curryMe)(a);
      expect(typeof result).toEqual('function');
      expect(result.length).toEqual(1);

      result = curryIt(curryMe)(a)(b);
      expect(typeof result).toEqual('function');
      expect(result.length).toEqual(1);

      result = curryIt(curryMe)(a)(b)(c);
      expect(typeof result).toEqual('number');
      expect(result).toEqual(curryMe(a, b, c));
    });
  });

  // ===== FUNCTION SYNTAX & ES6 FEATURES =====
  describe('Function Syntax & ES6 Features', () => {
    describe('createObjectWithMethods', () => {
      test('should return an object with methods', () => {
        const obj = createObjectWithMethods();
        expect(typeof obj).toBe('object');
        expect(typeof obj.sayHello).toBe('function');
        expect(typeof obj.calculate).toBe('function');
      });

      test('should have working sayHello method', () => {
        const obj = createObjectWithMethods();
        const result = obj.sayHello();
        expect(result).toContain('Hello');
      });

      test('should have working calculate method', () => {
        const obj = createObjectWithMethods();
        const result = obj.calculate(5, 3);
        expect(result).toBe(8);
      });

      test('should use method shorthand syntax', () => {
        const obj = createObjectWithMethods();
        // Check that methods are actually functions on the object
        expect(obj.hasOwnProperty('sayHello')).toBe(true);
        expect(obj.hasOwnProperty('calculate')).toBe(true);
      });
    });

    describe('compareFunctionTypes', () => {
      test('should return an object with three function types', () => {
        const types = compareFunctionTypes();
        expect(typeof types).toBe('object');
        expect(typeof types.declaration).toBe('function');
        expect(typeof types.expression).toBe('function');
        expect(typeof types.constructor).toBe('function');
      });

      test('should have working declaration function', () => {
        const types = compareFunctionTypes();
        const result = types.declaration();
        expect(result).toContain('declaration');
      });

      test('should have working expression function', () => {
        const types = compareFunctionTypes();
        const result = types.expression();
        expect(result).toContain('expression');
      });

      test('should have working constructor function', () => {
        const types = compareFunctionTypes();
        const result = types.constructor();
        expect(result).toContain('constructor');
      });

      test('should demonstrate different function creation methods', () => {
        const types = compareFunctionTypes();

        // All should be functions but created differently
        expect(typeof types.declaration).toBe('function');
        expect(typeof types.expression).toBe('function');
        expect(typeof types.constructor).toBe('function');

        // Results should be different to show the distinction
        const results = [
          types.declaration(),
          types.expression(),
          types.constructor()
        ];

        expect(new Set(results).size).toBe(3); // All different results
      });
    });
  });

  // ===== ADVANCED FUNCTIONAL PROGRAMMING =====
  describe('Advanced Functional Programming', () => {
    describe('Immutability', () => {
      test('updateUserImmutably should not mutate original object', () => {
        const user = { name: 'Alice', age: 30, city: 'NYC' };
        const updated = updateUserImmutably(user, { age: 31, city: 'LA' });

        // Original should be unchanged
        expect(user).toEqual({ name: 'Alice', age: 30, city: 'NYC' });

        // New object should have updates
        expect(updated).toEqual({ name: 'Alice', age: 31, city: 'LA' });

        // Should be different objects
        expect(updated).not.toBe(user);
      });

      test('updateUserImmutably should handle empty updates', () => {
        const user = { name: 'Bob', age: 25 };
        const updated = updateUserImmutably(user, {});

        expect(updated).toEqual(user);
        expect(updated).not.toBe(user);
      });
    });

    describe('Pure vs Impure Functions', () => {
      test('calculateTax should be pure (same input = same output)', () => {
        expect(calculateTax(100, 0.08)).toBe(8);
        expect(calculateTax(100, 0.08)).toBe(8);
        expect(calculateTax(200, 0.1)).toBe(20);
        expect(calculateTax(0, 0.5)).toBe(0);
      });

      test('impureCounter should have side effects', () => {
        const initialCallCount = callCount;
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        impureCounter();
        expect(callCount).toBe(initialCallCount + 1);
        expect(consoleSpy).toHaveBeenCalled();

        impureCounter();
        expect(callCount).toBe(initialCallCount + 2);

        consoleSpy.mockRestore();
      });
    });

    describe('Function Composition', () => {
      test('compose should apply functions right to left', () => {
        const add5 = (x) => x + 5;
        const multiply2 = (x) => x * 2;
        const composed = compose(multiply2, add5);

        expect(composed(3)).toBe(16); // (3 + 5) * 2 = 16
        expect(composed(0)).toBe(10); // (0 + 5) * 2 = 10
      });

      test('pipe should apply functions left to right', () => {
        const add5 = (x) => x + 5;
        const multiply2 = (x) => x * 2;
        const subtract1 = (x) => x - 1;
        const piped = pipe(add5, multiply2, subtract1);

        expect(piped(3)).toBe(15); // ((3 + 5) * 2) - 1 = 15
      });

      test('pipe should handle single function', () => {
        const double = (x) => x * 2;
        const piped = pipe(double);

        expect(piped(5)).toBe(10);
      });
    });

    describe.skip('Maybe Monad', () => {
      test('Maybe should handle valid values', () => {
        const maybe = Maybe('hello');
        const result = maybe.map((s) => s.toUpperCase()).map((s) => s + '!');

        expect(result.getValue()).toBe('HELLO!');
      });

      test('Maybe should safely handle null/undefined', () => {
        const maybeNull = Maybe(null);
        const result = maybeNull
          .map((s) => s.toUpperCase())
          .map((s) => s + '!');

        expect(result.getValue()).toBe(null);
      });

      test('Maybe should chain operations safely', () => {
        const maybeUndefined = Maybe(undefined);
        const result = maybeUndefined
          .map((x) => x.toString())
          .map((s) => s.length)
          .map((n) => n * 2);

        expect(result.getValue()).toBe(undefined);
      });
    });

    describe('Utility Functions', () => {
      test('map should work with currying', () => {
        const double = (x) => x * 2;

        // Partially applied
        const mapDouble = map(double);
        expect(mapDouble([1, 2, 3])).toEqual([2, 4, 6]);

        // Fully applied
        expect(map(double, [1, 2, 3])).toEqual([2, 4, 6]);
      });

      test('filter should work with currying', () => {
        const isEven = (x) => x % 2 === 0;

        // Partially applied
        const filterEvens = filter(isEven);
        expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);

        // Fully applied
        expect(filter(isEven, [1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
      });

      test('reduce should work with currying', () => {
        const sum = (a, b) => a + b;
        const multiply = (a, b) => a * b;

        // Partially applied
        const sumAll = reduce(sum, 0);
        expect(sumAll([1, 2, 3, 4])).toBe(10);

        // Fully applied
        expect(reduce(multiply, 1, [2, 3, 4])).toBe(24);
      });

      test('processNumbers should compose multiple operations', () => {
        const numbers = [1, 2, 3, 4, 5, 6];
        const result = processNumbers(numbers);

        // Filter evens [2,4,6], double [4,8,12], sum = 24
        expect(result).toBe(24);
      });
    });

    describe('Functor (Box)', () => {
      test('Box should allow chaining transformations', () => {
        const box = Box(5);
        const result = box.map((x) => x * 2).map((x) => x + 1);

        expect(result.fold((x) => x)).toBe(11);
      });

      test('Box should maintain functor laws', () => {
        const box = Box(10);
        const f = (x) => x * 2;
        const g = (x) => x + 3;

        // Identity law
        expect(box.map((x) => x).fold((x) => x)).toBe(box.fold((x) => x));

        // Composition law
        const composed = box.map((x) => f(g(x)));
        const chained = box.map(g).map(f);
        expect(composed.fold((x) => x)).toBe(chained.fold((x) => x));
      });
    });

    describe('Memoization', () => {
      test('memoize should cache function results', () => {
        let callCount = 0;
        const expensiveFn = memoize((n) => {
          callCount++;
          return n * n;
        });

        expect(expensiveFn(5)).toBe(25);
        expect(callCount).toBe(1);

        expect(expensiveFn(5)).toBe(25);
        expect(callCount).toBe(1); // Should not increment

        expect(expensiveFn(3)).toBe(9);
        expect(callCount).toBe(2); // New argument, should increment
      });

      test('memoize should handle multiple arguments', () => {
        let callCount = 0;
        const add = memoize((a, b) => {
          callCount++;
          return a + b;
        });

        expect(add(2, 3)).toBe(5);
        expect(callCount).toBe(1);

        expect(add(2, 3)).toBe(5);
        expect(callCount).toBe(1); // Cached

        expect(add(3, 2)).toBe(5);
        expect(callCount).toBe(2); // Different argument order
      });
    });
  });
});
