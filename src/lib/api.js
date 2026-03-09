import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const hanziAPI = {
  getByCategory: (category_id, hsk_level = null, skip = 0, limit = 100) => {
    const params = new URLSearchParams({ skip: skip.toString(), limit: limit.toString() })
    if (hsk_level) params.append('hsk_level', hsk_level.toString())
    return api.get(`/api/hanzi/category/${category_id}?${params}`)
  },
  getSpeech: (id) => api.get(`/api/hanzi/${id}/speech`, { responseType: 'blob' }),
}

export const categoriesAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/api/categories/?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/api/categories/${id}`),
}

export const scoresAPI = {
  submit: (game_slug, player, score) => api.post('/api/scores/', { game_slug, player, score }),
  getLeaderboard: (game_slug) => api.get(`/api/scores/${game_slug}`),
}
