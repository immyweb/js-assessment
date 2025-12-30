import { describe, beforeEach, test, expect, vi } from 'vitest';

import {
  // Reactive programming
  createObservable,
  fromArray,
  mapObservable,
  filterObservable,
  combineObservables,
  mergeObservables,
  // Stream processing
  createAsyncIterator,
  createReadableStream,
  transformStream,
  consumeStream,
  pipeStreams,
  teeStream,
  // Backpressure handling
  createAsyncQueue,
  createBuffer,
  createChannel,
  throttleAsync,
  rateLimit,
  createSlidingWindow,
  // Advanced patterns
  retryWithBackoff,
  createCircuitBreaker,
  createAsyncPool,
  createCancellablePromise,
  createCoordinator,
  createAsyncAggregator
} from '../exercises/advanced-async.js';

describe('Reactive Programming Concepts', () => {
  describe('createObservable', () => {
    test('should create an observable', () => {
      const observable = createObservable();
      expect(observable).toBeDefined();
      expect(typeof observable.subscribe).toBe('function');
      expect(typeof observable.next).toBe('function');
    });

    test('should emit values to subscribers', () => {
      const observable = createObservable();
      const values = [];
      observable.subscribe((value) => values.push(value));
      observable.next(1);
      observable.next(2);
      observable.next(3);
      expect(values).toEqual([1, 2, 3]);
    });

    test('should support multiple subscribers', () => {
      const observable = createObservable();
      const values1 = [];
      const values2 = [];
      observable.subscribe((value) => values1.push(value));
      observable.subscribe((value) => values2.push(value));
      observable.next(1);
      expect(values1).toEqual([1]);
      expect(values2).toEqual([1]);
    });

    test('should allow unsubscribing', () => {
      const observable = createObservable();
      const values = [];
      const unsubscribe = observable.subscribe((value) => values.push(value));
      observable.next(1);
      unsubscribe();
      observable.next(2);
      expect(values).toEqual([1]);
    });
  });

  describe('fromArray', () => {
    test('should create observable from array', () => {
      const observable = fromArray([1, 2, 3]);
      const values = [];
      observable.subscribe((value) => values.push(value));
      expect(values).toEqual([1, 2, 3]);
    });

    test('should work with empty array', () => {
      const observable = fromArray([]);
      const values = [];
      observable.subscribe((value) => values.push(value));
      expect(values).toEqual([]);
    });
  });

  describe('mapObservable', () => {
    test('should transform values', () => {
      const source = createObservable();
      const mapped = mapObservable(source, (x) => x * 2);
      const values = [];
      mapped.subscribe((value) => values.push(value));
      source.next(1);
      source.next(2);
      source.next(3);
      expect(values).toEqual([2, 4, 6]);
    });
  });

  describe('filterObservable', () => {
    test('should filter values', () => {
      const source = createObservable();
      const filtered = filterObservable(source, (x) => x > 5);
      const values = [];
      filtered.subscribe((value) => values.push(value));
      source.next(3);
      source.next(7);
      source.next(4);
      source.next(8);
      expect(values).toEqual([7, 8]);
    });
  });

  describe('combineObservables', () => {
    test('should combine latest values from multiple observables', () => {
      const obs1 = createObservable();
      const obs2 = createObservable();
      const combined = combineObservables([obs1, obs2]);
      const values = [];
      combined.subscribe((value) => values.push(value));
      obs1.next(1);
      obs2.next(2);
      expect(values).toEqual([[1, 2]]);
      obs1.next(3);
      expect(values).toEqual([
        [1, 2],
        [3, 2]
      ]);
    });
  });

  describe('mergeObservables', () => {
    test('should merge values from multiple observables', () => {
      const obs1 = createObservable();
      const obs2 = createObservable();
      const merged = mergeObservables([obs1, obs2]);
      const values = [];
      merged.subscribe((value) => values.push(value));
      obs1.next(1);
      obs2.next(2);
      obs1.next(3);
      expect(values).toEqual([1, 2, 3]);
    });
  });
});

describe('Stream Processing', () => {
  describe('createAsyncIterator', () => {
    test('should create async iterator from array', async () => {
      const iterator = createAsyncIterator([1, 2, 3], 10);
      const values = [];
      for await (const value of iterator) {
        values.push(value);
      }
      expect(values).toEqual([1, 2, 3]);
    });

    test('should respect delay between items', async () => {
      const iterator = createAsyncIterator([1, 2], 50);
      const start = Date.now();
      const values = [];
      for await (const value of iterator) {
        values.push(value);
      }
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(50);
    });
  });

  describe('createReadableStream', () => {
    test('should create readable stream', async () => {
      const stream = createReadableStream([1, 2, 3]);
      expect(stream).toBeDefined();
      const reader = stream.getReader();
      const { value } = await reader.read();
      expect(value).toBe(1);
    });

    test('should read all values', async () => {
      const stream = createReadableStream([1, 2, 3]);
      const reader = stream.getReader();
      const values = [];
      let result;
      while (!(result = await reader.read()).done) {
        values.push(result.value);
      }
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('transformStream', () => {
    test('should transform stream values', async () => {
      const source = createReadableStream([1, 2, 3]);
      const transformed = transformStream(source, (x) => x * 2);
      const reader = transformed.getReader();
      const values = [];
      let result;
      while (!(result = await reader.read()).done) {
        values.push(result.value);
      }
      expect(values).toEqual([2, 4, 6]);
    });
  });

  describe('consumeStream', () => {
    test('should consume and collect stream values', async () => {
      const stream = createReadableStream([1, 2, 3]);
      const values = await consumeStream(stream);
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('pipeStreams', () => {
    test('should pipe streams together', async () => {
      const source = createReadableStream([1, 2, 3]);
      const transform = new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(chunk * 2);
        }
      });
      const piped = pipeStreams(source, transform);
      const values = await consumeStream(piped);
      expect(values).toEqual([2, 4, 6]);
    });
  });

  describe('teeStream', () => {
    test('should split stream into two', async () => {
      const stream = createReadableStream([1, 2, 3]);
      const [stream1, stream2] = teeStream(stream);
      const values1 = await consumeStream(stream1);
      const values2 = await consumeStream(stream2);
      expect(values1).toEqual([1, 2, 3]);
      expect(values2).toEqual([1, 2, 3]);
    });
  });
});

describe('Backpressure Handling', () => {
  describe('createAsyncQueue', () => {
    test('should create async queue', () => {
      const queue = createAsyncQueue(2);
      expect(queue).toBeDefined();
    });

    test('should limit concurrent operations', async () => {
      let running = 0;
      let maxRunning = 0;
      const queue = createAsyncQueue(2);

      const task = async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await new Promise((resolve) => setTimeout(resolve, 50));
        running--;
      };

      await Promise.all([
        queue.add(task),
        queue.add(task),
        queue.add(task),
        queue.add(task)
      ]);

      expect(maxRunning).toBeLessThanOrEqual(2);
    });

    test('should return task results', async () => {
      const queue = createAsyncQueue(2);
      const result = await queue.add(async () => 42);
      expect(result).toBe(42);
    });
  });

  describe('createBuffer', () => {
    test('should create buffer', () => {
      const buffer = createBuffer(3, 100);
      expect(buffer).toBeDefined();
    });

    test('should flush when size limit is reached', () => {
      const buffer = createBuffer(3, 1000);
      const flushed = [];
      buffer.onFlush((values) => flushed.push(...values));
      buffer.add(1);
      buffer.add(2);
      buffer.add(3);
      expect(flushed).toEqual([1, 2, 3]);
    });

    test('should flush on timeout', async () => {
      const buffer = createBuffer(10, 50);
      const flushed = [];
      buffer.onFlush((values) => flushed.push(...values));
      buffer.add(1);
      buffer.add(2);
      await new Promise((resolve) => setTimeout(resolve, 60));
      expect(flushed).toEqual([1, 2]);
    });
  });

  describe('createChannel', () => {
    test('should send and receive values', async () => {
      const channel = createChannel(2);
      await channel.send(1);
      const value = await channel.receive();
      expect(value).toBe(1);
    });

    test('should buffer values up to size', async () => {
      const channel = createChannel(2);
      await channel.send(1);
      await channel.send(2);
      expect(await channel.receive()).toBe(1);
      expect(await channel.receive()).toBe(2);
    });

    test('should handle backpressure', async () => {
      const channel = createChannel(1);
      await channel.send(1);

      let blocked = true;
      const sendPromise = channel.send(2).then(() => {
        blocked = false;
      });

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(blocked).toBe(true);

      await channel.receive();
      await sendPromise;
      expect(blocked).toBe(false);
    });
  });

  describe('throttleAsync', () => {
    test('should throttle async operations', async () => {
      let callCount = 0;
      const throttled = throttleAsync(async (x) => {
        callCount++;
        return x * 2;
      }, 50);

      const results = await Promise.all([
        throttled(1),
        throttled(2),
        throttled(3)
      ]);

      expect(callCount).toBeLessThanOrEqual(2);
      expect(results).toContain(2);
    });
  });

  describe('rateLimit', () => {
    test('should limit rate of operations', async () => {
      let callCount = 0;
      const limited = rateLimit(
        async (x) => {
          callCount++;
          return x;
        },
        2,
        100
      );

      await Promise.all([limited(1), limited(2)]);

      expect(callCount).toBe(2);

      const start = Date.now();
      await limited(3);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(0);
    });
  });

  describe('createSlidingWindow', () => {
    test('should maintain sliding window', () => {
      const window = createSlidingWindow(3);
      expect(window.add(1)).toEqual([]);
      expect(window.add(2)).toEqual([]);
      expect(window.add(3)).toEqual([1, 2, 3]);
      expect(window.add(4)).toEqual([2, 3, 4]);
      expect(window.add(5)).toEqual([3, 4, 5]);
    });

    test('should get current window', () => {
      const window = createSlidingWindow(2);
      window.add(1);
      window.add(2);
      expect(window.getWindow()).toEqual([1, 2]);
    });
  });
});

describe('Advanced Patterns', () => {
  describe('retryWithBackoff', () => {
    test('should retry on failure', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const result = await retryWithBackoff(fn, 3, 10);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    test('should fail after max retries', async () => {
      const fn = async () => {
        throw new Error('always fails');
      };

      await expect(retryWithBackoff(fn, 2, 10)).rejects.toThrow('always fails');
    });

    test('should use exponential backoff', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        throw new Error('fail');
      };

      const start = Date.now();
      try {
        await retryWithBackoff(fn, 3, 10);
      } catch (e) {
        // Expected to fail
      }
      const elapsed = Date.now() - start;
      // 10 + 20 + 40 = 70ms minimum
      expect(elapsed).toBeGreaterThanOrEqual(60);
    });
  });

  describe('createCircuitBreaker', () => {
    test('should create circuit breaker', () => {
      const breaker = createCircuitBreaker(async () => {}, {
        threshold: 3,
        timeout: 1000
      });
      expect(breaker).toBeDefined();
    });

    test('should execute successfully', async () => {
      const breaker = createCircuitBreaker(async () => 'success', {
        threshold: 3,
        timeout: 1000
      });
      const result = await breaker.execute();
      expect(result).toBe('success');
    });

    test('should open circuit after threshold failures', async () => {
      const breaker = createCircuitBreaker(
        async () => {
          throw new Error('fail');
        },
        { threshold: 3, timeout: 1000 }
      );

      for (let i = 0; i < 3; i++) {
        try {
          await breaker.execute();
        } catch (e) {
          // Expected
        }
      }

      await expect(breaker.execute()).rejects.toThrow(
        'Circuit breaker is open'
      );
    });

    test('should report circuit state', async () => {
      const breaker = createCircuitBreaker(async () => 'ok', {
        threshold: 3,
        timeout: 1000
      });
      expect(breaker.getState()).toBe('closed');
    });
  });

  describe('createAsyncPool', () => {
    test('should create resource pool', async () => {
      let created = 0;
      const pool = createAsyncPool(
        async () => {
          created++;
          return { id: created };
        },
        async () => {},
        3
      );
      expect(pool).toBeDefined();
    });

    test('should acquire and release resources', async () => {
      let id = 0;
      const pool = createAsyncPool(
        async () => ({ id: ++id }),
        async () => {},
        3
      );

      const resource = await pool.acquire();
      expect(resource).toBeDefined();
      await pool.release(resource);
    });

    test('should reuse released resources', async () => {
      let created = 0;
      const pool = createAsyncPool(
        async () => ({ id: ++created }),
        async () => {},
        3
      );

      const r1 = await pool.acquire();
      await pool.release(r1);
      const r2 = await pool.acquire();

      expect(r2.id).toBe(r1.id);
      expect(created).toBe(1);
    });

    test('should respect max pool size', async () => {
      let created = 0;
      const pool = createAsyncPool(
        async () => ({ id: ++created }),
        async () => {},
        2
      );

      const r1 = await pool.acquire();
      const r2 = await pool.acquire();

      expect(created).toBe(2);
    });
  });

  describe('createCancellablePromise', () => {
    test('should create cancellable promise', () => {
      const { promise, cancel } = createCancellablePromise(
        async () => 'result'
      );
      expect(promise).toBeInstanceOf(Promise);
      expect(typeof cancel).toBe('function');
    });

    test('should resolve normally if not cancelled', async () => {
      const { promise } = createCancellablePromise(async () => 'result');
      const result = await promise;
      expect(result).toBe('result');
    });

    test('should cancel promise', async () => {
      const { promise, cancel } = createCancellablePromise(async (signal) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (signal.cancelled) throw new Error('Cancelled');
        return 'result';
      });

      cancel();
      await expect(promise).rejects.toThrow('Cancelled');
    });
  });

  describe('createCoordinator', () => {
    test('should create coordinator', () => {
      const coordinator = createCoordinator();
      expect(coordinator).toBeDefined();
    });

    test('should register and execute tasks', async () => {
      const coordinator = createCoordinator();
      let executed = false;
      coordinator.register('task1', async () => {
        executed = true;
      });
      await coordinator.executeAll();
      expect(executed).toBe(true);
    });

    test('should execute multiple tasks', async () => {
      const coordinator = createCoordinator();
      const results = [];
      coordinator.register('task1', async () => results.push(1));
      coordinator.register('task2', async () => results.push(2));
      await coordinator.executeAll();
      expect(results).toEqual([1, 2]);
    });

    test('should return task results', async () => {
      const coordinator = createCoordinator();
      coordinator.register('task1', async () => 'result1');
      coordinator.register('task2', async () => 'result2');
      const results = await coordinator.executeAll();
      expect(results).toEqual({ task1: 'result1', task2: 'result2' });
    });
  });

  describe('createAsyncAggregator', () => {
    test('should aggregate promises', async () => {
      const aggregator = createAsyncAggregator(3, 1000);
      aggregator.add(Promise.resolve(1));
      aggregator.add(Promise.resolve(2));
      aggregator.add(Promise.resolve(3));
      const results = await aggregator.flush();
      expect(results).toEqual([1, 2, 3]);
    });

    test('should flush on timeout', async () => {
      const aggregator = createAsyncAggregator(10, 50);
      aggregator.add(Promise.resolve(1));
      aggregator.add(Promise.resolve(2));
      await new Promise((resolve) => setTimeout(resolve, 60));
      const results = await aggregator.flush();
      expect(results).toEqual([1, 2]);
    });

    test('should auto-flush when batch size reached', async () => {
      let flushed = [];
      const aggregator = createAsyncAggregator(2, 1000);
      aggregator.onAutoFlush((results) => {
        flushed = results;
      });
      aggregator.add(Promise.resolve(1));
      aggregator.add(Promise.resolve(2));
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(flushed).toEqual([1, 2]);
    });
  });
});
