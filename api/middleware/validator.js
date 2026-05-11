'use strict';
/**
 * Input validation helpers.
 * Relies on the `validator` npm package — no regex maintained by hand.
 */
const v = require('validator');

const MAX_NAME    = 100;
const MAX_MESSAGE = 5000;

/**
 * Sanitise a plain-text string:
 *   – trim whitespace
 *   – strip HTML tags (prevent stored XSS in email notifications)
 */
const sanitize = (str = '') => v.stripLow(v.trim(String(str)));

/**
 * Validate + sanitize contact form payload.
 * Returns { ok, errors, data }.
 */
const validateContact = (body = {}) => {
  const errors = [];

  const name    = sanitize(body.name    || '');
  const email   = sanitize(body.email   || '');
  const message = sanitize(body.message || '');

  if (!name || name.length < 2)              errors.push('name: required (min 2 chars)');
  if (name.length > MAX_NAME)                errors.push(`name: too long (max ${MAX_NAME} chars)`);

  if (!email)                                errors.push('email: required');
  else if (!v.isEmail(email))                errors.push('email: invalid format');

  if (!message || message.length < 10)       errors.push('message: required (min 10 chars)');
  if (message.length > MAX_MESSAGE)          errors.push(`message: too long (max ${MAX_MESSAGE} chars)`);

  return {
    ok:     errors.length === 0,
    errors,
    data:   { name, email, message },
  };
};

/**
 * Validate + sanitize newsletter subscription payload.
 */
const validateNewsletter = (body = {}) => {
  const errors = [];
  const email  = sanitize(body.email || '');

  if (!email)              errors.push('email: required');
  else if (!v.isEmail(email)) errors.push('email: invalid format');

  return {
    ok:    errors.length === 0,
    errors,
    data:  { email },
  };
};

module.exports = { validateContact, validateNewsletter, sanitize };
