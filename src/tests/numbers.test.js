import { describe, test, expect } from 'vitest';
import { reverseInt } from '../exercises/numbers';

describe('Numbers', () => {
  test('you should be able to reverse an integer', () => {
    expect(reverseInt(0)).toEqual(0);
    expect(reverseInt(5)).toEqual(5);
    expect(reverseInt(15)).toEqual(51);
    expect(reverseInt(90)).toEqual(9);
    expect(reverseInt(2359)).toEqual(9532);
    expect(reverseInt(-5)).toEqual(-5);
    expect(reverseInt(-15)).toEqual(-51);
    expect(reverseInt(-90)).toEqual(-9);
    expect(reverseInt(-2359)).toEqual(-9532);
  });
});
