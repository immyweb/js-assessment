/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises cover fundamental string concepts including creation,
 * access, manipulation, search, validation, and transformation.
 */

// ==== STRING CREATION AND BASIC OPERATIONS ====

// Given a string, return its length
// Example:
//   getLength('hello') === 5
//   getLength('') === 0
export function getLength(str) {}

// Given two strings, return them concatenated together
// Example:
//   concatStrings('hello', 'world') === 'helloworld'
//   concatStrings('foo', 'bar') === 'foobar'
export function concatStrings(str1, str2) {}

// Given a string and a number, repeat the string n times
// Example:
//   repeatString('hi', 3) === 'hihihi'
//   repeatString('x', 5) === 'xxxxx'
export function repeatString(str, n) {}

// Given an array of characters, join them into a string
// Example:
//   joinChars(['h', 'e', 'l', 'l', 'o']) === 'hello'
//   joinChars(['a', 'b', 'c']) === 'abc'
export function joinChars(chars) {}

// ==== STRING ACCESS AND EXTRACTION ====

// Given a string and an index, return the character at that position
// Return undefined for invalid indices
// Example:
//   getCharAt('hello', 1) === 'e'
//   getCharAt('hello', 10) === undefined
export function getCharAt(str, index) {}

// Given a string, return the first character
// Example:
//   getFirstChar('hello') === 'h'
//   getFirstChar('') === undefined
export function getFirstChar(str) {}

// Given a string, return the last character
// Example:
//   getLastChar('hello') === 'o'
//   getLastChar('') === undefined
export function getLastChar(str) {}

// Given a string, start index, and end index, return the substring
// Example:
//   getSubstring('hello world', 0, 5) === 'hello'
//   getSubstring('hello world', 6, 11) === 'world'
export function getSubstring(str, start, end) {}

// Given a string and length, return the first n characters
// Example:
//   getFirstN('hello world', 5) === 'hello'
//   getFirstN('abc', 10) === 'abc'
export function getFirstN(str, n) {}

// Given a string and length, return the last n characters
// Example:
//   getLastN('hello world', 5) === 'world'
//   getLastN('abc', 10) === 'abc'
export function getLastN(str, n) {}

// ==== STRING SEARCH AND FINDING ====

// Given a string and a substring, return the index of first occurrence
// Return -1 if not found
// Example:
//   findIndex('hello world', 'world') === 6
//   findIndex('hello world', 'xyz') === -1
export function findIndex(str, searchStr) {}

// Given a string and a substring, check if the string contains it
// Example:
//   contains('hello world', 'world') === true
//   contains('hello world', 'xyz') === false
export function contains(str, searchStr) {}

// Given a string and a substring, check if string starts with it
// Example:
//   startsWith('hello world', 'hello') === true
//   startsWith('hello world', 'world') === false
export function startsWith(str, prefix) {}

// Given a string and a substring, check if string ends with it
// Example:
//   endsWith('hello world', 'world') === true
//   endsWith('hello world', 'hello') === false
export function endsWith(str, suffix) {}

// Given a string and a character, count how many times it appears
// Example:
//   countChar('hello', 'l') === 2
//   countChar('hello', 'x') === 0
export function countChar(str, char) {}

// ==== STRING TRANSFORMATION ====

// Given a string, return it in uppercase
// Example:
//   toUpperCase('hello') === 'HELLO'
//   toUpperCase('Hello World') === 'HELLO WORLD'
export function toUpperCase(str) {}

// Given a string, return it in lowercase
// Example:
//   toLowerCase('HELLO') === 'hello'
//   toLowerCase('Hello World') === 'hello world'
export function toLowerCase(str) {}

// Given a string, remove whitespace from both ends
// Example:
//   trimString('  hello  ') === 'hello'
//   trimString('hello') === 'hello'
export function trimString(str) {}

// Given a string, old substring, and new substring, replace all occurrences
// Example:
//   replaceAll('hello world hello', 'hello', 'hi') === 'hi world hi'
//   replaceAll('abc abc abc', 'abc', 'xyz') === 'xyz xyz xyz'
export function replaceAll(str, oldStr, newStr) {}

// Given a string and a delimiter, split into an array
// Example:
//   splitString('a,b,c', ',') === ['a', 'b', 'c']
//   splitString('hello world', ' ') === ['hello', 'world']
export function splitString(str, delimiter) {}

// Given a string, return a new string with the reversed order of characters
// Example:
//   reverseString('apple') === 'leppa'
//   reverseString('hello') === 'olleh'
//   reverseString('Greetings!') === '!sgniteerG'
export function reverseString(str) {}

// Write a function that accepts a string. The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// Example:
//   capitalize('a short sentence') === 'A Short Sentence'
//   capitalize('a lazy fox') === 'A Lazy Fox'
//   capitalize('look, it is working!') === 'Look, It Is Working!'
export function capitalize(str) {}

// ==== STRING VALIDATION ====

// Given a string, check if it's empty or contains only whitespace
// Example:
//   isEmpty('') === true
//   isEmpty('   ') === true
//   isEmpty('hello') === false
export function isEmpty(str) {}

// Given a string, check if it contains only digits
// Example:
//   isNumeric('123') === true
//   isNumeric('12.3') === false
//   isNumeric('abc') === false
export function isNumeric(str) {}

// Given a string, check if it contains only letters
// Example:
//   isAlpha('hello') === true
//   isAlpha('hello123') === false
//   isAlpha('hello world') === false
export function isAlpha(str) {}

// Given a string, check if it contains only letters and numbers
// Example:
//   isAlphaNumeric('hello123') === true
//   isAlphaNumeric('hello 123') === false
//   isAlphaNumeric('hello!') === false
export function isAlphaNumeric(str) {}

// Given a string, check if it's a valid email format (simple check)
// Example:
//   isValidEmail('test@example.com') === true
//   isValidEmail('invalid.email') === false
export function isValidEmail(str) {}

// Given a string, return true if the string is a palindrome
// or false if it is not. Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// Example:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false
export function palindrome(str) {}

// ==== STRING COMPARISON ====

// Given two strings, compare them (case-sensitive)
// Return 0 if equal, negative if first < second, positive if first > second
// Example:
//   compareStrings('abc', 'abc') === 0
//   compareStrings('abc', 'def') < 0
//   compareStrings('def', 'abc') > 0
export function compareStrings(str1, str2) {}

// Given two strings, compare them ignoring case
// Example:
//   compareIgnoreCase('Hello', 'hello') === 0
//   compareIgnoreCase('ABC', 'def') < 0
export function compareIgnoreCase(str1, str2) {}

// Check to see if two provided strings are anagrams of each other.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces.
// Consider capital letters to be the same as lower case
// Example:
//   anagrams('rail safety', 'fairy tales') === true
//   anagrams('RAIL SAFETY', 'fairy tales') === true
//   anagrams('Hi there', 'Bye there') === false
export function anagrams(stringA, stringB) {}

// ==== STRING PARSING ====

// Given a string representation of a number, convert to integer
// Return NaN if not a valid number
// Example:
//   parseInteger('123') === 123
//   parseInteger('abc') === NaN
export function parseInteger(str) {}

// Given a string representation of a number, convert to float
// Example:
//   parseFloat('123.45') === 123.45
//   parseFloat('abc') === NaN
export function parseFloatNumber(str) {}

// Given a comma-separated string, return array of trimmed values
// Example:
//   parseCSV('a,b,c') === ['a', 'b', 'c']
//   parseCSV('hello, world, test') === ['hello', 'world', 'test']
export function parseCSV(str) {}

// Given a string, extract all words (sequences of letters)
// Example:
//   extractWords('hello world! 123') === ['hello', 'world']
//   extractWords('one-two three') === ['one', 'two', 'three']
export function extractWords(str) {}

// ==== ADVANCED STRING OPERATIONS ====

// Given a string and target length, pad with spaces on the left
// Example:
//   padLeft('123', 5) === '  123'
//   padLeft('hello', 3) === 'hello'
export function padLeft(str, length) {}

// Given a string and target length, pad with spaces on the right
// Example:
//   padRight('123', 5) === '123  '
//   padRight('hello', 3) === 'hello'
export function padRight(str, length) {}

// Given a string, return it with first letter capitalized, rest lowercase
// Example:
//   titleCase('hello WORLD') === 'Hello world'
//   titleCase('javaScript') === 'Javascript'
export function titleCase(str) {}

// Given a string, remove all vowels
// Example:
//   removeVowels('hello world') === 'hll wrld'
//   removeVowels('aeiou') === ''
export function removeVowels(str) {}

// Given a string, reverse the order of words
// Example:
//   reverseWords('hello world') === 'world hello'
//   reverseWords('one two three') === 'three two one'
export function reverseWords(str) {}

// Given a string, check if all characters are unique
// Example:
//   hasUniqueChars('hello') === false
//   hasUniqueChars('world') === true
export function hasUniqueChars(str) {}

// Given a string, return the character that is most
// commonly used in the string.
// Example:
//   maxChar("abcccccccd") === "c"
//   maxChar("apple 1231111") === "1"
export function maxChar(str) {}

// Write a function that returns the number of vowels
// used in a string. Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// Example:
//   vowels('Hi There!') === 3
//   vowels('Why do you ask?') === 4
//   vowels('Why?') === 0
export function vowels(str) {}
