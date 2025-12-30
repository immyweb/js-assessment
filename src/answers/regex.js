/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on fundamental Regular Expression concepts
 * including pattern matching, character classes, quantifiers, groups,
 * and common regex operations.
 */

/**
 * Write a function that tests if a string contains only digits.
 *
 * isAllDigits('12345') // returns true
 * isAllDigits('123a5') // returns false
 * isAllDigits('') // returns false
 */
export function isAllDigits(str) {
  return /^\d+$/.test(str);
}

/**
 * Write a function that extracts all numbers from a string.
 *
 * extractNumbers('There are 3 cats and 5 dogs')
 * // returns ['3', '5']
 *
 * extractNumbers('Price: $99.99')
 * // returns ['99', '99']
 */
export function extractNumbers(str) {
  const matches = str.match(/\d+/g);
  return matches || [];
}

/**
 * Write a function that validates a simple email format.
 * Accept: alphanumeric + dots/underscores before @, domain with dot.
 *
 * isValidEmail('user@example.com') // returns true
 * isValidEmail('user.name@example.com') // returns true
 * isValidEmail('invalid@') // returns false
 * isValidEmail('invalid.com') // returns false
 */
export function isValidEmail(email) {
  return /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Write a function that validates a US phone number.
 * Accept formats: (123) 456-7890, 123-456-7890, 1234567890
 *
 * isValidPhone('(123) 456-7890') // returns true
 * isValidPhone('123-456-7890') // returns true
 * isValidPhone('1234567890') // returns true
 * isValidPhone('12-345-6789') // returns false
 */
export function isValidPhone(phone) {
  return /^(\(\d{3}\)\s?|\d{3}-?)?\d{3}-?\d{4}$/.test(phone);
}

/**
 * Write a function that extracts all words from a string.
 * Words are sequences of alphanumeric characters.
 *
 * extractWords('Hello, world! How are you?')
 * // returns ['Hello', 'world', 'How', 'are', 'you']
 */
export function extractWords(str) {
  const matches = str.match(/\w+/g);
  return matches || [];
}

/**
 * Write a function that replaces all whitespace with a single space.
 *
 * normalizeWhitespace('Hello    world\n\ttest')
 * // returns 'Hello world test'
 */
export function normalizeWhitespace(str) {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Write a function that counts vowels in a string (case-insensitive).
 *
 * countVowels('Hello World') // returns 3
 * countVowels('aEiOu') // returns 5
 */
export function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

/**
 * Write a function that checks if a string starts with a capital letter.
 *
 * startsWithCapital('Hello') // returns true
 * startsWithCapital('hello') // returns false
 * startsWithCapital('123abc') // returns false
 */
export function startsWithCapital(str) {
  return /^[A-Z]/.test(str);
}

/**
 * Write a function that extracts hashtags from a string.
 * Hashtags start with # and contain alphanumeric characters.
 *
 * extractHashtags('Love #javascript and #coding! #dev')
 * // returns ['#javascript', '#coding', '#dev']
 */
export function extractHashtags(str) {
  const matches = str.match(/#\w+/g);
  return matches || [];
}

/**
 * Write a function that validates a strong password.
 * Must contain: at least 8 chars, one uppercase, one lowercase, one digit.
 *
 * isStrongPassword('Pass123word') // returns true
 * isStrongPassword('password') // returns false
 * isStrongPassword('PASS123') // returns false
 */
export function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

/**
 * Write a function that removes all HTML tags from a string.
 *
 * stripHtmlTags('<p>Hello <strong>world</strong></p>')
 * // returns 'Hello world'
 *
 * stripHtmlTags('<div>Test</div>')
 * // returns 'Test'
 */
export function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Write a function that finds all URLs in a string.
 * Match http:// and https:// URLs.
 *
 * findUrls('Visit https://example.com and http://test.com')
 * // returns ['https://example.com', 'http://test.com']
 */
export function findUrls(text) {
  const matches = text.match(/https?:\/\/[^\s]+/g);
  return matches || [];
}

/**
 * Write a function that converts camelCase to snake_case.
 *
 * camelToSnake('camelCaseString') // returns 'camel_case_string'
 * camelToSnake('myVariableName') // returns 'my_variable_name'
 */
export function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Write a function that validates a hex color code.
 * Accept #RGB or #RRGGBB format.
 *
 * isValidHexColor('#FFF') // returns true
 * isValidHexColor('#FFFFFF') // returns true
 * isValidHexColor('#GGG') // returns false
 * isValidHexColor('FFF') // returns false
 */
export function isValidHexColor(color) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

/**
 * Write a function that extracts the domain from an email address.
 *
 * extractDomain('user@example.com') // returns 'example.com'
 * extractDomain('john.doe@mail.co.uk') // returns 'mail.co.uk'
 */
export function extractDomain(email) {
  const match = email.match(/@(.+)$/);
  return match ? match[1] : null;
}

/**
 * Write a function that replaces all occurrences of a word (case-insensitive).
 *
 * replaceWord('The cat and the Cat', 'cat', 'dog')
 * // returns 'The dog and the dog'
 */
export function replaceWord(text, oldWord, newWord) {
  const regex = new RegExp(oldWord, 'gi');
  return text.replace(regex, newWord);
}

/**
 * Write a function that finds all repeated words in a string.
 *
 * findRepeatedWords('the quick quick brown fox fox')
 * // returns ['quick', 'fox']
 */
export function findRepeatedWords(text) {
  const matches = text.match(/\b(\w+)\s+\1\b/g);
  if (!matches) return [];

  return matches.map((match) => match.split(/\s+/)[0]);
}

/**
 * Write a function that validates a date in YYYY-MM-DD format.
 *
 * isValidDate('2023-12-31') // returns true
 * isValidDate('2023-13-01') // returns false (invalid month)
 * isValidDate('23-12-31') // returns false (wrong format)
 */
export function isValidDate(dateStr) {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;

  const [, year, month, day] = match;
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  return monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31;
}

/**
 * Write a function using positive lookahead.
 * Check if password contains a digit without consuming it.
 *
 * hasDigitLookahead('pass123') // returns true
 * hasDigitLookahead('password') // returns false
 */
export function hasDigitLookahead(str) {
  return /(?=.*\d)/.test(str);
}

/**
 * Write a function using negative lookahead.
 * Match words not followed by a digit.
 *
 * wordsNotFollowedByDigit('test hello2 world test3')
 * // returns ['test', 'world']
 */
export function wordsNotFollowedByDigit(str) {
  const matches = str.match(/\b\w+\b(?!\d)/g);
  if (!matches) return [];

  // Filter out words that are followed by digits
  return matches.filter((word) => {
    const index = str.indexOf(word);
    const nextChar = str[index + word.length];
    return !nextChar || !/\d/.test(nextChar);
  });
}
