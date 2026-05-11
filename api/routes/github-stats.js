'use strict';
/**
 * GET /api/github
 *
 * Server-side proxy for GitHub user stats.
 * Advantages over direct browser calls:
 *   – Can use a Personal Access Token (GITHUB_TOKEN) without exposing it
 *   – Caches response for GITHUB_CACHE_TTL seconds (default 1 h)
 *   – Hides rate-limit details from the client
 */
const router = require('express').Router();
const { githubLimiter } = require('../middleware/rateLimiter');

const USERNAME  = process.env.GITHUB_USERNAME || 'AlvaroMerinoP';
const CACHE_TTL = Number(process.env.GITHUB_CACHE_TTL) || 3600; // seconds

// In-process cache (single server instance — replace with Redis for multi-instance)
let cache = null;

const fetchGitHubStats = async () => {
  const headers = {
    'Accept':     'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-api/1.0',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  // Fetch user profile
  const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
  if (!userRes.ok) throw new Error(`GitHub user API returned ${userRes.status}`);
  const user = await userRes.json();

  // Fetch repos (paginated — fetch up to 100)
  const reposRes = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
    { headers }
  );
  if (!reposRes.ok) throw new Error(`GitHub repos API returned ${reposRes.status}`);
  const repos = await reposRes.json();

  const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const forks = repos.reduce((sum, r) => sum + (r.forks_count      || 0), 0);

  return {
    repos:     user.public_repos || 0,
    stars,
    forks,
    followers: user.followers    || 0,
    cachedAt:  Date.now(),
  };
};

router.get('/', githubLimiter, async (_req, res, next) => {
  try {
    // Return from cache if fresh
    if (cache && (Date.now() - cache.cachedAt) / 1000 < CACHE_TTL) {
      return res.json({ ok: true, data: cache, fromCache: true });
    }

    const data = await fetchGitHubStats();
    cache = data;

    return res.json({ ok: true, data, fromCache: false });
  } catch (err) {
    // Serve stale cache on error rather than failing
    if (cache) {
      return res.json({ ok: true, data: cache, fromCache: true, stale: true });
    }
    return next(err);
  }
});

module.exports = router;
