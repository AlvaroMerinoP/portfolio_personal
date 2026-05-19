'use strict';
/**
 * Basic smoke tests for the portfolio API.
 * Uses Node.js built-in test runner (node:test) — no extra dependencies.
 */
const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

// Set test environment before loading the app
process.env.NODE_ENV = 'test';
process.env.ALLOWED_ORIGINS = 'http://localhost:5000';

const app = require('../server');
const http = require('node:http');

let server;
let port;

// Start server once per test file
test('setup', (t, done) => {
  server = http.createServer(app);
  server.listen(0, '127.0.0.1', () => {
    port = server.address().port;
    done();
  });
});

// ── Helper ──────────────────────────────────────────────────────────────────
const request = (method, path, body, headers = {}) =>
  new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      { host: '127.0.0.1', port, path, method,
        headers: {
          'Content-Type':  'application/json',
          'Origin':        'http://localhost:5000',
          'Content-Length': data ? Buffer.byteLength(data) : 0,
          ...headers,
        }
      },
      (res) => {
        let raw = '';
        res.on('data', chunk => (raw += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(raw) });
          } catch {
            resolve({ status: res.statusCode, body: raw });
          }
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });

// ── Health ───────────────────────────────────────────────────────────────────
describe('GET /api/health', () => {
  test('returns 200 with status ok', async () => {
    const res = await request('GET', '/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
  });
});

// ── Contact ──────────────────────────────────────────────────────────────────
describe('POST /api/contact', () => {
  test('returns 400 for empty body', async () => {
    const res = await request('POST', '/api/contact', {});
    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });

  test('returns 400 for invalid email', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'Test User', email: 'not-an-email', message: 'Hello there, testing this endpoint.'
    });
    assert.equal(res.status, 400);
  });

  test('returns 200 for valid payload (test mode skips SMTP)', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'Test User', email: 'test@example.com',
      message: 'This is a valid test message for the contact form.'
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.ok, true);
  });

  test('silently accepts honeypot submission', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'Bot', email: 'bot@example.com',
      message: 'spam spam spam', _gotcha: 'filled'
    });
    assert.equal(res.status, 200);
  });
});

// ── Newsletter ────────────────────────────────────────────────────────────────
describe('POST /api/newsletter', () => {
  test('returns 400 for missing email', async () => {
    const res = await request('POST', '/api/newsletter', {});
    assert.equal(res.status, 400);
  });

  test('returns 200 for valid email (test mode)', async () => {
    const res = await request('POST', '/api/newsletter', { email: 'sub@example.com' });
    assert.equal(res.status, 200);
    assert.equal(res.body.ok, true);
  });
});

// ── 404 ──────────────────────────────────────────────────────────────────────
describe('Unknown routes', () => {
  test('return 404', async () => {
    const res = await request('GET', '/api/does-not-exist');
    assert.equal(res.status, 404);
  });
});

// ── Teardown ─────────────────────────────────────────────────────────────────
test('teardown', (_t, done) => {
  server.close(done);
});
