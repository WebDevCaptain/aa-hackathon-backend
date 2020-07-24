const rateLimit = require('express-rate-limit');

// TODO: Connect this to Redis Cache
const limiter = rateLimit({
  windowMs: 60 * 1000 * 60,
  max: 10,
  message: {
    error:
      'Bot Activity Detected. Your IP will be blocked in the next 12 hours. If you are a human, write an email to our support.',
  },
});

module.exports = limiter;
