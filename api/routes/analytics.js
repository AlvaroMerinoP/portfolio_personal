'use strict';
/**
 * POST /api/analytics
 *
 * Lightweight privacy-first analytics endpoint.
 * Stores named events without PII:
 *   – No IP addresses logged
 *   – No cookies
 *   – Only event name + optional properties + referrer
 *
 * Requires `Authorization: Bearer <ANALYTICS_SECRET>` header.
 */
const router = require('express').Router();
const { analyticsLimiter } = require('../middleware/rateLimiter');
const { sanitize }         = require('../middleware/validator');

// In-memory counter (replace with a time-series DB in production)
const events = [];
const MAX_EVENTS = 10000; // rolling buffer

router.post('/', analyticsLimiter, (req, res) => {
  // Simple shared-secret auth
  const secret = process.env.ANALYTICS_SECRET;
  if (secret) {
    const auth = req.headers['authorization'] || '';
    if (auth !== `Bearer ${secret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const name  = sanitize(req.body.event || '').slice(0, 100);
  const props = req.body.props || {};

  if (!name) {
    return res.status(400).json({ error: 'event name is required' });
  }

  const entry = {
    event:     name,
    props:     typeof props === 'object' ? props : {},
    referrer:  sanitize(req.headers.referer || '').slice(0, 200),
    timestamp: new Date().toISOString(),
  };

  events.push(entry);
  if (events.length > MAX_EVENTS) events.shift();

  console.info(`[analytics] ${entry.event}`, entry.props);

  return res.status(200).json({ ok: true });
});

// GET /api/analytics — very basic summary (protect in production)
router.get('/', (req, res) => {
  const secret = process.env.ANALYTICS_SECRET;
  const auth   = req.headers['authorization'] || '';
  if (secret && auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const summary = events.reduce((acc, e) => {
    acc[e.event] = (acc[e.event] || 0) + 1;
    return acc;
  }, {});

  return res.json({ total: events.length, summary });
});

module.exports = router;
