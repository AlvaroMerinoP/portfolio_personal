'use strict';
/**
 * POST /api/newsletter
 *
 * Stores a newsletter subscription intent (email only).
 * In production wire this up to your mailing-list provider
 * (Mailchimp, Brevo, Resend, etc.) via their API.
 *
 * For now it logs the subscription and sends a confirmation email.
 */
const router     = require('express').Router();
const nodemailer = require('nodemailer');

const { newsletterLimiter }  = require('../middleware/rateLimiter');
const { validateNewsletter } = require('../middleware/validator');

let _transporter;
const getTransporter = () => {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return _transporter;
};

router.post('/', newsletterLimiter, async (req, res, next) => {
  try {
    // Honeypot
    if (req.body._gotcha) {
      return res.status(200).json({ ok: true });
    }

    const { ok, errors, data } = validateNewsletter(req.body);
    if (!ok) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const { email } = data;

    // ── Log subscription (replace with real DB / Mailchimp call) ──────
    console.info(`[newsletter] New subscription: ${email} at ${new Date().toISOString()}`);

    // ── Send confirmation email ────────────────────────────────────────
    if (process.env.NODE_ENV !== 'test') {
      await getTransporter().sendMail({
        from:    process.env.MAIL_FROM || `"Alvaro Merino" <no-reply@alvaromerino.dev>`,
        to:      email,
        subject: "You're subscribed to Alvaro Merino's newsletter!",
        text:    "Thanks for subscribing! You'll receive updates about new projects and articles.",
        html:    `
          <h2>Thanks for subscribing!</h2>
          <p>You'll receive occasional updates about new projects and articles from
          <a href="https://alvaromerino.dev">alvaromerino.dev</a>.</p>
          <p style="font-size:0.875rem;color:#666">
            If you didn't subscribe, you can safely ignore this email.
          </p>
        `,
      });

      // Notify owner
      await getTransporter().sendMail({
        from:    process.env.MAIL_FROM || `"Portfolio API" <no-reply@alvaromerino.dev>`,
        to:      process.env.MAIL_TO   || 'alvaromerinopuerta@gmail.com',
        subject: `New newsletter subscriber: ${email}`,
        text:    `Email: ${email}\nDate: ${new Date().toISOString()}`,
      });
    }

    return res.status(200).json({ ok: true, message: 'Subscription successful.' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
