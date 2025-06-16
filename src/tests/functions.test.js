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
  compareFunctionTypes
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

  test('you should be able to use an array as arguments when calling a function', () => {
    const result = argsAsArray(sayIt, ['Hello', 'Ellie', '!']);
    expect(result).toEqual('Hello, Ellie!');
    expect(sayItCalled).toBeTruthy();
  });

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

  test('you should be able to return a function from a function', () => {
    expect(functionFunction('Hello')('world')).toEqual('Hello, world');
    expect(functionFunction('Hai')('can i haz funxtion?')).toEqual('Hai, can i haz funxtion?');
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

  test('you should be able to create a "partial" function', () => {
    const partial1 = partial(sayIt, 'Hello', 'Ellie');
    expect(partial1('!!!')).toEqual('Hello, Ellie!!!');
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
    const iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
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

  test('you should be able to create a "partial" function for variable number of applied arguments', () => {
    const partialMe = function (x, y, z) {
      return (x / y) * z;
    };

    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    expect(partialUsingArguments(partialMe)(a, b, c)).toEqual(partialMe(a, b, c));
    expect(partialUsingArguments(partialMe, a)(b, c)).toEqual(partialMe(a, b, c));
    expect(partialUsingArguments(partialMe, a, b)(c)).toEqual(partialMe(a, b, c));
    expect(partialUsingArguments(partialMe, a, b, c)()).toEqual(partialMe(a, b, c));
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
