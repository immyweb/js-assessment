/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises cover advanced asynchronous patterns including
 * reactive programming, stream processing, and backpressure handling.
 */

// ==== REACTIVE PROGRAMMING CONCEPTS ====

export function createObservable() {
  const subscribers = [];

  return {
    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        const index = subscribers.indexOf(callback);
        if (index > -1) {
          subscribers.splice(index, 1);
        }
      };
    },
    next(value) {
      subscribers.forEach((callback) => callback(value));
    }
  };
}

export function fromArray(array) {
  const observable = createObservable();

  // Emit all values immediately
  setTimeout(() => {
    array.forEach((value) => observable.next(value));
  }, 0);

  return observable;
}

export function mapObservable(observable, mapFn) {
  const mapped = createObservable();

  observable.subscribe((value) => {
    mapped.next(mapFn(value));
  });

  return mapped;
}

export function filterObservable(observable, predicate) {
  const filtered = createObservable();

  observable.subscribe((value) => {
    if (predicate(value)) {
      filtered.next(value);
    }
  });

  return filtered;
}

export function combineObservables(observables) {
  const combined = createObservable();
  const latestValues = new Array(observables.length);
  let hasValues = new Array(observables.length).fill(false);

  observables.forEach((obs, index) => {
    obs.subscribe((value) => {
      latestValues[index] = value;
      hasValues[index] = true;

      if (hasValues.every((has) => has)) {
        combined.next([...latestValues]);
      }
    });
  });

  return combined;
}

export function mergeObservables(observables) {
  const merged = createObservable();

  observables.forEach((obs) => {
    obs.subscribe((value) => {
      merged.next(value);
    });
  });

  return merged;
}

// ==== STREAM PROCESSING ====

export function createAsyncIterator(array, delay) {
  let index = 0;

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (index < array.length) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return { value: array[index++], done: false };
      }
      return { done: true };
    }
  };
}

export function createReadableStream(data) {
  let index = 0;

  return new ReadableStream({
    pull(controller) {
      if (index < data.length) {
        controller.enqueue(data[index++]);
      } else {
        controller.close();
      }
    }
  });
}

export function transformStream(sourceStream, transformFn) {
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(transformFn(chunk));
    }
  });

  return pipeStreams(sourceStream, transformStream);
}

export async function consumeStream(stream) {
  const reader = stream.getReader();
  const values = [];
  let result;

  while (!(result = await reader.read()).done) {
    values.push(result.value);
  }

  return values;
}

export function pipeStreams(readable, transform) {
  return readable.pipeThrough(transform);
}

export function teeStream(stream) {
  return stream.tee();
}

// ==== BACKPRESSURE HANDLING ====

export function createAsyncQueue(concurrency) {
  let running = 0;
  const queue = [];

  const processNext = async () => {
    if (queue.length === 0 || running >= concurrency) {
      return;
    }

    running++;
    const { task, resolve, reject } = queue.shift();

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      running--;
      processNext();
    }
  };

  return {
    add(task) {
      return new Promise((resolve, reject) => {
        queue.push({ task, resolve, reject });
        processNext();
      });
    }
  };
}

export function createBuffer(size, timeoutMs) {
  let buffer = [];
  let flushCallback = null;
  let timeoutId = null;

  const flush = () => {
    if (buffer.length > 0 && flushCallback) {
      flushCallback([...buffer]);
      buffer = [];
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const startTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(flush, timeoutMs);
  };

  return {
    add(value) {
      buffer.push(value);

      if (buffer.length === 1) {
        startTimeout();
      }

      if (buffer.length >= size) {
        flush();
      }
    },
    onFlush(callback) {
      flushCallback = callback;
    }
  };
}

export function createChannel(bufferSize) {
  const buffer = [];
  const waitingReceivers = [];
  const waitingSenders = [];

  return {
    async send(value) {
      if (waitingReceivers.length > 0) {
        const receiver = waitingReceivers.shift();
        receiver(value);
        return;
      }

      if (buffer.length < bufferSize) {
        buffer.push(value);
        return;
      }

      // Wait for space in buffer
      return new Promise((resolve) => {
        waitingSenders.push({ value, resolve });
      });
    },

    async receive() {
      if (buffer.length > 0) {
        const value = buffer.shift();

        // Process waiting senders
        if (waitingSenders.length > 0) {
          const sender = waitingSenders.shift();
          buffer.push(sender.value);
          sender.resolve();
        }

        return value;
      }

      // Wait for value
      return new Promise((resolve) => {
        waitingReceivers.push(resolve);
      });
    }
  };
}

export function throttleAsync(asyncFn, delayMs) {
  let lastCall = 0;
  let pending = null;

  return async function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delayMs) {
      lastCall = now;
      return asyncFn(...args);
    }

    if (pending) {
      return pending;
    }

    pending = new Promise((resolve) => {
      setTimeout(async () => {
        lastCall = Date.now();
        const result = await asyncFn(...args);
        pending = null;
        resolve(result);
      }, delayMs - timeSinceLastCall);
    });

    return pending;
  };
}

export function rateLimit(asyncFn, maxCalls, windowMs) {
  const calls = [];

  return async function (...args) {
    const now = Date.now();

    // Remove old calls outside the window
    while (calls.length > 0 && calls[0] < now - windowMs) {
      calls.shift();
    }

    if (calls.length < maxCalls) {
      calls.push(now);
      return asyncFn(...args);
    }

    // Wait until the oldest call expires
    const oldestCall = calls[0];
    const waitTime = oldestCall + windowMs - now;

    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return rateLimit(asyncFn, maxCalls, windowMs)(...args);
  };
}

export function createSlidingWindow(size) {
  const window = [];

  return {
    add(value) {
      window.push(value);
      if (window.length > size) {
        window.shift();
      }
      return window.length === size ? [...window] : [];
    },
    getWindow() {
      return [...window];
    }
  };
}

// ==== ADVANCED PATTERNS ====

export async function retryWithBackoff(asyncFn, maxRetries, initialDelay) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export function createCircuitBreaker(asyncFn, options) {
  const { threshold, timeout } = options;
  let state = 'closed'; // closed, open, half-open
  let failures = 0;
  let nextAttempt = null;

  return {
    async execute(...args) {
      if (state === 'open') {
        if (Date.now() < nextAttempt) {
          throw new Error('Circuit breaker is open');
        }
        state = 'half-open';
      }

      try {
        const result = await asyncFn(...args);

        if (state === 'half-open') {
          state = 'closed';
          failures = 0;
        }

        return result;
      } catch (error) {
        failures++;

        if (failures >= threshold) {
          state = 'open';
          nextAttempt = Date.now() + timeout;
        }

        throw error;
      }
    },

    getState() {
      return state;
    }
  };
}

export function createAsyncPool(createFn, destroyFn, maxSize) {
  const available = [];
  const inUse = new Set();

  return {
    async acquire() {
      if (available.length > 0) {
        const resource = available.pop();
        inUse.add(resource);
        return resource;
      }

      if (inUse.size < maxSize) {
        const resource = await createFn();
        inUse.add(resource);
        return resource;
      }

      // Wait for a resource to become available
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (available.length > 0) {
            clearInterval(checkInterval);
            const resource = available.pop();
            inUse.add(resource);
            resolve(resource);
          }
        }, 10);
      });
    },

    async release(resource) {
      inUse.delete(resource);
      available.push(resource);
    }
  };
}

export function createCancellablePromise(asyncFn) {
  const signal = { cancelled: false };

  const promise = asyncFn(signal);

  const cancel = () => {
    signal.cancelled = true;
  };

  return { promise, cancel };
}

export function createCoordinator() {
  const tasks = new Map();

  return {
    register(name, asyncFn) {
      tasks.set(name, asyncFn);
    },

    async executeAll() {
      const results = {};

      for (const [name, task] of tasks) {
        results[name] = await task();
      }

      return results;
    }
  };
}

export function createAsyncAggregator(batchSize, timeoutMs) {
  let batch = [];
  let timeoutId = null;
  let autoFlushCallback = null;

  const autoFlush = async () => {
    if (batch.length > 0 && autoFlushCallback) {
      const promises = [...batch];
      batch = [];
      const results = await Promise.all(promises);
      autoFlushCallback(results);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const startTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(autoFlush, timeoutMs);
  };

  return {
    add(promise) {
      batch.push(promise);

      if (batch.length === 1) {
        startTimeout();
      }

      if (batch.length >= batchSize) {
        autoFlush();
      }
    },

    async flush() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (batch.length === 0) return [];

      const promises = [...batch];
      batch = [];
      return Promise.all(promises);
    },

    onAutoFlush(callback) {
      autoFlushCallback = callback;
    }
  };
}
