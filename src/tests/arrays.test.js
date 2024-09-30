import { describe, beforeEach, test, expect } from 'vitest';

import {
  sumArray,
  remove,
  removeWithoutCopy,
  append,
  truncate,
  prepend,
  curtail,
  concat,
  insert,
  count,
  duplicates,
  square,
  findAllOccurrences,
  chunk
} from '../exercises/arrays';

describe('Arrays', () => {
  let a = [];

  beforeEach(() => {
    a = [1, 2, 3, 4];
  });

  test('you should be able to sum the items of an array', () => {
    expect(sumArray(a)).toEqual(10);
  });

  test('you should be able to remove all instances of a value from an array', () => {
    a.push(2); // Make sure the value appears more than one time
    a.push(2); // Make sure the value appears more than one time in a row
    const result = remove(a, 2);

    expect(result).toHaveLength(3);
    expect(result.join(' ')).toEqual('1 3 4');
  });

  test('you should be able to remove all instances of a value from an array, returning the original array', () => {
    a.splice(1, 0, 2);
    a.push(2);
    a.push(2);

    const result = removeWithoutCopy(a, 2);

    expect(result).toHaveLength(3);
    expect(result.join(' ')).toEqual('1 3 4');

    // make sure that you return the same array instance
    expect(result).toEqual(a);
  });

  test('you should be able to add an item to the end of an array', () => {
    const result = append(a, 10);

    expect(result).toHaveLength(5);
    expect(result[result.length - 1]).toEqual(10);
  });

  test('you should be able to remove the last item of an array', () => {
    const result = truncate(a);

    expect(result).toHaveLength(3);
    expect(result.join(' ')).toEqual('1 2 3');
  });

  test('you should be able to add an item to the beginning of an array', () => {
    const result = prepend(a, 10);

    expect(result).toHaveLength(5);
    expect(result[0]).toEqual(10);
  });

  test('you should be able to remove the first item of an array', () => {
    const result = curtail(a);

    expect(result).toHaveLength(3);
    expect(result.join(' ')).toEqual('2 3 4');
  });

  test('you should be able to join together two arrays', () => {
    const c = ['a', 'b', 'c', 1];
    const result = concat(a, c);

    expect(result).toHaveLength(8);
    expect(result.join(' ')).toEqual('1 2 3 4 a b c 1');
  });

  test('you should be able to add an item anywhere in an array', () => {
    const result = insert(a, 'z', 2);

    expect(result).toHaveLength(5);
    expect(result.join(' ')).toEqual('1 2 z 3 4');
  });

  test('you should be able to count the occurences of an item in an array', () => {
    const result = count([1, 2, 4, 4, 3, 4, 3], 4);

    expect(result).toEqual(3);
  });

  test('you should be able to find duplicates in an array', () => {
    const result = duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]);

    expect(result.sort()).toEqual([1, 3, 4]);
  });

  test('you should be able to square each number in an array', () => {
    const result = square(a);

    expect(result).toHaveLength(4);
    expect(result.join(' ')).toEqual('1 4 9 16');
  });

  test('you should be able to find all occurrences of an item in an array', () => {
    const result = findAllOccurrences([1, 2, 3, 4, 5, 6, 1, 7], 1);
    expect(result.sort().join(' ')).toEqual('0 6');
  });

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
