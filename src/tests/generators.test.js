import { describe, it, expect } from 'vitest';
import {
  countTo,
  evenNumbers,
  repeat,
  arrayGenerator,
  fibonacci,
  createIterator
} from '../exercises/generators.js';

describe('Generator Exercises', () => {
  describe('countTo', () => {
    it('should yield numbers from 1 to n', () => {
      expect([...countTo(5)]).toEqual([1, 2, 3, 4, 5]);
      expect([...countTo(3)]).toEqual([1, 2, 3]);
    });

    it('should return empty array for 0 or negative numbers', () => {
      expect([...countTo(0)]).toEqual([]);
      expect([...countTo(-1)]).toEqual([]);
    });

    it('should handle n = 1', () => {
      expect([...countTo(1)]).toEqual([1]);
    });

    it('should be a generator function', () => {
      const gen = countTo(3);
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
      expect(gen.next().value).toBe(3);
      expect(gen.next().done).toBe(true);
    });
  });

  describe('evenNumbers', () => {
    it('should yield even numbers up to limit', () => {
      expect([...evenNumbers(10)]).toEqual([2, 4, 6, 8, 10]);
      expect([...evenNumbers(5)]).toEqual([2, 4]);
    });

    it('should return empty array for limits less than 2', () => {
      expect([...evenNumbers(1)]).toEqual([]);
      expect([...evenNumbers(0)]).toEqual([]);
    });

    it('should handle limit of 2', () => {
      expect([...evenNumbers(2)]).toEqual([2]);
    });

    it('should be a generator function', () => {
      const gen = evenNumbers(6);
      expect(gen.next().value).toBe(2);
      expect(gen.next().value).toBe(4);
      expect(gen.next().value).toBe(6);
      expect(gen.next().done).toBe(true);
    });
  });

  describe('repeat', () => {
    it('should repeat a value n times', () => {
      expect([...repeat('hello', 3)]).toEqual(['hello', 'hello', 'hello']);
      expect([...repeat('x', 2)]).toEqual(['x', 'x']);
    });

    it('should handle 0 repetitions', () => {
      expect([...repeat('test', 0)]).toEqual([]);
    });

    it('should handle 1 repetition', () => {
      expect([...repeat('once', 1)]).toEqual(['once']);
    });

    it('should work with different value types', () => {
      expect([...repeat(42, 3)]).toEqual([42, 42, 42]);
      expect([...repeat(true, 2)]).toEqual([true, true]);
    });

    it('should be a generator function', () => {
      const gen = repeat('test', 2);
      expect(gen.next().value).toBe('test');
      expect(gen.next().value).toBe('test');
      expect(gen.next().done).toBe(true);
    });
  });

  describe('arrayGenerator', () => {
    it('should yield items from an array one by one', () => {
      expect([...arrayGenerator([1, 2, 3])]).toEqual([1, 2, 3]);
      expect([...arrayGenerator(['a', 'b'])]).toEqual(['a', 'b']);
    });

    it('should handle empty arrays', () => {
      expect([...arrayGenerator([])]).toEqual([]);
    });

    it('should handle arrays with different types', () => {
      expect([...arrayGenerator([1, 'hello', true])]).toEqual([1, 'hello', true]);
    });

    it('should be a generator function', () => {
      const gen = arrayGenerator(['x', 'y', 'z']);
      expect(gen.next().value).toBe('x');
      expect(gen.next().value).toBe('y');
      expect(gen.next().value).toBe('z');
      expect(gen.next().done).toBe(true);
    });
  });

  describe('fibonacci', () => {
    it('should yield the first n Fibonacci numbers', () => {
      expect([...fibonacci(5)]).toEqual([0, 1, 1, 2, 3]);
      expect([...fibonacci(7)]).toEqual([0, 1, 1, 2, 3, 5, 8]);
    });

    it('should handle n = 0', () => {
      expect([...fibonacci(0)]).toEqual([]);
    });

    it('should handle n = 1', () => {
      expect([...fibonacci(1)]).toEqual([0]);
    });

    it('should handle n = 2', () => {
      expect([...fibonacci(2)]).toEqual([0, 1]);
    });

    it('should generate larger sequences correctly', () => {
      const result = [...fibonacci(10)];
      expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it('should be a generator function', () => {
      const gen = fibonacci(4);
      expect(gen.next().value).toBe(0);
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
      expect(gen.next().done).toBe(true);
    });
  });

  describe('createIterator', () => {
    it('should create an iterator with next() method', () => {
      const iter = createIterator([1, 2, 3]);
      expect(typeof iter.next).toBe('function');
    });

    it('should return correct iterator protocol objects', () => {
      const iter = createIterator([1, 2, 3]);
      
      expect(iter.next()).toEqual({ value: 1, done: false });
      expect(iter.next()).toEqual({ value: 2, done: false });
      expect(iter.next()).toEqual({ value: 3, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });

    it('should handle empty arrays', () => {
      const iter = createIterator([]);
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });

    it('should handle single item arrays', () => {
      const iter = createIterator(['only']);
      expect(iter.next()).toEqual({ value: 'only', done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });

    it('should continue returning done: true after completion', () => {
      const iter = createIterator([1]);
      iter.next(); // consume the only item
      
      expect(iter.next()).toEqual({ value: undefined, done: true });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });

    it('should work with different value types', () => {
      const iter = createIterator([42, 'hello', true]);
      
      expect(iter.next()).toEqual({ value: 42, done: false });
      expect(iter.next()).toEqual({ value: 'hello', done: false });
      expect(iter.next()).toEqual({ value: true, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
});