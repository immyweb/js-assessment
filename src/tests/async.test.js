import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  delay,
  promisify,
  fetchWithFallback,
  waitForAll,
  raceToFinish,
  processSequentially,
  withTimeout,
  retryOperation,
  isPromise,
  toPromise,
  createAsyncCounter,
  waitUntil,
  loadResources,
  chainAsync
} from '../exercises/async.js';

// Mock fetch for testing
global.fetch = vi.fn();

describe('async functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('delay', () => {
    it('should delay execution for specified milliseconds', async () => {
      const start = Date.now();
      const delayPromise = delay(1000);

      // Fast-forward time
      vi.advanceTimersByTime(1000);
      await delayPromise;

      expect(vi.getTimerCount()).toBe(0);
    });

    it('should resolve with undefined', async () => {
      const delayPromise = delay(500);
      vi.advanceTimersByTime(500);
      const result = await delayPromise;

      expect(result).toBeUndefined();
    });
  });

  describe('promisify', () => {
    it('should convert callback function to promise-based function', async () => {
      const callbackFn = (arg, callback) => {
        setTimeout(() => callback(null, `result: ${arg}`), 100);
      };

      const promisifiedFn = promisify(callbackFn);
      const resultPromise = promisifiedFn('test');

      vi.advanceTimersByTime(100);
      const result = await resultPromise;

      expect(result).toBe('result: test');
    });

    it('should reject promise when callback has error', async () => {
      const callbackFn = (arg, callback) => {
        setTimeout(() => callback(new Error('Test error')), 100);
      };

      const promisifiedFn = promisify(callbackFn);
      const resultPromise = promisifiedFn('test');

      vi.advanceTimersByTime(100);

      await expect(resultPromise).rejects.toThrow('Test error');
    });
  });

  describe('fetchWithFallback', () => {
    it('should return parsed JSON when fetch succeeds', async () => {
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = {
        json: vi.fn().mockResolvedValue(mockData)
      };

      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchWithFallback(
        'https://api.test.com',
        'fallback'
      );

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://api.test.com');
    });

    it('should return fallback data when fetch fails', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      const result = await fetchWithFallback(
        'https://api.test.com',
        'fallback data'
      );

      expect(result).toBe('fallback data');
    });
  });

  describe('waitForAll', () => {
    it('should wait for all promises to complete and return results in order', async () => {
      const promise1 = Promise.resolve('result1');
      const promise2 = Promise.resolve('result2');
      const promise3 = Promise.resolve('result3');

      const result = await waitForAll([promise1, promise2, promise3]);

      expect(result).toEqual(['result1', 'result2', 'result3']);
    });

    it('should handle empty array', async () => {
      const result = await waitForAll([]);
      expect(result).toEqual([]);
    });

    it('should reject if any promise rejects', async () => {
      const promise1 = Promise.resolve('result1');
      const promise2 = Promise.reject(new Error('Error'));
      const promise3 = Promise.resolve('result3');

      await expect(waitForAll([promise1, promise2, promise3])).rejects.toThrow(
        'Error'
      );
    });
  });

  describe('raceToFinish', () => {
    it('should return the first resolved promise', async () => {
      const slowPromise = new Promise((resolve) =>
        setTimeout(() => resolve('slow'), 1000)
      );
      const fastPromise = new Promise((resolve) =>
        setTimeout(() => resolve('fast'), 100)
      );

      const resultPromise = raceToFinish([slowPromise, fastPromise]);
      vi.advanceTimersByTime(100);
      const result = await resultPromise;

      expect(result).toBe('fast');
    });
  });

  describe('processSequentially', () => {
    it('should process items one at a time and return results', async () => {
      const items = [1, 2, 3];
      const asyncCallback = vi.fn(async (num) => {
        return num * 2;
      });

      const result = await processSequentially(items, asyncCallback);

      expect(result).toEqual([2, 4, 6]);
      expect(asyncCallback).toHaveBeenCalledTimes(3);
    });

    it('should handle empty array', async () => {
      const asyncCallback = vi.fn();
      const result = await processSequentially([], asyncCallback);

      expect(result).toEqual([]);
      expect(asyncCallback).not.toHaveBeenCalled();
    });
  });

  describe('withTimeout', () => {
    it('should resolve with promise result if it completes before timeout', async () => {
      const fastPromise = new Promise((resolve) =>
        setTimeout(() => resolve('success'), 100)
      );

      const resultPromise = withTimeout(fastPromise, 1000);
      vi.advanceTimersByTime(100);
      const result = await resultPromise;

      expect(result).toBe('success');
    });

    it('should reject with timeout error if promise takes too long', async () => {
      const slowPromise = new Promise((resolve) =>
        setTimeout(() => resolve('success'), 2000)
      );

      const resultPromise = withTimeout(slowPromise, 1000);
      vi.advanceTimersByTime(1000);

      await expect(resultPromise).rejects.toThrow('Operation timed out');
    });
  });

  describe('retryOperation', () => {
    beforeEach(() => {
      vi.useRealTimers(); // Use real timers for retry tests
    });

    afterEach(() => {
      vi.useFakeTimers(); // Go back to fake timers
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
        .mockRejectedValueOnce(new Error('Attempt 1 failed'))
        .mockRejectedValueOnce(new Error('Attempt 2 failed'))
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

  describe('isPromise', () => {
    it('should return true for promises', () => {
      expect(isPromise(Promise.resolve(42))).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    it('should return true for thenable objects', () => {
      const thenable = { then: () => {} };
      expect(isPromise(thenable)).toBe(true);
    });

    it('should return false for non-promises', () => {
      expect(isPromise(42)).toBe(false);
      expect(isPromise('string')).toBe(false);
      expect(isPromise({})).toBe(false);
      expect(isPromise(null)).toBe(false);
      expect(isPromise(undefined)).toBe(false);
    });
  });

  describe('toPromise', () => {
    it('should return the same promise if value is already a promise', async () => {
      const originalPromise = Promise.resolve(42);
      const result = toPromise(originalPromise);

      expect(result).toBe(originalPromise);
      expect(await result).toBe(42);
    });

    it('should wrap non-promise values in Promise.resolve', async () => {
      const result = toPromise(42);

      expect(isPromise(result)).toBe(true);
      expect(await result).toBe(42);
    });
  });

  describe('createAsyncCounter', () => {
    it('should start with default value 0', async () => {
      const counter = createAsyncCounter();

      const valuePromise = counter.getValue();
      const value = await valuePromise;

      expect(value).toBe(0);
    });

    it('should start with provided initial value', async () => {
      const counter = createAsyncCounter(10);

      const value = await counter.getValue();

      expect(value).toBe(10);
    });

    it('should increment and return new value', async () => {
      const counter = createAsyncCounter(5);

      const incrementPromise = counter.increment();
      vi.advanceTimersByTime(100);
      const result = await incrementPromise;

      expect(result).toBe(6);
    });

    it('should decrement and return new value', async () => {
      const counter = createAsyncCounter(5);

      const decrementPromise = counter.decrement();
      vi.advanceTimersByTime(100);
      const result = await decrementPromise;

      expect(result).toBe(4);
    });
  });

  describe('waitUntil', () => {
    beforeEach(() => {
      vi.useRealTimers(); // Use real timers for waitUntil tests
    });

    afterEach(() => {
      vi.useFakeTimers(); // Go back to fake timers
    });

    it('should resolve when condition becomes true', async () => {
      let condition = false;
      setTimeout(() => {
        condition = true;
      }, 250);

      await waitUntil(() => condition);

      expect(condition).toBe(true);
    });

    it('should use custom check interval', async () => {
      let checks = 0;
      const conditionFn = vi.fn(() => {
        checks++;
        return checks >= 3;
      });

      await waitUntil(conditionFn, 50);

      expect(conditionFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('loadResources', () => {
    it('should load multiple resources in parallel', async () => {
      const resourceMap = {
        user: vi.fn().mockResolvedValue({ id: 1, name: 'John' }),
        posts: vi.fn().mockResolvedValue([{ id: 1, title: 'Post 1' }])
      };

      const result = await loadResources(resourceMap);

      expect(result).toEqual({
        user: { id: 1, name: 'John' },
        posts: [{ id: 1, title: 'Post 1' }]
      });
      expect(resourceMap.user).toHaveBeenCalledTimes(1);
      expect(resourceMap.posts).toHaveBeenCalledTimes(1);
    });

    it('should handle empty resource map', async () => {
      const result = await loadResources({});
      expect(result).toEqual({});
    });
  });

  describe('chainAsync', () => {
    it('should chain async operations', async () => {
      const step1 = vi.fn(async (x) => x * 2);
      const step2 = vi.fn(async (x) => x + 10);
      const step3 = vi.fn(async (x) => `Result: ${x}`);

      const result = await chainAsync(5)
        .then(step1)
        .then(step2)
        .then(step3)
        .execute();

      expect(result).toBe('Result: 20');
      expect(step1).toHaveBeenCalledWith(5);
      expect(step2).toHaveBeenCalledWith(10);
      expect(step3).toHaveBeenCalledWith(20);
    });

    it('should handle error with catch', async () => {
      const step1 = vi.fn(async () => {
        throw new Error('Step 1 failed');
      });
      const errorHandler = vi.fn(async (error) => 'Error handled');

      const result = await chainAsync(5)
        .then(step1)
        .catch(errorHandler)
        .execute();

      expect(result).toBe('Error handled');
      expect(errorHandler).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should execute finally block', async () => {
      const finallyHandler = vi.fn();

      await chainAsync(5)
        .then(async (x) => x * 2)
        .finally(finallyHandler)
        .execute();

      expect(finallyHandler).toHaveBeenCalledTimes(1);
    });
  });
});
