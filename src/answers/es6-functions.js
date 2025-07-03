/**
 * ES6 Functions: Arrow Functions, Enhanced Object Literals, and Parameter Handling
 *
 * This file contains exercises focusing on modern JavaScript function features
 * including arrow functions, lexical this binding, enhanced object literals,
 * and advanced parameter handling techniques.
 */

// ===== ARROW FUNCTIONS AND ENHANCED OBJECT LITERALS =====

/**
 * Write a function that returns an object using enhanced object literal syntax.
 * Include computed property names, method shorthand, and dynamic properties.
 *
 * createEnhancedObject("name", "John", "getName")
 * // { name: "John", getName() { return this.name; }, [dynamicKey]: "dynamic" }
 */
export function createEnhancedObject(propName, propValue, methodName) {
  const dynamicKey = 'dynamicKey';
  return {
    [propName]: propValue,
    [methodName]() {
      return this[propName];
    },
    [dynamicKey]: 'dynamic'
  };
}

/**
 * Write a function that demonstrates arrow function context binding.
 * Return an object with both arrow and regular methods to show 'this' differences.
 *
 * const obj = createContextDemo("test");
 * obj.regularMethod() // "test"
 * obj.arrowMethod() // undefined (or global context)
 */
export function createContextDemo(value) {
  return {
    value,
    regularMethod() {
      return this.value;
    },
    arrowMethod: () => {
      return this.value;
    }
  };
}

/**
 * Write a function that uses arrow functions for array transformations.
 * Chain multiple array methods with arrow functions.
 *
 * processNumbers([1, 2, 3, 4, 5, 6])
 * // Filter evens, square them, sum: (2² + 4² + 6²) = 56
 */
export function processNumbers(numbers) {
  return numbers
    .filter((num) => num % 2 === 0)
    .map((num) => num * num)
    .reduce((acc, num) => acc + num, 0);
}

/**
 * Write a function that creates a curry function using arrow functions.
 * Support partial application with arrow function syntax.
 *
 * const add = createCurryFunction((a, b, c) => a + b + c);
 * add(1)(2)(3) // 6
 * add(1, 2)(3) // 6
 */
export function createCurryFunction(fn) {
  const expectedArgCount = fn.length;

  const curry = (...args) => {
    // If we have enough args, call the original function
    if (args.length >= expectedArgCount) {
      return fn(...args.slice(0, expectedArgCount));
    }

    // Otherwise return a new function that will collect more args
    return (...moreArgs) => {
      // Combine previous args with new args
      const combinedArgs = [...args, ...moreArgs];
      // Call curry with the combined args to continue the process
      return curry(...combinedArgs);
    };
  };

  return curry;
}

// ===== DEFAULT PARAMETERS AND PARAMETER HANDLING =====

/**
 * Write a function with complex default parameters.
 * Use function calls and previous parameters in defaults.
 *
 * complexDefaults("John")
 * // Uses default timestamp and computed greeting
 */
export function complexDefaults(
  name,
  timestamp = Date.now(),
  greeting = `Hello ${name}`,
  options = { verbose: true }
) {
  return {
    name,
    timestamp,
    greeting,
    options
  };
}

/**
 * Write a function that handles optional object parameters elegantly.
 * Support multiple configuration objects with defaults.
 *
 * configureApp({database: {host: "localhost"}}, {api: {timeout: 5000}})
 * // Merges with defaults for missing properties
 */
export function configureApp(
  dbConfig = { host: 'localhost', port: 5432 },
  apiConfig = { timeout: 3000, retries: 3 }
) {
  // Default values
  const defaultDbConfig = { host: 'localhost', port: 5432 };
  const defaultApiConfig = { timeout: 3000, retries: 3 };

  // Handle nested database configuration or use direct configuration
  const database = dbConfig.database
    ? { ...defaultDbConfig, ...dbConfig.database }
    : { ...defaultDbConfig, ...dbConfig };

  // Handle nested api configuration or use direct configuration
  const api = apiConfig.api
    ? { ...defaultApiConfig, ...apiConfig.api }
    : { ...defaultApiConfig, ...apiConfig };

  return { database, api };
}

/**
 * Write a function that uses parameter destructuring with defaults.
 * Extract and validate email configuration parameters.
 *
 * sendEmail({to: "user@example.com", subject: "Test"})
 * // Uses defaults for missing smtp, port, etc.
 */
export function sendEmail({
  to,
  subject = 'No Subject',
  body = '',
  smtp = 'localhost',
  port = 587,
  secure = false
} = {}) {
  return {
    to,
    subject,
    body,
    smtp,
    port,
    secure
  };
}

/**
 * Write a function that combines multiple parameter handling techniques.
 * Use rest parameters, default values, and destructuring together.
 *
 * processConfig({debug: true}, "main", "secondary", "extra")
 * // Combines options object with array of additional settings
 */
export function processConfig(options = {}, ...settings) {
  return {
    options: {
      ...options
    },
    settings
  };
}

// ===== ADVANCED FUNCTION PATTERNS =====

/**
 * Write a function that implements function composition.
 * Allow multiple functions to be composed from right to left.
 *
 * const addOne = x => x + 1;
 * const double = x => x * 2;
 * const square = x => x * x;
 *
 * const composed = compose(square, double, addOne);
 * composed(3) // square(double(addOne(3))) = square(double(4)) = square(8) = 64
 */
export function compose(...functions) {
  return (num) => {
    let result = num;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
}

/**
 * Write a function that creates a memoized version of a function.
 * Cache results for previously computed inputs.
 *
 * const expensiveFn = (n) => { console.log('computing'); return n * 2; };
 * const memoized = memoize(expensiveFn);
 * memoized(42) // logs 'computing', returns 84
 * memoized(42) // returns 84 without logging
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

/**
 * Write a function that creates a throttled version of a function.
 * Ensure function is called at most once in the specified time period.
 *
 * const throttled = throttle(() => console.log('called'), 1000);
 * // calling throttled() multiple times within 1 second
 * // will only execute the function once
 */
export function throttle(fn, delay) {
  let timerFlag = null;

  return () => {
    if (timerFlag === null) {
      fn();
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}

/**
 * Write a function that creates a debounced version of a function.
 * Only execute after function hasn't been called for specified time.
 *
 * const debounced = debounce(() => console.log('called'), 1000);
 * // calling debounced() resets the timer each time
 * // function only executes after 1 second of no calls
 */
export function debounce(fn, delay) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}
