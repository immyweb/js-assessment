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
export function getType(value: any): string {}

/**
 * Write a function that accepts a string parameter and returns its length.
 * Add proper type annotations.
 *
 * getStringLength("hello") // 5
 */
export function getStringLength(text: string): number {}

/**
 * Write a function that accepts a number or string and returns their sum as a string.
 * Use union types for the parameter.
 *
 * addValues(5, 10) // "15"
 * addValues("5", 10) // "15"
 * addValues(5, "10") // "15"
 */
export function addValues(a: number | string, b: number | string): string {}

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
export function sumArray<T extends string | number>(arr: T[]): number {}

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
// Create your Person interface here
export interface Person {
  // Add properties
}

export function greetPerson(person: Person): string {}

/**
 * Create a type alias for a geometric shape with a discriminated union.
 * Implement a function to calculate the area of different shapes.
 *
 * calculateShapeArea({ kind: "circle", radius: 5 }) // 78.54
 * calculateShapeArea({ kind: "rectangle", width: 4, height: 5 }) // 20
 * calculateShapeArea({ kind: "triangle", base: 8, height: 6 }) // 24
 */
// Create your Shape type here

export function calculateShapeArea(shape: any): number {}

// ===== FUNCTIONS AND GENERICS =====

/**
 * Write a generic function that reverses an array of any type.
 *
 * reverseArray([1, 2, 3]) // [3, 2, 1]
 * reverseArray(["a", "b", "c"]) // ["c", "b", "a"]
 */
export function reverseArray<T>(arr: T[]): T[] {}

/**
 * Write a function that takes an object and a key, and returns the value at that key.
 * Use generics and keyof to ensure type safety.
 *
 * const obj = { name: "John", age: 30 };
 * getProperty(obj, "name") // "John"
 * getProperty(obj, "age") // 30
 */
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {}

/**
 * Write a generic function that merges two objects, with the second object's properties
 * overriding the first object's properties if there are conflicts.
 *
 * mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }) // { a: 1, b: 3, c: 4 }
 */
export function mergeObjects<T, U>(obj1: T, obj2: U): T & U {}

// ===== ADVANCED TYPES =====

/**
 * Create a utility type that makes all properties of an object optional.
 * Then write a function that updates a user object with partial data.
 *
 * const user = { id: 1, name: "John", email: "john@example.com" };
 * updateUser(user, { name: "Jane" }) // { id: 1, name: "Jane", email: "john@example.com" }
 */
// Define your PartialUser type here (using existing User interface or create a new one)

export function updateUser(user: any, updates: any): any {}

/**
 * Create a type-safe function that accesses nested properties in an object using a path string.
 * Use generic types and type predicates.
 *
 * const obj = { user: { profile: { name: "John", age: 30 } } };
 * getNestedValue(obj, "user.profile.name") // "John"
 * getNestedValue(obj, "user.profile.age") // 30
 * getNestedValue(obj, "user.settings.theme") // undefined
 */
export function getNestedValue<T>(obj: T, path: string): any {}

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
export function memoize<T extends (...args: any[]) => any>(fn: T): T {}
