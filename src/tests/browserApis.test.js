import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  // Event Listeners
  addClickListener,
  removeEventListener,
  addOneTimeListener,
  preventFormSubmit,
  stopEventBubbling,
  getEventTarget,
  isEnterKey,
  dispatchCustomEvent,
  delegateClick,
  addMultipleListeners,
  // DOM Manipulation
  selectElement,
  selectAllElements,
  createElement,
  createElementWithContent,
  appendChild,
  insertBefore,
  removeElement,
  replaceElement,
  getTextContent,
  setTextContent,
  getHTMLContent,
  setHTMLContent,
  getAttribute,
  setAttribute,
  removeAttribute,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  getComputedStyleValue,
  setStyle,
  getDataAttribute,
  setDataAttribute,
  findClosest,
  getChildrenByTag,
  cloneElement,
  // Local Storage
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearStorage,
  setStorageObject,
  getStorageObject,
  setStorageArray,
  getStorageArray,
  hasStorageKey,
  getAllStorageKeys,
  getStorageLength,
  setStorageWithExpiry,
  getStorageWithExpiry,
  createStorageCache,
  setSessionItem,
  getSessionItem,
  safeStorageSet,
  listenForStorageChanges
} from '../exercises/browserApis.js';

// Setup JSDOM for DOM testing
let dom;
let document;
let window;

beforeEach(() => {
  dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });

  document = dom.window.document;
  window = dom.window;

  // Set global document and window for the exercises
  global.document = document;
  global.window = window;
  global.Event = window.Event;
  global.CustomEvent = window.CustomEvent;
  global.KeyboardEvent = window.KeyboardEvent;
  global.StorageEvent = window.StorageEvent;

  // Mock localStorage and sessionStorage
  const localStorageMock = createStorageMock();
  const sessionStorageMock = createStorageMock();

  global.localStorage = localStorageMock;
  global.sessionStorage = sessionStorageMock;

  // Use Object.defineProperty for window storage properties (JSDOM compatibility)
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true
  });

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
    writable: true,
    configurable: true
  });
});

afterEach(() => {
  dom?.window?.close();
  vi.clearAllMocks();
});

// Helper function to create storage mock
function createStorageMock() {
  let store = {};

  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index) => Object.keys(store)[index] || null)
  };
}

describe('Browser APIs - Event Listeners', () => {
  test('addClickListener should add a click event listener', () => {
    const element = document.createElement('button');
    const callback = vi.fn();

    addClickListener(element, callback);

    element.click();
    expect(callback).toHaveBeenCalledTimes(1);

    element.click();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('removeEventListener should remove an event listener', () => {
    const element = document.createElement('button');
    const callback = vi.fn();

    element.addEventListener('click', callback);
    element.click();
    expect(callback).toHaveBeenCalledTimes(1);

    removeEventListener(element, 'click', callback);
    element.click();
    expect(callback).toHaveBeenCalledTimes(1); // Should not increase
  });

  test('addOneTimeListener should only fire once', () => {
    const element = document.createElement('button');
    const callback = vi.fn();

    addOneTimeListener(element, 'click', callback);

    element.click();
    expect(callback).toHaveBeenCalledTimes(1);

    element.click();
    expect(callback).toHaveBeenCalledTimes(1); // Should not increase
  });

  test('preventFormSubmit should prevent form submission', () => {
    const form = document.createElement('form');
    document.body.appendChild(form);

    preventFormSubmit(form);

    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true
    });
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');

    form.dispatchEvent(submitEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test('stopEventBubbling should stop event propagation', () => {
    const parent = document.createElement('div');
    const child = document.createElement('button');
    parent.appendChild(child);

    const parentCallback = vi.fn();
    parent.addEventListener('click', parentCallback);

    stopEventBubbling(child);

    child.click();
    expect(parentCallback).not.toHaveBeenCalled();
  });

  test('getEventTarget should return the event target', () => {
    const element = document.createElement('button');
    let capturedTarget;

    element.addEventListener('click', (event) => {
      capturedTarget = getEventTarget(event);
    });

    element.click();
    expect(capturedTarget).toBe(element);
  });

  test('isEnterKey should detect Enter key press', () => {
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });

    expect(isEnterKey(enterEvent)).toBe(true);
    expect(isEnterKey(spaceEvent)).toBe(false);
  });

  test('dispatchCustomEvent should create and dispatch custom event', () => {
    const element = document.createElement('div');
    const callback = vi.fn();
    const eventData = { detail: 'test data' };

    element.addEventListener('myEvent', callback);
    dispatchCustomEvent(element, 'myEvent', eventData);

    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0].detail).toEqual(eventData.detail);
  });

  test('delegateClick should handle event delegation', () => {
    const container = document.createElement('div');
    const item1 = document.createElement('button');
    const item2 = document.createElement('button');

    item1.className = 'item';
    item2.className = 'item';
    container.appendChild(item1);
    container.appendChild(item2);

    const callback = vi.fn();
    delegateClick(container, '.item', callback);

    item1.click();
    expect(callback).toHaveBeenCalledTimes(1);

    item2.click();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('addMultipleListeners should add multiple event types', () => {
    const element = document.createElement('button');
    const callback = vi.fn();

    addMultipleListeners(element, ['click', 'mouseenter'], callback);

    element.click();
    expect(callback).toHaveBeenCalledTimes(1);

    element.dispatchEvent(new Event('mouseenter'));
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('Browser APIs - DOM Manipulation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <p class="text">Hello</p>
        <button id="btn">Click me</button>
        <ul>
          <li class="item">Item 1</li>
          <li class="item">Item 2</li>
        </ul>
      </div>
    `;
  });

  test('selectElement should select single element', () => {
    const result = selectElement('.text');
    expect(result.tagName).toBe('P');
    expect(result.textContent).toBe('Hello');
  });

  test('selectAllElements should select all matching elements', () => {
    const results = selectAllElements('.item');
    expect(results.length).toBe(2);
    expect(results[0].textContent).toBe('Item 1');
    expect(results[1].textContent).toBe('Item 2');
  });

  test('createElement should create new element', () => {
    const result = createElement('div');
    expect(result.tagName).toBe('DIV');
    expect(result.nodeType).toBe(1); // Element node
  });

  test('createElementWithContent should create element with attributes and content', () => {
    const result = createElementWithContent(
      'p',
      { class: 'test', id: 'para' },
      'Hello World'
    );
    expect(result.tagName).toBe('P');
    expect(result.className).toBe('test');
    expect(result.id).toBe('para');
    expect(result.textContent).toBe('Hello World');
  });

  test('appendChild should append child to parent', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');

    appendChild(parent, child);
    expect(parent.children.length).toBe(1);
    expect(parent.children[0]).toBe(child);
  });

  test('insertBefore should insert element before reference', () => {
    const parent = document.createElement('div');
    const existing = document.createElement('span');
    const newElement = document.createElement('p');

    parent.appendChild(existing);
    insertBefore(parent, newElement, existing);

    expect(parent.children[0]).toBe(newElement);
    expect(parent.children[1]).toBe(existing);
  });

  test('removeElement should remove element from DOM', () => {
    const element = selectElement('.text');
    const parent = element.parentNode;

    removeElement(element);
    expect(parent.querySelector('.text')).toBeNull();
  });

  test('replaceElement should replace old element with new one', () => {
    const oldElement = selectElement('.text');
    const newElement = document.createElement('h1');
    newElement.textContent = 'New Title';

    replaceElement(oldElement, newElement);
    expect(document.querySelector('.text')).toBeNull();
    expect(document.querySelector('h1').textContent).toBe('New Title');
  });

  test('getTextContent should return text content', () => {
    const element = selectElement('.text');
    const result = getTextContent(element);
    expect(result).toBe('Hello');
  });

  test('setTextContent should set text content', () => {
    const element = selectElement('.text');
    setTextContent(element, 'New Text');
    expect(element.textContent).toBe('New Text');
  });

  test('getHTMLContent should return innerHTML', () => {
    const container = selectElement('.container');
    const result = getHTMLContent(container);
    expect(result).toContain('<p class="text">Hello</p>');
  });

  test('setHTMLContent should set innerHTML', () => {
    const element = selectElement('.text');
    setHTMLContent(element, '<strong>Bold Text</strong>');
    expect(element.innerHTML).toBe('<strong>Bold Text</strong>');
  });

  test('getAttribute should get attribute value', () => {
    const button = selectElement('#btn');
    const result = getAttribute(button, 'id');
    expect(result).toBe('btn');
  });

  test('setAttribute should set attribute', () => {
    const element = selectElement('.text');
    setAttribute(element, 'data-test', 'value');
    expect(element.getAttribute('data-test')).toBe('value');
  });

  test('removeAttribute should remove attribute', () => {
    const element = selectElement('.text');
    removeAttribute(element, 'class');
    expect(element.hasAttribute('class')).toBe(false);
  });

  test('hasClass should check if element has class', () => {
    const element = selectElement('.text');
    expect(hasClass(element, 'text')).toBe(true);
    expect(hasClass(element, 'nonexistent')).toBe(false);
  });

  test('addClass should add class to element', () => {
    const element = selectElement('.text');
    addClass(element, 'new-class');
    expect(element.classList.contains('new-class')).toBe(true);
  });

  test('removeClass should remove class from element', () => {
    const element = selectElement('.text');
    removeClass(element, 'text');
    expect(element.classList.contains('text')).toBe(false);
  });

  test('toggleClass should toggle class on element', () => {
    const element = selectElement('.text');

    toggleClass(element, 'active');
    expect(element.classList.contains('active')).toBe(true);

    toggleClass(element, 'active');
    expect(element.classList.contains('active')).toBe(false);
  });

  test('getComputedStyleValue should return computed style', () => {
    const element = selectElement('.text');
    element.style.color = 'red';

    const result = getComputedStyleValue(element, 'color');
    expect(result).toBe('rgb(255, 0, 0)');
  });

  test('setStyle should set inline style', () => {
    const element = selectElement('.text');
    setStyle(element, 'color', 'blue');
    expect(element.style.color).toBe('blue');
  });

  test('getDataAttribute should get data attribute', () => {
    const element = selectElement('.text');
    element.setAttribute('data-user-id', '123');

    const result = getDataAttribute(element, 'userId');
    expect(result).toBe('123');
  });

  test('setDataAttribute should set data attribute', () => {
    const element = selectElement('.text');
    setDataAttribute(element, 'userId', '456');
    expect(element.getAttribute('data-user-id')).toBe('456');
  });

  test('findClosest should find closest ancestor', () => {
    const item = selectElement('.item');
    const result = findClosest(item, '.container');
    expect(result.className).toBe('container');
  });

  test('getChildrenByTag should get children by tag name', () => {
    const container = selectElement('.container');
    const results = getChildrenByTag(container, 'li');
    expect(results.length).toBe(2);
    expect(results[0].textContent).toBe('Item 1');
  });

  test('cloneElement should clone element deeply', () => {
    const original = selectElement('.container');
    const clone = cloneElement(original);

    expect(clone.className).toBe('container');
    expect(clone.querySelector('.text')).toBeTruthy();
    expect(clone).not.toBe(original);
  });
});

describe('Browser APIs - Local Storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('setStorageItem should store string value', () => {
    setStorageItem('username', 'john');
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'john');
  });

  test('getStorageItem should retrieve string value', () => {
    localStorage.getItem.mockReturnValue('john');
    const result = getStorageItem('username');
    expect(result).toBe('john');
  });

  test('removeStorageItem should remove item', () => {
    removeStorageItem('username');
    expect(localStorage.removeItem).toHaveBeenCalledWith('username');
  });

  test('clearStorage should clear all items', () => {
    clearStorage();
    expect(localStorage.clear).toHaveBeenCalled();
  });

  test('setStorageObject should store object as JSON', () => {
    const obj = { name: 'John', age: 30 };
    setStorageObject('user', obj);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(obj)
    );
  });

  test('getStorageObject should retrieve and parse object', () => {
    const obj = { name: 'John', age: 30 };
    localStorage.getItem.mockReturnValue(JSON.stringify(obj));

    const result = getStorageObject('user');
    expect(result).toEqual(obj);
  });

  test('getStorageObject should return null for invalid JSON', () => {
    localStorage.getItem.mockReturnValue('invalid json');
    const result = getStorageObject('user');
    expect(result).toBeNull();
  });

  test('setStorageArray should store array as JSON', () => {
    const arr = ['apple', 'banana', 'orange'];
    setStorageArray('fruits', arr);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'fruits',
      JSON.stringify(arr)
    );
  });

  test('getStorageArray should retrieve and parse array', () => {
    const arr = ['apple', 'banana', 'orange'];
    localStorage.getItem.mockReturnValue(JSON.stringify(arr));

    const result = getStorageArray('fruits');
    expect(result).toEqual(arr);
  });

  test('hasStorageKey should check if key exists', () => {
    localStorage.getItem.mockReturnValue('value');
    expect(hasStorageKey('existing')).toBe(true);

    localStorage.getItem.mockReturnValue(null);
    expect(hasStorageKey('nonexistent')).toBe(false);
  });

  test('getAllStorageKeys should return all keys', () => {
    Object.defineProperty(localStorage, 'length', { value: 2 });
    localStorage.key.mockImplementation((index) => ['key1', 'key2'][index]);

    const result = getAllStorageKeys();
    expect(result).toEqual(['key1', 'key2']);
  });

  test('getStorageLength should return number of items', () => {
    Object.defineProperty(localStorage, 'length', { value: 5 });
    const result = getStorageLength();
    expect(result).toBe(5);
  });

  test('setStorageWithExpiry should store data with expiration', () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);

    setStorageWithExpiry('temp', 'data', 3600000);

    const expectedData = {
      value: 'data',
      expiry: now + 3600000
    };
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'temp',
      JSON.stringify(expectedData)
    );
  });

  test('getStorageWithExpiry should return value if not expired', () => {
    const now = Date.now();
    const futureExpiry = now + 3600000;

    localStorage.getItem.mockReturnValue(
      JSON.stringify({
        value: 'data',
        expiry: futureExpiry
      })
    );
    vi.spyOn(Date, 'now').mockReturnValue(now);

    const result = getStorageWithExpiry('temp');
    expect(result).toBe('data');
  });

  test('getStorageWithExpiry should return null if expired', () => {
    const now = Date.now();
    const pastExpiry = now - 3600000;

    localStorage.getItem.mockReturnValue(
      JSON.stringify({
        value: 'data',
        expiry: pastExpiry
      })
    );
    vi.spyOn(Date, 'now').mockReturnValue(now);

    const result = getStorageWithExpiry('temp');
    expect(result).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith('temp');
  });

  test('createStorageCache should return cache interface', () => {
    const cache = createStorageCache();

    expect(typeof cache.get).toBe('function');
    expect(typeof cache.set).toBe('function');
    expect(typeof cache.remove).toBe('function');
    expect(typeof cache.clear).toBe('function');

    cache.set('key', 'value');
    expect(cache.get('key')).toBe('value');

    cache.remove('key');
    expect(cache.get('key')).toBeNull();

    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.clear();
    expect(cache.get('key1')).toBeNull();
    expect(cache.get('key2')).toBeNull();
  });

  test('setSessionItem should store in sessionStorage', () => {
    setSessionItem('temp', 'value');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('temp', 'value');
  });

  test('getSessionItem should retrieve from sessionStorage', () => {
    sessionStorage.getItem.mockReturnValue('value');
    const result = getSessionItem('temp');
    expect(result).toBe('value');
  });

  test('safeStorageSet should handle quota exceeded error', () => {
    localStorage.setItem.mockImplementation(() => {
      const error = new Error('QuotaExceededError');
      error.name = 'QuotaExceededError';
      throw error;
    });

    const result = safeStorageSet('key', 'value');
    expect(result).toBe(false);
  });

  test('safeStorageSet should return true on success', () => {
    const result = safeStorageSet('key', 'value');
    expect(result).toBe(true);
  });

  test('listenForStorageChanges should add storage event listener', () => {
    const callback = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    listenForStorageChanges('username', callback);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function)
    );

    // Simulate storage event
    const storageEvent = new StorageEvent('storage', {
      key: 'username',
      newValue: 'john',
      oldValue: 'jane'
    });

    const eventHandler = addEventListenerSpy.mock.calls[0][1];
    eventHandler(storageEvent);

    expect(callback).toHaveBeenCalledWith('john', 'jane');
  });
});
