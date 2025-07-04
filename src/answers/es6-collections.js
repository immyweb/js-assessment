/**
 * ES6 Collections: Maps, Sets, WeakMap, WeakSet, and Collection Operations
 *
 * This file contains exercises focusing on the new collection types introduced in ES6+
 * and their unique features for managing and manipulating data.
 */

// ===== MAPS, SETS, WEAKMAP, AND WEAKSET =====

/**
 * Write a function that uses Map to count character frequencies.
 * Return a Map with characters as keys and counts as values.
 *
 * countCharacters("hello") // Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }
 */
export function countCharacters(str) {
  const charMap = new Map();

  str.split('').forEach((char) => {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  });
  return charMap;
}

/**
 * Write a function that uses Set operations (union, intersection, difference).
 * Return an object with the results of set operations.
 *
 * setOperations([1, 2, 3], [2, 3, 4])
 * // {union: [1, 2, 3, 4], intersection: [2, 3], difference: [1]}
 */
export function setOperations(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return {
    union: [...set1.union(set2)],
    intersection: [...set1.intersection(set2)],
    difference: [...set1.difference(set2)]
  };
}

/**
 * Write a function that demonstrates WeakMap usage for private data.
 * Create a class-like function that uses WeakMap for private properties.
 *
 * const person = createPersonWithPrivateData("John", 25);
 * person.getName() // "John"
 * person.getAge() // 25
 * // No direct access to private data
 */
export function createPersonWithPrivateData(name, age) {
  const privateData = new WeakMap();
  const person = {};

  privateData.set(person, { name, age });

  person.getName = function () {
    return privateData.get(this).name;
  };

  person.getAge = function () {
    return privateData.get(this).age;
  };

  return person;
}

/**
 * Write a function that uses WeakSet for tracking object processing.
 * Ensure objects are only processed once using WeakSet.
 *
 * const processor = createObjectProcessor();
 * processor.process(obj1) // "Processed"
 * processor.process(obj1) // "Already processed"
 */
export function createObjectProcessor() {
  const processed = new WeakSet();
  const processor = {};

  processor.process = function (obj) {
    if (processed.has(obj)) {
      return 'Already processed';
    } else {
      processed.add(obj);
      return 'Processed';
    }
  };

  return processor;
}

// ===== ADVANCED COLLECTION OPERATIONS =====

/**
 * Write a function that implements a bidirectional map.
 * Allow lookup by key or value with equal efficiency.
 *
 * const biMap = createBidirectionalMap([['key1', 'value1'], ['key2', 'value2']]);
 * biMap.getByKey('key1') // 'value1'
 * biMap.getByValue('value2') // 'key2'
 */
export function createBidirectionalMap(entries = []) {
  const forward = new Map();
  const reverse = new Map();

  entries.forEach((entry) => {
    forward.set(entry[0], entry[1]);
    reverse.set(entry[1], entry[0]);
  });

  return {
    getByKey(key) {
      return forward.get(key);
    },
    getByValue(value) {
      return reverse.get(value);
    }
  };
}

/**
 * Write a function that creates a cache with automatic expiration.
 * Items should be automatically removed after a specified time.
 *
 * const cache = createExpiringCache(1000); // 1 second expiry
 * cache.set('key', 'value');
 * cache.get('key') // 'value'
 * // After 1 second:
 * cache.get('key') // undefined
 */
export function createExpiringCache(expiryTimeMs) {
  const cache = new Map();
  const timers = new Map();

  return {
    set(key, value) {
      // Clear any existing timer for this key
      if (timers.has(key)) {
        clearTimeout(timers.get(key));
      }

      // Set the new value in cache
      cache.set(key, value);

      // Set a new expiration timer
      const timer = setTimeout(() => {
        cache.delete(key);
        timers.delete(key);
      }, expiryTimeMs);

      // Store the timer reference
      timers.set(key, timer);
    },
    get(key) {
      return cache.get(key);
    }
  };
}

/**
 * Write a function that creates a multi-value map.
 * Each key can be associated with multiple values.
 *
 * const multiMap = createMultiValueMap();
 * multiMap.add('fruits', 'apple');
 * multiMap.add('fruits', 'banana');
 * multiMap.get('fruits') // ['apple', 'banana']
 */
export function createMultiValueMap() {
  const multiMap = new Map();

  return {
    add(key, value) {
      if (!multiMap.has(key)) {
        multiMap.set(key, []);
      }
      multiMap.get(key).push(value);
    },
    get(key) {
      return multiMap.get(key);
    }
  };
}

/**
 * Write a function that implements an observable set.
 * Provide callbacks for add, delete, and change operations.
 *
 * const obsSet = createObservableSet([1, 2, 3], {
 *   add: (value) => console.log(`Added ${value}`),
 *   delete: (value) => console.log(`Deleted ${value}`)
 * });
 * obsSet.add(4); // logs: Added 4
 */
export function createObservableSet(initialValues = [], observers = {}) {
  const values = new Set(initialValues);

  return {
    add(value) {
      if (!values.has(value)) {
        values.add(value);
        if (observers.add) {
          observers.add(value);
        }
      }
    },
    delete(value) {
      if (values.has(value)) {
        values.delete(value);
        if (observers.delete) {
          observers.delete(value);
        }
      }
    }
  };
}

// ===== COLLECTION TRANSFORMATIONS =====

/**
 * Write a function that transforms a Map to/from an array format.
 * Convert between Map and array representation.
 *
 * mapToArray(new Map([['key', 'value']])) // [['key', 'value']]
 * arrayToMap([['key', 'value']]) // Map { 'key' => 'value' }
 */
export function mapToArray(map) {
  return Array.from(map.entries());
}
export function arrayToMap(entriesArray) {
  return new Map(entriesArray);
}

/**
 * Write a function that creates a filtered view of a collection.
 * Return a live-updating view based on a filter predicate.
 *
 * const numbers = new Set([1, 2, 3, 4, 5]);
 * const evens = createFilteredSetView(numbers, n => n % 2 === 0);
 * evens.has(2) // true
 * evens.has(3) // false
 * numbers.add(6);
 * evens.has(6) // true (live-updating)
 */
export function createFilteredSetView(originalSet, filterFn) {
  return {
    has(num) {
      return originalSet.has(num) && filterFn(num);
    }
  };
}

/**
 * Write a function that creates a deep copy of a complex collection.
 * Handle nested Maps, Sets, and other collections.
 *
 * const original = new Map([['key', new Set([1, 2, 3])]]);
 * const copy = deepCloneCollection(original);
 * // Modifying copy doesn't affect original
 */
export function deepCloneCollection(collection) {
  // Handle different collection types
  if (collection instanceof Map) {
    const mapClone = new Map();

    collection.forEach((value, key) => {
      // Recursively clone the value if it's a collection
      mapClone.set(deepCloneValue(key), deepCloneValue(value));
    });

    return mapClone;
  } else if (collection instanceof Set) {
    const setClone = new Set();

    collection.forEach((value) => {
      // Recursively clone each value in the set
      setClone.add(deepCloneValue(value));
    });

    return setClone;
  } else {
    // If it's not a collection, treat it as a value
    return deepCloneValue(collection);
  }
}

// Helper function to handle cloning of individual values
function deepCloneValue(value) {
  if (value instanceof Map || value instanceof Set) {
    // Recursively clone Maps and Sets
    return deepCloneCollection(value);
  } else if (Array.isArray(value)) {
    // Clone arrays with their elements
    return value.map((item) => deepCloneValue(item));
  } else if (value && typeof value === 'object') {
    // Clone plain objects
    const objClone = {};
    Object.keys(value).forEach((key) => {
      objClone[key] = deepCloneValue(value[key]);
    });
    return objClone;
  } else {
    // Return primitives as-is (they're copied by value)
    return value;
  }
}

/**
 * Write a function that performs operations across multiple collections.
 * Implement map, filter, and reduce that work on any collection type.
 *
 * collectionMap(new Set([1, 2, 3]), x => x * 2) // Set { 2, 4, 6 }
 * collectionFilter(new Map([['a', 1], ['b', 2]]), ([k, v]) => v > 1) // Map { 'b' => 2 }
 */
export function collectionMap(collection, mapFn) {
  const result = [...collection].map(mapFn);

  return new Set(result);
}
export function collectionFilter(collection, filterFn) {
  const result = [...collection].filter(filterFn);

  return new Map(result);
}
export function collectionReduce(collection, reducerFn, initialValue) {
  return [...collection].reduce(reducerFn, initialValue);
}
