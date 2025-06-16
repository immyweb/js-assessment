import { describe, beforeEach, test, expect } from 'vitest';

import {
  // Array creation and access
  createArray,
  getElement,
  first,
  last,
  // Array search and filtering
  indexOf,
  contains,
  filterEvens,
  filterBy,
  count,
  duplicates,
  findAllOccurrences,
  // Array manipulation
  remove,
  removeWithoutCopy,
  append,
  truncate,
  prepend,
  curtail,
  concat,
  insert,
  // Array transformation
  double,
  mapBy,
  square,
  // Array reduction
  max,
  min,
  product,
  sumArray,
  // Array checking
  allPositive,
  hasNegative,
  isEmpty,
  // Array sorting
  sortAscending,
  sortDescending,
  // Array utilities
  reverse,
  unique,
  flatten,
  slice,
  chunk
} from '../exercises/arrays';

describe('Arrays', () => {
  let a = [];

  beforeEach(() => {
    a = [1, 2, 3, 4];
  });

  // ==== ARRAY CREATION AND ACCESS ====

  describe('Array Creation and Access', () => {
    test('should create array of specified size with fill value', () => {
      expect(createArray(3, 'x')).toEqual(['x', 'x', 'x']);
      expect(createArray(5, 0)).toEqual([0, 0, 0, 0, 0]);
      expect(createArray(0, 'test')).toEqual([]);
    });

    test('should get element by index safely', () => {
      expect(getElement([1, 2, 3], 1)).toBe(2);
      expect(getElement([1, 2, 3], 5)).toBeUndefined();
      expect(getElement([1, 2, 3], -1)).toBe(3);
      expect(getElement([1, 2, 3], -2)).toBe(2);
    });

    test('should get first element', () => {
      expect(first([1, 2, 3])).toBe(1);
      expect(first(['a', 'b', 'c'])).toBe('a');
      expect(first([])).toBeUndefined();
    });

    test('should get last element', () => {
      expect(last([1, 2, 3])).toBe(3);
      expect(last(['a', 'b', 'c'])).toBe('c');
      expect(last([])).toBeUndefined();
    });
  });

  // ==== ARRAY SEARCH AND FILTERING ====

  describe('Array Search and Filtering', () => {
    test('should find index of item', () => {
      expect(indexOf([1, 2, 3, 2], 2)).toBe(1);
      expect(indexOf([1, 2, 3], 5)).toBe(-1);
      expect(indexOf(['a', 'b', 'c'], 'b')).toBe(1);
    });

    test('should check if array contains item', () => {
      expect(contains([1, 2, 3], 2)).toBe(true);
      expect(contains([1, 2, 3], 5)).toBe(false);
      expect(contains(['a', 'b'], 'c')).toBe(false);
    });

    test('should filter even numbers', () => {
      expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
      expect(filterEvens([1, 3, 5])).toEqual([]);
      expect(filterEvens([2, 4, 6])).toEqual([2, 4, 6]);
    });

    test('should filter with custom predicate', () => {
      expect(filterBy([1, 2, 3, 4, 5], (x) => x > 3)).toEqual([4, 5]);
      expect(
        filterBy(['apple', 'banana', 'cherry'], (s) => s.length > 5)
      ).toEqual(['banana', 'cherry']);
      expect(filterBy([1, 2, 3], (x) => x > 10)).toEqual([]);
    });

    test('should count the occurences of an item in an array', () => {
      const result = count([1, 2, 4, 4, 3, 4, 3], 4);
      expect(result).toEqual(3);
    });

    test('should find duplicates in an array', () => {
      const result = duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]);
      expect(result.sort()).toEqual([1, 3, 4]);
    });

    test('should find all occurrences of an item in an array', () => {
      const result = findAllOccurrences([1, 2, 3, 4, 5, 6, 1, 7], 1);
      expect(result.sort().join(' ')).toEqual('0 6');
    });
  });

  // ==== ARRAY MANIPULATION ====

  describe('Array Manipulation', () => {
    test('should remove all instances of a value from an array', () => {
      a.push(2); // Make sure the value appears more than one time
      a.push(2); // Make sure the value appears more than one time in a row
      const result = remove(a, 2);

      expect(result).toHaveLength(3);
      expect(result.join(' ')).toEqual('1 3 4');
    });

    test('should remove all instances of a value from an array, returning the original array', () => {
      a.splice(1, 0, 2);
      a.push(2);
      a.push(2);

      const result = removeWithoutCopy(a, 2);

      expect(result).toHaveLength(3);
      expect(result.join(' ')).toEqual('1 3 4');

      // make sure that you return the same array instance
      expect(result).toEqual(a);
    });

    test('should add an item to the end of an array', () => {
      const result = append(a, 10);

      expect(result).toHaveLength(5);
      expect(result[result.length - 1]).toEqual(10);
    });

    test('should remove the last item of an array', () => {
      const result = truncate(a);

      expect(result).toHaveLength(3);
      expect(result.join(' ')).toEqual('1 2 3');
    });

    test('should add an item to the beginning of an array', () => {
      const result = prepend(a, 10);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual(10);
    });

    test('should remove the first item of an array', () => {
      const result = curtail(a);

      expect(result).toHaveLength(3);
      expect(result.join(' ')).toEqual('2 3 4');
    });

    test('should join together two arrays', () => {
      const c = ['a', 'b', 'c', 1];
      const result = concat(a, c);

      expect(result).toHaveLength(8);
      expect(result.join(' ')).toEqual('1 2 3 4 a b c 1');
    });

    test('should add an item anywhere in an array', () => {
      const result = insert(a, 'z', 2);

      expect(result).toHaveLength(5);
      expect(result.join(' ')).toEqual('1 2 z 3 4');
    });
  });

  // ==== ARRAY TRANSFORMATION ====

  describe('Array Transformation', () => {
    test('should double each number', () => {
      expect(double([1, 2, 3])).toEqual([2, 4, 6]);
      expect(double([0, -1, 5])).toEqual([0, -2, 10]);
      expect(double([])).toEqual([]);
    });

    test('should map with custom transform', () => {
      expect(mapBy([1, 2, 3], (x) => x * x)).toEqual([1, 4, 9]);
      expect(mapBy(['a', 'b', 'c'], (s) => s.toUpperCase())).toEqual([
        'A',
        'B',
        'C'
      ]);
      expect(mapBy([1, 2, 3], (x) => x + 1)).toEqual([2, 3, 4]);
    });

    test('should square each number in an array', () => {
      const result = square(a);
      expect(result).toHaveLength(4);
      expect(result.join(' ')).toEqual('1 4 9 16');
    });
  });

  // ==== ARRAY REDUCTION ====

  describe('Array Reduction', () => {
    test('should find maximum value', () => {
      expect(max([1, 5, 3, 9, 2])).toBe(9);
      expect(max([-1, -5, -2])).toBe(-1);
      expect(max([42])).toBe(42);
      expect(max([])).toBeUndefined();
    });

    test('should find minimum value', () => {
      expect(min([1, 5, 3, 9, 2])).toBe(1);
      expect(min([-1, -5, -2])).toBe(-5);
      expect(min([42])).toBe(42);
      expect(min([])).toBeUndefined();
    });

    test('should calculate product of all numbers', () => {
      expect(product([1, 2, 3, 4])).toBe(24);
      expect(product([2, 5])).toBe(10);
      expect(product([0, 1, 2])).toBe(0);
      expect(product([])).toBe(1);
    });

    test('should sum the items of an array', () => {
      expect(sumArray(a)).toEqual(10);
    });
  });

  // ==== ARRAY CHECKING ====

  describe('Array Checking', () => {
    test('should check if all numbers are positive', () => {
      expect(allPositive([1, 2, 3])).toBe(true);
      expect(allPositive([1, -2, 3])).toBe(false);
      expect(allPositive([0, 1, 2])).toBe(false);
      expect(allPositive([])).toBe(true);
    });

    test('should check if any number is negative', () => {
      expect(hasNegative([1, 2, 3])).toBe(false);
      expect(hasNegative([1, -2, 3])).toBe(true);
      expect(hasNegative([-1, -2, -3])).toBe(true);
      expect(hasNegative([])).toBe(false);
    });

    test('should check if array is empty', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty([null])).toBe(false);
    });
  });

  // ==== ARRAY SORTING ====

  describe('Array Sorting', () => {
    test('should sort in ascending order', () => {
      expect(sortAscending([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
      expect(sortAscending(['c', 'a', 'b'])).toEqual(['a', 'b', 'c']);
      expect(sortAscending([])).toEqual([]);
    });

    test('should sort in descending order', () => {
      expect(sortDescending([3, 1, 4, 1, 5])).toEqual([5, 4, 3, 1, 1]);
      expect(sortDescending(['a', 'c', 'b'])).toEqual(['c', 'b', 'a']);
      expect(sortDescending([])).toEqual([]);
    });
  });

  // ==== ARRAY UTILITIES ====

  describe('Array Utilities', () => {
    test('should reverse an array', () => {
      expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
      expect(reverse(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
      expect(reverse([])).toEqual([]);
      expect(reverse([1])).toEqual([1]);
    });

    test('should get unique elements', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      expect(unique([1, 1, 1])).toEqual([1]);
      expect(unique([])).toEqual([]);
    });

    test('should flatten nested array one level', () => {
      expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
      expect(flatten([['a'], ['b', 'c'], ['d']])).toEqual(['a', 'b', 'c', 'd']);
      expect(flatten([])).toEqual([]);
    });

    test('should slice array', () => {
      expect(slice([1, 2, 3, 4, 5], 1, 4)).toEqual([2, 3, 4]);
      expect(slice([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
      expect(slice([1, 2, 3], 0, 2)).toEqual([1, 2]);
      expect(slice([1, 2, 3], 5, 10)).toEqual([]);
    });

    describe('Array chunking', () => {
      test('chunk divides an array of 10 elements with chunk size 2', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const chunked = chunk(arr, 2);

        expect(chunked).toEqual([
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
          [9, 10]
        ]);
      });

      test('chunk divides an array of 3 elements with chunk size 1', () => {
        const arr = [1, 2, 3];
        const chunked = chunk(arr, 1);

        expect(chunked).toEqual([[1], [2], [3]]);
      });

      test('chunk divides an array of 5 elements with chunk size 3', () => {
        const arr = [1, 2, 3, 4, 5];
        const chunked = chunk(arr, 3);

        expect(chunked).toEqual([
          [1, 2, 3],
          [4, 5]
        ]);
      });

      test('chunk divides an array of 13 elements with chunk size 5', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const chunked = chunk(arr, 5);

        expect(chunked).toEqual([
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10],
          [11, 12, 13]
        ]);
      });
    });
  });
});
