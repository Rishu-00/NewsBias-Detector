# 🗞️ NEWSBIAS DETECTOR

## Compare How Different Media Outlets Report The Same Story

A full-stack MERN application that analyzes news articles from multiple sources and highlights political bias, sentiment, and tone differences across media platforms.

🔗 **Live Demo:** https://news-bias-detector-nine.vercel.app

---

# 📌 OVERVIEW

I built this project because I noticed that the same news story often feels completely different depending on where you read it.

NewsBias Detector fetches articles from multiple news platforms at once and helps users compare:
- Political leaning of sources
- Sentiment and tone of headlines
- Coverage distribution across the media spectrum

The goal is not to tell people what to think — but to help them see multiple perspectives in one place.

---

# ✨ FEATURES

- Fetches articles from 10+ news sources
- Detects political bias of news outlets
- Performs sentiment and tone analysis
- Interactive pie chart for bias distribution
- MongoDB caching for faster repeated searches
- Responsive frontend UI
- Real-time news data using NewsData.io API

---

# 🛠️ TECH STACK

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Recharts
- CSS Modules

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs

## APIs & Deployment
- NewsData.io API
- MongoDB Atlas
- Render
- Vercel

---

# 🧠 HOW IT WORKS

```text
User Search Query
       ↓
React Frontend
       ↓
Express Backend API
       ↓
NewsData.io API Fetch
       ↓
Bias Detection + Sentiment Analysis
       ↓
MongoDB Cache
       ↓
Processed Results to Frontend
```

---

# 📂 PROJECT STRUCTURE

```bash
NewsBias-Detector/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── utils/
│
└── server/
    ├── models/
    ├── routes/
    ├── utils/
    └── index.js
```

---

# 🧪 BIAS DETECTION LOGIC

The application uses a manually curated dataset where news sources are mapped to political leanings.

Each article is:
1. Matched with its source
2. Assigned a bias category
3. Analyzed for sentiment and tone

If a source is not available in the dataset, it is marked as **Unrated**.

---

# 🔮 FUTURE IMPROVEMENTS

- ML-based sentiment analysis
- User authentication
- Saved searches
- Topic-based alerts
- More international news sources
- Echo chamber exposure score

---

# 👨‍💻 AUTHOR

## Rishanshu Tripathi
B.Tech CSE Student  
Full Stack Developer | MERN Stack Enthusiast

---

# ⭐ SUPPORT

If you found this project useful, consider giving it a ⭐ on GitHub.