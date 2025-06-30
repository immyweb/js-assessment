import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createPromise,
  promiseChain,
  handleRejection,
  waitForAll,
  waitForAllSettled,
  racePromises,
  promisify,
  processSequentially,
  withTimeout,
  retryOperation,
  delay,
  fetchWithFallback,
  sumAsyncIterable,
  createCancellablePromise
} from '../exercises/async.js';

// Mock fetch for testing
global.fetch = vi.fn();

describe('Async Exercises', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createPromise', () => {
    it('should create a promise that resolves with value after delay', async () => {
      const promiseResult = createPromise('hello', 1000);

      expect(promiseResult).toBeInstanceOf(Promise);

      // Should not resolve immediately
      let resolved = false;
      promiseResult.then(() => {
        resolved = true;
      });
      expect(resolved).toBe(false);

      vi.advanceTimersByTime(1000);
      const result = await promiseResult;

      expect(result).toBe('hello');
    });

    it('should handle different values and delays', async () => {
      const promiseResult = createPromise(42, 500);

      expect(promiseResult).toBeInstanceOf(Promise);

      vi.advanceTimersByTime(500);
      const result = await promiseResult;

      expect(result).toBe(42);
    });
  });

  describe('promiseChain', () => {
    it('should create a chainable promise', async () => {
      const chainablePromise = promiseChain(5);

      expect(chainablePromise).toBeInstanceOf(Promise);
      expect(typeof chainablePromise.then).toBe('function');

      const result = await chainablePromise
        .then((x) => x * 2)
        .then((x) => x + 1)
        .then((x) => x * 3);

      expect(result).toBe(33); // ((5 * 2) + 1) * 3
    });

    it('should start with the initial value', async () => {
      const chainablePromise = promiseChain(10);
      expect(chainablePromise).toBeInstanceOf(Promise);

      const result = await chainablePromise.then((x) => x - 5);

      expect(result).toBe(5);
    });
  });

  describe('handleRejection', () => {
    it('should return promise value when it resolves', async () => {
      const successPromise = Promise.resolve('success');
      const handledPromise = handleRejection(successPromise, 'default');

      expect(handledPromise).toBeInstanceOf(Promise);
      const result = await handledPromise;

      expect(result).toBe('success');
    });

    it('should return default value when promise rejects', async () => {
      const rejectPromise = Promise.reject(new Error('failed'));
      const handledPromise = handleRejection(rejectPromise, 'default');

      expect(handledPromise).toBeInstanceOf(Promise);
      const result = await handledPromise;

      expect(result).toBe('default');
    });
  });

  describe('waitForAll', () => {
    it('should wait for all promises and return results in order', async () => {
      const promises = [
        Promise.resolve('first'),
        Promise.resolve('second'),
        Promise.resolve('third')
      ];

      const result = await waitForAll(promises);

      expect(result).toEqual(['first', 'second', 'third']);
    });

    it('should handle empty array', async () => {
      const result = await waitForAll([]);
      expect(result).toEqual([]);
    });

    it('should reject if any promise rejects', async () => {
      const promises = [
        Promise.resolve('success'),
        Promise.reject(new Error('failed'))
      ];

      await expect(waitForAll(promises)).rejects.toThrow('failed');
    });
  });

  describe('waitForAllSettled', () => {
    it('should categorize fulfilled and rejected promises', async () => {
      const promises = [
        Promise.resolve('success1'),
        Promise.reject(new Error('error1')),
        Promise.resolve('success2'),
        Promise.reject(new Error('error2'))
      ];

      const result = await waitForAllSettled(promises);

      expect(result.fulfilled).toEqual(['success1', 'success2']);
      expect(result.rejected).toHaveLength(2);
      expect(result.rejected[0]).toBeInstanceOf(Error);
      expect(result.rejected[1]).toBeInstanceOf(Error);
    });

    it('should handle all fulfilled promises', async () => {
      const promises = [Promise.resolve('a'), Promise.resolve('b')];
      const result = await waitForAllSettled(promises);

      expect(result.fulfilled).toEqual(['a', 'b']);
      expect(result.rejected).toEqual([]);
    });

    it('should handle all rejected promises', async () => {
      const promises = [
        Promise.reject(new Error('error1')),
        Promise.reject(new Error('error2'))
      ];

      const result = await waitForAllSettled(promises);

      expect(result.fulfilled).toEqual([]);
      expect(result.rejected).toHaveLength(2);
    });
  });

  describe('racePromises', () => {
    it('should return the first resolved promise', async () => {
      const slowPromise = new Promise((resolve) =>
        setTimeout(() => resolve('slow'), 1000)
      );
      const fastPromise = new Promise((resolve) =>
        setTimeout(() => resolve('fast'), 100)
      );

      const resultPromise = racePromises([slowPromise, fastPromise]);
      vi.advanceTimersByTime(100);
      const result = await resultPromise;

      expect(result).toBe('fast');
    });
  });

  describe('promisify', () => {
    it('should convert callback function to promise', async () => {
      const callbackFn = (x, callback) => {
        setTimeout(() => callback(null, x * 2), 100);
      };

      const promisifiedFn = promisify(callbackFn);
      const resultPromise = promisifiedFn(5);

      vi.advanceTimersByTime(100);
      const result = await resultPromise;

      expect(result).toBe(10);
    });

    it('should reject when callback has error', async () => {
      const callbackFn = (x, callback) => {
        setTimeout(() => callback(new Error('Test error')), 100);
      };

      const promisifiedFn = promisify(callbackFn);
      const resultPromise = promisifiedFn(5);

      vi.advanceTimersByTime(100);

      await expect(resultPromise).rejects.toThrow('Test error');
    });
  });

  describe('processSequentially', () => {
    it('should process items one after another', async () => {
      const items = [1, 2, 3];
      const results = [];

      const processingPromise = processSequentially(items, async (num) => {
        results.push(num);
        // Remove the setTimeout to avoid timer issues
        await Promise.resolve();
      });

      expect(processingPromise).toBeInstanceOf(Promise);

      await processingPromise;

      expect(results).toEqual([1, 2, 3]);
    });

    it('should handle empty array', async () => {
      const callback = vi.fn();

      // Track that the function actually processes the array
      let processingStarted = false;
      const trackingCallback = vi.fn(async (...args) => {
        processingStarted = true;
        return callback(...args);
      });

      const result = await processSequentially([], trackingCallback);

      expect(callback).not.toHaveBeenCalled();
      expect(trackingCallback).not.toHaveBeenCalled();

      // The function should complete and return undefined
      expect(result).toBeUndefined();

      // But it should have actually processed the empty array (not just returned immediately)
      // This can be verified by checking that a non-empty array would work
      const testCallback = vi.fn();
      await processSequentially([1], testCallback);
      expect(testCallback).toHaveBeenCalledWith(1);
    });
  });

  describe('withTimeout', () => {
    it('should resolve when promise completes before timeout', async () => {
      const fastPromise = new Promise((resolve) =>
        setTimeout(() => resolve('success'), 100)
      );

      const resultPromise = withTimeout(fastPromise, 1000);
      vi.advanceTimersByTime(100);
      const result = await resultPromise;

      expect(result).toBe('success');
    });

    it('should reject with timeout error when promise is too slow', async () => {
      const slowPromise = new Promise((resolve) =>
        setTimeout(() => resolve('success'), 2000)
      );

      const resultPromise = withTimeout(slowPromise, 1000);
      vi.advanceTimersByTime(1000);

      await expect(resultPromise).rejects.toThrow('Timeout');
    });
  });

  describe('retryOperation', () => {
    beforeEach(() => {
      vi.useRealTimers();
    });

    afterEach(() => {
      vi.useFakeTimers();
    });

    it('should return result on first success', async () => {
      const successFn = vi.fn().mockResolvedValue('success');

      const result = await retryOperation(successFn, 3);

      expect(result).toBe('success');
      expect(successFn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      const unstableFn = vi
        .fn()
        .mockRejectedValueOnce(new Error('Attempt 1'))
        .mockRejectedValueOnce(new Error('Attempt 2'))
        .mockResolvedValue('success');

      const result = await retryOperation(unstableFn, 3);

      expect(result).toBe('success');
      expect(unstableFn).toHaveBeenCalledTimes(3);
    });

    it('should throw last error after max retries', async () => {
      const failingFn = vi.fn().mockRejectedValue(new Error('Always fails'));

      await expect(retryOperation(failingFn, 2)).rejects.toThrow(
        'Always fails'
      );
      expect(failingFn).toHaveBeenCalledTimes(3); // initial + 2 retries
    });
  });

  describe('delay', () => {
    it('should create a delay that resolves after specified time', async () => {
      const delayPromise = delay(1000);

      expect(delayPromise).toBeInstanceOf(Promise);

      // Should not resolve immediately
      let resolved = false;
      delayPromise.then(() => {
        resolved = true;
      });
      expect(resolved).toBe(false);

      vi.advanceTimersByTime(1000);
      await delayPromise;

      expect(vi.getTimerCount()).toBe(0);
    });

    it('should resolve with undefined', async () => {
      const delayPromise = delay(500);
      expect(delayPromise).toBeInstanceOf(Promise);

      vi.advanceTimersByTime(500);
      const result = await delayPromise;

      expect(result).toBeUndefined();
    });
  });

  describe('fetchWithFallback', () => {
    it('should return parsed JSON when fetch succeeds', async () => {
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockData)
      };

      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchWithFallback('/api/data', 'fallback');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('/api/data');
    });

    it('should return fallback data when fetch fails', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      const result = await fetchWithFallback('/api/data', 'fallback data');

      expect(result).toBe('fallback data');
    });

    it('should return fallback data when HTTP error occurs', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: vi.fn().mockRejectedValue(new Error('Not found'))
      };

      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchWithFallback('/api/data', 'fallback data');

      expect(result).toBe('fallback data');
    });
  });

  describe('sumAsyncIterable', () => {
    it('should sum values from async iterable', async () => {
      async function* numbers() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
      }

      const sumPromise = sumAsyncIterable(numbers());
      expect(sumPromise).toBeInstanceOf(Promise);

      const result = await sumPromise;

      expect(result).toBe(10);
      expect(typeof result).toBe('number');
    });

    it('should handle empty async iterable', async () => {
      async function* empty() {
        // yields nothing
      }

      const sumPromise = sumAsyncIterable(empty());
      expect(sumPromise).toBeInstanceOf(Promise);

      const result = await sumPromise;

      expect(result).toBe(0);
      expect(typeof result).toBe('number');
    });
  });

  describe('createCancellablePromise', () => {
    it('should resolve normally when not aborted', async () => {
      const controller = new AbortController();
      const promise = createCancellablePromise(100, controller.signal);

      expect(promise).toBeInstanceOf(Promise);

      vi.advanceTimersByTime(100);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should reject when aborted before completion', async () => {
      const controller = new AbortController();
      const promise = createCancellablePromise(1000, controller.signal);

      expect(promise).toBeInstanceOf(Promise);

      // Abort after 500ms
      vi.advanceTimersByTime(500);
      controller.abort();

      await expect(promise).rejects.toThrow('Operation aborted');
    });

    it('should reject immediately if already aborted', async () => {
      const controller = new AbortController();
      controller.abort();

      const promise = createCancellablePromise(1000, controller.signal);
      expect(promise).toBeInstanceOf(Promise);

      await expect(promise).rejects.toThrow('Operation aborted');
    });
  });
});
