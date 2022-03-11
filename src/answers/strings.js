// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverseString('apple') === 'leppa'
//   reverseString('hello') === 'olleh'
//   reverseString('Greetings!') === '!sgniteerG'
export function reverseString(str) {
  const ret = str.split("").reverse().join("");
  return ret;
}

// Given a string, return true if the string is a palindrome
// or false if it is not. Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false
export function palindrome(str) {
  const reversed = str.split("").reverse().join("");

  return str === reversed;
}

// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"
export function maxChar(str) {
  const charMap = {};
  let maxCount = 0;
  let maxChar;

  for (let char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }

  for (let char in charMap) {
    if (charMap[char] > maxCount) {
      maxCount = charMap[char];
      maxChar = char;
    }
  }
  return maxChar;
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
    const arr = str.toLowerCase().split("").sort().join("");

    return arr;
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
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === " ") {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
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
  let vowels = 0;
  const checker = ["a", "e", "i", "o", "u"];

  for (let char of str.toLowerCase()) {
    if (checker.includes(char)) {
      vowels++;
    }
  }

  return vowels;
}
