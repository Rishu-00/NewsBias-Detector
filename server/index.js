const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://news-bias-detector-nine.vercel.app'
  ],
  credentials: true
}))

// Routes
app.use('/api/news', require('./routes/news'));
app.use('/api/search', require('./routes/search'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'NewsBias Detector API is running!' });
});

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));