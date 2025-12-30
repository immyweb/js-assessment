/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on data serialization concepts including
 * JSON parsing/stringification, custom serialization logic, error handling,
 * and data validation.
 */

/**
 * Write a function that safely parses JSON and returns null on error.
 *
 * safeJsonParse('{"name": "John"}') // returns { name: 'John' }
 * safeJsonParse('invalid json') // returns null
 */
export function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Write a function that stringifies an object with pretty printing.
 * Use 2 spaces for indentation.
 *
 * prettyStringify({ name: 'John', age: 30 })
 * // returns formatted JSON string with 2-space indentation
 */
export function prettyStringify(obj) {
  return JSON.stringify(obj, null, 2);
}

/**
 * Write a function that serializes an object excluding specified keys.
 *
 * const obj = { name: 'John', password: '123', email: 'john@example.com' };
 * serializeExcluding(obj, ['password'])
 * // returns '{"name":"John","email":"john@example.com"}'
 */
export function serializeExcluding(obj, keysToExclude) {
  return JSON.stringify(obj, (key, value) => {
    if (keysToExclude.includes(key)) {
      return undefined;
    }
    return value;
  });
}

/**
 * Write a function that deep clones an object using JSON serialization.
 *
 * const obj = { a: 1, b: { c: 2 } };
 * const clone = deepClone(obj);
 * clone.b.c = 3;
 * // obj.b.c should still be 2
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Write a function that serializes a Date object to ISO string.
 * Use a custom replacer function.
 *
 * serializeWithDates({ created: new Date('2023-01-01') })
 * // Date should be serialized to ISO string
 */
export function serializeWithDates(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  });
}

/**
 * Write a function that deserializes and converts ISO date strings back to Date objects.
 *
 * const json = '{"created":"2023-01-01T00:00:00.000Z"}';
 * deserializeWithDates(json)
 * // returns { created: Date object }
 */
export function deserializeWithDates(jsonString) {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  return JSON.parse(jsonString, (key, value) => {
    if (typeof value === 'string' && isoDatePattern.test(value)) {
      return new Date(value);
    }
    return value;
  });
}

/**
 * Write a function that detects circular references in an object.
 *
 * const obj = { name: 'test' };
 * obj.self = obj;
 * hasCircularReference(obj) // returns true
 */
export function hasCircularReference(obj) {
  const seen = new WeakSet();

  function detect(obj) {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) {
        return true;
      }
      seen.add(obj);

      for (const key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}

/**
 * Write a function that serializes an object, handling circular references
 * by replacing them with "[Circular]".
 *
 * const obj = { name: 'test' };
 * obj.self = obj;
 * serializeWithCircular(obj)
 * // returns JSON with circular reference replaced
 */
export function serializeWithCircular(obj) {
  const seen = new WeakSet();

  return JSON.stringify(obj, (key, value) => {
    if (value && typeof value === 'object') {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
}

/**
 * Write a function that validates if a string is valid JSON.
 *
 * isValidJson('{"name":"John"}') // returns true
 * isValidJson('{name:"John"}') // returns false
 * isValidJson('invalid') // returns false
 */
export function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Write a function that serializes only numeric values from an object.
 *
 * serializeNumbers({ a: 1, b: 'text', c: 2, d: null })
 * // returns '{"a":1,"c":2}'
 */
export function serializeNumbers(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (key === '') return value; // Keep root object
    if (typeof value === 'number') {
      return value;
    }
    return undefined;
  });
}

/**
 * Write a function that converts a Map to JSON.
 * Maps are not directly JSON-serializable.
 *
 * const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
 * mapToJson(map)
 * // returns '{"key1":"value1","key2":"value2"}'
 */
export function mapToJson(map) {
  const obj = Object.fromEntries(map);
  return JSON.stringify(obj);
}

/**
 * Write a function that parses JSON and converts it back to a Map.
 *
 * jsonToMap('{"key1":"value1","key2":"value2"}')
 * // returns Map with entries
 */
export function jsonToMap(jsonString) {
  const obj = JSON.parse(jsonString);
  return new Map(Object.entries(obj));
}

/**
 * Write a function that serializes a Set to JSON array.
 *
 * const set = new Set([1, 2, 3]);
 * setToJson(set)
 * // returns '[1,2,3]'
 */
export function setToJson(set) {
  return JSON.stringify([...set]);
}

/**
 * Write a function that deserializes JSON array back to a Set.
 *
 * jsonToSet('[1,2,3,2,1]')
 * // returns Set {1, 2, 3}
 */
export function jsonToSet(jsonString) {
  const array = JSON.parse(jsonString);
  return new Set(array);
}

/**
 * Write a function that creates a custom toJSON method for a class.
 * Return a class with toJSON that excludes private properties (prefixed with _).
 *
 * class User {
 *   constructor(name, password) {
 *     this.name = name;
 *     this._password = password;
 *   }
 * }
 * addToJsonMethod(User);
 * // JSON.stringify should exclude _password
 */
export function createClassWithToJson(name, publicProps, privateProps) {
  return class {
    constructor(values = {}) {
      this.name = name;
      Object.assign(this, publicProps, privateProps);
      Object.assign(this, values);
    }

    toJSON() {
      const result = {};
      for (const key in this) {
        if (this.hasOwnProperty(key) && !key.startsWith('_')) {
          result[key] = this[key];
        }
      }
      return result;
    }
  };
}

/**
 * Write a function that merges two JSON strings into one object.
 *
 * mergeJson('{"a":1}', '{"b":2}')
 * // returns { a: 1, b: 2 }
 */
export function mergeJson(json1, json2) {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  return { ...obj1, ...obj2 };
}

/**
 * Write a function that validates an object against a schema.
 * Schema specifies required keys and their types.
 *
 * const schema = { name: 'string', age: 'number' };
 * validateSchema({ name: 'John', age: 30 }, schema) // returns true
 * validateSchema({ name: 'John' }, schema) // returns false (missing age)
 */
export function validateSchema(obj, schema) {
  for (const key in schema) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
    if (typeof obj[key] !== schema[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Write a function that serializes undefined values as null.
 * By default, JSON.stringify omits undefined values.
 *
 * serializeWithUndefined({ a: 1, b: undefined, c: 3 })
 * // returns '{"a":1,"b":null,"c":3}'
 */
export function serializeWithUndefined(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value === undefined) {
      return null;
    }
    return value;
  });
}

/**
 * Write a function that calculates the size of a JSON string in bytes.
 *
 * getJsonSize({ name: 'John' })
 * // returns size in bytes
 */
export function getJsonSize(obj) {
  const jsonString = JSON.stringify(obj);
  return new Blob([jsonString]).size;
}

/**
 * Write a function that compresses JSON by removing whitespace.
 *
 * compressJson('{ "name": "John",  "age": 30 }')
 * // returns '{"name":"John","age":30}'
 */
export function compressJson(jsonString) {
  const obj = JSON.parse(jsonString);
  return JSON.stringify(obj);
}
