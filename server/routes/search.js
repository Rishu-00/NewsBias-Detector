const express = require('express');
const router = express.Router();
const Search = require('../models/Search');

router.get('/history', async (req, res) => {
  try {
    const history = await Search.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('query totalArticles biasBreakdown createdAt');
    res.json({ history });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

module.exports = router;