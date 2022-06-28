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
