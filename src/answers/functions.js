/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on fundamental function concepts in JavaScript.
 * You'll need to understand function creation, arguments, scope, and advanced patterns.
 *
 * The exercises are organized by difficulty and concept:
 * 1. Function Arguments & Application
 * 2. Function Context & Scope
 * 3. Higher-Order Functions & Closures
 * 4. Partial Application & Currying
 * 5. Function Syntax & ES6 Features
 */

// ===== FUNCTION ARGUMENTS & APPLICATION =====

// you should be able to use an array as arguments
// when calling a function
// Example:
//   argsAsArray(fn, ["Hi", "there"]) === "Hi there"
export function argsAsArray(fn, arr) {
  return fn.apply(null, arr);
}

// you should be able to use sum the arguments
// Example:
//   useArguments(1, 2) === 3
//   useArguments(1, 2, 3) === 6
export function useArguments(...args) {
  return args.reduce((x, y) => x + y);
}

// you should be able to apply functions with
// arbitrary numbers of arguments
export function callIt(fn, ...args) {
  return fn.apply(null, args);
}

/**
 * Write a function that uses rest parameters to accept any number
 * of arguments and returns their sum.
 *
 * sumAll(1, 2, 3); // 6
 * sumAll(10, 20); // 30
 * sumAll(); // 0
 */
export function sumAll(...args) {
  if (!args.length) return 0;

  return args.reduce((x, y) => x + y);
}

/**
 * Write a function with default parameters that creates a greeting.
 * Default name should be "World" and default greeting should be "Hello".
 *
 * createGreeting(); // "Hello, World!"
 * createGreeting("Hi", "Alice"); // "Hi, Alice!"
 * createGreeting("Hey"); // "Hey, World!"
 */
export function createGreeting(greeting = 'Hello', name = 'World') {
  return `${greeting}, ${name}!`;
}

// ===== FUNCTION CONTEXT & SCOPE =====

// you should be able to change the context
// in which a function is called
// Example:
//   speak(fn, { greeting: "Hi", name: "Oscar"}) === "Hi Oscar"
export function speak(fn, obj) {
  return fn.call(obj);
}

/**
 * Write a function that demonstrates the difference between arrow functions
 * and regular functions with 'this' binding. Return an object with methods
 * that show how 'this' behaves differently.
 *
 * const example = createThisExample();
 * example.regularMethod(); // 'this' refers to the object
 * example.arrowMethod(); // 'this' refers to lexical scope
 */
export function createThisExample() {
  return {
    regularMethod: function () {
      return this;
    },
    arrowMethod: () => {
      return this;
    }
  };
}

/**
 * Write a function that demonstrates function hoisting by calling
 * a function before it's declared in the code.
 *
 * demonstrateHoisting(); // returns "Hoisting works!"
 */
export function demonstrateHoisting() {
  return hoisted();

  function hoisted() {
    return 'Hoisting works!';
  }
}

// ===== HIGHER-ORDER FUNCTIONS & CLOSURES =====

// you should be able to return a function from a function
// Example:
//   functionFunction("Hi")("there") === "Hi, there"
export function functionFunction(str) {
  return (str2) => {
    return `${str}, ${str2}`;
  };
}

/**
 * Write a function that creates an array of functions using closures.
 * Each function should "remember" its corresponding value from the input array
 * and apply the given function to that value when called.
 *
 * const arr = [1, 2, 3];
 * const double = x => x * 2;
 * const closures = makeClosures(arr, double);
 * closures[0](); // 2 (double(1))
 * closures[1](); // 4 (double(2))
 * closures[2](); // 6 (double(3))
 */
export function makeClosures(arr, fn) {
  let ret = [];

  const makeFn = (val) => {
    return () => {
      return fn(val);
    };
  };

  arr.forEach((num) => {
    ret.push(makeFn(num));
  });

  return ret;
}

/**
 * Create an IIFE that returns a counter function with private state.
 * The counter should increment each time it's called.
 *
 * const counter = createPrivateCounter();
 * counter(); // 1
 * counter(); // 2
 * counter(); // 3
 */
export function createPrivateCounter() {
  const counter = (() => {
    let count = 0;
    return () => {
      count++;
      return count;
    };
  })();

  return counter;
}

/**
 * Write a function that accepts another function as an argument,
 * stores it in a variable, and returns a new function that calls
 * the original function with additional behavior.
 *
 * const double = x => x * 2;
 * const logged = functionAsValue(double);
 * logged(5); // logs "Calling function" and returns 10
 */
export function functionAsValue(fn) {
  const varFunc = fn;

  return varFunc;
}

// ===== PARTIAL APPLICATION & CURRYING =====

// you should be able to create a "partial" function
// Example:
//   const partial1 = partial(sayIt, "Hello", "Ellie");
//   partial1("!!!") === "Hello, Ellie!!!"
export function partial(fn, str1, str2) {
  return (str3) => {
    return fn(str1, str2, str3);
  };
}

// you should be able to create a "partial" function
// for variable number of applied arguments.
// fn takes 3 numbers & performs a calculation
// Example:
//   partialUsingArguments(fn)(4, 2, 1)) === 2
//   partialUsingArguments(fn, 4)(2, 1)) === 2
//   partialUsingArguments(fn, 4, 2)(1)) === 2
export function partialUsingArguments(fn, ...args1) {
  return (...args2) => {
    return fn.apply(null, [...args1, ...args2]);
  };
}

// you should be able to curry existing functions
// fn takes 3 numbers & performs a calculation
// Example:
//   curryIt(fn)(4)(2)(1) === 2
export function curryIt(fn) {
  return (num1) => {
    return (num2) => {
      return (num3) => {
        return fn(num1, num2, num3);
      };
    };
  };
}

// ===== FUNCTION SYNTAX & ES6 FEATURES =====

/**
 * Create an object using ES6 method shorthand syntax instead of
 * traditional function property assignment.
 *
 * const obj = createObjectWithMethods();
 * obj.sayHello(); // "Hello from method!"
 * obj.calculate(5, 3); // 8
 */
export function createObjectWithMethods() {
  return {
    sayHello() {
      return 'Hello from method!';
    },
    calculate(num1, num2) {
      return num1 + num2;
    }
  };
}

/**
 * Demonstrate the difference between function declarations,
 * function expressions, and the Function constructor by returning
 * an object with examples of each.
 *
 * const types = compareFunctionTypes();
 * types.declaration(); // "I'm a declaration"
 * types.expression(); // "I'm an expression"
 * types.constructor(); // "I'm from constructor"
 */
export function compareFunctionTypes() {
  const expression = function () {
    return "I'm an expression";
  };

  const constructor = new Function(`return "I'm from constructor"`);

  return {
    declaration: function () {
      return "I'm a declaration";
    },
    expression,
    constructor
  };
}

// ===== ADVANCED FUNCTIONAL PROGRAMMING =====

/**
 * Demonstrate immutability by creating functions that return new objects
 * instead of mutating existing ones.
 *
 * const user = { name: "Alice", age: 30 };
 * const updated = updateUserImmutably(user, { age: 31 });
 * // user should remain unchanged, updated should be a new object
 */
export function updateUserImmutably(obj, updates) {
  return {
    ...obj,
    ...updates
  };
}

/**
 * Create a pure function that calculates tax. Pure functions:
 * - Always return the same output for the same input
 * - Have no side effects (don't modify external state)
 * - Don't depend on external mutable state
 *
 * calculateTax(100, 0.08); // 8
 * calculateTax(100, 0.08); // Always returns 8
 */
export function calculateTax(amount, rate) {
  return amount * rate;
}

/**
 * Create an impure function that demonstrates side effects by
 * logging to console and modifying external state.
 *
 * let callCount = 0;
 * impureCounter(); // logs and increments callCount
 */
export let callCount = 0;
export function impureCounter() {
  callCount += 1;
  console.log(callCount);
  return callCount;
}

/**
 * Implement function composition - combining simple functions
 * to create more complex operations.
 *
 * const add5 = x => x + 5;
 * const multiply2 = x => x * 2;
 * const composed = compose(multiply2, add5);
 * composed(3); // multiply2(add5(3)) = multiply2(8) = 16
 */
export function compose(f, g) {
  return (num) => {
    return f(g(num));
  };
}

/**
 * Create a pipe function that applies functions left to right
 * (opposite of compose).
 *
 * const add5 = x => x + 5;
 * const multiply2 = x => x * 2;
 * const piped = pipe(add5, multiply2);
 * piped(3); // multiply2(add5(3)) = multiply2(8) = 16
 */
export function pipe(...functions) {
  return (num) => {
    return functions.reduce((acc, f) => f(acc), num);
  };
}

/**
 * Implement a simple Maybe monad to handle null/undefined values safely.
 * A Maybe wraps a value and provides safe operations on it.
 *
 * const value = Maybe.of("hello");
 * const result = value.map(s => s.toUpperCase()).map(s => s + "!");
 * result.getValue(); // "HELLO!"
 *
 * const nullValue = Maybe.of(null);
 * const nullResult = nullValue.map(s => s.toUpperCase());
 * nullResult.getValue(); // null (no error thrown)
 */
export function Maybe(value) {
  // Base Maybe class
  class MaybeBase {
    static of(value) {
      return value == null ? new Nothing(value) : new Just(value);
    }
  }

  // Just represents a value that exists
  class Just extends MaybeBase {
    constructor(value) {
      super();
      this.value = value;
    }

    map(fn) {
      try {
        return Maybe.of(fn(this.value));
      } catch (e) {
        return new Nothing(null);
      }
    }

    getValue() {
      return this.value;
    }

    getOrElse(_) {
      return this.value;
    }
  }

  // Nothing represents the absence of a value
  class Nothing extends MaybeBase {
    constructor(value) {
      super();
      this.value = value;
    }

    map(_) {
      return this; // do nothing
    }

    getValue() {
      return this.value;
    }

    getOrElse(defaultValue) {
      return defaultValue;
    }
  }

  // Static factory method
  Maybe.of = MaybeBase.of;

  // Return the appropriate instance
  return value == null ? new Nothing(value) : new Just(value);
}

/**
 * Create utility functions similar to Ramda/Lodash style.
 * Implement a curried map function that can be partially applied.
 *
 * const double = x => x * 2;
 * const mapDouble = map(double);
 * mapDouble([1, 2, 3]); // [2, 4, 6]
 *
 * // Or use directly:
 * map(double, [1, 2, 3]); // [2, 4, 6]
 */
export function map(fn, array) {
  if (array !== undefined) {
    return array.map(fn);
  }
  return (array2) => {
    return array2.map(fn);
  };
}

/**
 * Implement a curried filter function.
 *
 * const isEven = x => x % 2 === 0;
 * const filterEvens = filter(isEven);
 * filterEvens([1, 2, 3, 4]); // [2, 4]
 */
export function filter(predicate, array) {
  if (array !== undefined) {
    return array.filter(predicate);
  }
  return (array2) => {
    return array2.filter(predicate);
  };
}

/**
 * Implement a curried reduce function.
 *
 * const sum = (a, b) => a + b;
 * const sumAll = reduce(sum, 0);
 * sumAll([1, 2, 3, 4]); // 10
 */
export function reduce(fn, initial, array) {
  if (array !== undefined) {
    return array.reduce(fn, initial);
  }
  return (array2) => {
    return array2.reduce(fn, initial);
  };
}

/**
 * Create a function that demonstrates function composition with
 * multiple utility functions working together.
 *
 * const data = [1, 2, 3, 4, 5, 6];
 * const result = processNumbers(data);
 * // Should filter evens, double them, then sum: [2,4,6] -> [4,8,12] -> 24
 */
export function processNumbers(numbers) {
  return numbers
    .filter((x) => x % 2 === 0)
    .map((x) => x * 2)
    .reduce((a, b) => a + b);
}

/**
 * Implement a simple functor (a container that can be mapped over).
 * A Box wraps a value and allows transformations via map.
 *
 * const box = Box(5);
 * const result = box.map(x => x * 2).map(x => x + 1);
 * result.fold(x => x); // 11
 */
export function Box(value) {
  let val = value;
  return {
    map: (fn) => {
      return Box(fn(val));
    },
    fold: (fn) => {
      return fn(val);
    }
  };
}

/**
 * Create a memoization function that caches results of expensive
 * function calls (demonstrates functional programming optimization).
 *
 * const expensiveFn = memoize((n) => {
 *   // Simulate expensive calculation
 *   return n * n;
 * });
 * expensiveFn(5); // Calculates and caches
 * expensiveFn(5); // Returns cached result
 */
export function memoize(fn) {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}
