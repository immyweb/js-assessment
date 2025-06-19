import { describe, test, expect, vi } from 'vitest';

import {
  // Basic Error Handling
  safeJsonParse,
  safeDivide,
  tryExecute,
  accessProperty,
  // Custom Error Types
  ValidationError,
  NetworkError,
  validateUser,
  simulateApiCall,
  // Async Error Handling
  safeAsyncExecute,
  handlePromiseRejection,
  executeSequentially,
  retryOperation,
  // Error Recovery Patterns
  createCircuitBreaker,
  gracefulDegrade,
  exponentialBackoff,
  collectResults,
  // Debugging and Validation
  createDebugWrapper,
  createTypeValidator,
  createPerformanceMonitor,
  assert,
  AssertionError,
  getStackTrace,
  safeGet
} from '../exercises/errors';

describe('Error Handling and Debugging', () => {
  describe('Basic Error Handling', () => {
    describe('safeJsonParse', () => {
      test('should parse valid JSON', () => {
        const result = safeJsonParse('{"name": "John"}', {});
        expect(result).toEqual({ name: 'John' });
      });

      test('should return default value for invalid JSON', () => {
        const defaultValue = { error: true };
        const result = safeJsonParse('invalid json', defaultValue);
        expect(result).toEqual(defaultValue);
      });

      test('should handle empty string', () => {
        const result = safeJsonParse('', null);
        expect(result).toBe(null);
      });

      test('should handle complex objects', () => {
        const complexObj = { users: [{ id: 1, name: 'Alice' }], count: 1 };
        const result = safeJsonParse(JSON.stringify(complexObj), {});
        expect(result).toEqual(complexObj);
      });
    });

    describe('safeDivide', () => {
      test('should divide valid numbers', () => {
        expect(safeDivide(10, 2)).toBe(5);
        expect(safeDivide(15, 3)).toBe(5);
        expect(safeDivide(7, 2)).toBe(3.5);
      });

      test('should throw error for division by zero', () => {
        expect(() => safeDivide(10, 0)).toThrow(
          'Division by zero is not allowed'
        );
      });

      test('should throw error for non-numeric arguments', () => {
        expect(() => safeDivide('10', 2)).toThrow(
          'Both arguments must be numbers'
        );
        expect(() => safeDivide(10, '2')).toThrow(
          'Both arguments must be numbers'
        );
        expect(() => safeDivide('10', '2')).toThrow(
          'Both arguments must be numbers'
        );
      });

      test('should handle negative numbers', () => {
        expect(safeDivide(-10, 2)).toBe(-5);
        expect(safeDivide(10, -2)).toBe(-5);
        expect(safeDivide(-10, -2)).toBe(5);
      });
    });

    describe('tryExecute', () => {
      test('should return success result for successful function', () => {
        const fn = () => JSON.parse('{"valid": true}');
        const result = tryExecute(fn);
        expect(result).toEqual({
          success: true,
          result: { valid: true }
        });
      });

      test('should return error result for failing function', () => {
        const fn = () => JSON.parse('invalid');
        const result = tryExecute(fn);
        expect(result.success).toBe(false);
        expect(result.error).toContain('Unexpected token');
      });

      test('should handle functions that return values', () => {
        const fn = () => 42;
        const result = tryExecute(fn);
        expect(result).toEqual({
          success: true,
          result: 42
        });
      });

      test('should handle functions that throw custom errors', () => {
        const fn = () => {
          throw new Error('Custom error message');
        };
        const result = tryExecute(fn);
        expect(result).toEqual({
          success: false,
          error: 'Custom error message'
        });
      });
    });

    describe('accessProperty', () => {
      test('should access valid property and log messages', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        const result = accessProperty({ name: 'John' }, 'name');

        expect(result).toBe('John');
        expect(consoleSpy).toHaveBeenCalledWith('Attempting access');
        expect(consoleSpy).toHaveBeenCalledWith('Access completed');
        expect(consoleSpy).toHaveBeenCalledTimes(2);

        consoleSpy.mockRestore();
      });

      test('should return null for invalid access and still log messages', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        const result = accessProperty(null, 'name');

        expect(result).toBe(null);
        expect(consoleSpy).toHaveBeenCalledWith('Attempting access');
        expect(consoleSpy).toHaveBeenCalledWith('Access completed');
        expect(consoleSpy).toHaveBeenCalledTimes(2);

        consoleSpy.mockRestore();
      });

      test('should handle undefined properties', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        const result = accessProperty({ age: 25 }, 'name');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledTimes(2);

        consoleSpy.mockRestore();
      });
    });
  });

  describe('Custom Error Types', () => {
    describe('ValidationError', () => {
      test('should create ValidationError with message and field', () => {
        const error = new ValidationError('Invalid email format', 'email');
        expect(error.message).toBe('Invalid email format');
        expect(error.field).toBe('email');
        expect(error.name).toBe('ValidationError');
        expect(error instanceof Error).toBe(true);
      });

      test('should be throwable and catchable', () => {
        expect(() => {
          throw new ValidationError('Test error', 'testField');
        }).toThrow(ValidationError);
      });
    });

    describe('NetworkError', () => {
      test('should create NetworkError with status code and url', () => {
        const error = new NetworkError('Not Found', 404, '/api/users');
        expect(error.message).toBe('Not Found');
        expect(error.statusCode).toBe(404);
        expect(error.url).toBe('/api/users');
        expect(error.name).toBe('NetworkError');
        expect(error instanceof Error).toBe(true);
      });

      test('should handle different status codes', () => {
        const error500 = new NetworkError('Server Error', 500, '/api/data');
        expect(error500.statusCode).toBe(500);

        const error401 = new NetworkError('Unauthorized', 401, '/api/auth');
        expect(error401.statusCode).toBe(401);
      });
    });

    describe('validateUser', () => {
      test('should return valid user object', () => {
        const user = { name: 'John', email: 'john@example.com', age: 25 };
        const result = validateUser(user);
        expect(result).toEqual(user);
      });

      test('should throw ValidationError for empty name', () => {
        const user = { name: '', email: 'john@example.com', age: 25 };
        expect(() => validateUser(user)).toThrow(ValidationError);
      });

      test('should throw ValidationError for invalid email', () => {
        const user = { name: 'John', email: 'invalid', age: 25 };
        expect(() => validateUser(user)).toThrow(ValidationError);
      });

      test('should throw ValidationError for invalid age', () => {
        const user1 = { name: 'John', email: 'john@example.com', age: -5 };
        expect(() => validateUser(user1)).toThrow(ValidationError);

        const user2 = { name: 'John', email: 'john@example.com', age: 200 };
        expect(() => validateUser(user2)).toThrow(ValidationError);

        const user3 = { name: 'John', email: 'john@example.com', age: '25' };
        expect(() => validateUser(user3)).toThrow(ValidationError);
      });
    });

    describe('simulateApiCall', () => {
      test('should return success for /success endpoint', () => {
        const result = simulateApiCall('/success');
        expect(result).toEqual({ data: 'Success' });
      });

      test('should throw NetworkError for /not-found', () => {
        expect(() => simulateApiCall('/not-found')).toThrow(NetworkError);
        try {
          simulateApiCall('/not-found');
        } catch (error) {
          expect(error.statusCode).toBe(404);
        }
      });

      test('should throw NetworkError for /server-error', () => {
        expect(() => simulateApiCall('/server-error')).toThrow(NetworkError);
        try {
          simulateApiCall('/server-error');
        } catch (error) {
          expect(error.statusCode).toBe(500);
        }
      });

      test('should throw ValidationError for /invalid', () => {
        expect(() => simulateApiCall('/invalid')).toThrow(ValidationError);
      });

      test('should throw generic Error for unknown endpoints', () => {
        expect(() => simulateApiCall('/unknown')).toThrow(Error);
        expect(() => simulateApiCall('/unknown')).not.toThrow(NetworkError);
        expect(() => simulateApiCall('/unknown')).not.toThrow(ValidationError);
      });
    });
  });

  describe('Async Error Handling', () => {
    describe('safeAsyncExecute', () => {
      test('should return success result for successful async function', async () => {
        const goodFn = async () => 'success';
        const result = await safeAsyncExecute(goodFn);
        expect(result).toEqual({
          success: true,
          data: 'success'
        });
      });

      test('should return error result for failing async function', async () => {
        const badFn = async () => {
          throw new Error('failed');
        };
        const result = await safeAsyncExecute(badFn);
        expect(result).toEqual({
          success: false,
          error: 'failed'
        });
      });

      test('should handle async functions returning objects', async () => {
        const fn = async () => ({ id: 1, name: 'test' });
        const result = await safeAsyncExecute(fn);
        expect(result.success).toBe(true);
        expect(result.data).toEqual({ id: 1, name: 'test' });
      });
    });

    describe('handlePromiseRejection', () => {
      test('should return promise result if successful', async () => {
        const goodPromise = Promise.resolve('success');
        const result = await handlePromiseRejection(goodPromise, 'default');
        expect(result).toBe('success');
      });

      test('should return default value if promise rejects', async () => {
        const badPromise = Promise.reject('error');
        const result = await handlePromiseRejection(badPromise, 'default');
        expect(result).toBe('default');
      });

      test('should handle different data types', async () => {
        const objectPromise = Promise.resolve({ data: 'test' });
        const result = await handlePromiseRejection(objectPromise, {});
        expect(result).toEqual({ data: 'test' });
      });
    });

    describe('executeSequentially', () => {
      test('should return all results if all operations succeed', async () => {
        const ops = [
          async () => 'result1',
          async () => 'result2',
          async () => 'result3'
        ];
        const result = await executeSequentially(ops);
        expect(result).toEqual(['result1', 'result2', 'result3']);
      });

      test('should stop at first failure and return error info', async () => {
        const ops = [
          async () => 'result1',
          async () => 'result2',
          async () => {
            throw new Error('failed');
          },
          async () => 'result4'
        ];
        const result = await executeSequentially(ops);
        expect(result).toEqual({
          success: false,
          error: 'failed',
          failedAt: 2
        });
      });

      test('should handle empty array', async () => {
        const result = await executeSequentially([]);
        expect(result).toEqual([]);
      });
    });

    describe('retryOperation', () => {
      test('should succeed on first attempt', async () => {
        const successFn = async () => 'success';
        const result = await retryOperation(successFn, 3);
        expect(result).toBe('success');
      });

      test('should retry and eventually succeed', async () => {
        let attempt = 0;
        const flakyFn = async () => {
          attempt++;
          if (attempt < 3) throw new Error('failed');
          return 'success';
        };
        const result = await retryOperation(flakyFn, 3);
        expect(result).toBe('success');
        expect(attempt).toBe(3);
      });

      test('should throw after all retries exhausted', async () => {
        const alwaysFailFn = async () => {
          throw new Error('always fails');
        };
        await expect(retryOperation(alwaysFailFn, 2)).rejects.toThrow(
          'always fails'
        );
      });
    });
  });

  describe('Error Recovery Patterns', () => {
    describe('createCircuitBreaker', () => {
      test('should execute function normally initially', () => {
        const breaker = createCircuitBreaker(2);
        const fn = () => 'success';
        expect(breaker(fn)).toBe('success');
      });

      test('should open circuit after failure threshold', () => {
        const breaker = createCircuitBreaker(2);
        const failFn = () => {
          throw new Error('service down');
        };

        // First failure
        expect(() => breaker(failFn)).toThrow('service down');
        // Second failure - circuit should open
        expect(() => breaker(failFn)).toThrow('service down');
        // Third call - should fail immediately without calling function
        expect(() => breaker(failFn)).toThrow();
      });
    });

    describe('gracefulDegrade', () => {
      test('should return primary result when primary succeeds', () => {
        const primary = () => 'primary result';
        const fallback = () => 'fallback result';
        const result = gracefulDegrade(primary, fallback);
        expect(result).toBe('primary result');
      });

      test('should return fallback result when primary fails', () => {
        const primary = () => {
          throw new Error('primary failed');
        };
        const fallback = () => 'fallback result';
        const result = gracefulDegrade(primary, fallback);
        expect(result).toBe('fallback result');
      });

      test('should return error object when both fail', () => {
        const bothFail = () => {
          throw new Error('failed');
        };
        const result = gracefulDegrade(bothFail, bothFail);
        expect(result).toEqual({
          error: 'Both primary and fallback operations failed'
        });
      });
    });

    describe('exponentialBackoff', () => {
      test('should succeed without retries', async () => {
        const successFn = async () => 'success';
        const result = await exponentialBackoff(successFn, 3);
        expect(result).toBe('success');
      });

      test('should eventually succeed with backoff', async () => {
        let attempts = 0;
        const flakyFn = async () => {
          attempts++;
          if (attempts < 3) throw new Error('not ready');
          return 'ready';
        };
        const result = await exponentialBackoff(flakyFn, 3);
        expect(result).toBe('ready');
        expect(attempts).toBe(3);
      });

      test('should throw after max retries with backoff', async () => {
        const alwaysFailFn = async () => {
          throw new Error('always fails');
        };
        await expect(exponentialBackoff(alwaysFailFn, 2)).rejects.toThrow(
          'always fails'
        );
      });
    });

    describe('collectResults', () => {
      test('should collect successful results and errors', () => {
        const operations = [
          () => 'success1',
          () => {
            throw new Error('error1');
          },
          () => 'success2',
          () => {
            throw new Error('error2');
          }
        ];
        const result = collectResults(operations);
        expect(result.results).toEqual(['success1', 'success2']);
        expect(result.errors).toEqual(['error1', 'error2']);
      });

      test('should handle all successful operations', () => {
        const operations = [
          () => 'success1',
          () => 'success2',
          () => 'success3'
        ];
        const result = collectResults(operations);
        expect(result.results).toEqual(['success1', 'success2', 'success3']);
        expect(result.errors).toEqual([]);
      });

      test('should handle all failing operations', () => {
        const operations = [
          () => {
            throw new Error('error1');
          },
          () => {
            throw new Error('error2');
          }
        ];
        const result = collectResults(operations);
        expect(result.results).toEqual([]);
        expect(result.errors).toEqual(['error1', 'error2']);
      });
    });
  });

  describe('Debugging and Validation', () => {
    describe('createDebugWrapper', () => {
      test('should log function execution details', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});
        const add = (a, b) => a + b;
        const debugAdd = createDebugWrapper(add, 'add');

        const result = debugAdd(2, 3);

        expect(result).toBe(5);
        expect(consoleSpy).toHaveBeenCalledWith('Calling add with [2, 3]');
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringMatching(/add returned 5 in \d+ms/)
        );

        consoleSpy.mockRestore();
      });

      test('should log and re-throw errors', () => {
        const consoleSpy = vi
          .spyOn(console, 'log')
          .mockImplementation(() => {});
        const errorFn = () => {
          throw new Error('test error');
        };
        const debugErrorFn = createDebugWrapper(errorFn, 'errorFn');

        expect(() => debugErrorFn()).toThrow('test error');
        expect(consoleSpy).toHaveBeenCalledWith('Calling errorFn with []');
        expect(consoleSpy).toHaveBeenCalledWith(
          'errorFn threw error: test error'
        );

        consoleSpy.mockRestore();
      });
    });

    describe('createTypeValidator', () => {
      test('should execute function with correct types', () => {
        const multiply = (a, b) => a * b;
        const safeMultiply = createTypeValidator(multiply, [
          'number',
          'number'
        ]);
        expect(safeMultiply(2, 3)).toBe(6);
      });

      test('should throw ValidationError for wrong types', () => {
        const multiply = (a, b) => a * b;
        const safeMultiply = createTypeValidator(multiply, [
          'number',
          'number'
        ]);

        expect(() => safeMultiply('2', 3)).toThrow(ValidationError);
        expect(() => safeMultiply(2, '3')).toThrow(ValidationError);
      });

      test('should validate different types', () => {
        const fn = (str, num, bool) => `${str}-${num}-${bool}`;
        const safeFn = createTypeValidator(fn, ['string', 'number', 'boolean']);

        expect(safeFn('test', 42, true)).toBe('test-42-true');
        expect(() => safeFn(123, 42, true)).toThrow(ValidationError);
      });
    });

    describe('createPerformanceMonitor', () => {
      test('should track performance statistics', () => {
        const fn = () => Math.random();
        const { fn: monitoredFn, getStats } = createPerformanceMonitor(fn);

        monitoredFn();
        monitoredFn();
        monitoredFn();

        const stats = getStats();
        expect(stats.executions).toBe(3);
        expect(stats.totalTime).toBeGreaterThanOrEqual(0);
        expect(stats.averageTime).toBeGreaterThanOrEqual(0);
        expect(stats.slowestTime).toBeGreaterThanOrEqual(0);
      });

      test('should return function results normally', () => {
        const add = (a, b) => a + b;
        const { fn: monitoredAdd } = createPerformanceMonitor(add);

        expect(monitoredAdd(2, 3)).toBe(5);
      });
    });

    describe('assert and AssertionError', () => {
      test('should not throw for true conditions', () => {
        expect(() =>
          assert(5 > 3, 'Five should be greater than three')
        ).not.toThrow();
        expect(assert(true, 'Should be true')).toBeUndefined();
      });

      test('should throw AssertionError for false conditions', () => {
        expect(() => assert(2 > 5, 'Two should be greater than five')).toThrow(
          AssertionError
        );
        expect(() => assert(false, 'Should be true')).toThrow(AssertionError);
      });

      test('AssertionError should have correct properties', () => {
        try {
          assert(false, 'Test assertion');
        } catch (error) {
          expect(error).toBeInstanceOf(AssertionError);
          expect(error.name).toBe('AssertionError');
          expect(error.message).toBe('Test assertion');
        }
      });
    });

    describe('getStackTrace', () => {
      test('should return stack trace information', () => {
        function outerFunction() {
          function innerFunction() {
            return getStackTrace();
          }
          return innerFunction();
        }

        const stackTrace = outerFunction();
        expect(Array.isArray(stackTrace)).toBe(true);
        expect(stackTrace.length).toBeGreaterThan(0);
      });
    });

    describe('safeGet', () => {
      test('should get nested property values', () => {
        const obj = { user: { profile: { name: 'John' } } };
        expect(safeGet(obj, 'user.profile.name')).toBe('John');
        expect(safeGet(obj, 'user.profile')).toEqual({ name: 'John' });
        expect(safeGet(obj, 'user')).toEqual({ profile: { name: 'John' } });
      });

      test('should return undefined for missing paths', () => {
        const obj = { user: { profile: { name: 'John' } } };
        expect(safeGet(obj, 'user.profile.age')).toBeUndefined();
        expect(safeGet(obj, 'user.settings.theme')).toBeUndefined();
        expect(safeGet(obj, 'nonexistent')).toBeUndefined();
      });

      test('should handle null and undefined objects', () => {
        expect(safeGet(null, 'user.name')).toBeUndefined();
        expect(safeGet(undefined, 'user.name')).toBeUndefined();
      });

      test('should handle empty and single property paths', () => {
        const obj = { name: 'John' };
        expect(safeGet(obj, 'name')).toBe('John');
        expect(safeGet(obj, '')).toBeUndefined();
      });
    });
  });
});
