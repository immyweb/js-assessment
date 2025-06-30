/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on fundamental asynchronous JavaScript concepts.
 * You'll need to understand Promises, async/await, and error handling.
 */

/**
 * Write a function that creates a Promise using the Promise constructor.
 * The promise should resolve with the provided value after a delay.
 *
 * createPromise('hello', 1000).then(value => console.log(value));
 * // logs 'hello' after 1 second
 */
export function createPromise(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

/**
 * Write a function that creates a promise chain using .then() methods.
 * Each step should transform the value and pass it to the next step.
 *
 * promiseChain(5)
 *   .then(x => x * 2)     // 10
 *   .then(x => x + 1)     // 11
 *   .then(x => x * 3);    // 33
 */
export function promiseChain(initialValue) {
  return Promise.resolve(initialValue);
}

/**
 * Write a function that handles promise rejection using .catch().
 * If the promise rejects, return a default value instead.
 *
 * handleRejection(Promise.reject('error'), 'default')
 * // resolves to 'default'
 */
export function handleRejection(promise, defaultValue) {
  return promise.catch((error) => defaultValue);
}

/**
 * Write a function that uses Promise.all to wait for multiple promises.
 * Return an array of all resolved values.
 *
 * const results = await waitForAll([promise1, promise2, promise3]);
 * // [result1, result2, result3]
 */
export async function waitForAll(promises) {
  return Promise.all(promises).then((responses) => responses);
}

/**
 * Write a function that uses Promise.allSettled to handle mixed results.
 * Return an object with successful and failed results.
 *
 * const results = await waitForAllSettled([promise1, promise2]);
 * // {fulfilled: [value1], rejected: [reason2]}
 */
export async function waitForAllSettled(promises) {
  const result = {
    fulfilled: [],
    rejected: []
  };

  const responses = await Promise.allSettled(promises);

  responses.forEach((response) => {
    if (response.status === 'fulfilled') {
      result.fulfilled.push(response.value);
    } else if (response.status === 'rejected') {
      result.rejected.push(response.reason);
    }
  });

  return result;
}

/**
 * Write a function that uses Promise.race to get the first resolved promise.
 * Return the value of whichever promise resolves first.
 *
 * const fastest = await racePromises([slowPromise, fastPromise]);
 * // returns result of fastPromise
 */
export async function racePromises(promises) {
  return await Promise.race(promises);
}

/**
 * Write a function that converts a callback-style function to return a Promise.
 *
 * const promisifiedFn = promisify((x, callback) => {
 *   setTimeout(() => callback(null, x * 2), 100);
 * });
 * const result = await promisifiedFn(5); // 10
 */
export function promisify(callbackFn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
      args.push(callback);
      callbackFn.call(this, ...args);
    });
  };
}

/**
 * Write an async function that processes items sequentially (one after another).
 * Each item should be processed only after the previous one completes.
 *
 * await processSequentially([1, 2, 3], async (num) => {
 *   await delay(100);
 *   console.log(num);
 * });
 * // logs 1, then 2, then 3 with 100ms between each
 */
export async function processSequentially(items, asyncCallback) {
  for (const item of items) {
    await asyncCallback(item);
  }
}

/**
 * Write a function that adds a timeout to any promise.
 * If the promise doesn't resolve within the timeout, reject with an error.
 *
 * const result = await withTimeout(slowPromise, 5000);
 * // rejects with 'Timeout' if slowPromise takes longer than 5 seconds
 */
export function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Write a function that retries a failed async operation up to maxRetries times.
 * Only retry if the operation throws an error.
 *
 * const result = await retryOperation(async () => {
 *   if (Math.random() < 0.5) throw new Error('Random failure');
 *   return 'success';
 * }, 3);
 */
export async function retryOperation(asyncFn, maxRetries) {
  try {
    const result = await asyncFn();
    return result;
  } catch (error) {
    if (maxRetries === 0) {
      throw error;
    }
    return retryOperation(asyncFn, maxRetries - 1);
  }
}

/**
 * Write a function that creates a delay using Promise and setTimeout.
 *
 * await delay(1000); // waits 1 second
 * console.log('Done waiting');
 */
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Write an async function that handles errors with try/catch and provides fallback data.
 *
 * const data = await fetchWithFallback('/api/data', {default: 'data'});
 * // returns API data or fallback if API fails
 */
export async function fetchWithFallback(url, fallbackData) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    return fallbackData;
  }
}

/**
 * Write a function that processes an async iterable using for await...of.
 * Sum all the values from the async iterable.
 *
 * async function* numbers() {
 *   yield 1; yield 2; yield 3;
 * }
 * const sum = await sumAsyncIterable(numbers()); // 6
 */
export async function sumAsyncIterable(asyncIterable) {
  let sum = 0;

  for await (const num of asyncIterable) {
    sum += num;
  }

  return sum;
}

/**
 * Write a function that creates a cancellable promise using AbortController.
 * The promise should reject if the abort signal is triggered.
 *
 * const controller = new AbortController();
 * const promise = createCancellablePromise(1000, controller.signal);
 * controller.abort(); // should reject the promise
 */
export function createCancellablePromise(delay, abortSignal) {
  return new Promise((resolve, reject) => {
    // Check if already aborted
    if (abortSignal.aborted) {
      reject(new Error('Operation aborted'));
      return;
    }

    const timer = setTimeout(() => {
      resolve();
    }, delay);

    // Add abort listener
    const abortHandler = () => {
      clearTimeout(timer);
      reject(new Error('Operation aborted'));
    };

    abortSignal.addEventListener('abort', abortHandler);

    // Clean up the event listener when the promise resolves
    const originalResolve = resolve;
    resolve = () => {
      abortSignal.removeEventListener('abort', abortHandler);
      originalResolve();
    };
  });
}
