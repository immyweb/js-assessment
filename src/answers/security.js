/**
 * For each of the following exercises, write a function that returns
 * the correct result.
 *
 * These exercises focus on fundamental JavaScript security concepts
 * including XSS prevention, CSRF protection, input sanitization,
 * secure data handling, and common security patterns.
 */

/**
 * Write a function that sanitizes HTML input to prevent XSS attacks.
 * Remove script tags, event handlers, and javascript: protocols.
 *
 * sanitizeHTML('<img src=x onerror="alert(1)">')
 * // returns '<img src=x>'
 *
 * sanitizeHTML('<script>alert("XSS")</script>Hello')
 * // returns 'Hello'
 */
export function sanitizeHTML(input) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '');
}

/**
 * Write a function that escapes HTML special characters to prevent XSS.
 * Convert &, <, >, ", and ' to their HTML entity equivalents.
 *
 * escapeHTML('<script>alert("XSS")</script>')
 * // returns '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 */
export function escapeHTML(input) {
  if (typeof input !== 'string') return '';

  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  return input.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

/**
 * Write a function that validates and sanitizes a URL to prevent
 * javascript: and data: protocol exploits.
 *
 * sanitizeURL('https://example.com') // returns 'https://example.com'
 * sanitizeURL('javascript:alert(1)') // returns 'about:blank'
 * sanitizeURL('data:text/html,<script>alert(1)</script>') // returns 'about:blank'
 */
export function sanitizeURL(url) {
  if (typeof url !== 'string') return 'about:blank';

  const normalized = url.trim().toLowerCase();

  if (
    normalized.startsWith('javascript:') ||
    normalized.startsWith('data:') ||
    normalized.startsWith('vbscript:')
  ) {
    return 'about:blank';
  }

  return url;
}

/**
 * Write a function that generates a secure CSRF token.
 * The token should be a cryptographically secure random string.
 * Use crypto.randomBytes in Node.js or crypto.getRandomValues in browser.
 *
 * generateCSRFToken() // returns a random hex string like '4f3a2c1b...'
 */
export function generateCSRFToken() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Browser environment
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  } else if (typeof require !== 'undefined') {
    // Node.js environment
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
  }
  throw new Error('No crypto implementation available');
}

/**
 * Write a function that validates a CSRF token.
 * Tokens should match exactly and timing attacks should be prevented
 * using constant-time comparison.
 *
 * validateCSRFToken('token123', 'token123') // returns true
 * validateCSRFToken('token123', 'token456') // returns false
 */
export function validateCSRFToken(token1, token2) {
  if (typeof token1 !== 'string' || typeof token2 !== 'string') {
    return false;
  }

  if (token1.length !== token2.length) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < token1.length; i++) {
    result |= token1.charCodeAt(i) ^ token2.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Write a function that sanitizes user input for SQL-like queries.
 * Escape single quotes and remove potentially dangerous characters.
 *
 * sanitizeInput("'; DROP TABLE users; --")
 * // returns escaped/safe version
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/xp_/gi, '')
    .replace(/sp_/gi, '');
}

/**
 * Write a function that validates email addresses using a secure pattern.
 * Should reject emails with potentially dangerous characters.
 *
 * validateEmail('user@example.com') // returns true
 * validateEmail('user@example') // returns false
 * validateEmail('<script>@example.com') // returns false
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false;

  // Basic email pattern that rejects dangerous characters
  const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    emailPattern.test(email) &&
    !email.includes('<') &&
    !email.includes('>') &&
    !email.includes('script')
  );
}

/**
 * Write a function that implements Content Security Policy (CSP) header validation.
 * Parse a CSP string and check if it contains unsafe directives.
 *
 * validateCSP("default-src 'self'") // returns true
 * validateCSP("default-src 'unsafe-inline'") // returns false
 * validateCSP("script-src 'unsafe-eval'") // returns false
 */
export function validateCSP(cspHeader) {
  if (typeof cspHeader !== 'string') return false;

  const unsafeDirectives = ['unsafe-inline', 'unsafe-eval', 'unsafe-hashes'];
  const normalized = cspHeader.toLowerCase();

  return !unsafeDirectives.some((directive) => normalized.includes(directive));
}

/**
 * Write a function that implements rate limiting.
 * Track requests per identifier and block if limit is exceeded.
 *
 * const limiter = createRateLimiter(3, 60000); // 3 requests per minute
 * limiter.checkLimit('user1') // returns true (1st request)
 * limiter.checkLimit('user1') // returns true (2nd request)
 * limiter.checkLimit('user1') // returns true (3rd request)
 * limiter.checkLimit('user1') // returns false (4th request - blocked)
 */
export function createRateLimiter(maxRequests, windowMs) {
  const requests = new Map();

  return {
    checkLimit(identifier) {
      const now = Date.now();
      const userRequests = requests.get(identifier) || [];

      // Remove expired requests
      const validRequests = userRequests.filter(
        (time) => now - time < windowMs
      );

      if (validRequests.length >= maxRequests) {
        return false;
      }

      validRequests.push(now);
      requests.set(identifier, validRequests);

      return true;
    },
    reset(identifier) {
      requests.delete(identifier);
    }
  };
}

/**
 * Write a function that securely hashes passwords using a salt.
 * For this exercise, simulate using SHA-256 (in production, use bcrypt/scrypt).
 *
 * hashPassword('password123', 'randomsalt')
 * // returns hashed string
 */
export function hashPassword(password, salt) {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    // Browser environment - async
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    return crypto.subtle.digest('SHA-256', data).then((hash) => {
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    });
  } else if (typeof require !== 'undefined') {
    // Node.js environment - sync
    const crypto = require('crypto');
    return crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex');
  }
  throw new Error('No crypto implementation available');
}

/**
 * Write a function that validates password strength.
 * Password must:
 * - Be at least 8 characters
 * - Contain at least one uppercase letter
 * - Contain at least one lowercase letter
 * - Contain at least one number
 * - Contain at least one special character
 *
 * validatePasswordStrength('Weak1') // returns false
 * validatePasswordStrength('Strong123!') // returns true
 */
export function validatePasswordStrength(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return false;
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  return hasUppercase && hasLowercase && hasNumber && hasSpecial;
}

/**
 * Write a function that implements secure session token generation.
 * The token should be cryptographically secure and base64 encoded.
 *
 * generateSessionToken() // returns secure random token
 */
export function generateSessionToken() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  } else if (typeof require !== 'undefined') {
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('base64');
  }
  throw new Error('No crypto implementation available');
}

/**
 * Write a function that detects potential NoSQL injection attempts.
 * Check for MongoDB operators and other suspicious patterns.
 *
 * detectNoSQLInjection({ username: 'john' }) // returns false
 * detectNoSQLInjection({ username: { $gt: '' } }) // returns true
 * detectNoSQLInjection({ username: { $ne: null } }) // returns true
 */
export function detectNoSQLInjection(input) {
  if (typeof input !== 'object' || input === null) {
    return false;
  }

  const checkValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        if (key.startsWith('$')) {
          return true;
        }
        if (checkValue(value[key])) {
          return true;
        }
      }
    }
    return false;
  };

  return checkValue(input);
}

/**
 * Write a function that implements path traversal protection.
 * Prevent access to files outside the allowed directory.
 *
 * isPathSafe('/files/document.pdf', '/files') // returns true
 * isPathSafe('/files/../../../etc/passwd', '/files') // returns false
 */
export function isPathSafe(requestedPath, allowedBase) {
  if (typeof requestedPath !== 'string' || typeof allowedBase !== 'string') {
    return false;
  }

  // Normalize paths
  const normalize = (path) => {
    const parts = path.split('/').filter(Boolean);
    const normalized = [];

    for (const part of parts) {
      if (part === '..') {
        normalized.pop();
      } else if (part !== '.') {
        normalized.push(part);
      }
    }

    return '/' + normalized.join('/');
  };

  const normalizedRequested = normalize(requestedPath);
  const normalizedBase = normalize(allowedBase);

  return normalizedRequested.startsWith(normalizedBase);
}

/**
 * Write a function that sanitizes JSON input to prevent prototype pollution.
 * Remove __proto__, constructor, and prototype keys.
 *
 * sanitizeJSON({ name: 'John', age: 30 })
 * // returns { name: 'John', age: 30 }
 *
 * sanitizeJSON({ __proto__: { isAdmin: true }, name: 'John' })
 * // returns { name: 'John' }
 */
export function sanitizeJSON(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeJSON(item));
  }

  const sanitized = {};
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !dangerousKeys.includes(key)) {
      sanitized[key] = sanitizeJSON(obj[key]);
    }
  }

  return sanitized;
}

/**
 * Write a function that implements secure cookie attributes.
 * Return a cookie string with proper security flags.
 *
 * createSecureCookie('sessionId', 'abc123', { httpOnly: true, secure: true })
 * // returns 'sessionId=abc123; HttpOnly; Secure; SameSite=Strict'
 */
export function createSecureCookie(name, value, options = {}) {
  let cookie = `${name}=${value}`;

  if (options.httpOnly) {
    cookie += '; HttpOnly';
  }

  if (options.secure) {
    cookie += '; Secure';
  }

  if (options.sameSite) {
    cookie += `; SameSite=${options.sameSite}`;
  } else {
    cookie += '; SameSite=Strict';
  }

  if (options.maxAge) {
    cookie += `; Max-Age=${options.maxAge}`;
  }

  if (options.path) {
    cookie += `; Path=${options.path}`;
  }

  return cookie;
}

/**
 * Write a function that validates and sanitizes file uploads.
 * Check file type, size, and extension.
 *
 * validateFileUpload({
 *   name: 'image.jpg',
 *   type: 'image/jpeg',
 *   size: 1000000
 * }, ['jpg', 'png'], 5000000)
 * // returns { valid: true }
 */
export function validateFileUpload(file, allowedExtensions, maxSize) {
  const result = { valid: true, errors: [] };

  if (!file || !file.name) {
    result.valid = false;
    result.errors.push('No file provided');
    return result;
  }

  // Check file size
  if (file.size > maxSize) {
    result.valid = false;
    result.errors.push('File too large');
  }

  // Check extension
  const extension = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    result.valid = false;
    result.errors.push('Invalid file type');
  }

  // Check for double extensions
  const parts = file.name.split('.');
  if (parts.length > 2) {
    result.valid = false;
    result.errors.push('Multiple extensions not allowed');
  }

  return result;
}

/**
 * Write a function that implements HTTP header security validation.
 * Check for security headers and their proper values.
 *
 * validateSecurityHeaders({
 *   'X-Frame-Options': 'DENY',
 *   'X-Content-Type-Options': 'nosniff',
 *   'Strict-Transport-Security': 'max-age=31536000'
 * })
 * // returns { valid: true, missing: [] }
 */
export function validateSecurityHeaders(headers) {
  const requiredHeaders = {
    'X-Frame-Options': ['DENY', 'SAMEORIGIN'],
    'X-Content-Type-Options': ['nosniff'],
    'Strict-Transport-Security': null, // Any value with max-age
    'X-XSS-Protection': ['1; mode=block', '0']
  };

  const missing = [];
  const invalid = [];

  for (const [header, validValues] of Object.entries(requiredHeaders)) {
    const headerValue = headers[header];

    if (!headerValue) {
      missing.push(header);
    } else if (
      validValues &&
      !validValues.some((v) => headerValue.includes(v))
    ) {
      invalid.push(header);
    }
  }

  return {
    valid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid
  };
}

/**
 * Write a function that implements command injection prevention.
 * Validate user input that will be used in system commands.
 *
 * isSafeCommand('ls -la') // returns true
 * isSafeCommand('ls; rm -rf /') // returns false
 * isSafeCommand('$(whoami)') // returns false
 */
export function isSafeCommand(command) {
  if (typeof command !== 'string') return false;

  const dangerousPatterns = [
    /[;&|`$()]/, // Command chaining and substitution
    /\$\{/, // Variable substitution
    /\.\.\//, // Path traversal
    />/, // Redirection
    /<\(/, // Process substitution
    /\|\|/, // OR operator
    /&&/ // AND operator
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(command));
}

/**
 * Write a function that redacts sensitive information from logs.
 * Replace credit card numbers, SSNs, and API keys with masked values.
 *
 * redactSensitiveData('Card: 4532-1234-5678-9010')
 * // returns 'Card: ****-****-****-9010'
 *
 * redactSensitiveData('API_KEY=sk_live_abc123def456')
 * // returns 'API_KEY=[REDACTED]'
 */
export function redactSensitiveData(text) {
  if (typeof text !== 'string') return '';

  let redacted = text;

  // Credit card numbers (keep last 4 digits)
  redacted = redacted.replace(
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s](\d{4})\b/g,
    '****-****-****-$1'
  );

  // SSN
  redacted = redacted.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '***-**-****');

  // API keys (various patterns)
  redacted = redacted.replace(/\b(sk|pk|api)_\w+_[a-zA-Z0-9]+/gi, '[REDACTED]');

  // Generic API key patterns
  redacted = redacted.replace(
    /(api[_-]?key|apikey|token)[\s:=]+[a-zA-Z0-9_\-]+/gi,
    '$1=[REDACTED]'
  );

  return redacted;
}
