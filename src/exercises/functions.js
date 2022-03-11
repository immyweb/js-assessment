// you should be able to use an array as arguments
// when calling a function
// Example:
//   argsAsArray(fn, ["Hi", "there"]) === "Hi there"
export function argsAsArray(fn, arr) {}

// you should be able to change the context
// in which a function is called
// Example:
//   speak(fn, { greeting: "Hi", name: "Oscar"}) === "Hi Oscar"
export function speak(fn, obj) {}

// you should be able to return a function from a function
// Example:
//   functionFunction("Hi")("there") === "Hi, there"
export function functionFunction(str) {}

// you should be able to use closures
// TODO: Write instructions / example
export function makeClosures(arr, fn) {}

// you should be able to create a "partial" function
// Example:
//   const partial1 = partial(sayIt, "Hello", "Ellie");
//   partial1("!!!") === "Hello, Ellie!!!"
export function partial(fn, str1, str2) {}

// you should be able to use sum the arguments
// Example:
//   useArguments(1, 2) === 3
//   useArguments(1, 2, 3) === 6
export function useArguments() {}

// you should be able to apply functions with
// arbitrary numbers of arguments
export function callIt(fn) {}

// you should be able to create a "partial" function
// for variable number of applied arguments.
// fn takes 3 numbers & performs a calculation
// Example:
//   partialUsingArguments(fn)(4, 2, 1)) === 2
//   partialUsingArguments(fn, 4)(2, 1)) === 2
//   partialUsingArguments(fn, 4, 2)(1)) === 2
export function partialUsingArguments(fn) {}

// you should be able to curry existing functions
// fn takes 3 numbers & performs a calculation
// Example:
//   curryIt(fn)(4)(2)(1) === 2
export function curryIt(fn) {}
