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
