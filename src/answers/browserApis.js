/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises cover fundamental Browser APIs and DOM concepts including
 * event listeners, DOM manipulation, and localStorage.
 */

// ==== EVENT LISTENERS ====

// Add a click event listener to an element that calls the provided callback
// Example:
//   const element = document.createElement('button');
//   const callback = () => console.log('clicked');
//   addClickListener(element, callback);
//   element.click(); // should call callback
export function addClickListener(element, callback) {
  element.addEventListener('click', callback);
}

// Remove an event listener from an element
// Example:
//   removeEventListener(element, 'click', callback);
export function removeEventListener(element, eventType, callback) {
  element.removeEventListener(eventType, callback);
}

// Add an event listener that only fires once
// Example:
//   addOneTimeListener(element, 'click', callback);
//   element.click(); // fires callback
//   element.click(); // does not fire callback
export function addOneTimeListener(element, eventType, callback) {
  element.addEventListener(eventType, callback, { once: true });
}

// Prevent the default behavior of an event
// Example:
//   const form = document.createElement('form');
//   preventFormSubmit(form);
//   // form submission should be prevented
export function preventFormSubmit(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

// Stop event propagation (bubbling)
// Example:
//   stopEventBubbling(childElement);
//   // clicking child should not trigger parent listeners
export function stopEventBubbling(element) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Get the target element from an event
// Example:
//   const target = getEventTarget(event);
export function getEventTarget(event) {
  return event.target;
}

// Check if a specific key was pressed in a keyboard event
// Example:
//   isEnterKey(event) // true if Enter key was pressed
export function isEnterKey(event) {
  return event.key === 'Enter';
}

// Create and dispatch a custom event
// Example:
//   dispatchCustomEvent(element, 'myEvent', { detail: 'data' });
export function dispatchCustomEvent(element, eventName, data) {
  const event = new CustomEvent(eventName, data);
  element.dispatchEvent(event);
}

// Implement event delegation for dynamic content
// Listen for clicks on items with a specific class within a container
// Example:
//   delegateClick(container, '.item', callback);
export function delegateClick(container, selector, callback) {
  container.addEventListener('click', (event) => {
    if (event.target.matches(selector)) {
      callback(event);
    }
  });
}

// Add multiple event listeners to the same element
// Example:
//   addMultipleListeners(element, ['click', 'mouseenter'], callback);
export function addMultipleListeners(element, eventTypes, callback) {
  eventTypes.forEach((type) => {
    element.addEventListener(type, callback);
  });
}

// ==== DOM MANIPULATION ====

// Select a single element by CSS selector
// Example:
//   selectElement('.my-class') // returns first element with class 'my-class'
export function selectElement(selector) {
  return document.querySelector(selector);
}

// Select all elements matching a CSS selector
// Example:
//   selectAllElements('.item') // returns NodeList of all elements with class 'item'
export function selectAllElements(selector) {
  return document.querySelectorAll(selector);
}

// Create a new HTML element with specified tag name
// Example:
//   createElement('div') // returns new div element
export function createElement(tagName) {
  return document.createElement(tagName);
}

// Create an element with attributes and text content
// Example:
//   createElementWithContent('p', { class: 'text' }, 'Hello World')
export function createElementWithContent(tagName, attributes, textContent) {
  const element = document.createElement(tagName);

  if (attributes) {
    for (const attr in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
        element.setAttribute(attr, attributes[attr]);
      }
    }
  }

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  return element;
}

// Append a child element to a parent element
// Example:
//   appendChild(parent, child);
export function appendChild(parent, child) {
  return parent.appendChild(child);
}

// Insert an element before another element
// Example:
//   insertBefore(parent, newElement, referenceElement);
export function insertBefore(parent, newElement, referenceElement) {
  return parent.insertBefore(newElement, referenceElement);
}

// Remove an element from the DOM
// Example:
//   removeElement(element);
export function removeElement(element) {
  const parent = element.parentNode;

  return parent.removeChild(element);
}

// Replace one element with another
// Example:
//   replaceElement(oldElement, newElement);
export function replaceElement(oldElement, newElement) {
  const parent = oldElement.parentNode;

  return parent.replaceChild(newElement, oldElement);
}

// Get the text content of an element
// Example:
//   getTextContent(element) // returns text content
export function getTextContent(element) {
  return element.textContent;
}

// Set the text content of an element
// Example:
//   setTextContent(element, 'New text');
export function setTextContent(element, text) {
  return (element.textContent = text);
}

// Get the HTML content of an element
// Example:
//   getHTMLContent(element) // returns innerHTML
export function getHTMLContent(element) {
  return element.innerHTML;
}

// Set the HTML content of an element
// Example:
//   setHTMLContent(element, '<p>Hello</p>');
export function setHTMLContent(element, html) {
  return (element.innerHTML = html);
}

// Get an attribute value from an element
// Example:
//   getAttribute(element, 'id') // returns id attribute value
export function getAttribute(element, attributeName) {
  return element.getAttribute(attributeName);
}

// Set an attribute on an element
// Example:
//   setAttribute(element, 'id', 'myId');
export function setAttribute(element, attributeName, value) {
  return element.setAttribute(attributeName, value);
}

// Remove an attribute from an element
// Example:
//   removeAttribute(element, 'class');
export function removeAttribute(element, attributeName) {
  return element.removeAttribute(attributeName);
}

// Check if an element has a specific class
// Example:
//   hasClass(element, 'active') // returns true/false
export function hasClass(element, className) {
  return element.classList.contains(className);
}

// Add a class to an element
// Example:
//   addClass(element, 'active');
export function addClass(element, className) {
  return element.classList.add(className);
}

// Remove a class from an element
// Example:
//   removeClass(element, 'active');
export function removeClass(element, className) {
  return element.classList.remove(className);
}

// Toggle a class on an element
// Example:
//   toggleClass(element, 'active'); // adds if not present, removes if present
export function toggleClass(element, className) {
  return element.classList.toggle(className);
}

// Get the computed style of an element
// Example:
//   getComputedStyle(element, 'color') // returns computed color value
export function getComputedStyleValue(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

// Set inline style on an element
// Example:
//   setStyle(element, 'color', 'red');
export function setStyle(element, property, value) {
  return (element.style[property] = value);
}

// Get the value of a data attribute
// Example:
//   getDataAttribute(element, 'userId') // gets data-user-id
export function getDataAttribute(element, attributeName) {
  return element.dataset[attributeName];
}

// Set a data attribute on an element
// Example:
//   setDataAttribute(element, 'userId', '123'); // sets data-user-id="123"
export function setDataAttribute(element, attributeName, value) {
  return (element.dataset[attributeName] = value);
}

// Find the closest ancestor element matching a selector
// Example:
//   findClosest(element, '.container') // returns closest ancestor with class 'container'
export function findClosest(element, selector) {
  return element.closest(selector);
}

// Get all child elements of a specific type
// Example:
//   getChildrenByTag(parent, 'div') // returns all div children
export function getChildrenByTag(parent, tagName) {
  return parent.getElementsByTagName(tagName);
}

// Clone an element (deep copy)
// Example:
//   cloneElement(element) // returns deep clone of element
export function cloneElement(element) {
  return element.cloneNode(true);
}

// ==== LOCAL STORAGE ====

// Store a string value in localStorage
// Example:
//   setStorageItem('username', 'john');
export function setStorageItem(key, value) {
  return localStorage.setItem(key, value);
}

// Retrieve a string value from localStorage
// Example:
//   getStorageItem('username') // returns 'john' or null
export function getStorageItem(key) {
  return localStorage.getItem(key);
}

// Remove an item from localStorage
// Example:
//   removeStorageItem('username');
export function removeStorageItem(key) {
  localStorage.removeItem(key);
}

// Clear all items from localStorage
// Example:
//   clearStorage();
export function clearStorage() {
  localStorage.clear();
}

// Store an object in localStorage (with JSON serialization)
// Example:
//   setStorageObject('user', { name: 'John', age: 30 });
export function setStorageObject(key, object) {
  return localStorage.setItem(key, JSON.stringify(object));
}

// Retrieve an object from localStorage (with JSON parsing)
// Example:
//   getStorageObject('user') // returns { name: 'John', age: 30 } or null
export function getStorageObject(key) {
  const obj = localStorage.getItem(key);

  try {
    return JSON.parse(obj);
  } catch (e) {
    return null;
  }
}

// Store an array in localStorage
// Example:
//   setStorageArray('items', ['apple', 'banana', 'orange']);
export function setStorageArray(key, array) {
  return localStorage.setItem(key, JSON.stringify(array));
}

// Retrieve an array from localStorage
// Example:
//   getStorageArray('items') // returns ['apple', 'banana', 'orange'] or null
export function getStorageArray(key) {
  const arr = localStorage.getItem(key);

  try {
    return JSON.parse(arr);
  } catch (e) {
    return null;
  }
}

// Check if a key exists in localStorage
// Example:
//   hasStorageKey('username') // returns true/false
export function hasStorageKey(key) {
  if (localStorage.getItem(key)) {
    return true;
  }
  return false;
}

// Get all keys from localStorage
// Example:
//   getAllStorageKeys() // returns array of all keys
export function getAllStorageKeys() {
  let keys = [];

  for (let i = 0; i <= localStorage.length - 1; i++) {
    const key = localStorage.key(i);
    keys.push(key);
  }

  return keys;
}

// Get the number of items in localStorage
// Example:
//   getStorageLength() // returns number of items
export function getStorageLength() {
  return localStorage.length;
}

// Store data with expiration time
// Example:
//   setStorageWithExpiry('temp', 'data', 3600000); // expires in 1 hour
export function setStorageWithExpiry(key, value, ttl) {
  const now = Date.now();
  const data = JSON.stringify({ value, expiry: now + ttl });

  return localStorage.setItem(key, data);
}

// Get data that may have expired
// Example:
//   getStorageWithExpiry('temp') // returns value or null if expired
export function getStorageWithExpiry(key) {
  const value = localStorage.getItem(key);

  if (!value) return null;

  try {
    const parsedValue = JSON.parse(value);

    if (!parsedValue.expiry) return parsedValue.value;

    const now = Date.now();

    // Check if the current time has passed the expiration time
    if (now > parsedValue.expiry) {
      localStorage.removeItem(key); // Remove expired item
      return null;
    } else {
      return parsedValue.value;
    }
  } catch (e) {
    return null;
  }
}

// Create a simple cache interface using localStorage
// Should return an object with get, set, remove, and clear methods
// Example:
//   const cache = createStorageCache();
//   cache.set('key', 'value');
//   cache.get('key'); // returns 'value'
export function createStorageCache() {
  return {
    get(key) {
      return localStorage.getItem(key);
    },
    set(key, value) {
      localStorage.setItem(key, value);
    },
    remove(key) {
      localStorage.removeItem(key);
    },
    clear() {
      localStorage.clear();
    }
  };
}

// Store data in sessionStorage instead of localStorage
// Example:
//   setSessionItem('temp', 'value');
export function setSessionItem(key, value) {
  return sessionStorage.setItem(key, value);
}

// Retrieve data from sessionStorage
// Example:
//   getSessionItem('temp') // returns 'value' or null
export function getSessionItem(key) {
  return sessionStorage.getItem(key);
}

// Handle localStorage quota exceeded error
// Should try to store data and return success/failure status
// Example:
//   safeStorageSet('key', 'value') // returns true if successful, false if failed
export function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

// Synchronize data between multiple tabs using storage events
// Should add a listener for storage events and call callback when key changes
// Example:
//   listenForStorageChanges('username', (newValue, oldValue) => console.log('changed'));
export function listenForStorageChanges(key, callback) {
  const handleStorage = (event) => {
    if (event.key === key) {
      callback(event.newValue, event.oldValue);
    }
  };

  window.addEventListener('storage', handleStorage);
}
