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
  // TODO: Test if string contains only digits
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
  // TODO: Extract all numbers from string
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
  // TODO: Validate email format
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
  // TODO: Validate phone number format
}

/**
 * Write a function that extracts all words from a string.
 * Words are sequences of alphanumeric characters.
 *
 * extractWords('Hello, world! How are you?')
 * // returns ['Hello', 'world', 'How', 'are', 'you']
 */
export function extractWords(str) {
  // TODO: Extract all words
}

/**
 * Write a function that replaces all whitespace with a single space.
 *
 * normalizeWhitespace('Hello    world\n\ttest')
 * // returns 'Hello world test'
 */
export function normalizeWhitespace(str) {
  // TODO: Replace all whitespace with single space
}

/**
 * Write a function that counts vowels in a string (case-insensitive).
 *
 * countVowels('Hello World') // returns 3
 * countVowels('aEiOu') // returns 5
 */
export function countVowels(str) {
  // TODO: Count vowels in string
}

/**
 * Write a function that checks if a string starts with a capital letter.
 *
 * startsWithCapital('Hello') // returns true
 * startsWithCapital('hello') // returns false
 * startsWithCapital('123abc') // returns false
 */
export function startsWithCapital(str) {
  // TODO: Check if starts with capital letter
}

/**
 * Write a function that extracts hashtags from a string.
 * Hashtags start with # and contain alphanumeric characters.
 *
 * extractHashtags('Love #javascript and #coding! #dev')
 * // returns ['#javascript', '#coding', '#dev']
 */
export function extractHashtags(str) {
  // TODO: Extract hashtags
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
  // TODO: Validate password strength
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
  // TODO: Remove HTML tags
}

/**
 * Write a function that finds all URLs in a string.
 * Match http:// and https:// URLs.
 *
 * findUrls('Visit https://example.com and http://test.com')
 * // returns ['https://example.com', 'http://test.com']
 */
export function findUrls(text) {
  // TODO: Find all URLs
}

/**
 * Write a function that converts camelCase to snake_case.
 *
 * camelToSnake('camelCaseString') // returns 'camel_case_string'
 * camelToSnake('myVariableName') // returns 'my_variable_name'
 */
export function camelToSnake(str) {
  // TODO: Convert camelCase to snake_case
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
  // TODO: Validate hex color code
}

/**
 * Write a function that extracts the domain from an email address.
 *
 * extractDomain('user@example.com') // returns 'example.com'
 * extractDomain('john.doe@mail.co.uk') // returns 'mail.co.uk'
 */
export function extractDomain(email) {
  // TODO: Extract domain from email
}

/**
 * Write a function that replaces all occurrences of a word (case-insensitive).
 *
 * replaceWord('The cat and the Cat', 'cat', 'dog')
 * // returns 'The dog and the dog'
 */
export function replaceWord(text, oldWord, newWord) {
  // TODO: Replace word case-insensitively
}

/**
 * Write a function that finds all repeated words in a string.
 *
 * findRepeatedWords('the quick quick brown fox fox')
 * // returns ['quick', 'fox']
 */
export function findRepeatedWords(text) {
  // TODO: Find repeated consecutive words
}

/**
 * Write a function that validates a date in YYYY-MM-DD format.
 *
 * isValidDate('2023-12-31') // returns true
 * isValidDate('2023-13-01') // returns false (invalid month)
 * isValidDate('23-12-31') // returns false (wrong format)
 */
export function isValidDate(dateStr) {
  // TODO: Validate date format
}

/**
 * Write a function using positive lookahead.
 * Check if password contains a digit without consuming it.
 *
 * hasDigitLookahead('pass123') // returns true
 * hasDigitLookahead('password') // returns false
 */
export function hasDigitLookahead(str) {
  // TODO: Use positive lookahead to check for digit
}

/**
 * Write a function using negative lookahead.
 * Match words not followed by a digit.
 *
 * wordsNotFollowedByDigit('test hello2 world test3')
 * // returns ['test', 'world']
 */
export function wordsNotFollowedByDigit(str) {
  // TODO: Use negative lookahead
}
