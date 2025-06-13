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

// you should be able to iterate over an object's "own" properties
// and return an array of properties.
// Example:
//   iterate(obj)=== ["foo: bar", "baz: bim"]
export function iterate(obj) {
  // 1. Using Object.keys() with map
  return Object.keys(obj).map((key) => `${key}: ${obj[key]}`);

  // 2. Using Object.entries() with map
  // return Object.entries(obj).map(([key, value]) => `${key}: ${value}`);

  // 3. Using for...in
  // let res = [];

  // for (let prop in obj) {
  //   if (obj.hasOwnProperty(prop)) {
  //     res.push(`${prop}: ${obj[prop]}`);
  //   }
  // }

  // return res;
}

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
  return new Proxy(obj, {
    get(target, prop) {
      console.log(`Accessed property: ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      console.log(`Set property: ${prop} = ${value}`);
      target[prop] = value;
      return true;
    }
  });
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
