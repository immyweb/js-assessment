import { describe, beforeEach, test, expect, vi } from 'vitest';

import {
  // Memory leak detection and prevention
  createTimerManager,
  createEventEmitter,
  createLRUCache,
  createDOMManager,
  hasCircularReference,
  // Performance measurement
  measureExecutionTime,
  createProfiler,
  measureMemoryUsage,
  // Performance optimization
  memoize,
  debounce,
  throttle,
  createBatchProcessor,
  createLazyValue,
  // Memory optimization
  createObjectPool,
  createWeakCache,
  processInChunks,
  createStringInterner,
  // Garbage collection awareness
  createManagedResource,
  createFinalizableObject,
  breakCircularReferences,
  // Performance patterns
  createRequestDeduplicator,
  createVirtualList,
  binarySearch,
  optimizedFilter
} from '../exercises/memory-performance.js';

describe('Memory Leak Detection and Prevention', () => {
  describe('createTimerManager', () => {
    test('should create a timer manager that tracks active timers', () => {
      const manager = createTimerManager();
      expect(manager).toBeDefined();
      expect(manager.getActiveTimersCount()).toBe(0);
    });

    test('should track setTimeout timers', () => {
      const manager = createTimerManager();
      manager.setTimeout(() => {}, 1000);
      expect(manager.getActiveTimersCount()).toBe(1);
    });

    test('should track setInterval timers', () => {
      const manager = createTimerManager();
      manager.setInterval(() => {}, 1000);
      expect(manager.getActiveTimersCount()).toBe(1);
    });

    test('should clear all timers', () => {
      const manager = createTimerManager();
      manager.setTimeout(() => {}, 1000);
      manager.setInterval(() => {}, 1000);
      manager.clearAll();
      expect(manager.getActiveTimersCount()).toBe(0);
    });

    test('should execute setTimeout callback', async () => {
      const manager = createTimerManager();
      let called = false;
      manager.setTimeout(() => {
        called = true;
      }, 10);
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(called).toBe(true);
    });
  });

  describe('createEventEmitter', () => {
    test('should create an event emitter', () => {
      const emitter = createEventEmitter();
      expect(emitter).toBeDefined();
    });

    test('should register event listeners', () => {
      const emitter = createEventEmitter();
      const handler = () => {};
      emitter.on('test', handler);
      expect(emitter.getListenerCount('test')).toBe(1);
    });

    test('should emit events to listeners', () => {
      const emitter = createEventEmitter();
      let called = false;
      emitter.on('test', () => {
        called = true;
      });
      emitter.emit('test');
      expect(called).toBe(true);
    });

    test('should remove event listeners', () => {
      const emitter = createEventEmitter();
      const handler = () => {};
      emitter.on('test', handler);
      emitter.off('test', handler);
      expect(emitter.getListenerCount('test')).toBe(0);
    });

    test('should support multiple listeners for the same event', () => {
      const emitter = createEventEmitter();
      let count = 0;
      emitter.on('test', () => count++);
      emitter.on('test', () => count++);
      emitter.emit('test');
      expect(count).toBe(2);
    });

    test('should pass arguments to listeners', () => {
      const emitter = createEventEmitter();
      let received;
      emitter.on('test', (arg) => {
        received = arg;
      });
      emitter.emit('test', 'hello');
      expect(received).toBe('hello');
    });
  });

  describe('createLRUCache', () => {
    test('should create a cache with size limit', () => {
      const cache = createLRUCache(3);
      expect(cache).toBeDefined();
    });

    test('should store and retrieve values', () => {
      const cache = createLRUCache(3);
      cache.set('a', 1);
      expect(cache.get('a')).toBe(1);
    });

    test('should evict least recently used item when full', () => {
      const cache = createLRUCache(3);
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      cache.set('d', 4);
      expect(cache.get('a')).toBeUndefined();
      expect(cache.get('d')).toBe(4);
    });

    test('should update access order on get', () => {
      const cache = createLRUCache(3);
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      cache.get('a'); // access 'a'
      cache.set('d', 4); // should evict 'b', not 'a'
      expect(cache.get('a')).toBe(1);
      expect(cache.get('b')).toBeUndefined();
    });

    test('should report cache size', () => {
      const cache = createLRUCache(3);
      cache.set('a', 1);
      cache.set('b', 2);
      expect(cache.size()).toBe(2);
    });
  });

  describe('createDOMManager', () => {
    test('should create a DOM manager', () => {
      const manager = createDOMManager();
      expect(manager).toBeDefined();
    });

    test('should add event listeners to elements', () => {
      const manager = createDOMManager();
      const element = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      };
      const handler = () => {};
      manager.addEventListener(element, 'click', handler);
      expect(element.addEventListener).toHaveBeenCalledWith('click', handler);
    });

    test('should track event listeners', () => {
      const manager = createDOMManager();
      const element = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      };
      const handler = () => {};
      manager.addEventListener(element, 'click', handler);
      expect(manager.getListenerCount(element)).toBe(1);
    });

    test('should remove all listeners when element is removed', () => {
      const manager = createDOMManager();
      const element = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      };
      const handler = () => {};
      manager.addEventListener(element, 'click', handler);
      manager.removeElement(element);
      expect(element.removeEventListener).toHaveBeenCalledWith(
        'click',
        handler
      );
      expect(manager.getListenerCount(element)).toBe(0);
    });
  });

  describe('hasCircularReference', () => {
    test('should return false for simple objects', () => {
      expect(hasCircularReference({ a: 1, b: 2 })).toBe(false);
    });

    test('should return false for nested objects without cycles', () => {
      expect(hasCircularReference({ a: { b: { c: 1 } } })).toBe(false);
    });

    test('should detect direct circular reference', () => {
      const obj = { a: 1 };
      obj.self = obj;
      expect(hasCircularReference(obj)).toBe(true);
    });

    test('should detect indirect circular reference', () => {
      const obj = { a: { b: {} } };
      obj.a.b.ref = obj;
      expect(hasCircularReference(obj)).toBe(true);
    });

    test('should handle arrays', () => {
      const arr = [1, 2, 3];
      arr.push(arr);
      expect(hasCircularReference(arr)).toBe(true);
    });
  });
});

describe('Performance Measurement', () => {
  describe('measureExecutionTime', () => {
    test('should measure execution time of a function', () => {
      const result = measureExecutionTime(() => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) sum += i;
        return sum;
      });
      expect(result.value).toBe(499500);
      expect(result.time).toBeGreaterThanOrEqual(0);
      expect(typeof result.time).toBe('number');
    });

    test('should return the function result', () => {
      const result = measureExecutionTime(() => 'hello');
      expect(result.value).toBe('hello');
    });

    test('should measure async functions', async () => {
      const result = await measureExecutionTime(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return 'done';
      });
      expect(result.value).toBe('done');
      expect(result.time).toBeGreaterThanOrEqual(10);
    });
  });

  describe('createProfiler', () => {
    test('should create a profiler', () => {
      const profiler = createProfiler();
      expect(profiler).toBeDefined();
    });

    test('should wrap functions and track calls', () => {
      const profiler = createProfiler();
      const fn = profiler.wrap('double', (x) => x * 2);
      expect(fn(5)).toBe(10);
      const stats = profiler.getStats('double');
      expect(stats.calls).toBe(1);
    });

    test('should track multiple calls', () => {
      const profiler = createProfiler();
      const fn = profiler.wrap('double', (x) => x * 2);
      fn(5);
      fn(10);
      fn(15);
      const stats = profiler.getStats('double');
      expect(stats.calls).toBe(3);
    });

    test('should track total and average time', () => {
      const profiler = createProfiler();
      const fn = profiler.wrap('slow', (x) => {
        const start = Date.now();
        while (Date.now() - start < 5) {} // busy wait
        return x;
      });
      fn(1);
      fn(2);
      const stats = profiler.getStats('slow');
      expect(stats.totalTime).toBeGreaterThan(0);
      expect(stats.avgTime).toBeGreaterThan(0);
      expect(stats.avgTime).toBe(stats.totalTime / stats.calls);
    });

    test('should track multiple functions', () => {
      const profiler = createProfiler();
      const fn1 = profiler.wrap('fn1', (x) => x * 2);
      const fn2 = profiler.wrap('fn2', (x) => x * 3);
      fn1(5);
      fn2(5);
      expect(profiler.getStats('fn1').calls).toBe(1);
      expect(profiler.getStats('fn2').calls).toBe(1);
    });
  });

  describe('measureMemoryUsage', () => {
    test('should measure memory usage of a function', () => {
      const result = measureMemoryUsage(() => {
        return new Array(1000).fill(0);
      });
      expect(result.value).toHaveLength(1000);
      expect(typeof result.memoryDelta).toBe('number');
    });

    test('should return the function result', () => {
      const result = measureMemoryUsage(() => ({ data: 'test' }));
      expect(result.value).toEqual({ data: 'test' });
    });
  });
});

describe('Performance Optimization', () => {
  describe('memoize', () => {
    test('should cache function results', () => {
      let callCount = 0;
      const fn = memoize((x) => {
        callCount++;
        return x * 2;
      });
      expect(fn(5)).toBe(10);
      expect(fn(5)).toBe(10);
      expect(callCount).toBe(1);
    });

    test('should work with multiple arguments', () => {
      let callCount = 0;
      const fn = memoize((x, y) => {
        callCount++;
        return x + y;
      });
      expect(fn(2, 3)).toBe(5);
      expect(fn(2, 3)).toBe(5);
      expect(callCount).toBe(1);
      expect(fn(2, 4)).toBe(6);
      expect(callCount).toBe(2);
    });

    test('should expose cache', () => {
      const fn = memoize((x) => x * 2);
      fn(5);
      fn(10);
      expect(fn.cache.size).toBeGreaterThan(0);
    });

    test('should work with recursive functions', () => {
      const fibonacci = memoize(function (n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      });
      expect(fibonacci(10)).toBe(55);
      expect(fibonacci.cache.size).toBeGreaterThan(0);
    });
  });

  describe('debounce', () => {
    test('should delay execution', async () => {
      let count = 0;
      const debounced = debounce(() => count++, 50);
      debounced();
      expect(count).toBe(0);
      await new Promise((resolve) => setTimeout(resolve, 60));
      expect(count).toBe(1);
    });

    test('should only execute once for multiple calls', async () => {
      let count = 0;
      const debounced = debounce(() => count++, 50);
      debounced();
      debounced();
      debounced();
      await new Promise((resolve) => setTimeout(resolve, 60));
      expect(count).toBe(1);
    });

    test('should use latest arguments', async () => {
      let value;
      const debounced = debounce((x) => {
        value = x;
      }, 50);
      debounced(1);
      debounced(2);
      debounced(3);
      await new Promise((resolve) => setTimeout(resolve, 60));
      expect(value).toBe(3);
    });
  });

  describe('throttle', () => {
    test('should execute immediately on first call', () => {
      let count = 0;
      const throttled = throttle(() => count++, 50);
      throttled();
      expect(count).toBe(1);
    });

    test('should ignore calls within delay period', () => {
      let count = 0;
      const throttled = throttle(() => count++, 50);
      throttled();
      throttled();
      throttled();
      expect(count).toBe(1);
    });

    test('should allow execution after delay', async () => {
      let count = 0;
      const throttled = throttle(() => count++, 50);
      throttled();
      expect(count).toBe(1);
      await new Promise((resolve) => setTimeout(resolve, 60));
      throttled();
      expect(count).toBe(2);
    });
  });

  describe('createBatchProcessor', () => {
    test('should batch operations', () => {
      const batcher = createBatchProcessor((items) => {
        return items.map((x) => x * 2);
      }, 3);
      batcher.add(1);
      batcher.add(2);
      batcher.add(3);
      const result = batcher.flush();
      expect(result).toEqual([2, 4, 6]);
    });

    test('should auto-flush when batch size is reached', () => {
      let processed = [];
      const batcher = createBatchProcessor((items) => {
        processed = items.map((x) => x * 2);
        return processed;
      }, 2);
      batcher.add(1);
      expect(processed).toEqual([]);
      batcher.add(2);
      expect(processed).toEqual([2, 4]);
    });

    test('should clear batch after flush', () => {
      const batcher = createBatchProcessor((items) => {
        return items.map((x) => x * 2);
      }, 3);
      batcher.add(1);
      batcher.flush();
      const result = batcher.flush();
      expect(result).toEqual([]);
    });
  });

  describe('createLazyValue', () => {
    test('should not evaluate immediately', () => {
      let evaluated = false;
      const lazy = createLazyValue(() => {
        evaluated = true;
        return 42;
      });
      expect(evaluated).toBe(false);
    });

    test('should evaluate on first access', () => {
      const lazy = createLazyValue(() => 42);
      expect(lazy.getValue()).toBe(42);
      expect(lazy.isEvaluated()).toBe(true);
    });

    test('should only evaluate once', () => {
      let callCount = 0;
      const lazy = createLazyValue(() => {
        callCount++;
        return 42;
      });
      lazy.getValue();
      lazy.getValue();
      lazy.getValue();
      expect(callCount).toBe(1);
    });
  });
});

describe('Memory Optimization', () => {
  describe('createObjectPool', () => {
    test('should create object pool', () => {
      const pool = createObjectPool(() => ({ x: 0, y: 0 }), 5);
      expect(pool).toBeDefined();
    });

    test('should acquire objects from pool', () => {
      const pool = createObjectPool(() => ({ x: 0, y: 0 }), 5);
      const obj = pool.acquire();
      expect(obj).toEqual({ x: 0, y: 0 });
    });

    test('should reuse released objects', () => {
      const pool = createObjectPool(() => ({ x: 0, y: 0 }), 5);
      const obj1 = pool.acquire();
      obj1.x = 10;
      pool.release(obj1);
      const obj2 = pool.acquire();
      expect(obj2.x).toBe(0); // should be reset
      expect(obj2).toBe(obj1); // same instance
    });

    test('should create new objects when pool is empty', () => {
      const pool = createObjectPool(() => ({ x: 0, y: 0 }), 2);
      const obj1 = pool.acquire();
      const obj2 = pool.acquire();
      const obj3 = pool.acquire();
      expect(obj3).not.toBe(obj1);
      expect(obj3).not.toBe(obj2);
    });

    test('should respect max size when releasing', () => {
      const pool = createObjectPool(() => ({ x: 0, y: 0 }), 2);
      const obj1 = pool.acquire();
      const obj2 = pool.acquire();
      const obj3 = pool.acquire();
      pool.release(obj1);
      pool.release(obj2);
      pool.release(obj3);
      expect(pool.size()).toBe(2);
    });
  });

  describe('createWeakCache', () => {
    test('should create weak cache', () => {
      const cache = createWeakCache();
      expect(cache).toBeDefined();
    });

    test('should store and retrieve values with object keys', () => {
      const cache = createWeakCache();
      const key = { id: 1 };
      cache.set(key, { data: 'value' });
      expect(cache.get(key)).toEqual({ data: 'value' });
    });

    test('should return undefined for non-existent keys', () => {
      const cache = createWeakCache();
      const key = { id: 1 };
      expect(cache.get(key)).toBeUndefined();
    });

    test('should check if key exists', () => {
      const cache = createWeakCache();
      const key = { id: 1 };
      cache.set(key, { data: 'value' });
      expect(cache.has(key)).toBe(true);
      expect(cache.has({ id: 2 })).toBe(false);
    });
  });

  describe('processInChunks', () => {
    test('should process array in chunks', async () => {
      const result = await processInChunks([1, 2, 3, 4, 5, 6], 2, (chunk) =>
        chunk.map((x) => x * 2)
      );
      expect(result).toEqual([2, 4, 6, 8, 10, 12]);
    });

    test('should handle uneven chunks', async () => {
      const result = await processInChunks([1, 2, 3, 4, 5], 2, (chunk) =>
        chunk.map((x) => x * 2)
      );
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    test('should process asynchronously', async () => {
      let processedChunks = [];
      await processInChunks([1, 2, 3, 4], 2, (chunk) => {
        processedChunks.push(chunk);
        return chunk;
      });
      expect(processedChunks).toHaveLength(2);
    });
  });

  describe('createStringInterner', () => {
    test('should create string interner', () => {
      const interner = createStringInterner();
      expect(interner).toBeDefined();
    });

    test('should return same reference for identical strings', () => {
      const interner = createStringInterner();
      const str1 = interner.intern('hello');
      const str2 = interner.intern('hello');
      expect(str1).toBe(str2);
    });

    test('should return different references for different strings', () => {
      const interner = createStringInterner();
      const str1 = interner.intern('hello');
      const str2 = interner.intern('world');
      expect(str1).not.toBe(str2);
    });

    test('should report pool size', () => {
      const interner = createStringInterner();
      interner.intern('hello');
      interner.intern('world');
      interner.intern('hello');
      expect(interner.getPoolSize()).toBe(2);
    });
  });
});

describe('Garbage Collection Awareness', () => {
  describe('createManagedResource', () => {
    test('should acquire and use resource', () => {
      let acquired = false;
      let released = false;
      const resource = createManagedResource(
        () => {
          acquired = true;
          return { id: 1 };
        },
        () => {
          released = true;
        }
      );
      const result = resource.use((res) => res.id);
      expect(acquired).toBe(true);
      expect(result).toBe(1);
    });

    test('should release resource after use', () => {
      let released = false;
      const resource = createManagedResource(
        () => ({ id: 1 }),
        () => {
          released = true;
        }
      );
      resource.use(() => {});
      expect(released).toBe(true);
    });

    test('should release resource even if error occurs', () => {
      let released = false;
      const resource = createManagedResource(
        () => ({ id: 1 }),
        () => {
          released = true;
        }
      );
      expect(() => {
        resource.use(() => {
          throw new Error('test');
        });
      }).toThrow();
      expect(released).toBe(true);
    });
  });

  describe('createFinalizableObject', () => {
    test('should create finalizable object', () => {
      const obj = createFinalizableObject({ data: 'test' }, () => {});
      expect(obj).toBeDefined();
      expect(obj.getValue()).toEqual({ data: 'test' });
    });

    test('should allow manual cleanup', () => {
      let cleaned = false;
      const obj = createFinalizableObject({ data: 'test' }, () => {
        cleaned = true;
      });
      obj.cleanup();
      expect(cleaned).toBe(true);
    });
  });

  describe('breakCircularReferences', () => {
    test('should not modify objects without circular references', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cleaned = breakCircularReferences(obj);
      expect(cleaned).toEqual({ a: 1, b: { c: 2 } });
    });

    test('should break direct circular reference', () => {
      const obj = { a: 1 };
      obj.self = obj;
      const cleaned = breakCircularReferences(obj);
      expect(cleaned.self).toBeUndefined();
      expect(cleaned.a).toBe(1);
    });

    test('should break nested circular reference', () => {
      const obj = { a: { b: { c: null } } };
      obj.a.b.c = obj;
      const cleaned = breakCircularReferences(obj);
      expect(cleaned.a.b.c).toBeUndefined();
    });

    test('should handle arrays with circular references', () => {
      const arr = [1, 2, { ref: null }];
      arr[2].ref = arr;
      const cleaned = breakCircularReferences(arr);
      expect(cleaned[2].ref).toBeUndefined();
    });
  });
});

describe('Performance Patterns', () => {
  describe('createRequestDeduplicator', () => {
    test('should deduplicate concurrent requests', async () => {
      let callCount = 0;
      const dedupe = createRequestDeduplicator(async (id) => {
        callCount++;
        await new Promise((resolve) => setTimeout(resolve, 10));
        return { data: id };
      });
      const [r1, r2, r3] = await Promise.all([
        dedupe.request(1),
        dedupe.request(1),
        dedupe.request(1)
      ]);
      expect(callCount).toBe(1);
      expect(r1).toEqual(r2);
      expect(r2).toEqual(r3);
    });

    test('should not deduplicate different requests', async () => {
      let callCount = 0;
      const dedupe = createRequestDeduplicator(async (id) => {
        callCount++;
        return { data: id };
      });
      await Promise.all([dedupe.request(1), dedupe.request(2)]);
      expect(callCount).toBe(2);
    });

    test('should allow new request after previous completes', async () => {
      let callCount = 0;
      const dedupe = createRequestDeduplicator(async (id) => {
        callCount++;
        return { data: id };
      });
      await dedupe.request(1);
      await dedupe.request(1);
      expect(callCount).toBe(2);
    });
  });

  describe('createVirtualList', () => {
    test('should create virtual list', () => {
      const list = createVirtualList(10000, 10, 50);
      expect(list).toBeDefined();
    });

    test('should return visible range', () => {
      const list = createVirtualList(10000, 10, 50);
      const range = list.getVisibleRange();
      expect(range.start).toBe(0);
      expect(range.end).toBe(10);
    });

    test('should update visible range on scroll', () => {
      const list = createVirtualList(10000, 10, 50);
      list.scrollTo(500);
      const range = list.getVisibleRange();
      expect(range.start).toBe(10);
      expect(range.end).toBe(20);
    });

    test('should calculate scroll height', () => {
      const list = createVirtualList(10000, 10, 50);
      expect(list.getTotalHeight()).toBe(500000);
    });
  });

  describe('binarySearch', () => {
    test('should find element in sorted array', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    test('should return -1 for non-existent element', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 6)).toBe(-1);
    });

    test('should find first element', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    test('should find last element', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    test('should work with large arrays', () => {
      const arr = Array.from({ length: 10000 }, (_, i) => i * 2);
      expect(binarySearch(arr, 5000)).toBe(2500);
    });
  });

  describe('optimizedFilter', () => {
    test('should filter array', () => {
      const result = optimizedFilter([1, 2, 3, 4, 5], (x) => x > 2);
      expect(result).toEqual([3, 4, 5]);
    });

    test('should work with empty array', () => {
      const result = optimizedFilter([], (x) => x > 0);
      expect(result).toEqual([]);
    });

    test('should work with no matches', () => {
      const result = optimizedFilter([1, 2, 3], (x) => x > 10);
      expect(result).toEqual([]);
    });

    test('should work with all matches', () => {
      const result = optimizedFilter([1, 2, 3], (x) => x > 0);
      expect(result).toEqual([1, 2, 3]);
    });
  });
});
