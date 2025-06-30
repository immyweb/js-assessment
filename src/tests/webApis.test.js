import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

import {
  // Fetch API
  fetchJson,
  postJson,
  fetchWithTimeout,
  fetchWithRetry,
  // Service Workers
  registerServiceWorker,
  cacheFirstStrategy,
  networkFirstStrategy,
  cleanupOldCaches,
  // Web Workers
  createWorkerFromFunction,
  calculatePrimesInWorker,
  processArrayInParallel,
  createRobustWorker,
  // IndexedDB
  openDatabase,
  addToStore,
  getFromStore,
  queryByIndex,
  createIndexedDBCache,
  // WebSockets
  createReconnectingWebSocket,
  createWebSocketQueue,
  createWebSocketPubSub,
  createHeartbeatWebSocket,
  // File API
  readFileAsText,
  readImageAsDataURL,
  processFileInChunks,
  validateFile,
  downloadFile,
  setupFileDropZone,
  uploadFileWithProgress
} from '../exercises/webApis';

// Mock global fetch
global.fetch = vi.fn();

// Mock AbortController
global.AbortController = class {
  constructor() {
    this.signal = { aborted: false };
  }
  abort() {
    this.signal.aborted = true;
  }
};

// Mock IndexedDB
const mockIDBDatabase = {
  transaction: vi.fn(),
  close: vi.fn()
};

const mockIDBTransaction = {
  objectStore: vi.fn(),
  oncomplete: null,
  onerror: null
};

const mockIDBObjectStore = {
  add: vi.fn(),
  get: vi.fn(),
  index: vi.fn()
};

const mockIDBIndex = {
  getAll: vi.fn()
};

global.indexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn()
};

// Mock WebSocket
global.WebSocket = class {
  constructor(url) {
    this.url = url;
    this.readyState = 0; // CONNECTING
    this.onopen = null;
    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;
  }
  
  send(data) {
    // Mock implementation
  }
  
  close() {
    this.readyState = 3; // CLOSED
  }
};

// Mock Worker
global.Worker = class {
  constructor(script) {
    this.script = script;
    this.onmessage = null;
    this.onerror = null;
  }
  
  postMessage(data) {
    // Mock implementation
  }
  
  terminate() {
    // Mock implementation
  }
};

// Mock File and FileReader
global.File = class {
  constructor(parts, filename, options = {}) {
    this.name = filename;
    this.size = parts.reduce((size, part) => size + part.length, 0);
    this.type = options.type || '';
    this.lastModified = Date.now();
  }
};

global.FileReader = class {
  constructor() {
    this.result = null;
    this.onload = null;
    this.onerror = null;
  }
  
  readAsText(file) {
    setTimeout(() => {
      this.result = 'mock file content';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
  
  readAsDataURL(file) {
    setTimeout(() => {
      this.result = 'data:text/plain;base64,bW9jayBmaWxlIGNvbnRlbnQ=';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
};

// Mock Blob and URL
global.Blob = class {
  constructor(parts, options = {}) {
    this.size = parts.reduce((size, part) => size + part.length, 0);
    this.type = options.type || '';
  }
};

global.URL = {
  createObjectURL: vi.fn(() => 'blob:mock-url'),
  revokeObjectURL: vi.fn()
};

describe('Web APIs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Fetch API', () => {
    describe('fetchJson', () => {
      test('should fetch and parse JSON successfully', async () => {
        const mockData = { id: 1, name: 'John' };
        global.fetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValueOnce(mockData)
        });

        const result = await fetchJson('https://api.example.com/users');
        
        expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/users');
        expect(result).toEqual(mockData);
      });

      test('should throw error for non-200 status', async () => {
        global.fetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });

        await expect(fetchJson('https://api.example.com/users')).rejects.toThrow();
      });

      test('should handle network errors', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchJson('https://api.example.com/users')).rejects.toThrow('Network error');
      });
    });

    describe('postJson', () => {
      test('should make POST request with JSON data', async () => {
        const postData = { name: 'John', email: 'john@example.com' };
        const responseData = { id: 1, ...postData };
        
        global.fetch.mockResolvedValueOnce({
          ok: true,
          status: 201,
          json: vi.fn().mockResolvedValueOnce(responseData)
        });

        const result = await postJson('https://api.example.com/users', postData);

        expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        expect(result).toEqual(responseData);
      });
    });

    describe('fetchWithTimeout', () => {
      test('should abort request on timeout', async () => {
        vi.useFakeTimers();
        
        global.fetch.mockImplementationOnce(() => 
          new Promise(resolve => setTimeout(resolve, 10000))
        );

        const fetchPromise = fetchWithTimeout('https://slow-api.com', 5000);
        
        vi.advanceTimersByTime(5000);
        
        await expect(fetchPromise).rejects.toThrow();
        
        vi.useRealTimers();
      });

      test('should return result if within timeout', async () => {
        const mockData = { success: true };
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockData)
        });

        const result = await fetchWithTimeout('https://fast-api.com', 5000);
        expect(result).toEqual(mockData);
      });
    });

    describe('fetchWithRetry', () => {
      test('should succeed on first attempt', async () => {
        const mockData = { success: true };
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockData)
        });

        const result = await fetchWithRetry('https://api.example.com');
        
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockData);
      });

      test('should retry on failure and eventually succeed', async () => {
        const mockData = { success: true };
        
        global.fetch
          .mockRejectedValueOnce(new Error('Network error'))
          .mockRejectedValueOnce(new Error('Network error'))
          .mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData)
          });

        const result = await fetchWithRetry('https://api.example.com', 3);
        
        expect(global.fetch).toHaveBeenCalledTimes(3);
        expect(result).toEqual(mockData);
      });

      test('should throw after max retries exceeded', async () => {
        global.fetch.mockRejectedValue(new Error('Persistent error'));

        await expect(fetchWithRetry('https://api.example.com', 2)).rejects.toThrow('Persistent error');
        expect(global.fetch).toHaveBeenCalledTimes(3); // initial + 2 retries
      });
    });
  });

  describe('Service Workers', () => {
    beforeEach(() => {
      global.navigator = {
        serviceWorker: {
          register: vi.fn()
        }
      };
    });

    describe('registerServiceWorker', () => {
      test('should register service worker successfully', async () => {
        const mockRegistration = { scope: '/' };
        global.navigator.serviceWorker.register.mockResolvedValueOnce(mockRegistration);

        const result = await registerServiceWorker('/sw.js');
        
        expect(global.navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js');
        expect(result).toBe(true);
      });

      test('should handle registration failure', async () => {
        global.navigator.serviceWorker.register.mockRejectedValueOnce(new Error('Registration failed'));

        const result = await registerServiceWorker('/sw.js');
        expect(result).toBe(false);
      });

      test('should handle unsupported browsers', async () => {
        delete global.navigator.serviceWorker;

        const result = await registerServiceWorker('/sw.js');
        expect(result).toBe(false);
      });
    });

    describe('cacheFirstStrategy', () => {
      test('should return cached response if available', async () => {
        const mockCache = {
          match: vi.fn().mockResolvedValueOnce(new Response('cached content'))
        };
        global.caches = {
          open: vi.fn().mockResolvedValueOnce(mockCache)
        };

        const mockRequest = new Request('https://example.com/api');
        const response = await cacheFirstStrategy(mockRequest);
        
        expect(mockCache.match).toHaveBeenCalledWith(mockRequest);
        expect(await response.text()).toBe('cached content');
      });

      test('should fallback to network if not in cache', async () => {
        const mockCache = {
          match: vi.fn().mockResolvedValueOnce(undefined),
          put: vi.fn()
        };
        global.caches = {
          open: vi.fn().mockResolvedValueOnce(mockCache)
        };
        
        const networkResponse = new Response('network content');
        global.fetch.mockResolvedValueOnce(networkResponse.clone());

        const mockRequest = new Request('https://example.com/api');
        const response = await cacheFirstStrategy(mockRequest);
        
        expect(global.fetch).toHaveBeenCalledWith(mockRequest);
        expect(mockCache.put).toHaveBeenCalled();
      });
    });
  });

  describe('Web Workers', () => {
    describe('createWorkerFromFunction', () => {
      test('should create worker and return result', async () => {
        const workerFunction = (data) => data.numbers.reduce((sum, n) => sum + n, 0);
        const data = { numbers: [1, 2, 3, 4, 5] };

        // Mock URL.createObjectURL to return a valid URL
        global.URL.createObjectURL.mockReturnValueOnce('blob:worker-url');

        const result = await createWorkerFromFunction(workerFunction, data);
        
        expect(result).toBe(15);
        expect(global.URL.createObjectURL).toHaveBeenCalled();
      });
    });

    describe('calculatePrimesInWorker', () => {
      test('should calculate primes in worker', async () => {
        const result = await calculatePrimesInWorker(10);
        
        expect(Array.isArray(result)).toBe(true);
        expect(result).toContain(2);
        expect(result).toContain(3);
        expect(result).toContain(5);
        expect(result).toContain(7);
      });
    });

    describe('processArrayInParallel', () => {
      test('should process array in parallel workers', async () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8];
        const processingFunction = (chunk) => chunk.map(n => n * 2);
        
        const result = await processArrayInParallel(array, processingFunction, 2);
        
        expect(result).toEqual([2, 4, 6, 8, 10, 12, 14, 16]);
      });
    });

    describe('createRobustWorker', () => {
      test('should handle worker timeout', async () => {
        vi.useFakeTimers();
        
        const workerFunction = () => {
          // Simulate long-running task
          while (true) {}
        };
        
        const workerPromise = createRobustWorker(workerFunction, {}, 1000);
        
        vi.advanceTimersByTime(1000);
        
        await expect(workerPromise).rejects.toThrow();
        
        vi.useRealTimers();
      });
    });
  });

  describe('IndexedDB', () => {
    beforeEach(() => {
      mockIDBTransaction.objectStore.mockReturnValue(mockIDBObjectStore);
      mockIDBObjectStore.index.mockReturnValue(mockIDBIndex);
      mockIDBDatabase.transaction.mockReturnValue(mockIDBTransaction);
    });

    describe('openDatabase', () => {
      test('should open database and create stores', async () => {
        const mockRequest = {
          result: mockIDBDatabase,
          onsuccess: null,
          onerror: null,
          onupgradeneeded: null
        };
        
        global.indexedDB.open.mockReturnValueOnce(mockRequest);
        
        const dbPromise = openDatabase('MyApp', 1, ['users', 'posts']);
        
        // Simulate successful opening
        setTimeout(() => {
          if (mockRequest.onsuccess) mockRequest.onsuccess({ target: mockRequest });
        }, 0);
        
        const db = await dbPromise;
        
        expect(global.indexedDB.open).toHaveBeenCalledWith('MyApp', 1);
        expect(db).toBe(mockIDBDatabase);
      });
    });

    describe('addToStore', () => {
      test('should add data to store', async () => {
        const mockKey = 123;
        mockIDBObjectStore.add.mockReturnValueOnce({
          result: mockKey,
          onsuccess: null,
          onerror: null
        });

        const key = await addToStore(mockIDBDatabase, 'users', { name: 'John' });
        
        expect(mockIDBDatabase.transaction).toHaveBeenCalledWith(['users'], 'readwrite');
        expect(mockIDBObjectStore.add).toHaveBeenCalledWith({ name: 'John' });
      });
    });

    describe('getFromStore', () => {
      test('should retrieve data by key', async () => {
        const mockUser = { id: 123, name: 'John' };
        mockIDBObjectStore.get.mockReturnValueOnce({
          result: mockUser,
          onsuccess: null,
          onerror: null
        });

        const user = await getFromStore(mockIDBDatabase, 'users', 123);
        
        expect(mockIDBObjectStore.get).toHaveBeenCalledWith(123);
        expect(user).toEqual(mockUser);
      });

      test('should return null for non-existent key', async () => {
        mockIDBObjectStore.get.mockReturnValueOnce({
          result: undefined,
          onsuccess: null,
          onerror: null
        });

        const user = await getFromStore(mockIDBDatabase, 'users', 999);
        expect(user).toBeNull();
      });
    });

    describe('queryByIndex', () => {
      test('should query data by index', async () => {
        const mockUsers = [{ id: 1, email: 'john@example.com' }];
        mockIDBIndex.getAll.mockReturnValueOnce({
          result: mockUsers,
          onsuccess: null,
          onerror: null
        });

        const users = await queryByIndex(mockIDBDatabase, 'users', 'email', 'john@example.com');
        
        expect(mockIDBObjectStore.index).toHaveBeenCalledWith('email');
        expect(mockIDBIndex.getAll).toHaveBeenCalledWith('john@example.com');
        expect(users).toEqual(mockUsers);
      });
    });
  });

  describe('WebSockets', () => {
    describe('createReconnectingWebSocket', () => {
      test('should create WebSocket with reconnection logic', async () => {
        const ws = await createReconnectingWebSocket('ws://localhost:8080');
        
        expect(ws).toHaveProperty('onMessage');
        expect(ws).toHaveProperty('send');
        expect(typeof ws.onMessage).toBe('function');
        expect(typeof ws.send).toBe('function');
      });
    });

    describe('createWebSocketQueue', () => {
      test('should queue messages when disconnected', async () => {
        const wsQueue = await createWebSocketQueue('ws://localhost:8080');
        
        expect(wsQueue).toHaveProperty('send');
        expect(typeof wsQueue.send).toBe('function');
        
        // Should not throw when sending while disconnected
        expect(() => wsQueue.send('test message')).not.toThrow();
      });
    });

    describe('createWebSocketPubSub', () => {
      test('should create pub/sub system', async () => {
        const pubsub = await createWebSocketPubSub('ws://localhost:8080');
        
        expect(pubsub).toHaveProperty('subscribe');
        expect(pubsub).toHaveProperty('publish');
        expect(typeof pubsub.subscribe).toBe('function');
        expect(typeof pubsub.publish).toBe('function');
      });
    });

    describe('createHeartbeatWebSocket', () => {
      test('should create WebSocket with heartbeat', async () => {
        vi.useFakeTimers();
        
        const ws = await createHeartbeatWebSocket('ws://localhost:8080', 1000);
        
        expect(ws).toBeDefined();
        
        vi.useRealTimers();
      });
    });
  });

  describe('File API', () => {
    describe('readFileAsText', () => {
      test('should read file as text', async () => {
        const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
        
        const content = await readFileAsText(file);
        
        expect(content).toBe('mock file content');
      });
    });

    describe('readImageAsDataURL', () => {
      test('should read image file as data URL', async () => {
        const file = new File(['fake image data'], 'test.jpg', { type: 'image/jpeg' });
        
        const dataUrl = await readImageAsDataURL(file);
        
        expect(dataUrl).toMatch(/^data:/);
      });

      test('should validate file is an image', async () => {
        const file = new File(['not an image'], 'test.txt', { type: 'text/plain' });
        
        await expect(readImageAsDataURL(file)).rejects.toThrow();
      });
    });

    describe('processFileInChunks', () => {
      test('should process file in chunks', async () => {
        const file = new File(['x'.repeat(1000)], 'large.txt');
        let processedChunks = 0;
        const processor = (chunk) => {
          processedChunks++;
          return chunk.length;
        };
        
        const result = await processFileInChunks(file, processor, 100);
        
        expect(processedChunks).toBeGreaterThan(1);
        expect(result).toBeDefined();
      });
    });

    describe('validateFile', () => {
      test('should validate file type and size', async () => {
        const file = new File(['Hello'], 'test.txt', { type: 'text/plain' });
        
        const isValid = await validateFile(file, {
          allowedTypes: ['text/plain'],
          maxSize: 1024,
          allowedExtensions: ['.txt']
        });
        
        expect(isValid).toBe(true);
      });

      test('should reject invalid file type', async () => {
        const file = new File(['Hello'], 'test.exe', { type: 'application/x-executable' });
        
        const isValid = await validateFile(file, {
          allowedTypes: ['text/plain'],
          maxSize: 1024,
          allowedExtensions: ['.txt']
        });
        
        expect(isValid).toBe(false);
      });

      test('should reject oversized files', async () => {
        const file = new File(['x'.repeat(2000)], 'large.txt', { type: 'text/plain' });
        
        const isValid = await validateFile(file, {
          allowedTypes: ['text/plain'],
          maxSize: 1024,
          allowedExtensions: ['.txt']
        });
        
        expect(isValid).toBe(false);
      });
    });

    describe('downloadFile', () => {
      test('should trigger file download', () => {
        // Mock document.createElement and click
        const mockLink = {
          href: '',
          download: '',
          click: vi.fn(),
          style: { display: '' }
        };
        
        global.document = {
          createElement: vi.fn().mockReturnValue(mockLink),
          body: {
            appendChild: vi.fn(),
            removeChild: vi.fn()
          }
        };

        const blob = new Blob(['Hello World'], { type: 'text/plain' });
        
        downloadFile(blob, 'hello.txt', 'text/plain');
        
        expect(global.document.createElement).toHaveBeenCalledWith('a');
        expect(mockLink.click).toHaveBeenCalled();
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
      });
    });

    describe('setupFileDropZone', () => {
      test('should setup drag and drop handlers', async () => {
        const mockElement = {
          addEventListener: vi.fn(),
          removeEventListener: vi.fn()
        };

        const promise = setupFileDropZone(mockElement);
        
        expect(mockElement.addEventListener).toHaveBeenCalledWith('dragover', expect.any(Function));
        expect(mockElement.addEventListener).toHaveBeenCalledWith('drop', expect.any(Function));
        
        // Should return a promise
        expect(promise).toBeInstanceOf(Promise);
      });
    });

    describe('uploadFileWithProgress', () => {
      test('should upload file with progress tracking', async () => {
        const file = new File(['Hello World'], 'test.txt');
        const onProgress = vi.fn();
        
        // Mock XMLHttpRequest
        const mockXHR = {
          open: vi.fn(),
          setRequestHeader: vi.fn(),
          send: vi.fn(),
          upload: {
            addEventListener: vi.fn()
          },
          addEventListener: vi.fn(),
          response: JSON.stringify({ success: true })
        };
        
        global.XMLHttpRequest = vi.fn(() => mockXHR);
        global.FormData = class {
          append() {}
        };
        
        const promise = uploadFileWithProgress(file, '/api/upload', onProgress);
        
        // Simulate successful upload
        setTimeout(() => {
          const loadHandler = mockXHR.addEventListener.mock.calls
            .find(call => call[0] === 'load')[1];
          if (loadHandler) loadHandler();
        }, 0);
        
        await expect(promise).resolves.toBeDefined();
        expect(mockXHR.open).toHaveBeenCalledWith('POST', '/api/upload');
      });
    });
  });
});
