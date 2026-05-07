const express = require('express');
const axios = require('axios');
const router = express.Router();
const Search = require('../models/Search');
const { getBias } = require('../utils/biasDetector');
const { getSentiment } = require('../utils/sentimentAnalyzer');

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }
  const query = q.toLowerCase().trim();

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const cached = await Search.findOne({ query, cachedAt: { $gte: oneHourAgo } });

    if (cached) {
      return res.json({
        source: 'cache', query,
        totalArticles: cached.totalArticles,
        biasBreakdown: cached.biasBreakdown,
        articles: cached.results,
      });
    }

    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: { apikey: process.env.NEWS_API_KEY, q: query, language: 'en', size: 10 },
    });

    if (response.data.status !== 'success' || !response.data.results?.length) {
      return res.status(404).json({ error: 'No articles found' });
    }

    const articles = response.data.results.map((article) => {
      const bias = getBias(article.source_id || '', article.link || '');
      const { sentiment, negScore } = getSentiment((article.title || '') + ' ' + (article.description || ''));
      return {
        title: article.title || 'No title',
        description: article.description || '',
        source: article.source_id || 'Unknown',
        url: article.link || '#',
        bias, sentiment, negScore,
        publishedAt: article.pubDate || '',
      };
    });

    const biasBreakdown = { left: 0, center: 0, right: 0, unknown: 0 };
    articles.forEach((a) => { biasBreakdown[a.bias] = (biasBreakdown[a.bias] || 0) + 1; });

    await Search.findOneAndUpdate(
      { query },
      { query, results: articles, totalArticles: articles.length, biasBreakdown, cachedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ source: 'api', query, totalArticles: articles.length, biasBreakdown, articles });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;