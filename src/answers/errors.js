/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on fundamental error handling concepts for senior-level JavaScript developers.
 * You'll need to understand try/catch patterns, custom errors, async error handling,
 * and production-ready error recovery patterns.
 *
 * The exercises cover core concepts:
 * 1. Error Handling Fundamentals
 * 2. Custom Error Types
 * 3. Async Error Handling
 * 4. Error Recovery Patterns
 */

// ===== ERROR HANDLING FUNDAMENTALS =====

/**
 * Write a function that safely parses JSON and returns a default value on error.
 * If parsing succeeds, return the parsed object.
 * If parsing fails, return the provided default value.
 *
 * safeJsonParse('{"name": "John"}', {}) // {name: "John"}
 * safeJsonParse('invalid json', {error: true}) // {error: true}
 */
export function safeJsonParse(jsonString, defaultValue) {
  try {
    const obj = JSON.parse(jsonString);
    return obj;
  } catch (e) {
    return defaultValue;
  }
}

/**
 * Write a function that wraps another function in a try-catch block.
 * If the function executes successfully, return {success: true, result: value}.
 * If it throws an error, return {success: false, error: errorMessage}.
 *
 * const fn = () => JSON.parse('{"valid": true}');
 * tryExecute(fn) // {success: true, result: {valid: true}}
 *
 * const badFn = () => JSON.parse('invalid');
 * tryExecute(badFn) // {success: false, error: "Unexpected token i in JSON at position 0"}
 */
export function tryExecute(fn) {
  try {
    const result = fn();
    return {
      success: true,
      result: result
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
}

// ===== CUSTOM ERROR TYPES =====

/**
 * Create a custom ValidationError class that extends Error.
 * It should accept a message and a field name.
 * Include a name property set to "ValidationError".
 *
 * const error = new ValidationError("Invalid email format", "email");
 * error.message // "Invalid email format"
 * error.field // "email"
 * error.name // "ValidationError"
 */
export class ValidationError extends Error {
  constructor(message, field) {
    super();
    this.message = message;
    this.field = field;
    this.name = 'ValidationError';
  }
}

/**
 * Write a function that validates user data and throws appropriate custom errors.
 * Validate that:
 * - name is a non-empty string
 * - email contains "@" symbol
 * - age is a number between 0 and 150
 * Return the user object if valid.
 *
 * validateUser({name: "John", email: "john@example.com", age: 25}) // returns user object
 * validateUser({name: "", email: "john@example.com", age: 25}) // throws ValidationError for name
 * validateUser({name: "John", email: "invalid", age: 25}) // throws ValidationError for email
 */
export function validateUser(user) {
  const { name, email, age } = user;

  if (!name) {
    throw new ValidationError('Name is required', 'name');
  }

  if (!email.includes('@')) {
    throw new ValidationError('Invalid email format', 'email');
  }

  if (typeof age !== 'number' || age < 0 || age > 150) {
    throw new ValidationError('Invalid age', 'age');
  }

  return user;
}

// ===== ASYNC ERROR HANDLING =====

/**
 * Write an async function that safely executes another async function.
 * If the function succeeds, return {success: true, data: result}.
 * If it fails, return {success: false, error: errorMessage}.
 *
 * const goodFn = async () => "success";
 * await safeAsyncExecute(goodFn) // {success: true, data: "success"}
 *
 * const badFn = async () => { throw new Error("failed"); };
 * await safeAsyncExecute(badFn) // {success: false, error: "failed"}
 */
export async function safeAsyncExecute(asyncFn) {
  try {
    const result = await asyncFn();
    return {
      success: true,
      data: result
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
}

/**
 * Write a function that implements retry logic for async operations.
 * Attempt the operation up to maxRetries times.
 * If all attempts fail, throw the last error.
 * If any attempt succeeds, return the result.
 *
 * let attempt = 0;
 * const flakyFn = async () => {
 *   attempt++;
 *   if (attempt < 3) throw new Error("failed");
 *   return "success";
 * };
 * await retryOperation(flakyFn, 3) // "success" (after 3 attempts)
 */
export async function retryOperation(asyncFn, maxRetries) {
  try {
    const result = await asyncFn();
    return result;
  } catch (e) {
    if (maxRetries === 0) {
      throw e;
    }
    return retryOperation(asyncFn, maxRetries - 1);
  }
}

// ===== ERROR RECOVERY PATTERNS =====

/**
 * Write a function that gracefully degrades functionality.
 * Try the primary operation first, if it fails, try the fallback.
 * If both fail, return an error object.
 *
 * const primary = () => { throw new Error("primary failed"); };
 * const fallback = () => "fallback result";
 * gracefulDegrade(primary, fallback) // "fallback result"
 *
 * const bothFail = () => { throw new Error("failed"); };
 * gracefulDegrade(bothFail, bothFail) // {error: "Both primary and fallback operations failed"}
 */
export function gracefulDegrade(primaryFn, fallbackFn) {
  try {
    const result1 = primaryFn();
    return result1;
  } catch (e) {
    try {
      const result2 = fallbackFn();
      return result2;
    } catch (e) {
      return {
        error: 'Both primary and fallback operations failed'
      };
    }
  }
}

/**
 * Write a function that implements a circuit breaker pattern.
 * Track failures and "open" the circuit after a threshold is reached.
 * Return a function that either executes the operation or throws immediately.
 *
 * const breaker = createCircuitBreaker(2); // fail threshold = 2
 * const fn = () => { throw new Error("service down"); };
 *
 * breaker(fn); // attempt 1 - throws error
 * breaker(fn); // attempt 2 - throws error, circuit opens
 * breaker(fn); // circuit open - throws immediately without calling fn
 */
export function createCircuitBreaker(failureThreshold) {
  let failureCount = 0;
  let circuitOpen = false;

  return (fn) => {
    if (circuitOpen) {
      throw new Error('Circuit breaker is open');
    }

    try {
      const res = fn();
      failureCount = 0;
      return res;
    } catch (e) {
      failureCount += 1;
      if (failureCount >= failureThreshold) {
        circuitOpen = true;
        throw new Error(e);
      }
      throw new Error(e);
    }
  };
}

/**
 * Write a function that validates function arguments using type checking.
 * Accept a function and an array of expected types.
 * Return a wrapped function that validates arguments before execution.
 *
 * const multiply = (a, b) => a * b;
 * const safeMultiply = createTypeValidator(multiply, ["number", "number"]);
 * safeMultiply(2, 3) // 6
 * safeMultiply("2", 3) // throws ValidationError: "Argument 0 must be of type number"
 */
export function createTypeValidator(fn, expectedTypes) {
  return (...args) => {
    if (args.length !== expectedTypes.length)
      throw Error('Correct number of arguments needed');

    args.forEach((item, i) => {
      if (typeof item !== expectedTypes[i]) {
        throw new ValidationError(
          `Argument ${i} must be of type ${expectedTypes[i]}`,
          'argument'
        );
      }
    });

    return fn(...args);
  };
}

/**
 * Write a function that safely accesses nested object properties.
 * Return the value if the path exists, or undefined if any part of the path is missing.
 * Support dot notation path strings.
 *
 * const obj = {user: {profile: {name: "John"}}};
 * safeGet(obj, "user.profile.name") // "John"
 * safeGet(obj, "user.profile.age") // undefined
 * safeGet(obj, "user.settings.theme") // undefined
 */
export function safeGet(obj, path) {
  if (!obj) {
    return undefined;
  }

  let current = obj;
  const arrayPath = path.split('.');

  for (let prop of arrayPath) {
    if (!current[prop] || current[prop] == null) {
      return undefined;
    }
    current = current[prop];
  }

  return current;
}
