/**
 * ES6 Advanced: Symbols, Proxy/Reflect, Iterators, and Advanced Patterns
 *
 * This file contains exercises focusing on the more advanced features of ES6+
 * including metaprogramming, custom iteration, and reactive patterns.
 */

// ===== SYMBOLS AND WELL-KNOWN SYMBOLS =====

/**
 * Write a function that creates an object with Symbol properties.
 * Use both regular symbols and well-known symbols.
 *
 * createSymbolObject("data")
 * // Object with Symbol.iterator, Symbol.toStringTag, and custom symbol
 */
export function createSymbolObject(data) {
  const mySymbol = Symbol(data);

  let obj = {
    [mySymbol]: data
  };

  obj[Symbol.iterator] = function* () {
    yield data;
  };

  obj[Symbol.toStringTag] = data;

  return obj;
}

/**
 * Write a function that uses Symbol.for() for global symbol registry.
 * Create and retrieve symbols from the global registry.
 *
 * manageGlobalSymbols("app.config") // Returns existing or creates new symbol
 */
export function manageGlobalSymbols(key) {
  return Symbol.for(key);
}

/**
 * Write a function that implements custom Symbol.iterator.
 * Make an object iterable with custom iteration logic.
 *
 * const range = createIterableRange(1, 5);
 * [...range] // [1, 2, 3, 4, 5]
 */
export function createIterableRange(start, end) {
  return {
    [Symbol.iterator]: function* () {
      for (let i = start; i <= end; i++) {
        yield i;
      }
    }
  };
}

/**
 * Write a function that uses Symbol.toPrimitive for custom type conversion.
 * Create an object that converts differently for different hints.
 *
 * const obj = createCustomConversion(42);
 * +obj // 42 (number hint)
 * `${obj}` // "42" (string hint)
 * obj + "" // "42" (default hint)
 */
export function createCustomConversion(value) {
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === 'number') {
        return Number(value);
      }
      if (hint === 'string') {
        return value.toString();
      }
      return value;
    }
  };
}

// ===== PROXY AND REFLECT =====

/**
 * Write a function that creates a logging proxy.
 * Log all property access and modifications.
 *
 * const obj = createLoggingProxy({name: "John"});
 * obj.name // logs "GET name: John"
 * obj.age = 25 // logs "SET age: 25"
 */
export function createLoggingProxy(target) {
  const handler = {
    get(obj, prop) {
      console.log(`GET ${prop}: ${obj[prop]}`);
      return obj[prop];
    },
    set(obj, prop, value) {
      console.log(`SET ${prop}: ${value}`);
      obj[prop] = value;
      return true;
    }
  };

  return new Proxy(target, handler);
}

/**
 * Write a function that creates a validation proxy.
 * Validate property assignments based on rules.
 *
 * const person = createValidationProxy({
 *   name: (val) => typeof val === "string",
 *   age: (val) => typeof val === "number" && val >= 0
 * });
 * person.name = "John" // OK
 * person.age = -5 // throws Error
 */
export function createValidationProxy(rules) {
  const handler = {
    set(obj, prop, value) {
      if (rules[prop]) {
        if (rules[prop](value)) {
          Reflect.set(obj, prop, value);
          return true;
        } else {
          throw Error(
            `Unable to assign ${value} to ${prop}. Validation failed`
          );
        }
      } else {
        throw Error(`No rules for this property: ${prop}`);
      }
    }
  };

  return new Proxy({}, handler);
}

/**
 * Write a function that uses Reflect for meta-programming.
 * Create a function that dynamically calls methods using Reflect.
 *
 * dynamicMethodCall(obj, "methodName", [arg1, arg2])
 * // Equivalent to: obj.methodName(arg1, arg2)
 */
export function dynamicMethodCall(target, methodName, args) {
  return Reflect.apply(target[methodName], target, args);
}

/**
 * Write a function that creates a default value proxy.
 * Return default values for undefined properties.
 *
 * const obj = createDefaultProxy({}, "N/A");
 * obj.anyProperty // "N/A"
 * obj.definedProp = "value";
 * obj.definedProp // "value"
 */
export function createDefaultProxy(target, defaultValue) {
  const handler = {
    get(obj, prop) {
      return prop in obj ? Reflect.get(obj, prop) : defaultValue;
    }
  };

  return new Proxy(target, handler);
}

// ===== ITERATORS AND FOR...OF =====

/**
 * Write a function that creates a custom iterator.
 * Create an iterator that yields Fibonacci numbers up to a limit.
 *
 * const fib = createFibonacciIterator(100);
 * for (const num of fib) console.log(num); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
 */
export function createFibonacciIterator(limit) {
  return {
    [Symbol.iterator]: function* () {
      let previous = 0;
      let current = 1;

      while (previous <= limit) {
        yield previous;
        [previous, current] = [current, previous + current];
      }
    }
  };
}

/**
 * Write a function that creates an iterator with return and throw methods.
 * Implement a complete iterator protocol.
 *
 * const iter = createCompleteIterator([1, 2, 3]);
 * iter.next() // {value: 1, done: false}
 * iter.return("early") // {value: "early", done: true}
 */
export function createCompleteIterator(array) {
  let index = 0;

  return {
    next() {
      if (index < array.length) {
        index++;
        return { value: array[index - 1], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },

    return(value) {
      index = 0;
      return { value, done: true };
    },

    throw(error) {
      if (error) {
        throw new Error(error);
      } else {
        return { value: undefined, done: true };
      }
    },

    // Make the iterator itself iterable
    [Symbol.iterator]() {
      return this;
    }
  };
}

/**
 * Write a function that transforms any iterable using a custom iterator.
 * Apply a transformation function to each value.
 *
 * const doubled = transformIterable([1, 2, 3], x => x * 2);
 * [...doubled] // [2, 4, 6]
 */
export function transformIterable(iterable, transform) {
  return {
    [Symbol.iterator]: function* () {
      for (const value of iterable) {
        yield transform(value);
      }
    }
  };
}

/**
 * Write a function that creates an async iterator.
 * Yield values with delays to simulate async data source.
 *
 * const asyncData = createAsyncIterator([1, 2, 3], 100);
 * for await (const value of asyncData) console.log(value);
 */
export function createAsyncIterator(data, delay) {
  function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  return {
    async *[Symbol.asyncIterator]() {
      for (const value of data) {
        await wait(delay);
        yield value;
      }
    }
  };
}

// ===== ADVANCED ES6+ PATTERNS =====

/**
 * Write a function that combines multiple ES6+ features.
 * Use destructuring, spread, Map, Symbol, and Proxy together.
 *
 * const advanced = createAdvancedDataStructure(
 *   [{id: 1, name: "John"}, {id: 2, name: "Jane"}]
 * );
 * advanced.findByName("John") // {id: 1, name: "John"}
 * advanced.size // 2
 */
export function createAdvancedDataStructure(data) {
  // Using a Symbol for "private" data storage
  const dataSymbol = Symbol('data');

  // Create a Map to store objects by id
  const mapData = new Map();

  data.forEach(({ id, name, ...rest }) => {
    mapData.set(id, { id, name, ...rest });
  });

  const object = {
    // Store the Map using the Symbol as a "private" property
    [dataSymbol]: mapData,

    get size() {
      return this[dataSymbol].size;
    },

    findByName(searchName) {
      return [...this[dataSymbol].values()].find(
        ({ name }) => name === searchName
      );
    },

    [Symbol.iterator]: function* () {
      for (const [_, value] of this[dataSymbol]) {
        yield value;
      }
    }
  };

  const handler = {
    get(target, prop, receiver) {
      return prop in target ? Reflect.get(target, prop, receiver) : undefined;
    }
  };

  return new Proxy(object, handler);
}

/**
 * Write a function that creates a reactive object using Proxy.
 * Automatically update computed properties when dependencies change.
 *
 * const reactive = createReactiveObject({
 *   firstName: "John",
 *   lastName: "Doe",
 *   get fullName() { return `${this.firstName} ${this.lastName}`; }
 * });
 * reactive.fullName // "John Doe"
 * reactive.firstName = "Jane";
 * reactive.fullName // "Jane Doe" (automatically updated)
 */
export function createReactiveObject(obj) {
  const object = Object.create(
    Object.prototype,
    Object.getOwnPropertyDescriptors(obj)
  );

  const handler = {
    get(target, prop, receiver) {
      return prop in target ? Reflect.get(target, prop, receiver) : undefined;
    },
    set(target, prop, value, receiver) {
      Reflect.set(target, prop, value, receiver);
      return true;
    }
  };

  return new Proxy(object, handler);
}

/**
 * Write a function that implements a pipeline using modern JS features.
 * Chain operations using async/await, generators, and iterators.
 *
 * const result = await createPipeline([1, 2, 3, 4, 5])
 *   .filter(x => x % 2 === 0)
 *   .map(x => x * 2)
 *   .asyncMap(async x => await Promise.resolve(x + 1))
 *   .toArray();
 * // [5, 9] (evens: 2,4 -> doubled: 4,8 -> +1: 5,9)
 */
export function createPipeline(data) {
  let initialData = [...data];

  const operations = [];

  return {
    filter(predicate) {
      operations.push({ type: 'filter', fn: predicate });
      return this;
    },

    map(transform) {
      operations.push({ type: 'map', fn: transform });
      return this;
    },

    asyncMap(asyncTransform) {
      operations.push({ type: 'asyncMap', fn: asyncTransform });
      return this;
    },

    async toArray() {
      let result = initialData;

      for (const op of operations) {
        if (op.type === 'filter') {
          result = result.filter(op.fn);
        } else if (op.type === 'map') {
          result = result.map(op.fn);
        } else if (op.type === 'asyncMap') {
          const tempResult = [];
          for (const item of result) {
            const transformedItem = await op.fn(item);
            tempResult.push(transformedItem);
          }
          result = tempResult;
        }
      }

      return result;
    }
  };
}
