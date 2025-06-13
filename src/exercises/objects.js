// you should be able to alter the context in which a method runs
// Example:
//   alterContext(fn, obj) === "Yo, Charlie!"
export function alterContext(fn, obj) {}

// you should be able to alter multiple objects at once
// Example:
//   new Constructor("ellie").greeting === "Whats up"
export function alterObjects(constructor, greeting) {}

// you should be able to iterate over an object's "own" properties
// and return an array of properties.
// Example:
//   iterate(obj) === ["foo: bar", "baz: bim"]
export function iterate(obj) {}

// you should be able to bind arguments to a function permanently
// Example:
//   const add5 = bindArgs(add, 5);
//   add5(3) === 8
export function bindArgs(fn, ...boundArgs) {}

// you should be able to create a method that can access private data
// Example:
//   const counter = createCounter();
//   counter.increment() === 1
//   counter.increment() === 2
export function createCounter() {}

// you should be able to create a proxy that logs property access
// Example:
//   const logged = createLoggingProxy(obj);
//   logged.name; // logs "Accessed property: name"
export function createLoggingProxy(obj) {}

// you should be able to freeze an object deeply (including nested objects)
// Example:
//   deepFreeze(obj) makes obj and all nested objects immutable
export function deepFreeze(obj) {}

// you should be able to create a factory function with private methods
// Example:
//   const person = createPerson("Alice", 25);
//   person.getInfo() === "Alice is 25 years old"
export function createPerson(name, age) {}

// you should be able to chain method calls fluently
// Example:
//   calculator().add(5).multiply(2).subtract(3).value === 7
export function calculator(initial = 0) {}
