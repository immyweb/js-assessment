/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises cover memory management and performance optimization
 * concepts at a senior level, including memory leak prevention,
 * performance measurement, and optimization techniques.
 */

// ==== MEMORY LEAK DETECTION AND PREVENTION ====

export function createTimerManager() {
  const timers = new Set();

  return {
    setTimeout(callback, delay) {
      const id = setTimeout(() => {
        callback();
        timers.delete(id);
      }, delay);
      timers.add(id);
      return id;
    },
    setInterval(callback, delay) {
      const id = setInterval(callback, delay);
      timers.add(id);
      return id;
    },
    clearAll() {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    },
    getActiveTimersCount() {
      return timers.size;
    }
  };
}

export function createEventEmitter() {
  const listeners = new Map();

  return {
    on(event, handler) {
      if (!listeners.has(event)) {
        listeners.set(event, []);
      }
      listeners.get(event).push(handler);
    },
    off(event, handler) {
      if (!listeners.has(event)) return;
      const handlers = listeners.get(event);
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
      if (handlers.length === 0) {
        listeners.delete(event);
      }
    },
    emit(event, ...args) {
      if (!listeners.has(event)) return;
      listeners.get(event).forEach((handler) => handler(...args));
    },
    getListenerCount(event) {
      return listeners.has(event) ? listeners.get(event).length : 0;
    }
  };
}

export function createLRUCache(maxSize) {
  const cache = new Map();

  return {
    get(key) {
      if (!cache.has(key)) return undefined;
      const value = cache.get(key);
      // Move to end (most recently used)
      cache.delete(key);
      cache.set(key, value);
      return value;
    },
    set(key, value) {
      // If exists, delete to re-add at end
      if (cache.has(key)) {
        cache.delete(key);
      }
      cache.set(key, value);
      // Evict oldest if over size
      if (cache.size > maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
    },
    size() {
      return cache.size;
    }
  };
}

export function createDOMManager() {
  const elementListeners = new WeakMap();

  return {
    addEventListener(element, event, handler) {
      if (!elementListeners.has(element)) {
        elementListeners.set(element, []);
      }
      elementListeners.get(element).push({ event, handler });
      element.addEventListener(event, handler);
    },
    removeElement(element) {
      if (!elementListeners.has(element)) return;
      const listeners = elementListeners.get(element);
      listeners.forEach(({ event, handler }) => {
        element.removeEventListener(event, handler);
      });
      elementListeners.delete(element);
    },
    getListenerCount(element) {
      return elementListeners.has(element)
        ? elementListeners.get(element).length
        : 0;
    }
  };
}

export function hasCircularReference(obj, seen = new WeakSet()) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  if (seen.has(obj)) {
    return true;
  }

  seen.add(obj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (hasCircularReference(obj[key], seen)) {
        return true;
      }
    }
  }

  // Also check array elements
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (hasCircularReference(obj[i], seen)) {
        return true;
      }
    }
  }

  return false;
}

// ==== PERFORMANCE MEASUREMENT ====

export function measureExecutionTime(fn) {
  const start = performance.now();
  const value = fn();

  if (value instanceof Promise) {
    return value.then((resolvedValue) => ({
      value: resolvedValue,
      time: performance.now() - start
    }));
  }

  return {
    value,
    time: performance.now() - start
  };
}

export function createProfiler() {
  const stats = new Map();

  return {
    wrap(name, fn) {
      if (!stats.has(name)) {
        stats.set(name, { calls: 0, totalTime: 0, avgTime: 0 });
      }

      return function (...args) {
        const start = performance.now();
        const result = fn(...args);
        const time = performance.now() - start;

        const stat = stats.get(name);
        stat.calls++;
        stat.totalTime += time;
        stat.avgTime = stat.totalTime / stat.calls;

        return result;
      };
    },
    getStats(name) {
      return stats.get(name) || { calls: 0, totalTime: 0, avgTime: 0 };
    }
  };
}

export function measureMemoryUsage(fn) {
  let memoryBefore = 0;
  let memoryAfter = 0;

  if (performance.memory) {
    memoryBefore = performance.memory.usedJSHeapSize;
  }

  const value = fn();

  if (performance.memory) {
    memoryAfter = performance.memory.usedJSHeapSize;
  }

  return {
    value,
    memoryDelta: memoryAfter - memoryBefore
  };
}

// ==== PERFORMANCE OPTIMIZATION ====

export function memoize(fn) {
  const cache = new Map();

  const memoized = function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };

  memoized.cache = cache;
  return memoized;
}

export function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

export function createBatchProcessor(processFn, batchSize) {
  let batch = [];

  return {
    add(item) {
      batch.push(item);
      if (batch.length >= batchSize) {
        return this.flush();
      }
    },
    flush() {
      if (batch.length === 0) return [];
      const result = processFn(batch);
      batch = [];
      return result;
    }
  };
}

export function createLazyValue(computeFn) {
  let computed = false;
  let value;

  return {
    getValue() {
      if (!computed) {
        value = computeFn();
        computed = true;
      }
      return value;
    },
    isEvaluated() {
      return computed;
    }
  };
}

// ==== MEMORY OPTIMIZATION ====

export function createObjectPool(factory, maxSize) {
  const pool = [];

  return {
    acquire() {
      if (pool.length > 0) {
        return pool.pop();
      }
      return factory();
    },
    release(obj) {
      if (pool.length < maxSize) {
        // Reset object properties
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            obj[key] =
              typeof obj[key] === 'number'
                ? 0
                : typeof obj[key] === 'string'
                ? ''
                : typeof obj[key] === 'boolean'
                ? false
                : null;
          }
        }
        pool.push(obj);
      }
    },
    size() {
      return pool.length;
    }
  };
}

export function createWeakCache() {
  const cache = new WeakMap();

  return {
    get(key) {
      return cache.get(key);
    },
    set(key, value) {
      cache.set(key, value);
    },
    has(key) {
      return cache.has(key);
    }
  };
}

export async function processInChunks(array, chunkSize, processFn) {
  const results = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    // Yield to event loop between chunks
    await new Promise((resolve) => setTimeout(resolve, 0));
    const chunkResult = processFn(chunk);
    results.push(...chunkResult);
  }

  return results;
}

export function createStringInterner() {
  const pool = new Map();

  return {
    intern(str) {
      if (pool.has(str)) {
        return pool.get(str);
      }
      pool.set(str, str);
      return str;
    },
    getPoolSize() {
      return pool.size;
    }
  };
}

// ==== GARBAGE COLLECTION AWARENESS ====

export function createManagedResource(acquire, release) {
  return {
    use(callback) {
      const resource = acquire();
      try {
        return callback(resource);
      } finally {
        release(resource);
      }
    }
  };
}

export function createFinalizableObject(value, cleanupFn) {
  let cleaned = false;

  // Use FinalizationRegistry if available
  if (typeof FinalizationRegistry !== 'undefined') {
    const registry = new FinalizationRegistry(() => {
      if (!cleaned) {
        cleanupFn();
        cleaned = true;
      }
    });

    const wrapper = { getValue: () => value };
    registry.register(wrapper, null);

    wrapper.cleanup = () => {
      if (!cleaned) {
        cleanupFn();
        cleaned = true;
      }
    };

    return wrapper;
  }

  // Fallback without FinalizationRegistry
  return {
    getValue: () => value,
    cleanup: () => {
      if (!cleaned) {
        cleanupFn();
        cleaned = true;
      }
    }
  };
}

export function breakCircularReferences(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (seen.has(obj)) {
    return undefined;
  }

  const copy = Array.isArray(obj) ? [] : {};
  seen.set(obj, copy);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = breakCircularReferences(obj[key], seen);
    }
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      copy[i] = breakCircularReferences(obj[i], seen);
    }
  }

  return copy;
}

// ==== PERFORMANCE PATTERNS ====

export function createRequestDeduplicator(fetchFn) {
  const pendingRequests = new Map();

  return {
    async request(id) {
      const key = JSON.stringify(id);

      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const promise = fetchFn(id).then((result) => {
        pendingRequests.delete(key);
        return result;
      });

      pendingRequests.set(key, promise);
      return promise;
    }
  };
}

export function createVirtualList(totalItems, visibleItems, itemHeight) {
  let scrollTop = 0;

  return {
    getVisibleRange() {
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(start + visibleItems, totalItems);
      return { start, end };
    },
    scrollTo(position) {
      scrollTop = position;
    },
    getTotalHeight() {
      return totalItems * itemHeight;
    }
  };
}

export function binarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArray[mid] === target) {
      return mid;
    }

    if (sortedArray[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

export function optimizedFilter(array, predicate) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}
