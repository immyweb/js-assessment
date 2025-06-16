/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises cover fundamental array concepts including creation,
 * access, manipulation, iteration, and higher-order methods.
 */

// ==== ARRAY CREATION AND ACCESS ====

// you should be able to create an array of a specified size filled with a value
// Example:
//   createArray(3, 'x') === ['x', 'x', 'x']
//   createArray(5, 0) === [0, 0, 0, 0, 0]
export function createArray(size, fillValue) {}

// you should be able to access array elements safely
// Example:
//   getElement([1, 2, 3], 1) === 2
//   getElement([1, 2, 3], 5) === undefined
//   getElement([1, 2, 3], -1) === 3 (last element)
export function getElement(arr, index) {}

// you should be able to get the first element of an array
// Example:
//   first([1, 2, 3]) === 1
//   first([]) === undefined
export function first(arr) {}

// you should be able to get the last element of an array
// Example:
//   last([1, 2, 3]) === 3
//   last([]) === undefined
export function last(arr) {}

// ==== ARRAY SEARCH AND FILTERING ====

// you should be able to find the index of an item in an array
// Example:
//   indexOf([1, 2, 3, 2], 2) === 1 (first occurrence)
//   indexOf([1, 2, 3], 5) === -1 (not found)
export function indexOf(arr, item) {}

// you should be able to check if an array contains an item
// Example:
//   contains([1, 2, 3], 2) === true
//   contains([1, 2, 3], 5) === false
export function contains(arr, item) {}

// you should be able to filter an array based on a condition
// Example:
//   filterEvens([1, 2, 3, 4, 5, 6]) === [2, 4, 6]
export function filterEvens(arr) {}

// you should be able to filter an array with a custom function
// Example:
//   filterBy([1, 2, 3, 4, 5], x => x > 3) === [4, 5]
export function filterBy(arr, predicate) {}

// you should be able to count the occurences of an item in an array
// Example:
//   count([1, 2, 4, 4, 3, 4, 3], 4) === 3
export function count(arr, item) {}

// you should be able to find duplicates in an array
// Example:
//   duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]) === [1, 3, 4]
export function duplicates(arr) {}

// you should be able to find all occurrences of an item in an array
// and return a string of index positions
// Example:
//   findAllOccurrences([1, 2, 3, 4, 5, 6, 1, 7], 1) === "0 6"
export function findAllOccurrences(arr, target) {}

// ==== ARRAY MANIPULATION ====

// you should be able to remove all instances of a value from an array
// Example:
//   remove([1, 2, 3], 2) === [1, 3]
export function remove(arr, item) {}

// you should be able to remove all instances of a value from an array, returning the original array
// Example:
//   removeWithoutCopy([1, 2, 3], 2) === [1, 3]
export function removeWithoutCopy(arr, item) {}

// you should be able to add an item to the end of an array
// Example:
//   append([1, 2, 3], 10) === [1, 2, 3, 10]
export function append(arr, item) {}

// you should be able to remove the last item of an array
// Example:
//   truncate([1, 2, 3]) === [1, 2]
export function truncate(arr) {}

// you should be able to add an item to the beginning of an array
// Example:
//   prepend([1, 2, 3], 10) === [10, 1, 2, 3]
export function prepend(arr, item) {}

// you should be able to remove the first item of an array
// Example:
//   curtail([1, 2, 3]) === [2, 3]
export function curtail(arr) {}

// you should be able to join together two arrays
// Example:
//   concat([1, 2, 3], [4, 5, 6]) === [1, 2, 3, 4, 5, 6]
export function concat(arr1, arr2) {}

// you should be able to add an item anywhere in an array
// Example:
//   insert([1, 2, 3], "z", 1) === [1, z, 2, 3]
export function insert(arr, item, index) {}

// ==== ARRAY TRANSFORMATION ====

// you should be able to transform each element in an array
// Example:
//   double([1, 2, 3]) === [2, 4, 6]
export function double(arr) {}

// you should be able to map an array with a custom function
// Example:
//   mapBy([1, 2, 3], x => x * x) === [1, 4, 9]
export function mapBy(arr, transform) {}

// you should be able to square each number in an array
// Example:
//   square([1, 2, 3]) === [1, 4, 9]
export function square(arr) {}

// ==== ARRAY REDUCTION ====

// you should be able to find the maximum value in an array
// Example:
//   max([1, 5, 3, 9, 2]) === 9
//   max([]) === undefined
export function max(arr) {}

// you should be able to find the minimum value in an array
// Example:
//   min([1, 5, 3, 9, 2]) === 1
//   min([]) === undefined
export function min(arr) {}

// you should be able to reduce an array to a single value
// Example:
//   product([1, 2, 3, 4]) === 24
//   product([]) === 1
export function product(arr) {}

// you should be able to sum the items of an array
// Example:
//   sumArray([1, 2, 3]) === 6
export function sumArray(arr) {}

// ==== ARRAY CHECKING ====

// you should be able to check if all elements meet a condition
// Example:
//   allPositive([1, 2, 3]) === true
//   allPositive([1, -2, 3]) === false
export function allPositive(arr) {}

// you should be able to check if any element meets a condition
// Example:
//   hasNegative([1, 2, 3]) === false
//   hasNegative([1, -2, 3]) === true
export function hasNegative(arr) {}

// you should be able to check if an array is empty
// Example:
//   isEmpty([]) === true
//   isEmpty([1]) === false
export function isEmpty(arr) {}

// ==== ARRAY SORTING ====

// you should be able to sort an array in ascending order
// Example:
//   sortAscending([3, 1, 4, 1, 5]) === [1, 1, 3, 4, 5]
export function sortAscending(arr) {}

// you should be able to sort an array in descending order
// Example:
//   sortDescending([3, 1, 4, 1, 5]) === [5, 4, 3, 1, 1]
export function sortDescending(arr) {}

// ==== ARRAY UTILITIES ====

// you should be able to reverse an array
// Example:
//   reverse([1, 2, 3]) === [3, 2, 1]
export function reverse(arr) {}

// you should be able to get unique elements from an array
// Example:
//   unique([1, 2, 2, 3, 3, 3]) === [1, 2, 3]
export function unique(arr) {}

// you should be able to flatten a nested array one level
// Example:
//   flatten([[1, 2], [3, 4], [5]]) === [1, 2, 3, 4, 5]
export function flatten(arr) {}

// you should be able to get a slice of an array
// Example:
//   slice([1, 2, 3, 4, 5], 1, 4) === [2, 3, 4]
//   slice([1, 2, 3, 4, 5], 2) === [3, 4, 5]
export function slice(arr, start, end) {}

// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
export function chunk(arr, size) {}
