import { describe, it, expect } from 'vitest';
import {
  isAllDigits,
  extractNumbers,
  isValidEmail,
  isValidPhone,
  extractWords,
  normalizeWhitespace,
  countVowels,
  startsWithCapital,
  extractHashtags,
  isStrongPassword,
  stripHtmlTags,
  findUrls,
  camelToSnake,
  isValidHexColor,
  extractDomain,
  replaceWord,
  findRepeatedWords,
  isValidDate,
  hasDigitLookahead,
  wordsNotFollowedByDigit
} from '../exercises/regex.js';

describe('Regular Expression Exercises', () => {
  describe('isAllDigits', () => {
    it('should return true for strings with only digits', () => {
      expect(isAllDigits('12345')).toBe(true);
      expect(isAllDigits('0')).toBe(true);
      expect(isAllDigits('999')).toBe(true);
    });

    it('should return false for strings with non-digits', () => {
      expect(isAllDigits('123a5')).toBe(false);
      expect(isAllDigits('12.34')).toBe(false);
      expect(isAllDigits('hello')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isAllDigits('')).toBe(false);
    });

    it('should return false for strings with spaces', () => {
      expect(isAllDigits('123 456')).toBe(false);
    });
  });

  describe('extractNumbers', () => {
    it('should extract all numbers from a string', () => {
      expect(extractNumbers('There are 3 cats and 5 dogs')).toEqual(['3', '5']);
      expect(extractNumbers('Price: $99.99')).toEqual(['99', '99']);
    });

    it('should handle strings with no numbers', () => {
      expect(extractNumbers('No numbers here')).toEqual([]);
    });

    it('should extract multiple digit numbers', () => {
      expect(extractNumbers('Year 2023 and day 31')).toEqual(['2023', '31']);
    });

    it('should handle consecutive numbers', () => {
      expect(extractNumbers('123 456 789')).toEqual(['123', '456', '789']);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.com')).toBe(true);
      expect(isValidEmail('user_name@example.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('invalid.com')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });

    it('should reject emails without domain extension', () => {
      expect(isValidEmail('user@domain')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone formats', () => {
      expect(isValidPhone('(123) 456-7890')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
      expect(isValidPhone('1234567890')).toBe(true);
    });

    it('should reject invalid phone formats', () => {
      expect(isValidPhone('12-345-6789')).toBe(false);
      expect(isValidPhone('123-45-6789')).toBe(false);
      expect(isValidPhone('12345')).toBe(false);
    });

    it('should handle phone with parentheses without space', () => {
      expect(isValidPhone('(123)456-7890')).toBe(true);
    });
  });

  describe('extractWords', () => {
    it('should extract all words from a string', () => {
      expect(extractWords('Hello, world! How are you?')).toEqual([
        'Hello',
        'world',
        'How',
        'are',
        'you'
      ]);
    });

    it('should handle strings with numbers', () => {
      expect(extractWords('Test123 and test456')).toEqual([
        'Test123',
        'and',
        'test456'
      ]);
    });

    it('should return empty array for strings with no words', () => {
      expect(extractWords('!!!')).toEqual([]);
    });

    it('should handle underscores as part of words', () => {
      expect(extractWords('my_variable and your_variable')).toEqual([
        'my_variable',
        'and',
        'your_variable'
      ]);
    });
  });

  describe('normalizeWhitespace', () => {
    it('should replace multiple spaces with single space', () => {
      expect(normalizeWhitespace('Hello    world')).toBe('Hello world');
    });

    it('should replace tabs and newlines with space', () => {
      expect(normalizeWhitespace('Hello\n\tworld')).toBe('Hello world');
    });

    it('should trim leading and trailing whitespace', () => {
      expect(normalizeWhitespace('  Hello world  ')).toBe('Hello world');
    });

    it('should handle mixed whitespace', () => {
      expect(normalizeWhitespace('Hello    world\n\ttest')).toBe(
        'Hello world test'
      );
    });
  });

  describe('countVowels', () => {
    it('should count vowels in a string', () => {
      expect(countVowels('Hello World')).toBe(3);
      expect(countVowels('aEiOu')).toBe(5);
    });

    it('should be case-insensitive', () => {
      expect(countVowels('AEIOU')).toBe(5);
      expect(countVowels('aeiou')).toBe(5);
    });

    it('should return 0 for strings with no vowels', () => {
      expect(countVowels('bcdfg')).toBe(0);
      expect(countVowels('123')).toBe(0);
    });

    it('should handle empty string', () => {
      expect(countVowels('')).toBe(0);
    });
  });

  describe('startsWithCapital', () => {
    it('should return true for strings starting with capital', () => {
      expect(startsWithCapital('Hello')).toBe(true);
      expect(startsWithCapital('World')).toBe(true);
    });

    it('should return false for strings starting with lowercase', () => {
      expect(startsWithCapital('hello')).toBe(false);
      expect(startsWithCapital('world')).toBe(false);
    });

    it('should return false for strings starting with numbers', () => {
      expect(startsWithCapital('123abc')).toBe(false);
    });

    it('should return false for strings starting with special characters', () => {
      expect(startsWithCapital('!hello')).toBe(false);
    });
  });

  describe('extractHashtags', () => {
    it('should extract hashtags from a string', () => {
      expect(extractHashtags('Love #javascript and #coding! #dev')).toEqual([
        '#javascript',
        '#coding',
        '#dev'
      ]);
    });

    it('should handle strings with no hashtags', () => {
      expect(extractHashtags('No hashtags here')).toEqual([]);
    });

    it('should handle consecutive hashtags', () => {
      expect(extractHashtags('#one#two#three')).toEqual([
        '#one',
        '#two',
        '#three'
      ]);
    });

    it('should handle hashtags with numbers', () => {
      expect(extractHashtags('#web3 and #tech2023')).toEqual([
        '#web3',
        '#tech2023'
      ]);
    });
  });

  describe('isStrongPassword', () => {
    it('should validate strong passwords', () => {
      expect(isStrongPassword('Pass123word')).toBe(true);
      expect(isStrongPassword('Secure1Pass')).toBe(true);
      expect(isStrongPassword('MyP@ss123')).toBe(true);
    });

    it('should reject passwords without uppercase', () => {
      expect(isStrongPassword('password123')).toBe(false);
    });

    it('should reject passwords without lowercase', () => {
      expect(isStrongPassword('PASSWORD123')).toBe(false);
    });

    it('should reject passwords without digits', () => {
      expect(isStrongPassword('Password')).toBe(false);
    });

    it('should reject passwords shorter than 8 characters', () => {
      expect(isStrongPassword('Pass12')).toBe(false);
    });
  });

  describe('stripHtmlTags', () => {
    it('should remove HTML tags', () => {
      expect(stripHtmlTags('<p>Hello <strong>world</strong></p>')).toBe(
        'Hello world'
      );
      expect(stripHtmlTags('<div>Test</div>')).toBe('Test');
    });

    it('should handle nested tags', () => {
      expect(stripHtmlTags('<div><p><span>Text</span></p></div>')).toBe('Text');
    });

    it('should handle self-closing tags', () => {
      expect(stripHtmlTags('Line1<br/>Line2')).toBe('Line1Line2');
    });

    it('should handle strings without tags', () => {
      expect(stripHtmlTags('Plain text')).toBe('Plain text');
    });
  });

  describe('findUrls', () => {
    it('should find URLs in a string', () => {
      expect(findUrls('Visit https://example.com and http://test.com')).toEqual(
        ['https://example.com', 'http://test.com']
      );
    });

    it('should handle strings with no URLs', () => {
      expect(findUrls('No URLs here')).toEqual([]);
    });

    it('should find URLs with paths', () => {
      const result = findUrls('Check https://example.com/path/to/page');
      expect(result.length).toBe(1);
      expect(result[0]).toContain('https://example.com/path/to/page');
    });

    it('should handle multiple URLs', () => {
      const result = findUrls(
        'https://one.com https://two.com https://three.com'
      );
      expect(result.length).toBe(3);
    });
  });

  describe('camelToSnake', () => {
    it('should convert camelCase to snake_case', () => {
      expect(camelToSnake('camelCaseString')).toBe('camel_case_string');
      expect(camelToSnake('myVariableName')).toBe('my_variable_name');
    });

    it('should handle single words', () => {
      expect(camelToSnake('hello')).toBe('hello');
    });

    it('should handle multiple capital letters', () => {
      expect(camelToSnake('getHTMLElement')).toBe('get_h_t_m_l_element');
    });

    it('should handle already lowercase strings', () => {
      expect(camelToSnake('lowercase')).toBe('lowercase');
    });
  });

  describe('isValidHexColor', () => {
    it('should validate 3-digit hex colors', () => {
      expect(isValidHexColor('#FFF')).toBe(true);
      expect(isValidHexColor('#000')).toBe(true);
      expect(isValidHexColor('#abc')).toBe(true);
    });

    it('should validate 6-digit hex colors', () => {
      expect(isValidHexColor('#FFFFFF')).toBe(true);
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#AbCdEf')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isValidHexColor('#GGG')).toBe(false);
      expect(isValidHexColor('FFF')).toBe(false);
      expect(isValidHexColor('#FF')).toBe(false);
      expect(isValidHexColor('#FFFFFFF')).toBe(false);
    });
  });

  describe('extractDomain', () => {
    it('should extract domain from email', () => {
      expect(extractDomain('user@example.com')).toBe('example.com');
      expect(extractDomain('john.doe@mail.co.uk')).toBe('mail.co.uk');
    });

    it('should handle subdomains', () => {
      expect(extractDomain('user@mail.google.com')).toBe('mail.google.com');
    });

    it('should return null for invalid emails', () => {
      expect(extractDomain('notanemail')).toBeNull();
    });
  });

  describe('replaceWord', () => {
    it('should replace word case-insensitively', () => {
      expect(replaceWord('The cat and the Cat', 'cat', 'dog')).toBe(
        'The dog and the dog'
      );
    });

    it('should replace all occurrences', () => {
      expect(replaceWord('test test test', 'test', 'exam')).toBe(
        'exam exam exam'
      );
    });

    it('should handle different cases', () => {
      expect(replaceWord('Hello HELLO hello', 'hello', 'hi')).toBe('hi hi hi');
    });
  });

  describe('findRepeatedWords', () => {
    it('should find repeated consecutive words', () => {
      expect(findRepeatedWords('the quick quick brown fox fox')).toEqual([
        'quick',
        'fox'
      ]);
    });

    it('should return empty array for no repeats', () => {
      expect(findRepeatedWords('no repeated words here')).toEqual([]);
    });

    it('should handle single repeated word', () => {
      expect(findRepeatedWords('the the end')).toEqual(['the']);
    });

    it('should handle multiple spaces between words', () => {
      expect(findRepeatedWords('word  word')).toEqual([]);
    });
  });

  describe('isValidDate', () => {
    it('should validate correct date format', () => {
      expect(isValidDate('2023-12-31')).toBe(true);
      expect(isValidDate('2023-01-01')).toBe(true);
      expect(isValidDate('2023-06-15')).toBe(true);
    });

    it('should reject invalid month', () => {
      expect(isValidDate('2023-13-01')).toBe(false);
      expect(isValidDate('2023-00-01')).toBe(false);
    });

    it('should reject invalid day', () => {
      expect(isValidDate('2023-12-32')).toBe(false);
      expect(isValidDate('2023-12-00')).toBe(false);
    });

    it('should reject wrong format', () => {
      expect(isValidDate('23-12-31')).toBe(false);
      expect(isValidDate('2023/12/31')).toBe(false);
      expect(isValidDate('31-12-2023')).toBe(false);
    });
  });

  describe('hasDigitLookahead', () => {
    it('should return true when string contains a digit', () => {
      expect(hasDigitLookahead('pass123')).toBe(true);
      expect(hasDigitLookahead('1password')).toBe(true);
      expect(hasDigitLookahead('pass1word')).toBe(true);
    });

    it('should return false when string has no digits', () => {
      expect(hasDigitLookahead('password')).toBe(false);
      expect(hasDigitLookahead('abcdef')).toBe(false);
    });

    it('should work with lookahead (not consume characters)', () => {
      expect(hasDigitLookahead('abc')).toBe(false);
      expect(hasDigitLookahead('a1bc')).toBe(true);
    });
  });

  describe('wordsNotFollowedByDigit', () => {
    it('should match words not followed by a digit', () => {
      const result = wordsNotFollowedByDigit('test hello2 world test3');
      expect(result).toContain('test');
      expect(result).toContain('world');
      expect(result).not.toContain('hello2');
      expect(result).not.toContain('test3');
    });

    it('should handle strings with no digits', () => {
      const result = wordsNotFollowedByDigit('all words here');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty array when all words followed by digits', () => {
      const result = wordsNotFollowedByDigit('word1 word2 word3');
      expect(result).toEqual([]);
    });
  });
});
