// you should be able to create a simple delay function
// Example:
//   await delay(1000); // waits 1 second
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// you should be able to wrap a callback function in a promise
// Example:
//   const readFile = promisify(fs.readFile);
//   const data = await readFile('file.txt');
export function promisify(callbackFn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackFn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

// you should be able to fetch data and handle errors
// Example:
//   const data = await fetchWithFallback(url, "default data");
export async function fetchWithFallback(url, fallbackData) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return fallbackData;
  }
}

// you should be able to wait for multiple promises to complete
// Example:
//   const results = await waitForAll([promise1, promise2, promise3]);
export async function waitForAll(promises) {
  const results = [];

  for (let i = 0; i < promises.length; i++) {
    results[i] = await promises[i];
  }

  return results;
}

// you should be able to get the first promise that resolves
// Example:
//   const fastest = await raceToFinish([slowPromise, fastPromise]);
export async function raceToFinish(promises) {
  return Promise.race(promises);
}

// you should be able to process an array one item at a time
// Example:
//   await processSequentially([1, 2, 3], async (num) => console.log(num));
export async function processSequentially(items, asyncCallback) {
  const results = [];

  for (const item of items) {
    const result = await asyncCallback(item);
    results.push(result);
  }

  return results;
}

// you should be able to add a timeout to any promise
// Example:
//   const result = await withTimeout(slowPromise, 5000); // fails after 5 seconds
export function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

// you should be able to retry a failed async operation
// Example:
//   const result = await retryOperation(unstableFunction, 3);
export async function retryOperation(asyncFn, maxRetries) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) {
        throw lastError;
      }
      await delay(1000); // wait 1 second before retry
    }
  }
}

// you should be able to check if a value is a promise
// Example:
//   isPromise(Promise.resolve(42)) === true
//   isPromise(42) === false
export function isPromise(value) {
  return !!(value && typeof value.then === 'function');
}

// you should be able to convert any value to a promise
// Example:
//   const promise = toPromise(42); // Promise.resolve(42)
//   const promise2 = toPromise(Promise.resolve(42)); // same promise
export function toPromise(value) {
  if (isPromise(value)) {
    return value;
  }
  return Promise.resolve(value);
}

// you should be able to create a simple async counter
// Example:
//   const counter = createAsyncCounter();
//   await counter.increment(); // returns 1
//   await counter.increment(); // returns 2
export function createAsyncCounter(startValue = 0) {
  let count = startValue;

  return {
    async increment() {
      await delay(100); // simulate async work
      return ++count;
    },

    async decrement() {
      await delay(100);
      return --count;
    },

    async getValue() {
      return count;
    }
  };
}

// you should be able to pause execution until a condition is met
// Example:
//   await waitUntil(() => document.getElementById('myElement'));
export async function waitUntil(conditionFn, checkInterval = 100) {
  while (!conditionFn()) {
    await delay(checkInterval);
  }
}

// you should be able to load multiple resources in parallel
// Example:
//   const {user, posts} = await loadResources({
//     user: () => fetch('/api/user'),
//     posts: () => fetch('/api/posts')
//   });
export async function loadResources(resourceMap) {
  const keys = Object.keys(resourceMap);
  const promises = keys.map((key) => resourceMap[key]());
  const results = await Promise.all(promises);

  const output = {};
  keys.forEach((key, index) => {
    output[key] = results[index];
  });

  return output;
}

// you should be able to chain async operations
// Example:
//   const result = await chainAsync(value)
//     .then(step1)
//     .then(step2)
//     .then(step3);
export function chainAsync(initialValue) {
  let promise = Promise.resolve(initialValue);

  return {
    then(asyncFn) {
      promise = promise.then(asyncFn);
      return this;
    },

    catch(errorHandler) {
      promise = promise.catch(errorHandler);
      return this;
    },

    finally(finallyHandler) {
      promise = promise.finally(finallyHandler);
      return this;
    },

    async execute() {
      return await promise;
    }
  };
}
