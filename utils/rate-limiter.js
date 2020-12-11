const limiter = require('express-rate-limit');

const rateLimit = limiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = rateLimit;
