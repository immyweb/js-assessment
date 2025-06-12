// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverseString('apple') === 'leppa'
//   reverseString('hello') === 'olleh'
//   reverseString('Greetings!') === '!sgniteerG'
export function reverseString(str) {
  return [...str].reverse().join('');
}

// Given a string, return true if the string is a palindrome
// or false if it is not. Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false
export function palindrome(str) {
  const reversed = [...str].reverse().join('');

  return str === reversed;
}

// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"
export function maxChar(str) {
  const chars = {}; // 1. Create empty box to store counts
  let maxChar = ''; // 2. Variable to remember the winner
  let maxCount = 0; // 3. Variable to remember highest count

  // 4. Look at each letter
  for (const char of str) {
    chars[char] = (chars[char] || 0) + 1; // 5. Count it

    // 6. Is this a new record?
    if (chars[char] > maxCount) {
      maxCount = chars[char]; // 7. Update the record
      maxChar = char; // 8. Remember the winner
    }
  }

  return maxChar; // 9. Return the winner
}

// Check to see if two provided strings are anagrams of each other.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces.
// Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL SAFETY', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False
export function anagrams(stringA, stringB) {
  function sortString(str) {
    return str.toLowerCase().split('').sort().join('');
  }

  return sortString(stringA) === sortString(stringB);
}

// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'
export function capitalize(str) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
//   vowels('Hi There!') --> 3
//   vowels('Why do you ask?') --> 4
//   vowels('Why?') --> 0
export function vowels(str) {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  let count = 0;

  for (let char of str.toLowerCase()) {
    if (vowelSet.has(char)) {
      count++;
    }
  }

  return count;
}
