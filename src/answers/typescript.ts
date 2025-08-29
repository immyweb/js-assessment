/**
 * TypeScript Fundamentals
 *
 * This file contains exercises focusing on the fundamental concepts of TypeScript
 * including types, interfaces, generics, and other TypeScript-specific features.
 */

// ===== BASIC TYPES =====

/**
 * Write a function that takes a parameter of any type and returns its type as a string.
 * Use TypeScript's typeof operator.
 *
 * getType(42) // "number"
 * getType("hello") // "string"
 * getType(true) // "boolean"
 * getType(undefined) // "undefined"
 * getType(null) // "object"
 * getType({}) // "object"
 * getType([]) // "object"
 */
export function getType(value: any): string {
  return typeof value;
}

/**
 * Write a function that accepts a string parameter and returns its length.
 * Add proper type annotations.
 *
 * getStringLength("hello") // 5
 */
export function getStringLength(text: string): number {
  return text.length;
}

/**
 * Write a function that accepts a number or string and returns their sum as a string.
 * Use union types for the parameter.
 *
 * addValues(5, 10) // "15"
 * addValues("5", 10) // "15"
 * addValues(5, "10") // "15"
 */
export function addValues(a: number | string, b: number | string): string {
  const numA = typeof a === 'string' ? Number(a) : a;
  const numB = typeof b === 'string' ? Number(b) : b;
  return String(numA + numB);
}

/**
 * Write a function that accepts an array of strings or numbers and returns the sum.
 * Numbers should be added numerically, and strings that can be parsed as numbers should be converted.
 * Strings that cannot be parsed should be ignored.
 * Use generics with constraints.
 *
 * sumArray([1, 2, 3]) // 6
 * sumArray(["1", "2", "3"]) // 6
 * sumArray([1, "2", 3, "four"]) // 6
 */
export function sumArray<T extends string | number>(arr: T[]): number {
  return arr.reduce((sum, current) => {
    const value = Number(current);
    return isNaN(value) ? sum : sum + value;
  }, 0);
}

// ===== INTERFACES AND TYPE ALIASES =====

/**
 * Create an interface for a Person with name, age, and optional email properties.
 * Write a function that creates a greeting for a Person.
 *
 * const john = { name: "John", age: 30 };
 * greetPerson(john) // "Hello, John! You are 30 years old."
 *
 * const jane = { name: "Jane", age: 25, email: "jane@example.com" };
 * greetPerson(jane) // "Hello, Jane! You are 25 years old. Contact: jane@example.com"
 */
export interface Person {
  name: string;
  age: number;
  email?: string;
}

export function greetPerson(person: Person): string {
  let greeting = `Hello, ${person.name}! You are ${person.age} years old.`;
  if (person.email) {
    greeting += ` Contact: ${person.email}`;
  }
  return greeting;
}

/**
 * Create a type alias for a geometric shape with a discriminated union.
 * Implement a function to calculate the area of different shapes.
 *
 * calculateShapeArea({ kind: "circle", radius: 5 }) // 78.54
 * calculateShapeArea({ kind: "rectangle", width: 4, height: 5 }) // 20
 * calculateShapeArea({ kind: "triangle", base: 8, height: 6 }) // 24
 */
type Circle = {
  kind: 'circle';
  radius: number;
};

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Triangle = {
  kind: 'triangle';
  base: number;
  height: number;
};

type Shape = Circle | Rectangle | Triangle;

export function calculateShapeArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape type: ${_exhaustiveCheck}`);
  }
}

// ===== FUNCTIONS AND GENERICS =====

/**
 * Write a generic function that reverses an array of any type.
 *
 * reverseArray([1, 2, 3]) // [3, 2, 1]
 * reverseArray(["a", "b", "c"]) // ["c", "b", "a"]
 */
export function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

/**
 * Write a function that takes an object and a key, and returns the value at that key.
 * Use generics and keyof to ensure type safety.
 *
 * const obj = { name: "John", age: 30 };
 * getProperty(obj, "name") // "John"
 * getProperty(obj, "age") // 30
 */
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

/**
 * Write a generic function that merges two objects, with the second object's properties
 * overriding the first object's properties if there are conflicts.
 *
 * mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }) // { a: 1, b: 3, c: 4 }
 */
export function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// ===== ADVANCED TYPES =====

/**
 * Create a utility type that makes all properties of an object optional.
 * Then write a function that updates a user object with partial data.
 *
 * const user = { id: 1, name: "John", email: "john@example.com" };
 * updateUser(user, { name: "Jane" }) // { id: 1, name: "Jane", email: "john@example.com" }
 */
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;

export function updateUser(user: User, updates: PartialUser): User {
  // Only update properties that already exist in the user object
  const validUpdates: Partial<User> = {}; // Using built-in Partial<User> type

  Object.keys(updates).forEach((key) => {
    const typedKey = key as keyof User;
    if (typedKey in user) {
      // Type assertion to ensure TypeScript knows this is safe
      validUpdates[typedKey] = updates[typedKey] as any;
    }
  });

  return { ...user, ...validUpdates };
}

/**
 * Create a type-safe function that accesses nested properties in an object using a path string.
 * Use generic types and type predicates.
 *
 * const obj = { user: { profile: { name: "John", age: 30 } } };
 * getNestedValue(obj, "user.profile.name") // "John"
 * getNestedValue(obj, "user.profile.age") // 30
 * getNestedValue(obj, "user.settings.theme") // undefined
 */
export function getNestedValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((o, p) => {
    return o && typeof o === 'object' ? o[p as keyof typeof o] : undefined;
  }, obj as any);
}

/**
 * Create a type-safe memoize function that caches function results.
 * Use function overloading and generics.
 *
 * const expensiveCalculation = (a: number, b: number): number => {
 *   console.log("Calculating...");
 *   return a * b;
 * };
 *
 * const memoized = memoize(expensiveCalculation);
 * memoized(2, 3) // Logs "Calculating..." and returns 6
 * memoized(2, 3) // Returns 6 without logging (cached)
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };

  return memoized as T;
}
