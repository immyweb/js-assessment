import { describe, it, expect } from 'vitest';
import {
  safeJsonParse,
  prettyStringify,
  serializeExcluding,
  deepClone,
  serializeWithDates,
  deserializeWithDates,
  hasCircularReference,
  serializeWithCircular,
  isValidJson,
  serializeNumbers,
  mapToJson,
  jsonToMap,
  setToJson,
  jsonToSet,
  createClassWithToJson,
  mergeJson,
  validateSchema,
  serializeWithUndefined,
  getJsonSize,
  compressJson
} from '../exercises/data-serialization.js';

describe('Data Serialization Exercises', () => {
  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      expect(safeJsonParse('{"name":"John"}')).toEqual({ name: 'John' });
      expect(safeJsonParse('{"age":30}')).toEqual({ age: 30 });
    });

    it('should return null for invalid JSON', () => {
      expect(safeJsonParse('invalid json')).toBeNull();
      expect(safeJsonParse('{name:"John"}')).toBeNull();
      expect(safeJsonParse('undefined')).toBeNull();
    });

    it('should handle arrays', () => {
      expect(safeJsonParse('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('should handle primitives', () => {
      expect(safeJsonParse('"hello"')).toBe('hello');
      expect(safeJsonParse('123')).toBe(123);
      expect(safeJsonParse('true')).toBe(true);
      expect(safeJsonParse('null')).toBeNull();
    });
  });

  describe('prettyStringify', () => {
    it('should format JSON with 2-space indentation', () => {
      const result = prettyStringify({ name: 'John', age: 30 });
      expect(result).toContain('\n');
      expect(result).toContain('  ');
    });

    it('should handle nested objects', () => {
      const obj = { user: { name: 'John', address: { city: 'NYC' } } };
      const result = prettyStringify(obj);
      expect(result).toContain('\n');
    });

    it('should handle arrays', () => {
      const result = prettyStringify([1, 2, 3]);
      expect(result).toContain('\n');
    });
  });

  describe('serializeExcluding', () => {
    it('should exclude specified keys', () => {
      const obj = { name: 'John', password: '123', email: 'john@example.com' };
      const result = serializeExcluding(obj, ['password']);
      expect(result).toContain('name');
      expect(result).toContain('email');
      expect(result).not.toContain('password');
      expect(result).not.toContain('123');
    });

    it('should exclude multiple keys', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = serializeExcluding(obj, ['b', 'd']);
      expect(result).toContain('a');
      expect(result).toContain('c');
      expect(result).not.toContain('"b"');
      expect(result).not.toContain('"d"');
    });

    it('should handle nested objects', () => {
      const obj = { user: { name: 'John', password: '123' } };
      const result = serializeExcluding(obj, ['password']);
      expect(result).not.toContain('password');
    });
  });

  describe('deepClone', () => {
    it('should create a deep clone', () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = deepClone(obj);

      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
      expect(clone.b).not.toBe(obj.b);
    });

    it('should not share references', () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = deepClone(obj);

      clone.b.c = 3;
      expect(obj.b.c).toBe(2);
    });

    it('should handle arrays', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const clone = deepClone(arr);

      clone[1][0] = 99;
      expect(arr[1][0]).toBe(2);
    });
  });

  describe('serializeWithDates', () => {
    it('should serialize Date objects', () => {
      const obj = { created: new Date('2023-01-01T00:00:00.000Z') };
      const result = serializeWithDates(obj);

      expect(result).toContain('2023-01-01');
      expect(result).toContain('T00:00:00');
    });

    it('should handle multiple dates', () => {
      const obj = {
        start: new Date('2023-01-01'),
        end: new Date('2023-12-31')
      };
      const result = serializeWithDates(obj);

      expect(result).toContain('2023-01-01');
      expect(result).toContain('2023-12-31');
    });

    it('should preserve non-date values', () => {
      const obj = { name: 'John', created: new Date('2023-01-01') };
      const result = serializeWithDates(obj);

      expect(result).toContain('John');
    });
  });

  describe('deserializeWithDates', () => {
    it('should convert ISO strings to Date objects', () => {
      const json = '{"created":"2023-01-01T00:00:00.000Z"}';
      const result = deserializeWithDates(json);

      expect(result.created).toBeInstanceOf(Date);
      expect(result.created.getFullYear()).toBe(2023);
    });

    it('should handle multiple dates', () => {
      const json =
        '{"start":"2023-01-01T00:00:00.000Z","end":"2023-12-31T00:00:00.000Z"}';
      const result = deserializeWithDates(json);

      expect(result.start).toBeInstanceOf(Date);
      expect(result.end).toBeInstanceOf(Date);
    });

    it('should not convert non-date strings', () => {
      const json = '{"name":"John","text":"not a date"}';
      const result = deserializeWithDates(json);

      expect(typeof result.name).toBe('string');
      expect(typeof result.text).toBe('string');
      expect(result.name).not.toBeInstanceOf(Date);
    });
  });

  describe('hasCircularReference', () => {
    it('should detect circular references', () => {
      const obj = { name: 'test' };
      obj.self = obj;

      expect(hasCircularReference(obj)).toBe(true);
    });

    it('should return false for non-circular objects', () => {
      const obj = { a: 1, b: { c: 2 } };

      expect(hasCircularReference(obj)).toBe(false);
    });

    it('should detect nested circular references', () => {
      const obj = { a: { b: { c: {} } } };
      obj.a.b.c.ref = obj;

      expect(hasCircularReference(obj)).toBe(true);
    });

    it('should handle arrays', () => {
      const arr = [1, 2, 3];
      arr.push(arr);

      expect(hasCircularReference(arr)).toBe(true);
    });
  });

  describe('serializeWithCircular', () => {
    it('should handle circular references', () => {
      const obj = { name: 'test' };
      obj.self = obj;

      const result = serializeWithCircular(obj);
      expect(result).toContain('[Circular]');
      expect(result).toContain('name');
    });

    it('should serialize non-circular parts normally', () => {
      const obj = { name: 'test', age: 30 };
      obj.self = obj;

      const result = serializeWithCircular(obj);
      expect(result).toContain('test');
      expect(result).toContain('30');
    });

    it('should handle deeply nested circular references', () => {
      const obj = { a: { b: { c: {} } } };
      obj.a.b.c.ref = obj;

      const result = serializeWithCircular(obj);
      expect(result).toContain('[Circular]');
    });
  });

  describe('isValidJson', () => {
    it('should validate correct JSON', () => {
      expect(isValidJson('{"name":"John"}')).toBe(true);
      expect(isValidJson('[1,2,3]')).toBe(true);
      expect(isValidJson('"hello"')).toBe(true);
      expect(isValidJson('123')).toBe(true);
      expect(isValidJson('true')).toBe(true);
      expect(isValidJson('null')).toBe(true);
    });

    it('should reject invalid JSON', () => {
      expect(isValidJson('{name:"John"}')).toBe(false);
      expect(isValidJson('invalid')).toBe(false);
      expect(isValidJson('{name:123}')).toBe(false);
      expect(isValidJson('undefined')).toBe(false);
    });
  });

  describe('serializeNumbers', () => {
    it('should serialize only numeric values', () => {
      const obj = { a: 1, b: 'text', c: 2, d: null };
      const result = serializeNumbers(obj);
      const parsed = JSON.parse(result);

      expect(parsed.a).toBe(1);
      expect(parsed.c).toBe(2);
      expect(parsed).not.toHaveProperty('b');
      expect(parsed).not.toHaveProperty('d');
    });

    it('should handle nested objects', () => {
      const obj = { x: { a: 1, b: 'text', c: 2 } };
      const result = serializeNumbers(obj);

      expect(result).toContain('"a":1');
      expect(result).toContain('"c":2');
      expect(result).not.toContain('text');
    });

    it('should handle objects with only non-numeric values', () => {
      const obj = { a: 'text', b: 'more text' };
      const result = serializeNumbers(obj);
      const parsed = JSON.parse(result);

      expect(Object.keys(parsed).length).toBe(0);
    });
  });

  describe('mapToJson', () => {
    it('should convert Map to JSON', () => {
      const map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
      ]);
      const result = mapToJson(map);

      expect(result).toContain('key1');
      expect(result).toContain('value1');
      expect(result).toContain('key2');
      expect(result).toContain('value2');
    });

    it('should handle empty Map', () => {
      const map = new Map();
      const result = mapToJson(map);

      expect(result).toBe('{}');
    });

    it('should handle Map with various value types', () => {
      const map = new Map([
        ['str', 'value'],
        ['num', 123],
        ['bool', true]
      ]);
      const result = mapToJson(map);
      const parsed = JSON.parse(result);

      expect(parsed.str).toBe('value');
      expect(parsed.num).toBe(123);
      expect(parsed.bool).toBe(true);
    });
  });

  describe('jsonToMap', () => {
    it('should convert JSON to Map', () => {
      const json = '{"key1":"value1","key2":"value2"}';
      const result = jsonToMap(json);

      expect(result).toBeInstanceOf(Map);
      expect(result.get('key1')).toBe('value1');
      expect(result.get('key2')).toBe('value2');
    });

    it('should handle empty JSON object', () => {
      const json = '{}';
      const result = jsonToMap(json);

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0);
    });
  });

  describe('setToJson', () => {
    it('should convert Set to JSON array', () => {
      const set = new Set([1, 2, 3]);
      const result = setToJson(set);

      expect(result).toBe('[1,2,3]');
    });

    it('should handle empty Set', () => {
      const set = new Set();
      const result = setToJson(set);

      expect(result).toBe('[]');
    });

    it('should handle Set with various types', () => {
      const set = new Set([1, 'text', true]);
      const result = setToJson(set);
      const parsed = JSON.parse(result);

      expect(parsed).toContain(1);
      expect(parsed).toContain('text');
      expect(parsed).toContain(true);
    });
  });

  describe('jsonToSet', () => {
    it('should convert JSON array to Set', () => {
      const json = '[1,2,3,2,1]';
      const result = jsonToSet(json);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(3);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
      expect(result.has(3)).toBe(true);
    });

    it('should remove duplicates', () => {
      const json = '[1,1,1,2,2,3]';
      const result = jsonToSet(json);

      expect(result.size).toBe(3);
    });

    it('should handle empty array', () => {
      const json = '[]';
      const result = jsonToSet(json);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(0);
    });
  });

  describe('createClassWithToJson', () => {
    it('should create class with custom toJSON', () => {
      const UserClass = createClassWithToJson(
        'User',
        { name: 'John' },
        { _password: '123' }
      );
      const user = new UserClass();

      const json = JSON.stringify(user);
      expect(json).toContain('name');
      expect(json).not.toContain('_password');
      expect(json).not.toContain('123');
    });

    it('should exclude all properties starting with underscore', () => {
      const UserClass = createClassWithToJson(
        'User',
        { name: 'John', email: 'john@example.com' },
        { _password: '123', _secret: 'xyz' }
      );
      const user = new UserClass();

      const json = JSON.stringify(user);
      expect(json).toContain('name');
      expect(json).toContain('email');
      expect(json).not.toContain('_password');
      expect(json).not.toContain('_secret');
    });
  });

  describe('mergeJson', () => {
    it('should merge two JSON strings', () => {
      const result = mergeJson('{"a":1}', '{"b":2}');

      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should handle overlapping keys', () => {
      const result = mergeJson('{"a":1,"b":2}', '{"b":3,"c":4}');

      expect(result.a).toBe(1);
      expect(result.b).toBe(3); // Second value wins
      expect(result.c).toBe(4);
    });

    it('should handle empty objects', () => {
      const result = mergeJson('{}', '{"a":1}');

      expect(result).toEqual({ a: 1 });
    });
  });

  describe('validateSchema', () => {
    it('should validate correct schema', () => {
      const schema = { name: 'string', age: 'number' };
      const obj = { name: 'John', age: 30 };

      expect(validateSchema(obj, schema)).toBe(true);
    });

    it('should reject missing keys', () => {
      const schema = { name: 'string', age: 'number' };
      const obj = { name: 'John' };

      expect(validateSchema(obj, schema)).toBe(false);
    });

    it('should reject wrong types', () => {
      const schema = { name: 'string', age: 'number' };
      const obj = { name: 'John', age: '30' };

      expect(validateSchema(obj, schema)).toBe(false);
    });

    it('should allow extra keys', () => {
      const schema = { name: 'string' };
      const obj = { name: 'John', age: 30, extra: 'value' };

      expect(validateSchema(obj, schema)).toBe(true);
    });
  });

  describe('serializeWithUndefined', () => {
    it('should serialize undefined as null', () => {
      const obj = { a: 1, b: undefined, c: 3 };
      const result = serializeWithUndefined(obj);

      expect(result).toContain('"b":null');
      expect(result).toContain('"a":1');
      expect(result).toContain('"c":3');
    });

    it('should handle nested undefined', () => {
      const obj = { x: { a: 1, b: undefined } };
      const result = serializeWithUndefined(obj);

      expect(result).toContain('"b":null');
    });

    it('should not affect other values', () => {
      const obj = { a: 1, b: null, c: undefined };
      const result = serializeWithUndefined(obj);
      const parsed = JSON.parse(result);

      expect(parsed.a).toBe(1);
      expect(parsed.b).toBeNull();
      expect(parsed.c).toBeNull();
    });
  });

  describe('getJsonSize', () => {
    it('should calculate JSON size in bytes', () => {
      const obj = { name: 'John' };
      const size = getJsonSize(obj);

      expect(size).toBeGreaterThan(0);
      expect(typeof size).toBe('number');
    });

    it('should reflect different sizes', () => {
      const small = { a: 1 };
      const large = { a: 1, b: 2, c: 3, d: 4, e: 5 };

      expect(getJsonSize(large)).toBeGreaterThan(getJsonSize(small));
    });
  });

  describe('compressJson', () => {
    it('should remove whitespace', () => {
      const json = '{ "name": "John",  "age": 30 }';
      const result = compressJson(json);

      expect(result).toBe('{"name":"John","age":30}');
    });

    it('should handle nested objects', () => {
      const json = '{ "user": { "name": "John" } }';
      const result = compressJson(json);

      expect(result).not.toContain(' ');
      expect(result).not.toContain('\n');
    });

    it('should be smaller than original', () => {
      const json = '  {  "name"  :  "John"  }  ';
      const result = compressJson(json);

      expect(result.length).toBeLessThan(json.length);
    });
  });
});
