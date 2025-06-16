import { describe, test, expect } from 'vitest';
import {
  // String creation and basic operations
  getLength,
  concatStrings,
  repeatString,
  joinChars,
  // String access and extraction
  getCharAt,
  getFirstChar,
  getLastChar,
  getSubstring,
  getFirstN,
  getLastN,
  // String search and finding
  findIndex,
  contains,
  startsWith,
  endsWith,
  countChar,
  // String transformation
  toUpperCase,
  toLowerCase,
  trimString,
  replaceAll,
  splitString,
  reverseString,
  capitalize,
  // String validation
  isEmpty,
  isNumeric,
  isAlpha,
  isAlphaNumeric,
  isValidEmail,
  palindrome,
  // String comparison
  compareStrings,
  compareIgnoreCase,
  anagrams,
  // String parsing
  parseInteger,
  parseFloatNumber,
  parseCSV,
  extractWords,
  // Advanced string operations
  padLeft,
  padRight,
  titleCase,
  removeVowels,
  reverseWords,
  hasUniqueChars,
  vowels,
  maxChar
} from '../exercises/strings';

describe('Strings', () => {
  // ==== STRING CREATION AND BASIC OPERATIONS ====

  describe('String Creation and Basic Operations', () => {
    test('should get string length', () => {
      expect(getLength('hello')).toBe(5);
      expect(getLength('')).toBe(0);
      expect(getLength('a')).toBe(1);
    });

    test('should concatenate strings', () => {
      expect(concatStrings('hello', 'world')).toBe('helloworld');
      expect(concatStrings('foo', 'bar')).toBe('foobar');
      expect(concatStrings('', 'test')).toBe('test');
      expect(concatStrings('test', '')).toBe('test');
    });

    test('should repeat string n times', () => {
      expect(repeatString('hi', 3)).toBe('hihihi');
      expect(repeatString('x', 5)).toBe('xxxxx');
      expect(repeatString('hello', 0)).toBe('');
      expect(repeatString('test', 1)).toBe('test');
    });

    test('should join character array into string', () => {
      expect(joinChars(['h', 'e', 'l', 'l', 'o'])).toBe('hello');
      expect(joinChars(['a', 'b', 'c'])).toBe('abc');
      expect(joinChars([])).toBe('');
    });
  });

  // ==== STRING ACCESS AND EXTRACTION ====

  describe('String Access and Extraction', () => {
    test('should get character at index', () => {
      expect(getCharAt('hello', 1)).toBe('e');
      expect(getCharAt('hello', 0)).toBe('h');
      expect(getCharAt('hello', 4)).toBe('o');
      expect(getCharAt('hello', 10)).toBeUndefined();
      expect(getCharAt('hello', -1)).toBeUndefined();
    });

    test('should get first character', () => {
      expect(getFirstChar('hello')).toBe('h');
      expect(getFirstChar('a')).toBe('a');
      expect(getFirstChar('')).toBeUndefined();
    });

    test('should get last character', () => {
      expect(getLastChar('hello')).toBe('o');
      expect(getLastChar('a')).toBe('a');
      expect(getLastChar('')).toBeUndefined();
    });

    test('should get substring', () => {
      expect(getSubstring('hello world', 0, 5)).toBe('hello');
      expect(getSubstring('hello world', 6, 11)).toBe('world');
      expect(getSubstring('test', 1, 3)).toBe('es');
    });

    test('should get first n characters', () => {
      expect(getFirstN('hello world', 5)).toBe('hello');
      expect(getFirstN('abc', 10)).toBe('abc');
      expect(getFirstN('test', 2)).toBe('te');
      expect(getFirstN('hello', 0)).toBe('');
    });

    test('should get last n characters', () => {
      expect(getLastN('hello world', 5)).toBe('world');
      expect(getLastN('abc', 10)).toBe('abc');
      expect(getLastN('test', 2)).toBe('st');
      expect(getLastN('hello', 0)).toBe('');
    });
  });

  // ==== STRING SEARCH AND FINDING ====

  describe('String Search and Finding', () => {
    test('should find index of substring', () => {
      expect(findIndex('hello world', 'world')).toBe(6);
      expect(findIndex('hello world', 'hello')).toBe(0);
      expect(findIndex('hello world', 'xyz')).toBe(-1);
      expect(findIndex('hello', 'hello')).toBe(0);
    });

    test('should check if string contains substring', () => {
      expect(contains('hello world', 'world')).toBe(true);
      expect(contains('hello world', 'hello')).toBe(true);
      expect(contains('hello world', 'xyz')).toBe(false);
      expect(contains('test', 'test')).toBe(true);
    });

    test('should check if string starts with substring', () => {
      expect(startsWith('hello world', 'hello')).toBe(true);
      expect(startsWith('hello world', 'world')).toBe(false);
      expect(startsWith('test', 'te')).toBe(true);
      expect(startsWith('test', 'st')).toBe(false);
    });

    test('should check if string ends with substring', () => {
      expect(endsWith('hello world', 'world')).toBe(true);
      expect(endsWith('hello world', 'hello')).toBe(false);
      expect(endsWith('test', 'st')).toBe(true);
      expect(endsWith('test', 'te')).toBe(false);
    });

    test('should count character occurrences', () => {
      expect(countChar('hello', 'l')).toBe(2);
      expect(countChar('hello', 'h')).toBe(1);
      expect(countChar('hello', 'x')).toBe(0);
      expect(countChar('aaaaaa', 'a')).toBe(6);
    });
  });

  // ==== STRING TRANSFORMATION ====

  describe('String Transformation', () => {
    test('should convert to uppercase', () => {
      expect(toUpperCase('hello')).toBe('HELLO');
      expect(toUpperCase('Hello World')).toBe('HELLO WORLD');
      expect(toUpperCase('ALREADY UPPER')).toBe('ALREADY UPPER');
    });

    test('should convert to lowercase', () => {
      expect(toLowerCase('HELLO')).toBe('hello');
      expect(toLowerCase('Hello World')).toBe('hello world');
      expect(toLowerCase('already lower')).toBe('already lower');
    });

    test('should trim whitespace', () => {
      expect(trimString('  hello  ')).toBe('hello');
      expect(trimString('hello')).toBe('hello');
      expect(trimString('  hello')).toBe('hello');
      expect(trimString('hello  ')).toBe('hello');
    });

    test('should replace all occurrences', () => {
      expect(replaceAll('hello world hello', 'hello', 'hi')).toBe(
        'hi world hi'
      );
      expect(replaceAll('abc abc abc', 'abc', 'xyz')).toBe('xyz xyz xyz');
      expect(replaceAll('test', 'xyz', 'abc')).toBe('test');
    });

    test('should split string by delimiter', () => {
      expect(splitString('a,b,c', ',')).toEqual(['a', 'b', 'c']);
      expect(splitString('hello world', ' ')).toEqual(['hello', 'world']);
      expect(splitString('one-two-three', '-')).toEqual([
        'one',
        'two',
        'three'
      ]);
    });

    test('you should be able to reverse a string', () => {
      expect(reverseString('abcd')).toEqual('dcba');
      expect(reverseString('  abcd')).toEqual('dcba  ');
    });

    test('you should be able to capitalise words in a string', () => {
      expect(capitalize('hi there, how is it going?')).toEqual(
        'Hi There, How Is It Going?'
      );
      expect(capitalize('i love breakfast at bill miller bbq')).toEqual(
        'I Love Breakfast At Bill Miller Bbq'
      );
    });
  });

  // ==== STRING VALIDATION ====

  describe('String Validation', () => {
    test('should check if string is empty or whitespace', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t\n ')).toBe(true);
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' hello ')).toBe(false);
    });

    test('should check if string is numeric', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('12.3')).toBe(false);
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('12a')).toBe(false);
    });

    test('should check if string is alphabetic', () => {
      expect(isAlpha('hello')).toBe(true);
      expect(isAlpha('HELLO')).toBe(true);
      expect(isAlpha('hello123')).toBe(false);
      expect(isAlpha('hello world')).toBe(false);
      expect(isAlpha('hello!')).toBe(false);
    });

    test('should check if string is alphanumeric', () => {
      expect(isAlphaNumeric('hello123')).toBe(true);
      expect(isAlphaNumeric('ABC123')).toBe(true);
      expect(isAlphaNumeric('hello')).toBe(true);
      expect(isAlphaNumeric('123')).toBe(true);
      expect(isAlphaNumeric('hello 123')).toBe(false);
      expect(isAlphaNumeric('hello!')).toBe(false);
    });

    test('should validate email format', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user@domain.org')).toBe(true);
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
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
  });

  // ==== STRING COMPARISON ====

  describe('String Comparison', () => {
    test('should compare strings case-sensitive', () => {
      expect(compareStrings('abc', 'abc')).toBe(0);
      expect(compareStrings('abc', 'def')).toBeLessThan(0);
      expect(compareStrings('def', 'abc')).toBeGreaterThan(0);
      expect(compareStrings('Apple', 'apple')).toBeLessThan(0);
    });

    test('should compare strings ignoring case', () => {
      expect(compareIgnoreCase('Hello', 'hello')).toBe(0);
      expect(compareIgnoreCase('HELLO', 'hello')).toBe(0);
      expect(compareIgnoreCase('ABC', 'def')).toBeLessThan(0);
      expect(compareIgnoreCase('DEF', 'abc')).toBeGreaterThan(0);
    });

    test('you should be able to check for anagrams', () => {
      // expect(anagrams("hello", "llohe")).toBeTruthy();
      expect(anagrams('Whoa! Hi!', 'Hi! Whoa!')).toBeTruthy();
      expect(anagrams('One One', 'Two two two')).toBeFalsy();
      expect(anagrams('One one', 'One one c')).toBeFalsy();
      expect(
        anagrams('A tree, a life, a bench', 'A tree, a fence, a yard')
      ).toBeFalsy();
    });
  });

  // ==== STRING PARSING ====

  describe('String Parsing', () => {
    test('should parse integer from string', () => {
      expect(parseInteger('123')).toBe(123);
      expect(parseInteger('-456')).toBe(-456);
      expect(parseInteger('0')).toBe(0);
      expect(isNaN(parseInteger('abc'))).toBe(true);
      expect(isNaN(parseInteger('12.3'))).toBe(true);
    });

    test('should parse float from string', () => {
      expect(parseFloatNumber('123.45')).toBe(123.45);
      expect(parseFloatNumber('-456.78')).toBe(-456.78);
      expect(parseFloatNumber('123')).toBe(123);
      expect(isNaN(parseFloatNumber('abc'))).toBe(true);
    });

    test('should parse CSV string', () => {
      expect(parseCSV('a,b,c')).toEqual(['a', 'b', 'c']);
      expect(parseCSV('hello, world, test')).toEqual([
        'hello',
        'world',
        'test'
      ]);
      expect(parseCSV('one')).toEqual(['one']);
    });

    test('should extract words from string', () => {
      expect(extractWords('hello world! 123')).toEqual(['hello', 'world']);
      expect(extractWords('one-two three')).toEqual(['one', 'two', 'three']);
      expect(extractWords('test123')).toEqual(['test']);
    });
  });

  // ==== ADVANCED STRING OPERATIONS ====

  describe('Advanced String Operations', () => {
    test('should pad string on the left', () => {
      expect(padLeft('123', 5)).toBe('  123');
      expect(padLeft('hello', 3)).toBe('hello');
      expect(padLeft('', 3)).toBe('   ');
    });

    test('should pad string on the right', () => {
      expect(padRight('123', 5)).toBe('123  ');
      expect(padRight('hello', 3)).toBe('hello');
      expect(padRight('', 3)).toBe('   ');
    });

    test('should convert to title case', () => {
      expect(titleCase('hello WORLD')).toBe('Hello world');
      expect(titleCase('javaScript')).toBe('Javascript');
      expect(titleCase('HELLO')).toBe('Hello');
      expect(titleCase('hello')).toBe('Hello');
    });

    test('should remove vowels', () => {
      expect(removeVowels('hello world')).toBe('hll wrld');
      expect(removeVowels('aeiou')).toBe('');
      expect(removeVowels('bcdfg')).toBe('bcdfg');
      expect(removeVowels('HELLO')).toBe('HLL');
    });

    test('should reverse word order', () => {
      expect(reverseWords('hello world')).toBe('world hello');
      expect(reverseWords('one two three')).toBe('three two one');
      expect(reverseWords('single')).toBe('single');
    });

    test('should check for unique characters', () => {
      expect(hasUniqueChars('hello')).toBe(false);
      expect(hasUniqueChars('world')).toBe(true);
      expect(hasUniqueChars('abc')).toBe(true);
      expect(hasUniqueChars('aab')).toBe(false);
    });

    test('you should be able to find the most used character in a string', () => {
      expect(maxChar('abcdefghijklmnaaaaa')).toEqual('a');
      expect(maxChar('ab1c1d1e1f1g1')).toEqual('1');
      expect(maxChar('a')).toEqual('a');
    });

    test('you should be able to return the number of vowels used in a string', () => {
      expect(vowels('aeiou')).toEqual(5);
      expect(vowels('abcdefghijklmnopqrstuvwxyz')).toEqual(5);
      expect(vowels('bcdfghjkl')).toEqual(0);
    });
  });
});
