import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  delayedExecution,
  createCancellableTimer,
  repeatedExecution,
  limitedRepeat,
  debounce,
  throttle,
  timerChain,
  createCountdown,
  createAnimationTimer,
  timeoutRace
} from '../exercises/timers.js';

describe('Timer Exercises', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllTimers();
  });

  describe('delayedExecution', () => {
    it('should execute callback after specified delay', () => {
      const callback = vi.fn();
      delayedExecution(callback, 1000);
      
      expect(callback).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledOnce();
    });

    it('should return a timer ID', () => {
      const callback = vi.fn();
      const timerId = delayedExecution(callback, 500);
      
      expect(typeof timerId).toBe('number');
      expect(timerId).toBeGreaterThan(0);
    });
  });

  describe('createCancellableTimer', () => {
    it('should create timer with start and cancel methods', () => {
      const callback = vi.fn();
      const timer = createCancellableTimer(callback, 1000);
      
      expect(timer).toHaveProperty('start');
      expect(timer).toHaveProperty('cancel');
      expect(typeof timer.start).toBe('function');
      expect(typeof timer.cancel).toBe('function');
    });

    it('should execute callback when started', () => {
      const callback = vi.fn();
      const timer = createCancellableTimer(callback, 1000);
      
      timer.start();
      expect(callback).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledOnce();
    });

    it('should prevent execution when cancelled', () => {
      const callback = vi.fn();
      const timer = createCancellableTimer(callback, 1000);
      
      timer.start();
      timer.cancel();
      
      vi.advanceTimersByTime(1000);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('repeatedExecution', () => {
    it('should execute callback repeatedly at intervals', () => {
      const callback = vi.fn();
      repeatedExecution(callback, 500);
      
      expect(callback).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(2);
      
      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should return an interval ID', () => {
      const callback = vi.fn();
      const intervalId = repeatedExecution(callback, 100);
      
      expect(typeof intervalId).toBe('number');
      expect(intervalId).toBeGreaterThan(0);
    });
  });

  describe('limitedRepeat', () => {
    it('should execute callback specified number of times', async () => {
      const callback = vi.fn();
      const promise = limitedRepeat(callback, 3, 100);
      
      expect(callback).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(2);
      
      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(3);
      
      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(3); // should not execute again
      
      await expect(promise).resolves.toBeUndefined();
    });

    it('should return a promise', () => {
      const callback = vi.fn();
      const result = limitedRepeat(callback, 2, 50);
      
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('debounce', () => {
    it('should delay execution until after delay period', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 300);
      
      debouncedFunc();
      expect(func).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(300);
      expect(func).toHaveBeenCalledOnce();
    });

    it('should reset delay on subsequent calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 300);
      
      debouncedFunc();
      vi.advanceTimersByTime(200);
      debouncedFunc(); // should reset the timer
      
      vi.advanceTimersByTime(200);
      expect(func).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledOnce();
    });

    it('should only execute once for multiple rapid calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);
      
      debouncedFunc();
      debouncedFunc();
      debouncedFunc();
      
      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledOnce();
    });
  });

  describe('throttle', () => {
    it('should limit execution to once per time period', () => {
      const func = vi.fn();
      const throttledFunc = throttle(func, 1000);
      
      throttledFunc();
      expect(func).toHaveBeenCalledTimes(1);
      
      throttledFunc(); // should be ignored
      throttledFunc(); // should be ignored
      expect(func).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(1000);
      throttledFunc();
      expect(func).toHaveBeenCalledTimes(2);
    });

    it('should execute immediately on first call', () => {
      const func = vi.fn();
      const throttledFunc = throttle(func, 500);
      
      throttledFunc();
      expect(func).toHaveBeenCalledOnce();
    });
  });

  describe('timerChain', () => {
    it('should execute tasks sequentially with delays', async () => {
      const callbacks = [vi.fn(), vi.fn(), vi.fn()];
      const tasks = [
        { callback: callbacks[0], delay: 100 },
        { callback: callbacks[1], delay: 200 },
        { callback: callbacks[2], delay: 150 }
      ];
      
      const promise = timerChain(tasks);
      
      expect(callbacks[0]).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(100);
      expect(callbacks[0]).toHaveBeenCalledOnce();
      expect(callbacks[1]).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(200);
      expect(callbacks[1]).toHaveBeenCalledOnce();
      expect(callbacks[2]).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(150);
      expect(callbacks[2]).toHaveBeenCalledOnce();
      
      await expect(promise).resolves.toBeUndefined();
    });

    it('should return a promise', () => {
      const tasks = [{ callback: vi.fn(), delay: 100 }];
      const result = timerChain(tasks);
      
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('createCountdown', () => {
    it('should create countdown with control methods', () => {
      const onTick = vi.fn();
      const onComplete = vi.fn();
      const countdown = createCountdown(5, onTick, onComplete);
      
      expect(countdown).toHaveProperty('pause');
      expect(countdown).toHaveProperty('resume');
      expect(countdown).toHaveProperty('stop');
      expect(typeof countdown.pause).toBe('function');
      expect(typeof countdown.resume).toBe('function');
      expect(typeof countdown.stop).toBe('function');
    });

    it('should call onTick with remaining time each second', () => {
      const onTick = vi.fn();
      const onComplete = vi.fn();
      createCountdown(3, onTick, onComplete);
      
      vi.advanceTimersByTime(1000);
      expect(onTick).toHaveBeenCalledWith(2);
      
      vi.advanceTimersByTime(1000);
      expect(onTick).toHaveBeenCalledWith(1);
      
      vi.advanceTimersByTime(1000);
      expect(onTick).toHaveBeenCalledWith(0);
      expect(onComplete).toHaveBeenCalledOnce();
    });

    it('should support pause and resume', () => {
      const onTick = vi.fn();
      const onComplete = vi.fn();
      const countdown = createCountdown(3, onTick, onComplete);
      
      vi.advanceTimersByTime(1000);
      expect(onTick).toHaveBeenCalledWith(2);
      
      countdown.pause();
      vi.advanceTimersByTime(2000); // should not advance while paused
      expect(onTick).toHaveBeenCalledTimes(1);
      
      countdown.resume();
      vi.advanceTimersByTime(1000);
      expect(onTick).toHaveBeenCalledWith(1);
    });
  });

  describe('createAnimationTimer', () => {
    beforeEach(() => {
      global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));
      global.cancelAnimationFrame = vi.fn(clearTimeout);
    });

    it('should create animation timer with start and stop methods', () => {
      const callback = vi.fn();
      const timer = createAnimationTimer(callback, 1000);
      
      expect(timer).toHaveProperty('start');
      expect(timer).toHaveProperty('stop');
      expect(typeof timer.start).toBe('function');
      expect(typeof timer.stop).toBe('function');
    });

    it('should execute callback on animation frames', () => {
      const callback = vi.fn();
      const timer = createAnimationTimer(callback, 100);
      
      timer.start();
      
      vi.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalled();
      
      vi.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should stop after specified duration', () => {
      const callback = vi.fn();
      const timer = createAnimationTimer(callback, 100);
      
      timer.start();
      
      vi.advanceTimersByTime(100);
      const callCount = callback.mock.calls.length;
      
      vi.advanceTimersByTime(50);
      expect(callback).toHaveBeenCalledTimes(callCount); // should not increase
    });
  });

  describe('timeoutRace', () => {
    it('should resolve with first successful promise', async () => {
      const promise1 = new Promise(resolve => setTimeout(() => resolve('first'), 100));
      const promise2 = new Promise(resolve => setTimeout(() => resolve('second'), 200));
      
      const result = timeoutRace([promise1, promise2], 1000);
      
      vi.advanceTimersByTime(100);
      await expect(result).resolves.toBe('first');
    });

    it('should reject if timeout is reached first', async () => {
      const slowPromise = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
      
      const result = timeoutRace([slowPromise], 1000);
      
      vi.advanceTimersByTime(1000);
      await expect(result).rejects.toThrow();
    });

    it('should reject with timeout error message', async () => {
      const slowPromise = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
      
      const result = timeoutRace([slowPromise], 500);
      
      vi.advanceTimersByTime(500);
      await expect(result).rejects.toThrow('Timeout');
    });
  });
});