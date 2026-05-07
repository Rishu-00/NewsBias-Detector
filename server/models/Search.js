const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String, description: String,
  source: String, url: String,
  bias: String, sentiment: String,
  negScore: Number, publishedAt: String,
});

const searchSchema = new mongoose.Schema({
  query: { type: String, required: true },
  results: [articleSchema],
  totalArticles: Number,
  biasBreakdown: {
    left: { type: Number, default: 0 },
    center: { type: Number, default: 0 },
    right: { type: Number, default: 0 },
    unknown: { type: Number, default: 0 },
  },
  cachedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Search', searchSchema);