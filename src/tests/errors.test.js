import { describe, test, expect, vi } from 'vitest';

import {
  // Error Handling Fundamentals
  safeJsonParse,
  tryExecute,
  // Custom Error Types
  ValidationError,
  validateUser,
  // Async Error Handling
  safeAsyncExecute,
  retryOperation,
  // Error Recovery Patterns
  gracefulDegrade,
  createCircuitBreaker,
  createTypeValidator,
  safeGet
} from '../exercises/errors';

describe('Error Handling and Debugging', () => {
  describe('Error Handling Fundamentals', () => {
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
