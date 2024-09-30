import { describe, test, expect } from 'vitest';
import { fizzBuzz } from '../exercises/flowControl';

describe('flow control', () => {
  test('you should be able to conditionally branch your code', () => {
    let num = 0;

    while (num % 3 === 0 || num % 5 === 0) {
      num = Math.floor(Math.random() * 10) + 1;
    }

    expect(fizzBuzz()).toBeFalsy();
    expect(fizzBuzz('foo')).toBeFalsy();
    expect(fizzBuzz(2)).toEqual(2);
    expect(fizzBuzz(101)).toEqual(101);

    expect(fizzBuzz(3)).toEqual('fizz');
    expect(fizzBuzz(6)).toEqual('fizz');
    expect(fizzBuzz(num * 3)).toEqual('fizz');

    expect(fizzBuzz(5)).toEqual('buzz');
    expect(fizzBuzz(10)).toEqual('buzz');
    expect(fizzBuzz(num * 5)).toEqual('buzz');

    expect(fizzBuzz(15)).toEqual('fizzbuzz');
    expect(fizzBuzz(num * 3 * 5)).toEqual('fizzbuzz');
  });
});
