/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * Some of these exercises require you to work with timers and intervals.
 * You'll need to use setTimeout, setInterval, clearTimeout, and clearInterval.
 */

/**
 * Write a function that executes a callback after a specified delay.
 * The function should return the timer ID.
 *
 * delayedExecution(() => console.log('hello'), 1000);
 * // logs 'hello' after 1 second
 */
export function delayedExecution(callback, delay) {
  const timerId = setTimeout(callback, delay);

  return timerId;
}

/**
 * Write a function that returns an object with start and cancel methods.
 * The start method should execute the callback after the delay.
 * The cancel method should prevent the callback from executing.
 *
 * const timer = createCancellableTimer(() => console.log('done'), 1000);
 * timer.start(); // will log 'done' after 1 second
 * timer.cancel(); // prevents the callback from executing
 */
export function createCancellableTimer(callback, delay) {
  return {
    timerId: null,

    start() {
      this.timerId = setTimeout(callback, delay);
    },

    cancel() {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
  };
}

/**
 * Write a function that executes a callback repeatedly at specified intervals.
 * The function should return the interval ID.
 *
 * repeatedExecution(() => console.log('tick'), 500);
 * // logs 'tick' every 500ms
 */
export function repeatedExecution(callback, interval) {
  const intervalId = setInterval(callback, interval);

  return intervalId;
}

/**
 * Write a function that returns a debounced version of the provided function.
 * The debounced function should delay execution until after the delay
 * has passed since the last time it was invoked.
 *
 * const debouncedLog = debounce(() => console.log('called'), 300);
 * debouncedLog(); debouncedLog(); debouncedLog();
 * // only logs 'called' once, 300ms after the last call
 */
export function debounce(func, delay) {
  let timer;

  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * Write a function that creates a countdown timer. It should call onTick
 * every second with the remaining time, and call onComplete when the
 * countdown reaches zero. Return an object with pause, resume, and stop methods.
 *
 * const countdown = createCountdown(5,
 *   (time) => console.log(`${time} seconds left`),
 *   () => console.log('Time up!')
 * );
 * countdown.pause(); countdown.resume(); countdown.stop();
 */
export function createCountdown(seconds, onTick, onComplete) {
  let timeLeft = seconds;
  let timerRunning = false;
  let timerId = null;

  function createInterval() {
    timerRunning = true;
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft -= 1;
        onTick(timeLeft);
      }
      if (timeLeft === 0) {
        onComplete();
        clearInterval(timerId);
        timerRunning = false;
      }
    }, 1000);
  }

  createInterval();

  return {
    pause() {
      if (timerRunning) {
        clearInterval(timerId);
        timerRunning = false;
        timerId = null;
      }
    },

    resume() {
      if (timeLeft > 0 && !timerRunning) {
        createInterval();
      }
    },

    stop() {
      if (timerRunning) {
        clearInterval(timerId);
        timerRunning = false;
        timerId = null;
      }
    }
  };
}
