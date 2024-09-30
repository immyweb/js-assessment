import { describe, test, expect } from 'vitest';
import { reverseString, palindrome, maxChar, anagrams, capitalize, vowels } from '../exercises/strings';

describe('Strings', () => {
  test('you should be able to reverse a string', () => {
    expect(reverseString('abcd')).toEqual('dcba');
    expect(reverseString('  abcd')).toEqual('dcba  ');
  });

  test('you should be to check if a string is a palindrome', () => {
    expect(palindrome('aba')).toBeTruthy();
    expect(palindrome(' aba')).toBeFalsy();
    expect(palindrome('aba ')).toBeFalsy();
    expect(palindrome('greetings')).toBeFalsy();
    expect(palindrome('1000000001')).toBeTruthy();
    expect(palindrome('Fish hsif')).toBeFalsy();
    expect(palindrome('pennep')).toBeTruthy();
  });

  test('you should be able to find the most used character in a string', () => {
    expect(maxChar('abcdefghijklmnaaaaa')).toEqual('a');
    expect(maxChar('ab1c1d1e1f1g1')).toEqual('1');
    expect(maxChar('a')).toEqual('a');
  });

  test('you should be able to check for anagrams', () => {
    // expect(anagrams("hello", "llohe")).toBeTruthy();
    expect(anagrams('Whoa! Hi!', 'Hi! Whoa!')).toBeTruthy();
    expect(anagrams('One One', 'Two two two')).toBeFalsy();
    expect(anagrams('One one', 'One one c')).toBeFalsy();
    expect(anagrams('A tree, a life, a bench', 'A tree, a fence, a yard')).toBeFalsy();
  });

  test('you should be able to capitalise words in a string', () => {
    expect(capitalize('hi there, how is it going?')).toEqual('Hi There, How Is It Going?');
    expect(capitalize('i love breakfast at bill miller bbq')).toEqual('I Love Breakfast At Bill Miller Bbq');
  });

  test('you should be able to return the number of vowels used in a string', () => {
    expect(vowels('aeiou')).toEqual(5);
    expect(vowels('abcdefghijklmnopqrstuvwxyz')).toEqual(5);
    expect(vowels('bcdfghjkl')).toEqual(0);
  });
});
