// you should be able to sum the items of an array
export function sumArray(arr) {
  const result = arr.reduce((a, b) => a + b);
  return result;
}

// you should be able to remove all instances of a value from an array
export function remove(arr, item) {
  const result = arr.filter((num) => num !== item);
  return result;
}

// you should be able to remove all instances of a value from an array, returning the original array
export function removeWithoutCopy(arr, item) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === item) {
      arr.splice(i, 1);
    }
  }

  return arr;
}

// you should be able to add an item to the end of an array
export function append(arr, item) {
  arr.push(item);
  return arr;
}

// you should be able to remove the last item of an array
export function truncate(arr) {
  arr.pop();
  return arr;
}

// you should be able to add an item to the beginning of an array
export function prepend(arr, item) {
  arr.unshift(item);
  return arr;
}

// you should be able to remove the first item of an array
export function curtail(arr) {
  arr.shift();
  return arr;
}

// you should be able to join together two arrays
export function concat(arr1, arr2) {
  return [...arr1, ...arr2];
}

// you should be able to add an item anywhere in an array
export function insert(arr, item, index) {
  arr.splice(index, 0, item);
  return arr;
}

// you should be able to count the occurences of an item in an array
export function count(arr, item) {
  let count = 0;
  arr.forEach((i) => {
    if (arr[i] === item) {
      count++;
    }
  });
  return count;
}

// you should be able to find duplicates in an array
export function duplicates(arr) {
  let dupes = {};
  let result = [];

  arr.forEach((num) => {
    if (dupes[num]) {
      dupes[num]++;
    } else {
      dupes[num] = 1;
    }
  });

  for (let prop in dupes) {
    if (dupes.hasOwnProperty(prop) && dupes[prop] > 1) {
      result.push(parseInt(prop));
    }
  }

  return result;
}

// you should be able to square each number in an array
export function square(arr) {
  const newArr = arr.map((i) => {
    return i * i;
  });

  return newArr;
}

// you should be able to find all occurrences of an item in an array
export function findAllOccurrences(arr, target) {
  let ret = [];

  arr.forEach((i, index) => {
    if (i === target) {
      ret.push(index);
    }
  });

  return ret;
}

// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
export function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }

  return chunked;
}
