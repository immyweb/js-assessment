/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on modern Web APIs essential for senior-level JavaScript development.
 * You'll need to understand asynchronous patterns, error handling, browser compatibility,
 * and real-world implementation scenarios for these APIs.
 *
 * The exercises cover:
 * 1. Fetch API - HTTP requests and response handling
 * 2. Service Workers - Offline functionality and caching
 * 3. Web Workers - Background processing
 * 4. IndexedDB - Client-side database operations
 * 5. WebSockets - Real-time communication
 * 6. File API - File handling and processing
 */

// ===== FETCH API =====

/**
 * Write a function that makes a GET request and returns the parsed JSON response.
 * Handle network errors and non-200 status codes appropriately.
 *
 * const data = await fetchJson('https://api.example.com/users');
 * // Should return parsed JSON or throw descriptive error
 */
export async function fetchJson(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Response status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    throw new Error(`Failed to fetch JSON from ${url}: ${e.message}`);
  }
}

/**
 * Write a function that makes a POST request with JSON data.
 * Include proper headers and handle the response.
 *
 * const result = await postJson('https://api.example.com/users', {name: 'John'});
 * // Should post data and return response
 */
export async function postJson(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Response status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    throw new Error(`Failed to post JSON to ${url}: ${e.message}`);
  }
}

/**
 * Write a function that implements request timeout using AbortController.
 * Cancel the request if it takes longer than the specified timeout.
 *
 * const data = await fetchWithTimeout('https://slow-api.com', 5000);
 * // Should abort request after 5 seconds
 */
export async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();

  const timerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, timeout);
  });

  const fetchPromise = fetch(url, {
    signal: controller.signal
  });

  return Promise.race([timerPromise, fetchPromise])
    .then((values) => {
      if (!values.ok) {
        throw new Error(`HTTP error! Response status: ${values.status}`);
      }
      return values.json();
    })
    .catch((e) => {
      throw new Error(`Failed to fetch JSON from ${url}: ${e.message}`);
    });
}

/**
 * Write a function that implements retry logic for failed requests.
 * Retry up to maxRetries times with exponential backoff.
 *
 * const data = await fetchWithRetry('https://unreliable-api.com', 3);
 * // Should retry failed requests up to 3 times
 */
export async function fetchWithRetry(url, maxRetries = 3) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    if (maxRetries === 0) {
      throw new Error(`Persistent error`);
    }
    return fetchWithRetry(url, maxRetries - 1);
  }
}

// ===== SERVICE WORKERS =====

/**
 * Write a function that registers a service worker.
 * Handle registration success/failure and return registration status.
 *
 * const registered = await registerServiceWorker('/sw.js');
 * // Should return true if registered successfully, false otherwise
 */
export async function registerServiceWorker(scriptUrl) {
  // Check if service worker API is available
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    // Register the service worker
    const registration = await navigator.serviceWorker.register(scriptUrl);

    // Registration was successful regardless of the activation state
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Write a function that creates a cache-first strategy for a service worker.
 * Check cache first, fallback to network if not found.
 * This function should be used within a service worker context.
 *
 * // In service worker:
 * self.addEventListener('fetch', (event) => {
 *   event.respondWith(cacheFirstStrategy(event.request));
 * });
 */
export async function cacheFirstStrategy(request) {
  const cache = await caches.open('assets');

  try {
    const result = await cache.match(request);

    if (result) {
      return result;
    } else {
      const networkResult = await fetch(request);
      await cache.put(request, networkResult.clone());
      return networkResult;
    }
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Write a function that implements network-first strategy with cache fallback.
 * Try network first, use cache if network fails.
 * This function should be used within a service worker context.
 *
 * // In service worker:
 * self.addEventListener('fetch', (event) => {
 *   event.respondWith(networkFirstStrategy(event.request));
 * });
 */
export async function networkFirstStrategy(request) {
  const cache = await caches.open('assets');

  try {
    const networkResult = await fetch(request);

    await cache.put(request, networkResult.clone());
    return networkResult;
  } catch (e) {
    const cacheResult = await cache.match(request);

    if (cacheResult) return cacheResult;

    // If both network and cache fail, return an appropriate error response
    return new Response('Service unavailable. Please try again later.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Write a function that manages cache versioning.
 * Delete old cache versions when a new version is available.
 * This should be used in service worker 'activate' event.
 *
 * self.addEventListener('activate', (event) => {
 *   event.waitUntil(cleanupOldCaches('my-cache-v2'));
 * });
 */
export async function cleanupOldCaches(currentCacheVersion) {
  const existingCaches = await caches.keys();

  const cachesToDelete = existingCaches.filter(
    (cache) => cache !== currentCacheVersion
  );

  let promises = [];

  cachesToDelete.forEach((cache) => {
    promises.push(caches.delete(cache));
  });

  return Promise.all(promises);
}

// ===== WEB WORKERS =====

/**
 * Write a function that creates a Web Worker from a function.
 * The worker should execute the provided function with given data.
 *
 * const result = await createWorkerFromFunction(
 *   (data) => data.numbers.reduce((sum, n) => sum + n, 0),
 *   {numbers: [1, 2, 3, 4, 5]}
 * );
 * // Should return 15
 */
export async function createWorkerFromFunction(workerFunction, data) {
  // Convert the function to a string
  const workerFunctionStr = workerFunction.toString();

  // Create a worker script that will execute the function with the provided data
  const workerScript = `
    self.onmessage = function(e) {
      try {
        // Convert the string function to an actual function
        const fn = ${workerFunctionStr};
        // Execute the function with the data
        const result = fn(e.data);
        // Send the result back to the main thread
        self.postMessage(result);
      } catch (error) {
        // Handle any errors that occur during execution
        self.postMessage({ error: error.message });
      }
    };
  `;

  // Create a Blob from the worker script - note we're passing an array here
  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const myWorker = new Worker(url);

  myWorker.postMessage(data);

  return new Promise((resolve, reject) => {
    myWorker.onmessage = (e) => {
      // Check if the worker returned an error
      if (e.data && e.data.error) {
        reject(new Error(e.data.error));
      } else {
        resolve(e.data);
      }

      // Clean up resources
      myWorker.terminate();
      URL.revokeObjectURL(url);
    };

    myWorker.onerror = (error) => {
      reject(new Error(`Worker error: ${error.message}`));
      myWorker.terminate();
      URL.revokeObjectURL(url);
    };
  });
}

/**
 * Write a function that creates a Web Worker for heavy computation.
 * The worker should calculate prime numbers up to a given limit.
 *
 * const primes = await calculatePrimesInWorker(1000);
 * // Should return array of prime numbers up to 1000
 */
export async function calculatePrimesInWorker(limit) {
  function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  }

  function primeAlgorithm(data) {
    const limit = data.numbers[0]; // Extract limit from the data.numbers array
    const prime = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) {
        prime.push(i);
      }
    }
    return prime;
  }

  const isPrimeStr = isPrime.toString();
  const workerAlgoStr = primeAlgorithm.toString();

  const workerScript = `
    self.onmessage = function(e) {
      try {
        // Convert the string function to an actual function
        ${isPrimeStr}
        const fn = ${workerAlgoStr};
        // Execute the function with the data
        const result = fn(e.data);
        // Send the result back to the main thread
        self.postMessage(result);
      } catch (error) {
        // Handle any errors that occur during execution
        self.postMessage({ error: error.message });
      }
    };
  `;

  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const myWorker = new Worker(url);

  // Structure the data to match what the mock worker expects
  myWorker.postMessage({ numbers: [limit] });

  return new Promise((resolve, reject) => {
    myWorker.onmessage = (e) => {
      // Check if the worker returned an error
      if (e.data && e.data.error) {
        reject(new Error(e.data.error));
      } else {
        resolve(e.data);
      }

      // Clean up resources
      myWorker.terminate();
      URL.revokeObjectURL(url);
    };

    myWorker.onerror = (error) => {
      reject(new Error(`Worker error: ${error.message}`));
      myWorker.terminate();
      URL.revokeObjectURL(url);
    };
  });
}

/**
 * Write a function that manages multiple Web Workers for parallel processing.
 * Split an array into chunks and process each chunk in a separate worker.
 *
 * const results = await processArrayInParallel(
 *   [1, 2, 3, 4, 5, 6, 7, 8],
 *   (chunk) => chunk.map(n => n * 2),
 *   2 // number of workers
 * );
 * // Should return [2, 4, 6, 8, 10, 12, 14, 16]
 */
export async function processArrayInParallel(
  array,
  processingFunction,
  workerCount
) {
  const chunkSize = Math.ceil(array.length / workerCount);
  const chunked = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize));
  }

  const processingFuncStr = processingFunction.toString();

  const workerScript = `
    self.onmessage = function(e) {
      try {
        // Convert the string function to an actual function
        const fn = ${processingFuncStr};
        // Execute the function with the data
        const result = fn(e.data);
        // Send the result back to the main thread
        self.postMessage(result);
      } catch (error) {
        // Handle any errors that occur during execution
        self.postMessage({ error: error.message });
      }
    };
  `;

  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  const promises = chunked.map((array) => {
    const myWorker = new Worker(url);
    myWorker.postMessage(array);

    return new Promise((resolve, reject) => {
      myWorker.onmessage = (e) => {
        if (e.data && e.data.error) {
          reject(new Error(e.data.error));
        } else {
          resolve(e.data);
        }

        myWorker.terminate();
      };

      myWorker.onerror = (error) => {
        reject(new Error(`Worker error: ${error.message}`));
        myWorker.terminate();
      };
    });
  });

  return Promise.all(promises)
    .then((responses) => {
      const result = responses.flat();
      URL.revokeObjectURL(url);
      return result;
    })
    .catch((error) => {
      URL.revokeObjectURL(url);
      throw new Error(error.message);
    });
}

/**
 * Write a function that creates a Web Worker with error handling and timeout.
 * The worker should terminate if it takes too long or encounters an error.
 *
 * const result = await createRobustWorker(
 *   workerFn,
 *   data,
 *   5000
 * );
 */
export async function createRobustWorker(workerFunction, data, timeout) {
  const workerFunctionStr = workerFunction.toString();

  const workerScript = `
    self.onmessage = function(e) {
      try {
        // Convert the string function to an actual function
        // workerFunction
        const fn = ${workerFunctionStr};
        // Execute the function with the data
        const result = fn(e.data);
        // Send the result back to the main thread
        self.postMessage(result);
      } catch (error) {
        // Handle any errors that occur during execution
        self.postMessage({ error: error.message });
      }
    };
  `;

  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const myWorker = new Worker(url);
  myWorker.postMessage(data);

  const promise = new Promise((resolve, reject) => {
    myWorker.onmessage = (e) => {
      if (e.data && e.data.error) {
        reject(new Error(e.data.error));
      } else {
        resolve(e.data);
      }

      myWorker.terminate();
      URL.revokeObjectURL(url);
    };

    myWorker.onerror = (error) => {
      reject(new Error(`Worker error: ${error.message}`));
      myWorker.terminate();
      URL.revokeObjectURL(url);
    };
  });

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
      myWorker.terminate();
      URL.revokeObjectURL(url);
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise]);
}

// ===== INDEXEDDB =====

/**
 * Write a function that opens an IndexedDB database and creates object stores.
 * Return a database connection that can be used for operations.
 *
 * const db = await openDatabase('MyApp', 1, ['users', 'posts']);
 * // Should open database with specified stores
 */
export async function openDatabase(dbName, version, storeNames) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      storeNames.forEach(function (storeName) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = () => {
      reject(new Error('Failed to open database'));
    };
  });
}

/**
 * Write a function that adds data to an IndexedDB object store.
 * Handle transactions and return the key of the added item.
 *
 * const key = await addToStore(db, 'users', {name: 'John', email: 'john@example.com'});
 * // Should add user and return generated key
 */
export async function addToStore(db, storeName, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    const request = store.add(data);

    request.onsuccess = (event) => {
      resolve(event.target.result); // Returns the generated key
    };

    request.onerror = (event) => {
      reject(new Error('Failed to add data to store'));
    };
  });
}

/**
 * Write a function that retrieves data from IndexedDB by key.
 * Return null if the item doesn't exist.
 *
 * const user = await getFromStore(db, 'users', 123);
 * // Should return user object or null
 */
export async function getFromStore(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.get(key);

    request.onsuccess = (event) => {
      resolve(event.target.result || null);
    };

    request.onerror = (event) => {
      reject(new Error('Failed to get data from store'));
    };
  });
}

/**
 * Write a function that queries IndexedDB using an index.
 * Return all items matching the query value.
 *
 * const users = await queryByIndex(db, 'users', 'email', 'john@example.com');
 * // Should return array of users with matching email
 */
export async function queryByIndex(db, storeName, indexName, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);

    const index = store.index(indexName);
    const request = index.getAll(value);

    request.onsuccess = (event) => {
      resolve(event.target.result || null);
    };

    request.onerror = (event) => {
      reject(new Error('Failed to get data from store'));
    };
  });
}

// ===== WEBSOCKETS =====

/**
 * Write a function that creates a WebSocket connection with reconnection logic.
 * Automatically reconnect on connection loss with exponential backoff.
 *
 * const ws = await createReconnectingWebSocket('ws://localhost:8080');
 * ws.onMessage((data) => console.log('Received:', data));
 * ws.send({type: 'hello', data: 'world'});
 */
export async function createReconnectingWebSocket(url, options = {}) {
  // Default options
  const config = {
    initialDelay: 1000,
    maxDelay: 30000,
    maxAttempts: 10,
    ...options
  };

  // Internal state
  let webSocket = null;
  let connectionStatus = 'disconnected'; // 'connecting', 'connected', 'disconnected', 'reconnecting'
  let reconnectAttempts = 0;
  let currentDelay = config.initialDelay;
  let intentionalClose = false;
  let reconnectTimeoutId = null;
  let messageQueue = [];

  // User-provided event handlers
  let userMessageHandler = null;
  let userOpenHandler = null;
  let userCloseHandler = null;
  let userErrorHandler = null;

  await createConnection();

  async function createConnection() {
    return new Promise((resolve, reject) => {
      connectionStatus = 'connecting';
      webSocket = new WebSocket(url);

      setupEventHandlers(resolve, reject);
    });
  }

  function setupEventHandlers(resolve = null, reject = null) {
    webSocket.onopen = (event) => {
      connectionStatus = 'connected';
      resetReconnectionState();

      // Send any queued messages
      while (messageQueue.length > 0) {
        const message = messageQueue.shift();
        webSocket.send(message);
      }

      // Call user handler if provided
      if (userOpenHandler) {
        userOpenHandler(event);
      }

      // Resolve promise for initial connection
      if (resolve) {
        resolve();
      }
    };

    webSocket.onmessage = (event) => {
      if (userMessageHandler) {
        userMessageHandler(event.data);
      }
    };

    webSocket.onclose = (event) => {
      connectionStatus = 'disconnected';

      // Call user handler if provided
      if (userCloseHandler) {
        userCloseHandler(event);
      }

      // Only attempt reconnection if close was not intentional
      if (!intentionalClose) {
        scheduleReconnect();
      }
    };

    webSocket.onerror = (error) => {
      // Call user handler if provided
      if (userErrorHandler) {
        userErrorHandler(error);
      }

      // Reject promise for initial connection
      if (reject) {
        reject(
          new Error(
            `WebSocket connection failed: ${error.message || 'Unknown error'}`
          )
        );
      }
    };
  }

  function scheduleReconnect() {
    if (reconnectAttempts >= config.maxAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    connectionStatus = 'reconnecting';
    reconnectAttempts++;

    reconnectTimeoutId = setTimeout(async () => {
      try {
        await createConnection();
      } catch (error) {
        console.error('Reconnection attempt failed:', error);
        // Exponential backoff
        currentDelay = Math.min(currentDelay * 2, config.maxDelay);
        scheduleReconnect();
      }
    }, currentDelay);

    // Exponential backoff for next attempt
    currentDelay = Math.min(currentDelay * 2, config.maxDelay);
  }

  function resetReconnectionState() {
    reconnectAttempts = 0;
    currentDelay = config.initialDelay;
    if (reconnectTimeoutId) {
      clearTimeout(reconnectTimeoutId);
      reconnectTimeoutId = null;
    }
  }

  // Public API
  return {
    send(data) {
      const message = typeof data === 'string' ? data : JSON.stringify(data);

      if (
        connectionStatus === 'connected' &&
        webSocket.readyState === WebSocket.OPEN
      ) {
        webSocket.send(message);
      } else {
        // Queue message for when connection is restored
        messageQueue.push(message);
      }
    },

    onMessage(callback) {
      userMessageHandler = callback;
    },

    onOpen(callback) {
      userOpenHandler = callback;
    },

    onClose(callback) {
      userCloseHandler = callback;
    },

    onError(callback) {
      userErrorHandler = callback;
    },

    close() {
      intentionalClose = true;

      // Clear any pending reconnection
      if (reconnectTimeoutId) {
        clearTimeout(reconnectTimeoutId);
        reconnectTimeoutId = null;
      }

      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.close();
      }

      connectionStatus = 'disconnected';
    },

    // Utility methods
    getConnectionStatus() {
      return connectionStatus;
    },

    getReconnectAttempts() {
      return reconnectAttempts;
    }
  };
}

// ===== FILE API =====

/**
 * Write a function that reads a file as text using the File API.
 * Handle different file types and encoding properly.
 *
 * const content = await readFileAsText(file);
 * // Should return file content as string
 */
export async function readFileAsText(file) {
  if (!(file instanceof File)) {
    throw new Error('This is not a file');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (event) => {
      reject(
        new Error(
          'Failed to read file: ' +
            (event.target.error ? event.target.error.message : 'Unknown error')
        )
      );
    };

    reader.readAsText(file);
  });
}

/**
 * Write a function that reads an image file and returns a data URL.
 * Validate that the file is actually an image.
 *
 * const dataUrl = await readImageAsDataURL(imageFile);
 * // Should return base64 data URL for image
 */
export async function readImageAsDataURL(file) {
  if (!(file instanceof File)) {
    throw new Error('This is not a file');
  }

  if (!file.type.startsWith('image')) {
    throw new Error('This is not an image');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (event) => {
      reject(
        new Error(
          'Failed to read file: ' +
            (event.target.error ? event.target.error.message : 'Unknown error')
        )
      );
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Write a function that processes files in chunks for large file handling.
 * Read and process file data in smaller chunks to avoid memory issues.
 *
 * const hash = await processFileInChunks(
 *   largeFile,
 *   (chunk) => updateHash(chunk),
 *   1024 * 1024 // 1MB chunks
 * );
 */
export async function processFileInChunks(file, processor, chunkSize) {
  if (!(file instanceof File)) {
    throw new Error('This is not a file');
  }

  let offset = 0;
  const results = [];

  while (offset < file.size) {
    const slice = file.slice(offset, offset + chunkSize);
    const chunk = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = (event) =>
        reject(
          new Error(
            'Failed to read file: ' +
              (event.target.error
                ? event.target.error.message
                : 'Unknown error')
          )
        );

      reader.readAsText(slice);
    });

    results.push(await processor(chunk));
    offset += chunkSize;
  }

  return results;
}

/**
 * Write a function that validates file types and size before processing.
 * Check MIME type, file extension, and size constraints.
 *
 * const isValid = await validateFile(file, {
 *   allowedTypes: ['image/jpeg', 'image/png'],
 *   maxSize: 5 * 1024 * 1024, // 5MB
 *   allowedExtensions: ['.jpg', '.png']
 * });
 */
export function validateFile(file, constraints) {
  // Check type
  if (!constraints.allowedTypes.includes(file.type.toLowerCase())) {
    return false;
  }

  // Check extensions
  if (!constraints.allowedExtensions.includes('.' + file.extension)) {
    return false;
  }

  // Check size
  if (file.size > constraints.maxSize) {
    return false;
  }

  return true;
}

/**
 * Write a function that creates a file download from blob data.
 * Generate a downloadable file with the specified name and content.
 *
 * downloadFile(new Blob(['Hello World']), 'hello.txt', 'text/plain');
 * // Should trigger file download
 */
export function downloadFile(blob, filename) {
  let tempURL = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = tempURL;
  anchor.download = filename;

  anchor.click();

  URL.revokeObjectURL(tempURL);
}

/**
 * Write a function that implements drag-and-drop file upload.
 * Handle drag events and extract files from drop events.
 * Return a promise that resolves with the dropped files.
 *
 * const files = await setupFileDropZone(dropZoneElement);
 * // Should handle drag/drop and return FileList
 */
export async function setupFileDropZone(element) {
  element.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  return new Promise((resolve) => {
    function dropHandler(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      element.removeEventListener('drop', dropHandler);
      resolve(files);
    }
    element.addEventListener('drop', dropHandler);
  });
}

/**
 * Write a function that creates a file upload with progress tracking.
 * Upload file via FormData and track upload progress.
 *
 * const result = await uploadFileWithProgress(
 *   file,
 *   '/api/upload',
 *   (progress) => console.log(`${progress}% uploaded`)
 * );
 */
export async function uploadFileWithProgress(file, url, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.set('file', file);

    function progressListener(event) {
      onProgress(Math.round((event.loaded / event.total) * 100));
    }

    function loadEvent(event) {
      try {
        const response = JSON.parse(event.target.response);
        resolve(response);
      } catch (error) {
        reject(new Error(error.message));
      }
    }

    function errorEvent(event) {
      reject(new Error(event.target.statusText));
    }

    const req = new XMLHttpRequest();
    req.open('POST', url);

    req.upload.addEventListener('progress', progressListener);
    req.addEventListener('load', loadEvent);
    req.addEventListener('error', errorEvent);

    req.send(formData);
  });
}
