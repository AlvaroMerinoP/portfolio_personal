'use strict';
/**
 * POST /api/contact
 *
 * Accepts a JSON body { name, email, message } (or FormData via urlencoded),
 * validates and sanitises input, then sends a notification email via SMTP.
 *
 * Security: rate-limited to 5 req / 60 min per IP; honeypot field checked.
 */
const router     = require('express').Router();
const nodemailer = require('nodemailer');

const { contactLimiter }   = require('../middleware/rateLimiter');
const { validateContact }  = require('../middleware/validator');

// ── Nodemailer transport (lazy-created to avoid startup errors when env is unset)
let _transporter;
const getTransporter = () => {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return _transporter;
};

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    // ── Honeypot: bots fill the _gotcha field ──────────────────────────
    if (req.body._gotcha) {
      // Respond 200 so the bot thinks it succeeded
      return res.status(200).json({ ok: true });
    }

    const { ok, errors, data } = validateContact(req.body);
    if (!ok) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const { name, email, message } = data;

    // ── Build email ────────────────────────────────────────────────────
    const mailOptions = {
      from:    process.env.MAIL_FROM  || `"Portfolio Contact" <no-reply@alvaromerino.dev>`,
      to:      process.env.MAIL_TO    || 'alvaromerinopuerta@gmail.com',
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name:    ${name}\nEmail:   ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New portfolio contact</h2>
        <table>
          <tr><th>Name</th><td>${name}</td></tr>
          <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    };

    // ── Send or log (skip in test/CI) ──────────────────────────────────
    if (process.env.NODE_ENV !== 'test') {
      await getTransporter().sendMail(mailOptions);
    }

    console.info(`[contact] Mail sent from ${email} at ${new Date().toISOString()}`);

    return res.status(200).json({ ok: true, message: 'Your message has been sent.' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
