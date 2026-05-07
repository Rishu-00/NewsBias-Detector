import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// News search karo
export const searchNews = (query) => API.get(`/news?q=${encodeURIComponent(query)}`)

// Search history lo
export const getHistory = () => API.get('/search/history')

// History clear karo
export const clearHistory = () => API.delete('/search/history')