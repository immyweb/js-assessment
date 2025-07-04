import { describe, test, expect, vi } from 'vitest';

import {
  // Maps, Sets, WeakMap, and WeakSet
  countCharacters,
  setOperations,
  createPersonWithPrivateData,
  createObjectProcessor,
  // Advanced Collection Operations
  createBidirectionalMap,
  createExpiringCache,
  createMultiValueMap,
  createObservableSet,
  // Collection Transformations
  mapToArray,
  arrayToMap,
  createFilteredSetView,
  deepCloneCollection,
  collectionMap,
  collectionFilter,
  collectionReduce
} from '../exercises/es6-collections';

describe('ES6 Collections: Maps, Sets, WeakMap, and WeakSet', () => {
  describe('Basic Collection Types', () => {
    describe('countCharacters', () => {
      test('should count character frequencies using Map', () => {
        const result = countCharacters('hello');
        expect(result instanceof Map).toBe(true);
        expect(result.get('h')).toBe(1);
        expect(result.get('e')).toBe(1);
        expect(result.get('l')).toBe(2);
        expect(result.get('o')).toBe(1);
      });

      test('should handle empty string', () => {
        const result = countCharacters('');
        expect(result instanceof Map).toBe(true);
        expect(result.size).toBe(0);
      });

      test('should handle repeated characters', () => {
        const result = countCharacters('aaaaaa');
        expect(result.get('a')).toBe(6);
        expect(result.size).toBe(1);
      });
    });

    describe('setOperations', () => {
      test('should perform set operations correctly', () => {
        const result = setOperations([1, 2, 3], [2, 3, 4]);
        expect(result.union.sort()).toEqual([1, 2, 3, 4]);
        expect(result.intersection.sort()).toEqual([2, 3]);
        expect(result.difference.sort()).toEqual([1]);
      });

      test('should handle disjoint sets', () => {
        const result = setOperations([1, 2], [3, 4]);
        expect(result.union.sort()).toEqual([1, 2, 3, 4]);
        expect(result.intersection).toEqual([]);
        expect(result.difference.sort()).toEqual([1, 2]);
      });

      test('should handle identical sets', () => {
        const result = setOperations([1, 2, 3], [1, 2, 3]);
        expect(result.union.sort()).toEqual([1, 2, 3]);
        expect(result.intersection.sort()).toEqual([1, 2, 3]);
        expect(result.difference).toEqual([]);
      });
    });

    describe('createPersonWithPrivateData', () => {
      test('should create person with private data access', () => {
        const person = createPersonWithPrivateData('John', 25);
        expect(typeof person.getName).toBe('function');
        expect(typeof person.getAge).toBe('function');
        expect(person.getName()).toBe('John');
        expect(person.getAge()).toBe(25);
      });

      test('should not expose private data directly', () => {
        const person = createPersonWithPrivateData('Alice', 30);
        expect(person.name).toBeUndefined();
        expect(person.age).toBeUndefined();
      });

      test('should work with different instances', () => {
        const person1 = createPersonWithPrivateData('John', 25);
        const person2 = createPersonWithPrivateData('Jane', 30);
        expect(person1.getName()).toBe('John');
        expect(person2.getName()).toBe('Jane');
      });
    });

    describe('createObjectProcessor', () => {
      test('should track processed objects using WeakSet', () => {
        const processor = createObjectProcessor();
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };

        expect(processor.process(obj1)).toBe('Processed');
        expect(processor.process(obj1)).toBe('Already processed');
        expect(processor.process(obj2)).toBe('Processed');
      });

      test('should handle multiple objects independently', () => {
        const processor = createObjectProcessor();
        const objA = { data: 'A' };
        const objB = { data: 'B' };

        processor.process(objA);
        expect(processor.process(objB)).toBe('Processed');
        expect(processor.process(objA)).toBe('Already processed');
      });
    });
  });

  describe('Advanced Collection Operations', () => {
    describe('createBidirectionalMap', () => {
      test('should allow lookup by key or value', () => {
        const biMap = createBidirectionalMap([
          ['key1', 'value1'],
          ['key2', 'value2']
        ]);
        expect(biMap.getByKey('key1')).toBe('value1');
        expect(biMap.getByValue('value2')).toBe('key2');
      });

      test('should handle empty entries', () => {
        const biMap = createBidirectionalMap();
        expect(biMap.getByKey('nonexistent')).toBeUndefined();
      });
    });

    describe('createExpiringCache', () => {
      test('should cache values with expiration', async () => {
        vi.useFakeTimers();
        const cache = createExpiringCache(100);

        cache.set('key', 'value');
        expect(cache.get('key')).toBe('value');

        vi.advanceTimersByTime(101);
        expect(cache.get('key')).toBeUndefined();

        vi.useRealTimers();
      });
    });

    describe('createMultiValueMap', () => {
      test('should associate multiple values with keys', () => {
        const multiMap = createMultiValueMap();

        multiMap.add('fruits', 'apple');
        multiMap.add('fruits', 'banana');

        expect(multiMap.get('fruits')).toEqual(['apple', 'banana']);
      });

      test('should handle keys with single values', () => {
        const multiMap = createMultiValueMap();

        multiMap.add('colors', 'blue');
        expect(multiMap.get('colors')).toEqual(['blue']);
      });
    });

    describe('createObservableSet', () => {
      test('should call observers for set operations', () => {
        const addObserver = vi.fn();
        const deleteObserver = vi.fn();

        const obsSet = createObservableSet([1, 2], {
          add: addObserver,
          delete: deleteObserver
        });

        obsSet.add(3);
        obsSet.delete(1);

        expect(addObserver).toHaveBeenCalledWith(3);
        expect(deleteObserver).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('Collection Transformations', () => {
    describe('mapToArray and arrayToMap', () => {
      test('should convert between Map and array format', () => {
        const map = new Map([
          ['key', 'value'],
          ['number', 42]
        ]);
        const arr = mapToArray(map);

        expect(Array.isArray(arr)).toBe(true);

        const recreatedMap = arrayToMap(arr);
        expect(recreatedMap instanceof Map).toBe(true);
        expect(recreatedMap.get('key')).toBe('value');
        expect(recreatedMap.get('number')).toBe(42);
      });
    });

    describe('createFilteredSetView', () => {
      test('should create a filtered view of a set', () => {
        const numbers = new Set([1, 2, 3, 4, 5]);
        const evens = createFilteredSetView(numbers, (n) => n % 2 === 0);

        expect(evens.has(2)).toBe(true);
        expect(evens.has(4)).toBe(true);
        expect(evens.has(1)).toBe(false);
        expect(evens.has(3)).toBe(false);
      });

      test('should update view when original set changes', () => {
        const numbers = new Set([1, 2, 3]);
        const evens = createFilteredSetView(numbers, (n) => n % 2 === 0);

        numbers.add(4);
        expect(evens.has(4)).toBe(true);
      });
    });

    describe('deepCloneCollection', () => {
      test('should deep clone nested collections', () => {
        const original = new Map([
          ['key', new Set([1, 2, 3])],
          ['obj', { a: 1 }]
        ]);

        const clone = deepCloneCollection(original);

        expect(clone).not.toBe(original);
        expect(clone.get('key')).not.toBe(original.get('key'));
        expect([...clone.get('key')]).toEqual([1, 2, 3]);
      });
    });

    describe('collectionMap, collectionFilter, collectionReduce', () => {
      test('should map collection values', () => {
        const result = collectionMap(new Set([1, 2, 3]), (x) => x * 2);
        expect([...result]).toEqual([2, 4, 6]);
      });

      test('should filter collection values', () => {
        const result = collectionFilter(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3]
          ]),
          ([k, v]) => v > 1
        );
        expect(result.size).toBe(2);
        expect(result.get('b')).toBe(2);
        expect(result.get('c')).toBe(3);
      });

      test('should reduce collection values', () => {
        const result = collectionReduce(
          new Set([1, 2, 3, 4]),
          (acc, val) => acc + val,
          0
        );
        expect(result).toBe(10);
      });
    });
  });
});
