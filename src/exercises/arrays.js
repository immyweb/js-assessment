// you should be able to sum the items of an array
// Example:
//   sumArray([1, 2, 3]) === 6
export function sumArray(arr) {}

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

// you should be able to count the occurences of an item in an array
// Example:
//   count([1, 2, 4, 4, 3, 4, 3], 4) === 3
export function count(arr, item) {}

// you should be able to find duplicates in an array
// Example:
//   duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]) === [1, 3, 4]
export function duplicates(arr) {}

// you should be able to square each number in an array
// Example:
//   square([1, 2, 3]) === [1, 4, 9]
export function square(arr) {}

// you should be able to find all occurrences of an item in an array
// and return a string of index positions
// Example:
//   findAllOccurrences([1, 2, 3, 4, 5, 6, 1, 7], 1) === "0 6"
export function findAllOccurrences(arr, target) {}

// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
export function chunk(arr, size) {}
