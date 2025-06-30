import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  delayedExecution,
  createCancellableTimer,
  repeatedExecution,
  debounce,
  createCountdown
} from '../exercises/timers.js';

describe('Timer Exercises', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

      // With fake timers, setTimeout returns an object, not a number
      expect(timerId).toBeDefined();
      expect(timerId).not.toBeNull();
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

      // With fake timers, setInterval returns an object, not a number
      expect(intervalId).toBeDefined();
      expect(intervalId).not.toBeNull();
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
});
