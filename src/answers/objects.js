/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on fundamental object concepts in JavaScript.
 * You'll need to understand object creation, property access, and object methods.
 *
 * The exercises are organized by difficulty and concept:
 * 1. Basic Object Operations
 * 2. Object Copying & Property Manipulation
 * 3. Object Methods & Context
 * 4. Advanced Object Patterns
 * 5. Functional Programming with Objects
 */

// ===== BASIC OBJECT OPERATIONS =====

/**
 * Write a function that creates an object with the given properties.
 *
 * createObject('name', 'Alice', 'age', 25) // {name: 'Alice', age: 25}
 * createObject('color', 'blue') // {color: 'blue'}
 */
export function createObject(...args) {
  const pairs = [];
  for (let i = 0; i < args.length; i += 2) {
    if (i + 1 < args.length) {
      pairs.push([args[i], args[i + 1]]);
    }
  }
  return Object.fromEntries(pairs);
}

/**
 * Write a function that returns an array of all the keys in an object.
 *
 * getKeys({name: 'Alice', age: 25}) // ['name', 'age']
 * getKeys({}) // []
 */
export function getKeys(obj) {
  return Object.keys(obj);
}

/**
 * Write a function that returns an array of all the values in an object.
 *
 * getValues({name: 'Alice', age: 25}) // ['Alice', 25]
 * getValues({}) // []
 */
export function getValues(obj) {
  return Object.values(obj);
}

/**
 * Write a function that returns an array of key-value pairs from an object.
 *
 * getEntries({name: 'Alice', age: 25}) // [['name', 'Alice'], ['age', 25]]
 * getEntries({}) // []
 */
export function getEntries(obj) {
  return Object.entries(obj);
}

/**
 * Write a function that checks if an object has a specific property.
 *
 * hasProperty({name: 'Alice', age: 25}, 'name') // true
 * hasProperty({name: 'Alice'}, 'age') // false
 */
export function hasProperty(obj, prop) {
  return Object.hasOwn(obj, prop);
}

/**
 * Write a function that counts the number of properties in an object.
 *
 * countProperties({name: 'Alice', age: 25}) // 2
 * countProperties({}) // 0
 */
export function countProperties(obj) {
  return Object.getOwnPropertyNames(obj).length;
}

/**
 * Write a function that removes a property from an object and returns the modified object.
 *
 * const obj = {name: 'Alice', age: 25, city: 'NYC'};
 * removeProperty(obj, 'age') // {name: 'Alice', city: 'NYC'}
 */
export function removeProperty(obj, prop) {
  delete obj[prop];
  return obj;
}

// you should be able to iterate over an object's "own" properties
// and return an array of properties.
// Example:
//   iterate(obj)=== ["foo: bar", "baz: bim"]
export function iterate(obj) {
  return Object.keys(obj).map((key) => `${key}: ${obj[key]}`);
}

// ===== OBJECT COPYING & PROPERTY MANIPULATION =====

/**
 * Write a function that copies all properties from one object to another.
 *
 * const target = {a: 1};
 * const source = {b: 2, c: 3};
 * copyProperties(target, source) // {a: 1, b: 2, c: 3}
 */
export function copyProperties(target, source) {
  return Object.assign(target, source);
}

/**
 * Write a function that creates a shallow copy of an object.
 *
 * const original = {name: 'Alice', age: 25};
 * const copy = shallowCopy(original);
 * copy.name = 'Bob';
 * original.name // still 'Alice'
 */
export function shallowCopy(obj) {
  return Object.assign({}, obj);
}

// you should be able to freeze an object deeply (including nested objects)
// Example:
//   deepFreeze(obj) makes obj and all nested objects immutable
export function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}

// ===== OBJECT METHODS & CONTEXT =====

/**
 * Write a function that creates an object with getter and setter methods.
 *
 * const person = createPersonWithAccessors('Alice');
 * person.getName() // 'Alice'
 * person.setName('Bob');
 * person.getName() // 'Bob'
 */
export function createPersonWithAccessors(initialName) {
  return {
    name: initialName,

    getName() {
      return this.name;
    },

    setName(newName) {
      this.name = newName;
    }
  };
}

// you should be able to alter the context in which a method runs
// Example:
//   alterContext(fn, obj)=== "Yo, Charlie!"
export function alterContext(fn, obj) {
  return fn.call(obj);
}

// you should be able to alter multiple objects at once
// Example:
//   new Constructor("ellie").greeting === "Whats up"
export function alterObjects(constructor, greeting) {
  return (constructor.prototype.greeting = greeting);
}

// ===== ADVANCED OBJECT PATTERNS =====

// you should be able to bind arguments to a function permanently
// Example:
//   const add5 = bindArgs(add, 5);
//   add5(3) === 8
export function bindArgs(fn, ...boundArgs) {
  return function (...callArgs) {
    return fn.apply(this, [...boundArgs, ...callArgs]);
  };
}

// you should be able to create a method that can access private data
// Example:
//   const counter = createCounter();
//   counter.increment() === 1
//   counter.increment() === 2
export function createCounter() {
  let count = 0;

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    value() {
      return count;
    }
  };
}

// you should be able to create a proxy that logs property access
// Example:
//   const logged = createLoggingProxy(obj);
//   logged.name; // logs "Accessed property: name"
export function createLoggingProxy(obj) {
  const handler = {
    get(obj, prop) {
      console.log(`Accessed property: ${prop}`);
      return obj[prop];
    },

    set(obj, prop, value) {
      console.log(`Set property: ${prop} = ${value}`);
      obj[prop] = value;
      return true;
    }
  };

  return new Proxy(obj, handler);
}

// you should be able to create a factory function with private methods
// Example:
//   const person = createPerson("Alice", 25);
//   person.getInfo() === "Alice is 25 years old"
export function createPerson(name, age) {
  // Private method
  function validateAge(age) {
    return age >= 0 && age <= 150;
  }

  // Public interface
  return {
    getName() {
      return name;
    },
    getAge() {
      return age;
    },
    setAge(newAge) {
      if (validateAge(newAge)) {
        age = newAge;
      } else {
        throw new Error('Invalid age');
      }
    },
    getInfo() {
      return `${name} is ${age} years old`;
    }
  };
}

// ===== FUNCTIONAL PROGRAMMING WITH OBJECTS =====

// you should be able to chain method calls fluently
// Example:
//   calculator().add(5).multiply(2).subtract(3).value === 7
export function calculator(initial = 0) {
  let value = initial;

  return {
    add(n) {
      value += n;
      return this;
    },
    subtract(n) {
      value -= n;
      return this;
    },
    multiply(n) {
      value *= n;
      return this;
    },
    divide(n) {
      if (n !== 0) value /= n;
      return this;
    },
    get value() {
      return value;
    }
  };
}
