import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  sanitizeHTML,
  escapeHTML,
  sanitizeURL,
  generateCSRFToken,
  validateCSRFToken,
  sanitizeInput,
  validateEmail,
  validateCSP,
  createRateLimiter,
  hashPassword,
  validatePasswordStrength,
  generateSessionToken,
  detectNoSQLInjection,
  isPathSafe,
  sanitizeJSON,
  createSecureCookie,
  validateFileUpload,
  validateSecurityHeaders,
  isSafeCommand,
  redactSensitiveData
} from '../exercises/security.js';

describe('Security Exercises', () => {
  describe('sanitizeHTML', () => {
    it('should remove script tags', () => {
      expect(sanitizeHTML('<script>alert("XSS")</script>Hello')).toBe('Hello');
      expect(sanitizeHTML('<SCRIPT>alert("XSS")</SCRIPT>World')).toBe('World');
    });

    it('should remove event handlers', () => {
      expect(sanitizeHTML('<img src=x onerror="alert(1)">')).toBe(
        '<img src=x>'
      );
      expect(sanitizeHTML('<div onclick="malicious()">Click</div>')).toBe(
        '<div>Click</div>'
      );
      expect(sanitizeHTML('<body onload="hack()">')).toBe('<body>');
    });

    it('should remove javascript: protocol', () => {
      expect(sanitizeHTML('<a href="javascript:alert(1)">link</a>')).toBe(
        '<a href="">link</a>'
      );
    });

    it('should handle non-string input', () => {
      expect(sanitizeHTML(null)).toBe('');
      expect(sanitizeHTML(undefined)).toBe('');
      expect(sanitizeHTML(123)).toBe('');
    });

    it('should allow safe HTML', () => {
      expect(sanitizeHTML('<p>Hello World</p>')).toBe('<p>Hello World</p>');
      expect(sanitizeHTML('<div><span>Text</span></div>')).toContain('Text');
    });
  });

  describe('escapeHTML', () => {
    it('should escape special HTML characters', () => {
      expect(escapeHTML('<script>alert("XSS")</script>')).toBe(
        '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
      );
    });

    it('should escape ampersands', () => {
      expect(escapeHTML('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should escape quotes', () => {
      expect(escapeHTML('"Hello" and \'World\'')).toBe(
        '&quot;Hello&quot; and &#x27;World&#x27;'
      );
    });

    it('should handle non-string input', () => {
      expect(escapeHTML(null)).toBe('');
      expect(escapeHTML(undefined)).toBe('');
    });

    it('should not modify safe text', () => {
      expect(escapeHTML('Hello World')).toBe('Hello World');
    });
  });

  describe('sanitizeURL', () => {
    it('should allow safe URLs', () => {
      expect(sanitizeURL('https://example.com')).toBe('https://example.com');
      expect(sanitizeURL('http://example.com')).toBe('http://example.com');
      expect(sanitizeURL('/relative/path')).toBe('/relative/path');
    });

    it('should block javascript: protocol', () => {
      expect(sanitizeURL('javascript:alert(1)')).toBe('about:blank');
      expect(sanitizeURL('JAVASCRIPT:alert(1)')).toBe('about:blank');
    });

    it('should block data: protocol', () => {
      expect(sanitizeURL('data:text/html,<script>alert(1)</script>')).toBe(
        'about:blank'
      );
    });

    it('should block vbscript: protocol', () => {
      expect(sanitizeURL('vbscript:alert(1)')).toBe('about:blank');
    });

    it('should handle non-string input', () => {
      expect(sanitizeURL(null)).toBe('about:blank');
      expect(sanitizeURL(undefined)).toBe('about:blank');
    });
  });

  describe('generateCSRFToken', () => {
    it('should generate a token', () => {
      const token = generateCSRFToken();
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate different tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(token1).not.toBe(token2);
    });

    it('should generate hex string', () => {
      const token = generateCSRFToken();
      expect(/^[0-9a-f]+$/.test(token)).toBe(true);
    });
  });

  describe('validateCSRFToken', () => {
    it('should validate matching tokens', () => {
      expect(validateCSRFToken('token123', 'token123')).toBe(true);
      expect(validateCSRFToken('abc', 'abc')).toBe(true);
    });

    it('should reject non-matching tokens', () => {
      expect(validateCSRFToken('token123', 'token456')).toBe(false);
      expect(validateCSRFToken('abc', 'def')).toBe(false);
    });

    it('should reject tokens of different lengths', () => {
      expect(validateCSRFToken('short', 'longertoken')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(validateCSRFToken(null, 'token')).toBe(false);
      expect(validateCSRFToken('token', null)).toBe(false);
      expect(validateCSRFToken(123, 'token')).toBe(false);
    });

    it('should be constant-time (basic check)', () => {
      // This is a basic test - real timing attacks would require more sophisticated testing
      const token1 = 'a'.repeat(32);
      const token2 = 'b'.repeat(32);
      expect(validateCSRFToken(token1, token2)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should escape single quotes', () => {
      expect(sanitizeInput("O'Brien")).toBe("O''Brien");
    });

    it('should remove dangerous SQL characters', () => {
      const input = "'; DROP TABLE users; --";
      const result = sanitizeInput(input);
      expect(result).not.toContain(';');
      expect(result).not.toContain('--');
    });

    it('should remove SQL comments', () => {
      expect(sanitizeInput('SELECT * FROM users /* comment */')).not.toContain(
        '/*'
      );
    });

    it('should remove SQL procedures', () => {
      const result = sanitizeInput('xp_cmdshell sp_executesql');
      expect(result.toLowerCase()).not.toContain('xp_');
      expect(result.toLowerCase()).not.toContain('sp_');
    });

    it('should handle non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('first.last@example.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('user@example')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user')).toBe(false);
    });

    it('should reject emails with dangerous characters', () => {
      expect(validateEmail('<script>@example.com')).toBe(false);
      expect(validateEmail('user<script>@example.com')).toBe(false);
      expect(validateEmail('user>@example.com')).toBe(false);
    });

    it('should handle non-string input', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
      expect(validateEmail(123)).toBe(false);
    });
  });

  describe('validateCSP', () => {
    it('should accept safe CSP directives', () => {
      expect(validateCSP("default-src 'self'")).toBe(true);
      expect(validateCSP("script-src 'self' https://trusted.com")).toBe(true);
      expect(validateCSP('img-src *')).toBe(true);
    });

    it('should reject unsafe-inline', () => {
      expect(validateCSP("default-src 'unsafe-inline'")).toBe(false);
      expect(validateCSP("script-src 'self' 'unsafe-inline'")).toBe(false);
    });

    it('should reject unsafe-eval', () => {
      expect(validateCSP("script-src 'unsafe-eval'")).toBe(false);
      expect(validateCSP("default-src 'self' 'unsafe-eval'")).toBe(false);
    });

    it('should reject unsafe-hashes', () => {
      expect(validateCSP("script-src 'unsafe-hashes'")).toBe(false);
    });

    it('should handle non-string input', () => {
      expect(validateCSP(null)).toBe(false);
      expect(validateCSP(undefined)).toBe(false);
    });
  });

  describe('createRateLimiter', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it('should allow requests within limit', () => {
      const limiter = createRateLimiter(3, 60000);
      expect(limiter.checkLimit('user1')).toBe(true);
      expect(limiter.checkLimit('user1')).toBe(true);
      expect(limiter.checkLimit('user1')).toBe(true);
    });

    it('should block requests exceeding limit', () => {
      const limiter = createRateLimiter(3, 60000);
      limiter.checkLimit('user1');
      limiter.checkLimit('user1');
      limiter.checkLimit('user1');
      expect(limiter.checkLimit('user1')).toBe(false);
    });

    it('should track users separately', () => {
      const limiter = createRateLimiter(2, 60000);
      limiter.checkLimit('user1');
      limiter.checkLimit('user1');
      expect(limiter.checkLimit('user2')).toBe(true);
      expect(limiter.checkLimit('user1')).toBe(false);
    });

    it('should reset after time window', () => {
      const limiter = createRateLimiter(2, 1000);
      limiter.checkLimit('user1');
      limiter.checkLimit('user1');
      expect(limiter.checkLimit('user1')).toBe(false);

      vi.advanceTimersByTime(1001);
      expect(limiter.checkLimit('user1')).toBe(true);
    });

    it('should have a reset method', () => {
      const limiter = createRateLimiter(2, 60000);
      limiter.checkLimit('user1');
      limiter.checkLimit('user1');
      limiter.reset('user1');
      expect(limiter.checkLimit('user1')).toBe(true);
    });

    vi.useRealTimers();
  });

  describe('hashPassword', () => {
    it('should hash a password with salt', async () => {
      const hash = await hashPassword('password123', 'salt');
      expect(hash).toBeTruthy();
      expect(typeof hash).toBe('string');
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should produce consistent hashes', async () => {
      const hash1 = await hashPassword('password', 'salt');
      const hash2 = await hashPassword('password', 'salt');
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different passwords', async () => {
      const hash1 = await hashPassword('password1', 'salt');
      const hash2 = await hashPassword('password2', 'salt');
      expect(hash1).not.toBe(hash2);
    });

    it('should produce different hashes for different salts', async () => {
      const hash1 = await hashPassword('password', 'salt1');
      const hash2 = await hashPassword('password', 'salt2');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should accept strong passwords', () => {
      expect(validatePasswordStrength('Strong123!')).toBe(true);
      expect(validatePasswordStrength('P@ssw0rd')).toBe(true);
      expect(validatePasswordStrength('MyP@ss123')).toBe(true);
    });

    it('should reject short passwords', () => {
      expect(validatePasswordStrength('Weak1!')).toBe(false);
      expect(validatePasswordStrength('Ab1!')).toBe(false);
    });

    it('should require uppercase letter', () => {
      expect(validatePasswordStrength('password123!')).toBe(false);
    });

    it('should require lowercase letter', () => {
      expect(validatePasswordStrength('PASSWORD123!')).toBe(false);
    });

    it('should require number', () => {
      expect(validatePasswordStrength('Password!')).toBe(false);
    });

    it('should require special character', () => {
      expect(validatePasswordStrength('Password123')).toBe(false);
    });

    it('should handle non-string input', () => {
      expect(validatePasswordStrength(null)).toBe(false);
      expect(validatePasswordStrength(undefined)).toBe(false);
    });
  });

  describe('generateSessionToken', () => {
    it('should generate a token', () => {
      const token = generateSessionToken();
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('should generate different tokens', () => {
      const token1 = generateSessionToken();
      const token2 = generateSessionToken();
      expect(token1).not.toBe(token2);
    });

    it('should generate base64 encoded token', () => {
      const token = generateSessionToken();
      // Base64 pattern check
      expect(/^[A-Za-z0-9+/=]+$/.test(token)).toBe(true);
    });
  });

  describe('detectNoSQLInjection', () => {
    it('should allow safe objects', () => {
      expect(detectNoSQLInjection({ username: 'john' })).toBe(false);
      expect(detectNoSQLInjection({ age: 30, name: 'Jane' })).toBe(false);
    });

    it('should detect MongoDB operators', () => {
      expect(detectNoSQLInjection({ username: { $gt: '' } })).toBe(true);
      expect(detectNoSQLInjection({ username: { $ne: null } })).toBe(true);
      expect(detectNoSQLInjection({ password: { $regex: '.*' } })).toBe(true);
    });

    it('should detect nested operators', () => {
      expect(
        detectNoSQLInjection({
          user: {
            name: 'john',
            role: { $in: ['admin'] }
          }
        })
      ).toBe(true);
    });

    it('should handle non-object input', () => {
      expect(detectNoSQLInjection(null)).toBe(false);
      expect(detectNoSQLInjection('string')).toBe(false);
      expect(detectNoSQLInjection(123)).toBe(false);
    });
  });

  describe('isPathSafe', () => {
    it('should allow safe paths', () => {
      expect(isPathSafe('/files/document.pdf', '/files')).toBe(true);
      expect(isPathSafe('/files/subfolder/file.txt', '/files')).toBe(true);
    });

    it('should block path traversal', () => {
      expect(isPathSafe('/files/../../../etc/passwd', '/files')).toBe(false);
      expect(isPathSafe('/files/../outside.txt', '/files')).toBe(false);
    });

    it('should normalize paths correctly', () => {
      expect(isPathSafe('/files/./document.pdf', '/files')).toBe(true);
      expect(isPathSafe('/files//document.pdf', '/files')).toBe(true);
    });

    it('should handle non-string input', () => {
      expect(isPathSafe(null, '/files')).toBe(false);
      expect(isPathSafe('/files/doc.pdf', null)).toBe(false);
    });
  });

  describe('sanitizeJSON', () => {
    it('should allow safe objects', () => {
      const input = { name: 'John', age: 30 };
      const result = sanitizeJSON(input);
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should remove __proto__', () => {
      const input = { __proto__: { isAdmin: true }, name: 'John' };
      const result = sanitizeJSON(input);
      expect(result).toEqual({ name: 'John' });
      expect(result.__proto__).not.toHaveProperty('isAdmin');
    });

    it('should remove constructor', () => {
      const input = { constructor: { malicious: true }, name: 'John' };
      const result = sanitizeJSON(input);
      expect(result).toEqual({ name: 'John' });
    });

    it('should remove prototype', () => {
      const input = { prototype: { evil: true }, name: 'John' };
      const result = sanitizeJSON(input);
      expect(result).toEqual({ name: 'John' });
    });

    it('should handle nested objects', () => {
      const input = {
        user: {
          name: 'John',
          __proto__: { isAdmin: true }
        }
      };
      const result = sanitizeJSON(input);
      expect(result).toEqual({ user: { name: 'John' } });
    });

    it('should handle arrays', () => {
      const input = [
        { name: 'John' },
        { __proto__: { bad: true }, name: 'Jane' }
      ];
      const result = sanitizeJSON(input);
      expect(result).toEqual([{ name: 'John' }, { name: 'Jane' }]);
    });

    it('should handle primitive values', () => {
      expect(sanitizeJSON(null)).toBeNull();
      expect(sanitizeJSON('string')).toBe('string');
      expect(sanitizeJSON(123)).toBe(123);
    });
  });

  describe('createSecureCookie', () => {
    it('should create basic cookie', () => {
      const cookie = createSecureCookie('sessionId', 'abc123');
      expect(cookie).toContain('sessionId=abc123');
    });

    it('should add HttpOnly flag', () => {
      const cookie = createSecureCookie('sessionId', 'abc123', {
        httpOnly: true
      });
      expect(cookie).toContain('HttpOnly');
    });

    it('should add Secure flag', () => {
      const cookie = createSecureCookie('sessionId', 'abc123', {
        secure: true
      });
      expect(cookie).toContain('Secure');
    });

    it('should default to SameSite=Strict', () => {
      const cookie = createSecureCookie('sessionId', 'abc123');
      expect(cookie).toContain('SameSite=Strict');
    });

    it('should allow custom SameSite', () => {
      const cookie = createSecureCookie('sessionId', 'abc123', {
        sameSite: 'Lax'
      });
      expect(cookie).toContain('SameSite=Lax');
    });

    it('should add Max-Age', () => {
      const cookie = createSecureCookie('sessionId', 'abc123', {
        maxAge: 3600
      });
      expect(cookie).toContain('Max-Age=3600');
    });

    it('should add Path', () => {
      const cookie = createSecureCookie('sessionId', 'abc123', { path: '/' });
      expect(cookie).toContain('Path=/');
    });

    it('should combine multiple attributes', () => {
      const cookie = createSecureCookie('sessionId', 'abc123', {
        httpOnly: true,
        secure: true,
        maxAge: 3600,
        path: '/'
      });
      expect(cookie).toContain('HttpOnly');
      expect(cookie).toContain('Secure');
      expect(cookie).toContain('Max-Age=3600');
      expect(cookie).toContain('Path=/');
    });
  });

  describe('validateFileUpload', () => {
    it('should validate correct files', () => {
      const file = { name: 'image.jpg', type: 'image/jpeg', size: 1000000 };
      const result = validateFileUpload(file, ['jpg', 'png'], 5000000);
      expect(result.valid).toBe(true);
    });

    it('should reject files that are too large', () => {
      const file = { name: 'image.jpg', type: 'image/jpeg', size: 10000000 };
      const result = validateFileUpload(file, ['jpg', 'png'], 5000000);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('File too large');
    });

    it('should reject invalid file types', () => {
      const file = { name: 'script.exe', type: 'application/exe', size: 1000 };
      const result = validateFileUpload(file, ['jpg', 'png'], 5000000);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid file type');
    });

    it('should reject double extensions', () => {
      const file = { name: 'image.jpg.exe', type: 'image/jpeg', size: 1000 };
      const result = validateFileUpload(file, ['jpg', 'png'], 5000000);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Multiple extensions not allowed');
    });

    it('should handle missing file', () => {
      const result = validateFileUpload(null, ['jpg'], 5000000);
      expect(result.valid).toBe(false);
    });
  });

  describe('validateSecurityHeaders', () => {
    it('should validate correct headers', () => {
      const headers = {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-XSS-Protection': '1; mode=block'
      };
      const result = validateSecurityHeaders(headers);
      expect(result.valid).toBe(true);
      expect(result.missing).toHaveLength(0);
    });

    it('should detect missing headers', () => {
      const headers = {
        'X-Frame-Options': 'DENY'
      };
      const result = validateSecurityHeaders(headers);
      expect(result.valid).toBe(false);
      expect(result.missing.length).toBeGreaterThan(0);
    });

    it('should accept SAMEORIGIN for X-Frame-Options', () => {
      const headers = {
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-XSS-Protection': '0'
      };
      const result = validateSecurityHeaders(headers);
      expect(result.valid).toBe(true);
    });
  });

  describe('isSafeCommand', () => {
    it('should allow safe commands', () => {
      expect(isSafeCommand('ls -la')).toBe(true);
      expect(isSafeCommand('echo hello')).toBe(true);
      expect(isSafeCommand('cat file.txt')).toBe(true);
    });

    it('should block command chaining with semicolon', () => {
      expect(isSafeCommand('ls; rm -rf /')).toBe(false);
    });

    it('should block command substitution', () => {
      expect(isSafeCommand('$(whoami)')).toBe(false);
      expect(isSafeCommand('`whoami`')).toBe(false);
    });

    it('should block piping', () => {
      expect(isSafeCommand('cat file.txt | sh')).toBe(false);
    });

    it('should block redirection', () => {
      expect(isSafeCommand('cat /etc/passwd > output')).toBe(false);
    });

    it('should block AND/OR operators', () => {
      expect(isSafeCommand('true && malicious')).toBe(false);
      expect(isSafeCommand('false || malicious')).toBe(false);
    });

    it('should block path traversal', () => {
      expect(isSafeCommand('cat ../../../etc/passwd')).toBe(false);
    });

    it('should handle non-string input', () => {
      expect(isSafeCommand(null)).toBe(false);
      expect(isSafeCommand(undefined)).toBe(false);
    });
  });

  describe('redactSensitiveData', () => {
    it('should redact credit card numbers', () => {
      expect(redactSensitiveData('Card: 4532-1234-5678-9010')).toBe(
        'Card: ****-****-****-9010'
      );
      expect(redactSensitiveData('Card: 4532123456789010')).toContain('****');
    });

    it('should redact SSN', () => {
      expect(redactSensitiveData('SSN: 123-45-6789')).toBe('SSN: ***-**-****');
    });

    it('should redact API keys', () => {
      expect(redactSensitiveData('API_KEY=sk_live_abc123def456')).toBe(
        'API_KEY=[REDACTED]'
      );
      expect(redactSensitiveData('key: pk_test_xyz789')).toContain(
        '[REDACTED]'
      );
    });

    it('should redact generic API key patterns', () => {
      expect(redactSensitiveData('api_key: mysecreetkey123')).toContain(
        '[REDACTED]'
      );
      expect(redactSensitiveData('token=abc123xyz')).toContain('[REDACTED]');
    });

    it('should handle multiple sensitive items', () => {
      const text = 'Card: 4532-1234-5678-9010 and API_KEY=sk_live_test123';
      const result = redactSensitiveData(text);
      expect(result).toContain('****-9010');
      expect(result).toContain('[REDACTED]');
    });

    it('should handle non-string input', () => {
      expect(redactSensitiveData(null)).toBe('');
      expect(redactSensitiveData(undefined)).toBe('');
    });

    it('should not modify safe text', () => {
      expect(redactSensitiveData('Hello World')).toBe('Hello World');
    });
  });
});
