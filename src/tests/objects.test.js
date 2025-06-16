import { describe, beforeEach, test, expect, vi } from 'vitest';
import {
  createObject,
  getKeys,
  getValues,
  getEntries,
  hasProperty,
  copyProperties,
  shallowCopy,
  countProperties,
  removeProperty,
  createPersonWithAccessors,
  alterContext,
  alterObjects,
  iterate,
  bindArgs,
  createCounter,
  createLoggingProxy,
  deepFreeze,
  createPerson,
  calculator
} from '../exercises/objects';

describe('Objects', () => {
  let a;
  let b;
  let C;

  beforeEach(() => {
    a = {
      name: 'Charlie',
      greeting: 'Hello',
      sayIt: function () {
        return `${this.greeting}, ${this.name}!`;
      }
    };

    b = {
      name: 'Rebecca',
      greeting: 'Yo'
    };

    C = function (name) {
      this.name = name;
      return this;
    };
  });

  describe('Fundamental Object Operations', () => {
    test('should create object from key-value pairs', () => {
      expect(createObject('name', 'Alice', 'age', 25)).toEqual({
        name: 'Alice',
        age: 25
      });
      expect(createObject('color', 'blue')).toEqual({ color: 'blue' });
      expect(createObject()).toEqual({});
      expect(createObject('a', 1, 'b', 2, 'c', 3)).toEqual({
        a: 1,
        b: 2,
        c: 3
      });
    });

    test('should return array of object keys', () => {
      expect(getKeys({ name: 'Alice', age: 25 })).toEqual(['name', 'age']);
      expect(getKeys({})).toEqual([]);
      expect(getKeys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']);
    });

    test('should return array of object values', () => {
      expect(getValues({ name: 'Alice', age: 25 })).toEqual(['Alice', 25]);
      expect(getValues({})).toEqual([]);
      expect(getValues({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3]);
    });

    test('should return array of key-value pairs', () => {
      expect(getEntries({ name: 'Alice', age: 25 })).toEqual([
        ['name', 'Alice'],
        ['age', 25]
      ]);
      expect(getEntries({})).toEqual([]);
      expect(getEntries({ a: 1, b: 2 })).toEqual([
        ['a', 1],
        ['b', 2]
      ]);
    });

    test('should check if object has property', () => {
      const obj = { name: 'Alice', age: 25 };
      expect(hasProperty(obj, 'name')).toBe(true);
      expect(hasProperty(obj, 'age')).toBe(true);
      expect(hasProperty(obj, 'city')).toBe(false);
      expect(hasProperty({}, 'anything')).toBe(false);
    });

    test('should copy properties from source to target', () => {
      const target = { a: 1 };
      const source = { b: 2, c: 3 };
      const result = copyProperties(target, source);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
      expect(target).toEqual({ a: 1, b: 2, c: 3 }); // target should be modified
    });

    test('should create shallow copy of object', () => {
      const original = { name: 'Alice', age: 25, hobbies: ['reading'] };
      const copy = shallowCopy(original);

      expect(copy).toEqual(original);
      expect(copy).not.toBe(original); // Different objects

      // Test shallow copy behavior
      copy.name = 'Bob';
      expect(original.name).toBe('Alice'); // Original unchanged

      // But nested objects are shared
      copy.hobbies.push('coding');
      expect(original.hobbies).toEqual(['reading', 'coding']); // Original affected
    });

    test('should count object properties', () => {
      expect(countProperties({ name: 'Alice', age: 25 })).toBe(2);
      expect(countProperties({})).toBe(0);
      expect(countProperties({ a: 1, b: 2, c: 3, d: 4 })).toBe(4);
    });

    test('should remove property from object', () => {
      const obj = { name: 'Alice', age: 25, city: 'NYC' };
      const result = removeProperty(obj, 'age');
      expect(result).toEqual({ name: 'Alice', city: 'NYC' });
      expect(obj).toEqual({ name: 'Alice', city: 'NYC' }); // Original should be modified

      // Test removing non-existent property
      const result2 = removeProperty({ a: 1 }, 'b');
      expect(result2).toEqual({ a: 1 });
    });

    test('should create object with getter and setter methods', () => {
      const person = createPersonWithAccessors('Alice');

      expect(typeof person.getName).toBe('function');
      expect(typeof person.setName).toBe('function');

      expect(person.getName()).toBe('Alice');

      person.setName('Bob');
      expect(person.getName()).toBe('Bob');

      person.setName('Charlie');
      expect(person.getName()).toBe('Charlie');
    });
  });

  test('you should be able to alter the context in which a method runs', () => {
    expect(alterContext(a.sayIt, b)).toEqual('Yo, Rebecca!');
  });

  test('you should be able to alter multiple objects at once', () => {
    const obj1 = new C('Rebecca');
    const obj2 = new C('Melissa');
    const greeting = "What's up";

    alterObjects(C, greeting);

    expect(obj1.greeting).toEqual(greeting);
    expect(obj2.greeting).toEqual(greeting);
    expect(new C('Ellie').greeting).toEqual(greeting);
  });

  test('you should be able to iterate over an object\'s "own" properties', () => {
    C = function () {
      this.foo = 'bar';
      this.baz = 'bim';
    };

    C.prototype.bop = 'bip';

    const obj = new C();

    expect(iterate(obj)).toEqual(['foo: bar', 'baz: bim']);
  });

  test('you should bind arguments permanently to a function', () => {
    function add(a, b) {
      return a + b;
    }

    const add5 = bindArgs(add, 5);
    expect(add5(3)).toBe(8);

    // Test with multiple bound args
    function multiply(a, b, c) {
      return a * b * c;
    }
    const multiplyBy2And3 = bindArgs(multiply, 2, 3);
    expect(multiplyBy2And3(4)).toBe(24);
  });

  test('you should be able to create a method that can access private data', () => {
    const counter = createCounter();

    // Test initial state
    expect(counter.value()).toBe(0);

    // Test increment
    expect(counter.increment()).toBe(1);
    expect(counter.increment()).toBe(2);
    expect(counter.value()).toBe(2);

    // Test decrement
    expect(counter.decrement()).toBe(1);
    expect(counter.decrement()).toBe(0);
    expect(counter.decrement()).toBe(-1);
    expect(counter.value()).toBe(-1);

    // Test that multiple counters are independent
    const counter2 = createCounter();
    expect(counter2.value()).toBe(0);
    expect(counter2.increment()).toBe(1);
    expect(counter.value()).toBe(-1); // First counter unchanged

    // Test that count is private (not directly accessible)
    expect(counter.count).toBeUndefined();
  });

  test('you should create a proxy that logs property access and returns values', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const obj = { name: 'Alice', age: 30 };
    const logged = createLoggingProxy(obj);

    // Test property access
    expect(logged.name).toBe('Alice');
    expect(consoleSpy).toHaveBeenCalledWith('Accessed property: name');

    // Test property setting
    logged.city = 'New York';
    expect(consoleSpy).toHaveBeenCalledWith('Set property: city = New York');
    expect(logged.city).toBe('New York');

    consoleSpy.mockRestore();
  });

  test('should freeze an object deeply including nested objects', () => {
    const obj = {
      name: 'Alice',
      address: {
        city: 'New York',
        country: 'USA'
      },
      hobbies: ['reading', 'coding']
    };

    const frozen = deepFreeze(obj);

    // Test that the main object is frozen
    expect(Object.isFrozen(frozen)).toBe(true);

    // Test that nested objects are frozen
    expect(Object.isFrozen(frozen.address)).toBe(true);
    expect(Object.isFrozen(frozen.hobbies)).toBe(true);

    // Test that modifications throw errors (in strict mode)
    expect(() => {
      frozen.name = 'Bob';
    }).toThrow();

    expect(() => {
      frozen.address.city = 'Boston';
    }).toThrow();

    expect(() => {
      frozen.hobbies.push('swimming');
    }).toThrow();

    // Verify values remain unchanged
    expect(frozen.name).toBe('Alice');
    expect(frozen.address.city).toBe('New York');
    expect(frozen.hobbies).toEqual(['reading', 'coding']);
  });

  test('should create a factory function with private methods', () => {
    const person = createPerson('Alice', 25);

    // Test basic functionality
    expect(person.getName()).toBe('Alice');
    expect(person.getAge()).toBe(25);
    expect(person.getInfo()).toBe('Alice is 25 years old');

    // Test valid age setting
    person.setAge(30);
    expect(person.getAge()).toBe(30);
    expect(person.getInfo()).toBe('Alice is 30 years old');

    // Test invalid age validation
    expect(() => person.setAge(-5)).toThrow('Invalid age');
    expect(() => person.setAge(200)).toThrow('Invalid age');

    // Test that private method is not accessible
    expect(person.validateAge).toBeUndefined();
  });

  test('should chain method calls fluently', () => {
    // Test the example from the comment
    expect(calculator().add(5).multiply(2).subtract(3).value).toBe(7);

    // Test with initial value
    expect(calculator(10).add(5).divide(3).multiply(2).value).toBe(10);

    // Test division by zero (should not change value)
    expect(calculator(6).divide(0).value).toBe(6);

    // Test individual operations
    const calc = calculator(0);
    expect(calc.add(10).value).toBe(10);
    expect(calc.subtract(3).value).toBe(7);
    expect(calc.multiply(2).value).toBe(14);
    expect(calc.divide(2).value).toBe(7);
  });
});
