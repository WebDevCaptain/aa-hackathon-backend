const express = require('express');
const router = new express.Router();

// [TODO]
router.post('/consent-status', (req, res) => {
  res.send({
    message: 'Received the consent',
  });
});

router.post('/data-callback', (req, res) => {
  res.send({
    message: 'Received some data',
  });
});

module.exports = router;
