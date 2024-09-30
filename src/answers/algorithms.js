// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'
export function steps(n, row = 0, stair = '') {
  // Base case. Stops once all rows have been processed.
  if (n === row) {
    return;
  }

  if (n === stair.length) {
    console.log(stair);
    return steps(n, row + 1);
  }

  if (stair.length <= row) {
    stair += '#';
  } else {
    stair += ' ';
  }
  steps(n, row, stair);
}

// --- Directions
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceeding two.
// For example, the sequence
//  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// forms the first ten entries of the fibonacci series.
// Example:
//   fib(4) === 3
export function fib(n) {
  let result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }

  const res = result[n];

  return res;
}

// --- Directions
// Implement bubbleSort
export function bubbleSort(arr) {}

// --- Directions
// Implement selectionSort
export function selectionSort(arr) {}

// --- Directions
// Implement mergeSort
export function mergeSort(arr) {}

export function merge(left, right) {}
