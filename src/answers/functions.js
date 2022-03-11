// you should be able to use an array as arguments
// when calling a function
// Example:
//   argsAsArray(fn, ["Hi", "there"]) === "Hi there"
export function argsAsArray(fn, arr) {
  return fn.apply(null, arr);
}

// you should be able to change the context
// in which a function is called
// Example:
//   speak(fn, { greeting: "Hi", name: "Oscar"}) === "Hi Oscar"
export function speak(fn, obj) {
  return fn.call(obj);
}

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

  arr.forEach((num, i) => {
    ret.push(makeFn(arr[i]));
  });

  return ret;
}

// you should be able to create a "partial" function
// Example:
//   const partial1 = partial(sayIt, "Hello", "Ellie");
//   partial1("!!!") === "Hello, Ellie!!!"
export function partial(fn, str1, str2) {
  return (str3) => {
    return fn(str1, str2, str3);
  };
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
