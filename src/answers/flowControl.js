/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on conditional logic, loops, and flow control concepts.
 * You'll need to understand if/else statements, switch cases, loops, and error handling.
 */

// write a function that receives a number as its argument;
// if the number is divisible by 3, the function should return 'fizz';
// if the number is divisible by 5, the function should return 'buzz';
// if the number is divisible by 3 and 5, the function should return
// 'fizzbuzz';
//
// otherwise the function should return the number, or false if no number
// was provided or the value provided is not a number
export function fizzBuzz(num) {
  if (!num || typeof num !== 'number') return false;
  if (num % 3 === 0 && num % 5 === 0) return 'fizzbuzz';
  if (num % 3 === 0) return 'fizz';
  if (num % 5 === 0) return 'buzz';
  return num;
}

/**
 * Write a function that takes a grade (0-100) and returns the letter grade.
 * Use a switch statement or if/else chain.
 * A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59
 * Return 'Invalid' for values outside 0-100 or non-numbers.
 *
 * getLetterGrade(95) // 'A'
 * getLetterGrade(67) // 'D'
 * getLetterGrade(-5) // 'Invalid'
 */
export function getLetterGrade(score) {
  if (score < 0 || score > 100 || typeof score !== 'number') {
    return 'Invalid';
  }
  if (score >= 90) {
    return 'A';
  }
  if (score >= 80) {
    return 'B';
  }
  if (score >= 70) {
    return 'C';
  }
  if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

/**
 * Write a function that determines the day type based on day number (1-7).
 * 1-5: 'weekday', 6-7: 'weekend'
 * Use a switch statement with fall-through cases.
 * Return 'invalid' for invalid inputs.
 *
 * getDayType(1) // 'weekday'
 * getDayType(6) // 'weekend'
 * getDayType(8) // 'invalid'
 */
export function getDayType(dayNumber) {
  switch (dayNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 'weekday';
    case 6:
    case 7:
      return 'weekend';
    default:
      return 'invalid';
  }
}

/**
 * Write a function that uses short-circuit evaluation to return a default value.
 * If input is falsy, return 'default', otherwise return the input.
 * Use logical OR (||) operator.
 *
 * getValueOrDefault('hello') // 'hello'
 * getValueOrDefault('') // 'default'
 * getValueOrDefault(null) // 'default'
 */
export function getValueOrDefault(input) {
  return input ? input || input.length : 'default';
}

/**
 * Write a function that uses nullish coalescing (??) to handle null/undefined.
 * Return the input unless it's null or undefined, then return 'N/A'.
 * Note: This should treat 0, false, '' as valid values (unlike ||).
 *
 * getNullishDefault(0) // 0
 * getNullishDefault('') // ''
 * getNullishDefault(null) // 'N/A'
 * getNullishDefault(undefined) // 'N/A'
 */
export function getNullishDefault(input) {
  return input ?? 'N/A';
}

/**
 * Write a function that safely accesses nested object properties.
 * Use optional chaining (?.) to avoid errors.
 * Return the user's city or 'Unknown' if not available.
 *
 * getUserCity({user: {address: {city: 'NYC'}}}) // 'NYC'
 * getUserCity({user: {address: {}}}) // 'Unknown'
 * getUserCity({user: {}}) // 'Unknown'
 * getUserCity({}) // 'Unknown'
 */
export function getUserCity(data) {
  return data?.user?.address?.city ?? 'Unknown';
}

/**
 * Write a function that finds the first even number in an array.
 * Use a for loop with early return (break equivalent).
 * Return null if no even number is found.
 *
 * findFirstEven([1, 3, 4, 7, 8]) // 4
 * findFirstEven([1, 3, 5]) // null
 * findFirstEven([]) // null
 */
export function findFirstEven(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      return numbers[i];
    }
  }
  return null;
}

/**
 * Write a function that counts elements while skipping negative numbers.
 * Use a for loop with continue to skip negatives.
 * Return the count of non-negative numbers.
 *
 * countNonNegative([1, -2, 3, -4, 5]) // 3
 * countNonNegative([-1, -2, -3]) // 0
 * countNonNegative([1, 2, 3]) // 3
 */
export function countNonNegative(numbers) {
  let count = 0;

  for (let i = 0; i <= numbers.length - 1; i++) {
    if (Math.sign(numbers[i]) !== -1) {
      count++;
    }
  }

  return count;
}

/**
 * Write a function that processes nested arrays using nested loops.
 * Find the maximum value across all sub-arrays.
 * Return -Infinity if the array is empty or has no numbers.
 *
 * findMaxInNested([[1, 2], [3, 4], [5]]) // 5
 * findMaxInNested([[1], [2, 3]]) // 3
 * findMaxInNested([]) // -Infinity
 */
export function findMaxInNested(arrays) {
  // Handle empty array case
  if (arrays.length === 0) {
    return -Infinity;
  }

  let maxValue = -Infinity;

  // Nested loops to process all sub-arrays
  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      if (arrays[i][j] > maxValue) {
        maxValue = arrays[i][j];
      }
    }
  }

  return maxValue;
}

/**
 * Write a function that uses labeled statements to break from nested loops.
 * Find the first pair of numbers that sum to the target.
 * Return the pair as [num1, num2] or null if not found.
 *
 * findPairWithSum([1, 2, 3, 4], 5) // [1, 4] or [2, 3]
 * findPairWithSum([1, 2, 3], 10) // null
 */
export function findPairWithSum(numbers, target) {
  if (numbers.length < 2) {
    return null;
  }

  // Use labeled statement to break from nested loops
  outerLoop: for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [numbers[i], numbers[j]]; // Found pair, return immediately
      }
    }
  }

  return null; // No pair found
}

/**
 * Write a function that validates input with guard clauses (early returns).
 * Check if a password meets all criteria:
 * - At least 8 characters
 * - Contains uppercase letter
 * - Contains lowercase letter
 * - Contains number
 * Return the first failing criteria or true if valid.
 *
 * validatePassword('Abc123456') // true
 * validatePassword('abc123') // 'Must contain uppercase letter'
 * validatePassword('short') // 'Must be at least 8 characters'
 */
export function validatePassword(password) {
  if (typeof password !== 'string') {
    return 'Password must be a string';
  }

  if (password.length < 8) {
    return 'Must be at least 8 characters';
  }

  // Track what we've found in a single pass
  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumber = false;

  // Single loop through the string
  for (const char of password) {
    if (!hasUppercase && /[A-Z]/.test(char)) {
      hasUppercase = true;
    } else if (!hasLowercase && /[a-z]/.test(char)) {
      hasLowercase = true;
    } else if (!hasNumber && /[0-9]/.test(char)) {
      hasNumber = true;
    }

    // Early exit if all conditions are met
    if (hasUppercase && hasLowercase && hasNumber) {
      return true;
    }
  }

  // Return the first missing requirement
  if (!hasUppercase) {
    return 'Must contain uppercase letter';
  }
  if (!hasLowercase) {
    return 'Must contain lowercase letter';
  }
  if (!hasNumber) {
    return 'Must contain number';
  }

  return true;
}

/**
 * Write a function that uses try/catch for basic error handling in control flow.
 * Attempt to access an array element at the given index.
 * Return the element if successful, or 'Index out of bounds' if it fails.
 * This focuses on flow control rather than comprehensive error handling.
 *
 * safeArrayAccess([1, 2, 3], 1) // 2
 * safeArrayAccess([1, 2, 3], 5) // 'Index out of bounds'
 * safeArrayAccess(null, 0) // 'Index out of bounds'
 */
export function safeArrayAccess(array, index) {
  try {
    // Check if array is null/undefined or index is out of bounds
    if (array === null || array === undefined) {
      throw new Error('Array is null or undefined');
    }

    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }

    return array[index];
  } catch (err) {
    return 'Index out of bounds';
  }
}

/**
 * Write a function that demonstrates complex conditional logic.
 * Determine shipping cost based on weight, distance, and priority:
 * - Base cost: $5
 * - Weight: +$2 per pound over 1 pound
 * - Distance: +$1 per 100 miles (rounded up)
 * - Priority: +50% if express, +100% if overnight
 * Return the total cost rounded to 2 decimal places.
 *
 * calculateShipping(2, 250, 'standard') // 5 + 2 + 3 = 10.00
 * calculateShipping(1, 100, 'express') // (5 + 0 + 1) * 1.5 = 9.00
 * calculateShipping(3, 300, 'overnight') // (5 + 4 + 3) * 2 = 24.00
 */
export function calculateShipping(weight, distance, priority) {
  let cost = 5;

  // Add weight cost: +$2 per pound over 1 pound
  if (weight > 1) {
    cost += (weight - 1) * 2;
  }

  // Add distance cost: +$1 per 100 miles (rounded up)
  if (distance >= 100) {
    cost += Math.ceil(distance / 100);
  }

  // Apply priority multiplier and round to 2 decimal places
  switch (priority) {
    case 'standard':
      return Number(cost.toFixed(2));
    case 'express':
      return Number((cost * 1.5).toFixed(2));
    case 'overnight':
      return Number((cost * 2).toFixed(2));
    default:
      return Number(cost.toFixed(2)); // Default to standard if invalid priority
  }
}

/**
 * Write a function that uses switch with complex cases.
 * Process different HTTP status codes and return appropriate messages.
 * Group similar codes together using fall-through.
 *
 * getHttpMessage(200) // 'Success'
 * getHttpMessage(404) // 'Not Found'
 * getHttpMessage(500) // 'Server Error'
 * getHttpMessage(999) // 'Unknown Status'
 */
export function getHttpMessage(statusCode) {
  switch (statusCode) {
    case 200:
    case 201:
    case 202:
      return 'Success';
    case 400:
    case 401:
    case 403:
    case 404:
      return 'Not Found';
    case 500:
    case 501:
    case 502:
    case 503:
      return 'Server Error';
    default:
      return 'Unknown Status';
  }
}

/**
 * Write a function that implements a simple state machine.
 * Process a traffic light state transition based on current state and action.
 * States: 'red', 'yellow', 'green'
 * Actions: 'next' (normal progression), 'emergency' (go to red)
 * Return the new state.
 *
 * trafficLight('red', 'next') // 'green'
 * trafficLight('green', 'next') // 'yellow'
 * trafficLight('yellow', 'next') // 'red'
 * trafficLight('green', 'emergency') // 'red'
 */
export function trafficLight(currentState, action) {
  const transitions = {
    next: {
      red: 'green',
      green: 'yellow',
      yellow: 'red'
    },
    emergency: {
      red: 'red',
      yellow: 'red',
      green: 'red'
    }
  };

  // Get the transition table for the given action
  const actionTransitions = transitions[action];

  // If invalid action, return current state
  if (!actionTransitions) {
    return currentState;
  }

  // Get the next state, or return current state if invalid current state
  return actionTransitions[currentState] || currentState;
}

/**
 * Write a function that uses multiple loop types appropriately.
 * Process an array of objects and return statistics.
 * Use for...of for iteration, while for conditions, and for for counters.
 * Return {total, average, min, max, evenCount}.
 *
 * processNumbers([{value: 1}, {value: 2}, {value: 3}])
 * // {total: 6, average: 2, min: 1, max: 3, evenCount: 1}
 */
export function processNumbers(objects) {
  let total = 0;
  let min = Infinity;
  let max = -Infinity;
  let evenCount = 0;

  if (objects.length === 0) {
    return {
      total,
      average: 0,
      min,
      max,
      evenCount
    };
  }

  // Use for...of for iteration - calculate total only
  for (const obj of objects) {
    const value = obj.value;
    total += value;
  }

  const average = total / objects.length;

  // Use while loop for conditions - find min and max
  let index = 0;
  while (index < objects.length) {
    const value = objects[index].value;
    if (value < min) min = value;
    if (value > max) max = value;
    index++;
  }

  // Use for loop with counter - count even numbers
  for (let i = 0; i < objects.length; i++) {
    const value = objects[i].value;
    if (value % 2 === 0) {
      evenCount++;
    }
  }

  return {
    total,
    average,
    min,
    max,
    evenCount
  };
}

/**
 * Write a function that demonstrates control flow with array operations.
 * Apply different operations based on array element properties.
 * If element is a number, square it. If string, uppercase it. Otherwise, keep as-is.
 * Return the new array. This focuses on conditional logic over functional programming.
 *
 * transformByType([1, 'hello', true, 3]) // [1, 'HELLO', true, 9]
 * transformByType(['a', 2, null]) // ['A', 4, null]
 */
export function transformByType(array) {
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === 'number') {
      newArr.push(array[i] * array[i]);
    } else if (typeof array[i] === 'string') {
      newArr.push(array[i].toUpperCase());
    } else {
      newArr.push(array[i]);
    }
  }

  return newArr;
}

/**
 * Write a function that uses simple retry logic for control flow.
 * Execute a callback up to maxRetries times until it returns a truthy value.
 * Return the result if successful, or null after all retries fail.
 * This focuses on loop-based retry rather than async error handling.
 *
 * const flakyFn = () => Math.random() > 0.7 ? 'success' : false;
 * simpleRetry(flakyFn, 3) // 'success' or null
 */
export function simpleRetry(callback, maxRetries) {
  let retries = 0;
  let res;

  while (retries < maxRetries) {
    res = callback();
    if (res) {
      return res;
    } else {
      retries++;
    }
  }
  return null;
}
