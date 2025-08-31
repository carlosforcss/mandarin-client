import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Hanzi endpoints
export const hanziAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/api/hanzi/?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/api/hanzi/${id}`),
  getByHSK: (hsk_level, skip = 0, limit = 100) => api.get(`/api/hanzi/hsk/${hsk_level}?skip=${skip}&limit=${limit}`),
  getByCategory: (category_id, hsk_level = null, skip = 0, limit = 100) => {
    const params = new URLSearchParams({ skip: skip.toString(), limit: limit.toString() })
    if (hsk_level) params.append('hsk_level', hsk_level.toString())
    return api.get(`/api/hanzi/category/${category_id}?${params}`)
  },
  create: (data) => api.post('/api/hanzi/', data),
  update: (id, data) => api.put(`/api/hanzi/${id}`, data),
  delete: (id) => api.delete(`/api/hanzi/${id}`),
}

// Sentences endpoints
export const sentencesAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/api/sentences/?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/api/sentences/${id}`),
  getByCategory: (category_id, skip = 0, limit = 100) => api.get(`/api/sentences/category/${category_id}?skip=${skip}&limit=${limit}`),
  create: (data) => api.post('/api/sentences/', data),
  update: (id, data) => api.put(`/api/sentences/${id}`, data),
  delete: (id) => api.delete(`/api/sentences/${id}`),
}

// Categories endpoints
export const categoriesAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/api/categories/?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/api/categories/${id}`),
  getByHSK: (hsk_level) => api.get(`/api/categories/hsk/${hsk_level}`),
  create: (data) => api.post('/api/categories/', data),
  update: (id, data) => api.put(`/api/categories/${id}`, data),
  delete: (id) => api.delete(`/api/categories/${id}`),
}

// Files endpoints
export const filesAPI = {
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getById: (id) => api.get(`/api/files/${id}`),
  getContent: (id) => api.get(`/api/files/${id}/content`),
  delete: (id) => api.delete(`/api/files/${id}`),
}

export default api