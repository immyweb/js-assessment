/**
 * ES6 Basics: Template Literals, Destructuring, and Spread/Rest Operators
 *
 * This file contains exercises focusing on the fundamental ES6+ modern JavaScript features
 * related to string manipulation, data extraction, and collection handling.
 */

// ===== TEMPLATE LITERALS AND STRING FEATURES =====

/**
 * Write a function that uses template literals to create a formatted message.
 * Include expression interpolation and multi-line support.
 *
 * formatMessage("John", 25, "developer")
 * // "Hello John! You are 25 years old and work as a developer.
 * //  Welcome to our platform!"
 */
export function formatMessage(name, age, profession) {}

/**
 * Write a function that creates a tagged template literal.
 * The tag should highlight variables by wrapping them in <strong> tags.
 *
 * const result = highlight`Hello ${name}, you have ${count} messages`;
 * // "Hello <strong>John</strong>, you have <strong>5</strong> messages"
 */
export function highlight(strings, ...values) {}

/**
 * Write a function that uses template literals to create HTML with proper escaping.
 * Escape HTML special characters in interpolated values.
 *
 * createHTML("John", "<script>alert('xss')</script>")
 * // "<div>User: John, Input: &lt;script&gt;alert('xss')&lt;/script&gt;</div>"
 */
export function createHTML(user, input) {}

/**
 * Write a function that uses String.raw to preserve escape sequences.
 *
 * getRawString("path\\to\\file.txt") // "path\\to\\file.txt"
 */
export function getRawString(path) {}

// ===== DESTRUCTURING ASSIGNMENT =====

/**
 * Write a function that uses array destructuring with default values and rest.
 * Extract first, second, and rest of the array elements.
 *
 * destructureArray([1, 2, 3, 4, 5]) // {first: 1, second: 2, rest: [3, 4, 5]}
 * destructureArray([1]) // {first: 1, second: undefined, rest: []}
 */
export function destructureArray(arr) {}

/**
 * Write a function that uses object destructuring with renaming and defaults.
 * Extract name as userName, age with default 18, and email with default "N/A".
 *
 * destructureUser({name: "John", age: 25})
 * // {userName: "John", userAge: 25, userEmail: "N/A"}
 */
export function destructureUser(user) {}

/**
 * Write a function that uses nested destructuring to extract deeply nested values.
 * Extract user name, city, and first hobby from a complex object.
 *
 * const data = {
 *   user: {
 *     profile: {name: "John", location: {city: "NYC"}},
 *     hobbies: ["reading", "coding"]
 *   }
 * };
 * extractNested(data) // {name: "John", city: "NYC", firstHobby: "reading"}
 */
export function extractNested(data) {}

/**
 * Write a function that uses destructuring in function parameters.
 * Calculate the area of a rectangle with default width and height.
 *
 * calculateArea({width: 5, height: 3}) // 15
 * calculateArea({width: 5}) // 25 (default height = 5)
 * calculateArea({}) // 100 (default width = 10, height = 10)
 */
export function calculateArea() {}

// ===== SPREAD AND REST OPERATORS =====

/**
 * Write a function that uses the spread operator to merge multiple arrays.
 * Remove duplicates and return a sorted array.
 *
 * mergeArrays([1, 2], [2, 3], [3, 4]) // [1, 2, 3, 4]
 */
export function mergeArrays(...arrays) {}

/**
 * Write a function that uses spread to clone and merge objects.
 * Later properties should override earlier ones.
 *
 * mergeObjects({a: 1, b: 2}, {b: 3, c: 4}, {c: 5, d: 6})
 * // {a: 1, b: 3, c: 5, d: 6}
 */
export function mergeObjects(...objects) {}

/**
 * Write a function that uses rest parameters to calculate statistics.
 * Return an object with sum, average, min, and max.
 *
 * calculateStats(1, 2, 3, 4, 5)
 * // {sum: 15, average: 3, min: 1, max: 5}
 */
export function calculateStats(...numbers) {}

/**
 * Write a function that uses spread with function calls.
 * Apply a function to each array element using spread.
 *
 * applyFunction(Math.max, [1, 5, 3, 9, 2]) // 9
 * applyFunction(Math.min, [1, 5, 3, 9, 2]) // 1
 */
export function applyFunction(fn, arr) {}
