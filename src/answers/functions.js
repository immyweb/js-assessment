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
  const sum = args.reduce((a, b) => {
    return a + b;
  });

  return sum;
}

// you should be able to apply functions with
// arbitrary numbers of arguments
export function callIt(fn, ...args) {
  fn.apply(null, args);
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
  // TODO: Use rest parameters
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
  // TODO: Use default parameters
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
  // TODO: Create object with regular and arrow function methods
}

/**
 * Write a function that demonstrates function hoisting by calling
 * a function before it's declared in the code.
 *
 * demonstrateHoisting(); // returns "Hoisting works!"
 */
export function demonstrateHoisting() {
  // TODO: Call a function that's declared later in the same scope
}

// ===== HIGHER-ORDER FUNCTIONS & CLOSURES =====

// you should be able to return a function from a function
// Example:
//   functionFunction("Hi")("there") === "Hi, there"
export function functionFunction(str) {
  return (arg) => {
    return `${str}, ${arg}`;
  };
}

// you should be able to use closures
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
  // TODO: Implement IIFE pattern that returns a counter function
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
  // TODO: Demonstrate functions as values
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
// fn function takes 3 numbers & performs a calculation
// Example:
//   partialUsingArguments(fn)(4, 2, 1)) === 2
//   partialUsingArguments(fn, 4)(2, 1)) === 2
//   partialUsingArguments(fn, 4, 2)(1)) === 2
export function partialUsingArguments(fn, ...args) {
  return (...args2) => {
    const mergedArgs = [...args, ...args2];
    return fn.apply(null, mergedArgs);
  };
}

// you should be able to curry existing functions
// fn function takes 3 numbers & performs a calculation
// Example:
//   curryIt(fn)(4)(2)(1) === 2
export function curryIt(fn) {
  return (x) => {
    return (y) => {
      return (z) => {
        return fn(x, y, z);
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
  // TODO: Use ES6 method shorthand
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
  // TODO: Show different ways to create functions
}
