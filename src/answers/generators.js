/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on generators and iterators in JavaScript.
 * You'll need to understand generator functions, yield expressions, iterator protocol,
 * and how to create custom iterable objects.
 *
 * Generators are powerful for creating lazy sequences, managing state,
 * and implementing custom iteration patterns.
 */

/**
 * Write a generator function that yields numbers from 1 to n.
 *
 * [...countTo(5)] // [1, 2, 3, 4, 5]
 * [...countTo(3)] // [1, 2, 3]
 */
export function* countTo(n) {
  let index = 1;

  while (index <= n) {
    yield index++;
  }
}

/**
 * Write a generator function that yields even numbers up to a limit.
 *
 * [...evenNumbers(10)] // [2, 4, 6, 8, 10]
 * [...evenNumbers(5)] // [2, 4]
 */
export function* evenNumbers(limit) {
  for (let i = 2; i <= limit; i += 2) {
    yield i;
  }
}

/**
 * Write a generator function that repeats a value n times.
 *
 * [...repeat('hello', 3)] // ['hello', 'hello', 'hello']
 * [...repeat('x', 2)] // ['x', 'x']
 */
export function* repeat(value, times) {
  for (let i = 0; i < times; i++) {
    yield value;
  }
}

/**
 * Write a generator function that yields items from an array one by one.
 *
 * [...arrayGenerator([1, 2, 3])] // [1, 2, 3]
 * [...arrayGenerator(['a', 'b'])] // ['a', 'b']
 */
export function* arrayGenerator(array) {
  for (let i = 0; i < array.length; i++) {
    yield array[i];
  }
}

/**
 * Write a generator function that yields the first n Fibonacci numbers.
 *
 * [...fibonacci(5)] // [0, 1, 1, 2, 3]
 * [...fibonacci(7)] // [0, 1, 1, 2, 3, 5, 8]
 */
export function* fibonacci(n) {
  let previous = 0;
  let current = 1;
  let yieldCount = 0;

  while (yieldCount < n) {
    yield previous;
    [previous, current] = [current, previous + current];
    yieldCount++;
  }
}

/**
 * Write a function that creates a simple iterator object.
 * The object should have a next() method that returns {value, done}.
 *
 * const iter = createIterator([1, 2, 3]);
 * iter.next() // {value: 1, done: false}
 * iter.next() // {value: 2, done: false}
 * iter.next() // {value: 3, done: false}
 * iter.next() // {value: undefined, done: true}
 */
export function createIterator(array) {
  let index = 0;

  return {
    next() {
      if (index < array.length) {
        index++;
        return { value: array[index - 1], done: false };
      } else {
        return { value: undefined, done: true };
      }
    }
  };
}
