'use strict';
/**
 * Rate limiter middleware factory.
 * Creates independent limiters per route to allow fine-grained control.
 */
const rateLimit = require('express-rate-limit');

/**
 * @param {number} windowMinutes  – Rolling time window (minutes)
 * @param {number} max            – Max requests per window per IP
 * @param {string} message        – Client-facing error message
 */
const createLimiter = (windowMinutes = 15, max = 10, message = 'Too many requests, please try again later.') =>
  rateLimit({
    windowMs:         windowMinutes * 60 * 1000,
    max,
    standardHeaders:  true,   // Return RateLimit-* headers
    legacyHeaders:    false,
    message:          { error: message },
    // Use X-Forwarded-For behind a trusted proxy (Vercel, Railway, Render…)
    trustProxy:       true,
  });

// Predefined limiters
const contactLimiter    = createLimiter(60,  5,  'Too many contact requests. Please wait before trying again.');
const newsletterLimiter = createLimiter(60,  5,  'Too many subscription requests. Please wait before trying again.');
const githubLimiter     = createLimiter(1,  30,  'Too many requests to the GitHub proxy.');
const analyticsLimiter  = createLimiter(1,  60,  'Analytics rate limit exceeded.');

module.exports = { contactLimiter, newsletterLimiter, githubLimiter, analyticsLimiter };
