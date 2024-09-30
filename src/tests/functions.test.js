import { describe, beforeEach, test, expect } from 'vitest';
import {
  argsAsArray,
  speak,
  functionFunction,
  makeClosures,
  partial,
  useArguments,
  callIt,
  partialUsingArguments,
  curryIt
} from '../exercises/functions';

describe('Functions', () => {
  let sayItCalled = false;
  const sayIt = function (greeting, name, punctuation) {
    sayItCalled = true;
    return `${greeting}, ${name}${punctuation ? punctuation : '!'}`;
    // return greeting + ", " + name + (punctuation || "!");
  };

  beforeEach(() => {
    sayItCalled = false;
  });

  test('you should be able to use an array as arguments when calling a function', () => {
    const result = argsAsArray(sayIt, ['Hello', 'Ellie', '!']);
    expect(result).toEqual('Hello, Ellie!');
    expect(sayItCalled).toBeTruthy();
  });

  test('you should be able to change the context in which a function is called', () => {
    const speak2 = function () {
      return sayIt(this.greeting, this.name, '!!!');
    };
    const obj = {
      greeting: 'Hello',
      name: 'Lily'
    };

    const result = speak(speak2, obj);
    expect(result).toEqual('Hello, Lily!!!');
    expect(sayItCalled).toBeTruthy();
  });

  test('you should be able to return a function from a function', () => {
    expect(functionFunction('Hello')('world')).toEqual('Hello, world');
    expect(functionFunction('Hai')('can i haz funxtion?')).toEqual('Hai, can i haz funxtion?');
  });

  test('you should be able to use closures', () => {
    const arr = [Math.random(), Math.random(), Math.random(), Math.random()];
    const square = function (x) {
      return x * x;
    };

    const funcs = makeClosures(arr, square);
    expect(funcs).toHaveLength(arr.length);

    arr.forEach((num, i) => {
      expect(funcs[i]()).toEqual(square(arr[i]));
    });
  });

  test('you should be able to create a "partial" function', () => {
    const partial1 = partial(sayIt, 'Hello', 'Ellie');
    expect(partial1('!!!')).toEqual('Hello, Ellie!!!');
    expect(sayItCalled).toBeTruthy();
  });

  test('you should be able to use arguments', () => {
    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    const d = Math.random();

    expect(useArguments(a)).toEqual(a);
    expect(useArguments(a, b)).toEqual(a + b);
    expect(useArguments(a, b, c)).toEqual(a + b + c);
    expect(useArguments(a, b, c, d)).toEqual(a + b + c + d);
  });

  test('you should be able to apply functions with arbitrary numbers of arguments', () => {
    const a = Math.random();
    const b = Math.random();
    const c = Math.random();

    let wasITake2ArgumentsCalled = false;
    const iTake2Arguments = function (firstArgument, secondArgument) {
      expect(arguments.length).toEqual(2);
      expect(firstArgument).toEqual(a);
      expect(secondArgument).toEqual(b);

      wasITake2ArgumentsCalled = true;
    };

    let wasITake3ArgumentsCalled = false;
    const iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
      expect(arguments.length).toEqual(3);
      expect(firstArgument).toEqual(a);
      expect(secondArgument).toEqual(b);
      expect(thirdArgument).toEqual(c);

      wasITake3ArgumentsCalled = true;
    };

    callIt(iTake2Arguments, a, b);
    callIt(iTake3Arguments, a, b, c);

    expect(wasITake2ArgumentsCalled).toBeTruthy();
    expect(wasITake3ArgumentsCalled).toBeTruthy();
  });

  test('you should be able to create a "partial" function for variable number of applied arguments', () => {
    const partialMe = function (x, y, z) {
      return (x / y) * z;
    };

    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    expect(partialUsingArguments(partialMe)(a, b, c)).toEqual(partialMe(a, b, c));
    expect(partialUsingArguments(partialMe, a)(b, c)).toEqual(partialMe(a, b, c));
    expect(partialUsingArguments(partialMe, a, b)(c)).toEqual(partialMe(a, b, c));
    expect(partialUsingArguments(partialMe, a, b, c)()).toEqual(partialMe(a, b, c));
  });

  test('you should be able to curry existing functions', () => {
    const curryMe = function (x, y, z) {
      return (x / y) * z;
    };

    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    let result;

    result = curryIt(curryMe);
    expect(typeof result).toEqual('function');
    expect(result.length).toEqual(1);

    result = curryIt(curryMe)(a);
    expect(typeof result).toEqual('function');
    expect(result.length).toEqual(1);

    result = curryIt(curryMe)(a)(b);
    expect(typeof result).toEqual('function');
    expect(result.length).toEqual(1);

    result = curryIt(curryMe)(a)(b)(c);
    expect(typeof result).toEqual('number');
    expect(result).toEqual(curryMe(a, b, c));
  });
});
